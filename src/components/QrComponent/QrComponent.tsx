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
    <div className="container">
      <div className="card">
        <h1>Generador de Códigos QR</h1>
        <input
          type="text"
          placeholder="Ingrese el texto"
          value={text}
          onChange={handleTextChange}
        />

        <label htmlFor="errorCorrectionLevel">Nivel de corrección de errores:</label>
        <select
          id="errorCorrectionLevel"
          value={errorCorrectionLevel}
          onChange={handleCorrectionLevelChange}
        >
          <option value="L">Simple</option>
          <option value="M">Moderado</option>
          <option value="Q">Avanzado</option>
          <option value="H">Máximo</option>
        </select>

        <button onClick={generateQRCode}>Generar QR</button>
        {qrCodeText && <QRCode value={qrCodeText} level={errorCorrectionLevel} className="qr-code" />}
      </div>
    </div>
  );
}

export default QrComponent;
