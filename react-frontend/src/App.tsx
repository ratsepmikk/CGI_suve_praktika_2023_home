import React from 'react';
import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { LibraryView } from './views/libraryView/libraryView';
import { BookView } from './views/bookView/bookView';
import { NavBar } from './components/navBar/navBar';
import { NoRouteFound } from './views/noRouteFound/noRouteFound';

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LibraryView />} />
        <Route path="/book/:id" element={<BookView />} />
        <Route path="*" element={<NoRouteFound />} />
      </Routes>
    </>
  );
}

export default App;
