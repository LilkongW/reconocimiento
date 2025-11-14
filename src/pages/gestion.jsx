// UserManagement.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Avatar,
  Snackbar,
} from '@mui/material';
import {
  Search,
  Edit,
  Delete,
  Download,
  Refresh,
  Email,
  Phone,
} from '@mui/icons-material';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Datos de ejemplo simulando usuarios registrados
  const mockUsers = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      cedula: '12345678',
      email: 'juan.perez@empresa.com',
      telefono: '+57 300 123 4567',
      departamento: 'Ventas',
      fechaRegistro: '2024-01-10',
      estado: 'activo',
      foto: ''
    },
    {
      id: 2,
      nombre: 'María García',
      cedula: '87654321',
      email: 'maria.garcia@empresa.com',
      telefono: '+57 301 234 5678',
      departamento: 'Recursos Humanos',
      fechaRegistro: '2024-01-12',
      estado: 'activo',
      foto: ''
    },
    {
      id: 3,
      nombre: 'Carlos López',
      cedula: '11223344',
      email: 'carlos.lopez@empresa.com',
      telefono: '+57 302 345 6789',
      departamento: 'TI',
      fechaRegistro: '2024-01-08',
      estado: 'inactivo',
      foto: ''
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      cedula: '44332211',
      email: 'ana.martinez@empresa.com',
      telefono: '+57 303 456 7890',
      departamento: 'Contabilidad',
      fechaRegistro: '2024-01-05',
      estado: 'activo',
      foto: ''
    },
    {
      id: 5,
      nombre: 'Pedro Rodríguez',
      cedula: '55667788',
      email: 'pedro.rodriguez@empresa.com',
      telefono: '+57 304 567 8901',
      departamento: 'Marketing',
      fechaRegistro: '2024-01-15',
      estado: 'activo',
      foto: ''
    }
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los usuarios');
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditForm({ ...user });
    setEditDialogOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Simular eliminación
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setSuccessMessage('Usuario eliminado correctamente');
    setOpenSnackbar(true);
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const saveEdit = () => {
    // Simular actualización
    setUsers(users.map(user => 
      user.id === selectedUser.id ? { ...editForm } : user
    ));
    setSuccessMessage('Usuario actualizado correctamente');
    setOpenSnackbar(true);
    setEditDialogOpen(false);
    setSelectedUser(null);
  };

  const getStatusChip = (estado) => {
    return estado === 'activo' 
      ? <Chip label="Activo" color="success" size="small" />
      : <Chip label="Inactivo" color="error" size="small" />;
  };

  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.cedula.includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportUsers = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Nombre,Cédula,Email,Teléfono,Departamento,Fecha Registro,Estado\n"
      + users.map(user => 
          `"${user.nombre}","${user.cedula}","${user.email}","${user.telefono}","${user.departamento}","${user.fechaRegistro}","${user.estado}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `usuarios_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #173974 0%, #2a56a5 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2
          }}>
          Gestión de Usuarios Registrados
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Administra y gestiona todos los usuarios del sistema de reconocimiento facial
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Estadísticas y Controles */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={9}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="primary.main" fontWeight="bold">
                      {users.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Usuarios
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="success.main" fontWeight="bold">
                      {users.filter(user => user.estado === 'activo').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Activos
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="error.main" fontWeight="bold">
                      {users.filter(user => user.estado === 'inactivo').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Inactivos
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="warning.main" fontWeight="bold">
                      {users.filter(user => !user.foto).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sin Foto
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
                variant="contained"
                startIcon={<Download />}
                onClick={handleExportUsers}
                sx={{
                    background: 'linear-gradient(135deg, #173974 0%, #2a56a5 100%)',
                    borderRadius: 2,
                    py: 1,
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(23, 57, 116, 0.3)',
                    '&:hover': {
                    background: 'linear-gradient(135deg, #2a56a5 0%, #173974 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 20px rgba(23, 57, 116, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                }}
                >
                Exportar CSV
            </Button>
              <Tooltip title="Actualizar lista">
                <IconButton
                  onClick={loadUsers}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                  }}
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Búsqueda */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <CardContent>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar por nombre, cédula, email o departamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Tabla de usuarios */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Usuario</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Cédula</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Contacto</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Departamento</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Fecha Registro</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow 
                    key={user.id}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: 'grey.50' }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {user.nombre.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {user.nombre}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {user.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.cedula}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Email sx={{ fontSize: 16 }} />
                          {user.email}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Phone sx={{ fontSize: 14 }} />
                          {user.telefono}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.departamento} 
                        size="small" 
                        variant="outlined"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(user.fechaRegistro).toLocaleDateString('es-ES')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {getStatusChip(user.estado)}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Editar usuario">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(user)}
                            sx={{ color: 'primary.main' }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar usuario">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(user)}
                            sx={{ color: 'error.main' }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {filteredUsers.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No se encontraron usuarios
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Diálogo de Edición */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre completo"
                value={editForm.nombre || ''}
                onChange={(e) => setEditForm({...editForm, nombre: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cédula"
                value={editForm.cedula || ''}
                onChange={(e) => setEditForm({...editForm, cedula: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                value={editForm.telefono || ''}
                onChange={(e) => setEditForm({...editForm, telefono: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={editForm.email || ''}
                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Departamento"
                value={editForm.departamento || ''}
                onChange={(e) => setEditForm({...editForm, departamento: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Estado"
                value={editForm.estado || 'activo'}
                onChange={(e) => setEditForm({...editForm, estado: e.target.value})}
              >
                <MenuItem value="activo">Activo</MenuItem>
                <MenuItem value="inactivo">Inactivo</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
          <Button onClick={saveEdit} variant="contained">Guardar Cambios</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Confirmación de Eliminación */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar al usuario <strong>{selectedUser?.nombre}</strong>?
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mensajes */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        message={successMessage}
      />
    </Box>
  );
};

export default UserManagement;