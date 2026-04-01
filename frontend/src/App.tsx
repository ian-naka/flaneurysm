import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import CriarPostagem from './pages/postagem/CriarPostagem';
import Dashboard from './pages/dashboard/Dashboard';
import AdminHub from './pages/admin/AdminHub';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/criar-registro" element={
          <ProtectedRoute>
            <CriarPostagem />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminHub />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
