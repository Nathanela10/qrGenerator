import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver'; // Importar saveAs de file-saver
import './QrComponent.css';

function QrComponent() {
  const [text, setText] = useState('');
  const [qrCodeText, setQRCodeText] = useState('');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('L');
  const [showAlert, setShowAlert] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleCorrectionLevelChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (!qrGenerated) {
      setErrorCorrectionLevel(e.target.value);
    }
  };

  const generateQRCode = () => {
    if (text.trim() === '') {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } else {
      setQRCodeText(text);
      setShowAlert(false);
      setQrGenerated(true);
      setInputDisabled(true);
    }
  };

  const resetApp = () => {
    setText('');
    setQRCodeText('');
    setErrorCorrectionLevel('L');
    setShowAlert(false);
    setQrGenerated(false);
    setInputDisabled(false);
  };

  useEffect(() => {
    let timeout: number | undefined;
    if (showAlert) {
      timeout = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [showAlert]);

  const handleDownloadQR = () => {
    const canvas = document.querySelector(
      '.qrComponent__card-qrCode'
    ) as HTMLCanvasElement;
    console.log('el canva es: ', canvas);

    if (canvas) {
      canvas.toBlob(blob => {
        if (blob) {
          saveAs(blob, 'qr_code.png');
        }
      });
    } else {
      console.error('No se encontró el canvas');
    }
  };

  return (
    <div className='qrComponent'>
      <div className='qrComponent__card'>
        <h1 className='qrComponent__card-h1'>Generador de Códigos QR</h1>
        <input
          className='qrComponent__card-input'
          type='text'
          placeholder='Ingresa la URL'
          value={text}
          onChange={handleTextChange}
          disabled={inputDisabled}
        />
        <div className='qrComponent__containerSelect'>
          <label
            htmlFor='errorCorrectionLevel'
            className='qrComponent__card-label'>
            Nivel de corrección de errores:
          </label>
          <select
            className='qrComponent__card-select'
            id='errorCorrectionLevel'
            value={errorCorrectionLevel}
            onChange={handleCorrectionLevelChange}
            disabled={qrGenerated}
            style={{ pointerEvents: qrGenerated ? 'none' : 'auto' }}>
            <option value='L'>Simple</option>
            <option value='M'>Moderado</option>
            <option value='Q'>Avanzado</option>
            <option value='H'>Máximo</option>
          </select>
        </div>
        <button className='qrComponent__card-button' onClick={generateQRCode}>
          Generar QR
        </button>
        <div className={`alert__container ${showAlert ? 'show' : ''}`}>
          <div className={`alert ${showAlert ? 'show' : ''}`}>
            Por favor, ingrese una URL antes de generar el QR.{' '}
          </div>
        </div>
        {qrCodeText && (
          <div className='qrComponent__qr'>
            <QRCode
              className='qrComponent__card-qrCode'
              id='my-canvas'
              value={qrCodeText}
              level={errorCorrectionLevel}
            />
            <div className='qrComponent__buttons'>
              <button
                className='qrComponent__buttons-button'
                onClick={handleDownloadQR}>
                Descargar
              </button>
              <button
                className='qrComponent__buttons-button'
                onClick={resetApp}>
                Reiniciar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QrComponent;
