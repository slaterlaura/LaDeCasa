import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const getMe = () => api.get('/auth/me');

// Insumos
export const getInsumos = () => api.get('/insumos');
export const getInsumosAtivos = () => api.get('/insumos/ativos');
export const getInsumo = (id) => api.get(`/insumos/${id}`);
export const createInsumo = (data) => api.post('/insumos', data);
export const updateInsumo = (id, data) => api.put(`/insumos/${id}`, data);
export const deleteInsumo = (id) => api.delete(`/insumos/${id}`);

// Produtos
export const getProdutos = () => api.get('/produtos');
export const getProdutosAtivos = () => api.get('/produtos/ativos');
export const getProduto = (id) => api.get(`/produtos/${id}`);
export const createProduto = (data) => api.post('/produtos', data);
export const updateProduto = (id, data) => api.put(`/produtos/${id}`, data);
export const deleteProduto = (id) => api.delete(`/produtos/${id}`);
export const getProdutoInsumos = (id) => api.get(`/produtos/${id}/insumos`);
export const addProdutoInsumo = (id, data) => api.post(`/produtos/${id}/insumos`, data);
export const removeProdutoInsumo = (produtoId, insumoId) => api.delete(`/produtos/${produtoId}/insumos/${insumoId}`);

// Pedidos
export const getPedidos = () => api.get('/pedidos');
export const getPedidosAtivos = () => api.get('/pedidos/ativos');
export const getPedido = (id) => api.get(`/pedidos/${id}`);
export const createPedido = (data) => api.post('/pedidos', data);
export const updatePedido = (id, data) => api.put(`/pedidos/${id}`, data);
export const deletePedido = (id) => api.delete(`/pedidos/${id}`);
export const addPedidoItem = (id, data) => api.post(`/pedidos/${id}/itens`, data);
export const removePedidoItem = (pedidoId, itemId) => api.delete(`/pedidos/${pedidoId}/itens/${itemId}`);

// Cálculos
export const getInsumosNecessarios = () => api.get('/calculos/insumos-necessarios');
export const getSugestaoCompras = () => api.get('/calculos/sugestao-compras');

// Dashboard
export const getDashboardResumo = () => api.get('/dashboard/resumo');
export const getVendasEvolucao = () => api.get('/dashboard/vendas-evolucao');
export const getProdutosMaisVendidos = () => api.get('/dashboard/produtos-mais-vendidos');
export const getReceitaPorTipo = () => api.get('/dashboard/receita-por-tipo');

export default api;
