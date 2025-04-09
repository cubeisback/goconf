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
import { Organizer } from "./pages/Organizer";
import axios from "axios";
import useFiltersStore from "./store/useFiltersStore";
import useHomeStore from "./store/useHomeStore";
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


    useEffect(() => {
  
      axios
        .get("https://dev.goconf.ru/backend/wp-json/wp/v2/get_all_options/")
        .then((response) => {
          console.log('get_all_options ', response.data)
        })
        .catch((error) => {
          console.log(error)
        });
  
      // axios
      //   .get("https://dev.goconf.ru/backend/wp-json/wp/v2/get_primary_menu/?current_url=/events")
      //   .then((response) => {
      //     console.log('menu ', response.data)
      //   })
      //   .catch((error) => {
      //     setError(error.message);
      //     setLoading(false);
      //   }); 
  
    }, []);

    const fetchFiltersData = useFiltersStore((state) => state.fetchFiltersData)
    const fetchHomeData = useHomeStore((state) => state.fetchHomeData)
    useEffect(()=>{
        fetchFiltersData()
        fetchHomeData()
    }, [fetchFiltersData])

  return (
    <ThemeProvider theme={theme}>
    <Global styles={globalStyles} /> 
    <BrowserRouter>
      <Header isLogin={isLogin} windowWidth={windowWidth} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:filterParams*" element={<Events />} />
        <Route path="/event/:name" element={<Event />} />
        <Route path="/org" element={<Org />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/organizer*" element={<Organizer />} />
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
