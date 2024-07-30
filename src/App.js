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
import BlogSingle from './components/BlogSingle';
import SinglePost from './components/BlogSingle';
import Celebrityvoices from './components/Celebrity';
import CelebrityVoicePage from './components/CelebrityVoicePage';
import BritishFemale from './components/BritishFemale';
import SingleTalents from './components/SingleTalents';




function App() {
  return (
    <div className="App">

      <SeoApi apiUrl="https://greatbritishvoices.co.uk/wp-json/rankmath/v1/getHead?url=https://greatbritishvoices.co.uk/" />
      <Head />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/voices" component={Voice} />   
        <Route exact path="/celebrity-voices" component={CelebrityVoicePage} />   
        <Route exact path="/voicesearch" component={VoiceSearch} />
        <Route exact path="/talent/:id" component={SingleTalents}/>
        <Route exact path="/shortlist" component={Shortlist} />
        <Route exact path="/blog" component={Blog} /> 
        <Route exact path="/contactus" component={Contact} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/tc" component={Terms} />      
        <Route exact path="/results" component={Result} />
        <Route exact path="/voice-search" component={VoiceCards} />
        <Route exact path="/blogs" component={BlogList} />
        <Route exact path="/post/:id" component={BlogSingle} />
        {/* <Route exact path="/singleblog" component={BlogSingle} /> */}
        <Route exact path="/british-female" component={BritishFemale} />
        <Route component={Error} />
      </Switch>

      <Footer />
    </div>

  );
}

export default App;
