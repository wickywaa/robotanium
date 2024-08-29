import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export const UsersTable: React.FC = () => {


  return (
    <div>
      <DataTable value={[]} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
    <Column field="name" header="Name" style={{ width: '25%' }}></Column>
    <Column field="country.name" header="Country" style={{ width: '25%' }}></Column>
    <Column field="company" header="Company" style={{ width: '25%' }}></Column>
    <Column field="representative.name" header="Representative" style={{ width: '25%' }}></Column>
</DataTable>
    </div>
  )
}

