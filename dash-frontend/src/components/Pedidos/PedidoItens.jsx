import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Alert,
  MenuItem,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { ArrowBack, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { 
  getPedido, 
  addPedidoItem, 
  removePedidoItem,
  getProdutosAtivos 
} from '../../services/api';

const PedidoItens = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [pedidoRes, produtosRes] = await Promise.all([
        getPedido(id),
        getProdutosAtivos(),
      ]);
      setPedido(pedidoRes.data);
      setProdutos(produtosRes.data);
    } catch (err) {
      setError('Erro ao carregar dados');
    }
  };

  const handleOpen = () => {
    setSelectedProduto('');
    setQuantidade(1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleSave = async () => {
    try {
      await addPedidoItem(id, {
        produtoId: selectedProduto,
        quantidade: parseInt(quantidade),
      });
      loadData();
      handleClose();
    } catch (err) {
      setError('Erro ao adicionar item');
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Deseja realmente remover este item?')) {
      try {
        await removePedidoItem(id, itemId);
        loadData();
      } catch (err) {
        setError('Erro ao remover item');
      }
    }
  };

  if (!pedido) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/pedidos')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Pedido {pedido.numeroPedido} - {pedido.cliente}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          disabled={pedido.status !== 'ATIVO'}
        >
          Adicionar Item
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Data do Pedido
              </Typography>
              <Typography variant="h6">
                {new Date(pedido.dataPedido).toLocaleDateString('pt-BR')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Data de Entrega
              </Typography>
              <Typography variant="h6">
                {pedido.dataEntrega ? new Date(pedido.dataEntrega).toLocaleDateString('pt-BR') : 'Não definida'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Valor Total
              </Typography>
              <Typography variant="h6" color="primary">
                R$ {pedido.valorTotal.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Produto</strong></TableCell>
              <TableCell align="right"><strong>Quantidade</strong></TableCell>
              <TableCell align="right"><strong>Preço Unitário</strong></TableCell>
              <TableCell align="right"><strong>Subtotal</strong></TableCell>
              <TableCell align="center"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedido.itens && pedido.itens.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.produto.nome}</TableCell>
                <TableCell align="right">{item.quantidade}</TableCell>
                <TableCell align="right">R$ {item.precoUnitario.toFixed(2)}</TableCell>
                <TableCell align="right">R$ {item.subtotal.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton 
                    onClick={() => handleDelete(item.id)} 
                    size="small"
                    disabled={pedido.status !== 'ATIVO'}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {(!pedido.itens || pedido.itens.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Nenhum item adicionado ao pedido
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Adicionar Item ao Pedido</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            select
            label="Produto"
            value={selectedProduto}
            onChange={(e) => setSelectedProduto(e.target.value)}
            margin="normal"
            required
          >
            {produtos.map((produto) => (
              <MenuItem key={produto.id} value={produto.id}>
                {produto.nome} - R$ {produto.precoVenda.toFixed(2)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Quantidade"
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            margin="normal"
            required
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PedidoItens;
