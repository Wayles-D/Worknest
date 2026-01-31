import { Menu, Bell, Search, ChevronDown } from "lucide-react";

export default function AdminTopBar({ onMenuClick }) {
  return (
    <header className="bg-white shadow-sm h-16 border-b px-6 flex items-center justify-between">
      
        <div className="flex items-center gap-4">
          {/* mobile menu */}
          <button onClick={onMenuClick} className="lg:hidden">
            <Menu size={20} />
          </button>
          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 px-6 py-2 rounded-md w-72 border-[0.5px] border-[#CCCCCC]">
            <Search
              size={20}
              className="text-gray-500"
            />
            <input
              type="text"
              placeholder="Search"
              className="text-sm w-full outline-none"
            />
          </div>
        </div>
        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Bell size={18} />
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="/tempAdmin.png"
              alt="Admin"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm hidden sm:block">Solo Ayande</span>
            <ChevronDown size={16} />
          </div>
        </div>
      
    </header>
  );
}
