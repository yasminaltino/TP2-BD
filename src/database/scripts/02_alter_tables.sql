DO
$$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_depto_unidade'
  ) THEN
    ALTER TABLE Departamento
      ADD CONSTRAINT fk_depto_unidade FOREIGN KEY (CNPJ_Unidade)
      REFERENCES Unidade(CNPJ)
      ON DELETE CASCADE; -- Se apagar Unidade, apaga Departamentos relacionados
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_depto_coord_ativo'
  ) THEN
    ALTER TABLE Departamento
      ADD CONSTRAINT fk_depto_coord_ativo FOREIGN KEY (CPF_Coordenador)
      REFERENCES Coordenador(CPF_Coordenador);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_func_pessoa'
  ) THEN
    ALTER TABLE Funcionario
      ADD CONSTRAINT fk_func_pessoa FOREIGN KEY (CPF_Funcionario)
      REFERENCES Pessoa(CPF)
      ON DELETE CASCADE; -- Apaga Funcionário se Pessoa for apagada
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_cand_pessoa'
  ) THEN
    ALTER TABLE Candidato
      ADD CONSTRAINT fk_cand_pessoa FOREIGN KEY (CPF_Candidato)
      REFERENCES Pessoa(CPF)
      ON DELETE CASCADE; -- Apaga Candidato se Pessoa for apagada
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_coord_func'
  ) THEN
    ALTER TABLE Coordenador
      ADD CONSTRAINT fk_coord_func FOREIGN KEY (CPF_Coordenador)
      REFERENCES Funcionario(CPF_Funcionario)
      ON DELETE CASCADE; -- Apaga Coordenador se Funcionário for apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_medchefe_func'
  ) THEN
    ALTER TABLE MedicoChefe
      ADD CONSTRAINT fk_medchefe_func FOREIGN KEY (CPF_MedicoChefe)
      REFERENCES Funcionario(CPF_Funcionario)
      ON DELETE CASCADE; -- Apaga Médico Chefe se Funcionário for apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_finan_depto'
  ) THEN
    ALTER TABLE Financeiro
      ADD CONSTRAINT fk_finan_depto FOREIGN KEY (Codigo_Departamento)
      REFERENCES Departamento(Codigo)
      ON DELETE CASCADE; -- Apaga Financeiro se Departamento for apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_ps_depto'
  ) THEN
    ALTER TABLE ProntoSocorro
      ADD CONSTRAINT fk_ps_depto FOREIGN KEY (Codigo_Departamento)
      REFERENCES Departamento(Codigo)
      ON DELETE CASCADE; -- Apaga ProntoSocorro se Departamento for apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_dep_func'
  ) THEN
    ALTER TABLE Dependente
      ADD CONSTRAINT fk_dep_func FOREIGN KEY (CPF_Funcionario)
      REFERENCES Funcionario(CPF_Funcionario)
      ON DELETE CASCADE; -- Apaga Dependente se Funcionário for apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_conta_financeiro'
  ) THEN
    ALTER TABLE Conta
      ADD CONSTRAINT fk_conta_financeiro FOREIGN KEY (Codigo_Financeiro)
      REFERENCES Financeiro(Codigo_Departamento)
      ON DELETE CASCADE; -- Apaga Conta se Financeiro for apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_conta_credor'
  ) THEN
    ALTER TABLE Conta
      ADD CONSTRAINT fk_conta_credor FOREIGN KEY (Codigo_Credor)
      REFERENCES Credor(Codigo_Credor);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_equip_ps'
  ) THEN
    ALTER TABLE Equipamento
      ADD CONSTRAINT fk_equip_ps FOREIGN KEY (Codigo_PS)
      REFERENCES ProntoSocorro(Codigo_Departamento)
      ON DELETE CASCADE; -- Apaga Equipamento se ProntoSocorro apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_atua_func'
  ) THEN
    ALTER TABLE Atua_Em
      ADD CONSTRAINT fk_atua_func FOREIGN KEY (CPF_Funcionario)
      REFERENCES Funcionario(CPF_Funcionario)
      ON DELETE CASCADE; -- Apaga atua_em se Funcionário apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_atua_depto'
  ) THEN
    ALTER TABLE Atua_Em
      ADD CONSTRAINT fk_atua_depto FOREIGN KEY (Codigo_Departamento)
      REFERENCES Departamento(Codigo)
      ON DELETE CASCADE; -- Apaga atua_em se Departamento apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_resp_medchefe'
  ) THEN
    ALTER TABLE E_Responsavel
      ADD CONSTRAINT fk_resp_medchefe FOREIGN KEY (CPF_MedicoChefe)
      REFERENCES MedicoChefe(CPF_MedicoChefe)
      ON DELETE CASCADE; -- Apaga responsável se Médico Chefe apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_resp_unidade'
  ) THEN
    ALTER TABLE E_Responsavel
      ADD CONSTRAINT fk_resp_unidade FOREIGN KEY (CNPJ_Unidade)
      REFERENCES Unidade(CNPJ)
      ON DELETE CASCADE; -- Apaga responsável se Unidade apagada
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_gerencia_coord'
  ) THEN
    ALTER TABLE Gerencia
      ADD CONSTRAINT fk_gerencia_coord FOREIGN KEY (CPF_Coordenador)
      REFERENCES Coordenador(CPF_Coordenador)
      ON DELETE CASCADE; -- Apaga gerencia se Coordenador apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_gerencia_depto'
  ) THEN
    ALTER TABLE Gerencia
      ADD CONSTRAINT fk_gerencia_depto FOREIGN KEY (Codigo_Departamento)
      REFERENCES Departamento(Codigo)
      ON DELETE CASCADE; -- Apaga gerencia se Departamento apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_realiza_equip'
  ) THEN
    ALTER TABLE Realiza
      ADD CONSTRAINT fk_realiza_equip FOREIGN KEY (Marca, Tipo)
      REFERENCES Equipamento(Marca, Tipo)
      ON DELETE CASCADE; -- Apaga realiza se Equipamento apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_realiza_exame'
  ) THEN
    ALTER TABLE Realiza
      ADD CONSTRAINT fk_realiza_exame FOREIGN KEY (Codigo_Exame)
      REFERENCES TipoExame(Codigo_Exame)
      ON DELETE CASCADE; -- Apaga realiza se Exame apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_controla_depto'
  ) THEN
    ALTER TABLE Controla
      ADD CONSTRAINT fk_controla_depto FOREIGN KEY (Codigo_Departamento)
      REFERENCES Departamento(Codigo)
      ON DELETE CASCADE; -- Apaga controla se Departamento apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_controla_supri'
  ) THEN
    ALTER TABLE Controla
      ADD CONSTRAINT fk_controla_supri FOREIGN KEY (Marca, Nome)
      REFERENCES Suprimento(Marca, Nome)
      ON DELETE CASCADE; -- Apaga controla se Suprimento apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_entrevista_cand'
  ) THEN
    ALTER TABLE Entrevista
      ADD CONSTRAINT fk_entrevista_cand FOREIGN KEY (CPF_Candidato)
      REFERENCES Candidato(CPF_Candidato)
      ON DELETE CASCADE; -- Apaga entrevista se Candidato apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_entrevista_depto'
  ) THEN
    ALTER TABLE Entrevista
      ADD CONSTRAINT fk_entrevista_depto FOREIGN KEY (Codigo_Departamento)
      REFERENCES Departamento(Codigo)
      ON DELETE CASCADE; -- Apaga entrevista se Departamento apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_entrevista_func'
  ) THEN
    ALTER TABLE Entrevista
      ADD CONSTRAINT fk_entrevista_func FOREIGN KEY (CPF_Funcionario_Contratado)
      REFERENCES Funcionario(CPF_Funcionario)
      ON DELETE CASCADE; -- Apaga entrevista se Funcionário apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_existeEquipamento_ExemplarEquipamento'
  ) THEN
    ALTER TABLE ExisteEmEquip
      ADD CONSTRAINT fk_existeEquipamento_ExemplarEquipamento FOREIGN KEY (Codigo_Exemp_Equip)
      REFERENCES ExemplarEquipamento(Codigo_Exemplar)
      ON DELETE CASCADE; -- Apaga se ExemplarEquipamento apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_existeEquipamento_Equipamento'
  ) THEN
    ALTER TABLE ExisteEmEquip
      ADD CONSTRAINT fk_existeEquipamento_Equipamento FOREIGN KEY (Marca, Tipo)
      REFERENCES Equipamento(Marca, Tipo)
      ON DELETE CASCADE; -- Apaga se Equipamento apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_existeSuprimento_ExemplarSuprimento'
  ) THEN
    ALTER TABLE ExisteEmSupri
      ADD CONSTRAINT fk_existeSuprimento_ExemplarSuprimento FOREIGN KEY (Codigo_Exemp_Supr)
      REFERENCES ExemplarSuprimento(Codigo_Exemplar)
      ON DELETE CASCADE; -- Apaga se ExemplarSuprimento apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_existeSuprimento_Suprimento'
  ) THEN
    ALTER TABLE ExisteEmSupri
      ADD CONSTRAINT fk_existeSuprimento_Suprimento FOREIGN KEY (Marca, Nome)
      REFERENCES Suprimento(Marca, Nome)
      ON DELETE CASCADE; -- Apaga se Suprimento apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_realizam_entrevista'
  ) THEN
    ALTER TABLE Realizam
      ADD CONSTRAINT fk_realizam_entrevista FOREIGN KEY (CPF_Candidato, Codigo_Departamento, DataEntr)
      REFERENCES Entrevista(CPF_Candidato, Codigo_Departamento, DataEntr)
      ON DELETE CASCADE; -- Apaga realizam se Entrevista apagada
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_realizam_departamento'
  ) THEN
    ALTER TABLE Realizam
      ADD CONSTRAINT fk_realizam_departamento FOREIGN KEY (Codigo_Departamento_Realiza)
      REFERENCES Departamento(Codigo)
      ON DELETE CASCADE; -- Apaga realizam se Departamento apagado
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_realizam_candidato'
  ) THEN
    ALTER TABLE Realizam
      ADD CONSTRAINT fk_realizam_candidato FOREIGN KEY (CPF_Candidato_Realiza)
      REFERENCES Candidato(CPF_Candidato)
      ON DELETE CASCADE; -- Apaga realizam se Candidato apagado
  END IF;

END;
$$;