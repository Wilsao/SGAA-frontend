import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

function EditarAnimal() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const truncatedValue = value.slice(0, 50);
    const filteredValue = truncatedValue.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setAnimal({ ...animal, [name]: filteredValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/animal/${idAnimal}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animal),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar animal');
      }
      alert('Animal atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar animal:', error);
    }
  };

  if (!animal) {
    return <div>Carregando...</div>;
  }

  return (
    <Container className="mt-3">
      <h2>Editar Animal</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={animal.nome}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Número da Baia</Form.Label>
          <Form.Control
            type="number"
            name="numero_baia"
            value={animal.numero_baia}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Castração</Form.Label>
          <Form.Select
            name="castracao"
            value={animal.castracao}
            onChange={handleInputChange}
          >
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Espécie</Form.Label>
          <Form.Select
            name="especie"
            value={animal.especie}
            onChange={handleInputChange}
          >
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sexo</Form.Label>
          <Form.Select
            name="sexo"
            value={animal.sexo}
            onChange={handleInputChange}
          >
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Atualizar
        </Button>
      </Form>
    </Container>
  );
}

export default EditarAnimal;