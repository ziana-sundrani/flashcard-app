"use client";
import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, InputBase
} from '@mui/material';
import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import StyleIcon from '@mui/icons-material/Style';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import {useRouter} from 'next/navigation';

const pages = ['My decks', 'Create New'];
const settings = ['Logout'];

function NavBar() {
  const [activeMenu, setActiveMenu] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [initial, setInitial] = useState('U');
  const router = useRouter(); 
  
  useEffect(() => {
    const userString = localStorage.getItem('user');
    const user = userString && userString !== "undefined" ? JSON.parse(userString) : null;
    const i = user?.email? user.email[0].toUpperCase() : 'U';
    setInitial(i);
  }, []);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  }

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Left: Logo, and Title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <StyleIcon sx={{ mr: 1 }}  onClick={() => router.push('/')}/>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              onClick={() => router.push('/')}
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              GoCard
            </Typography>
          </Box>

          {/* Center: Search Bar */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Box sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: 1,
              px: 2,
              width: 300,
            }}>
              <SearchIcon sx={{ mr: 1 }} />
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ color: "inherit", width: "100%" }}
              />
            </Box>
          </Box>

          {/* Right: Create and User Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit" aria-label="add" onClick= {() => router.push('/generateCards')}>
              <AutoAwesomeIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="add" onClick= {() => router.push('/createCards')}>
              <AddIcon />
            </IconButton>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
                <Avatar sx={{objectFit: "contain", border: "2px solid rgb(0, 0, 0)"  }}>
                  {initial}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar-user"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleLogout}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;