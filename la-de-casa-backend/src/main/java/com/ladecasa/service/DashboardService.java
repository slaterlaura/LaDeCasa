package com.ladecasa.service;

import com.ladecasa.dto.DashboardResumoDTO;
import com.ladecasa.dto.ProdutoVendidoDTO;
import com.ladecasa.dto.VendasMesDTO;
import com.ladecasa.model.Pedido;
import com.ladecasa.model.PedidoItem;
import com.ladecasa.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public DashboardResumoDTO getResumo() {
        LocalDate hoje = LocalDate.now();
        int anoAtual = hoje.getYear();
        int mesAtual = hoje.getMonthValue();

        List<Pedido> pedidosMes = pedidoRepository.findByAnoMes(anoAtual, mesAtual);
        List<Pedido> pedidosAno = pedidoRepository.findAll().stream()
                .filter(p -> p.getDataPedido().getYear() == anoAtual)
                .collect(Collectors.toList());
        
        List<Pedido> pedidosAtivos = pedidoRepository.findByStatus(Pedido.StatusPedido.ATIVO);

        Double totalVendasMes = pedidosMes.stream()
                .mapToDouble(Pedido::getValorTotal)
                .sum();

        Double totalVendasAno = pedidosAno.stream()
                .mapToDouble(Pedido::getValorTotal)
                .sum();

        return new DashboardResumoDTO(
                totalVendasMes,
                totalVendasAno,
                pedidosMes.size(),
                pedidosAno.size(),
                pedidosAtivos.size()
        );
    }

    public List<VendasMesDTO> getVendasEvolucao() {
        LocalDate hoje = LocalDate.now();
        int anoAtual = hoje.getYear();

        Map<Integer, VendasMesDTO> vendasPorMes = new HashMap<>();

        // Inicializar todos os meses
        for (int mes = 1; mes <= 12; mes++) {
            String nomeMes = LocalDate.of(anoAtual, mes, 1)
                    .getMonth()
                    .getDisplayName(TextStyle.SHORT, new Locale("pt", "BR"));
            vendasPorMes.put(mes, new VendasMesDTO(nomeMes, 0.0, 0));
        }

        // Buscar pedidos do ano
        List<Pedido> pedidosAno = pedidoRepository.findAll().stream()
                .filter(p -> p.getDataPedido().getYear() == anoAtual)
                .collect(Collectors.toList());

        // Agrupar por mês
        for (Pedido pedido : pedidosAno) {
            int mes = pedido.getDataPedido().getMonthValue();
            VendasMesDTO dto = vendasPorMes.get(mes);
            dto.setValor(dto.getValor() + pedido.getValorTotal());
            dto.setQuantidade(dto.getQuantidade() + 1);
        }

        return new ArrayList<>(vendasPorMes.values());
    }

    public List<ProdutoVendidoDTO> getProdutosMaisVendidos() {
        List<Pedido> todosPedidos = pedidoRepository.findAll();

        Map<String, ProdutoVendidoDTO> produtosMap = new HashMap<>();

        for (Pedido pedido : todosPedidos) {
            for (PedidoItem item : pedido.getItens()) {
                String nomeProduto = item.getProduto().getNome();
                
                if (produtosMap.containsKey(nomeProduto)) {
                    ProdutoVendidoDTO dto = produtosMap.get(nomeProduto);
                    dto.setQuantidade(dto.getQuantidade() + item.getQuantidade());
                    dto.setValor(dto.getValor() + item.getSubtotal());
                } else {
                    ProdutoVendidoDTO dto = new ProdutoVendidoDTO();
                    dto.setNomeProduto(nomeProduto);
                    dto.setTipo(item.getProduto().getTipo().name());
                    dto.setQuantidade(item.getQuantidade());
                    dto.setValor(item.getSubtotal());
                    produtosMap.put(nomeProduto, dto);
                }
            }
        }

        return produtosMap.values().stream()
                .sorted(Comparator.comparing(ProdutoVendidoDTO::getQuantidade).reversed())
                .limit(10)
                .collect(Collectors.toList());
    }

    public Map<String, Double> getReceitaPorTipo() {
        List<Pedido> todosPedidos = pedidoRepository.findAll();

        Map<String, Double> receitaPorTipo = new HashMap<>();

        for (Pedido pedido : todosPedidos) {
            for (PedidoItem item : pedido.getItens()) {
                String tipo = item.getProduto().getTipo().name();
                receitaPorTipo.put(tipo, receitaPorTipo.getOrDefault(tipo, 0.0) + item.getSubtotal());
            }
        }

        return receitaPorTipo;
    }
}
