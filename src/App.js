import React, { useEffect, useState } from "react";
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
import { User } from "./pages/User";
import { Faq } from "./pages/Faq";
import { NotFoundPage } from "./pages/NotFoundPage";

// TODO отложенная загрузка компонентов


function App() {
  const [isLogin, setIsLogin] = useState(false);

  //reset style
    useEffect(() => {
      document.body.id = 'reset';
      document.body.parentElement.id = 'html_reset';
    }, [])
  
    //ширина экрана
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <ThemeProvider theme={theme}>
    <Global styles={globalStyles} /> 
    <BrowserRouter>
      <Header isLogin={isLogin} windowWidth={windowWidth} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:name" element={<Event />} />
        <Route path="/org" element={<Org />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/lk" element={<User windowWidth={windowWidth} page={1} setIsLogin={setIsLogin} />} />
        <Route path="/lk/events" element={<User windowWidth={windowWidth} page={2} setIsLogin={setIsLogin} />} />
        <Route path="/lk/org" element={<User windowWidth={windowWidth} page={3} setIsLogin={setIsLogin} />} />
        <Route path="/lk/add" element={<User windowWidth={windowWidth} page={4} setIsLogin={setIsLogin} />} />
        <Route path="/lk/notifications" element={<User windowWidth={windowWidth} page={5} setIsLogin={setIsLogin} />} />
        <Route path="/lk/orders" element={<User windowWidth={windowWidth} page={6} setIsLogin={setIsLogin} />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
