import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// Import your new services
import { getAttendance, updateAttendanceStatus } from "../services/attendanceService";

export default function Attendance() {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 1. Fetch data using the service
  const { data: attendanceData, isLoading, isError } = useQuery({
    queryKey: ["all-attendance", selectedDate],
    queryFn: () => getAttendance(selectedDate), // Correctly passing the parameter
  });

  // 2. Update status using the service
  const updateMutation = useMutation({
    mutationFn: ({ attandance_id, status }: { attandance_id: string; status: string }) => 
      updateAttendanceStatus(attandance_id, status),
    onSuccess: () => {
      // Refresh the specific date's data
      queryClient.invalidateQueries({ queryKey: ["all-attendance", selectedDate] });
      toast.success("Status updated");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  });

  // 3. Client-side Filtering & Pagination Logic
  const filteredData = useMemo(() => {
    const list = attendanceData?.attendances || [];
    return list.filter((item: any) => 
      item.employee__full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [attendanceData, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isError) return (
    <div className="p-10 text-center text-red-500 font-bold">
      Error loading attendance records. Please check your connection.
    </div>
  );


  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Daily Attendance</h1>
        <p className="text-slate-500">Managing staff presence for {new Date(selectedDate).toDateString()}</p>
      </header>

      {/* Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setCurrentPage(1); 
            }}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
          />
        </div>

        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search employee or department..." 
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm min-h-[400px]">
        {isLoading ? (
          <div className="flex h-64 flex-col items-center justify-center text-slate-400">
            <Loader2 className="animate-spin mb-4 text-indigo-600" size={32} />
            <p>Syncing attendance logs...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-widest">Employee Information</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-widest text-center">Status Toggle</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedData.map((atn: any) => (
                    <tr key={atn.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600 border border-indigo-100">
                            {atn.employee__full_name?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{atn.employee__full_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <StatusBtn 
                            active={atn.status === 'Present'} 
                            label="Present" 
                            color="emerald" 
                            onClick={() => updateMutation.mutate({ attandance_id: atn.id, status: 'Present' })}
                          />
                          <StatusBtn 
                            active={atn.status === 'Absent'} 
                            label="Absent" 
                            color="red" 
                            onClick={() => updateMutation.mutate({ attandance_id: atn.id, status: 'Absent' })}
                          />
                          <StatusBtn 
                            active={atn.status === 'On Leave'} 
                            label="Leave" 
                            color="amber" 
                            onClick={() => updateMutation.mutate({ attandance_id: atn.id, status: 'On Leave' })}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          to={`/employees/${atn.employee__id}`} 
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 p-2 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          View History
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {paginatedData.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-20 text-center text-slate-400 italic">
                        No attendance records found for this query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                {filteredData.length} total staff records
              </span>
              <div className="flex items-center gap-2">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white disabled:opacity-30 hover:shadow-sm"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-black text-slate-700">PAGE {currentPage} / {totalPages || 1}</span>
                <button 
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white disabled:opacity-30 hover:shadow-sm"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* --- Reusable Internal Components --- */

function StatusBtn({ active, label, color, onClick }: any) {
  const themes: any = {
    emerald: active ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100" : "bg-white text-slate-400 border-slate-200 hover:border-emerald-200 hover:text-emerald-600",
    red: active ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-100" : "bg-white text-slate-400 border-slate-200 hover:border-red-200 hover:text-red-600",
    amber: active ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-100" : "bg-white text-slate-400 border-slate-200 hover:border-amber-200 hover:text-amber-500",
  };

  return (
    <button 
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-tight transition-all active:scale-95 ${themes[color]}`}
    >
      {label}
    </button>
  );
}