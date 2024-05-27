import {
  Box,
  Button,
  Tooltip
} from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';

export interface Props {
  handleOpenDialogAdd: () => void;
  handleOpenDialogUpdate: () => void;
  handleDeleteSelected: () => void;
  recordType: string;
  selectedIds: GridRowSelectionModel;
}

const RecordTableToolbar = ({
  handleOpenDialogAdd,
  handleOpenDialogUpdate,
  handleDeleteSelected,
  recordType,
  selectedIds,
}: Props) => {

  const isDeleteDisabled = selectedIds?.length === 0;
  const isUpdateDisabled = selectedIds?.length !== 1;

  return(
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}
    >
      <Tooltip title={isDeleteDisabled ? "Select at least one row" : ""} arrow>
        <span> {/* span is recommended by Material-UI for tooltips to work in safari */}
          <Button
            disabled={isDeleteDisabled}
            color="primary"
            onClick={handleDeleteSelected}
          >
            Delete
          </Button>
        </span>
      </Tooltip>
      <Box>
        <Tooltip title={isUpdateDisabled ? "Select exactly one row" : ""} arrow>
          <span>
            <Button sx={{ marginRight: 3 }}
              disabled={isUpdateDisabled}
              variant="contained" color="primary"
              onClick={handleOpenDialogUpdate}
            >
              Update {recordType}
            </Button>
          </span>
        </Tooltip>
        <Button
          variant="contained" color="primary"
          onClick={handleOpenDialogAdd}
        >
          Add {recordType}
        </Button>
      </Box>
    </Box>
  )
};

export default RecordTableToolbar;
