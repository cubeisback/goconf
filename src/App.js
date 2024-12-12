import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Global, ThemeProvider } from '@emotion/react';
import { Main } from "./pages/Main";
import { Events } from "./pages/Events";
import { theme } from "./theme";
import { globalStyles } from "./global";


function App() {
  return (
    <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
