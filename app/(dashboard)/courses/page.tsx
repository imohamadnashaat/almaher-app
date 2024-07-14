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
    ],
    []
  );

  if (error) return <div>Failed to load. {error.message}</div>;
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
