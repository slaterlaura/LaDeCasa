package com.ladecasa.controller;

import com.ladecasa.dto.InsumoNecessarioDTO;
import com.ladecasa.service.CalculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/calculos")
public class CalculoController {

    @Autowired
    private CalculoService calculoService;

    @GetMapping("/insumos-necessarios")
    public ResponseEntity<List<InsumoNecessarioDTO>> calcularInsumosNecessarios() {
        return ResponseEntity.ok(calculoService.calcularInsumosNecessarios());
    }

    @GetMapping("/sugestao-compras")
    public ResponseEntity<List<InsumoNecessarioDTO>> calcularSugestaoCompras() {
        return ResponseEntity.ok(calculoService.calcularSugestaoCompras());
    }
}
