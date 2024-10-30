"use client";

import React, { useState } from 'react';
import supabase from '@/supabase';

function CadSenha() {
    return (
        <div className="container-rest">
        <form id="formulario_rest" className="form-container-rest" onSubmit={handleSubmit}>
        <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleInputChange}
          />
           <label htmlFor="confirmaSenha">Confirme sua senha</label>
          <input
            type="password"
            name="confirmaSenha"
            value={formData.confirmaSenha}
            onChange={handleInputChange}
          />

        <button onClick={()=> router.push("/login")} type="submit" id="btn_prox" className="btn-rest">
          Próximo
        </button>
        </form>
        </div>
    );
}

export default CadSenha;