import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Chip,
  MenuItem,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  ShoppingCart as CartIcon 
} from '@mui/icons-material';
import { getPedidos, createPedido, updatePedido, deletePedido } from '../../services/api';

const PedidosList = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPedido, setCurrentPedido] = useState({
    numeroPedido: '',
    cliente: '',
    dataPedido: new Date().toISOString().split('T')[0],
    dataEntrega: '',
    status: 'ATIVO',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadPedidos();
  }, []);

  const loadPedidos = async () => {
    try {
      const response = await getPedidos();
      setPedidos(response.data);
    } catch (err) {
      setError('Erro ao carregar pedidos');
    }
  };

  const handleOpen = (pedido = null) => {
    if (pedido) {
      setCurrentPedido({
        ...pedido,
        dataPedido: pedido.dataPedido,
        dataEntrega: pedido.dataEntrega || '',
      });
      setEditMode(true);
    } else {
      setCurrentPedido({
        numeroPedido: `PED-${Date.now()}`,
        cliente: '',
        dataPedido: new Date().toISOString().split('T')[0],
        dataEntrega: '',
        status: 'ATIVO',
      });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await updatePedido(currentPedido.id, currentPedido);
      } else {
        await createPedido(currentPedido);
      }
      loadPedidos();
      handleClose();
    } catch (err) {
      setError('Erro ao salvar pedido');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este pedido?')) {
      try {
        await deletePedido(id);
        loadPedidos();
      } catch (err) {
        setError('Erro ao deletar pedido');
      }
    }
  };

  const handleChange = (e) => {
    setCurrentPedido({ ...currentPedido, [e.target.name]: e.target.value });
  };

  const getStatusColor = (status) => {
    const colors = {
      ATIVO: 'primary',
      CONCLUIDO: 'success',
      CANCELADO: 'error',
    };
    return colors[status] || 'default';
  };

  const getStatusLabel = (status) => {
    const labels = {
      ATIVO: 'Ativo',
      CONCLUIDO: 'Concluído',
      CANCELADO: 'Cancelado',
    };
    return labels[status] || status;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Pedidos</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Novo Pedido
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Número</strong></TableCell>
              <TableCell><strong>Cliente</strong></TableCell>
              <TableCell><strong>Data Pedido</strong></TableCell>
              <TableCell><strong>Data Entrega</strong></TableCell>
              <TableCell align="right"><strong>Valor Total</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((pedido) => (
              <TableRow key={pedido.id}>
                <TableCell>{pedido.numeroPedido}</TableCell>
                <TableCell>{pedido.cliente}</TableCell>
                <TableCell>{new Date(pedido.dataPedido).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>
                  {pedido.dataEntrega ? new Date(pedido.dataEntrega).toLocaleDateString('pt-BR') : '-'}
                </TableCell>
                <TableCell align="right">R$ {pedido.valorTotal.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip 
                    label={getStatusLabel(pedido.status)} 
                    color={getStatusColor(pedido.status)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    onClick={() => navigate(`/pedidos/${pedido.id}/itens`)} 
                    size="small"
                    title="Gerenciar Itens"
                  >
                    <CartIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpen(pedido)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(pedido.id)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Editar Pedido' : 'Novo Pedido'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Número do Pedido"
            name="numeroPedido"
            value={currentPedido.numeroPedido}
            onChange={handleChange}
            margin="normal"
            required
            disabled={editMode}
          />
          <TextField
            fullWidth
            label="Cliente"
            name="cliente"
            value={currentPedido.cliente}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Data do Pedido"
            name="dataPedido"
            type="date"
            value={currentPedido.dataPedido}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Data de Entrega"
            name="dataEntrega"
            type="date"
            value={currentPedido.dataEntrega}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          {editMode && (
            <TextField
              fullWidth
              select
              label="Status"
              name="status"
              value={currentPedido.status}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="ATIVO">Ativo</MenuItem>
              <MenuItem value="CONCLUIDO">Concluído</MenuItem>
              <MenuItem value="CANCELADO">Cancelado</MenuItem>
            </TextField>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PedidosList;
