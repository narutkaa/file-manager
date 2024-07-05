import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FileList = ({ files, onDelete }) => (
  <List>
    {files.map((file) => (
      <ListItem key={file.id}>
        <ListItemText primary={file.file.name} />
        <IconButton edge="end" onClick={() => onDelete(file.id, 'file')}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    ))}
  </List>
);

export default FileList;
