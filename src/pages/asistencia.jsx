// Asistencia.jsx
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
} from '@mui/material';
import {
  Download,
  Refresh,
  Search,
  Today,
  Person,
  Schedule,
} from '@mui/icons-material';
import { fetchDatosCsv } from '../services/services';

const Asistencia = () => {
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetchDatosCsv();
        console.log('Respuesta completa de la API:', response);
        
        // La respuesta tiene una propiedad vacía "" que contiene los datos reales
        if (response && response[""] && response[""].success && response[""].registros) {
          const datosReales = response[""];
          
          // Transformar los datos de la API al formato que espera nuestra tabla
          const transformedData = datosReales.registros.map(registro => ({
            id: registro.id,
            nombre: registro.nombre.trim(), // Limpiar espacios en blanco
            cedula: registro.cedula,
            hora_entrada: `${registro.hora.toString().padStart(2, '0')}:${registro.minutos.toString().padStart(2, '0')}:${registro.segundos.toString().padStart(2, '0')}`,
            hora_salida: '', // No tenemos datos de salida por ahora
            fecha: `${registro.dia}/${registro.mes}/${registro.año}`,
            departamento: registro.departamento,
            estado: 'presente' // Todos los registros son de asistencia (presentes)
          }));
          
          console.log('Datos transformados:', transformedData);
          setCsvData(transformedData);
        } else {
          console.error('Estructura de respuesta inesperada:', response);
          setError('No se pudieron cargar los datos de asistencia - estructura inesperada');
          setCsvData([]);
        }
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('Error al conectar con el servidor');
        setCsvData([]);
      } finally {
        setLoading(false);
      }
    };

    loadCSVData();
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetchDatosCsv();
      console.log('Respuesta al actualizar:', response);
      
      if (response && response[""] && response[""].success && response[""].registros) {
        const datosReales = response[""];
        
        const transformedData = datosReales.registros.map(registro => ({
          id: registro.id,
          nombre: registro.nombre.trim(),
          cedula: registro.cedula,
          hora_entrada: `${registro.hora.toString().padStart(2, '0')}:${registro.minutos.toString().padStart(2, '0')}:${registro.segundos.toString().padStart(2, '0')}`,
          hora_salida: '',
          fecha: `${registro.dia}/${registro.mes}/${registro.año}`,
          departamento: registro.departamento,
          estado: 'presente'
        }));
        
        setCsvData(transformedData);
      } else {
        setError('No se pudieron actualizar los datos - estructura inesperada');
      }
    } catch (err) {
      console.error('Error al actualizar datos:', err);
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    if (csvData.length === 0) {
      setError('No hay datos para descargar');
      return;
    }

    try {
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Nombre,Cédula,Hora Entrada,Hora Salida,Fecha,Departamento,Estado\n"
        + csvData.map(row => 
            `"${row.nombre}","${row.cedula}","${row.hora_entrada}","${row.hora_salida}","${row.fecha}","${row.departamento}","${row.estado}"`
          ).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `asistencia_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('Error al generar el archivo CSV');
    }
  };

  const filteredData = csvData.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cedula.includes(searchTerm) ||
    item.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusChip = (estado) => {
    const statusConfig = {
      presente: { color: 'success', label: 'Presente' },
      ausente: { color: 'error', label: 'Ausente' },
      tardanza: { color: 'warning', label: 'Tardanza' }
    };
    
    const config = statusConfig[estado] || { color: 'default', label: estado };
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  const getTodayDate = () => {
    return new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          Asistencia Diaria de Usuarios
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Today />
          {getTodayDate()}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Estadísticas y Controles */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="success.main" fontWeight="bold">
                      {csvData.filter(item => item.estado === 'presente').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Presentes
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="error.main" fontWeight="bold">
                      {csvData.filter(item => item.estado === 'ausente').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ausentes
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="primary.main" fontWeight="bold">
                      {csvData.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Registros
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={handleDownloadCSV}
                disabled={csvData.length === 0}
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
                  '&:disabled': {
                    background: 'grey.400',
                    transform: 'none',
                    boxShadow: 'none',
                  }
                }}
              >
                Descargar CSV
              </Button>
              <Tooltip title="Actualizar datos">
                <IconButton
                  onClick={handleRefresh}
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
            placeholder="Buscar por nombre, cédula o departamento..."
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

      {/* Tabla de asistencias */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    <Person sx={{ fontSize: 18, mr: 1, verticalAlign: 'middle' }} />
                    Usuario
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Cédula</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    <Schedule sx={{ fontSize: 18, mr: 1, verticalAlign: 'middle' }} />
                    Hora Registro
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Hora Salida</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Departamento</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow 
                    key={row.id}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: 'grey.50' }
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {row.nombre}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {row.cedula}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        fontWeight="medium"
                        color="text.primary"
                      >
                        {row.hora_entrada}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        fontWeight="medium"
                        color={row.hora_salida ? 'text.primary' : 'text.disabled'}
                      >
                        {row.hora_salida || 'No registrada'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={row.departamento} 
                        size="small" 
                        variant="outlined"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      {getStatusChip(row.estado)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {filteredData.length === 0 && csvData.length > 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No se encontraron registros que coincidan con la búsqueda
              </Typography>
            </Box>
          )}

          {csvData.length === 0 && !loading && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No hay registros de asistencia para mostrar
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Asistencia;