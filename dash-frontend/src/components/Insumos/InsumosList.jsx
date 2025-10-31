import React, { useState, useEffect } from 'react';
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
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getInsumos, createInsumo, updateInsumo, deleteInsumo } from '../../services/api';

const InsumosList = () => {
  const [insumos, setInsumos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentInsumo, setCurrentInsumo] = useState({
    nome: '',
    unidadeMedida: 'kg',
    estoqueAtual: 0,
    estoqueMinimo: 0,
    precoUnitario: 0,
    ativo: true,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadInsumos();
  }, []);

  const loadInsumos = async () => {
    try {
      const response = await getInsumos();
      setInsumos(response.data);
    } catch (err) {
      setError('Erro ao carregar insumos');
    }
  };

  const handleOpen = (insumo = null) => {
    if (insumo) {
      setCurrentInsumo(insumo);
      setEditMode(true);
    } else {
      setCurrentInsumo({
        nome: '',
        unidadeMedida: 'kg',
        estoqueAtual: 0,
        estoqueMinimo: 0,
        precoUnitario: 0,
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
        await updateInsumo(currentInsumo.id, currentInsumo);
      } else {
        await createInsumo(currentInsumo);
      }
      loadInsumos();
      handleClose();
    } catch (err) {
      setError('Erro ao salvar insumo');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente desativar este insumo?')) {
      try {
        await deleteInsumo(id);
        loadInsumos();
      } catch (err) {
        setError('Erro ao deletar insumo');
      }
    }
  };

  const handleChange = (e) => {
    setCurrentInsumo({ ...currentInsumo, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Insumos</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Novo Insumo
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Unidade</strong></TableCell>
              <TableCell align="right"><strong>Estoque Atual</strong></TableCell>
              <TableCell align="right"><strong>Estoque Mínimo</strong></TableCell>
              <TableCell align="right"><strong>Preço Unitário</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {insumos.map((insumo) => (
              <TableRow key={insumo.id}>
                <TableCell>{insumo.nome}</TableCell>
                <TableCell>{insumo.unidadeMedida}</TableCell>
                <TableCell align="right">{insumo.estoqueAtual}</TableCell>
                <TableCell align="right">{insumo.estoqueMinimo}</TableCell>
                <TableCell align="right">R$ {insumo.precoUnitario.toFixed(2)}</TableCell>
                <TableCell>
                  {insumo.ativo ? (
                    <Chip label="Ativo" color="success" size="small" />
                  ) : (
                    <Chip label="Inativo" color="default" size="small" />
                  )}
                  {insumo.estoqueAtual < insumo.estoqueMinimo && (
                    <Chip label="Estoque Baixo" color="warning" size="small" sx={{ ml: 1 }} />
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpen(insumo)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(insumo.id)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Editar Insumo' : 'Novo Insumo'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={currentInsumo.nome}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            select
            label="Unidade de Medida"
            name="unidadeMedida"
            value={currentInsumo.unidadeMedida}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="kg">Quilograma (kg)</MenuItem>
            <MenuItem value="g">Grama (g)</MenuItem>
            <MenuItem value="L">Litro (L)</MenuItem>
            <MenuItem value="ml">Mililitro (ml)</MenuItem>
            <MenuItem value="unidade">Unidade</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Estoque Atual"
            name="estoqueAtual"
            type="number"
            value={currentInsumo.estoqueAtual}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Estoque Mínimo"
            name="estoqueMinimo"
            type="number"
            value={currentInsumo.estoqueMinimo}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Preço Unitário"
            name="precoUnitario"
            type="number"
            value={currentInsumo.precoUnitario}
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

export default InsumosList;
