import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import './QrComponent.css';

function QrComponent() {
  const [text, setText] = useState('');
  const [qrCodeText, setQRCodeText] = useState('');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('L');
  const [showAlert, setShowAlert] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleCorrectionLevelChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setErrorCorrectionLevel(e.target.value);
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
    }
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
            onChange={handleCorrectionLevelChange}>
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
              value={qrCodeText}
              level={errorCorrectionLevel}
            />
            <div className='qrComponent__buttons'>
              <button className='qrComponent__buttons-button'>Descargar</button>
              <button className='qrComponent__buttons-button'>Reiniciar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QrComponent;
