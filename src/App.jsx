import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./component/backbone/Header";
import Footer from "./component/backbone/Footer";

import Beranda from "./component/page/beranda/Index";
import Detail from "./component/page/dataset/Detail";
import Dataset from "./component/page/dataset/Dataset";
import Sektoral from "./component/page/sektoral/Sektoral";
import Urusan from "./component/page/urusan/Urusan";
import Organisasi from "./component/page/organisasi/Organisasi";
import Publikasi from "./component/page/publikasi/Publikasi";
import Kontak from "./component/page/kontak/Kontak";
import Login from "./component/page/login/Login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/dataset" element={<Dataset />} />
        <Route path="/dataset/detail/:id" element={<Detail />} />
        <Route path="/sektoral" element={<Sektoral />} />
        <Route path="/urusan" element={<Urusan />} />
        <Route path="/organisasi" element={<Organisasi />} />
        <Route path="/publikasi" element={<Publikasi />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
