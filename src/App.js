import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Global, ThemeProvider } from '@emotion/react';
import { theme } from "./theme";
import { globalStyles } from "./global";
import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";
import { Main } from "./pages/Main";
import { Events } from "./pages/Events";
import { Org } from "./pages/Org";
import { About } from "./pages/About";
import { Event } from "./pages/Event";


function App() {

  return (
    <ThemeProvider theme={theme}>
    <Global styles={globalStyles} /> 
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:name" element={<Event />} />
        <Route path="/org" element={<Org />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
