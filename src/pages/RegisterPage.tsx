import React, { useState } from 'react';
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

import {
    Mail,
    Lock,
    ShieldPlus,
    Eye,
    EyeClosed,
    User,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard');
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
                        />{' '}
                    </div>
                    <p className="mt-2 text-slate-700">
                        به پنل ادمین کارلینو خوش آمدید.
                    </p>
                </div>
                <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-semibold text-center">
                            ثبت نام ادمین </CardTitle>
                        <CardDescription className="text-center">
                            لطفا اطلاعات خود را وارد کنید </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form className="space-y-4" onSubmit={handleLogin}>
                            <div className="grid grid-cols-2 gap-2">
                                {/* FirstName Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="fname">اسم</Label>
                                    <div className="relative">
                                        <User className="absolute right-3 top-[10px] h-4 w-4 text-slate-800" />
                                        <Input
                                            id="fname"
                                            name="fname"
                                            type="text"
                                            placeholder="مثلا: محمد"
                                            className="pr-8"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* LastName Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="lname">فامیلی</Label>
                                    <div className="relative">
                                        <Input
                                            id="lname"
                                            name="lname"
                                            type="text"
                                            placeholder="مثلا: محمدی"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* phone Field */}
                            <div className="space-y-2">
                                <Label htmlFor="phone">شماره موبایل</Label>
                                <div className="relative">
                                    <Mail className="absolute right-3 top-[10px] h-4 w-4 text-slate-800" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="مثلا: ۰۹۱۲۳۴۵۶۷۸۹"
                                        className="pr-8"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password">رمز عبور</Label>
                                <div className="relative">
                                    <Lock className="absolute right-3 top-[10px] h-4 w-4 text-slate-800" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="مثلا: abc@123"
                                        className="pr-8"
                                        required
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

                            {/* Repeat Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password2">
                                    تکرار رمز عبور </Label>
                                <div className="relative">
                                    <ShieldPlus className="absolute right-3 top-[10px] h-4 w-4 text-slate-800" />
                                    <Input
                                        id="password2"
                                        name="password2"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="رمز عبور خود را تکرار کنید"
                                        className="pr-8"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Register Button */}
                            <Button type="submit" className="w-full">
                                ثبت نام
                            </Button>
                        </form>

                        {/*/!* Divider *!/*/}
                        {/*<div className="relative">*/}
                        {/*    <div className="absolute inset-0 flex items-center">*/}
                        {/*        <Separator className="w-full" />*/}
                        {/*    </div>*/}
                        {/*    <div className="relative flex justify-center text-xs uppercase">*/}
                        {/*        <span className="bg-card px-2 text-muted-foreground">*/}
                        {/*            Or continue with*/}
                        {/*        </span>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/* Social Register */}
                        {/*<div className="grid grid-cols-3 gap-2">*/}
                        {/*    <Button variant="outline" className="w-full">*/}
                        {/*        <Chrome className="h-4 w-4 mr-2" />*/}
                        {/*        Google*/}
                        {/*    </Button>*/}
                        {/*    <Button variant="outline" className="w-full">*/}
                        {/*        <Github className="h-4 w-4 mr-2" />*/}
                        {/*        Github*/}
                        {/*    </Button>*/}
                        {/*    <Button variant="outline" className="w-full">*/}
                        {/*        <Facebook className="h-4 w-4 mr-2" />*/}
                        {/*        Facebook*/}
                        {/*    </Button>*/}
                        {/*</div>*/}

                        {/* Sign Up Link */}
                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">
اکانت ادمین داری؟                            </span>
                            <Button
                                variant="link"
                                className="px-0 font-normal"
                                onClick={() => navigate('/login')}
                            >
                                با اکانت خود وارد شوید </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-8 text-xs text-muted-foreground">
                    با ورود و ثبت نام شرایط و قوانین کارلینو را قبول میکنید 🐳{' '}
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

export default RegisterPage;
