package com.ladecasa.repository;

import com.ladecasa.model.ProdutoInsumo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoInsumoRepository extends JpaRepository<ProdutoInsumo, Long> {
    List<ProdutoInsumo> findByProdutoId(Long produtoId);
}
