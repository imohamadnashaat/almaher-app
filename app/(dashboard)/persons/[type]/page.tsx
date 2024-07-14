'use client';

import React, { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import DataTable from '../../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Person } from '../../../lib/types';
import Button from '../../../../components/Button';
import Loading from '../../../../components/Loading';

export default function Persons() {
  const pathName = usePathname();
  const type = pathName.split('/').pop();
  let url = 'persons/';
  if (type === 'all') {
    url += '';
  } else if (type === 'students') {
    url += '?type=Student';
  } else if (type === 'teachers') {
    url += '?type=Teacher';
  } else if (type === 'graduates') {
    url += '?type=Graduate';
  } else {
    url += '?status=0';
  }

  const { data, error } = useSWR<Person[]>(url);
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();

  const handleView = (id: number) => {
    router.push(`/persons/view/${id}`);
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
        accessorKey: 'type_id',
        header: 'النوع',
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
  if (!data) return <Loading />;

  return (
    <>
      <Button label="إضافة شخص" redirectTo="/persons/add" />
      <DataTable
        data={data}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
}
