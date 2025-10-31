package com.ladecasa.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoVendidoDTO {
    private String nomeProduto;
    private String tipo;
    private Integer quantidade;
    private Double valor;
}
