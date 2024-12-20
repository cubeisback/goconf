import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from '@emotion/react';
import { Main } from "./pages/Main";
import { Events } from "./pages/Events";
import { theme } from "./theme";
import './global.module.css';
import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";
import { Org } from "./pages/Org";
import { About } from "./pages/About";


function App() {
  return (
    <ThemeProvider theme={theme}>
    {/* <Global styles={globalStyles} />  */}
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/events" element={<Events />} />
        <Route path="/org" element={<Org />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
