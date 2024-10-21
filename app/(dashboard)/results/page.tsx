'use client';

import React, { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import DataTable from '../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Result } from '../../lib/types';
import { postRequest } from '../../lib/api';
import Loading from '../../../components/Loading';
import DownloadButton from '../../../components/DownloadButton';
import Button from '../../../components/Button';

export default function Results() {
  const selectedCourseId = localStorage.getItem('selectedCourseId');
  const { data, error, mutate } = useSWR<Result[]>(
    `results/get-by-course/?course_id=${selectedCourseId}`
  );

  const [globalFilter, setGlobalFilter] = useState('');
  const [localData, setLocalData] = useState<Result[] | null>(null);

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const columns = useMemo<ColumnDef<Result, any>[]>(
    () => [
      {
        accessorKey: 'student_id',
        header: 'ID',
      },
      {
        accessorKey: 'student_name',
        header: 'الاسم',
      },
      {
        accessorKey: 'session_number',
        header: 'الجلسة',
      },
      {
        accessorKey: 'level_name',
        header: 'المستوى',
      },
      {
        accessorKey: 'theoretical_mark',
        header: 'النظري',
      },
      {
        accessorKey: 'practical_mark',
        header: 'العملي',
      },
      {
        accessorKey: 'result',
        header: 'المحصلة',
      },
      {
        accessorKey: 'attendance',
        header: 'الحضور',
      },
      {
        accessorKey: 'result_type',
        header: 'النتيجة',
      },
      {
        accessorKey: 'student_pass',
        header: 'نجاح شرطي',
        cell: ({ row }) => (
          <div className="flex justify-center items-center">
            <input
              disabled
              type="checkbox"
              checked={row.original.student_pass}
              readOnly
            />
          </div>
        ),
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
        duration: 4000,
      });
    } catch (error) {
      console.error(error);
      toast.error('Error while generating results', {
        duration: 4000,
      });
    }
  };

  const handlePassStudents = async () => {
    try {
      const result = await postRequest(
        `results/pass-students/?course_id=${selectedCourseId}`
      );
      toast.success(`${result.message}`, {
        duration: 4000,
      });
    } catch (error) {
      console.error(error);
      toast.error('Error while passing students', {
        duration: 4000,
      });
    }
  };

  if (!localData) return <Loading />;

  return (
    <>
      <button
        className="bg-blue-500 text-white p-2 mb-4 rounded-lg hover:bg-blue-700 transition-colors mx-2"
        onClick={handleGenerateResults}
      >
        تحضير النتائج
      </button>

      <button
        className="bg-blue-500 text-white p-2 mb-4 rounded-lg hover:bg-blue-700 transition-colors mx-2"
        onClick={handlePassStudents}
      >
        ترحيل الطلاب
      </button>

      <DownloadButton
        endpoint="results/export/excel/"
        params={{ course_id: selectedCourseId }}
        filename="results.xls"
        label="Export Excel"
      />

      <DataTable
        data={localData}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
}
