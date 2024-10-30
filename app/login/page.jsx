"use client";

import React, { useState } from "react";
import styles from "./login.css"; 
import Image from 'next/image'; // Importa o componente Image do Next.js
import CadastrarRestaurante from '../cadastrarRestaurante/page';
import Link from 'next/link';

// Importando as imagens da pasta 'img'
import logo from '../public/img/logo.png';
import eyeOff from '../public/img/eye-off.svg';
import eyeOn from '../public/img/eye.svg';
import loginSvg from '../public/img/login.svg';  // Renomeie para evitar conflito de nomes

function Login() {
  // Estado para alternar a visibilidade da senha
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Função para alternar entre mostrar/ocultar senha
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div id="page" className="flex">
      <div className="div-login">
        <header>
          {/* Usando a imagem do logo */}
            <Image src={logo} alt="Logo" width={150} height={50} /> {/* Defina a largura e altura */}
        </header>
        <main>
          <div className="headline">
            <h1>Bem-vindo(a)!</h1>
            <p>
              Faça login ou cadastre-se para começar a fazer as suas compras.
            </p>
          </div>
          <form action="../BD/login.php" method="get">
            <div className="input-wrapper">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className="input-wrapper">
              <div className="label-wrapper flex">
                <label htmlFor="senha"> Senha </label>
                <a href="recuperar1.html"> Esqueceu a senha? </a>
              </div>

              <input
                type={passwordVisible ? "text" : "password"}
                id="senha1"
                name="senha1"
                placeholder="Digite sua senha"
              />

              {/* Ícones de olho para alternar visibilidade da senha */}
              <Image
                onClick={togglePassword}
                className={`eye ${passwordVisible ? "hide" : ""}`}
                src={eyeOff}
                alt="Mostrar senha"
                width={24} // Defina a largura e altura apropriadas
                height={24}
              />
              <Image
                onClick={togglePassword}
                className={`eye ${!passwordVisible ? "hide" : ""}`}
                src={eyeOn}
                alt="Ocultar senha"
                width={24} // Defina a largura e altura apropriadas
                height={24}
              />
            </div>

            <button type="submit">Entrar</button>

            <div className="create-account">
        Ainda não tem uma conta? <Link href="/cadastrarRestaurante">Cadastre-se</Link>
      </div>
          </form>
        </main>
      </div>
      {/* Usando a imagem de login */}
      <Image src={loginSvg} alt="Ilustração de login" width={400} height={300} /> {/* Defina a largura e altura */}
    </div>
  );
}

export default Login;
