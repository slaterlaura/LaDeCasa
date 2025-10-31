import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Alert,
  Chip,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { getInsumosNecessarios, getSugestaoCompras } from '../../services/api';

const InsumosNecessarios = () => {
  const [insumos, setInsumos] = useState([]);
  const [sugestaoCompras, setSugestaoCompras] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [insumosRes, comprasRes] = await Promise.all([
        getInsumosNecessarios(),
        getSugestaoCompras(),
      ]);
      setInsumos(insumosRes.data);
      setSugestaoCompras(comprasRes.data);
    } catch (err) {
      setError('Erro ao carregar cálculos');
    }
    setLoading(false);
  };

  const totalNecessario = insumos.reduce((sum, i) => sum + (i.quantidadeNecessaria || 0), 0);
  const totalFaltando = sugestaoCompras.reduce((sum, i) => sum + Math.abs(i.diferenca || 0), 0);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Cálculo de Insumos Necessários</Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={loadData}
          disabled={loading}
        >
          Atualizar
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Alert severity="info" sx={{ mb: 3 }}>
        Este cálculo considera todos os pedidos com status <strong>ATIVO</strong> e calcula 
        automaticamente a quantidade de cada insumo necessária com base nas receitas dos produtos.
      </Alert>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total de Insumos Diferentes
              </Typography>
              <Typography variant="h4" color="primary">
                {insumos.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Insumos que Precisam Comprar
              </Typography>
              <Typography variant="h4" color="error">
                {sugestaoCompras.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Todos os Insumos Necessários
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Insumo</strong></TableCell>
              <TableCell><strong>Unidade</strong></TableCell>
              <TableCell align="right"><strong>Necessário</strong></TableCell>
              <TableCell align="right"><strong>Estoque Atual</strong></TableCell>
              <TableCell align="right"><strong>Diferença</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {insumos.map((insumo) => (
              <TableRow key={insumo.insumoId}>
                <TableCell>{insumo.nomeInsumo}</TableCell>
                <TableCell>{insumo.unidadeMedida}</TableCell>
                <TableCell align="right">{insumo.quantidadeNecessaria.toFixed(2)}</TableCell>
                <TableCell align="right">{insumo.estoqueAtual.toFixed(2)}</TableCell>
                <TableCell align="right">
                  {insumo.diferenca >= 0 ? (
                    <span style={{ color: 'green' }}>+{insumo.diferenca.toFixed(2)}</span>
                  ) : (
                    <span style={{ color: 'red' }}>{insumo.diferenca.toFixed(2)}</span>
                  )}
                </TableCell>
                <TableCell>
                  {insumo.precisaComprar ? (
                    <Chip label="Precisa Comprar" color="error" size="small" />
                  ) : (
                    <Chip label="Estoque OK" color="success" size="small" />
                  )}
                </TableCell>
              </TableRow>
            ))}
            {insumos.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Nenhum pedido ativo encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {sugestaoCompras.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Sugestão de Compras
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Insumo</strong></TableCell>
                  <TableCell><strong>Unidade</strong></TableCell>
                  <TableCell align="right"><strong>Quantidade a Comprar</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sugestaoCompras.map((insumo) => (
                  <TableRow key={insumo.insumoId}>
                    <TableCell>{insumo.nomeInsumo}</TableCell>
                    <TableCell>{insumo.unidadeMedida}</TableCell>
                    <TableCell align="right">
                      <strong>{Math.abs(insumo.diferenca).toFixed(2)}</strong>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default InsumosNecessarios;
