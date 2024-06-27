import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

function AnimalVisualizacao() {
  const { idAnimal } = useParams();
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await fetch(`http://localhost:3001/animal/${idAnimal}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar animal');
        }
        const data = await response.json();

        data.data_ocorrencia = data.data_ocorrencia ? new Date(data.data_ocorrencia).toISOString().split('T')[0] : '';
        data.data_nascimento_aproximada = data.data_nascimento_aproximada ? new Date(data.data_nascimento_aproximada).toISOString().split('T')[0] : '';
        setAnimal(data);
      } catch (error) {
        console.error('Erro ao buscar animal:', error);
      }
    };
    fetchAnimal();
  }, [idAnimal]);

  return (
    <Container className="mt-3">
      <h3>Detalhes do Animal</h3>
      {animal ? (
        <Card>
          <Card.Body>
            {animal.foto_url && (
              <img src={animal.foto_url} className="admin-viewer-pic img-fluid" alt="Foto do animal" />
            )}
            <p className="card-text"><strong>Nome:</strong> {animal.nome}</p>
            <p className="card-text"><strong>Espécie:</strong> {animal.especie_nome}</p>
            <p className="card-text"><strong>Sexo:</strong> {animal.sexo}</p>
            <p className="card-text"><strong>Cor/Pelagem:</strong> {animal.cor_pelagem}</p>
            <p className="card-text"><strong>Deficiência:</strong> {animal.deficiencia}</p>
            <p className="card-text"><strong>Data da Ocorrência:</strong> {animal.data_ocorrencia}</p>
            <p className="card-text"><strong>Data de Nascimento Aproximada:</strong> {animal.data_nascimento_aproximada}</p>
            <p className="card-text"><strong>Número da Baia:</strong> {animal.numero_baia}</p>
            <p className="card-text"><strong>Número do Chip:</strong> {animal.numero_chip}</p>
            <p className="card-text"><strong>Condição do Resgate:</strong> {animal.condicao_resgate}</p>
            <p className="card-text"><strong>Cuidador:</strong> {animal.cuidador_nome}</p>
            <p className="card-text"><strong>Telefone do Cuidador:</strong> {animal.cuidador_telefone}</p>
            <p className="card-text"><strong>Endereço do Cuidador:</strong> {animal.cuidador_endereco}</p>
            <p className="card-text"><strong>Castração:</strong> {animal.castracao === 1 ? 'Sim' : 'Não'}</p>
            <p className="card-text"><strong>Disponível para Adoção:</strong> {animal.adocao === 1 ? 'Sim' : 'Não'}</p>
          </Card.Body>
        </Card>
      ) : (
        <p>Carregando...</p>
      )}
    </Container>
  );
}

export default AnimalVisualizacao;
