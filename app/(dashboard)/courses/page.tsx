'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import DataTable from '../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

interface Course {
  course_id: number;
  course_name: string;
  start_date: string;
  end_date: string;
  num_of_session: number;
  create_date: string;
}

export default function Courses() {
  const { data, error } = useSWR<Course[]>(
    'https://app.almaher.one/api/courses/'
  );
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();

  const handleView = (id: number) => {
    router.push(`/courses/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/courses/update/${id}`);
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete
  };

  const columns = useMemo<ColumnDef<Course, any>[]>(
    () => [
      {
        accessorKey: 'course_id',
        header: 'Course ID',
      },
      {
        accessorKey: 'course_name',
        header: 'Course Name',
      },
      {
        accessorKey: 'start_date',
        header: 'Start Date',
      },
      {
        accessorKey: 'end_date',
        header: 'End Date',
      },
      {
        accessorKey: 'num_of_session',
        header: 'Number of Sessions',
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
              onClick={() => handleView(row.original.course_id)}
              className="text-blue-500 hover:underline"
            >
              View
            </button>
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
