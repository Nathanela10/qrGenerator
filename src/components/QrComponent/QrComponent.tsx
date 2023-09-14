import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';
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

  function isValidURL(input: string) {
    const urlRegex = /^(https?|ftp|file):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(input);
  }

  const generateQRCode = () => {
    if (text.trim() === '') {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } else if (!isValidURL(text)) {
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
            {showAlert
              ? text.trim() === ''
                ? 'Ingresa una URL'
                : 'Escribe una URL válida para generar el código QR'
              : ''}
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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24'
                  viewBox='0 -960 960 960'
                  width='24'>
                  <path
                    d='M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200Z'
                    fill='currentColor'
                  />
                  <path
                    d='M240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z'
                    fill='currentColor'
                  />
                </svg>
              </button>
              <button
                className='qrComponent__buttons-button'
                onClick={resetApp}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24'
                  viewBox='0 -960 960 960'
                  width='24'>
                  <path
                    d='M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z'
                    fill='currentColor'
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QrComponent;
