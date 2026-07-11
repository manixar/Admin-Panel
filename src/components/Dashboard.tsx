import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardFooter } from './DashboardFooter';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardContent } from './DashboardContent';
import { cn } from '@/lib/utils';

const Dashboard = () => {
    const location = useLocation();
    const currentPage =
        location.pathname.split('/dashboard/')[1] || 'dashboard';

    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(true);

    const handleToggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <div className="min-h-screen">
            <DashboardHeader
                onToggleSidebar={handleToggleSidebar}
                sidebarCollapsed={sidebarCollapsed}
            />
            <div className="flex">
                <DashboardSidebar
                    sidebarCollapsed={sidebarCollapsed}
                    currentPage={currentPage}
                />
                <main
                    className={cn(
                        'flex-1 transition-all duration-300 pt-16 pb-6 md:pb-0 mr-0 overflow-y-auto',
                        sidebarCollapsed ? 'md:mr-16' : 'md:mr-64'
                    )}
                >
                    <div className="flex-1 mb-13">
                        <DashboardContent currentPage={currentPage} />
                    </div>
                    <DashboardFooter sidebarCollapsed={sidebarCollapsed} />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
