import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  currentElement: { type: string; id: string } | null;
  elementData: {
    text: string;
    x: number;
    y: number;
    fontSize: number;
    fontWeight: string;
  };
  setElementData: (data: {
    text: string;
    x: number;
    y: number;
    fontSize: number;
    fontWeight: string;
  }) => void;
  handleSave: () => void;
  handleDelete: () => void;
}

const Modal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  currentElement,
  elementData,
  setElementData,
  handleSave,
  handleDelete,
}) => {
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: ["100%", "75%", "25%"],
          maxWidth: "none",
        },
      }}
      open={modalOpen}
      fullWidth
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        id="customized-dialog-title"
      >
        Edit {currentElement?.type}
        <IconButton
          aria-label="close"
          onClick={() => setModalOpen(false)}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <svg
            width="23px"
            height="23px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Menu / Close_MD">
              <path
                id="Vector"
                d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 5,
        }}
        dividers
      >
        <TextField
          label="Text"
          fullWidth
          placeholder="This is label"
          type="text"
          value={elementData.text}
          onChange={(e) =>
            setElementData({ ...elementData, text: e.target.value })
          }
        />
        <TextField
          label="X"
          fullWidth
          type="number"
          value={elementData.x}
          onChange={(e) =>
            setElementData({
              ...elementData,
              x: parseInt(e.target.value),
            })
          }
        />
        <TextField
          label="Y"
          fullWidth
          type="number"
          value={elementData.y}
          onChange={(e) =>
            setElementData({
              ...elementData,
              y: parseInt(e.target.value),
            })
          }
        />
        <TextField
          label="Font Size"
          fullWidth
          type="number"
          placeholder="Enter font size"
          value={elementData.fontSize}
          onChange={(e) =>
            setElementData({
              ...elementData,
              fontSize: parseInt(e.target.value),
            })
          }
        />
        <TextField
          label="Font Weight"
          fullWidth
          placeholder="Enter font weight"
          value={elementData.fontWeight}
          onChange={(e) =>
            setElementData({
              ...elementData,
              fontWeight: e.target.value,
            })
          }
        />
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", justifyContent: "flex-start", p: 2 }}
      >
        <Button variant="contained" autoFocus onClick={handleSave}>
          Save Changes
        </Button>
        <div className="md:hidden block">
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
