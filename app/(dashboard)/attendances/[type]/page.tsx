'use client';

import React, { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import DataTable from '../../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Attendance } from '../../../lib/types';
import { putRequest } from '../../../lib/api';
import Loading from '../../../../components/Loading';
import toast from 'react-hot-toast';

export default function Attendances() {
  const pathName = usePathname();
  const type = pathName.split('/').pop();

  const selectedCourseId = localStorage.getItem('selectedCourseId');
  const { data, error } = useSWR<Attendance[]>(
    `attendances/${type}/?course_id=${selectedCourseId}`
  );

  const [globalFilter, setGlobalFilter] = useState('');

  const handleToggle = async (id: number) => {
    try {
      const updatedAttendance = await putRequest(`attendances/toggle/${id}/`);
      if (!updatedAttendance) {
        toast.error('Failed to update attendance', {
          duration: 4000,
        });
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update attendance', {
        duration: 4000,
      });
    }
  };

  const columns = useMemo<ColumnDef<Attendance, any>[]>(() => {
    const commonColumns: ColumnDef<Attendance, any>[] = [
      {
        accessorKey: 'person_id',
        header: 'ID',
      },
      {
        accessorKey: 'person_name',
        header: 'Name',
      },
      {
        accessorKey: 'session_number',
        header: 'الجلسة',
      },
    ];

    // Dynamically create columns for each day in attendance_details
    const attendanceColumns: ColumnDef<Attendance, any>[] = [];
    if (data && data.length > 0) {
      const days = data[0].attendance_details.map((detail) => detail.day);
      days.forEach((day) => {
        const date = new Date(day);
        attendanceColumns.push({
          id: day,
          header: () => (
            <div className="flex flex-col text-sm leading-4 items-center">
              <span className="text-gray-400">{date.getFullYear()}</span>
              <span>
                {date.toLocaleDateString('en-US', {
                  month: 'numeric',
                  day: 'numeric',
                })}
              </span>
            </div>
          ),
          cell: ({ row }) => {
            const detail = row.original.attendance_details.find(
              (d) => d.day === day
            );
            return detail ? (
              <input
                onChange={() => handleToggle(detail.id)}
                type="checkbox"
                defaultChecked={detail.status}
              />
            ) : (
              'N/A'
            );
          },
        });
      });
    }

    return [...commonColumns, ...attendanceColumns];
  }, [data]);

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
