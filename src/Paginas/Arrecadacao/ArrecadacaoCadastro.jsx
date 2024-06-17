import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";

function EventosCadastro() {
  const { idEvento } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState({
    data_evento: "",
    valor_arrecadado: "",
    descricao: ""
  });

  useEffect(() => {
    if (idEvento) {
      const fetchEvento = async () => {
        try {
          const response = await fetch(`http://localhost:3001/arrecadacao/${idEvento}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar evento");
          }
          const data = await response.json();
          setEvento(data);
        } catch (error) {
          console.error("Erro ao buscar evento:", error);
        }
      };
      fetchEvento();
    }
  }, [idEvento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento({ ...evento, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dados do evento a serem enviados:", evento);
    try {
      const response = await fetch(
        `http://localhost:3001/arrecadacao${idEvento ? `/${idEvento}` : ""}`,
        {
          method: idEvento ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(evento),
        }
      );
      console.log("Resposta da API:", response);
      if (!response.ok) {
        throw new Error("Erro ao salvar evento");
      }
      navigate("/eventos-arrecadacao");
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
    }
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md="8">
          <Card>
            <Card.Body>
              <h2>{idEvento ? "Editar Evento" : "Cadastrar Evento"}</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Data do Evento</Form.Label>
                  <Form.Control
                    type="date"
                    name="data_evento"
                    value={evento.data_evento}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Valor Arrecadado</Form.Label>
                  <Form.Control
                    type="text"
                    name="valor_arrecadado"
                    value={evento.valor_arrecadado}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descricao"
                    value={evento.descricao}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  {idEvento ? "Atualizar" : "Cadastrar"}
                </Button>
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => navigate("/")}
                >
                  Cancelar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EventosCadastro;