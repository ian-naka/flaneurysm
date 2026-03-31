import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import CriarPostagem from './pages/postagem/CriarPostagem';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/criar-registro" element={<CriarPostagem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
