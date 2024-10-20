'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import DataTable from '../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Course } from '../../lib/types';
import Loading from '../../../components/Loading';

export default function Courses() {
  const { data, error } = useSWR<Course[]>('courses/');
  const [globalFilter, setGlobalFilter] = useState('');

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
    ],
    []
  );

  if (!data) return <Loading />;

  return (
    <DataTable
      data={data}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
}
