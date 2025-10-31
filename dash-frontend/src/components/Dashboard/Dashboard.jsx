import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Alert,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp as TrendingUpIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as MoneyIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import {
  getDashboardResumo,
  getVendasEvolucao,
  getProdutosMaisVendidos,
  getReceitaPorTipo,
} from '../../services/api';

const COLORS = ['#7C324C', '#ACC1CC', '#F4EFEA', '#9d4d6a', '#8aa3b0'];

const Dashboard = () => {
  const [resumo, setResumo] = useState(null);
  const [evolucao, setEvolucao] = useState([]);
  const [maisVendidos, setMaisVendidos] = useState([]);
  const [receitaPorTipo, setReceitaPorTipo] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [resumoRes, evolucaoRes, vendidosRes, receitaRes] = await Promise.all([
        getDashboardResumo(),
        getVendasEvolucao(),
        getProdutosMaisVendidos(),
        getReceitaPorTipo(),
      ]);

      setResumo(resumoRes.data);
      setEvolucao(evolucaoRes.data);
      setMaisVendidos(vendidosRes.data);

      // Converter receita por tipo para formato de gráfico
      const receitaData = Object.entries(receitaRes.data).map(([tipo, valor]) => ({
        name: tipo,
        value: valor,
      }));
      setReceitaPorTipo(receitaData);
    } catch (err) {
      setError('Erro ao carregar dados do dashboard');
    }
  };

  if (!resumo) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Cards de Resumo */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#7C324C', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MoneyIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Vendas do Mês</Typography>
              </Box>
              <Typography variant="h4">
                R$ {resumo.totalVendasMes.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                {resumo.totalPedidosMes} pedidos
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#ACC1CC' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUpIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Vendas do Ano</Typography>
              </Box>
              <Typography variant="h4">
                R$ {resumo.totalVendasAno.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {resumo.totalPedidosAno} pedidos
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ShoppingCartIcon sx={{ mr: 1, color: '#7C324C' }} />
                <Typography variant="h6">Pedidos Ativos</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {resumo.pedidosAtivos}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Em produção
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <InventoryIcon sx={{ mr: 1, color: '#7C324C' }} />
                <Typography variant="h6">Ticket Médio</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                R$ {resumo.totalPedidosMes > 0 
                  ? (resumo.totalVendasMes / resumo.totalPedidosMes).toFixed(2) 
                  : '0.00'}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Por pedido
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráficos */}
      <Grid container spacing={3}>
        {/* Evolução de Vendas */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Evolução de Vendas (2025)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={evolucao}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="#7C324C" 
                  strokeWidth={2}
                  name="Valor (R$)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Receita por Tipo */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Receita por Tipo
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={receitaPorTipo}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {receitaPorTipo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Produtos Mais Vendidos */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Produtos Mais Vendidos
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={maisVendidos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nomeProduto" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantidade" fill="#7C324C" name="Quantidade" />
                <Bar dataKey="valor" fill="#ACC1CC" name="Valor (R$)" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
