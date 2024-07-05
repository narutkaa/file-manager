import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoveIcon from '@mui/icons-material/MoveToInbox';

const FolderList = ({ folders, onNavigate, onEdit, onMove, onDelete }) => (
  <List>
    {folders.map((folder) => (
      <ListItem key={folder.id}>
        <ListItemText primary={folder.name} onClick={() => onNavigate(folder.id, folder.name)} />
        <IconButton edge="end" onClick={() => onEdit(folder.id, folder.name)}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" onClick={() => onMove(folder.id)}>
          <MoveIcon />
        </IconButton>
        <IconButton edge="end" onClick={() => onDelete(folder.id, 'folder')}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    ))}
  </List>
);

export default FolderList;
