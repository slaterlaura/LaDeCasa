package com.ladecasa.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendasMesDTO {
    private String mes;
    private Double valor;
    private Integer quantidade;
}
