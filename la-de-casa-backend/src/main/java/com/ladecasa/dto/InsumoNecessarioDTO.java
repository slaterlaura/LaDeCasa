package com.ladecasa.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InsumoNecessarioDTO {
    private Long insumoId;
    private String nomeInsumo;
    private String unidadeMedida;
    private Double quantidadeNecessaria;
    private Double estoqueAtual;
    private Double diferenca;
    private Boolean precisaComprar;
}
