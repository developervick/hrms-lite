import { useState } from "react";
import { Building2, Plus, Trash2, Users, AlignLeft } from "lucide-react";
import toast from "react-hot-toast";

interface Department {
  id: number;
  name: string;
  description: string;
  employeeCount: number;
}

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: "Engineering", description: "Software development and infrastructure.", employeeCount: 12 },
    { id: 2, name: "Marketing", description: "Brand awareness and lead generation.", employeeCount: 5 },
  ]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    const newDept: Department = {
      id: Date.now(),
      name,
      description,
      employeeCount: 0,
    };

    setDepartments([newDept, ...departments]);
    setName("");
    setDescription("");
    toast.success("Department created successfully!");
  };

  const deleteDepartment = (id: number) => {
    setDepartments(departments.filter(d => d.id !== id));
    toast.success("Department removed");
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Departments</h1>
        <p className="text-slate-500">Organize your company structure.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Department Form */}
        <div className="lg:col-span-1">
          <form 
            onSubmit={handleAddDepartment}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Plus size={20} className="text-indigo-600" />
              Add New Dept
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department Name</label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Human Resources"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What does this team do?"
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors shadow-md shadow-indigo-100"
              >
                Create Department
              </button>
            </div>
          </form>
        </div>

        {/* Departments List Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group">
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <Building2 size={24} />
                </div>
                <button 
                  onClick={() => deleteDepartment(dept.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <h4 className="text-lg font-bold text-slate-900 mb-1">{dept.name}</h4>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">
                {dept.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Users size={16} />
                  <span className="text-xs font-medium">{dept.employeeCount} Employees</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded">
                  Active
                </span>
              </div>
            </div>
          ))}
          
          {departments.length === 0 && (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
              <Building2 className="mx-auto text-slate-300 mb-2" size={48} />
              <p className="text-slate-500">No departments found. Create your first one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}