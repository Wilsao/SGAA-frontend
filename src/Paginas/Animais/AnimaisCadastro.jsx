import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form, Alert } from "react-bootstrap";

function AnimaisCadastro() {
  const { idAnimal } = useParams();
  const navigate = useNavigate();
  const [especies, setEspecies] = useState([]);
  const [cuidadores, setCuidadores] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [animal, setAnimal] = useState({
    nome: "",
    sexo: "",
    cor_pelagem: "",
    deficiencia: "",
    data_ocorrencia: "",
    data_nascimento_aproximada: "",
    numero_baia: "",
    numero_chip: "",
    condicao_resgate: "",
    cuidador: "",
    especie: "",
    castracao: "",
    adocao: "",
    foto_url: ""
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
          data.data_ocorrencia = data.data_ocorrencia ? new Date(data.data_ocorrencia).toISOString().split('T')[0] : '';
          data.data_nascimento_aproximada = data.data_nascimento_aproximada ? new Date(data.data_nascimento_aproximada).toISOString().split('T')[0] : '';
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
    setAnimal({ ...animal, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
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
        const data = await response.json();
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          throw new Error("Erro ao salvar animal");
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao salvar animal:", error);
      setErrorMessage("Erro ao salvar animal");
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
                  <Form.Label>Cor/Pelagem</Form.Label>
                  <Form.Control
                    type="text"
                    name="cor_pelagem"
                    value={animal.cor_pelagem}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Espécie</Form.Label>
                  <Form.Select
                    name="especie"
                    value={animal.especie}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    {especies.map((especie) => (
                      <option key={especie.id} value={especie.id}>
                        {especie.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Data de Nascimento Aproximada</Form.Label>
                  <Form.Control
                    type="date"
                    name="data_nascimento_aproximada"
                    value={animal.data_nascimento_aproximada || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Deficiência</Form.Label>
                  <Form.Control
                    type="text"
                    name="deficiencia"
                    value={animal.deficiencia}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Condição do Resgate</Form.Label>
                  <Form.Control
                    type="text"
                    name="condicao_resgate"
                    value={animal.condicao_resgate}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Data da Ocorrência</Form.Label>
                  <Form.Control
                    type="date"
                    name="data_ocorrencia"
                    value={animal.data_ocorrencia || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Número da Baia</Form.Label>
                  <Form.Control
                    type="text"
                    name="numero_baia"
                    value={animal.numero_baia}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Número do Chip</Form.Label>
                  <Form.Control
                    type="text"
                    name="numero_chip"
                    value={animal.numero_chip}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Cuidador Temporário</Form.Label>
                  <Form.Select
                    name="cuidador"
                    value={animal.cuidador}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    {cuidadores.map((cuidador) => (
                      <option key={cuidador.id} value={cuidador.id}>
                        {cuidador.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status de Castração</Form.Label>
                  <Form.Select
                    name="castracao"
                    value={animal.castracao}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Disponível para Adoção</Form.Label>
                  <Form.Select
                    name="adocao"
                    value={animal.adocao}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Link da Foto</Form.Label>
                  <Form.Control
                    type="text"
                    name="foto_url"
                    value={animal.foto_url}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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
