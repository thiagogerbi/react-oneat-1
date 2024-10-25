"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from "@/supabase"; // Supondo que o cliente Supabase esteja configurado
import Swal from 'sweetalert2'; // Para as mensagens de sucesso e erro
import Link from 'next/link';

const CriarConta = () => {
  const [formData, setFormData] = useState({
    nomeRestaurante: '',
    cnpj: '',
    telefoneRestaurante: '',
    cepRestaurante: '',
    estadoRestaurante: '',
    ruaRestaurante: '',
    numeroRestaurante: '',
    bairroRestaurante: '',
    cidadeRestaurante: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCepBlur = (value) => {
    // Função para pesquisar o CEP pode ser implementada aqui
    console.log(`CEP pesquisado: ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Cria o endereço do restaurante
      const addressRestaurante = {
        rua: formData.ruaRestaurante,
        numero: formData.numeroRestaurante,
        cidade: formData.cidadeRestaurante,
        estado: formData.estadoRestaurante,
        bairro: formData.bairroRestaurante,
        cep: formData.cepRestaurante
      };

      const { data: insertedAddress, error: errorAddress } = await supabase
        .from("EnderecoRestaurante")
        .insert(addressRestaurante)
        .select("id");

      if (errorAddress) {
        throw new Error("Erro ao salvar o endereço do restaurante");
      }

      // Cria o restaurante com o endereço inserido e proprietario como null
      const restaurante = {
        nome: formData.nomeRestaurante,
        telefone: formData.telefoneRestaurante,
        cnpj: formData.cnpj,
        endereco: insertedAddress[0].id, // Referência ao ID do endereço inserido
        proprietario: null // Proprietário será definido posteriormente
      };

      const { error: errorRestaurante } = await supabase
        .from("Restaurante")
        .insert(restaurante);

      if (errorRestaurante) {
        throw new Error("Erro ao salvar o restaurante");
      }

      // Exibe a mensagem de sucesso usando SweetAlert2
      Swal.fire({
        title: 'Sucesso!',
        text: 'Restaurante cadastrado com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn-confirm', // Classe personalizada para o botão de confirmação
        }
      });

      // Redireciona para a próxima página para cadastrar o proprietário
      navigate("/proximo-passo"); // Ajuste para a próxima página conforme sua lógica
    } catch (error) {
      console.error(error);

      // Exibe a mensagem de erro usando SweetAlert2
      Swal.fire({
        title: 'Erro!',
        text: error.message || 'Ocorreu um erro ao salvar o restaurante.',
        icon: 'error',
        confirmButtonText: 'Tentar novamente'
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <form id="formulario_final" className="form-container" onSubmit={handleSubmit}>
          <div className="form-left">
            <h2>Criar Conta</h2>
            <span id="line"></span>

            <label htmlFor="nomeRestaurante">Nome do Restaurante</label>
            <input
              type="text"
              id="nomeRestaurante"
              placeholder="Digite o nome do Estabelecimento"
              value={formData.nomeRestaurante}
              onChange={handleInputChange}
            />

            <div className="row">
              <div className="div-cnpj">
                <label htmlFor="cnpj">CNPJ</label>
                <input
                  type="text"
                  id="cnpj"
                  placeholder="Digite seu CNPJ"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                />
              </div>

              <div className="div-telefone">
                <label htmlFor="telefoneRestaurante">Telefone do Restaurante</label>
                <input
                  type="text"
                  id="telefoneRestaurante"
                  placeholder="Telefone do restaurante"
                  value={formData.telefoneRestaurante}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="div-cep">
                <label htmlFor="cepRestaurante">CEP do Restaurante</label>
                <input
                  type="text"
                  id="cepRestaurante"
                  className="cep"
                  placeholder="Digite seu CEP"
                  maxLength="9"
                  value={formData.cepRestaurante}
                  onChange={handleInputChange}
                  onBlur={() => handleCepBlur(formData.cepRestaurante)}
                />
              </div>

              <div className="div-estado">
                <label htmlFor="estadoRestaurante">Estado</label>
                <input
                  type="text"
                  id="estadoRestaurante"
                  className="estado"
                  placeholder="Digite o estado do restaurante"
                  value={formData.estadoRestaurante}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="form-right">
            <div className="row">
              <div className="div-rua">
                <label htmlFor="ruaRestaurante">Rua</label>
                <input
                  type="text"
                  id="ruaRestaurante"
                  placeholder="Digite o endereço do restaurante"
                  value={formData.ruaRestaurante}
                  onChange={handleInputChange}
                />
              </div>

              <div className="rua-numero">
                <div>
                  <label htmlFor="numeroRestaurante">Número</label>
                  <input
                    type="text"
                    id="numeroRestaurante"
                    placeholder="Nº"
                    value={formData.numeroRestaurante}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <label htmlFor="bairroRestaurante">Bairro</label>
            <input
              type="text"
              id="bairroRestaurante"
              placeholder="Digite o bairro do restaurante"
              value={formData.bairroRestaurante}
              onChange={handleInputChange}
            />

            <label htmlFor="cidadeRestaurante">Cidade</label>
            <input
              type="text"
              id="cidadeRestaurante"
              placeholder="Digite a cidade do restaurante"
              value={formData.cidadeRestaurante}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" id="btn_prox" className="btn">
            Próximo
          </button>

        </form>
        <p className="login-link">
          Já tem uma conta? <a href="./index.html">Faça o login</a>
        </p>
      </div>
    </div>
  );
};

export default CriarConta;
