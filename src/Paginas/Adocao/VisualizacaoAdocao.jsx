import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function FormularioAdocaoVisualizacao() {
  const { idFormulario } = useParams();
  const [formulario, setFormulario] = useState(null);

  useEffect(() => {
    const fetchFormulario = async () => {
      try {
        const response = await fetch(`http://localhost:3001/adocao/${idFormulario}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar formulário de adoção');
        }
        const data = await response.json();
        setFormulario(data);
      } catch (error) {
        console.error('Erro ao buscar formulário de adoção:', error);
      }
    };
    fetchFormulario();
  }, [idFormulario]);

  return (
    <div className="container mt-3">
      <h3>Detalhes do Formulário de Adoção</h3>
      {formulario ? (
        <div className="card">
          <div className="card-body">
            <p className="card-text"><strong>Nome do Animal:</strong> {formulario.nome}</p>
            <p className="card-text"><strong>ID do Animal:</strong> {formulario.animal_id}</p>
            <p className="card-text"><strong>Data de Nascimento do Animal:</strong> {formulario.data_nascimento}</p>
            <p className="card-text"><strong>E-mail:</strong> {formulario.email}</p>
            <p className="card-text"><strong>Telefone:</strong> {formulario.telefone}</p>
            <p className="card-text"><strong>Endereço:</strong> {formulario.endereco}</p>
            <p className="card-text"><strong>Cidade:</strong> {formulario.cidade}</p>
            <p className="card-text"><strong>Possui algum pet em sua residência?</strong> {formulario.possui_pet_residencia}</p>
            <p className="card-text"><strong>Quantos pets possui?</strong> {formulario.quantos_pets}</p>
            <p className="card-text"><strong>Espécie e Raça:</strong> {formulario.especie_raca}</p>
            <p className="card-text"><strong>Adoção para:</strong> {formulario.adocao_para}</p>
            <p className="card-text"><strong>Possui médico veterinário?</strong> {formulario.possui_medico_veterinario ? 'Sim' : 'Não'}</p>
            <p className="card-text"><strong>Nome Completo:</strong> {formulario.nome_completo}</p>
            <p className="card-text"><strong>Data de Nascimento:</strong> {formulario.data_nascimento_adotante}</p>
            <p className="card-text"><strong>E-mail do Adotante:</strong> {formulario.email_adotante}</p>
            <p className="card-text"><strong>Telefone do Adotante:</strong> {formulario.telefone_adotante}</p>
            <p className="card-text"><strong>Endereço do Adotante:</strong> {formulario.endereco_adotante}</p>
            <p className="card-text"><strong>Cidade do Adotante:</strong> {formulario.cidade_adotante}</p>
            <p className="card-text"><strong>Renda Mensal:</strong> {formulario.renda_mensal}</p>
            <p className="card-text"><strong>Profissão:</strong> {formulario.profissao}</p>
            <p className="card-text"><strong>Estado Civil:</strong> {formulario.estado_civil}</p>
            <p className="card-text"><strong>Crianças em Casa:</strong> {formulario.tem_criancas ? 'Sim, idade(s): ' + formulario.idade_criancas : 'Não'}</p>
            <p className="card-text"><strong>Alguém tem alergia?</strong> {formulario.tem_alergia ? 'Sim' : 'Não'}</p>
            <p className="card-text"><strong>Alguém está em tratamento médico?</strong> {formulario.tratamento_medico}</p>
            <p className="card-text"><strong>Todos da casa estão cientes da adoção?</strong> {formulario.cientes_adocao ? 'Sim' : 'Não'}</p>
            <p className="card-text"><strong>Imóvel Próprio ou Alugado:</strong> {formulario.imovel_proprio_alugado}</p>
            <p className="card-text"><strong>Tipo de Residência:</strong> {formulario.tipo_residencia}</p>
            <p className="card-text"><strong>Permissão para Animais no Imóvel:</strong> {formulario.permite_animais_imovel ? 'Sim' : 'Não'}</p>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default FormularioAdocaoVisualizacao;
