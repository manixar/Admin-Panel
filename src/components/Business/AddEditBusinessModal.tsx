import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { EyeClosed, Upload, Eye } from 'lucide-react';
import React, { useState } from 'react';
import type { Business } from '@/components/BusinessPage';

interface AddEditBusinessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (business: Business) => void;
}

const emptyForm = {
    businessName: '',
    businessEmail: '',
    ownerName: '',
    categoryName: '',
    status: '' as Business['status'] | '',
    ownerPhone: '',
    password: '',
};

export const AddEditBusinessModal = ({
    isOpen,
    onClose,
    onAdd,
}: AddEditBusinessModalProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [form, setForm] = useState(emptyForm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !form.businessName ||
            !form.businessEmail ||
            !form.ownerName ||
            !form.categoryName ||
            !form.status
        ) {
            alert('لطفاً همه‌ی فیلدهای ضروری را پر کنید');
            return;
        }

        toast.success('ادمین عزیز,', {
            description:
                'درخواست شما ارسال شد. بعد از تایید پشتیبانی، کسب و کار اضافه می‌شود.',
            duration: 5000,
            className: 'rtl-toast',
            style: {
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                color: '#065f46',
            },
        });

        const newBusiness: Business = {
            id: Date.now().toString(), // بعداً از سرور می‌گیریم
            businessName: form.businessName,
            businessEmail: form.businessEmail,
            ownerName: form.ownerName,
            categoryName: form.categoryName,
            status: form.status as Business['status'],
            ownerPhone: form.ownerPhone,
            lastLogin: 'Never',
            avatar: '/public/avatar/avatar.webp',
        };

        onAdd(newBusiness);
        setForm(emptyForm);
        onClose();
    };

    const handleClose = () => {
        setForm(emptyForm);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md max-h-[90vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        کسب و کار جدید
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col items-center gap-3">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="/public/avatar/avatar.webp" />
                            <AvatarFallback className="text-lg"></AvatarFallback>
                        </Avatar>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            بارگزاری تصویر
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="businessName">
                            اسم کامل کسب و کار *
                        </Label>
                        <Input
                            id="businessName"
                            name="businessName"
                            value={form.businessName}
                            onChange={handleChange}
                            placeholder="مثال: سالن زیبایی شارین"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="businessEmail">ایمیل کسب و کار *</Label>
                        <Input
                            type="email"
                            id="businessEmail"
                            name="businessEmail"
                            value={form.businessEmail}
                            onChange={handleChange}
                            placeholder="ایمیل کسب و کار را وارد کنید"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="ownerName">نام مدیر کسب و کار *</Label>
                        <Input
                            id="ownerName"
                            name="ownerName"
                            value={form.ownerName}
                            onChange={handleChange}
                            placeholder="مثال: امیر امیری"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>دسته‌بندی *</Label>
                            <Select
                                value={form.categoryName}
                                onValueChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        categoryName: value,
                                    }))
                                }
                                required
                            >
                                <SelectTrigger className="w-full ">
                                    <SelectValue placeholder="انتخاب دسته‌بندی" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="خدمات آرایشی بهداشتی">
                                        خدمات آرایشی بهداشتی
                                    </SelectItem>
                                    <SelectItem value="کافه | رستوران">
                                        کافه | رستوران
                                    </SelectItem>
                                    <SelectItem value="فروشگاه اینترنتی">
                                        فروشگاه اینترنتی
                                    </SelectItem>
                                    <SelectItem value="خدمات ماشین و لوازم یدکی">
                                        خدمات ماشین و لوازم یدکی
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>وضعیت کسب و کار *</Label>
                            <Select
                                value={form.status}
                                onValueChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        status: value as Business['status'],
                                    }))
                                }
                                required
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="مثال: تایید شده" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="تایید شده">
                                        تایید شده
                                    </SelectItem>
                                    <SelectItem value="تعلیق">تعلیق</SelectItem>
                                    <SelectItem value="رد شده">
                                        رد شده
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="ownerPhone">شماره همراه مدیر</Label>
                        <Input
                            id="ownerPhone"
                            name="ownerPhone"
                            value={form.ownerPhone}
                            onChange={handleChange}
                            placeholder="مثال: 09123456789"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">رمزعبور ادمین *</Label>
                        <div className="relative text-right">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute left-0 top-0 h-full px-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeClosed className="h-4 w-4 text-slate-800" />
                                ) : (
                                    <Eye className="h-4 w-4 text-slate-800" />
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="flex gap-2 px-4">
                        <Button
                            type="button"
                            variant="outlineDestructive"
                            className="flex-1 cursor-pointer"
                            onClick={handleClose}
                        >
                            منصرف شدم
                        </Button>
                        <Button
                            type="submit"
                            variant="default"
                            className="flex-1 cursor-pointer"
                        >
                            اضافه کردن
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
