'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import DataTable from '../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';

export interface Level {
  level_name: string;
  level_id: number;
  create_date: string;
}

export default function Levels() {
  const { data, error } = useSWR<Level[]>(
    'https://api.almaher.xyz/api/levels/'
  );
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<Level, any>[]>(
    () => [
      {
        accessorKey: 'level_name',
        header: 'Level Name',
      },
      {
        accessorKey: 'level_id',
        header: 'Level ID',
      },
      {
        accessorKey: 'create_date',
        header: 'Create Date',
      },
    ],
    []
  );

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
