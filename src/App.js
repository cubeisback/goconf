import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from '@emotion/react';
import { Main } from "./pages/Main";
import { Events } from "./pages/Events";
import { theme } from "./theme";
import './global.module.css';
import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";


function App() {
  return (
    <ThemeProvider theme={theme}>
    {/* <Global styles={globalStyles} />  */}
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/events" element={<Events />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
