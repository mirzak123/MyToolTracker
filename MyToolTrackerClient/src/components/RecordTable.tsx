'use client'

import * as React from 'react';
import {
  DataGrid,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import { RecordTableProps } from '@/types/RecordTableProps';
import RecordTableToolbar from '@/components/RecordTableToolbar';
import RecordDialog from '@/components/RecordDialog';
import ConfirmationDialog from '@/components/ConfirmationDialog';

const RecordTable: React.FC<RecordTableProps> = ({
  records,
  columns,
  onDelete,
  fetchData,
  recordForm,
  recordType,
}) => {
  // State to keep track of the RecordDialog open state
  const [openRecordDialog, setOpenRecordDialog] = React.useState(false);
  // State to keep track of the ConfirmationDialog open state
  const [openConfirm, setOpenConfirm] = React.useState(false);
  // State to keep track of selected rows
  const [selectedIds, setSelectedIds] = React.useState<GridRowSelectionModel>([]);

  const handleCloseRecordDialog = () => {
    setOpenRecordDialog(false);
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  }

  // Delete selected records
  const deleteSelected = async () => {
    try {
      // TODO: Cast selectedIds to an array of numbers
      // Cannot find a way to cast selectedIds to an array of numbers
      // Right now it is of type GridRowSelectionModel
      await Promise.all(selectedIds.map((id: any) => onDelete(id)));

      setSelectedIds([]);
      setOpenConfirm(false);
      fetchData();
    } catch (error) {
      console.error('Error deleting records:', error);
    }
  }

  // Display a confirmation dialog before deleting selected records
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;

    setOpenConfirm(true);
  }

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <RecordTableToolbar
        setOpen={setOpenRecordDialog}
        handleDeleteSelected={handleDeleteSelected}
        recordType={recordType}
        selectedIds={selectedIds}
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
      <RecordDialog
        open={openRecordDialog}
        handleClose={handleCloseRecordDialog}
        recordForm={recordForm}
        recordType={recordType}
      />
      <ConfirmationDialog
        title="Delete Selected Records"
        content={`Are you sure you want to delete the selected ${recordType.toLowerCase()}s?`}
        onConfirm={deleteSelected}
        onClose={handleCloseConfirm}
        open={openConfirm}
      />
    </Box>
  );
}

export default RecordTable;
