'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import DataTable from '../../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Person } from '../../../lib/types';

export default function Students() {
  const { data, error } = useSWR<Person[]>('persons/?type=Student');
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();

  const handleView = (id: number) => {
    router.push(`/persons/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/persons/update/${id}`);
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete
  };

  const columns = useMemo<ColumnDef<Person, any>[]>(
    () => [
      {
        accessorKey: 'person_id',
        header: 'ID',
      },
      {
        accessorKey: 'first_name',
        header: 'الاسم',
      },
      {
        accessorKey: 'last_name',
        header: 'الكنية',
      },
      {
        accessorKey: 'father_name',
        header: 'سام الأب',
      },
      {
        accessorKey: 'home_number',
        header: 'رقم المنزل',
      },
      {
        accessorKey: 'phone_number',
        header: 'رقم الهاتف',
      },
      {
        accessorKey: 'job',
        header: 'العمل',
      },
      {
        accessorKey: 'address',
        header: 'العنوان',
      },
      {
        accessorKey: 'bdate',
        header: 'تاريخ الميلاد',
      },
      {
        accessorKey: 'level_id',
        header: 'المستوى',
      },
      {
        accessorKey: 'priority_id',
        header: 'الأولوية',
      },
      {
        accessorKey: 'status',
        header: 'الحالة',
        cell: (info) => (info.getValue() ? '🟢' : '🔴'),
      },
      {
        accessorKey: 'create_date',
        header: 'تاريخ الانضمام',
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleView(row.original.person_id)}
              className="text-blue-500 hover:underline"
            >
              View
            </button>
            <button
              onClick={() => handleUpdate(row.original.person_id)}
              className="text-green-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.person_id)}
              className="text-red-500 hover:underline"
            >
              Del
            </button>
          </div>
        ),
      },
    ],
    [router]
  );

  if (error) return <div>Failed to load. {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <DataTable
      data={data}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
}
