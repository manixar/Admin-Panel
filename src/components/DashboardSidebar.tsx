import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Ticket,
    BriefcaseBusiness,
    MessagesSquare,
    Users,
    Settings,
    HelpCircle,
    MessageSquare,
} from 'lucide-react';

interface DashboardSidebarProps {
    sidebarCollapsed: boolean;
    currentPage: string;
}

export const DashboardSidebar = ({
    sidebarCollapsed,
    currentPage,
}: DashboardSidebarProps) => {
    const navigate = useNavigate();

    const menuItems = [
        {
            id: 'dashboard',
            label: 'داشبورد',
            icon: LayoutDashboard,
        },
        { id: 'business', label: 'کسب و کار ها', icon: BriefcaseBusiness },
        { id: 'tickets', label: 'تیکت ها', icon: Ticket },
        {
            id: 'messages',
            label: 'بررسی پیامک ها',
            icon: MessagesSquare,
        },
        {
            id: 'users',
            label: 'کاربران',
            icon: Users,
        },
        {
            id: 'settings',
            label: 'تنظیمات پنل',
            icon: Settings,
        },
    ];

    const handleNavigate = (id: string) => {
        // برای صفحه‌ی اصلی داشبورد، مسیر ریشه رو بزن
        if (id === 'dashboard') {
            navigate('/dashboard');
        } else {
            navigate(`/dashboard/${id}`);
        }
    };

    return (
        <aside
            className={cn(
                'fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] transition-all duration-300 overflow-hidden',
                'bg-background border-l border-border md:translate-x-0',
                sidebarCollapsed
                    ? 'translate-x-full md:w-16'
                    : 'translate-x-0 w-64'
            )}
        >
            <div className="flex flex-col h-full">
                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Button
                            key={item.id}
                            variant={
                                currentPage == item.id ? 'secondary' : 'ghost'
                            }
                            className="w-full justify-start gap-3 h-10 cursor-pointer"
                            onClick={() => handleNavigate(item.id)}
                        >
                            <item.icon className="h-5 w-5 flex-shrink-0" />
                            <span className="truncate">{item.label}</span>
                        </Button>
                    ))}
                </nav>

                {/* Help & Support */}
                <div className="border-t p-3">
                    <div className="space-y-1">
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 h-9 cursor-pointer"
                        >
                            <HelpCircle className="h-4 w-4 flex-shrink-0" />
                            {!sidebarCollapsed && (
                                <span className="text-sm">راهنما</span>
                            )}
                        </Button>

                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 h-9 cursor-pointer"
                        >
                            <MessageSquare className="h-4 w-4 flex-shrink-0" />
                            {!sidebarCollapsed && (
                                <span className="text-sm">پشتیبانی</span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    );
};
