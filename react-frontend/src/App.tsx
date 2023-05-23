import React from 'react';
import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { LibraryView } from './views/libraryView/libraryView';
import { CheckoutsView } from './views/checkoutsView/checkoutsView'
import { BookView } from './views/bookView/bookView';
import { CheckoutView } from './views/checkoutView/checkoutView';
import { AddNewBookView } from './views/addNewBookView/addNewBookView';
import { BorrowBookView } from './views/borrowBookView/borrowBookView';
import { NavBar } from './components/navBar/navBar';
import { NoRouteFound, NoBookFound } from './views/noRouteFound/noRouteFound';

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LibraryView />} />
        <Route path="/checkouts" element={<CheckoutsView />} />
        {/* Paths with params */}
        <Route path="/book/:id" element={<BookView />} />
        <Route path="/checkout/:id" element={<CheckoutView />} />
        {/* Modal Views */}
        <Route path="/book/add" element={<AddNewBookView />} />
        <Route path="/checkout/add/:id?" element={<BorrowBookView />} />
        {/* Error paths */}
        <Route path="/book" element={<NoBookFound />} />
        <Route path="*" element={<NoRouteFound />} />
      </Routes>
    </>
  );
}

export default App;
