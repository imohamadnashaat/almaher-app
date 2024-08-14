'use client';

import React, { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import DataTable from '../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Result } from '../../lib/types';
import { putRequest } from '../../lib/api';
import Loading from '../../../components/Loading';

export default function Results() {
  const selectedCourseId = localStorage.getItem('selectedCourseId');
  const { data, error, mutate } = useSWR<Result[]>(
    `results/get-by-course/?course_id=${selectedCourseId}`
  );

  const [globalFilter, setGlobalFilter] = useState('');
  const [localData, setLocalData] = useState<Result[]>([]);

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const columns = useMemo<ColumnDef<Result, any>[]>(
    () => [
      {
        accessorKey: 'result_id',
        header: 'ID',
      },
      {
        accessorKey: 'student_id',
        header: 'Student ID',
      },
      {
        accessorKey: 'student_name',
        header: 'Student Name',
      },
      {
        accessorKey: 'session_number',
        header: 'Session Number',
      },
      {
        accessorKey: 'level_name',
        header: 'Level Name',
      },
      {
        accessorKey: 'theoretical_mark',
        header: 'Theoretical Mark',
      },
      {
        accessorKey: 'practical_mark',
        header: 'Practical Mark',
      },
      {
        accessorKey: 'result',
        header: 'Result',
      },
      {
        accessorKey: 'attendance',
        header: 'Attendance',
      },
      {
        accessorKey: 'result_type',
        header: 'Result Type',
      },
      {
        accessorKey: 'student_pass',
        header: 'Student Pass',
      },
    ],
    []
  );

  if (error) return <div>Failed to load. {error.message}</div>;
  if (!localData) return <Loading />;

  return (
    <DataTable
      data={localData}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
}
