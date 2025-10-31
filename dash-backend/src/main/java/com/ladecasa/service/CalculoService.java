package com.ladecasa.service;

import com.ladecasa.dto.InsumoNecessarioDTO;
import com.ladecasa.model.Pedido;
import com.ladecasa.model.PedidoItem;
import com.ladecasa.model.ProdutoInsumo;
import com.ladecasa.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CalculoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public List<InsumoNecessarioDTO> calcularInsumosNecessarios() {
        // Buscar todos os pedidos ativos
        List<Pedido> pedidosAtivos = pedidoRepository.findByStatus(Pedido.StatusPedido.ATIVO);

        // Mapa para agregar insumos necessários
        Map<Long, InsumoNecessarioDTO> insumosMap = new HashMap<>();

        // Para cada pedido ativo
        for (Pedido pedido : pedidosAtivos) {
            // Para cada item do pedido
            for (PedidoItem item : pedido.getItens()) {
                // Para cada insumo do produto
                for (ProdutoInsumo produtoInsumo : item.getProduto().getInsumos()) {
                    Long insumoId = produtoInsumo.getInsumo().getId();
                    
                    // Calcular quantidade necessária: quantidade do insumo na receita * quantidade do pedido
                    Double quantidadeNecessaria = produtoInsumo.getQuantidade() * item.getQuantidade();

                    // Se o insumo já está no mapa, somar a quantidade
                    if (insumosMap.containsKey(insumoId)) {
                        InsumoNecessarioDTO dto = insumosMap.get(insumoId);
                        dto.setQuantidadeNecessaria(dto.getQuantidadeNecessaria() + quantidadeNecessaria);
                    } else {
                        // Criar novo DTO
                        InsumoNecessarioDTO dto = new InsumoNecessarioDTO();
                        dto.setInsumoId(insumoId);
                        dto.setNomeInsumo(produtoInsumo.getInsumo().getNome());
                        dto.setUnidadeMedida(produtoInsumo.getInsumo().getUnidadeMedida());
                        dto.setQuantidadeNecessaria(quantidadeNecessaria);
                        dto.setEstoqueAtual(produtoInsumo.getInsumo().getEstoqueAtual());
                        
                        insumosMap.put(insumoId, dto);
                    }
                }
            }
        }

        // Calcular diferença e se precisa comprar
        for (InsumoNecessarioDTO dto : insumosMap.values()) {
            Double diferenca = dto.getEstoqueAtual() - dto.getQuantidadeNecessaria();
            dto.setDiferenca(diferenca);
            dto.setPrecisaComprar(diferenca < 0);
        }

        // Retornar lista ordenada por nome
        return insumosMap.values().stream()
                .sorted(Comparator.comparing(InsumoNecessarioDTO::getNomeInsumo))
                .collect(Collectors.toList());
    }

    public List<InsumoNecessarioDTO> calcularSugestaoCompras() {
        return calcularInsumosNecessarios().stream()
                .filter(InsumoNecessarioDTO::getPrecisaComprar)
                .collect(Collectors.toList());
    }
}
