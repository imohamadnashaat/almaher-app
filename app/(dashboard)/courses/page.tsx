'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import DataTable from '../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Course } from '../../lib/types';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { deleteRequest } from '../../lib/api';

export default function Courses() {
  const router = useRouter();
  const { data, mutate, error } = useSWR<Course[]>('courses/');
  const [globalFilter, setGlobalFilter] = useState('');

  const handleUpdate = (id: number) => {
    router.push(`/courses/update/${id}`);
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (!isConfirmed) {
      return;
    }

    try {
      const result = await deleteRequest(`courses/delete/${id}/`);
      toast.success(`${result.message}`, {
        duration: 4000,
      });

      // Update data after deletion
      mutate();
    } catch (error) {
      console.error(error);
      toast.error('Course is related to other models and cannot be deleted', {
        duration: 4000,
      });
    }
  };

  const columns = useMemo<ColumnDef<Course, any>[]>(
    () => [
      {
        accessorKey: 'course_id',
        header: '#',
      },
      {
        accessorKey: 'course_name',
        header: 'الدورة',
      },
      {
        accessorKey: 'start_date',
        header: 'تاريخ البدء',
      },
      {
        accessorKey: 'end_date',
        header: 'تاريخ الانتهاء',
      },
      {
        accessorKey: 'num_of_session',
        header: 'عدد الجلسات',
      },
      {
        accessorKey: 'create_date',
        header: 'تاريخ الإنشاء',
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleUpdate(row.original.course_id)}
              className="text-green-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.course_id)}
              className="text-red-500 hover:underline"
            >
              Del
            </button>
          </div>
        ),
      },
    ],
    []
  );

  if (!data) return <Loading />;

  return (
    <>
      <Button label="إضافة" redirectTo="/courses/add" />

      <DataTable
        data={data}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
}
