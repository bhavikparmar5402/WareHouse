import { useCallback, useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const ScannerPage = ({ barcode, onBarcodeChange, onBarcodeDetected, onAddItem, onViewDetails }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [status, setStatus] = useState({ tone: 'scanning', message: 'Position barcode within the camera frame...' });
  const qrCodeRef = useRef(null);
  const hasProcessedScan = useRef(false);

  const stopScanner = useCallback((instance) => {
    if (!instance) {
      return Promise.resolve();
    }

    return instance
      .stop()
      .catch((error) => {
        if (!`${error}`.includes('not running')) {
          console.error('Camera stop error:', error);
        }
      })
      .then(() =>
        instance.clear().catch((error) => {
          if (!`${error}`.includes('close it first')) {
            console.error('Camera clear error:', error);
          }
        })
      );
  }, []);

  const closeCamera = useCallback(() => {
    if (qrCodeRef.current) {
      const instance = qrCodeRef.current;
      qrCodeRef.current = null;
      stopScanner(instance).finally(() => {
        hasProcessedScan.current = false;
      });
    } else {
      hasProcessedScan.current = false;
    }
    setIsCameraOpen(false);
  }, [stopScanner]);

  useEffect(() => {
    if (!isCameraOpen) {
      return undefined;
    }

    const scanner = new Html5Qrcode('qr-reader', { verbose: false });
    qrCodeRef.current = scanner;

    const startScanner = async () => {
      setStatus({ tone: 'scanning', message: 'Initializing camera...' });
      try {
        hasProcessedScan.current = false;
        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1,
          },
          (decodedText) => {
            if (hasProcessedScan.current) {
              return;
            }

            hasProcessedScan.current = true;
            const cleanCode = (decodedText ?? '').trim().toUpperCase();
            setStatus({ tone: 'success', message: `✓ Scanned Successfully! Barcode: ${cleanCode}` });
            onBarcodeDetected(cleanCode);
            onAddItem(cleanCode);
            setTimeout(() => {
              closeCamera();
            }, 1200);
          }
        );
        setStatus({ tone: 'scanning', message: 'Position barcode within the camera frame...' });
      } catch (error) {
        console.error('Camera error:', error);
        setStatus({ tone: 'error', message: `Camera error: ${error?.message ?? error}` });
        setTimeout(() => closeCamera(), 2000);
      }
    };

    startScanner();

    return () => {
      if (qrCodeRef.current === scanner) {
        stopScanner(scanner).finally(() => {
          qrCodeRef.current = null;
          hasProcessedScan.current = false;
        });
      } else {
        hasProcessedScan.current = false;
      }
    };
  }, [closeCamera, isCameraOpen, onAddItem, onBarcodeDetected, stopScanner]);

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Barcode Scanning &amp; Item Tracking</h2>
        <p>Scan items to track inventory movements in real-time</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Barcode Scanner</h3>
        </div>
        <div className="scanner-input-group">
          <input
            type="text"
            className="scanner-input"
            placeholder="Scan or enter barcode (e.g., WMS12345)"
            value={barcode}
            onChange={(event) => onBarcodeChange(event.target.value.toUpperCase())}
          />
          <span className="scanner-icon">📷</span>
        </div>
        <div className="scan-actions">
          <button type="button" className="btn btn-primary" onClick={() => setIsCameraOpen(true)}>
            <span className="scan-btn-icon">📷</span>Scan Barcode
          </button>
          <button type="button" className="btn btn-primary" onClick={() => onAddItem(barcode)}>
            Add New Item
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => onViewDetails(barcode)}>
            View Item Details
          </button>
        </div>
        <p style={{ color: 'var(--text-light)', fontSize: '13px', marginTop: '10px' }}>
          💡 Tip: Click &quot;Scan Barcode&quot; to use your camera, or manually type the barcode above
        </p>
      </div>

      <div className={`scanner-camera-container ${isCameraOpen ? 'active' : ''}`}>
        <div className="scanner-camera-box">
          <div className="scanner-camera-header">
            <h3>📷 Scan Barcode</h3>
            <button type="button" className="scanner-close-btn" onClick={closeCamera}>
              &times;
            </button>
          </div>
          <div id="qr-reader" />
          <div className={`scanner-status ${status.tone}`}>
            {status.tone === 'scanning' && <span className="scanner-loader" />}
            <span>{status.message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;
