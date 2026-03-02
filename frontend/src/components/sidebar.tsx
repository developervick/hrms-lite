import { X, LayoutDashboard, Users, CalendarCheck, Settings, Building } from "lucide-react";
import { NavLink } from "react-router-dom";

type SidebarProps = {
    open: boolean,
    onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
    return (
        <>
            {/* Mobile Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity lg:hidden ${
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                }`} 
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <aside className={`
                fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out
                w-64 flex flex-col
                ${open ? "translate-x-0" : "-translate-x-full"} 
                lg:translate-x-0 lg:static
            `}>
                
                {/* Branding */}
                <div className="p-6 flex items-center justify-between border-b border-slate-100 lg:h-20">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">H</div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">HRMS Lite</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 lg:hidden">
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                    <SidebarItem 
                        to="/dashboard" 
                        icon={<LayoutDashboard size={20} />} 
                        label="Dashboard" 
                        onClick={onClose} 
                    />
                    <SidebarItem 
                        to="/employees" 
                        icon={<Users size={20} />} 
                        label="Employees" 
                        onClick={onClose} 
                    />
                    <SidebarItem 
                        to="/attendance" 
                        icon={<CalendarCheck size={20} />} 
                        label="Attendance" 
                        onClick={onClose} 
                    />
                    <SidebarItem 
                        to="/departments" 
                        icon={<Building size={20} />}
                        label="Departments" 
                        onClick={onClose} 
                    />
                    <div className="pt-4 mt-4 border-t border-slate-100">
                        <SidebarItem 
                            to="/settings" 
                            icon={<Settings size={20} />} 
                            label="Settings" 
                            onClick={onClose} 
                        />
                    </div>
                    
                </nav>

                {/* Footer / User Profile */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3 p-2">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white shadow-sm" />
                        <div className="text-sm truncate">
                            <p className="font-semibold text-slate-900">Admin User</p>
                            <p className="text-xs text-slate-500 truncate">admin@hrms.com</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

// Custom Sidebar Item Component
function SidebarItem({ to, icon, label, onClick }: { to: string; icon: React.ReactNode; label: string; onClick: () => void }) {
    return (
        <NavLink
            to={to}
            onClick={onClick} // Closes sidebar on mobile after clicking a link
            className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive 
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
            `}
        >
            {icon}
            {label}
        </NavLink>
    );
}