import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { logout } from '@/apis/auth';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Menu,
    Moon,
    Bell,
    Settings,
    User,
    LogOut,
    Search,
    Sun,
    ChevronDown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
    onToggleSidebar: () => void;
    sidebarCollapsed: boolean;
}

export const DashboardHeader = ({
    onToggleSidebar,
    sidebarCollapsed,
}: DashboardHeaderProps) => {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const mockNotifications = [
        {
            id: 1,
            title: 'کسب و کار سالن اضافه شد',
            time: '۲ دقیقه پیش',
            unread: true,
        },
        {
            id: 2,
            title: '۱۰۰۰ پیامک انبوه ارسال شد',
            time: '۱۰ دقیقه پیش',
            unread: true,
        },
        {
            id: 3,
            title: 'سرویس فلان اضافه شد',
            time: '۱ ساعت پیش',
            unread: false,
        },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-background border-b duration-300">
            <div className="flex items-center justify-between h-full px-4">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <Button
                        onClick={onToggleSidebar}
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <button
                        onClick={onToggleSidebar}
                        className={cn(
                            'hidden md:flex h-8 w-8 rounded-lg border-2 transition-all duration-300 items-center justify-center',
                            'hover:bg-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20',
                            'group active:scale-95 relative cursor-pointer',
                            sidebarCollapsed
                                ? 'border-border/50 bg-background/50'
                                : 'border-primary/20 bg-primary/5'
                        )}
                    >
                        <div
                            className={cn(
                                'flex items-center justify-center transition-all duration-300',
                                'group-hover:rotate-13 group-active:rotate-45'
                            )}
                        >
                            {sidebarCollapsed ? (
                                <ChevronDown
                                    className={cn(
                                        'h-4 w-4 -rotate-90 transition-all duration-300',
                                        'text-muted-foreground group-hover:text-primary group-hover:scale-110'
                                    )}
                                />
                            ) : (
                                <ChevronDown
                                    className={cn(
                                        'h-4 w-4 rotate-90 transition-all duration-300',
                                        'text-muted-foreground group-hover:text-primary group-hover:scale-110'
                                    )}
                                />
                            )}
                        </div>
                    </button>
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <button onClick={() => navigate('/dashboard')}>
                            <img
                                src="/public/logo/karlino-typography.png"
                                alt="Karlino"
                                className="h-9 w-auto mx-auto"
                            />
                        </button>
                    </div>
                </div>

                {/* Center Section */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <form className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="دنبال چی میگردی؟"
                            className="pl-10 w-full"
                        />
                    </form>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDarkMode(!darkMode)}
                        className="cursor-pointer"
                    >
                        {darkMode ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="relative cursor-pointer"
                            >
                                <Bell className="h-5 w-5" />
                                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 bg-primary flex items-center justify-center text-white font-bold">
                                    3
                                </Badge>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0">
                            <div className="p-4 border-b">
                                <h3 className="font-semibold">اعلان ها</h3>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {mockNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className="p-3 border-b hover:bg-muted/50 cursor-pointer"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-primary' : 'bg-muted-foreground/50'}`}
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">
                                                    {notification.title}
                                                </p>
                                                <p className="text-xs font-medium text-muted-foreground">
                                                    {notification.time}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 border-t">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full cursor-pointer"
                                    onClick={() =>
                                        navigate('/dashboard/notifications')
                                    }
                                >
                                    مشاهده همه اعلان ها
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => navigate('/dashboard/settings')}
                    >
                        <Settings className="h-5 w-5" />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="relative cursor-pointer"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src="/public/avatar/avatar.webp"
                                        alt="profile"
                                    />
                                    <AvatarFallback>FA</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuItem className="cursor-pointer">
                                <User className="h-4 w-4 mr-2" />
                                پروفایل
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => navigate('/dashboard/settings')}
                            >
                                <Settings className="h-4 w-4 mr-2" />
                                تنظیمات
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="cursor-pointer"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                خروج
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};
