import {React, useEffect} from 'react';
import QRCodeComponent from './QRCodeComponent';
import './App.css';
import { trackPage } from './ga';

function App() {

  useEffect(() => {
    trackPage(window.location.pathname + window.location.search);
  }, []);
  
  return (
    <div className="App">
      <QRCodeComponent />
     
    </div>
  );
}

export default App;
