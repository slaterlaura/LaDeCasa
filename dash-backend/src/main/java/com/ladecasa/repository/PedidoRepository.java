package com.ladecasa.repository;

import com.ladecasa.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByStatus(Pedido.StatusPedido status);
    
    @Query("SELECT p FROM Pedido p WHERE p.dataPedido BETWEEN :inicio AND :fim")
    List<Pedido> findByDataPedidoBetween(LocalDate inicio, LocalDate fim);
    
    @Query("SELECT p FROM Pedido p WHERE YEAR(p.dataPedido) = :ano AND MONTH(p.dataPedido) = :mes")
    List<Pedido> findByAnoMes(int ano, int mes);

    @Query("SELECT p FROM Pedido p LEFT JOIN FETCH p.itens i LEFT JOIN FETCH i.produto WHERE p.id = :id")
    Optional<Pedido> findByIdWithItens(Long id);
}
