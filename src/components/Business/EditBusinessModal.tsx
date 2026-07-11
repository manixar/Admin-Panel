// src/components/EditBusinessModal.tsx

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { X, XCircle, AlertCircle, Check, Pencil, Save } from 'lucide-react';
import type { Business } from './BusinessPage';

interface EditBusinessModalProps {
    isOpen: boolean;
    onClose: () => void;
    business: Business | null;
    onUpdate: (updatedBusiness: Business) => void;
    onDelete: (businessId: number) => void;
}

// رسانه‌ها
const mediaItems = [
    {
        id: 'image1',
        type: 'image' as const,
        label: 'تصویر ۱',
        url: '/images/business-1.jpg',
    },
    {
        id: 'image2',
        type: 'image' as const,
        label: 'تصویر ۲',
        url: '/images/business-2.jpg',
    },
    {
        id: 'image3',
        type: 'image' as const,
        label: 'تصویر ۳',
        url: '/images/business-3.jpg',
    },
    {
        id: 'video',
        type: 'video' as const,
        label: 'ویدیو',
        url: '/videos/business.mp4',
    },
];

export const EditBusinessModal = ({
    isOpen,
    onClose,
    business,
    onUpdate,
    onDelete,
}: EditBusinessModalProps) => {
    // State اصلی
    const [formData, setFormData] = useState<Business | null>(null);
    const [status, setStatus] = useState<string>('فعال');
    const [rejections, setRejections] = useState<Record<string, string>>({});
    const [editingField, setEditingField] = useState<string | null>(null);
    const [tempReason, setTempReason] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // وقتی business تغییر می‌کند، فرم را آپدیت کن
    useEffect(() => {
        if (business) {
            setFormData(business);
            setStatus(business.status || 'فعال');
            // اگر rejections قبلی وجود دارد، بازیابی کن
            if (business.rejections) {
                const rejMap: Record<string, string> = {};
                business.rejections.forEach((r: any) => {
                    rejMap[r.fieldId] = r.reason;
                });
                setRejections(rejMap);
            } else {
                setRejections({});
            }
        }
    }, [business]);

    if (!formData) return null;

    // فیلدهای فرم
    const fields = [
        {
            id: 'name',
            label: 'نام کسب و کار',
            value: formData.name,
            placeholder: 'مثال: سالن زیبایی شارین',
        },
        {
            id: 'email',
            label: 'ایمیل',
            value: formData.email,
            placeholder: 'example@gmail.com',
        },
        {
            id: 'phone',
            label: 'شماره همراه',
            value: formData.phone,
            placeholder: '۰۹۱۲۳۴۵۶۷۸۹',
        },
        {
            id: 'role',
            label: 'نقش',
            value: formData.role,
            placeholder: 'مثال: مدیر',
        },
        {
            id: 'department',
            label: 'دپارتمان',
            value: formData.department,
            placeholder: 'مثال: IT',
        },
        {
            id: 'description',
            label: 'توضیحات',
            value: formData.description || '',
            placeholder: 'توضیحات کسب و کار...',
        },
    ];

    // تغییر فیلد
    const handleFieldChange = (fieldId: string, value: any) => {
        setFormData({
            ...formData,
            [fieldId]: value,
        });
    };

    // شروع ویرایش دلیل
    const startEditing = (fieldId: string) => {
        setEditingField(fieldId);
        setTempReason(rejections[fieldId] || '');
    };

    // تایید دلیل
    const confirmReason = (fieldId: string) => {
        if (!tempReason.trim()) {
            alert('لطفاً دلیل را وارد کنید');
            return;
        }

        setRejections({
            ...rejections,
            [fieldId]: tempReason,
        });

        setEditingField(null);
        setTempReason('');

        // اگر حداقل یک رد وجود دارد، وضعیت را "رد شده" کن
        const newRejections = { ...rejections, [fieldId]: tempReason };
        const hasRejection = Object.keys(newRejections).length > 0;
        if (hasRejection && status !== 'رد شده') {
            setStatus('رد شده');
        }
    };

    // حذف دلیل
    const removeRejection = (fieldId: string) => {
        const newRejections = { ...rejections };
        delete newRejections[fieldId];
        setRejections(newRejections);

        // اگر هیچ ردی باقی نماند و وضعیت "رد شده" بود، به "فعال" برگردان
        if (Object.keys(newRejections).length === 0 && status === 'رد شده') {
            setStatus('فعال');
        }
    };

    // ذخیره نهایی
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // ساخت آبجکت نهایی
        const rejectionArray = Object.keys(rejections).map((key) => ({
            fieldId: key,
            fieldLabel: fields.find((f) => f.id === key)?.label || key,
            reason: rejections[key],
        }));

        const updatedBusiness: Business = {
            ...formData,
            status: status,
            rejections: rejectionArray,
        };

        console.log('📤 ذخیره:', updatedBusiness);

        // فراخوانی تابع به‌روزرسانی
        setTimeout(() => {
            onUpdate(updatedBusiness);
            setIsSaving(false);
            onClose();
        }, 500);
    };

    // حذف
    const handleDelete = () => {
        if (window.confirm('آیا از حذف این کسب و کار مطمئن هستید؟')) {
            onDelete(formData.id);
            onClose();
        }
    };

    // بررسی رد شدن
    const isRejected = (fieldId: string) => {
        return !!rejections[fieldId];
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="max-w-4xl max-h-[90vh] overflow-y-auto"
                dir="rtl"
            >
                <DialogHeader>
                    <DialogTitle className="text-right text-xl">
                        ویرایش کسب و کار: {formData.name}
                    </DialogTitle>
                    {Object.keys(rejections).length > 0 && (
                        <Badge variant="destructive" className="mt-2">
                            {Object.keys(rejections).length} مورد رد شده
                        </Badge>
                    )}
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* فیلدها */}
                    <div className="grid grid-cols-2 gap-4">
                        {fields.map((field) => {
                            const rejected = isRejected(field.id);
                            const isEditing = editingField === field.id;

                            return (
                                <div
                                    key={field.id}
                                    className={`space-y-2 ${field.id === 'description' ? 'col-span-2' : ''}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <Label className="text-right">
                                            {field.label}
                                            {rejected && (
                                                <span className="mr-2 text-red-500 text-xs">
                                                    (رد شده)
                                                </span>
                                            )}
                                        </Label>
                                        {!rejected ? (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 w-6 p-0 text-red-400 hover:text-red-600"
                                                onClick={() =>
                                                    startEditing(field.id)
                                                }
                                            >
                                                <XCircle className="h-4 w-4" />
                                            </Button>
                                        ) : (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 w-6 p-0 text-blue-400 hover:text-blue-600"
                                                onClick={() =>
                                                    startEditing(field.id)
                                                }
                                            >
                                                <Pencil className="h-3 w-3" />
                                            </Button>
                                        )}
                                    </div>

                                    {/* ورودی */}
                                    <div
                                        className={
                                            rejected && !isEditing
                                                ? 'opacity-60'
                                                : ''
                                        }
                                    >
                                        {field.id === 'description' ? (
                                            <Textarea
                                                value={field.value as string}
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        field.id,
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={field.placeholder}
                                                className="min-h-[80px] text-right"
                                                disabled={
                                                    rejected && !isEditing
                                                }
                                                dir="rtl"
                                            />
                                        ) : (
                                            <Input
                                                value={field.value as string}
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        field.id,
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={field.placeholder}
                                                className="text-right"
                                                disabled={
                                                    rejected && !isEditing
                                                }
                                                dir="rtl"
                                            />
                                        )}
                                    </div>

                                    {/* ویرایش دلیل */}
                                    {isEditing && (
                                        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                                            <Label className="text-sm text-amber-700">
                                                دلیل رد شدن {field.label}:
                                            </Label>
                                            <Textarea
                                                value={tempReason}
                                                onChange={(e) =>
                                                    setTempReason(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="مثال: نام کسب و کار مناسب نیست"
                                                className="min-h-[60px] text-right mt-2"
                                                dir="rtl"
                                                autoFocus
                                            />
                                            <div className="flex gap-2 mt-2">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    onClick={() =>
                                                        confirmReason(field.id)
                                                    }
                                                    disabled={
                                                        !tempReason.trim()
                                                    }
                                                    className="flex-1"
                                                >
                                                    <Check className="ml-1 h-3 w-3" />
                                                    تایید
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setEditingField(null);
                                                        setTempReason('');
                                                    }}
                                                    className="flex-1"
                                                >
                                                    انصراف
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* نمایش دلیل */}
                                    {rejected && !isEditing && (
                                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                                                <p className="text-sm text-red-700 flex-1">
                                                    {rejections[field.id]}
                                                </p>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-5 w-5 p-0 text-red-500 hover:text-red-700"
                                                    onClick={() =>
                                                        removeRejection(
                                                            field.id
                                                        )
                                                    }
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* وضعیت */}
                    <div className="flex items-center gap-4 pt-2 border-t">
                        <Label className="min-w-[100px]">وضعیت:</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="فعال">فعال</SelectItem>
                                <SelectItem value="غیرفعال">غیرفعال</SelectItem>
                                <SelectItem value="تعلیق">تعلیق</SelectItem>
                                <SelectItem value="رد شده">رد شده</SelectItem>
                            </SelectContent>
                        </Select>
                        <Badge
                            className={
                                status === 'فعال'
                                    ? 'bg-emerald-500'
                                    : status === 'غیرفعال'
                                      ? 'bg-gray-500'
                                      : status === 'تعلیق'
                                        ? 'bg-amber-500'
                                        : 'bg-red-500'
                            }
                        >
                            {status}
                        </Badge>
                    </div>

                    {/* رسانه‌ها */}
                    <div className="pt-2 border-t">
                        <Label className="text-right block mb-3">
                            رسانه‌ها
                        </Label>
                        <div className="grid grid-cols-4 gap-4">
                            {mediaItems.map((media) => {
                                const rejected = isRejected(media.id);
                                const isEditing = editingField === media.id;

                                return (
                                    <div key={media.id} className="space-y-2">
                                        <div
                                            className={`relative rounded-lg overflow-hidden border-2 ${rejected ? 'border-red-300 opacity-60' : 'border-gray-200'}`}
                                        >
                                            {media.type === 'image' ? (
                                                <img
                                                    src={media.url}
                                                    alt={media.label}
                                                    className="w-full h-32 object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                                                    <video
                                                        className="w-full h-32 object-cover"
                                                        controls
                                                    >
                                                        <source
                                                            src={media.url}
                                                            type="video/mp4"
                                                        />
                                                    </video>
                                                </div>
                                            )}
                                            {!rejected ? (
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-2 left-2 h-6 w-6 p-0"
                                                    onClick={() =>
                                                        startEditing(media.id)
                                                    }
                                                >
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute top-2 left-2 h-6 w-6 p-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                                                    onClick={() =>
                                                        startEditing(media.id)
                                                    }
                                                >
                                                    <Pencil className="h-3 w-3" />
                                                </Button>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                                                {media.label}
                                                {rejected && (
                                                    <span className="mr-2 text-red-300">
                                                        (رد شده)
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {isEditing && (
                                            <div className="p-2 bg-amber-50 border border-amber-200 rounded-md">
                                                <Label className="text-xs text-amber-700">
                                                    دلیل رد شدن {media.label}:
                                                </Label>
                                                <Textarea
                                                    value={tempReason}
                                                    onChange={(e) =>
                                                        setTempReason(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="مثال: تصویر نامناسب است"
                                                    className="min-h-[50px] text-xs text-right mt-1"
                                                    dir="rtl"
                                                    autoFocus
                                                />
                                                <div className="flex gap-1 mt-1">
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        className="flex-1 h-7 text-xs"
                                                        onClick={() =>
                                                            confirmReason(
                                                                media.id
                                                            )
                                                        }
                                                        disabled={
                                                            !tempReason.trim()
                                                        }
                                                    >
                                                        <Check className="ml-1 h-3 w-3" />
                                                        تایید
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 h-7 text-xs"
                                                        onClick={() => {
                                                            setEditingField(
                                                                null
                                                            );
                                                            setTempReason('');
                                                        }}
                                                    >
                                                        انصراف
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {rejected && !isEditing && (
                                            <div className="p-2 bg-red-50 border border-red-200 rounded-md">
                                                <div className="flex items-start gap-1">
                                                    <AlertCircle className="h-3 w-3 text-red-500 shrink-0 mt-0.5" />
                                                    <p className="text-xs text-red-700 flex-1">
                                                        {rejections[media.id]}
                                                    </p>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-4 w-4 p-0 text-red-500"
                                                        onClick={() =>
                                                            removeRejection(
                                                                media.id
                                                            )
                                                        }
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* دکمه‌ها */}
                    <div className="flex gap-2 pt-4 border-t">
                        <Button
                            type="button"
                            variant="destructive"
                            className="flex-1"
                            onClick={handleDelete}
                            disabled={isSaving}
                        >
                            حذف کسب و کار
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>
                                    <span className="animate-spin ml-2">
                                        ⏳
                                    </span>
                                    در حال ذخیره...
                                </>
                            ) : (
                                <>
                                    <Save className="ml-2 h-4 w-4" />
                                    ذخیره تغییرات
                                </>
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSaving}
                        >
                            انصراف
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
