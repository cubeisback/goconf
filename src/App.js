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
import { DB } from "./db";
import { Organizer } from "./pages/Organizer";
import axios from "axios";
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

    //fetch
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
      axios
        .get("https://dev.goconf.ru/backend/wp-json/pages/v2/home/")
        .then((response) => {
          // setData(response.data);
          // setLoading(false);
          // setHomeData(response.data)
          // console.log('home ', response.data)
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
  
      // axios
      //   .get("https://dev.goconf.ru/backend/wp-json/wp/v2/get_all_options/")
      //   .then((response) => {
      //     console.log('get_all_options ', response.data)
      //   })
      //   .catch((error) => {
      //     setError(error.message);
      //     setLoading(false);
      //   });
  
      // axios
      //   .get("https://dev.goconf.ru/backend/wp-json/wp/v2/get_primary_menu/?current_url=/events")
      //   .then((response) => {
      //     console.log('menu ', response.data)
      //   })
      //   .catch((error) => {
      //     setError(error.message);
      //     setLoading(false);
      //   });
  
        axios
        .get("https://dev.goconf.ru/backend/wp-json/events/v2/single/?slug=kakoj-to-material")
        .then((response) => {
          console.log('single ', response.data)
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
  
        
  
    }, []);

  return (
    <ThemeProvider theme={theme}>
    <Global styles={globalStyles} /> 
    <BrowserRouter>
      <DB/> 
      {/* TODO remove db */}
      <Header isLogin={isLogin} windowWidth={windowWidth} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:filterParams*" element={<Events />} />
        <Route path="/event/:name" element={<Event />} />
        <Route path="/org" element={<Org />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/organizer" element={<Organizer />} />
        <Route path="/lk" element={<User windowWidth={windowWidth} page={1} setIsLogin={setIsLogin} />} />
        <Route path="/lk/events" element={<User windowWidth={windowWidth} page={2} setIsLogin={setIsLogin} />} />
        <Route path="/lk/org" element={<User windowWidth={windowWidth} page={3} setIsLogin={setIsLogin} />} />
        <Route path="/lk/add" element={<User windowWidth={windowWidth} page={4} setIsLogin={setIsLogin} />} />
        <Route path="/lk/notifications" element={<User windowWidth={windowWidth} page={5} setIsLogin={setIsLogin} />} />
        <Route path="/lk/orders" element={<User windowWidth={windowWidth} page={6} setIsLogin={setIsLogin} />} />
        <Route path="/lk/status" element={<User windowWidth={windowWidth} page={7} setIsLogin={setIsLogin} />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
