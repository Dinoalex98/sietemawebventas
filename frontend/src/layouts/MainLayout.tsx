import React, { ReactNode } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar siempre visible al lado izquierdo */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header en la parte superior de la aplicación */}
        <Header />

        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;