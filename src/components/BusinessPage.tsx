import { useState } from 'react';
import { BusinessHeader } from '@/components/Business/BusinessHeader.tsx';
import { AddEditBusinessModal } from '@/components/Business/AddEditBusinessModal.tsx';
import { BusinessTable } from '@/components/Business/BusinessTable.tsx';

export interface Business {
    id: string;
    businessName: string;
    ownerName: string;
    businessEmail: string;
    status: 'تایید شده' | 'تعلیق' | 'رد شده';
    categoryName: string;
    lastLogin: string;
    avatar?: string;
    ownerPhone?: string;
    ownerBusinessId?: string;
    socialMedia?: {
        instagram: string;
        whatsapp: string;
        linkedin: string;
        telegram: string;
        rubika: string;
        bale: string;
    };
    rejection?: { field: string; fieldLabel: string; reason: string }[];
}

const initialBusinesses: Business[] = [
    {
        id: '1',
        businessName: 'سالن شارین',
        ownerName: 'امیر امیری',
        businessEmail: '...@company.com',
        status: 'تایید شده',
        categoryName: 'خدمات آرایشی بهداشتی',
        lastLogin: '2025-10-11T10:30:03',
        avatar: '/public/avatar/avatar.webp',
        ownerPhone: '0912 888 8888',
        ownerBusinessId: 'CS001',
    },
    {
        id: '2',
        businessName: 'رستوران سارا',
        ownerName: 'امیر امیری',
        businessEmail: 'sarah.wilson@company.com',
        status: 'تایید شده',
        categoryName: 'کافه | رستوران',
        lastLogin: '2025-10-12T16:35:51',
        avatar: '/public/avatar/avatar3.webp',
        ownerPhone: '0912 888 8888',
        ownerBusinessId: 'CS002',
    },
    {
        id: '3',
        businessName: 'فروشگاه سریتا',
        ownerName: 'نام مدیر',
        businessEmail: 'sarah.wilson@company.com',
        status: 'رد شده',
        categoryName: 'فروشگاه اینترنتی',
        lastLogin: '2025-10-12T16:35:51',
        avatar: '/public/avatar/avatar5.webp',
        ownerPhone: '0912 888 8888',
        ownerBusinessId: 'CS003',
    },
    {
        id: '4',
        businessName: 'تعمیرگاه خانی',
        ownerName: 'نام مدیر',
        businessEmail: 'sarah.wilson@company.com',
        status: 'تعلیق',
        categoryName: 'خدمات ماشین و لوازم یدکی',
        lastLogin: '2025-10-08T11:28:32',
        avatar: '/public/avatar/avatar2.webp',
        ownerPhone: '0912 888 8888',
        ownerBusinessId: 'CS004',
    },
];

export const BusinessPage = () => {
    const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isAddEditUserModal, setIsAddEditUserModal] =
        useState<boolean>(false);

    const filteredBusinesses = businesses.filter((b) => {
        const matchesSearch = b.businessName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === 'All' || b.status === statusFilter;
        const matchesCategory =
            categoryFilter === 'All' || b.categoryName === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const handleClearFilters = () => {
        setSearchQuery('');
        setStatusFilter('All');
        setCategoryFilter('All');
    };

    const handleAddUser = () => {
        setIsAddEditUserModal(true);
    };

    const handleUpdateBusiness = (updated: Business) => {
        setBusinesses((prev) =>
            prev.map((b) => (b.id === updated.id ? updated : b))
        );
    };

    const handleDeleteBusiness = (id: string) => {
        setBusinesses((prev) => prev.filter((b) => b.id !== id));
        setSelectedIds((prev) => prev.filter((sid) => sid !== id));
    };

    const handleDeleteSelected = () => {
        setBusinesses((prev) =>
            prev.filter((b) => !selectedIds.includes(b.id))
        );
        setSelectedIds([]);
    };

    return (
        <div className="space-y-6 p-6">
            <BusinessHeader
                onAddUser={handleAddUser}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                categoryFilter={categoryFilter}
                onCategoryChange={setCategoryFilter}
                onClearFilters={handleClearFilters}
                selectedCount={selectedIds.length}
                onDeleteSelected={handleDeleteSelected}
            />

            <BusinessTable
                business={filteredBusinesses}
                onUpdateBusiness={handleUpdateBusiness}
                onDeleteBusiness={handleDeleteBusiness}
                selectedIds={selectedIds}
                onSelectedIdsChange={setSelectedIds}
            />

            <AddEditBusinessModal
                isOpen={isAddEditUserModal}
                onClose={() => setIsAddEditUserModal(false)}
                onAdd={handleAddUser}
            />
        </div>
    );
};
