'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import DataTable from '../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Session } from '../../lib/types';

export default function Sessions() {
  const selectedCourseId = localStorage.getItem('selectedCourseId');
  const { data, error } = useSWR<Session[]>(
    `sessions/?course_id=${selectedCourseId}`
  );

  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();

  const handleView = (id: number) => {
    router.push(`/sessions/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/sessions/update/${id}`);
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete
  };

  const columns = useMemo<ColumnDef<Session, any>[]>(
    () => [
      {
        accessorKey: 'session_id',
        header: 'ID',
      },
      {
        accessorKey: 'session_number',
        header: 'Session Number',
      },
      {
        accessorKey: 'teacher_full_name',
        header: 'Teacher',
      },
      {
        accessorKey: 'course_id',
        header: 'Course',
      },
      {
        accessorKey: 'level_id',
        header: 'Level',
      },
      {
        accessorKey: 'position_id',
        header: 'Position',
      },
      {
        accessorKey: 'time_id',
        header: 'Time',
      },

      {
        accessorKey: 'create_date',
        header: 'Create Date',
      },

      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleView(row.original.session_id)}
              className="text-blue-500 hover:underline"
            >
              View
            </button>
            <button
              onClick={() => handleUpdate(row.original.session_id)}
              className="text-green-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.session_id)}
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
