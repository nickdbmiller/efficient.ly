import { Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Info from './components/Info';
import InfoDetail from './components/InfoDetail';
import ToolList from './components/ToolList';
import Tool from './components/Tool';
import Saved from './components/Saved';
import Error from './components/Error';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="flex flex-col text-lime-1000 px-8 py-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/info/:id" element={<InfoDetail />} />
        <Route path="/tools" element={<ToolList />} />
        <Route path="/tools/:config" element={<Tool />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/:undefined" element={<Error />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
