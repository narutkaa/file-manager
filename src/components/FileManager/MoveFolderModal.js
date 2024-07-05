import React from 'react';
import { Modal, Box, Typography, Select, MenuItem, Button } from '@mui/material';

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

const MoveFolderModal = ({ open, onClose, parentId, setParentId, availableFolders, onMove }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Move Folder
        </Typography>
        <Select
          label="New Parent Folder"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          fullWidth
          required
          sx={{ marginTop: '16px', marginBottom: '16px' }}
        >
          <MenuItem value="root">Root</MenuItem>
          {availableFolders.map((folder) => (
            <MenuItem key={folder.id} value={folder.id}>
              {folder.name}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={onMove} variant="contained" color="primary" fullWidth>
          Move
        </Button>
      </Box>
    </Modal>
  );
};

export default MoveFolderModal;
