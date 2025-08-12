CREATE TABLE IF NOT EXISTS Pessoa (
    CPF CHAR(11) PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Sexo VARCHAR(10),
    Telefone VARCHAR(20),
    CEP VARCHAR(9),
    Cidade VARCHAR(100),
    Logradouro VARCHAR(255),
    Numero VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS Unidade (
    CNPJ CHAR(14) PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Descricao TEXT,
    CEP VARCHAR(9),
    Cidade VARCHAR(100),
    Logradouro VARCHAR(255),
    Numero VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS Departamento (
    Codigo SERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Telefone VARCHAR(20),
    CNPJ_Unidade CHAR(14) NOT NULL,
    CPF_Coordenador CHAR(11) UNIQUE NOT NULL
);


CREATE TABLE IF NOT EXISTS Credor (
    Codigo_Credor SERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Banco VARCHAR(20) NOT NULL,
    NumAgencia VARCHAR(20) NOT NULL,
    ContaBancaria VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS Funcionario (
    CPF_Funcionario CHAR(11) PRIMARY KEY,
    RegistroFunc VARCHAR(50) UNIQUE NOT NULL,
    DataContratacao DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS Candidato (
    CPF_Candidato CHAR(11) PRIMARY KEY,
    RegistroCand VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Coordenador (
    CPF_Coordenador CHAR(11) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS MedicoChefe (
    CPF_MedicoChefe CHAR(11) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Dependente (
    CPF_Funcionario CHAR(11) PRIMARY KEY,
    NomeDependente VARCHAR(255) NOT NULL,
    GrauParentesco VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Financeiro (
    Codigo_Departamento INT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS ProntoSocorro (
    Codigo_Departamento INT PRIMARY KEY,
    Localizacao VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Conta (
    ID_Conta SERIAL PRIMARY KEY,
    Valor DECIMAL(10, 2) NOT NULL,
    Codigo_Financeiro INT NOT NULL,
    Codigo_Credor INT NOT NULL
);

CREATE TABLE IF NOT EXISTS TipoExame (
    Codigo_Exame SERIAL PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT
);

CREATE TABLE IF NOT EXISTS Equipamento (
    Tipo VARCHAR(100) NOT NULL,
    Marca VARCHAR(100) NOT NULL,
    QtdDisp INT DEFAULT 0,
    QtdExames INT DEFAULT 0,
    Codigo_PS INT NOT NULL,
    PRIMARY KEY (Tipo, Marca)
);

CREATE TABLE IF NOT EXISTS ExemplarEquipamento (
    Codigo_Exemplar SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Suprimento (
    Nome VARCHAR(100) NOT NULL,
    Marca VARCHAR(100) NOT NULL,
    Descricao TEXT,
    QtdEstoque INT NOT NULL DEFAULT 0,
    PRIMARY KEY (Nome, Marca)
);

CREATE TABLE IF NOT EXISTS ExemplarSuprimento (
    Codigo_Exemplar SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Atua_Em (
    CPF_Funcionario CHAR(11) NOT NULL,
    Codigo_Departamento INT NOT NULL,
    DataIni DATE NOT NULL,
    DataDesl DATE,
    PRIMARY KEY (CPF_Funcionario, Codigo_Departamento)
);

CREATE TABLE IF NOT EXISTS E_Responsavel (
    CPF_MedicoChefe CHAR(11) NOT NULL,
    CNPJ_Unidade CHAR(14) NOT NULL,
    DataIni DATE NOT NULL,
    DataFim DATE,
    PRIMARY KEY (CPF_MedicoChefe, CNPJ_Unidade)
);

CREATE TABLE IF NOT EXISTS Gerencia (
    CPF_Coordenador CHAR(11) NOT NULL,
    Codigo_Departamento INT NOT NULL,
    DataIni DATE NOT NULL,
    DataFim DATE,
    PRIMARY KEY (CPF_Coordenador, Codigo_Departamento)
);

CREATE TABLE IF NOT EXISTS Realiza (
    Marca VARCHAR(100) NOT NULL,
    Tipo VARCHAR(100) NOT NULL,
    Codigo_Exame INT NOT NULL,
    PRIMARY KEY (Marca, Tipo, Codigo_Exame) 
);

CREATE TABLE IF NOT EXISTS Controla (
    Codigo_Departamento INT NOT NULL,
    Marca VARCHAR(100) NOT NULL,
    Nome VARCHAR(100) NOT NULL,
    PRIMARY KEY(Marca, Nome, Codigo_Departamento)
);

CREATE TABLE IF NOT EXISTS Entrevista (
    DataEntr DATE NOT NULL,
    CPF_Candidato CHAR(11) NOT NULL,
    Codigo_Departamento INT NOT NULL,
    CPF_Funcionario_Contratado CHAR(11) UNIQUE NOT NULL,
    PRIMARY KEY (DataEntr, CPF_Candidato, Codigo_Departamento)
);

CREATE TABLE IF NOT EXISTS ExisteEmEquip (
    Codigo_Exemp_Equip INT NOT NULL,
    Marca VARCHAR(100) NOT NULL,
    Tipo VARCHAR(100) NOT NULL,
    PRIMARY KEY(Codigo_Exemp_Equip, Marca, Tipo)
);

CREATE TABLE IF NOT EXISTS ExisteEmSupri (
    Codigo_Exemp_Supr INT NOT NULL,
    Marca VARCHAR(100) NOT NULL,
    Nome VARCHAR(100) NOT NULL,
    PRIMARY KEY (Codigo_Exemp_Supr, Marca, Nome)
);

CREATE TABLE IF NOT EXISTS Realizam (
    CPF_Candidato CHAR(11) NOT NULL,
    Codigo_Departamento INT NOT NULL,
    DataEntr DATE NOT NULL,

    Codigo_Departamento_Realiza INT NOT NULL,
    CPF_Candidato_Realiza VARCHAR(14) NOT NULL,
    PRIMARY KEY (CPF_Candidato, Codigo_Departamento, DataEntr, Codigo_Departamento_Realiza, CPF_Candidato_Realiza)
);