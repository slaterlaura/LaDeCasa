import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Login from './components/Auth/Login';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import InsumosList from './components/Insumos/InsumosList';
import ProdutosList from './components/Produtos/ProdutosList';
import ProdutoInsumos from './components/Produtos/ProdutoInsumos';
import PedidosList from './components/Pedidos/PedidosList';
import PedidoItens from './components/Pedidos/PedidoItens';
import InsumosNecessarios from './components/Calculos/InsumosNecessarios';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                  <Sidebar />
                  <Box
                    component="main"
                    sx={{
                      flexGrow: 1,
                      p: 3,
                      marginLeft: '240px',
                      backgroundColor: '#F4EFEA',
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/insumos" element={<InsumosList />} />
                      <Route path="/produtos" element={<ProdutosList />} />
                      <Route path="/produtos/:id/insumos" element={<ProdutoInsumos />} />
                      <Route path="/pedidos" element={<PedidosList />} />
                      <Route path="/pedidos/:id/itens" element={<PedidoItens />} />
                      <Route path="/calculos" element={<InsumosNecessarios />} />
                    </Routes>
                  </Box>
                </Box>
              </Box>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
