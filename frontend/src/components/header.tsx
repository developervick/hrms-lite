import { Menu, Bell, User } from "lucide-react";

type HeaderProps = {
    setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center bg-white/80 px-4 backdrop-blur-md border-b border-slate-200 lg:px-8">
            
            {/* Left Section: Mobile Menu Button & Brand */}
            <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle: 
                   Visible on small screens (block), hidden on large (lg:hidden) 
                */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
                    aria-label="Open Sidebar"
                >
                    <Menu size={20} />
                </button>

                {/* Brand Logo (Optional: hidden on mobile if sidebar has it) */}
                <div className="flex items-center gap-2 lg:hidden">
                    <span className="text-lg font-bold tracking-tight text-slate-900">HRMS Lite</span>
                </div>
            </div>

            {/* Middle Section: Search Bar (Hidden on very small screens) */}
            <div className="ml-4 hidden md:flex flex-1 max-w-md">
                <div className="relative w-full">
                    <h1 className="text-lg font-bold text-slate-900">Welcome to HRMS Lite</h1>
                </div>
            </div>

            {/* Right Section: Actions & Profile */}
            <div className="ml-auto flex items-center gap-2 sm:gap-4">
                <button className="relative p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>

                <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

                <button className="flex items-center gap-2 rounded-full border border-slate-200 p-1 pr-3 hover:bg-slate-50 transition-all">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                        <User size={16} />
                    </div>
                    <span className="hidden text-sm font-medium text-slate-700 sm:block">My Account</span>
                </button>
            </div>
        </header>
    );
}