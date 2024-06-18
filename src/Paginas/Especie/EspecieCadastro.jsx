import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";

function EspecieCadastro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [especie, setEspecie] = useState({
    nome: "",
  });

  useEffect(() => {
    if (id) {
      const fetchEspecie = async () => {
        try {
          const response = await fetch(`http://localhost:3001/especie/${id}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar espécie");
          }
          const data = await response.json();
          setEspecie(data);
        } catch (error) {
          console.error("Erro ao buscar espécie:", error);
        }
      };
      fetchEspecie();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEspecie({ ...especie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dados da espécie a serem enviados:", especie);
    try {
      const response = await fetch(
        `http://localhost:3001/especie${id ? `/${id}` : ""}`,
        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(especie),
        }
      );
      console.log("Resposta da API:", response);
      if (!response.ok) {
        throw new Error("Erro ao salvar espécie");
      }
      navigate("/especies");
    } catch (error) {
      console.error("Erro ao salvar espécie:", error);
    }
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md="8">
          <Card>
            <Card.Body>
              <h2>{id ? "Editar Espécie" : "Cadastrar Espécie"}</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Especie</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={especie.nome}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  {id ? "Atualizar" : "Cadastrar"}
                </Button>
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => navigate("/especies")}
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

export default EspecieCadastro;
