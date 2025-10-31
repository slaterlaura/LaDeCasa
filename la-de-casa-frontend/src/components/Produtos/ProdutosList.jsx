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
  List as ListIcon 
} from '@mui/icons-material';
import { getProdutos, createProduto, updateProduto, deleteProduto } from '../../services/api';

const ProdutosList = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduto, setCurrentProduto] = useState({
    nome: '',
    descricao: '',
    tipo: 'BROWNIE',
    rendimento: 1,
    precoVenda: 0,
    ativo: true,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    try {
      const response = await getProdutos();
      setProdutos(response.data);
    } catch (err) {
      setError('Erro ao carregar produtos');
    }
  };

  const handleOpen = (produto = null) => {
    if (produto) {
      setCurrentProduto(produto);
      setEditMode(true);
    } else {
      setCurrentProduto({
        nome: '',
        descricao: '',
        tipo: 'BROWNIE',
        rendimento: 1,
        precoVenda: 0,
        ativo: true,
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
        await updateProduto(currentProduto.id, currentProduto);
      } else {
        await createProduto(currentProduto);
      }
      loadProdutos();
      handleClose();
    } catch (err) {
      setError('Erro ao salvar produto');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente desativar este produto?')) {
      try {
        await deleteProduto(id);
        loadProdutos();
      } catch (err) {
        setError('Erro ao deletar produto');
      }
    }
  };

  const handleChange = (e) => {
    setCurrentProduto({ ...currentProduto, [e.target.name]: e.target.value });
  };

  const getTipoLabel = (tipo) => {
    const tipos = {
      BROWNIE: 'Brownie',
      GELEIA: 'Geleia',
      GRANOLA: 'Granola',
      COMPOTA: 'Compota',
      OUTRO: 'Outro',
    };
    return tipos[tipo] || tipo;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Produtos (Receitas)</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Novo Produto
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Tipo</strong></TableCell>
              <TableCell><strong>Descrição</strong></TableCell>
              <TableCell align="right"><strong>Rendimento</strong></TableCell>
              <TableCell align="right"><strong>Preço Venda</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{getTipoLabel(produto.tipo)}</TableCell>
                <TableCell>{produto.descricao}</TableCell>
                <TableCell align="right">{produto.rendimento}</TableCell>
                <TableCell align="right">R$ {produto.precoVenda.toFixed(2)}</TableCell>
                <TableCell>
                  {produto.ativo ? (
                    <Chip label="Ativo" color="success" size="small" />
                  ) : (
                    <Chip label="Inativo" color="default" size="small" />
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    onClick={() => navigate(`/produtos/${produto.id}/insumos`)} 
                    size="small"
                    title="Gerenciar Insumos"
                  >
                    <ListIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpen(produto)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(produto.id)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={currentProduto.nome}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            select
            label="Tipo"
            name="tipo"
            value={currentProduto.tipo}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="BROWNIE">Brownie</MenuItem>
            <MenuItem value="GELEIA">Geleia</MenuItem>
            <MenuItem value="GRANOLA">Granola</MenuItem>
            <MenuItem value="COMPOTA">Compota</MenuItem>
            <MenuItem value="OUTRO">Outro</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Descrição"
            name="descricao"
            value={currentProduto.descricao}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Rendimento (unidades)"
            name="rendimento"
            type="number"
            value={currentProduto.rendimento}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Preço de Venda"
            name="precoVenda"
            type="number"
            value={currentProduto.precoVenda}
            onChange={handleChange}
            margin="normal"
            inputProps={{ step: '0.01' }}
          />
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

export default ProdutosList;
