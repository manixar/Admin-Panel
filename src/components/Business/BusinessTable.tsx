import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
    Eye,
    MoreHorizontal,
    Edit,
    Trash2,
    ChevronRight,
    ChevronLeft,
} from 'lucide-react';
import type { Business } from '@/components/BusinessPage';
import { EditBusinessModal } from './EditBusinessModal';

interface BusinessTableProps {
    business: Business[];
    onUpdateBusiness: (updatedBusiness: Business) => void;
    onDeleteBusiness: (businessId: string) => void;
    selectedIds: string[];
    onSelectedIdsChange: (ids: string[]) => void;
}

export const BusinessTable = ({
    business,
    onUpdateBusiness,
    onDeleteBusiness,
    selectedIds,
    onSelectedIdsChange,
}: BusinessTableProps) => {
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
        null
    );
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'تایید شده':
                return 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 dark:bg-emerald-200 dark:hover:bg-emerald-300 dark:text-emerald-950';
            case 'تعلیق':
                return 'bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-200 dark:hover:bg-amber-300 dark:text-amber-950';
            case 'رد شده':
                return 'bg-red-200 hover:bg-red-300 text-red-900 dark:bg-red-300 dark:hover:bg-red-400 dark:text-red-950';
            default:
                return 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-200 dark:hover:bg-slate-300 dark:text-slate-950';
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString || dateString === 'Never') return 'هرگز';
        return new Date(dateString).toLocaleDateString('fa-IR');
    };

    const handleEdit = (businessItem: Business) => {
        setSelectedBusiness(businessItem);
        setIsEditModalOpen(true);
    };

    const handleUpdate = (updatedBusiness: Business) => {
        onUpdateBusiness(updatedBusiness);
        setIsEditModalOpen(false);
        setSelectedBusiness(null);
    };

    const handleDelete = (businessId: string) => {
        onDeleteBusiness(businessId);
        setIsEditModalOpen(false);
        setSelectedBusiness(null);
    };

    const allSelected =
        business.length > 0 && selectedIds.length === business.length;

    const toggleSelectAll = () => {
        if (allSelected) {
            onSelectedIdsChange([]);
        } else {
            onSelectedIdsChange(business.map((b) => b.id));
        }
    };

    const toggleSelectOne = (id: string) => {
        if (selectedIds.includes(id)) {
            onSelectedIdsChange(selectedIds.filter((sid) => sid !== id));
        } else {
            onSelectedIdsChange([...selectedIds, id]);
        }
    };

    return (
        <>
            <div className="space-y-4 w-full">
                <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto" dir="rtl">
                        <Table className="w-full">
                            <TableHeader className="bg-muted/40">
                                <TableRow>
                                    <TableHead className="w-12 text-center">
                                        <Checkbox
                                            checked={allSelected}
                                            onCheckedChange={toggleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead className="w-16 text-center">
                                        ID
                                    </TableHead>
                                    <TableHead className="text-right">
                                        نام کسب و کار
                                    </TableHead>
                                    <TableHead className="text-right">
                                        مدیر کسب و کار
                                    </TableHead>
                                    <TableHead className="w-24 text-center">
                                        شماره مدیر کسب و کار
                                    </TableHead>
                                    <TableHead className="w-24 text-center">
                                        نوع خدمات
                                    </TableHead>
                                    <TableHead className="w-24 text-center">
                                        وضعیت
                                    </TableHead>
                                    <TableHead className="w-32 text-center">
                                        تاریخ ایجاد کسب و کار
                                    </TableHead>
                                    <TableHead className="w-20 text-center">
                                        عملیات
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {business.map((businessItem) => (
                                    <TableRow key={businessItem.id}>
                                        <TableCell className="text-center">
                                            <Checkbox
                                                checked={selectedIds.includes(
                                                    businessItem.id
                                                )}
                                                onCheckedChange={() =>
                                                    toggleSelectOne(
                                                        businessItem.id
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell className="text-center font-mono text-sm">
                                            {businessItem.id}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8 shrink-0">
                                                    <AvatarImage
                                                        src={
                                                            businessItem.avatar
                                                        }
                                                        alt={
                                                            businessItem.businessName
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {businessItem.businessName
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')
                                                            .substring(0, 2)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="min-w-0">
                                                    <div className="font-medium truncate text-right">
                                                        {
                                                            businessItem.businessName
                                                        }
                                                    </div>
                                                    <div className="text-muted-foreground text-sm truncate text-right">
                                                        {
                                                            businessItem.businessEmail
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {businessItem.ownerName}
                                        </TableCell>
                                        <TableCell
                                            className="text-center whitespace-nowrap"
                                            dir="ltr"
                                        >
                                            {businessItem.ownerPhone || '-'}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge
                                                variant="outline"
                                                className="whitespace-nowrap"
                                            >
                                                {businessItem.categoryName}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge
                                                className={`${getStatusColor(
                                                    businessItem.status
                                                )} whitespace-nowrap`}
                                            >
                                                {businessItem.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center text-muted-foreground text-sm whitespace-nowrap">
                                            {formatDate(businessItem.lastLogin)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Eye className="ml-2 h-4 w-4" />
                                                        مشاهده
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            handleEdit(
                                                                businessItem
                                                            )
                                                        }
                                                    >
                                                        <Edit className="ml-2 h-4 w-4" />
                                                        ویرایش
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer text-destructive"
                                                        onClick={() => {
                                                            if (
                                                                window.confirm(
                                                                    'آیا از حذف این کسب و کار مطمئن هستید؟'
                                                                )
                                                            ) {
                                                                onDeleteBusiness(
                                                                    businessItem.id
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 className="ml-2 h-4 w-4" />
                                                        حذف
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="flex items-center justify-between px-2">
                    <div className="text-sm text-muted-foreground">
                        نمایش {business.length} مورد
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                            disabled
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="default"
                                size="sm"
                                className="cursor-pointer h-8 w-8 p-0"
                            >
                                ۱
                            </Button>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <EditBusinessModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedBusiness(null);
                }}
                business={selectedBusiness}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </>
    );
};
