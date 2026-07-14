import { Download, Home, Plus, Trash2, FunnelX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, X, FileText, Sheet, FileSpreadsheet } from 'lucide-react';

interface BusinessHeaderProps {
    onAddUser: () => void;
    searchQuery: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusChange: (value: string) => void;
    categoryFilter: string;
    onCategoryChange: (value: string) => void;
    onClearFilters: () => void;
    selectedCount: number;
    onDeleteSelected: () => void;
}

export const BusinessHeader = ({
    onAddUser,
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusChange,
    categoryFilter,
    onCategoryChange,
    onClearFilters,
    selectedCount,
    onDeleteSelected,
}: BusinessHeaderProps) => {
    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <nav className="text-sm text-muted-foreground mb-1 flex items-center">
                        <span className="hover:text-foreground cursor-pointer flex items-center">
                            <Home className="w-4 h-4 mr-1" />
                        </span>
                        <span className="mx-2">/</span>
                        <span className="text-gray font-medium">
                            کسب و کار ها
                        </span>
                    </nav>
                    <h1 className="text-2xl font-bold">کسب و کار ها</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>مدیریت حساب‌های کاربری، نقش‌ها و مجوزها</span>
                    </div>
                </div>
                <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={onAddUser}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    کسب و کار جدید
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="دنبال کدوم کسب و کاری؟ سرچ کن..."
                        className="pr-10"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    {searchQuery && (
                        <Button
                            variant="ghost"
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => onSearchChange('')}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    {selectedCount > 0 && (
                        <div className="flex items-center gap-2 px-2 py-0.5 bg-muted rounded-lg">
                            <Badge variant="secondary">
                                {selectedCount} کسب و کار انتخاب شده
                            </Badge>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive/70 hover:text-destructive dark:text-rose-400 dark:hover:text-rose-600 cursor-pointer"
                                onClick={onDeleteSelected}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="cursor-pointer"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <FileSpreadsheet className="h-4 w-4 mr-1" />
                                Export as CSV
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-1" />
                                Export as PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Sheet className="h-4 w-4 mr-1" />
                                Export as Excel
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            جست و جو بر اساس وضعیت
                        </label>
                        <Select
                            value={statusFilter}
                            onValueChange={onStatusChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="همه" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">همه</SelectItem>
                                <SelectItem value="تایید شده">
                                    تایید شده
                                </SelectItem>
                                <SelectItem value="تعلیق">تعلیق</SelectItem>
                                <SelectItem value="رد شده">رد شده</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            جست و جو بر اساس دسته‌بندی
                        </label>
                        <Select
                            value={categoryFilter}
                            onValueChange={onCategoryChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="همه" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">همه</SelectItem>
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
                    <div className="flex items-end">
                        <Button
                            variant="outlineDestructive"
                            className="w-full cursor-pointer"
                            onClick={onClearFilters}
                        >
                            <FunnelX />
                            حذف فیلتر
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
