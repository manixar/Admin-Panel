import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Download,
    FileText,
    Plus,
    Settings,
    Upload,
    Users,
    Milestone,
} from 'lucide-react';

const actions = [
    { icon: Plus, label: 'کسب و کار جدید', color: 'bg-blue-500' },
    { icon: Users, label: 'اضافه کردن مدیر', color: 'bg-emerald-500' },
    { icon: FileText, label: 'تهیه گزارش', color: 'bg-purple-500' },
    { icon: Upload, label: 'بارگزاری دیتا', color: 'bg-rose-500' },
    { icon: Download, label: 'خروجی دیتا', color: 'bg-amber-500' },
    { icon: Settings, label: 'تنظیمات پنل', color: 'bg-slate-500' },
];

export const QuickActions = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Milestone className="h-5 w-5" />
                    دسترسی سریع
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-3">
                    {actions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <Button
                                key={index}
                                variant="outline"
                                className="h-20 flex flex-col gap-2 hover:bg-accent cursor-pointer"
                            >
                                <div
                                    className={`p-2 rounded-lg text-white ${action.color}`}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>
                                <span className="text-sm">{action.label}</span>
                            </Button>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};
