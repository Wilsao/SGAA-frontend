import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

function EditarCastracao() {
  const { id } = useParams();
  const [evento, setEvento] = useState({
    data_evento: "",
    tipo_animal: "",
    sexo_animal: "",
    quantidade_castrada: "",
    local_evento: "",
    descricao: ""
  });

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:3001/castracao/${id}`);
          if (!response.ok) {
            throw new Error('Erro ao buscar evento de castração');
          }
          const data = await response.json();
          setEvento(data);
        }
      } catch (error) {
        console.error('Erro ao buscar evento de castração:', error);
      }
    };
    fetchEvento();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvento({ ...evento, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `http://localhost:3001/castracao/${id}` : 'http://localhost:3001/castracao';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evento),
      });

      if (!response.ok) {
        throw new Error(id ? 'Erro ao atualizar evento de castração' : 'Erro ao adicionar evento de castração');
      }

      alert(id ? 'Evento de castração atualizado com sucesso' : 'Evento de castração adicionado com sucesso');
    } catch (error) {
      console.error('Erro ao salvar evento de castração:', error);
    }
  };

  return (
    <Container className="mt-3">
      <h2>{id ? 'Editar Evento de Castração' : 'Adicionar Evento de Castração'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Data do Evento</Form.Label>
          <Form.Control
            type="date"
            name="data_evento"
            value={evento.data_evento}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo de Animal</Form.Label>
          <Form.Select
            name="tipo_animal"
            value={evento.tipo_animal}
            onChange={handleInputChange}
            className="label-animation"
          >
            <option value="">Selecione o tipo de animal</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sexo do Animal</Form.Label>
          <Form.Select
            name="sexo_animal"
            value={evento.sexo_animal}
            onChange={handleInputChange}
            className="label-animation"
          >
            <option value="">Selecione o sexo do animal</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantidade Castrada</Form.Label>
          <Form.Control
            type="number"
            name="quantidade_castrada"
            value={evento.quantidade_castrada}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Local do Evento</Form.Label>
          <Form.Control
            type="text"
            name="local_evento"
            value={evento.local_evento}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descricao"
            value={evento.descricao}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {id ? 'Atualizar' : 'Adicionar'}
        </Button>
      </Form>
    </Container>
  );
}

export default EditarCastracao;
