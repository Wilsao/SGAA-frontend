import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
        setAnimal(data);
      } catch (error) {
        console.error('Erro ao buscar animal:', error);
      }
    };
    fetchAnimal();
  }, [idAnimal]);

  return (
    <div className="container mt-3">
      <h3>Detalhes do Animal</h3>
      {animal ? (
        <div className="card">
          <div className="card-body">
            <img src={animal.foto_url} className="admin-viewer-pic img-fluid" alt="Foto do animal" />
            <p className="card-text"><strong>Nome:</strong> {animal.nome}</p>
            <p className="card-text"><strong>Espécie:</strong> {animal.especie}</p>
            <p className="card-text"><strong>Sexo:</strong> {animal.sexo}</p>
            <p className="card-text"><strong>Número da Baia:</strong> {animal.numero_baia}</p>
            <p className="card-text"><strong>Castração:</strong> {animal.castracao}</p>
            <p className="card-text"><strong>Disponível para adoção:</strong> {animal.adocao}</p>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default AnimalVisualizacao;
