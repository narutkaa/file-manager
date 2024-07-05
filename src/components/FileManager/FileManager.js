import React, { useState, useEffect } from 'react';
import { Container, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import { fetchFolders, createFolder, uploadFile, deleteFolder, deleteFile, updateFolder, moveFolder } from '../../api/drive';
import { useAuth } from '../../context/AuthContext';
import CreateFolderModal from './CreateFolderModal';
import UploadFileModal from './UploadFileModal';
import EditFolderModal from './EditFolderModal';
import MoveFolderModal from './MoveFolderModal';
import Navbar from '../Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoveIcon from '@mui/icons-material/MoveToInbox';

const FileManager = () => {
  const { token } = useAuth();
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [allFolders, setAllFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('root');
  const [folderPath, setFolderPath] = useState([{ id: 'root', name: 'Root' }]);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [editFolderModalOpen, setEditFolderModalOpen] = useState(false);
  const [moveFolderModalOpen, setMoveFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [editFolderName, setEditFolderName] = useState('');
  const [editFolderId, setEditFolderId] = useState(null);
  const [moveFolderId, setMoveFolderId] = useState(null);
  const [moveParentId, setMoveParentId] = useState('root');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemType, setDeleteItemType] = useState(null); // 'folder' or 'file'

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchFolders(currentFolder, token);
        const { children } = response.data.data;
        setFolders(children.filter(child => child.type === 'folder'));
        setFiles(children.filter(child => child.type === 'file'));

        // Fetch all folders
        const allResponse = await fetchFolders('root', token);
        const allChildren = allResponse.data.data.children;
        setAllFolders(allChildren.filter(child => child.type === 'folder'));
      } catch (error) {
        console.error('Error fetching folders and files', error);
      }
    };

    loadData();
  }, [currentFolder, token]);

  const handleCreateFolder = async () => {
    try {
      await createFolder(newFolderName, currentFolder, token);
      setNewFolderName('');
      setFolderModalOpen(false);
      const response = await fetchFolders(currentFolder, token);
      const { children } = response.data.data;
      setFolders(children.filter(child => child.type === 'folder'));
      setFiles(children.filter(child => child.type === 'file'));
    } catch (error) {
      console.error('Error creating folder', error);
    }
  };

  const handleUploadFile = async () => {
    try {
      await uploadFile(selectedFile, currentFolder, token);
      setSelectedFile(null);
      setFileModalOpen(false);
      const response = await fetchFolders(currentFolder, token);
      const { children } = response.data.data;
      setFolders(children.filter(child => child.type === 'folder'));
      setFiles(children.filter(child => child.type === 'file'));
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  const handleDeleteFolder = async () => {
    try {
      await deleteFolder(deleteItemId, token);
      setDeleteDialogOpen(false);
      const response = await fetchFolders(currentFolder, token);
      const { children } = response.data.data;
      setFolders(children.filter(child => child.type === 'folder'));
      setFiles(children.filter(child => child.type === 'file'));
    } catch (error) {
      console.error('Error deleting folder', error);
    }
  };

  const handleDeleteFile = async () => {
    try {
      await deleteFile(deleteItemId, token);
      setDeleteDialogOpen(false);
      const response = await fetchFolders(currentFolder, token);
      const { children } = response.data.data;
      setFolders(children.filter(child => child.type === 'folder'));
      setFiles(children.filter(child => child.type === 'file'));
    } catch (error) {
      console.error('Error deleting file', error);
    }
  };

  const handleNavigateToFolder = (folderId, folderName) => {
    setCurrentFolder(folderId);
    setFolderPath([...folderPath, { id: folderId, name: folderName }]);
  };

  const handleBack = () => {
    if (folderPath.length > 1) {
      const newPath = [...folderPath];
      newPath.pop();
      setCurrentFolder(newPath[newPath.length - 1].id);
      setFolderPath(newPath);
    }
  };

  const handleEditFolder = (folderId, folderName) => {
    setEditFolderId(folderId);
    setEditFolderName(folderName);
    setEditFolderModalOpen(true);
  };

  const handleUpdateFolder = async () => {
    try {
      await updateFolder(editFolderId, editFolderName, token);
      setEditFolderName('');
      setEditFolderId(null);
      setEditFolderModalOpen(false);
      const response = await fetchFolders(currentFolder, token);
      const { children } = response.data.data;
      setFolders(children.filter(child => child.type === 'folder'));
      setFiles(children.filter(child => child.type === 'file'));
    } catch (error) {
      console.error('Error updating folder', error);
    }
  };

  const handleMoveFolder = (folderId) => {
    setMoveFolderId(folderId);
    setMoveParentId(currentFolder);
    setMoveFolderModalOpen(true);
  };

  const handleMoveFolderSubmit = async () => {
    try {
      await moveFolder(moveFolderId, moveParentId, token);
      setMoveFolderId(null);
      setMoveParentId(currentFolder);
      setMoveFolderModalOpen(false);
      const response = await fetchFolders(currentFolder, token);
      const { children } = response.data.data;
      setFolders(children.filter(child => child.type === 'folder'));
      setFiles(children.filter(child => child.type === 'file'));
    } catch (error) {
      console.error('Error moving folder', error);
    }
  };

  const handleOpenDeleteDialog = (itemId, itemType) => {
    setDeleteItemId(itemId);
    setDeleteItemType(itemType);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteItemType === 'folder') {
      await handleDeleteFolder();
    } else if (deleteItemType === 'file') {
      await handleDeleteFile();
    }
  };

  const getAvailableFolders = (folders, currentFolderId) => {
    // Exclude the current folder and its subfolders
    const excludeFolders = (folderList, excludeId) => {
      const result = [];
      for (const folder of folderList) {
        if (folder.id !== excludeId) {
          result.push(folder);
          if (folder.children && folder.children.length > 0) {
            result.push(...excludeFolders(folder.children, excludeId));
          }
        }
      }
      return result;
    };

    return excludeFolders(folders, currentFolderId);
  };

  const availableFolders = getAvailableFolders(allFolders, moveFolderId);

  return (
    <Container>
      <Navbar />
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <Box>
          <Button variant="contained" onClick={() => setFolderModalOpen(true)} sx={{ mr: 1 }}>Create Folder</Button>
          <Button variant="contained" onClick={() => setFileModalOpen(true)}>Upload File</Button>
        </Box>
      </Box>
      {folderPath.length > 1 && (
        <Button variant="contained" onClick={handleBack} sx={{ mb: 2 }}>Back</Button>
      )}
      <List>
        {folders.map((folder) => (
          <React.Fragment key={folder.id}>
            <ListItem>
              <ListItemText primary={folder.name} onClick={() => handleNavigateToFolder(folder.id, folder.name)} />
              <IconButton edge="end" onClick={() => handleEditFolder(folder.id, folder.name)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleMoveFolder(folder.id)}>
                <MoveIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleOpenDeleteDialog(folder.id, 'folder')}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
        {files.map((file) => (
          <React.Fragment key={file.id}>
            <ListItem>
              <ListItemText primary={file.file.name} />
              <IconButton edge="end" onClick={() => handleOpenDeleteDialog(file.id, 'file')}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <CreateFolderModal
        open={folderModalOpen}
        onClose={() => setFolderModalOpen(false)}
        folderName={newFolderName}
        setFolderName={setNewFolderName}
        onCreate={handleCreateFolder}
      />
      <UploadFileModal
        open={fileModalOpen}
        onClose={() => setFileModalOpen(false)}
        onFileChange={(e) => setSelectedFile(e.target.files[0])}
        onUpload={handleUploadFile}
      />
      <EditFolderModal
        open={editFolderModalOpen}
        onClose={() => setEditFolderModalOpen(false)}
        folderName={editFolderName}
        setFolderName={setEditFolderName}
        onUpdate={handleUpdateFolder}
      />
      <MoveFolderModal
        open={moveFolderModalOpen}
        onClose={() => setMoveFolderModalOpen(false)}
        parentId={moveParentId}
        setParentId={setMoveParentId}
        availableFolders={availableFolders}
        onMove={handleMoveFolderSubmit}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this {deleteItemType}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FileManager;
