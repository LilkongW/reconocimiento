// entrenar.jsx
import React, { useState } from 'react';
import {
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  PlayArrow,
  CheckCircle,
  Replay,
  Cancel,
  Storage,
} from '@mui/icons-material';

const Entrenar = () => {
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [trainingLog, setTrainingLog] = useState([]);

  const trainingSteps = [
    { label: 'Preparación de datos', description: 'Cargando y validando imágenes' },
    { label: 'Extracción de características', description: 'Procesando características faciales' },
    { label: 'Entrenamiento del modelo', description: 'Optimizando parámetros del modelo' },
    { label: 'Validación', description: 'Evaluando precisión del modelo' },
    { label: 'Guardando modelo', description: 'Almacenando modelo entrenado' },
  ];

  const simulatedLogs = [
    '✓ Sistema inicializado',
    '✓ Cargando dataset de entrenamiento...',
    '✓ 1,247 imágenes cargadas correctamente',
    '✓ Iniciando preprocesamiento de imágenes...',
    '✓ Extracción de características faciales...',
    '✓ Características extraídas: 512 dimensiones',
    '✓ Iniciando entrenamiento del modelo CNN...',
    '✓ Época 1/50 - Pérdida: 0.45',
    '✓ Época 10/50 - Pérdida: 0.23',
    '✓ Época 20/50 - Pérdida: 0.12',
    '✓ Época 30/50 - Pérdida: 0.08',
    '✓ Época 40/50 - Pérdida: 0.05',
    '✓ Época 50/50 - Pérdida: 0.03',
    '✓ Entrenamiento completado exitosamente',
    '✓ Iniciando validación del modelo...',
    '✓ Precisión en conjunto de validación: 98.7%',
    '✓ Guardando modelo entrenado...',
    '✓ Modelo guardado en: /models/facial_recognition_v2.h5',
    '✓ Proceso de entrenamiento finalizado',
  ];

  const startTraining = async () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setTrainingComplete(false);
    setTrainingLog(['Iniciando proceso de entrenamiento...']);

    // Simular entrenamiento
    for (let i = 0; i < trainingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTrainingProgress(((i + 1) / trainingSteps.length) * 100);
      
      // Agregar logs simulados
      const startLogIndex = i * 3;
      const endLogIndex = startLogIndex + 3;
      const newLogs = simulatedLogs.slice(startLogIndex, endLogIndex);
      setTrainingLog(prev => [...prev, ...newLogs]);
    }

    setTrainingComplete(true);
    setIsTraining(false);
  };

  const resetTraining = () => {
    setTrainingProgress(0);
    setIsTraining(false);
    setTrainingComplete(false);
    setTrainingLog([]);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #173974 0%, #2a56a5 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
          textAlign: 'center',
        }}>
        Entrenamiento del Modelo Facial
      </Typography>

      <Card sx={{ 
        borderRadius: 3, 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
        mb: 4,
        width: '100%'
      }}>
        <CardContent sx={{ p: 4 }}>
          {/* Estadísticas rápidas */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 2, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.100' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary.main" fontWeight="bold">
                    1,247
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Imágenes totales
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 2, bgcolor: 'success.50', border: '1px solid', borderColor: 'success.100' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main" fontWeight="bold">
                    45
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Usuarios registrados
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 2, bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.100' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main" fontWeight="bold">
                    98.7%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precisión actual
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 2, bgcolor: 'info.50', border: '1px solid', borderColor: 'info.100' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main" fontWeight="bold">
                    v2.1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Versión del modelo
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Progreso del entrenamiento */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary.main">
              Progreso del Entrenamiento
            </Typography>
            
            <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {trainingComplete ? 'Entrenamiento Completado' : 'Proceso de Entrenamiento'}
                  </Typography>
                  <Chip 
                    label={trainingComplete ? "Completado" : isTraining ? "En Progreso" : "Listo"} 
                    color={trainingComplete ? "success" : isTraining ? "warning" : "primary"}
                    icon={trainingComplete ? <CheckCircle /> : isTraining ? <CircularProgress size={16} /> : <Storage />}
                  />
                </Box>

                <LinearProgress 
                  variant="determinate" 
                  value={trainingProgress} 
                  sx={{ 
                    height: 10, 
                    borderRadius: 5,
                    mb: 3,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: trainingComplete ? 'success.main' : 'primary.main',
                      borderRadius: 5,
                    }
                  }}
                />

                <Grid container spacing={2}>
                  {trainingSteps.map((step, index) => {
                    const stepProgress = (index + 1) * 20;
                    const isCompleted = trainingProgress >= stepProgress;
                    const isCurrent = trainingProgress >= (index * 20) && trainingProgress < stepProgress;
                    
                    return (
                      <Grid item xs={12} sm={6} md={2.4} key={index}>
                        <Card 
                          sx={{ 
                            borderRadius: 2,
                            border: '2px solid',
                            borderColor: isCompleted ? 'success.main' : isCurrent ? 'primary.main' : 'grey.300',
                            backgroundColor: isCompleted ? 'success.50' : isCurrent ? 'primary.50' : 'grey.50',
                            transition: 'all 0.3s ease',
                            textAlign: 'center',
                            p: 2
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                            {isCompleted ? (
                              <CheckCircle sx={{ color: 'success.main', fontSize: 24 }} />
                            ) : isCurrent ? (
                              <CircularProgress size={24} color="primary" />
                            ) : (
                              <Box sx={{ 
                                width: 24, 
                                height: 24, 
                                borderRadius: '50%', 
                                backgroundColor: 'grey.400' 
                              }} />
                            )}
                          </Box>
                          <Typography variant="caption" fontWeight="bold" display="block">
                            {step.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {step.description}
                          </Typography>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Box>

          {/* Logs del entrenamiento */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary.main">
              Logs del Proceso
            </Typography>
            
            <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
              <CardContent>
                <Box sx={{ 
                  height: 200, 
                  overflow: 'auto',
                  backgroundColor: 'grey.50',
                  borderRadius: 2,
                  p: 2,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem'
                }}>
                  {trainingLog.length > 0 ? (
                    trainingLog.map((log, index) => (
                      <Box 
                        key={index} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 0.5,
                          color: log.includes('✓') ? 'success.main' : 'text.primary'
                        }}
                      >
                        <Typography variant="caption" fontFamily="inherit">
                          {log}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      Los logs del entrenamiento aparecerán aquí...
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Botones de acción */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={isTraining ? <CircularProgress size={20} color="inherit" /> : <PlayArrow />}
              onClick={startTraining}
              disabled={isTraining}
              sx={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                borderRadius: 2,
                px: 4,
                py: 1.5,
                minWidth: 200,
              }}
            >
              {isTraining ? 'Entrenando...' : 'Iniciar Entrenamiento'}
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<Replay />}
              onClick={resetTraining}
              disabled={isTraining}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                minWidth: 200,
              }}
            >
              Reiniciar
            </Button>

            <Button
              variant="outlined"
              color="error"
              size="large"
              startIcon={<Cancel />}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                minWidth: 200,
              }}
            >
              Cancelar
            </Button>
          </Box>

          {trainingComplete && (
            <Alert 
              severity="success" 
              sx={{ 
                mt: 3,
                borderRadius: 2,
                '& .MuiAlert-message': {
                  width: '100%'
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Typography variant="body1" fontWeight="bold">
                  ¡Entrenamiento completado exitosamente!
                </Typography>
                <Chip 
                  label="Modelo Actualizado" 
                  color="success" 
                  variant="filled"
                />
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                El modelo facial ha sido entrenado con 1,247 imágenes y alcanzó una precisión del 98.7% en el conjunto de validación.
              </Typography>
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Entrenar;