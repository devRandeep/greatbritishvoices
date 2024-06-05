import React, { useEffect, useState } from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/main.css";
import "./js/main";
import "./sass/responsive.css";
import Head from "./components/Head";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import Error from "./components/Error";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import DocumentMeta from 'react-document-meta';
import SeoApi from './components/SeoApi';
import Voice from './components/Voice';
import VoiceSearch from './components/VoiceSearch';
import Shortlist from './components/Shortlist';
import Blog from './components/Blog';
import Result from './components/Result';
import VoiceCards from './components/VoiceCards';
import BlogList from './components/BlogList';




function App() {
  
  return (
    <div className="App">

      <SeoApi apiUrl="https://greatbritishtalent.com/wp-json/rankmath/v1/getHead?url=https://greatbritishtalent.com/" />

      <Head />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/voices" component={Voice} />   
        <Route exact path="/voicesearch" component={VoiceSearch} />
        <Route exact path="/shortlist" component={Shortlist} />
        <Route exact path="/blog" component={Blog} /> 
        <Route exact path="/contactus" component={Contact} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/tc" component={Terms} />      
        <Route exact path="/results" component={Result} />
        <Route exact path="/voicecards" component={VoiceCards} />
        <Route exact path="/bloglist" component={BlogList} />
        <Route component={Error} />
      </Switch>

      <Footer />
    </div>

  );
}

export default App;
