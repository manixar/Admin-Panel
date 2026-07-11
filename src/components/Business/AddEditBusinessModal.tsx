import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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
import { useState } from 'react';

interface AddEditBusinessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddEditBusinessModal = ({
    isOpen,
    onClose,
}: AddEditBusinessModalProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-hidden">
                <DialogHeader>
                    <DialogTitle>کسب و کار جدید</DialogTitle>
                </DialogHeader>

                <form action="javascript:void(0)" className="space-y-4">
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
                        <Label htmlFor="name">اسم کامل کسب و کار *</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="مثال: سالن زیبایی شارین"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">ایمیل کسب و کار *</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="ایمیل کسب و کار را وارد کنید"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>نقش *</Label>
                            <Select required>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="مثال: مدیر" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">ادمین</SelectItem>
                                    <SelectItem value="Boss">مدیر</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>وضعیت کسب و کار *</Label>
                            <Select required>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="مثال: فعال" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">فعال</SelectItem>
                                    <SelectItem value="Inactive">
                                        غیرفعال
                                    </SelectItem>
                                    <SelectItem value="Pending">
                                        تعلیق
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/*<div className="space-y-2">*/}
                    {/*    <Label htmlFor="department">Department *</Label>*/}
                    {/*    <Input*/}
                    {/*        id="department"*/}
                    {/*        name="department"*/}
                    {/*        placeholder="Enter department"*/}
                    {/*        required*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <div className="space-y-2">
                        <Label htmlFor="phone">شماره همراه</Label>
                        <Input
                            id="phone"
                            name="phone"
                            placeholder="مثال: 09123456789"
                        />
                    </div>

                    {/*<div className="space-y-2">*/}
                    {/*    <Label htmlFor="employeeId">Employee ID</Label>*/}
                    {/*    <Input*/}
                    {/*        id="employeeId"*/}
                    {/*        name="employeeId"*/}
                    {/*        placeholder="Enter Employee ID"*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <div className="space-y-2">
                        <Label htmlFor="password">رمزعبور ادمین *</Label>
                        <div className="relative text-right ">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder=""
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
                            onClick={onClose}
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
