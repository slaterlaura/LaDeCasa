package com.ladecasa.service;

import com.ladecasa.model.Insumo;
import com.ladecasa.repository.InsumoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InsumoService {

    @Autowired
    private InsumoRepository insumoRepository;

    public List<Insumo> listarTodos() {
        return insumoRepository.findAll();
    }

    public List<Insumo> listarAtivos() {
        return insumoRepository.findByAtivoTrue();
    }

    public Insumo buscarPorId(Long id) {
        return insumoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Insumo não encontrado"));
    }

    public Insumo criar(Insumo insumo) {
        return insumoRepository.save(insumo);
    }

    public Insumo atualizar(Long id, Insumo insumoAtualizado) {
        Insumo insumo = buscarPorId(id);
        
        insumo.setNome(insumoAtualizado.getNome());
        insumo.setUnidadeMedida(insumoAtualizado.getUnidadeMedida());
        insumo.setEstoqueAtual(insumoAtualizado.getEstoqueAtual());
        insumo.setEstoqueMinimo(insumoAtualizado.getEstoqueMinimo());
        insumo.setPrecoUnitario(insumoAtualizado.getPrecoUnitario());
        insumo.setAtivo(insumoAtualizado.getAtivo());
        
        return insumoRepository.save(insumo);
    }

    public void deletar(Long id) {
        Insumo insumo = buscarPorId(id);
        insumo.setAtivo(false);
        insumoRepository.save(insumo);
    }
}
