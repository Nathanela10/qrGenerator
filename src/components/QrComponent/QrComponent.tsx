import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './QrComponent.css';

function QrComponent() {
  const [text, setText] = useState('');
  const [qrCodeText, setQRCodeText] = useState('');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('L');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleCorrectionLevelChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setErrorCorrectionLevel(e.target.value);
  };

  const generateQRCode = () => {
    setQRCodeText(text);
  };

  return (
    <div className='qrComponent'>
      <div className='qrComponent__card'>
        <h1 className='qrComponent__card-h1'>Generador de Códigos QR</h1>
        <input
          className='qrComponent__card-input'
          type='text'
          placeholder='Ingresa la Url'
          value={text}
          onChange={handleTextChange}
        />
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
        <button className='qrComponent__card-button' onClick={generateQRCode}>
          Generar QR
        </button>
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
