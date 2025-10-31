-- Inserir usuário admin (senha: admin123)
INSERT INTO usuarios (nome, email, senha, role, data_criacao) VALUES 
('Fernanda de Almeida', 'admin@ladecasa.com', '$2b$10$a.xE3MledlEtFLSFqgACTeeInDmf2DetKjxFxeYFAIf2Pt8rIby8W', 'ADMIN', CURRENT_TIMESTAMP);


-- Inserir insumos de exemplo
INSERT INTO insumos (nome, unidade_medida, estoque_atual, estoque_minimo, preco_unitario, ativo) VALUES
('Chocolate 70%', 'kg', 5.0, 2.0, 45.00, true),
('Farinha de Trigo', 'kg', 10.0, 3.0, 8.50, true),
('Açúcar', 'kg', 8.0, 2.0, 5.00, true),
('Ovos', 'unidade', 60, 24, 0.80, true),
('Manteiga', 'kg', 3.0, 1.0, 35.00, true),
('Morangos', 'kg', 2.0, 1.0, 12.00, true),
('Pectina', 'g', 500, 100, 0.15, true),
('Aveia', 'kg', 5.0, 2.0, 10.00, true),
('Mel', 'L', 2.0, 0.5, 25.00, true),
('Castanhas', 'kg', 1.5, 0.5, 55.00, true);

-- Inserir produtos de exemplo
INSERT INTO produtos (nome, descricao, tipo, rendimento, preco_venda, ativo) VALUES
('Brownie Tradicional', 'Brownie de chocolate 70% com nozes', 'BROWNIE', 12, 8.50, true),
('Geleia de Morango', 'Geleia artesanal de morango', 'GELEIA', 1, 18.00, true),
('Granola Caseira', 'Granola com mel e castanhas', 'GRANOLA', 1, 22.00, true),
('Compota de Frutas Vermelhas', 'Compota artesanal de frutas vermelhas', 'COMPOTA', 1, 25.00, true);

-- Inserir receitas (produto_insumos)
-- Brownie Tradicional
INSERT INTO produto_insumos (produto_id, insumo_id, quantidade) VALUES
(1, 1, 0.5),  -- 500g de chocolate
(1, 2, 0.3),  -- 300g de farinha
(1, 3, 0.4),  -- 400g de açúcar
(1, 4, 6),    -- 6 ovos
(1, 5, 0.2);  -- 200g de manteiga

-- Geleia de Morango
INSERT INTO produto_insumos (produto_id, insumo_id, quantidade) VALUES
(2, 6, 1.0),  -- 1kg de morangos
(2, 3, 0.5),  -- 500g de açúcar
(2, 7, 10);   -- 10g de pectina

-- Granola Caseira
INSERT INTO produto_insumos (produto_id, insumo_id, quantidade) VALUES
(3, 8, 1.0),  -- 1kg de aveia
(3, 9, 0.2),  -- 200ml de mel
(3, 10, 0.3); -- 300g de castanhas

-- Compota de Frutas Vermelhas
INSERT INTO produto_insumos (produto_id, insumo_id, quantidade) VALUES
(4, 6, 0.8),  -- 800g de morangos
(4, 3, 0.4),  -- 400g de açúcar
(4, 7, 8);    -- 8g de pectina
