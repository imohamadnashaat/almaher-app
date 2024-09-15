'use client';

import React, { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import DataTable from '../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { ExamDetails } from '../../lib/types';
import { postRequest, putRequest } from '../../lib/api';
import Loading from '../../../components/Loading';
import DownloadButton from '../../../components/DownloadButton';

export default function Exams() {
  const selectedCourseId = localStorage.getItem('selectedCourseId');
  const { data, error } = useSWR<ExamDetails[]>(
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
  };

  const handleGenerateExam = async () => {
    try {
      const result = await postRequest(
        `exams/generate/?course_id=${selectedCourseId}`
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

  const RenderEditableCell = (examId: number, initialMark: number) => {
    const [mark, setMark] = useState<number>(initialMark);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMark = parseFloat(e.target.value);
      if (newMark < 0 || newMark > 100) {
        toast.error('Mark should be between 0 and 100', {
          duration: 2000,
        });
        return;
      }
      setMark(newMark);
      handleUpdateExamMark(examId, newMark);
    };

    return (
      <input
        type="number"
        value={mark}
        min={0}
        max={100}
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
        header: 'الاسم',
      },
      {
        accessorKey: 'session_number',
        header: 'الجلسة',
      },
      {
        id: 'exam1',
        accessorFn: (row) => row.exams[0]?.mark,
        header: () => (
          <div className="flex flex-col text-sm leading-4 items-center">
            <span className="pb-1">نظري</span>
            <span className="text-gray-400">الامتحان الأول</span>
          </div>
        ),
        cell: ({ row }) =>
          RenderEditableCell(
            row.original.exams[0]?.exam_id,
            row.original.exams[0]?.mark
          ),
      },
      {
        id: 'exam2',
        accessorFn: (row) => row.exams[1]?.mark,
        header: () => (
          <div className="flex flex-col text-sm leading-4 items-center">
            <span className="pb-1">نظري</span>
            <span className="text-gray-400">التكميلي</span>
          </div>
        ),
        cell: ({ row }) =>
          RenderEditableCell(
            row.original.exams[1]?.exam_id,
            row.original.exams[1]?.mark
          ),
      },
      {
        id: 'exam3',
        accessorFn: (row) => row.exams[2]?.mark,
        header: () => (
          <div className="flex flex-col text-sm leading-4 items-center">
            <span className="pb-1">نظري</span>
            <span className="text-gray-400">الاعادة</span>
          </div>
        ),
        cell: ({ row }) =>
          RenderEditableCell(
            row.original.exams[2]?.exam_id,
            row.original.exams[2]?.mark
          ),
      },
      {
        id: 'exam4',
        accessorFn: (row) => row.exams[3]?.mark,
        header: () => (
          <div className="flex flex-col text-sm leading-4 items-center">
            <span className="pb-1">عملي</span>
            <span className="text-gray-400">الامتحان الأول</span>
          </div>
        ),
        cell: ({ row }) =>
          RenderEditableCell(
            row.original.exams[3]?.exam_id,
            row.original.exams[3]?.mark
          ),
      },
      {
        id: 'exam5',
        accessorFn: (row) => row.exams[4]?.mark,
        header: () => (
          <div className="flex flex-col text-sm leading-4 items-center">
            <span className="pb-1">عملي</span>
            <span className="text-gray-400">التكميلي</span>
          </div>
        ),
        cell: ({ row }) =>
          RenderEditableCell(
            row.original.exams[4]?.exam_id,
            row.original.exams[4]?.mark
          ),
      },
      {
        id: 'exam6',
        accessorFn: (row) => row.exams[5]?.mark,
        header: () => (
          <div className="flex flex-col text-sm leading-4 items-center">
            <span className="pb-1">عملي</span>
            <span className="text-gray-400">الاعادة</span>
          </div>
        ),
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
    <>
      <button
        className="bg-blue-500 text-white p-2 mb-4 rounded-lg hover:bg-blue-700 transition-colors mx-2"
        onClick={handleGenerateExam}
      >
        انشاء الاختبارات
      </button>

      <DownloadButton
        endpoint="exams/export/excel/"
        params={{ course_id: selectedCourseId }}
        filename="exams.xls"
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
