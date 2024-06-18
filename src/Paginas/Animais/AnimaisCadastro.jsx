import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";

function AnimaisCadastro() {
  const { idAnimal } = useParams();
  const navigate = useNavigate();
  const [especies, setEspecies] = useState([]);
  const [cuidadores, setCuidadores] = useState([]);

  const [animal, setAnimal] = useState({
    nome: "",
    numero_baia: "",
    castracao: "",
    especie: "",
    sexo: "",
    adocao: "",
    cuidador: "",
  });

  useEffect(() => {
    const fetchEspecies = async () => {
      try {
        const response = await fetch("http://localhost:3001/especie");
        if (!response.ok) {
          throw new Error('Erro ao buscar espécie');
        }
        const data = await response.json();
        setEspecies(data);
      } catch (error) {
        console.error('Erro ao buscar espécie:', error);
      }
    };
    fetchEspecies();
  }, []);

  useEffect(() => {
    const fetchCuidadores = async () => {
      try {
        const response = await fetch("http://localhost:3001/cuidador");
        if (!response.ok) {
          throw new Error('Erro ao buscar cuidador');
        }
        const data = await response.json();
        setCuidadores(data);
      } catch (error) {
        console.error('Erro ao buscar cuidador:', error);
      }
    };
    fetchCuidadores();
  }, []);

  useEffect(() => {
    if (idAnimal) {
      const fetchAnimal = async () => {
        try {
          const response = await fetch(`http://localhost:3001/animal/${idAnimal}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar animal");
          }
          const data = await response.json();
          setAnimal(data);
        } catch (error) {
          console.error("Erro ao buscar animal:", error);
        }
      };
      fetchAnimal();
    }
  }, [idAnimal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nome") {
      const cleanedValue = value.replace(/[^a-zA-Z\s]/g, "");
      const truncatedValue = cleanedValue.slice(0, 50);
      setAnimal({ ...animal, [name]: truncatedValue });
    } else {
      setAnimal({ ...animal, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/animal${idAnimal ? `/${idAnimal}` : ""}`,
        {
          method: idAnimal ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(animal),
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao salvar animal");
      }
      navigate("/");
    } catch (error) {
      console.error("Erro ao salvar animal:", error);
    }
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md="8">
          <Card>
            <Card.Body>
              <h2>{idAnimal ? "Editar Animal" : "Cadastrar Animal"}</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={animal.nome}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Número da Baia</Form.Label>
                  <Form.Control
                    type="number"
                    name="numero_baia"
                    value={animal.numero_baia}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Castração</Form.Label>
                  <Form.Select
                    name="castracao"
                    value={animal.castracao}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Espécie</Form.Label>
                  <Form.Select
                    name="especie"
                    value={animal.especie}
                    onChange={handleChange}
                    required
                  >
                    {especies.map((especie) => (
                    <option value={especie.id}>{especie.nome}</option>
                  ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select
                    name="sexo"
                    value={animal.sexo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Cuidador temporário</Form.Label>
                  <Form.Select
                    name="cuidador"
                    value={animal.cuidador}
                    onChange={handleChange}
                    required
                  >
                    {cuidadores.map((cuidador) => (
                    <option value={cuidador.id}>{cuidador.nome}</option>
                  ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Disponível para adoção?</Form.Label>
                  <Form.Select
                    name="adocao"
                    value={animal.adocao}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                  {idAnimal ? "Atualizar" : "Cadastrar"}
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

export default AnimaisCadastro;