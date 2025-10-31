package com.ladecasa.controller;

import com.ladecasa.dto.DashboardResumoDTO;
import com.ladecasa.dto.ProdutoVendidoDTO;
import com.ladecasa.dto.VendasMesDTO;
import com.ladecasa.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/resumo")
    public ResponseEntity<DashboardResumoDTO> getResumo() {
        return ResponseEntity.ok(dashboardService.getResumo());
    }

    @GetMapping("/vendas-evolucao")
    public ResponseEntity<List<VendasMesDTO>> getVendasEvolucao() {
        return ResponseEntity.ok(dashboardService.getVendasEvolucao());
    }

    @GetMapping("/produtos-mais-vendidos")
    public ResponseEntity<List<ProdutoVendidoDTO>> getProdutosMaisVendidos() {
        return ResponseEntity.ok(dashboardService.getProdutosMaisVendidos());
    }

    @GetMapping("/receita-por-tipo")
    public ResponseEntity<Map<String, Double>> getReceitaPorTipo() {
        return ResponseEntity.ok(dashboardService.getReceitaPorTipo());
    }
}
