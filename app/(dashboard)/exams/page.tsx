'use client';

import React, { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import DataTable from '../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { ExamDetails } from '../../lib/types';
import { putRequest } from '../../lib/api';
import Loading from '../../../components/Loading';

export default function Exams() {
  const selectedCourseId = localStorage.getItem('selectedCourseId');
  const { data, error, mutate } = useSWR<ExamDetails[]>(
    `exams/get-by-course/?course_id=${selectedCourseId}`
  );

  const [globalFilter, setGlobalFilter] = useState('');
  const [localData, setLocalData] = useState<ExamDetails[]>([]);

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const handleUpdateExamMark = async (examId: number, mark: number) => {
    const updatedMark = await putRequest(`exams/update/${examId}/`, { mark });
    if (!updatedMark) {
      alert('Failed to update mark');
      return;
    }
    // Update local data state to reflect the change
    setLocalData((prevData) =>
      prevData.map((exam) => ({
        ...exam,
        exams: exam.exams.map((detail) =>
          detail.exam_id === examId ? { ...detail, mark } : detail
        ),
      }))
    );
    // Optionally, revalidate the SWR data to keep in sync with the server
    mutate();
  };

  const RenderEditableCell = (examId: number, initialMark: number) => {
    const [mark, setMark] = useState<number>(initialMark);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMark = parseFloat(e.target.value);
      setMark(newMark);
      handleUpdateExamMark(examId, newMark);
    };

    return (
      <input
        type="number"
        value={mark}
        onChange={handleChange}
        className="w-full border-gray-300 rounded-md"
      />
    );
  };

  const columns = useMemo<ColumnDef<ExamDetails, any>[]>(
    () => [
      {
        accessorKey: 'student_id',
        header: 'ID',
      },
      {
        accessorKey: 'student_name',
        header: 'Name',
      },
      {
        accessorKey: 'session_number',
        header: 'Session Number',
      },
      {
        accessorFn: (row) => row.exams[0]?.mark,
        header: 'نظري -الامتحان الأول',
        cell: ({ row }) =>
          RenderEditableCell(
            row.original.exams[0]?.exam_id,
            row.original.exams[0]?.mark
          ),
      },
      {
        accessorFn: (row) => row.exams[1]?.mark,
        header: 'نظري -التكميلي',
        cell: ({ row }) =>
          RenderEditableCell(
            row.original.exams[1]?.exam_id,
            row.original.exams[1]?.mark
          ),
      },
      {
        accessorFn: (row) => row.exams[2]?.mark,
        header: 'نظري -الاعادة',
        cell: ({ row }) =>
          RenderEditableCell(
            row.original.exams[2]?.exam_id,
            row.original.exams[2]?.mark
          ),
      },
      {
        accessorFn: (row) => row.exams[3]?.mark,
        header: 'عملي -الامتحان الأول',
        cell: ({ row }) =>
          RenderEditableCell(
            row.original.exams[3]?.exam_id,
            row.original.exams[3]?.mark
          ),
      },
      {
        accessorFn: (row) => row.exams[4]?.mark,
        header: 'عملي -التكميلي',
        cell: ({ row }) =>
          RenderEditableCell(
            row.original.exams[4]?.exam_id,
            row.original.exams[4]?.mark
          ),
      },
      {
        accessorFn: (row) => row.exams[5]?.mark,
        header: 'عملي -الاعادة',
        cell: ({ row }) =>
          RenderEditableCell(
            row.original.exams[5]?.exam_id,
            row.original.exams[5]?.mark
          ),
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
