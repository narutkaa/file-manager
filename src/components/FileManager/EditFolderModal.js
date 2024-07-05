import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditFolderModal = ({ open, onClose, folderName, setFolderName, onUpdate }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Edit Folder
        </Typography>
        <TextField
          label="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button onClick={onUpdate} variant="contained" color="primary" fullWidth>
          Update
        </Button>
      </Box>
    </Modal>
  );
};

export default EditFolderModal;
