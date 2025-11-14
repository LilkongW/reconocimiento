// Navbar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- 1. IMPORTAMOS useNavigate
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Dashboard,
  PersonAdd,
  People,
  Logout,
  Menu,
  Home,
  ChevronLeft,
  ModelTraining,
  Psychology,
} from '@mui/icons-material';


import {
  AdminPanelSettings,   
  Person,              
  Security,             
  Face,                 
  Badge,                 
  AccountCircle,         
  SupervisorAccount,     
  VerifiedUser,          
  ManageAccounts,        
} from '@mui/icons-material';



const Navbar = ({ currentPage }) => { // <--- 2. ELIMINAMOS LA PROP 'navigate'
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // <--- 3. USAMOS EL HOOK

  // Colores basados en #173974
  const primaryColor = '#173974';
  const primaryDark = '#0f2a5a';
  const primaryLight = '#2a4d8a';
  const gradientBackground = 'linear-gradient(180deg, #173974 0%, #2a56a5 100%)';
  const gradientText = 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)';

  const menuItems = [
    { text: 'Inicio', icon: <Home />, path: '/dash', id: 'dashboard' },
    { text: 'Asistencia diaria de usuarios', icon: <People />, path: '/asistencia', id: 'asistencia' },
    { text: 'Gestión de usuarios registrados', icon: <People />, path: '/users', id: 'users' },
    { text: 'Registrar Usuarios Nuevos', icon: <PersonAdd />, path: '/register', id: 'register' },
    { text: 'Entrenar Sistema', icon: <Psychology />, path: '/entrenar', id: 'entrenar' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path); // Esto ahora usa el 'navigate' del hook, que SÍ funciona con HashRouter
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    // Aquí iría la lógica de logout
    console.log('Cerrando sesión...');
    navigate('/'); // Esto también usará el 'navigate' del hook
  };

  const drawerContent = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: gradientBackground,
      color: 'white',
    }}>
      
      {/* Header del Navbar */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        minHeight: '64px'
      }}>
        {!collapsed && (
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              background: gradientText,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1rem',
              lineHeight: 1.2,
            }}
          >
            Sistema de Reconocimiento Facial
          </Typography>
        )}
        {!isMobile && (
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{ 
              color: 'white',
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.1)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronLeft sx={{ 
              transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }} />
          </IconButton>
        )}
      </Box>

      {/* Información del usuario */}
      {!collapsed && (
        <Box sx={{ 
          p: 2, 
          textAlign: 'center', 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.05)'
        }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              margin: '0 auto 8px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '2px solid rgba(255,255,255,0.3)',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}
          >
            <Person 
              sx={{ 
                fontSize: 30,
                color: 'white'
              }} 
            />
          </Avatar>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Administrador
          </Typography>
          <Chip 
            label="Activo" 
            size="small" 
            sx={{ 
              backgroundColor: '#10b981',
              color: 'white',
              fontSize: '10px',
              height: '20px',
              fontWeight: 'bold'
            }} 
          />
        </Box>
      )}

      {/* Menú de navegación */}
      <Box sx={{ flex: 1, p: 1, mt: 1 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  color: 'white',
                  backgroundColor: currentPage === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                  border: currentPage === item.id ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
                  opacity: currentPage === item.id ? 1 : 0.8,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    opacity: 1,
                    transform: 'translateY(-1px)',
                  },
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  py: 1.5,
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon sx={{ 
                  color: 'inherit', 
                  minWidth: collapsed ? 'auto' : 40,
                  mr: collapsed ? 0 : 2,
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontSize: '14px', 
                      fontWeight: currentPage === item.id ? 'bold' : 'normal',
                      letterSpacing: '0.2px'
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Botón de cerrar sesión */}
      <Box sx={{ p: 1, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                mx: 1,
                color: 'white',
                opacity: 0.8,
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  opacity: 1,
                  transform: 'translateY(-1px)',
                },
                justifyContent: collapsed ? 'center' : 'flex-start',
                py: 1.5,
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon sx={{ 
                color: 'inherit', 
                minWidth: collapsed ? 'auto' : 40,
                mr: collapsed ? 0 : 2,
                justifyContent: 'center'
              }}>
                <Logout />
              </ListItemIcon>
              {!collapsed && (
                <ListItemText 
                  primary="Cerrar Sesión" 
                  primaryTypographyProps={{ 
                    fontSize: '14px',
                    letterSpacing: '0.2px'
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  // Para móvil: Drawer temporal
  if (isMobile) {
    return (
      <>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: primaryColor,
            color: 'white',
            boxShadow: '0 4px 12px rgba(23, 57, 116, 0.3)',
            '&:hover': {
              backgroundColor: primaryDark,
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <Menu />
        </IconButton>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MMuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280,
              border: 'none',
              boxShadow: '4px 0 20px rgba(0,0,0,0.2)',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </>
    );
  }

  // Para desktop: Drawer permanente
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 80 : 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 80 : 280,
          boxSizing: 'border-box',
          border: 'none',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          boxShadow: '2px 0 15px rgba(0,0,0,0.1)',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Navbar;