package com.ladecasa.controller;

import com.ladecasa.model.Insumo;
import com.ladecasa.service.InsumoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/insumos")
public class InsumoController {

    @Autowired
    private InsumoService insumoService;

    @GetMapping
    public ResponseEntity<List<Insumo>> listarTodos() {
        return ResponseEntity.ok(insumoService.listarTodos());
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<Insumo>> listarAtivos() {
        return ResponseEntity.ok(insumoService.listarAtivos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Insumo> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(insumoService.buscarPorId(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Insumo> criar(@RequestBody Insumo insumo) {
        return ResponseEntity.ok(insumoService.criar(insumo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Insumo> atualizar(@PathVariable Long id, @RequestBody Insumo insumo) {
        try {
            return ResponseEntity.ok(insumoService.atualizar(id, insumo));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            insumoService.deletar(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
