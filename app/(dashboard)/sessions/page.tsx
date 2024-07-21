'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import DataTable from '../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { SessionDetails } from '../../lib/types';
import Loading from '../../../components/Loading';
import DownloadButton from '../../../components/DownloadButton';

export default function Sessions() {
  const selectedCourseId = localStorage.getItem('selectedCourseId');
  const { data, error } = useSWR<SessionDetails[]>(
    `sessions/details/?course_id=${selectedCourseId}`
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

  const columns = useMemo<ColumnDef<SessionDetails, any>[]>(
    () => [
      {
        accessorKey: 'session_number',
        header: 'رقم الجلسة',
      },
      {
        accessorKey: 'teacher_full_name',
        header: 'المدرس',
      },
      {
        accessorKey: 'level_id_id',
        header: 'المستوى',
      },
      {
        accessorKey: 'position_id_id',
        header: 'المكان',
      },
      {
        accessorKey: 'time_id_id',
        header: 'الوقت',
      },
      {
        accessorKey: 'total_students',
        header: 'عدد الطلاب',
      },
      {
        accessorKey: 'avg_student_bdate_year',
        header: 'متوسط العمر',
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
  if (!data) return <Loading />;

  return (
    <>
      <button
        className="bg-gray-400 text-white p-2 mb-4 rounded-lg transition-colors mx-2"
        disabled
      >
        انشاء الحضور
      </button>

      <DownloadButton
        endpoint="sessions/export/excel/sessions"
        filename="sessions.xlsx"
        params={{ course_id: selectedCourseId }}
        label="استخراج بيانات الجلسات excel"
      />

      <DownloadButton
        endpoint="sessions/export/pdf/session/student"
        filename="session_students.pdf"
        params={{ course_id: selectedCourseId }}
        label="استخراج بيانات الطلاب pdf"
      />

      <DownloadButton
        endpoint="sessions/export/pdf/session/teacher"
        filename="session_teachers.pdf"
        params={{ course_id: selectedCourseId }}
        label="استخراج بيانات المدرسين pdf"
      />

      <DataTable
        data={data}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
}
