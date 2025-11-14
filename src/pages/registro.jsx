// UserRegister.jsx
import React, { useState, useRef } from 'react';
import {
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  TextField,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  CameraAlt,
  ArrowBack,
  ArrowForward,
  PlayArrow,
  CheckCircle,
  Person,
  Visibility,
  Cancel,
  Replay,
  Done,
} from '@mui/icons-material';
import Paso1 from "../assets/Paso1.png";
import Paso2 from "../assets/Paso2.png";
import Paso3 from "../assets/Paso3.png";

// Imágenes dummy para simular la captura
const dummyImages = [
  "https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=Frontal",
  "https://via.placeholder.com/300x300/10B981/FFFFFF?text=Izquierda", 
  "https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=Derecha",
  "https://via.placeholder.com/300x300/F59E0B/FFFFFF?text=Arriba",
  "https://via.placeholder.com/300x300/EF4444/FFFFFF?text=Abajo",
  "https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=Diagonal+I",
  "https://via.placeholder.com/300x300/F59E0B/FFFFFF?text=Diagonal+D",
  "https://via.placeholder.com/300x300/10B981/FFFFFF?text=Mirada+Arriba",
  "https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=Mirada+Abajo",
  "https://via.placeholder.com/300x300/EF4444/FFFFFF?text+Extra+1",
  "https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text+Extra+2"
];

// Lista de departamentos
const departamentos = [
  "Análisis de Datos",
  "Inteligencia Artificial", 
  "Electrónica",
  "Desarrollo Web",
  "Redes y Plataformas",
  "Recursos Humanos",
  "Pasantes"
];

const UserRegister = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [captureStep, setCaptureStep] = useState(0);
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    telegram: '',
    telefono: '',
    departamento: "",
  });
  const [capturedImages, setCapturedImages] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [training, setTraining] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const steps = [
    {
      label: 'Información Personal',
      description: 'Completa los datos básicos del usuario',
      icon: <Person />,
    },
    {
      label: 'Instrucciones',
      description: 'Preparación para la captura facial',
      icon: <CameraAlt />,
    },
    {
      label: 'Toma de Data',
      description: 'Captura de imágenes para el reconocimiento',
      icon: <CheckCircle />,
    },
  ];

  const captureSteps = [
    {
      title: 'Coloca a la persona en una posición Frontal',
      description: 'Colócate frente a la cámara con buena iluminación y mira directamente',
      image: Paso1,
      instructions: ['Buena iluminación', 'Rostro centrado', 'Mirada al frente'],
    },
    {
      title: 'Varia ligeramente el angulo facial',
      description: 'Gira ligeramente la cabeza hacia tu izquierda (15-20 grados)',
      image: Paso2,
      instructions: ['Giro suave a la izquierda', 'Mantén los ojos abiertos', 'Rostro visible'],
    },
    {
      title: 'Entrena el modelo con la data recolectada',
      description: '100 Imagenes son suficientes para agregar a la persona',
      image: Paso3,
      instructions: ['Tomar 100 imagenes', 'Corroborar imagenes', 'Entrenar modelo'],
    },
  ];

  const handleNext = () => {
    if (activeStep === 0 && !userData.nombre) {
      alert('Por favor completa al menos el nombre');
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 2) {
      stopCamera();
    }
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
      alert('No se pudo acceder a la cámara. Por favor verifica los permisos.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const simulateCapture = () => {
    // Simular captura de 1-3 imágenes aleatorias por paso
    const imagesToCapture = Math.floor(Math.random() * 3) + 1; // 1-3 imágenes
    
    const newImages = Array.from({ length: imagesToCapture }, (_, index) => {
      const randomImageIndex = Math.floor(Math.random() * dummyImages.length);
      return {
        id: Date.now() + index,
        data: dummyImages[randomImageIndex],
        step: captureStep,
        timestamp: new Date().toLocaleTimeString(),
        position: ['Frontal', 'Izquierda', 'Derecha', 'Arriba', 'Abajo', 'Diagonal I', 'Diagonal D'][index % 7]
      };
    });
    
    // Lógica FIFO: mantener máximo 7 imágenes, descartar las más viejas
    setCapturedImages(prev => {
      const updatedImages = [...prev, ...newImages];
      // Si tenemos más de 7 imágenes, mantener solo las últimas 7
      return updatedImages.slice(-7);
    });

    // Avanzar automáticamente después de capturar
    if (captureStep < captureSteps.length - 1) {
      setTimeout(() => {
        setCaptureStep(prev => prev + 1);
      }, 1500);
    }
  };

  const startTraining = async () => {
    setTraining(true);
    
    // Simular entrenamiento del modelo
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setTraining(false);
    setActiveStep(3); // Nuevo paso de completado
  };

  const handleStartCapture = () => {
    setIsCapturing(true);
    setCaptureStep(0);
    setCapturedImages([]);
    // Avanzar al paso de Toma de Data
    setActiveStep(2);
    // Iniciar captura automática
    simulateCapture();
  };

  const handleRetryCapture = () => {
    setCapturedImages([]);
    setCaptureStep(0);
    // Reiniciar captura después de un breve delay
    setTimeout(() => {
      simulateCapture();
    }, 500);
  };

  const handleFinishCapture = () => {
    startTraining();
  };

  const resetForm = () => {
    setActiveStep(0);
    setUserData({ 
      nombre: '', 
      apellido: '', 
      cedula: '', 
      telegram: '', 
      telefono: '',
      departamento: "" 
    });
    setCapturedImages([]);
    setTraining(false);
    setIsCapturing(false);
    stopCamera();
  };

  const renderImageGrid = () => {
    const gridCells = [];
    
    // Crear 7 celdas
    for (let i = 0; i < 7; i++) {
      const image = capturedImages[i]; // Las imágenes ya están en orden (las más recientes al final)
      
      // Para la primera fila (4 imágenes) usamos xs={3}, para la segunda (3 imágenes) usamos xs={4}
      const gridSize = i < 4 ? 3 : 4;
      
      gridCells.push(
        <Grid item xs={gridSize} key={i}>
          <Card 
            sx={{ 
              borderRadius: 2,
              height: 140, // Tamaño fijo
              width: '100%', // Ancho completo del grid item
              transition: 'all 0.2s ease',
              border: image ? '2px solid' : '2px dashed',
              borderColor: image ? 'primary.main' : 'grey.300',
              backgroundColor: image ? 'transparent' : 'grey.50',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              '&:hover': image ? {
                transform: 'scale(1.02)',
                boxShadow: 2
              } : {}
            }}
          >
            <CardContent sx={{ 
              p: 1, 
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:last-child': { pb: 1 }
            }}>
              {image ? (
                <>
                  {/* Contenedor de imagen con altura fija */}
                  <Box sx={{ 
                    width: '100%',
                    height: 90, // Altura fija para la imagen
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderRadius: 1,
                    mb: 0.5
                  }}>
                    <Box
                      component="img"
                      src={image.data}
                      alt={`Captura ${i + 1}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </Box>
                  {/* Contenedor de texto con altura fija */}
                  <Box sx={{ 
                    flexShrink: 0,
                    height: 32, // Altura fija para el texto
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                  }}>
                    <Typography variant="caption" display="block" fontWeight="bold" noWrap sx={{ lineHeight: 1.2 }}>
                      {image.position}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                      #{capturedImages.length - (7 - i - 1)}
                    </Typography>
                  </Box>
                </>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%'
                }}>
                  <Typography variant="h4" color="grey.400" sx={{ mb: 1, lineHeight: 1 }}>
                    {i + 1}
                  </Typography>
                  <Typography variant="caption" color="grey.500" textAlign="center" sx={{ lineHeight: 1.2 }}>
                    Esperando imagen...
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      );
    }
    
    return gridCells;
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, width: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
              Información del Usuario
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={10}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      value={userData.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      required
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Apellido"
                      value={userData.apellido}
                      onChange={(e) => handleInputChange('apellido', e.target.value)}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Cédula de Identidad"
                      value={userData.cedula}
                      onChange={(e) => handleInputChange('cedula', e.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre de Telegram"
                      value={userData.telegram}
                      onChange={(e) => handleInputChange('telegram', e.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      value={userData.telefono}
                      onChange={(e) => handleInputChange('telefono', e.target.value)}
                      sx={{ mb: 3 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel id="departamento-label"  shrink={true} sx={{ fontSize: '1rem' }}>
                        Departamento
                      </InputLabel>
                      <Select
                        labelId="departamento-label"
                        id="departamento"
                        value={userData.departamento}
                        label="Departamento"
                        onChange={(e) => handleInputChange('departamento', e.target.value)}
                        displayEmpty
                        renderValue={(value) => {
                          if (value === "") {
                            return (
                              <Typography 
                                sx={{ 
                                  color: 'text.disabled',
                                  fontSize: '1rem',
                                  fontWeight: 'normal'
                                }}
                              >
                                Seleccione un departamento
                              </Typography>
                            );
                          }
                          return value;
                        }}
                        sx={{
                          fontSize: '1rem',
                          minHeight: '56px',
                          '& .MuiSelect-select': {
                            padding: '16.5px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            minWidth: '100%',
                            width: '100%'
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0, 0, 0, 0.87)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                            borderWidth: 2,
                          }
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              maxHeight: 300,
                              minWidth: '300px !important',
                              '& .MuiMenuItem-root': {
                                fontSize: '1rem',
                                padding: '12px 16px',
                                minHeight: '48px'
                              }
                            }
                          }
                        }}
                      >
                        {departamentos.map((depto, index) => (
                          <MenuItem key={index} value={depto} sx={{ fontSize: '1rem' }}>
                            {depto}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
              Preparado para la Captura Facial
            </Typography>
            
            {/* Cards de los 3 pasos - Ocupan todo el ancho */}
            <Grid container spacing={1} sx={{ mb: 6 }}>
              {captureSteps.map((step, index) => (
                <Grid item xs={12} sm={4} md={4} key={index} sx={{ display: 'flex' }}>
                  <Card sx={{ 
                    flex: 1,
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                    }
                  }}>
                    <CardContent sx={{ 
                      textAlign: 'center', 
                      p: 3,
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <Box
                        component="img"
                        src={step.image}
                        alt={step.title}
                        sx={{
                          width: '100%',
                          height: 180,
                          objectFit: 'contain',
                          mb: 2,
                          borderRadius: 2,
                        }}
                      />
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom color="primary.main">
                          Paso {index + 1}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ mb: 1 }}>
                          {step.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                          {step.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {step.instructions.map((instruction, idx) => (
                            <Chip
                              key={idx}
                              label={instruction}
                              size="small"
                              variant="outlined"
                              sx={{ 
                                fontSize: '0.75rem',
                                borderColor: 'primary.light',
                                color: 'primary.dark'
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

        case 2:
          return (
            <Box sx={{ mt: 4, minHeight: 500 }}>
              <Grid container spacing={3} sx={{ height: '100%', flexWrap: 'nowrap' }}>
                {/* Panel de Control - Siempre en la misma fila */}
                <Grid item xs={12} lg={4}>
                  <Card sx={{ borderRadius: 3, height: '100%', minWidth: 300 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary.main">
                        Progreso de Captura
                      </Typography>
                      
                      {/* Estado actual discreto */}
                      <Box sx={{ mb: 4, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Estado:
                          </Typography>
                          <Chip 
                            label={training ? "Procesando" : "Capturando"} 
                            color={training ? "warning" : "success"}
                            size="small"
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Paso actual:
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {captureStep + 1} de {captureSteps.length}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Imágenes:
                          </Typography>
                          <Typography variant="body2" fontWeight="bold" color="primary.main">
                            {capturedImages.length}/7
                          </Typography>
                        </Box>
                      </Box>
        
                      {/* Barra de progreso */}
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                          Progreso General
                        </Typography>
                        <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 5, height: 8, mb: 1 }}>
                          <Box 
                            sx={{ 
                              width: `${((captureStep + 1) / captureSteps.length) * 100}%`,
                              bgcolor: 'primary.main',
                              borderRadius: 5,
                              height: '100%',
                              transition: 'width 0.3s ease'
                            }} 
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {captureSteps[captureStep].title}
                        </Typography>
                      </Box>
        
                      {/* Botones de acción */}
                      <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<Cancel />}
                          onClick={resetForm}
                          sx={{ flex: 1 }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Replay />}
                          onClick={handleRetryCapture}
                          sx={{ flex: 1 }}
                        >
                          Reintentar Captura
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<Done />}
                          onClick={handleFinishCapture}
                          sx={{ flex: 1 }}
                          disabled={capturedImages.length === 0 || training}
                        >
                          {training ? 'Procesando...' : 'Terminar Captura'}
                        </Button>
                      </Box>
        
                      {training && (
                        <Alert severity="info" sx={{ mt: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={16} />
                            <Typography variant="body2">
                              Procesando imágenes...
                            </Typography>
                          </Box>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
        
                {/* Vista Previa de Imágenes - Siempre en la misma fila */}
                <Grid item xs={12} lg={8}>
                  <Card sx={{ borderRadius: 3, height: '100%', minWidth: 400 }}>
                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">
                          Vista Previa (Últimas 7 imágenes)
                        </Typography>
                        <Chip 
                          label={`${capturedImages.length}/7 imágenes`} 
                          color={capturedImages.length === 7 ? "success" : "primary"}
                          size="small" 
                        />
                      </Box>
                      
                      {/* Cuadrícula 7 casillas (4 + 3) */}
                      <Box sx={{ flex: 1 }}>
                        <Grid container spacing={1} sx={{ height: '100%' }}>
                          {renderImageGrid()}
                        </Grid>
                      </Box>
        
                      {/* Información adicional */}
                      <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                        <Typography variant="caption" color="info.dark">
                          <strong>Nota:</strong> Se muestran las últimas 7 imágenes capturadas. 
                          Las imágenes más antiguas se descartan automáticamente.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          );

      case 3:
        return (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              ¡Registro Completado!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
              El usuario <strong>{userData.nombre} {userData.apellido}</strong> ha sido registrado exitosamente 
              en el sistema de reconocimiento facial con {capturedImages.length} imágenes de entrenamiento.
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Resumen del Registro
              </Typography>
              <Card sx={{ maxWidth: 400, mx: 'auto', borderRadius: 3 }}>
                <CardContent>
                  <Typography><strong>Nombre:</strong> {userData.nombre} {userData.apellido}</Typography>
                  <Typography><strong>Cédula:</strong> {userData.cedula || 'No especificada'}</Typography>
                  <Typography><strong>Telegram:</strong> {userData.telegram || 'No especificado'}</Typography>
                  <Typography><strong>Teléfono:</strong> {userData.telefono || 'No especificado'}</Typography>
                  <Typography><strong>Departamento:</strong> {userData.departamento || 'No especificado'}</Typography>
                  <Typography><strong>Total de imágenes:</strong> {capturedImages.length}</Typography>
                  <Typography><strong>Fecha de registro:</strong> {new Date().toLocaleDateString()}</Typography>
                </CardContent>
              </Card>
            </Box>

            <Button
              variant="contained"
              onClick={resetForm}
              sx={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                borderRadius: 2,
                px: 4,
                py: 1.5,
              }}
            >
              Registrar Otro Usuario
            </Button>
          </Box>
        );

      default:
        return 'Paso desconocido';
    }
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
        Registro de Usuarios
      </Typography>

      <Card sx={{ 
        borderRadius: 3, 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
        mb: 4,
        width: '100%'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  icon={step.icon}
                  sx={{
                    '& .MuiStepLabel-label': {
                      fontWeight: activeStep === index ? 'bold' : 'normal',
                    }
                  }}
                >
                  <Typography variant="body1" fontWeight={activeStep === index ? 'bold' : 'normal'}>
                    {step.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {step.description}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep)}

          {/* Botones de navegación - Mostrar en pasos 0 y 1 */}
          {activeStep < 2 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack />}
              >
                Atrás
              </Button>
              
              <Button
                variant="contained"
                onClick={activeStep === 0 ? handleNext : handleStartCapture}
                endIcon={<ArrowForward />}
                disabled={activeStep === 0 && !userData.nombre}
              >
                {activeStep === 0 ? 'Siguiente' : 'Comenzar Captura'}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserRegister;