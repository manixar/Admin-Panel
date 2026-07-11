import React, { useState, useEffect, useRef } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { verifyOtp, sendOtp } from '@/apis/auth';

const VerifyPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const phoneNumber =
        location.state?.phoneNumber ||
        localStorage.getItem('loginPhone') ||
        '09123456789';

    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(180);
    const [canResend, setCanResend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const startTimer = () => {
        setTimer(180);
        setCanResend(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                    }
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (otp.length !== 5) {
            setError('لطفاً کد ارسال شده را وارد کنید');
            return;
        }

        setIsLoading(true);

        // تست بدون سرور
        if (import.meta.env.VITE_MOCK_AUTH === 'true') {
            localStorage.setItem('token', 'fake-test-token');
            navigate('/dashboard', { replace: true });
            setIsLoading(false);
            return;
        }

        try {
            const response = await verifyOtp({
                phoneNumber: phoneNumber.startsWith('+98')
                    ? phoneNumber
                    : `+98${phoneNumber.replace(/\D/g, '')}`,
                otp: otp,
            });

            console.log('✅ ورود موفق:', response);
            navigate('/dashboard', { replace: true });
        } catch (error: any) {
            console.error('❌ خطا در تایید کد:', error);

            if (error.response?.status === 400) {
                setError('کد وارد شده اشتباه است. لطفاً مجدداً تلاش کنید.');
            } else if (error.response?.status === 404) {
                setError('شماره موبایل یافت نشد. لطفاً دوباره وارد شوید.');
            } else if (error.response?.status === 429) {
                setError(
                    'تعداد دفعات تلاش بیش از حد مجاز است. لطفاً چند دقیقه بعد تلاش کنید.'
                );
            } else if (
                error.code === 'ECONNABORTED' ||
                error.message?.includes('timeout')
            ) {
                setError(
                    'ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کنید.'
                );
            } else {
                setError(
                    error.response?.data?.message ||
                        'خطا در تایید کد. لطفاً مجدداً تلاش کنید.'
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        setError('');
        setIsLoading(true);

        try {
            await sendOtp({
                phoneNumber: phoneNumber.startsWith('+98')
                    ? phoneNumber
                    : `+98${phoneNumber.replace(/\D/g, '')}`,
                password: 'milad',
            });

            console.log('✅ کد مجدداً ارسال شد');
            setOtp('');
            startTimer();
        } catch (error: any) {
            console.error('❌ خطا در ارسال مجدد کد:', error);
            setError(
                'ارسال مجدد کد با خطا مواجه شد. لطفاً چند لحظه بعد تلاش کنید.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 5) {
            setOtp(value);
            setError('');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-slate-200 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-3">
                        <img
                            src="/logo/karlino-typography.png"
                            alt="Karlino"
                            className="h-16 w-auto mx-auto"
                        />
                    </div>
                    <p className="mt-2 text-slate-700">
                        به پنل ادمین کارلینو خوش آمدید.
                    </p>
                </div>

                <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-semibold text-center">
                            تایید کد
                        </CardTitle>
                        <CardDescription className="text-center">
                            لطفا کد ارسال شده را وارد کنید
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={5}
                                    value={otp}
                                    onChange={handleOtpChange}
                                    placeholder="_ _ _ _ _"
                                    className="text-center text-2xl tracking-[12px] font-mono h-14"
                                    dir="ltr"
                                    autoFocus
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <div className="flex items-center justify-center gap-3">
                                {canResend ? (
                                    <Button
                                        type="button"
                                        variant="link"
                                        size="sm"
                                        className="px-0 font-normal text-blue-600"
                                        onClick={handleResendCode}
                                        disabled={isLoading}
                                    >
                                        ارسال مجدد کد
                                    </Button>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">
                                            ارسال مجدد کد
                                        </span>
                                        <span className="text-sm font-mono bg-slate-100 px-2 py-1 rounded-md">
                                            {formatTime(timer)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading || otp.length !== 5}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="animate-spin ml-2">
                                            ⏳
                                        </span>
                                        در حال تایید...
                                    </>
                                ) : (
                                    'تایید کد'
                                )}
                            </Button>
                        </form>

                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">
                                اکانت ادمین ندارید؟{' '}
                            </span>
                            <Button
                                variant="link"
                                className="px-0 font-normal"
                                onClick={() => navigate('/register')}
                            >
                                ثبت نام کنید
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center mt-8 text-xs text-muted-foreground">
                    با ورود و ثبت نام شرایط و قوانین کارلینو را قبول میکنید 🐳
                    <a
                        className="pl-1.5 text-blue-600 hover:text-blue-400 duration-300"
                        href="/"
                        target="_blank"
                    >
                        Karlino
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VerifyPage;
