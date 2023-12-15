import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  name: 'dark',
  colors: {
    background: '#070a12',
    scrollbar: '#383a41',
    scrollbarBg: '#2d2e34',
    modalBg: '#1f2229',
    modalInputBg: '#515359',
    primaryText: '#dfe2ec',
    altText: '#c8cbd4',
    primary: '#116c92',
    primaryDarker: '#0e5675',
    onPrimary: '#dfe2ec',
    accent: '#3dd6f5',
    button: '#43464A',
    buttonDarker: '#3c3e42',
    onButton: '#dfe2ec',
    danger: '#c62828',
    dangerDarker: '#b22424',
    onDanger: '#dfe2ec',
    cardBg: '#0e5675',
  },
  fonts: {
    headersFont: 'Poppins',
    textFont: 'Roboto',
    altFont: 'Work Sans',
    btnFont: 'Poppins',
  },
  fontSizes: {
    xsmall: '0.8rem',
    small: '1.0rem',
    medium: '1.5rem',
    large: '3.0rem',
    xlarge: '4.5rem',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 700,
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    laptop: '992px',
    largeDevice: '1200px',
  },
};

export const lightTheme: DefaultTheme = {
  name: 'light',
  colors: {
    background: '#edf0f8',
    scrollbar: '#9b9ca0',
    scrollbarBg: '#73757a',
    modalBg: '#e8e8e9',
    modalInputBg: '#ffffff',
    primaryText: '#131620',
    altText: '#2a2d36',
    primary: '#c9d4f3',
    primaryDarker: '#bccaf0',
    onPrimary: '#131620',
    accent: '#0AA3C2',
    button: '#d9dada',
    buttonDarker: '#c6c7c8',
    onButton: '#131620',
    danger: '#c62828',
    dangerDarker: '#b22424',
    onDanger: '#dfe2ec',
    cardBg: '#bccaf0',
  },
  fonts: {
    headersFont: 'Poppins',
    textFont: 'Roboto',
    altFont: 'Work Sans',
    btnFont: 'Poppins',
  },
  fontSizes: {
    xsmall: '0.8rem',
    small: '1.0rem',
    medium: '1.5rem',
    large: '3.0rem',
    xlarge: '4.5rem',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 700,
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    laptop: '992px',
    largeDevice: '1200px',
  },
};
