import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import Header from './Header';
import Sidebar from './sidebar';
import Header from './header';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header setSidebarOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}