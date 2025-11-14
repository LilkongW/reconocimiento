// Login.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Grid, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Link, 
  InputAdornment, 
  IconButton,
  Card,
  Fade
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo3 from "../assets/logo3.png"

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);  
  const [flip, setFlip] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Colores basados en #173974
  const primaryColor = '#173974';
  const primaryDark = '#0f2a5a';
  const primaryLight = '#2a4d8a';
  const gradientBackground = 'linear-gradient(135deg, #173974 0%, #2a56a5 100%)';
  const gradientButton = 'linear-gradient(135deg, #173974 0%, #2a56a5 100%)';
  const gradientButtonHover = 'linear-gradient(135deg, #2a56a5 0%, #173974 100%)';

  const handleSwitchView = (e) => {
    e.preventDefault();
    setFlip(true);
    setTimeout(() => {
      setIsForgotPassword((prev) => !prev);
      setFlip(false);
    }, 300);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Función simulada para login
  const handleLoginSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      setTimeout(() => {
        setSuccessMessage('¡Inicio de sesión exitoso!');
        setOpenSnackbar(true);
        setLoading(false);
        
        setTimeout(() => navigate('/dash'), 2000);
      }, 1500);
      
    } catch (error) {
      setErrorMessage('Error inesperado');
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  // Función simulada para recuperación de contraseña
  const handleResetPasswordSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      setTimeout(() => {
        setSuccessMessage("Correo de recuperación enviado exitosamente");
        setOpenSnackbar(true);
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      setErrorMessage('Error inesperado');
      setOpenSnackbar(true);
      setLoading(false);
    }
  };  

  const onSubmit = (data) => {
    console.log('Datos del formulario:', data);
    if (isForgotPassword) {
      handleResetPasswordSubmit(data);
    } else {
      handleLoginSubmit(data);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: gradientBackground,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Fade in timeout={800}>
        <Card
          sx={{
            maxWidth: 480,
            width: '100%',
            p: 4,
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(23, 57, 116, 0.3)',
            border: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          }}
        >
          {/* Logo/Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              component="img"
              src={Logo3}
              alt="Logo corporativo"
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                objectFit: 'cover',
                margin: '0 auto 16px',
                boxShadow: '0 8px 25px rgba(23, 57, 116, 0.3)',
                display: 'block',
              }}
            />
            
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold',
                background: gradientButton,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
              }}
            >
              Sistema de reconocimiento Facial
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontSize: '1rem',
              }}
            >
              {isForgotPassword ? 'Recupera tu cuenta' : 'Inicia sesión en tu cuenta'}
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              transform: flip ? 'rotateY(90deg)' : 'rotateY(0deg)',
              transition: 'transform 0.5s',
              backfaceVisibility: 'hidden'
            }}
          >
            <Box sx={{ width: '100%' }}>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                {isForgotPassword ? (
                  <>
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Correo electrónico"
                        {...register('email', { 
                          required: 'El correo es obligatorio',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Correo electrónico inválido'
                          }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Box>

                    <Link
                      component="button"
                      onClick={handleSwitchView}
                      sx={{ 
                        mb: 3, 
                        color: primaryColor, 
                        textDecoration: 'none', 
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        '&:hover': { 
                          textDecoration: 'underline',
                          color: primaryDark
                        }
                      }}
                    >
                      ← Volver al Login
                    </Link>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ 
                        background: gradientButton,
                        borderRadius: 2,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 15px rgba(23, 57, 116, 0.3)',
                        '&:hover': {
                          background: gradientButtonHover,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(23, 57, 116, 0.4)',
                        },
                        transition: 'all 0.3s ease',
                        '&:disabled': {
                          color: 'white',
                          background: 'white.300',
                          transform: 'none',
                          boxShadow: 'none',
                        }
                      }}
                      disabled={loading}
                    >
                      {loading ? 'Enviando...' : 'Enviar correo de recuperación'}
                    </Button>
                  </>
                ) : (
                  <>
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Nombre de Usuario o correo"
                        {...register('username', { required: 'El nombre de usuario es obligatorio' })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', { required: 'La contraseña es obligatoria' })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                sx={{
                                  color: 'grey.600',
                                  '&:hover': {
                                    backgroundColor: 'rgba(23, 57, 116, 0.04)',
                                  }
                                }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>

                    <Link
                      component="button"
                      type="button"
                      onClick={handleSwitchView}
                      sx={{ 
                        mb: 3, 
                        color: primaryColor, 
                        textDecoration: 'none', 
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        '&:hover': { 
                          textDecoration: 'underline',
                          color: primaryDark
                        }
                      }}
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ 
                        background: gradientButton,
                        borderRadius: 2,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 15px rgba(23, 57, 116, 0.3)',
                        '&:hover': {
                          background: gradientButtonHover,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(23, 57, 116, 0.4)',
                        },
                        transition: 'all 0.3s ease',
                        '&:disabled': {
                          color: 'white',
                          background: 'white.300',
                          transform: 'none',
                          boxShadow: 'none',
                        }
                      }}
                      disabled={loading}
                    >
                      {loading ? 'Cargando...' : 'Iniciar Sesión'}
                    </Button>
                  </>
                )}
              </form>
            </Box>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary',
                textAlign: 'center',
                display: 'block'
              }}
            >
              © 2024 Sistemas tecnologicos Alcaravan - Vultur. Todos los derechos reservados.
            </Typography>
          </Box>
        </Card>
      </Fade>

      {/* Snackbar simple */}
      {openSnackbar && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: successMessage ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '12px 24px',
            borderRadius: 2,
            boxShadow: 3,
            zIndex: 9999,
          }}
        >
          <Typography variant="body2">{successMessage || errorMessage}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Login;