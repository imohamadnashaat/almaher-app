'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import DataTable from '../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Position } from '../../lib/types';

export default function Positions() {
  const { data, error } = useSWR<Position[]>(
    'https://app.almaher.one/api/positions/'
  );
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<Position, any>[]>(
    () => [
      {
        accessorKey: 'position_name',
        header: 'Position Name',
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
