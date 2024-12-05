import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  TextField,
  Typography,
  Stack,
  Button,
  Box,
  Snackbar,
} from '@mui/material';

function App() {
  const [text, setText] = useState<string>('');
  const [qrCode, setQrCode] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const theme = createTheme({
    palette: {
      text: {
        primary: '#ffffff',
      },
    },
  });

  const handleGetQR = () => {
    if (!text) {
      return;
    }
    window.backendAPI.generateQR(text);

    window.backendAPI.onQRGenerated((data) => {
      setQrCode(`data:image/png;base64,${data}`); // Set Base64 image source
    });
    setSnackBarMessage('QR Code generated.');
    setSnackBarOpen(true);
  };

  const handleCopyImage = () => {
    if (!qrCode) {
      return;
    }
    window.backendAPI.writeImage(qrCode);
    setSnackBarMessage('QR Code copied to clipboard.');
    setSnackBarOpen(true);
  };

  const handleClear = () => {
    setQrCode('');
    setText('');
    setSnackBarMessage('Cleared.');
    setSnackBarOpen(true);
  };

  const handSnackbarClose = () => {
    setSnackBarOpen(false);
    setSnackBarMessage('');
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#343541',
        }}
      >
        <Stack spacing={2} alignItems='center' style={{ marginTop: '20px' }}>
          <Typography color='text.primary' variant='h4'>
            Text to QR Code
          </Typography>
          <TextField
            required
            label='Enter text'
            variant='outlined'
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{
              label: { color: '#ffffff' },
              '& .MuiInputBase-root': { color: '#ffffff' },
              fieldset: { borderColor: '#ffffff' },
            }}
          />
          <Box display='flex' gap={2}>
            <Button variant='contained' onClick={handleGetQR}>
              Submit
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleCopyImage}
            >
              Copy
            </Button>
            <Button variant='outlined' color='error' onClick={handleClear}>
              Clear
            </Button>
          </Box>
          {qrCode && <img src={qrCode} alt='Generated QR Code' />}
        </Stack>
        <Snackbar
          ContentProps={{
            sx: {
              backgroundColor: '#04758f'
            }
          }}
          open={snackBarOpen}
          autoHideDuration={3000}
          onClose={handSnackbarClose}
          message={snackBarMessage}
        />
      </div>
    </ThemeProvider>
  );
}
export default App;
