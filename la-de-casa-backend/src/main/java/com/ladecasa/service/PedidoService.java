package com.ladecasa.service;

import com.ladecasa.model.Pedido;
import com.ladecasa.model.PedidoItem;
import com.ladecasa.model.Produto;
import com.ladecasa.repository.PedidoRepository;
import com.ladecasa.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Pedido> listarTodos() {
        return pedidoRepository.findAll();
    }

    public List<Pedido> listarAtivos() {
        return pedidoRepository.findByStatus(Pedido.StatusPedido.ATIVO);
    }

    public Pedido buscarPorId(Long id) {
        return pedidoRepository.findByIdWithItens(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
    }

    @Transactional
    public Pedido criar(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    @Transactional
    public Pedido atualizar(Long id, Pedido pedidoAtualizado) {
        Pedido pedido = buscarPorId(id);
        
        pedido.setCliente(pedidoAtualizado.getCliente());
        pedido.setDataPedido(pedidoAtualizado.getDataPedido());
        pedido.setDataEntrega(pedidoAtualizado.getDataEntrega());
        pedido.setStatus(pedidoAtualizado.getStatus());
        
        return pedidoRepository.save(pedido);
    }

    public void deletar(Long id) {
        pedidoRepository.deleteById(id);
    }

    @Transactional
    public PedidoItem adicionarItem(Long pedidoId, Long produtoId, Integer quantidade) {
        Pedido pedido = buscarPorId(pedidoId);
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        PedidoItem item = new PedidoItem();
        item.setPedido(pedido);
        item.setProduto(produto);
        item.setQuantidade(quantidade);
        item.setPrecoUnitario(produto.getPrecoVenda());
        item.calcularSubtotal();

        pedido.getItens().add(item);
        pedido.calcularValorTotal();
        
        return pedidoRepository.save(pedido).getItens().get(pedido.getItens().size() - 1);
    }

    @Transactional
    public void removerItem(Long pedidoId, Long itemId) {
        Pedido pedido = buscarPorId(pedidoId);
        pedido.getItens().removeIf(item -> item.getId().equals(itemId));
        pedido.calcularValorTotal();
        pedidoRepository.save(pedido);
    }
}
