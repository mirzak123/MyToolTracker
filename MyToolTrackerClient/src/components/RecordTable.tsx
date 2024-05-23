'use client'

import React, { useState, useEffect, useCallback } from 'react';
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
    recordType,
}) => {
    // State to keep track of the RecordDialog open state
    const [openRecordDialog, setOpenRecordDialog] = React.useState(false);
    // State to keep track of the ConfirmationDialog open state
    const [openConfirm, setOpenConfirm] = React.useState(false);
    // State to keep track of selected rows
    const [selectedIds, setSelectedIds] = React.useState<GridRowSelectionModel>([]);
    // State to keep track of whether the dialog is for updating a record
    const [isUpdate, setIsUpdate] = React.useState(false);
    // State to keep track of default values for the dialog
    const [defaultValues, setDefaultValues] = React.useState<any>();

    const [isClient, setIsClient] = useState(false);

    const handleCloseRecordDialog = () => {
        setOpenRecordDialog(false);
    }

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const handleOpenRecordDialogAdd = () => {
        setIsUpdate(false);
        setOpenRecordDialog(true);
    }

    const handleOpenRecordDialogUpdate = () => {
        setIsUpdate(true);
        setDefaultValues(records.find(record => record.id === selectedIds[0]));
        setOpenRecordDialog(true);
    }

    const deleteSelected = async () => {
        try {
            await Promise.all(selectedIds.map((id: any) => onDelete(id)));
            setSelectedIds([]);
            setOpenConfirm(false);
            fetchData();
        } catch (error) {
            console.error('Error deleting records:', error);
        }
    }

    const handleDeleteSelected = () => {
        if (selectedIds.length === 0) return;
        setOpenConfirm(true);
    };

    const memoizedFetchData = useCallback(fetchData, [fetchData]);

    useEffect(() => {
        setIsClient(true);
        memoizedFetchData();
    }, [memoizedFetchData]);

    if (!isClient) {
        return null; // Render nothing on the server side
    }

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <RecordTableToolbar
                handleOpenDialogAdd={handleOpenRecordDialogAdd}
                handleOpenDialogUpdate={handleOpenRecordDialogUpdate}
                handleDeleteSelected={handleDeleteSelected}
                recordType={recordType}
                selectedIds={selectedIds}
            />
            {records.length === 0 ? (
                
                <p>No Tools data available.</p>
            ) : (
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
            )}
            <RecordDialog
                open={openRecordDialog}
                handleClose={handleCloseRecordDialog}
                recordType={recordType}
                isUpdate={isUpdate}
                defaultValues={defaultValues}
                fetchData={memoizedFetchData}
            />
            <ConfirmationDialog
                title="Delete Selected Records"
                content={`Are you sure you want to delete the selected (${selectedIds.length})
          ${recordType.toLowerCase()}${selectedIds.length > 1 ? 's' : ''}?`}
                onConfirm={deleteSelected}
                onClose={handleCloseConfirm}
                open={openConfirm}
            />
        </Box>
    );
}

export default RecordTable;
