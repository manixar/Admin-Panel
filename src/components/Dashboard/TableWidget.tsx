import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

const recentOrders = [
    {
        id: '#2852',
        user: {
            name: 'کاربر ۱',
            avatar: '/public/avatar/avatar3.webp',
        },
        product: 'پیامک انبوه',
        amount: '1,000,000 تومان',
        status: 'درحال پرداخت',
        date: '۱۴۰۵/۰۲/۰۲',
    },
    {
        id: '#2853',
        user: {
            name: 'کاربر ۲',
            avatar: '/public/avatar/avatar.webp',
        },
        product: 'پیامک انبوه',
        amount: '1,000,000 تومان',
        status: 'درحال پرداخت',
        date: '۱۴۰۵/۰۲/۰۲',
    },
    {
        id: '#2854',
        user: {
            name: 'کاربر ۳',
            avatar: '..',
        },
        product: 'پیامک انبوه',
        amount: '1,000,000 تومان',
        status: 'خطا در پرداخت',
        date: '۱۴۰۵/۰۲/۰۲',
    },
    {
        id: '#2855',
        user: {
            name: 'کاربر ۴',
            avatar: '/public/avatar/avatar2.webp',
        },
        product: 'پیامک انبوه',
        amount: '1,000,000 تومان',
        status: 'انجام شده',
        date: '۱۴۰۵/۰۲/۰۲',
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'انجام شده':
            return 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 dark:bg-emerald-200 dark:hover:bg-emerald-300 dark:text-emerald-950';
        case 'درحال پرداخت':
            return 'bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-200 dark:hover:bg-amber-300 dark:text-amber-950';
        case 'خطا در پرداخت':
            return 'bg-red-100 hover:bg-red-200 text-red-900 dark:bg-red-200 dark:hover:bg-red-300 dark:text-red-950';
        default:
            return 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-200 dark:hover:bg-slate-300 dark:text-slate-950';
    }
};

export const TableWidget = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    پرداختی های اخیر
                </CardTitle>
                <Button variant="outline" size="sm" className="cursor-pointer">
                    مشاهده کل
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentOrders.map((order) => (
                        <div
                            key={order.id}
                            className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={order.user.avatar} />
                                    <AvatarFallback>
                                        {order.user.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">
                                        {order.user.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {order.product}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="font-semibold">
                                        {order.amount}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {order.date}
                                    </p>
                                </div>
                                <Badge className={getStatusColor(order.status)}>
                                    {order.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
