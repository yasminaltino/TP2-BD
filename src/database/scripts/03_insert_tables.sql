-- Unidade
INSERT INTO Unidade (CNPJ, Nome, Descricao, CEP, Cidade, Logradouro, Numero)
SELECT '29431074000164', 'Unidade Central', 'Hospital Central', '01000-000', 'Sao Paulo', 'Av.Paulista', '100'
WHERE NOT EXISTS (
    SELECT 1 FROM Unidade WHERE CNPJ = '29431074000164'
);


-- Pessoa - Joao Pereira
INSERT INTO Pessoa (CPF, Nome, Sexo, Telefone, CEP, Cidade, Logradouro, Numero)
SELECT '98765432100', 'Joao Pereira', 'M', '(21)99876-5432', '20000-000', 'Rio de Janeiro', 'Av. Atlantica', 500
WHERE NOT EXISTS (
    SELECT 1 FROM Pessoa WHERE CPF = '98765432100'
);

-- Pessoa - Ana Paula
INSERT INTO Pessoa (CPF, Nome, Sexo, Telefone, CEP, Cidade, Logradouro, Numero)
SELECT '34567890123', 'Ana Paula', 'F', '(41)98765-4321', '80000-000', 'Curitiba', 'Rua XV de Novembro', 789
WHERE NOT EXISTS (
    SELECT 1 FROM Pessoa WHERE CPF = '34567890123'
);

-- Pessoa - Roberto Lima
INSERT INTO Pessoa (CPF, Nome, Sexo, Telefone, CEP, Cidade, Logradouro, Numero)
SELECT '45678901234', 'Roberto Lima', 'M', '(51)91234-8765', '90000-000', 'Porto Alegre', 'Av. Ipiranga', 101
WHERE NOT EXISTS (
    SELECT 1 FROM Pessoa WHERE CPF = '45678901234'
);


-- Funcionario
INSERT INTO Funcionario (CPF_Funcionario, DataContratacao, RegistroFunc)
SELECT '98765432100', '2023-05-10', 'RF004'
WHERE NOT EXISTS (
    SELECT 1 FROM Funcionario WHERE CPF_Funcionario = '98765432100'
);

INSERT INTO Funcionario (CPF_Funcionario, DataContratacao, RegistroFunc)
SELECT '34567890123', '2023-08-10', 'RF010'
WHERE NOT EXISTS (
    SELECT 1 FROM Funcionario WHERE CPF_Funcionario = '34567890123'
);


-- Coordenador - CPF: 23456789012 (deve existir na tabela Funcionario)
INSERT INTO Coordenador (CPF_Coordenador)
SELECT '98765432100'
WHERE NOT EXISTS (
    SELECT 1 FROM Coordenador WHERE CPF_Coordenador = '98765432100'
);

-- Departamento
INSERT INTO Departamento (Codigo, Nome, Telefone, CNPJ_Unidade, CPF_Coordenador)
SELECT 1, 'Emergencia', '(11)4002-8922', '29431074000164', '98765432100'
WHERE NOT EXISTS (
    SELECT 1 FROM Departamento WHERE Codigo = 1
);

-- ProntoSocorro
INSERT INTO ProntoSocorro (Codigo_Departamento, Localizacao)
SELECT 1, ''
WHERE NOT EXISTS (
    SELECT 1 FROM ProntoSocorro WHERE Codigo_Departamento = 1
);


-- Pessoa - Carlos Oliveira
INSERT INTO Pessoa (CPF, Nome, Sexo, Telefone, CEP, Cidade, Logradouro, Numero)
SELECT '23456789012', 'Carlos Oliveira', 'M', '(31)98765-4321', '30100-000', 'Belo Horizonte', 'Av. Afonso Pena', 1000
WHERE NOT EXISTS (
    SELECT 1 FROM Pessoa WHERE CPF = '23456789012'
);


-- Candidato
INSERT INTO Candidato (CPF_Candidato, RegistroCand)
SELECT '23456789012', 'RC2025'
WHERE NOT EXISTS (
    SELECT 1 FROM Candidato WHERE CPF_Candidato = '23456789012'
);

-- Suprimento
INSERT INTO Suprimento (Nome, Marca, Descricao, QtdEstoque)
SELECT 'Microtouch Nitrile', 'Ansell', 'Luvas de nitrila descartaveis, sem latex, resistentes a produtos quimicos e perfuracoes. Ideais para procedimentos medicos.', 50
WHERE NOT EXISTS (
    SELECT 1 FROM Suprimento WHERE Nome = 'Microtouch Nitrile' AND Marca = 'Ansell'
);

INSERT INTO Suprimento (Nome, Marca, Descricao, QtdEstoque)
SELECT 'Máscara Cirúrgica', '3M', 'Máscara descartável para proteção contra partículas e gotículas.', 200
WHERE NOT EXISTS (
    SELECT 1 FROM Suprimento WHERE Nome = 'Máscara Cirúrgica' AND Marca = '3M'
);

INSERT INTO Suprimento (Nome, Marca, Descricao, QtdEstoque)
SELECT 'Seringa Descartável 10ml', 'BD', 'Seringa descartável com agulha para uso médico.', 150
WHERE NOT EXISTS (
    SELECT 1 FROM Suprimento WHERE Nome = 'Seringa Descartável 10ml' AND Marca = 'BD'
);

INSERT INTO Suprimento (Nome, Marca, Descricao, QtdEstoque)
SELECT 'Álcool 70%', 'Biodinâmico', 'Álcool 70% para higienização e desinfecção.', 300
WHERE NOT EXISTS (
    SELECT 1 FROM Suprimento WHERE Nome = 'Álcool 70%' AND Marca = 'Biodinâmico'
);

INSERT INTO Suprimento (Nome, Marca, Descricao, QtdEstoque)
SELECT 'Gaze Estéril 10x10', 'Johnson & Johnson', 'Gaze estéril para curativos.', 100
WHERE NOT EXISTS (
    SELECT 1 FROM Suprimento WHERE Nome = 'Gaze Estéril 10x10' AND Marca = 'Johnson & Johnson'
);

-- Equipamento
INSERT INTO Equipamento (Tipo, Marca, QtdDisp, QtdExames, Codigo_PS)
SELECT 'Raio-X', 'GE', 5, 150, 1
WHERE NOT EXISTS (
    SELECT 1 FROM Equipamento WHERE Tipo = 'Raio-X' AND Marca = 'GE' AND Codigo_PS = 1
);

INSERT INTO Equipamento (Tipo, Marca, QtdDisp, QtdExames, Codigo_PS)
SELECT 'Ultrassom', 'Philips', 3, 120, 1
WHERE NOT EXISTS (
    SELECT 1 FROM Equipamento WHERE Tipo = 'Ultrassom' AND Marca = 'Philips' AND Codigo_PS = 1
);

INSERT INTO Equipamento (Tipo, Marca, QtdDisp, QtdExames, Codigo_PS)
SELECT 'Tomógrafo', 'Siemens', 2, 80, 1
WHERE NOT EXISTS (
    SELECT 1 FROM Equipamento WHERE Tipo = 'Tomógrafo' AND Marca = 'Siemens' AND Codigo_PS = 1
);

INSERT INTO Equipamento (Tipo, Marca, QtdDisp, QtdExames, Codigo_PS)
SELECT 'ECG', 'GE', 4, 200, 1
WHERE NOT EXISTS (
    SELECT 1 FROM Equipamento WHERE Tipo = 'ECG' AND Marca = 'GE' AND Codigo_PS = 1
);

-- Atua_em
INSERT INTO Atua_Em (CPF_Funcionario, Codigo_Departamento, DataIni, DataDesl)
SELECT '98765432100', 1, '2023-05-15', NULL
WHERE NOT EXISTS (
    SELECT 1 FROM Atua_Em WHERE CPF_Funcionario = '98765432100' AND Codigo_Departamento = 1
);