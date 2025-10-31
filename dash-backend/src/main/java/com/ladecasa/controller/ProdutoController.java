package com.ladecasa.controller;

import com.ladecasa.model.Produto;
import com.ladecasa.model.ProdutoInsumo;
import com.ladecasa.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public ResponseEntity<List<Produto>> listarTodos() {
        return ResponseEntity.ok(produtoService.listarTodos());
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<Produto>> listarAtivos() {
        return ResponseEntity.ok(produtoService.listarAtivos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(produtoService.buscarPorId(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Produto> criar(@RequestBody Produto produto) {
        return ResponseEntity.ok(produtoService.criar(produto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Produto produto) {
        try {
            return ResponseEntity.ok(produtoService.atualizar(id, produto));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            produtoService.deletar(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/insumos")
    public ResponseEntity<List<ProdutoInsumo>> listarInsumos(@PathVariable Long id) {
        return ResponseEntity.ok(produtoService.listarInsumosDoProduto(id));
    }

    @PostMapping("/{id}/insumos")
    public ResponseEntity<ProdutoInsumo> adicionarInsumo(
            @PathVariable Long id,
            @RequestBody Map<String, Object> payload) {
        try {
            Long insumoId = Long.valueOf(payload.get("insumoId").toString());
            Double quantidade = Double.valueOf(payload.get("quantidade").toString());
            
            ProdutoInsumo produtoInsumo = produtoService.adicionarInsumo(id, insumoId, quantidade);
            return ResponseEntity.ok(produtoInsumo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}/insumos/{insumoId}")
    public ResponseEntity<Void> removerInsumo(@PathVariable Long id, @PathVariable Long insumoId) {
        try {
            produtoService.removerInsumo(insumoId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
