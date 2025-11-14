// dashboard.jsx
import React from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Card, 
  CardContent, 
  Grid,
  LinearProgress,
  Avatar,
  Chip,
  useTheme
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccessTime,
  Person,
  Schedule,
  EmojiEvents,
  DonutLarge,
  Warning
} from '@mui/icons-material';

// Colores basados en #173974
const primaryColor = '#173974';
const primaryDark = '#0f2a5a';
const primaryLight = '#2a56a5';
const gradientButton = 'linear-gradient(135deg, #173974 0%, #2a56a5 100%)';

// Componente para gráfica de torta simple
const PieChartComponent = ({ data, size = 120 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let accumulated = 0;
  
  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 120 120">
        {data.map((item, index) => {
          const segment = (item.value / total) * 360;
          const startAngle = accumulated;
          accumulated += segment;
          
          const x1 = 60 + 40 * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 60 + 40 * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 60 + 40 * Math.cos(((startAngle + segment) * Math.PI) / 180);
          const y2 = 60 + 40 * Math.sin(((startAngle + segment) * Math.PI) / 180);
          
          const largeArc = segment > 180 ? 1 : 0;
          
          return (
            <path
              key={index}
              d={`M 60 60 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={item.color}
              stroke="#fff"
              strokeWidth="2"
            />
          );
        })}
        <circle cx="60" cy="60" r="20" fill="white" />
      </svg>
      
      {/* Leyenda */}
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="bold" color={primaryColor}>
          {total}%
        </Typography>
      </Box>
    </Box>
  );
};

export default function Dashboard() {
  const theme = useTheme();

  // Datos de ejemplo para los top 3 semanales
  const topWorkersSemanal = [
    { nombre: 'Ana Martínez', horas: 42.5, departamento: 'Contabilidad', cambio: '+1.2h', positivo: true },
    { nombre: 'Carlos Ruiz', horas: 41.8, departamento: 'TI', cambio: '+0.8h', positivo: true },
    { nombre: 'María García', horas: 40.2, departamento: 'RH', cambio: '+0.5h', positivo: true }
  ];

  const bottomWorkersSemanal = [
    { nombre: 'Pedro Rodríguez', horas: 32.1, departamento: 'Marketing', cambio: '-2.1h', positivo: false },
    { nombre: 'Laura Sánchez', horas: 33.5, departamento: 'Ventas', cambio: '-1.5h', positivo: false },
    { nombre: 'Diego López', horas: 34.8, departamento: 'Contabilidad', cambio: '-0.8h', positivo: false }
  ];

  const departmentAttendance = [
    { departamento: 'Ventas', porcentaje: 92, color: '#173974', value: 92 },
    { departamento: 'TI', porcentaje: 88, color: '#2a56a5', value: 88 },
    { departamento: 'RH', porcentaje: 95, color: '#3b82f6', value: 95 },
    { departamento: 'Contabilidad', porcentaje: 96, color: '#60a5fa', value: 96 },
    { departamento: 'Marketing', porcentaje: 85, color: '#93c5fd', value: 85 }
  ];

  const attendanceDistribution = [
    { label: 'Presente', value: 85, color: '#10b981' },
    { label: 'Tardanza', value: 8, color: '#f59e0b' },
    { label: 'Ausente', value: 7, color: '#ef4444' }
  ];

  const metrics = [
    { 
      titulo: 'Asistencia Semanal', 
      valor: '94%', 
      cambio: '+2%', 
      positivo: true,
      icono: <TrendingUp sx={{ color: '#10b981' }} />,
      color: '#10b981'
    },
    { 
      titulo: 'Horas Promedio', 
      valor: '8.3h', 
      cambio: '+0.2h', 
      positivo: true,
      icono: <AccessTime sx={{ color: primaryColor }} />,
      color: primaryColor
    },
    { 
      titulo: 'Usuarios Activos', 
      valor: '45', 
      cambio: '+3', 
      positivo: true,
      icono: <Person sx={{ color: '#8b5cf6' }} />,
      color: '#8b5cf6'
    },
    { 
      titulo: 'Tardanzas', 
      valor: '5', 
      cambio: '-2', 
      positivo: true,
      icono: <Schedule sx={{ color: '#f59e0b' }} />,
      color: '#f59e0b'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          fontWeight: 'bold',
          background: gradientButton,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2
        }}>
          Panel de Control
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Resumen general del sistema de reconocimiento facial y asistencias
        </Typography>
      </Box>

      {/* Métricas Principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: metric.color }}>
                      {metric.valor}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {metric.titulo}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    backgroundColor: `${metric.color}15`,
                    borderRadius: 2,
                    p: 1
                  }}>
                    {metric.icono}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {metric.positivo ? 
                    <TrendingUp sx={{ fontSize: 16, color: '#10b981' }} /> : 
                    <TrendingDown sx={{ fontSize: 16, color: '#ef4444' }} />
                  }
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: metric.positivo ? '#10b981' : '#ef4444',
                      fontWeight: 'medium'
                    }}
                  >
                    {metric.cambio} vs semana anterior
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Cards principales en una sola fila - Optimizadas */}
      <Grid container spacing={3}>
        {/* Distribución de asistencia */}
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid',
            borderColor: 'divider',
            height: '100%',
            minHeight: 380
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <DonutLarge sx={{ color: primaryColor, fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Distribución Asistencia
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <PieChartComponent data={attendanceDistribution} size={120} />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                {attendanceDistribution.map((item, index) => (
                  <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 12, height: 12, backgroundColor: item.color, borderRadius: '50%' }} />
                      <Typography variant="body1" fontWeight="medium">
                        {item.label}
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="bold" color="text.primary">
                      {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top 3 trabajadores con más horas semanales */}
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid',
            borderColor: 'divider',
            height: '100%',
            minHeight: 380
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <EmojiEvents sx={{ color: '#f59e0b', fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Top 3 Más Horas
                </Typography>
              </Box>
              
              {topWorkersSemanal.map((worker, index) => (
                <Box key={worker.nombre} sx={{ mb: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Avatar sx={{ 
                      bgcolor: primaryColor,
                      width: 36,
                      height: 36,
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body1" fontWeight="medium" sx={{ lineHeight: 1.2 }}>
                        {worker.nombre}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {worker.departamento}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip 
                        label={`${worker.horas}h`} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 0.5 }}
                      />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: worker.positivo ? '#10b981' : '#ef4444',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        {worker.positivo ? <TrendingUp sx={{ fontSize: 14 }} /> : <TrendingDown sx={{ fontSize: 14 }} />}
                        {worker.cambio}
                      </Typography>
                    </Box>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(worker.horas / 45) * 100} 
                    sx={{ 
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'grey.100',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: primaryColor,
                        borderRadius: 3
                      }
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Top 3 trabajadores con menos horas semanales */}
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid',
            borderColor: 'divider',
            height: '100%',
            minHeight: 380
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Warning sx={{ color: '#ef4444', fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Top 3 Menos Horas
                </Typography>
              </Box>
              
              {bottomWorkersSemanal.map((worker, index) => (
                <Box key={worker.nombre} sx={{ mb: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Avatar sx={{ 
                      bgcolor: '#6b7280',
                      width: 36,
                      height: 36,
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body1" fontWeight="medium" sx={{ lineHeight: 1.2 }}>
                        {worker.nombre}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {worker.departamento}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip 
                        label={`${worker.horas}h`} 
                        size="small" 
                        color="default"
                        variant="outlined"
                        sx={{ mb: 0.5 }}
                      />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: worker.positivo ? '#10b981' : '#ef4444',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        {worker.positivo ? <TrendingUp sx={{ fontSize: 14 }} /> : <TrendingDown sx={{ fontSize: 14 }} />}
                        {worker.cambio}
                      </Typography>
                    </Box>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(worker.horas / 45) * 100} 
                    sx={{ 
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'grey.100',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#6b7280',
                        borderRadius: 3
                      }
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Asistencia por departamento */}
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid',
            borderColor: 'divider',
            height: '100%',
            minHeight: 380,
            width:450,
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <TrendingUp sx={{ color: primaryColor, fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Por Departamento
                </Typography>
              </Box>
              
              {departmentAttendance.map((dept, index) => (
                <Box key={dept.departamento} sx={{ mb: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" fontWeight="medium">
                      {dept.departamento}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" color="text.primary">
                      {dept.porcentaje}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={dept.porcentaje} 
                    sx={{ 
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'grey.100',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: dept.color,
                        borderRadius: 4
                      }
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}