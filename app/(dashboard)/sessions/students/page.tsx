'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import DataTable from '../../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { SessionStudent } from '../../../lib/types';

export default function SessionsStudents() {
  const selectedCourseId = localStorage.getItem('selectedCourseId');
  const { data, error } = useSWR<SessionStudent[]>(
    `sessions/students/?course_id=${selectedCourseId}`
  );

  const [globalFilter, setGlobalFilter] = useState('');

  const dataWithIndex = useMemo(
    () => data?.map((item, index) => ({ ...item, index: index + 1 })) || [],
    [data]
  );

  const columns = useMemo<ColumnDef<SessionStudent & { index: number }, any>[]>(
    () => [
      {
        accessorFn: (row) => row.index,
        id: 'index',
        header: 'No.',
      },
      {
        accessorKey: 'student_full_name',
        header: 'Student',
      },
      {
        accessorKey: 'session_data.session_number',
        header: 'Session Number',
      },
      {
        accessorKey: 'session_data.course_id',
        header: 'Course',
      },
      {
        accessorKey: 'session_data.level_id',
        header: 'Level',
      },
      {
        accessorKey: 'session_data.teacher_full_name',
        header: 'Teacher',
      },
      {
        accessorKey: 'create_date',
        header: 'Create Date',
      },
    ],
    []
  );

  if (error) return <div>Failed to load. {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <DataTable
      data={dataWithIndex}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
}
