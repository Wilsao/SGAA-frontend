import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import InputMask from 'react-input-mask';
import { FaWhatsapp, FaEye } from "react-icons/fa";
import "./Adocao.css";


function Adocao() {
  const [animais, setAnimais] = useState([]);
  const [showFormularioAdocao, setShowFormularioAdocao] = useState(false);
  const [dadosAdotante, setDadosAdotante] = useState({
    nome: "",
    data_nascimento: "",
    email: "",
    telefone: "",
    endereco: "",
    cidade: "",
  });

  const [especies, setEspecies] = useState([]);
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

  const especiesMap = especies.reduce((acc, especie) => {
    acc[especie.id] = especie.nome;
    return acc;
  }, {});

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        const response = await fetch("http://localhost:3001/animal");
        if (!response.ok) {
          throw new Error("Erro ao buscar animais");
        }
        const data = await response.json();
        const animaisAdocao = data.filter((animal) => animal.adocao === "Sim");
        setAnimais(animaisAdocao);
      } catch (error) {
        console.error("Erro ao buscar animais:", error);
      }
    };
    fetchAnimais();
  }, []);

  const openWhatsApp = (nomeAnimal) => {
    const mensagem = encodeURIComponent(
      `Gostaria de tirar dúvidas sobre o animal ${nomeAnimal}!`
    );
    window.open(
      `https://api.whatsapp.com/send?phone=5518991955335&text=${mensagem}`,
      "_blank"
    );
  };

  const openFormularioAdocao = () => {
    setShowFormularioAdocao(true);
  };

  const closeFormularioAdocao = () => {
    setShowFormularioAdocao(false);
    setDadosAdotante({
      nome: "",
      data_nascimento: "",
      email: "",
      telefone: "",
      endereco: "",
      cidade: "",
    });
  };

  const handleChangeDadosAdotante = (e) => {
    const { name, value } = e.target;
    setDadosAdotante((prevDados) => ({
      ...prevDados,
      [name]: value,
    }));
  };

  const handleSubmitFormularioAdocao = async (e) => {
    e.preventDefault();
    console.log("Dados a serem enviados:", dadosAdotante); // Log dos dados antes de enviar
    try {
      const response = await fetch("http://localhost:3001/adocao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAdotante),
      });

      console.log("Resposta do servidor:", response); // Log da resposta do servidor

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao enviar formulário de adoção: ${errorText}`);
      }

      const data = await response.json();
      console.log("Dados do servidor:", data);

      closeFormularioAdocao();
    } catch (error) {
      console.error("Erro ao enviar formulário de adoção:", error);
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Row className="align-items-center mb-3">
          <Col>
            <h2>Animais Disponíveis para Adoção</h2>
          </Col>
        </Row>
        <p className="mb-1">
          Foram encontrados {animais.length} animais disponíveis para adoção:
        </p>
      </Container>

      <Container>
        <Row>
          {animais.map((animal) => (
            <Col key={animal.id} lg={6} className="mb-3">
              <Card>
                <Card.Img variant="top" src={animal.foto_url} />
                <Card.Body>
                  <Card.Title>{animal.nome}</Card.Title>
                  <Card.Text>
                    <strong>Espécie:</strong> {especiesMap[animal.especie]}
                    <br />
                    <strong>Sexo:</strong> {animal.sexo}
                    <br />
                    <strong>Castrado:</strong> {animal.castracao}
                    <br />
                  </Card.Text>
                  <Link
                    to={`/animal/${animal.id}`}
                    className="btn btn-primary me-2"
                  >
                    Visualizar <FaEye />
                  </Link>
                  <Button
                    className="btn-whatsapp me-2"
                    variant="primary"
                    onClick={() => openWhatsApp(animal.nome)}
                  >
                    Tirar dúvidas <FaWhatsapp />
                  </Button>
                  <Button variant="primary" onClick={openFormularioAdocao}>
                    Quero adotar!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showFormularioAdocao} onHide={closeFormularioAdocao} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Formulário de Adoção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitFormularioAdocao}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={dadosAdotante.nome}
                  onChange={handleChangeDadosAdotante}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control
                  type="date"
                  name="data_nascimento"
                  value={dadosAdotante.data_nascimento}
                  onChange={handleChangeDadosAdotante}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={dadosAdotante.email}
                  onChange={handleChangeDadosAdotante}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Telefone</Form.Label>
                <InputMask
                    mask="(99) 99999-9999"
                    type="text"
                    name="telefone"
                    value={dadosAdotante.telefone}
                    onChange={handleChangeDadosAdotante}
                    className="form-control"
                    required
                  />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Endereço Completo</Form.Label>
                <Form.Control
                  type="text"
                  name="endereco"
                  value={dadosAdotante.endereco}
                  onChange={handleChangeDadosAdotante}
                  required
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  name="cidade"
                  value={dadosAdotante.cidade}
                  onChange={handleChangeDadosAdotante}
                  required
                />
              </Form.Group>
            </Row>
            <div className="text-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={closeFormularioAdocao}
              >
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Enviar Formulário
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Adocao;
