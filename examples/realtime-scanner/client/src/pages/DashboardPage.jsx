import { useEffect, useState } from 'react';
import { Box, Button, Container, Modal, Paper, Stack, Typography } from '@mui/material';
import useSocket from '../hooks/useSocket.js';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const DashboardPage = ({ socketUrl, pairedSession }) => {
  const { socket, isConnected } = useSocket(socketUrl);
  const [modal, setModal] = useState({ open: false, code: '' });

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleBarcode = ({ code, sessionId }) => {
      if (sessionId && sessionId !== pairedSession) {
        return;
      }
      setModal({ open: true, code });
    };

    socket.on('barcodeReceived', handleBarcode);
    return () => socket.off('barcodeReceived', handleBarcode);
  }, [socket, pairedSession]);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>
        Inventory Dashboard
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Status: {isConnected ? 'Connected to Socket.io' : 'Connecting…'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Pairing Code: <strong>{pairedSession}</strong>
        </Typography>
        <Typography variant="body2">
          Keep this tab open on your PC. Open the scanner on your phone, enter this code, and any scan will pop up here instantly.
        </Typography>
      </Paper>

      <Modal open={modal.open} onClose={() => setModal((prev) => ({ ...prev, open: false }))}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Barcode Received
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Code: <strong>{modal.code}</strong>
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => alert(`Viewing details for ${modal.code}`)}>
              View Details
            </Button>
            <Button variant="contained" onClick={() => alert(`Adding item ${modal.code}`)}>
              Add Item
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default DashboardPage;
