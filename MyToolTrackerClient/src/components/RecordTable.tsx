'use client'

import * as React from 'react';
import {
  DataGrid,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import { RecordTableProps } from '@/types/RecordTableProps';
import RecordTableToolbar from '@/components/RecordTableToolbar';
import AddRecordDialog from '@/components/AddRecordDialog';

const RecordTable: React.FC<RecordTableProps> = ({
  records,
  columns,
  onDelete,
  fetchData,
  addRecordForm,
  recordType,
}) => {
  // State to keep track of the dialog open state
  const [open, setOpen] = React.useState(false);
  // State to keep track of selected rows
  const [selectedIds, setSelectedIds] = React.useState<GridRowSelectionModel>([]);

  const handleClose = () => {
    setOpen(false);
  }

  const handleDeleteSelected = () => {
    // TODO: Cast selectedIds to an array of numbers
    // Cannot find a way to cast selectedIds to an array of numbers
    // Right now it is of type GridRowSelectionModel
    selectedIds.forEach((id: any) => {
      onDelete(id);
    });

    setSelectedIds([]);
    fetchData();
  }

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <RecordTableToolbar
        setOpen={setOpen}
        handleDeleteSelected={handleDeleteSelected}
        recordType={recordType}
      />
      <DataGrid
        rows={records}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectedIds(newRowSelectionModel);
        }}
        rowSelectionModel={selectedIds}
      />
      <AddRecordDialog
        open={open}
        handleClose={handleClose}
        addRecordForm={addRecordForm}
        recordType={recordType}
      />
    </Box>
  );
}

export default RecordTable;
