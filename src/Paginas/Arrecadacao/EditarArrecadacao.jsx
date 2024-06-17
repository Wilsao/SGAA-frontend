import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

function EditarEvento() {
  const { idEvento } = useParams();
  const [evento, setEvento] = useState({
    data_evento: "",
    valor_arrecadado: "",
    descricao: ""
  });

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        if (idEvento) {
          const response = await fetch(`http://localhost:3001/evento/${idEvento}`);
          if (!response.ok) {
            throw new Error('Erro ao buscar evento');
          }
          const data = await response.json();
          setEvento(data);
        }
      } catch (error) {
        console.error('Erro ao buscar evento:', error);
      }
    };
    fetchEvento();
  }, [idEvento]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvento({ ...evento, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = idEvento ? 'PUT' : 'POST';
      const url = idEvento ? `http://localhost:3001/evento/${idEvento}` : 'http://localhost:3001/evento';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evento),
      });

      if (!response.ok) {
        throw new Error(idEvento ? 'Erro ao atualizar evento' : 'Erro ao adicionar evento');
      }

      alert(idEvento ? 'Evento atualizado com sucesso' : 'Evento adicionado com sucesso');
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
    }
  };

  return (
    <Container className="mt-3">
      <h2>{idEvento ? 'Editar Evento' : 'Adicionar Evento'}</h2>
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
          <Form.Label>Valor Arrecadado</Form.Label>
          <Form.Control
            type="text"
            name="valor_arrecadado"
            value={evento.valor_arrecadado}
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
          {idEvento ? 'Atualizar' : 'Adicionar'}
        </Button>
      </Form>
    </Container>
  );
}

export default EditarEvento;