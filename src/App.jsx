// App.js
import { useState, useEffect } from 'react';
// AQUÍ ESTÁ LA CORRECCIÓN: Se cambió 'BrowserRouter' por 'HashRouter'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import UserRegister from './pages/registro';
import UserManagement from './pages/gestion';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
// AGREGAR Container A LOS IMPORTS
import {
  Box,
  Container, 
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
import Asistencia from './pages/asistencia';
import Navbar from './components/navbar';
import Logo from "./assets/Logo.png"
import Entrenar from './pages/entrenar';
const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

// Componente Footer extraído para limpieza (opcional, pero recomendado)
const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 'auto', // Esto ayuda a empujarlo al fondo si usamos flexbox
      py: 4,
      backgroundColor: 'white',
      borderTop: '1px solid #e5e7eb',
      width: '100%'
    }}
  >
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            © 2025 Sistemas tecnologicos Alcaravan-Vultur. Todos los derechos reservados.
          </Typography>
        </Box>
        <Box
          component="img"
          src={Logo} // Descomentar cuando tengas la imagen importada
          alt="Sponsor Logo"
          sx={{
            height: 'auto',
            width: '100px',
            opacity: 0.8,
          }}
        />
      </Box>
    </Container>
  </Box>
);

// Layout modificado
const LayoutWithNavbar = ({ children, currentPage }) => {
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar navigate={navigate} currentPage={currentPage} />
      
      {/* Contenedor Principal (Lado derecho) */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          backgroundColor: '#f8fafc',
          display: 'flex',         // Habilitar flex
          flexDirection: 'column', // Disposición vertical
          minHeight: '100vh',      // Asegurar altura mínima
          width: '100%'            // Asegurar ancho
        }}
      >
        {/* Wrapper del contenido de la página */}
        <Box sx={{ p: 3, flexGrow: 1 }}> 
          {children}
        </Box>

        {/* Footer al final del bloque main */}
        <Footer />
      </Box>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Este componente <Router> ahora es un 'HashRouter' 
        gracias al cambio en la importación (línea 4).
        No necesita 'basename'.
      */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/dash" 
            element={
              <LayoutWithNavbar currentPage="dashboard">
                <Dashboard />
              </LayoutWithNavbar>
            } 
          />
          <Route 
            path="/register" 
            element={
              <LayoutWithNavbar currentPage="register">
                <UserRegister />
              </LayoutWithNavbar>
            } 
          />
          <Route 
            path="/users" 
            element={
              <LayoutWithNavbar currentPage="users">
                <UserManagement />
              </LayoutWithNavbar>
            } 
          />

          <Route 
            path="/asistencia" 
            element={
              <LayoutWithNavbar currentPage="asistencia">
                <Asistencia />
              </LayoutWithNavbar>
            } 
          />
          <Route 
            path="/entrenar" 
            element={
              <LayoutWithNavbar currentPage="entrenar">
                <Entrenar />
              </LayoutWithNavbar>
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;