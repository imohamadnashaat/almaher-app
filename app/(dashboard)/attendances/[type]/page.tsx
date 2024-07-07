'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  const { data, error, mutate } = useSWR<Attendance[]>(
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
    const updatedAttendance = await putWithToken(`attendances/toggle/${id}/`);
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
    // Optionally, revalidate the SWR data to keep in sync with the server
    mutate();
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
    if (localData && localData.length > 0) {
      const days = localData[0].attendance_details.map((detail) => detail.day);
      days.forEach((day) => {
        attendanceColumns.push({
          id: day,
          header: day,
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

  if (error) return <div>Failed to load. {error.message}</div>;
  if (!localData) return <div>Loading...</div>;

  return (
    <DataTable
      data={localData}
      columns={columns}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
}
