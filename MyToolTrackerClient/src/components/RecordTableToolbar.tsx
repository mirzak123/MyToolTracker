import exportToCSV from "@/utils/exportToCSV";
import { Add, Delete, Edit, FileDownload } from "@mui/icons-material";
import { Box, Button, Divider, Tooltip } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";

export interface Props {
  handleOpenDialogAdd: () => void;
  handleOpenDialogUpdate: () => void;
  handleDeleteSelected: () => void;
  recordType: string;
  selectedIds: GridRowSelectionModel;
  records: any;
}

const RecordTableToolbar = ({
  handleOpenDialogAdd,
  handleOpenDialogUpdate,
  handleDeleteSelected,
  recordType,
  selectedIds,
  records,
}: Props) => {
  const isDeleteDisabled = selectedIds?.length === 0;
  const isUpdateDisabled = selectedIds?.length !== 1;

  const handleExport = () => {
    exportToCSV(records, `${recordType}_Data`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "16px",
      }}
    >
      <Tooltip title={isDeleteDisabled ? "Select at least one row" : ""} arrow>
        <span>
          {" "}
          {/* span is recommended by Material-UI for tooltips to work in safari */}
          <Button
            disabled={isDeleteDisabled}
            color="primary"
            sx={{ minWidth: 110, fontWeight: "bold" }}
            startIcon={<Delete />}
            onClick={handleDeleteSelected}
          >
            Delete
          </Button>
        </span>
      </Tooltip>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: 3, minWidth: 110, fontWeight: "bold" }}
          startIcon={<FileDownload />}
          onClick={handleExport}
        >
          Export
        </Button>
        <Divider orientation="vertical" sx={{ marginRight: 3 }} />
        {/* If the record type is "Order Request", the Update button will not be displayed. */}
        {recordType === "Order Request" ? (
          ""
        ) : (
          <Tooltip
            title={isUpdateDisabled ? "Select exactly one row" : ""}
            arrow
          >
            <span>
              <Button
                sx={{ marginRight: 3, minWidth: 110, fontWeight: "bold" }}
                startIcon={<Edit />}
                disabled={isUpdateDisabled}
                variant="contained"
                color="primary"
                onClick={handleOpenDialogUpdate}
              >
                Update
              </Button>
            </span>
          </Tooltip>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ minWidth: 110, fontWeight: "bold" }}
          startIcon={<Add />}
          onClick={handleOpenDialogAdd}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default RecordTableToolbar;
