'use client';

import React, { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import DataTable from '../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Result } from '../../lib/types';
import { postRequest, putRequest } from '../../lib/api';
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

  const handleGenerateResults = async () => {
    try {
      const result = await postRequest(
        `results/generate/?course_id=${selectedCourseId}`
      );
      toast.success(`${result.message}`, {
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error('Error while generating exams', {
        duration: 2000,
      });
    }
  };

  if (error) return <div>Failed to load. {error.message}</div>;
  if (!localData) return <Loading />;

  return (
    <>
      <button
        className="bg-blue-500 text-white p-2 mb-4 rounded-lg hover:bg-blue-700 transition-colors mx-2"
        onClick={handleGenerateResults}
      >
        انشاء النتائج
      </button>

      <DataTable
        data={localData}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
}
