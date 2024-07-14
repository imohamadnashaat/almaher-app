'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import DataTable from '../../../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { SessionAvailableStudent } from '../../../../lib/types';
import Loading from '../../../../../components/Loading';

export default function SessionsStudentsWaitlist() {
  const selectedCourseId = localStorage.getItem('selectedCourseId');
  const { data, error } = useSWR<SessionAvailableStudent[]>(
    `sessions/students/available/?course_id=${selectedCourseId}`
  );

  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<SessionAvailableStudent, any>[]>(
    () => [
      {
        accessorKey: 'person_id',
        header: '#',
      },
      {
        accessorKey: 'first_name',
        header: 'الاسم الاول',
      },
      {
        accessorKey: 'last_name',
        header: 'الاسم الاخير',
      },
      {
        accessorKey: 'bdate',
        header: 'تاريخ الميلاد',
      },
      {
        accessorKey: 'level_id_id',
        header: 'المستوى',
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
