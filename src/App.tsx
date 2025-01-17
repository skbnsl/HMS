import React from 'react';
import './App.css';
import '@mantine/core/styles.css';
import { Button, createTheme, MantineProvider } from '@mantine/core';
import AppRoutes from './Routes/AppRoutes.tsx';

const theme = createTheme({
  /** Put your mantine theme override here */
  focusRing:"never",
  fontFamily:"Poppins, sans-serif",
  colors:{
    primary: ['#f1fcfa', '#cff8ef', '#9ff0e1', '#67e1cf', '#32b9a9', '#1fad9f', '#168b82', '#166f69', '#165955', '#174a47', '#072c2b'],   
    neutral: ['#f6f6f6', '#e7e7e7', '#d1d1d1', '#b0b0b0', '#888888', '#6d6d6d', '#5d5d5d', '#4f4f4f', '#454545', '#3d3d3d', '#000000',]
  },
  primaryColor:"primary",
  primaryShade:4,
  defaultGradient:{from:"primary.4",to:"primary.8",deg:132}
});

function App() {
  return (
     <MantineProvider>
      <AppRoutes/>
    </MantineProvider> 
  );
}

export default App;