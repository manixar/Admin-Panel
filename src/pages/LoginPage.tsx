import React, { useRef, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, Lock, Eye, EyeClosed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { normalizePhoneNumber } from '@/lib/mobileChecker';
import { sendOtp } from '@/apis/auth.ts';

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const phoneInputRef = useRef<HTMLInputElement>(null);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
            setPhone(value);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (phone.length !== 10) {
            alert('شماره موبایل را کامل وارد کنید');
            return;
        }

        if (password !== 'milad') {
            alert('رمز عبور اشتباه وارد کردید⚠️');
            return;
        }

        //تست بدون سرور
        if (import.meta.env.VITE_MOCK_AUTH === 'true') {
            localStorage.setItem('loginPhone', phone);
            navigate('/verify');
            return;
        }

        setOpenConfirmModal(true);
        try {
            const fullPhoneNumber = `+98${phone}`;
            const formattedPhone = normalizePhoneNumber(fullPhoneNumber);
            await sendOtp({
                phoneNumber: formattedPhone,
                password: password,
            });
            navigate('/verify', { replace: true });
        } catch (error) {
            console.error(error);
            alert('ارسال کد با خطا مواجه شد ⛔️');
            setIsLoading(false);
            setOpenConfirmModal(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-slate-200 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-3">
                        <img
                            src="/public/logo/karlino-typography.png"
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
                            ورود
                        </CardTitle>
                        <CardDescription className="text-center">
                            لطفا شماره موبایل و پسورد خود را وارد کنید.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <form className="space-y-4" onSubmit={handleLogin}>
                            <div className="space-y-2">
                                <Label htmlFor="phone">
                                    شماره موبایل خود را وارد کنید
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute right-3 top-[10px] h-4 w-4 text-slate-800" />
                                    <div className="relative flex">
                                        <span className="absolute left-0 top-0 h-full flex items-center px-3 bg-slate-100 border-l rounded-r-md text-sm font-medium text-slate-600">
                                            +98
                                        </span>
                                        <Input
                                            ref={phoneInputRef}
                                            id="phone"
                                            name="phone"
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            placeholder="9123456789"
                                            className="pr-10 pl-14 text-right font-mono text-base"
                                            dir="ltr"
                                            maxLength={10}
                                            required
                                            autoComplete="tel"
                                            style={{ textAlign: 'left' }}
                                        />
                                    </div>
                                    <p className="text-xs text-center text-muted-foreground mt-1 mr-2">
                                        {phone.length}/10 رقم وارد شده
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">رمز عبور</Label>
                                <div className="relative">
                                    <Lock className="absolute right-3 top-[10px] h-4 w-4 text-slate-800" />
                                    <Input
                                        id="password"
                                        name="password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        value={password}
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="مثال: abc@123"
                                        className="pl-10 text-right font-mono"
                                        dir="ltr"
                                        required
                                        autoComplete="current-password"
                                        style={{ textAlign: 'left' }}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute left-0 top-0 h-full px-3"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeClosed className="h-4 w-4 text-slate-800" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-slate-800" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="px-0 font-normal"
                                >
                                    پسورد یادتون رفته؟
                                </Button>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" name="remember" />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm font-normal"
                                    >
                                        من را به خاطر بسپار
                                    </Label>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full cursor-pointer"
                                disabled={isLoading || phone.length !== 10}
                            >
                                {isLoading ? 'در حال ارسال کد...' : 'وارد شوید'}
                            </Button>
                        </form>

                        {/* Sign Up Link */}
                        {/*<div className="text-center text-sm">*/}
                        {/*    <span className="text-muted-foreground">*/}
                        {/*        اکانت ادمین ندارید؟{' '}*/}
                        {/*    </span>*/}
                        {/*    <Button*/}
                        {/*        variant="link"*/}
                        {/*        className="px-0 font-normal"*/}
                        {/*        onClick={() => navigate('/register')}*/}
                        {/*    >*/}
                        {/*        ثبت نام کنید*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
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

export default LoginPage;
