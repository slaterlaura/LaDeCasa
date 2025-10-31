package com.ladecasa.service;

import com.ladecasa.model.Insumo;
import com.ladecasa.model.Produto;
import com.ladecasa.model.ProdutoInsumo;
import com.ladecasa.repository.InsumoRepository;
import com.ladecasa.repository.ProdutoInsumoRepository;
import com.ladecasa.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ProdutoInsumoRepository produtoInsumoRepository;

    @Autowired
    private InsumoRepository insumoRepository;

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public List<Produto> listarAtivos() {
        return produtoRepository.findByAtivoTrue();
    }

    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }

    public Produto criar(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto atualizar(Long id, Produto produtoAtualizado) {
        Produto produto = buscarPorId(id);
        
        produto.setNome(produtoAtualizado.getNome());
        produto.setDescricao(produtoAtualizado.getDescricao());
        produto.setTipo(produtoAtualizado.getTipo());
        produto.setRendimento(produtoAtualizado.getRendimento());
        produto.setPrecoVenda(produtoAtualizado.getPrecoVenda());
        produto.setAtivo(produtoAtualizado.getAtivo());
        
        return produtoRepository.save(produto);
    }

    public void deletar(Long id) {
        Produto produto = buscarPorId(id);
        produto.setAtivo(false);
        produtoRepository.save(produto);
    }

    @Transactional
    public ProdutoInsumo adicionarInsumo(Long produtoId, Long insumoId, Double quantidade) {
        Produto produto = buscarPorId(produtoId);
        Insumo insumo = insumoRepository.findById(insumoId)
                .orElseThrow(() -> new RuntimeException("Insumo não encontrado"));

        ProdutoInsumo produtoInsumo = new ProdutoInsumo();
        produtoInsumo.setProduto(produto);
        produtoInsumo.setInsumo(insumo);
        produtoInsumo.setQuantidade(quantidade);

        return produtoInsumoRepository.save(produtoInsumo);
    }

    public List<ProdutoInsumo> listarInsumosDoProduto(Long produtoId) {
        return produtoInsumoRepository.findByProdutoId(produtoId);
    }

    public void removerInsumo(Long produtoInsumoId) {
        produtoInsumoRepository.deleteById(produtoInsumoId);
    }
}
