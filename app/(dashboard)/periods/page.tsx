'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import DataTable from '../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Period } from '../../lib/types';
import Loading from '../../../components/Loading';

export default function Periods() {
  const { data, error } = useSWR<Period[]>('periods/');
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<Period, any>[]>(
    () => [
      {
        accessorKey: 'time_name',
        header: 'Time Name',
      },
      {
        accessorKey: 'create_date',
        header: 'Create Date',
      },
    ],
    []
  );

  if (error) return <div>Failed to load. {error.message}</div>;
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
