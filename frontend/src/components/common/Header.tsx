import React from "react";
import { User as UserIcon, LogOut as LogoutIcon } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full h-16 bg-dark text-white shadow-md flex items-center justify-end px-6 border-b border-graydark">
      {/* Menú del usuario / Configuración */}
      <div className="flex items-center gap-4">
        {/* Perfil */}
        <button className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
          <UserIcon size={20} />
          <span className="hidden md:block">Perfil</span>
        </button>
        {/* Salir */}
        <button className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
          <LogoutIcon size={20} />
          <span className="hidden md:block">Salir</span>
        </button>
      </div>
    </header>
  );
};

export default Header