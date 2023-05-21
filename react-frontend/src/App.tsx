import React from 'react';
import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { LibraryView } from './views/libraryView/libraryView';
import { BookView } from './views/bookView/bookView';
import { CheckoutView } from './views/checkoutView/checkoutView';
import { NavBar } from './components/navBar/navBar';
import { NoRouteFound, NoBookFound } from './views/noRouteFound/noRouteFound';

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LibraryView />} />
        <Route path="/book/:id" element={<BookView />} />
        <Route path="/book/:id/checkout" element={<CheckoutView />} />
        {/* Error paths */}
        <Route path="/book" element={<NoBookFound />} />
        <Route path="*" element={<NoRouteFound />} />
      </Routes>
    </>
  );
}

export default App;
