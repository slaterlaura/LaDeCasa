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
} from '@mui/material';
import { ArrowBack, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { 
  getProduto, 
  getProdutoInsumos, 
  addProdutoInsumo, 
  removeProdutoInsumo,
  getInsumosAtivos 
} from '../../services/api';

const ProdutoInsumos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [insumos, setInsumos] = useState([]);
  const [produtoInsumos, setProdutoInsumos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedInsumo, setSelectedInsumo] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [produtoRes, insumosRes, produtoInsumosRes] = await Promise.all([
        getProduto(id),
        getInsumosAtivos(),
        getProdutoInsumos(id),
      ]);
      setProduto(produtoRes.data);
      setInsumos(insumosRes.data);
      setProdutoInsumos(produtoInsumosRes.data);
    } catch (err) {
      setError('Erro ao carregar dados');
    }
  };

  const handleOpen = () => {
    setSelectedInsumo('');
    setQuantidade(0);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleSave = async () => {
    try {
      await addProdutoInsumo(id, {
        insumoId: selectedInsumo,
        quantidade: parseFloat(quantidade),
      });
      loadData();
      handleClose();
    } catch (err) {
      setError('Erro ao adicionar insumo');
    }
  };

  const handleDelete = async (produtoInsumoId) => {
    if (window.confirm('Deseja realmente remover este insumo?')) {
      try {
        await removeProdutoInsumo(id, produtoInsumoId);
        loadData();
      } catch (err) {
        setError('Erro ao remover insumo');
      }
    }
  };

  if (!produto) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/produtos')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Insumos - {produto.nome}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Adicionar Insumo
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Insumo</strong></TableCell>
              <TableCell><strong>Unidade</strong></TableCell>
              <TableCell align="right"><strong>Quantidade</strong></TableCell>
              <TableCell align="center"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtoInsumos.map((pi) => (
              <TableRow key={pi.id}>
                <TableCell>{pi.insumo.nome}</TableCell>
                <TableCell>{pi.insumo.unidadeMedida}</TableCell>
                <TableCell align="right">{pi.quantidade}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDelete(pi.id)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {produtoInsumos.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Nenhum insumo cadastrado para este produto
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Adicionar Insumo</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            select
            label="Insumo"
            value={selectedInsumo}
            onChange={(e) => setSelectedInsumo(e.target.value)}
            margin="normal"
            required
          >
            {insumos.map((insumo) => (
              <MenuItem key={insumo.id} value={insumo.id}>
                {insumo.nome} ({insumo.unidadeMedida})
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
            inputProps={{ step: '0.01' }}
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

export default ProdutoInsumos;
