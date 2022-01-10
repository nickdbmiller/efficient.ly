import { Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Info from './components/Info';
import Tools from './components/Tools';
import Saved from './components/Saved';
import Error from './components/Error';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/:undefined" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;