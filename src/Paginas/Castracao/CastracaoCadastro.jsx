import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";

function CastracaoCadastro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState({
    data_evento: "",
    tipo_animal: "",
    sexo_animal: "",
    quantidade_castrada: "",
    local_evento: "",
    descricao: ""
  });

  useEffect(() => {
    if (id) {
      const fetchEvento = async () => {
        try {
          const response = await fetch(`http://localhost:3001/castracao/${id}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar evento de castração");
          }
          const data = await response.json();
          setEvento(data);
        } catch (error) {
          console.error("Erro ao buscar evento de castração:", error);
        }
      };
      fetchEvento();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento({ ...evento, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dados do evento de castração a serem enviados:", evento);
    try {
      const response = await fetch(
        `http://localhost:3001/castracao${id ? `/${id}` : ""}`,
        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(evento),
        }
      );
      console.log("Resposta da API:", response);
      if (!response.ok) {
        throw new Error("Erro ao salvar evento de castração");
      }
      navigate("/eventos-castracao");
    } catch (error) {
      console.error("Erro ao salvar evento de castração:", error);
    }
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md="8">
          <Card>
            <Card.Body>
              <h2>{id ? "Editar Evento de Castração" : "Cadastrar Evento de Castração"}</h2>
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
                  <Form.Label>Tipo de Animal</Form.Label>
                  <Form.Select
                    name="tipo_animal"
                    value={evento.tipo_animal}
                    onChange={handleChange}
                    required
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
                    onChange={handleChange}
                    required
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
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Local do Evento</Form.Label>
                  <Form.Control
                    type="text"
                    name="local_evento"
                    value={evento.local_evento}
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
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  {id ? "Atualizar" : "Cadastrar"}
                </Button>
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => navigate("/eventos-castracao")}
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

export default CastracaoCadastro;
