import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './QRCodeComponent.css';
//import { trackEvent } from './ga';

const QRCodeComponent = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [text, setText] = useState('');
  const [vCardData, setVCardData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    organization: '',
    title: '',
  });
  const [vCardQRCode, setVCardQRCode] = useState('');
  const [url, setUrl] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [whatsappQRCode, setWhatsappQRCode] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleVCardInputChange = (event) => {
    const { name, value } = event.target;
    setVCardData({ ...vCardData, [name]: value });
  };

  const handleWhatsappNumberChange = (event) => {
    setWhatsappNumber(event.target.value);
  };

  const handleWhatsappMessageChange = (event) => {
    setWhatsappMessage(event.target.value);
  };

  const generateVCardString = () => {
    const { firstName, lastName, phone, email, address, organization, title } = vCardData;
    return `BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
ORG:${organization}
TITLE:${title}
TEL;TYPE=WORK,VOICE:${phone}
ADR;TYPE=WORK:;;${address}
EMAIL:${email}
END:VCARD`;
  };

  const generateVCardQRCode = () => {
    setVCardQRCode(generateVCardString());
    //trackEvent('QR Generation', 'Generate vCard QR', 'vCard QR generated');
    setText(''); // Clear other QR codes
    setWhatsappQRCode('');
  };

  const generateWhatsAppQRCode = () => {
    setWhatsappQRCode(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`);
   // trackEvent('QR Generation', 'Generate WhatsApp QR', 'WhatsApp QR generated');
    setText(''); // Clear other QR codes
    setVCardQRCode('');
  };

  const logoSrc = `${process.env.PUBLIC_URL}/logo.png`; // Access the logo from the public folder

  return (
    <div className="qr-code-container">
      <h1 className="title">QR Code Generator</h1>
      <div className="content-wrapper">
        <div className="left-section">
          <div className="tabs">
            <button className={`tab ${activeTab === 'text' ? 'active' : ''}`} onClick={() => setActiveTab('text')}>Text</button>
            <button className={`tab ${activeTab === 'vcard' ? 'active' : ''}`} onClick={() => setActiveTab('vcard')}>vCard</button>
            <button className={`tab ${activeTab === 'url' ? 'active' : ''}`} onClick={() => setActiveTab('url')}>URL</button>
            <button className={`tab ${activeTab === 'whatsapp' ? 'active' : ''}`} onClick={() => setActiveTab('whatsapp')}>WhatsApp</button>
          </div>

          {activeTab === 'text' && (
            <div>
              <input 
                type="text" 
                value={text} 
                onChange={handleInputChange} 
                placeholder="Enter text or URL" 
                className="input-field"
              />
            </div>
          )}

          {activeTab === 'vcard' && (
            <div>
              <input
                type="text"
                name="firstName"
                value={vCardData.firstName}
                onChange={handleVCardInputChange}
                placeholder="First Name"
                className="input-field"
              />
              <input
                type="text"
                name="lastName"
                value={vCardData.lastName}
                onChange={handleVCardInputChange}
                placeholder="Last Name"
                className="input-field"
              />
              <input
                type="text"
                name="phone"
                value={vCardData.phone}
                onChange={handleVCardInputChange}
                placeholder="Phone"
                className="input-field"
              />
              <input
                type="email"
                name="email"
                value={vCardData.email}
                onChange={handleVCardInputChange}
                placeholder="Email"
                className="input-field"
              />
              <input
                type="text"
                name="address"
                value={vCardData.address}
                onChange={handleVCardInputChange}
                placeholder="Address"
                className="input-field"
              />
              <input
                type="text"
                name="organization"
                value={vCardData.organization}
                onChange={handleVCardInputChange}
                placeholder="Organization"
                className="input-field"
              />
              <input
                type="text"
                name="title"
                value={vCardData.title}
                onChange={handleVCardInputChange}
                placeholder="Title"
                className="input-field"
              />
              <button className="generate-btn" onClick={generateVCardQRCode}>Generate QR</button>
            </div>
          )}

          {activeTab === 'url' && (
            <div>
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder="Enter URL"
                className="input-field"
              />
              <button className="generate-btn" onClick={() => { setText(url); setVCardQRCode(''); setWhatsappQRCode(''); }}>Generate QR</button>
            </div>
          )}

          {activeTab === 'whatsapp' && (
            <div>
              <input
                type="text"
                value={whatsappNumber}
                onChange={handleWhatsappNumberChange}
                placeholder="Enter WhatsApp Number"
                className="input-field"
              />
              <input
                type="text"
                value={whatsappMessage}
                onChange={handleWhatsappMessageChange}
                placeholder="Enter Message"
                className="input-field"
              />
              <button className="generate-btn" onClick={generateWhatsAppQRCode}>Generate QR</button>
            </div>
          )}
        </div>

        <div className="right-section">
          <h2>Generated QR Code</h2>
          <br/>
          <div className="qr-code">
            {activeTab === 'text' && text && (
              <QRCode value={text}>
                <img src={logoSrc} alt="Logo" className="qr-code-logo" />
              </QRCode>
            )}
            {activeTab === 'vcard' && vCardQRCode && (
              <QRCode value={vCardQRCode}>
                <img src={logoSrc} alt="Logo" className="qr-code-logo" />
              </QRCode>
            )}
            {activeTab === 'url' && text && (
              <QRCode value={text}>
                <img src={logoSrc} alt="Logo" className="qr-code-logo" />
              </QRCode>
            )}
            {activeTab === 'whatsapp' && whatsappQRCode && (
              <QRCode value={whatsappQRCode}>
                <img src={logoSrc} alt="Logo" className="qr-code-logo" />
              </QRCode>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeComponent;
