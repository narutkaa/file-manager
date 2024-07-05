import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

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

const UploadFileModal = ({ open, onClose, onFileChange, onUpload }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Upload New File
        </Typography>
        <input
          type="file"
          onChange={onFileChange}
          required
          style={{ marginTop: '16px', marginBottom: '16px', display: 'block' }}
        />
        <Button onClick={onUpload} variant="contained" color="primary" fullWidth>
          Upload
        </Button>
      </Box>
    </Modal>
  );
};

export default UploadFileModal;
