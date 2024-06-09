import React, { useState } from 'react';
import SidebarLinks from './SidebarLinks';

interface SidebarLayoutProps {
  children?: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div dir="rtl" className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-30 flex-shrink-0 w-64 bg-white border-l border-gray-200 transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:static lg:inset-auto lg:translate-x-0`}
      >
        <div className="flex items-center justify-center h-16 bg-blue-500 text-white">
          <h1 className="text-2xl font-semibold">Logo</h1>
        </div>
        <SidebarLinks /> {/* Use the new component */}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="ml-4 text-2xl font-semibold text-gray-900">
              {/* Page Title */}
            </h1>
          </div>
          <div className="flex items-center">
            <button
              className="text-gray-500 focus:outline-none lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    sidebarOpen
                      ? 'M18 6L6 18M18 18L6 6'
                      : 'M20 6H4M20 12H4M20 18H4'
                  }
                />
              </svg>
            </button>
            {/* Additional Navbar Items */}
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
