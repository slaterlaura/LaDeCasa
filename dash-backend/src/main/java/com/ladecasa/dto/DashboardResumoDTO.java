package com.ladecasa.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResumoDTO {
    private Double totalVendasMes;
    private Double totalVendasAno;
    private Integer totalPedidosMes;
    private Integer totalPedidosAno;
    private Integer pedidosAtivos;
}
