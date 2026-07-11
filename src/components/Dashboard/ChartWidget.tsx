import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { ChartNoAxesCombined } from 'lucide-react';

const data = [
    { name: 'فروردین', sms: 4000, business: 2400 },
    { name: 'اردیبهشت', sms: 3000, business: 1398 },
    { name: 'خرداد', sms: 2000, business: 9800 },
    { name: 'تیر', sms: 2780, business: 3908 },
    { name: 'مرداد', sms: 1890, business: 4800 },
    { name: 'شهریور', sms: 2390, business: 3800 },
    { name: 'مهر', sms: 3490, business: 4300 },
    { name: 'ابان', sms: 4000, business: 2400 },
    { name: 'آذر', sms: 3000, business: 1398 },
    { name: 'دی', sms: 2000, business: 9800 },
    { name: 'بهمن', sms: 2780, business: 3908 },
    { name: 'اسفند', sms: 1890, business: 4800 },
];
export const ChartWidget = () => {
    const [activeMetric, setActiveMetric] = useState<'sms' | 'business'>('sms');
    const reverseData = [...data].reverse();
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between ">
                <CardTitle className="flex items-center gap-2">
                    <ChartNoAxesCombined className="h-5 w-5" />
                    نمودار پیشرفته
                </CardTitle>
                <div className="flex gap-2">
                    <Button
                        variant={activeMetric === 'sms' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveMetric('sms')}
                        className="cursor-pointer"
                    >
                        پیامک های ارسالی
                    </Button>
                    <Button
                        variant={
                            activeMetric === 'business' ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => setActiveMetric('business')}
                        className="cursor-pointer"
                    >
                        کسب و کار های جدید
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient
                                    id="colorGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--primary)"
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--primary)"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                className="opacity-30"
                            />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                className="text-muted-foreground"
                                reversed={true}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                className="text-muted-foreground"
                                orientation="right"
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--card)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                    direction: 'rtl',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey={activeMetric}
                                stroke="var(--primary)"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
