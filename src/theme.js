// src/theme.js
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',  // Màu Instagram blue cho buttons
    },
    background: {
      default: '#000',  // Black background
      paper: '#1a1a1a', // For cards/boxes
    },
    text: {
      primary: '#fff',
      secondary: '#aaa',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    h6: { fontWeight: 600 },  // Customize cho titles
  },
  components: {
    // Override global cho TextField (thay !important)
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': { borderColor: '#444' },
            '&:hover fieldset': { borderColor: '#666' },
          },
          '& .MuiInputLabel-root': { color: '#aaa' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});

export default darkTheme;