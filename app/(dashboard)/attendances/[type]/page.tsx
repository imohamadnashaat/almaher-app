'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import DataTable from '../../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Attendance } from '../../../lib/types';
import { putRequest } from '../../../lib/api';
import Loading from '../../../../components/Loading';

export default function Attendances() {
  const pathName = usePathname();
  const type = pathName.split('/').pop();

  const selectedCourseId = localStorage.getItem('selectedCourseId');
  const { data, error } = useSWR<Attendance[]>(
    `attendances/${type}/?course_id=${selectedCourseId}`
  );

  const [globalFilter, setGlobalFilter] = useState('');
  const [localData, setLocalData] = useState<Attendance[]>([]);

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const handleToggle = async (id: number) => {
    const updatedAttendance = await putRequest(`attendances/toggle/${id}/`);
    if (!updatedAttendance) {
      alert('Failed to update attendance');
      return;
    }
    // Update local data state to reflect the change
    setLocalData((prevData) =>
      prevData.map((attendance) => ({
        ...attendance,
        attendance_details: attendance.attendance_details.map((detail) =>
          detail.id === id ? { ...detail, status: !detail.status } : detail
        ),
      }))
    );
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
    if (localData && localData.length > 0) {
      const days = localData[0].attendance_details.map((detail) => detail.day);
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
                checked={detail.status}
              />
            ) : (
              'N/A'
            );
          },
        });
      });
    }

    return [...commonColumns, ...attendanceColumns];
  }, [localData]);

  // if (error) return<div>Failed to load. {error.message}</div>;
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
