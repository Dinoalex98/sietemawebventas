import React, { ReactNode, useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar el sidebar

  return (
    <div className="flex h-screen">
      {/* Sidebar controlado con el estado */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col">
        {/* Header con botón para controlar el sidebar */}
        <Header/>

        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
