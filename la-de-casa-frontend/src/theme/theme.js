import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7C324C', // Bordô
      light: '#9d4d6a',
      dark: '#5a2336',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ACC1CC', // Azul Claro
      light: '#c5d5dd',
      dark: '#8aa3b0',
      contrastText: '#000',
    },
    background: {
      default: '#F4EFEA', // Bege
      paper: '#fff',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#7C324C',
    },
    h5: {
      fontWeight: 500,
      color: '#7C324C',
    },
    h6: {
      fontWeight: 500,
      color: '#7C324C',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(124, 50, 76, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default theme;
