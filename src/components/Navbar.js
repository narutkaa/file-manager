import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { userName, signOut } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          File Manager
        </Typography>
        <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
          Hello, {userName}
        </Typography>
        <Button color="inherit" onClick={signOut}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
