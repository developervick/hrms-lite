import { useState } from "react";
import { Plus, Search, Filter, Trash2, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";

// Mock Data for UI building
const MOCK_EMPLOYEES = [
  { id: "EMP001", name: "Alice Johnson", email: "alice@company.com", dept: "Engineering" },
  { id: "EMP002", name: "Bob Smith", email: "bob@company.com", dept: "Marketing" },
  { id: "EMP003", name: "Charlie Davis", email: "charlie@company.com", dept: "Design" },
  { id: "EMP004", name: "Diana Prince", email: "diana@company.com", dept: "Engineering" },
  { id: "EMP005", name: "Ethan Hunt", email: "ethan@company.com", dept: "Operations" },
];

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employees</h1>
          <p className="text-slate-500">Manage your workforce and their roles.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm">
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select 
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none"
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">
            <Filter size={16} />
            More
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Employee ID</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Basic Info</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Department</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_EMPLOYEES.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-indigo-600">{emp.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900">{emp.name}</span>
                      <span className="text-xs text-slate-500">{emp.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {emp.dept}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/50">
          <span className="text-sm text-slate-500">Showing 1 to 5 of 24 results</span>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 rounded-md bg-white hover:bg-slate-50 disabled:opacity-50">
              <ChevronLeft size={18} />
            </button>
            <button className="p-2 border border-slate-200 rounded-md bg-white hover:bg-slate-50">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}