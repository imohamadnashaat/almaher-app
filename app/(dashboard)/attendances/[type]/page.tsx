'use client';

import React, { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import DataTable from '../../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Attendance } from '../../../lib/types';
import { putWithToken } from '../../../lib/api';

export default function Attendances() {
  const pathName = usePathname();
  const type = pathName.split('/').pop();

  const selectedCourseId = localStorage.getItem('selectedCourseId');
  const { data, error } = useSWR<Attendance[]>(
    `attendances/${type}/?course_id=${selectedCourseId}`
  );
  const [globalFilter, setGlobalFilter] = useState('');

  const handleToggle = async (id: number) => {
    const updatedAttendance = await putWithToken(`attendances/toggle/${id}/`);
    if (!updatedAttendance) {
      alert('Failed to update attendance');
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
        header: 'Session Number',
      },
    ];

    // Dynamically create columns for each day in attendance_details
    const attendanceColumns: ColumnDef<Attendance, any>[] = [];
    if (data && data.length > 0) {
      const days = data[0].attendance_details.map((detail) => detail.day);
      days.forEach((day) => {
        attendanceColumns.push({
          id: day,
          header: day,
          cell: ({ row }) => {
            const detail = row.original.attendance_details.find(
              (d) => d.day === day
            );
            return detail ? (
              detail.status ? (
                <input
                  onChange={() => handleToggle(detail.id)}
                  type="checkbox"
                  checked
                />
              ) : (
                <input
                  onChange={() => handleToggle(detail.id)}
                  type="checkbox"
                />
              )
            ) : (
              'N/A'
            );
          },
        });
      });
    }

    return [...commonColumns, ...attendanceColumns];
  }, [data]);

  if (error) return <div>Failed to load. {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <DataTable
      data={data}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
}
