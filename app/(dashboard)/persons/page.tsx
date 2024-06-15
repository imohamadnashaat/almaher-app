'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import DataTable from '../../../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

interface Person {
  person_id: number;
  type_id: string;
  first_name: string;
  last_name: string;
  father_name: string;
  home_number: string;
  phone_number: string;
  job: string;
  address: string;
  bdate: string;
  priority_id: string;
  status: boolean;
  create_date: string;
  level_id: string;
}

export default function Persons() {
  const { data, error } = useSWR<Person[]>(
    'https://app.almaher.one/api/persons/'
  );
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();

  const handleView = (id: number) => {
    router.push(`/persons/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/persons/update/${id}`);
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete
  };

  const columns = useMemo<ColumnDef<Person, any>[]>(
    () => [
      {
        accessorKey: 'person_id',
        header: 'ID',
      },
      {
        accessorKey: 'first_name',
        header: 'First Name',
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
      },
      {
        accessorKey: 'father_name',
        header: 'Father Name',
      },
      {
        accessorKey: 'phone_number',
        header: 'Phone Number',
      },
      {
        accessorKey: 'job',
        header: 'Job',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'bdate',
        header: 'Birth Date',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => (info.getValue() ? 'Active' : 'Inactive'),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleView(row.original.person_id)}
              className="text-blue-500 hover:underline"
            >
              View
            </button>
            <button
              onClick={() => handleUpdate(row.original.person_id)}
              className="text-green-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.person_id)}
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
