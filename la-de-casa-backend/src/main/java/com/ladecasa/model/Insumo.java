package com.ladecasa.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "insumos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Insumo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(name = "unidade_medida", nullable = false)
    private String unidadeMedida;

    @Column(name = "estoque_atual", nullable = false)
    private Double estoqueAtual = 0.0;

    @Column(name = "estoque_minimo", nullable = false)
    private Double estoqueMinimo = 0.0;

    @Column(name = "preco_unitario")
    private Double precoUnitario = 0.0;

    @Column(nullable = false)
    private Boolean ativo = true;
}
