import { useState } from 'react';
import { BusinessHeader } from '@/components/Business/BusinessHeader.tsx';
import { AddEditBusinessModal } from '@/components/Business/AddEditBusinessModal.tsx';
import { BusinessTable } from '@/components/Business/BusinessTable.tsx';

export interface Business {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'فعال' | 'تعلیق' | 'غیرفعال';
    department: string;
    lastLogin: string;
    avatar?: string;
    phone?: string;
    employeeId?: string;
}

export const BusinessPage = () => {
    const business: Business[] = [
        {
            id: '1',
            name: 'کسب و کار ۱',
            email: '...@company.com',
            role: 'ادمین',
            status: 'فعال',
            department: 'سالن',
            lastLogin: '2025-10-11T10:30:03',
            avatar: '/public/avatar/avatar.webp',
            phone: '+1 (555) 123-4567',
            employeeId: 'CS001',
        },
        {
            id: '2',
            name: 'کسب و کار ۲',
            email: 'sarah.wilson@company.com',
            role: 'ادمین',
            status: 'فعال',
            department: 'رستوران',
            lastLogin: '2025-10-12T16:35:51',
            avatar: '/public/avatar/avatar3.webp',
            phone: '+1 (555) 234-5678',
            employeeId: 'CS002',
        },
        {
            id: '3',
            name: 'کسب و کار ۳',
            email: 'mike.johnson@company.com',
            role: 'مدیر',
            status: 'غیرفعال',
            department: 'انلاین شاپ',
            lastLogin: '2025-10-12T16:35:51',
            avatar: '/public/avatar/avatar5.webp',
            phone: '+1 (555) 345-6789',
            employeeId: 'CS003',
        },
        {
            id: '4',
            name: 'کسب و کار ۴',
            email: 'emily.chen@company.com',
            role: 'مدیر',
            status: 'تعلیق',
            department: 'تعمیرگاه',
            lastLogin: '2025-10-08T11:28:32',
            avatar: '/public/avatar/avatar2.webp',
            phone: '+1 (555) 456-7890',
            employeeId: 'CS004',
        },
    ];

    const [isAddEditUserModal, setIsAddEditUserModal] =
        useState<boolean>(false);

    const handleAddUser = () => {
        setIsAddEditUserModal(true);
    };

    return (
        <div className="space-y-6 p-6">
            <BusinessHeader onAddUser={handleAddUser} />

            <BusinessTable business={business} />

            <AddEditBusinessModal
                isOpen={isAddEditUserModal}
                onClose={() => setIsAddEditUserModal(false)}
            />
        </div>
    );
};
