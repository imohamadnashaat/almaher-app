'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import DataTable from '../../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { SessionStudentDetails } from '../../../lib/types';
import Loading from '../../../../components/Loading';

export default function SessionsStudents() {
  const selectedCourseId = localStorage.getItem('selectedCourseId');
  const { data, error } = useSWR<SessionStudentDetails[]>(
    `sessions/students/details/?course_id=${selectedCourseId}`
  );

  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<SessionStudentDetails, any>[]>(
    () => [
      {
        accessorKey: 'session_data.session_number',
        header: 'رقم الجلسة',
      },
      {
        accessorKey: 'student_full_name',
        header: 'الاسم',
      },
      {
        accessorKey: 'student_data.father_name',
        header: 'اسم الاب',
      },
      {
        accessorKey: 'session_data.level_id',
        header: 'المستوى',
      },
      {
        accessorKey: 'session_data.time_id',
        header: 'الوقت',
      },
      {
        accessorKey: 'session_data.position_id',
        header: 'المكان',
      },
      {
        accessorKey: 'session_data.teacher_full_name',
        header: 'المدرس',
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
