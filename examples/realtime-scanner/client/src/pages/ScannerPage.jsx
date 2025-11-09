import { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { Html5Qrcode } from 'html5-qrcode';
import useSocket from '../hooks/useSocket.js';

const ScannerPage = ({ socketUrl, pairedSession }) => {
  const { socket, isConnected } = useSocket(socketUrl);
  const [sessionCode, setSessionCode] = useState(pairedSession ?? '');
  const [message, setMessage] = useState('Camera idle');
  const [isScanning, setScanning] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => () => stopScanner(), []);

  const startScanner = async () => {
    if (!socket) {
      setMessage('Socket not connected');
      return;
    }

    try {
      const scanner = new Html5Qrcode('scanner-view');
      scannerRef.current = scanner;
      await scanner.start(
        { facingMode: { exact: 'environment' } },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => handleScan(decodedText),
      );
      setScanning(true);
      setMessage('Scanning… align barcode inside the frame');
    } catch (error) {
      setMessage(`Failed to access camera: ${error.message}`);
    }
  };

  const stopScanner = () => {
    const scanner = scannerRef.current;
    if (!scanner) {
      return;
    }
    scanner
      .stop()
      .catch(() => undefined)
      .finally(() => {
        scanner.clear().catch(() => undefined);
        scannerRef.current = null;
        setScanning(false);
        setMessage('Scanner stopped');
      });
  };

  const handleScan = (decodedText) => {
    const clean = decodedText.trim();
    socket.emit('barcodeScanned', { code: clean, sessionId: sessionCode || null });
    setMessage(`Scanned ${clean} — sent to dashboard`);
    // Phone immediately notifies backend; backend broadcasts "barcodeReceived",
    // which the dashboard listens to and opens a modal in real time.
    stopScanner();
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Mobile Barcode Scanner
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="body2">Socket status: {isConnected ? 'Connected' : 'Connecting…'}</Typography>
          <TextField
            label="Pairing Code"
            value={sessionCode}
            onChange={(event) => setSessionCode(event.target.value.toUpperCase())}
            helperText="Match the code shown on the dashboard"
          />
          <Box
            id="scanner-view"
            sx={{
              width: '100%',
              minHeight: 260,
              borderRadius: 2,
              border: '1px dashed #777',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
            }}
          >
            {!isScanning && 'Camera preview will appear here'}
          </Box>
          <Typography variant="body2">{message}</Typography>
          <Stack direction="row" spacing={2}>
            <Button fullWidth variant="contained" onClick={startScanner} disabled={isScanning}>
              Start Scanning
            </Button>
            <Button fullWidth variant="outlined" onClick={stopScanner} disabled={!isScanning}>
              Stop Scanning
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ScannerPage;
