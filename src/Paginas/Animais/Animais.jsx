import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Form, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTrashAlt, FaEye } from "react-icons/fa";

function Animais() {
  const [animais, setAnimais] = useState([]);
  const [filtros, setFiltros] = useState({
    nome: "",
    numero_baia: "",
    castracao: "",
    especie: "",
    sexo: "",
    adocao: "",
  });

  const [numAnimaisEncontrados, setNumAnimaisEncontrados] = useState(0);
  const [mostrarLista, setMostrarLista] = useState(true);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState(null);
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
        const response = await fetch('http://localhost:3001/animal');
        if (!response.ok) {
          throw new Error('Erro ao buscar animais');
        }
        const data = await response.json();
        setAnimais(data);
      } catch (error) {
        console.error('Erro ao buscar animais:', error);
      }
    };
    fetchAnimais();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const filtrarAnimais = (animais) => {
    return animais.filter(
      (animal) =>
        (filtros.nome === "" ||
          animal.nome.toLowerCase().includes(filtros.nome.toLowerCase())) &&
        (filtros.numero_baia === "" || animal.numero_baia.toLowerCase().includes(filtros.numero_baia.toLowerCase())) &&
        (filtros.castracao === "" || animal.castracao === parseInt(filtros.castracao)) &&
        (filtros.especie === "" || animal.especie === parseInt(filtros.especie)) &&
        (filtros.sexo === "" || animal.sexo === filtros.sexo) &&
        (filtros.adocao === "" || animal.adocao === parseInt(filtros.adocao))
    );
  };

  const animaisFiltrados = filtrarAnimais(animais);

  useEffect(() => {
    setNumAnimaisEncontrados(animaisFiltrados.length);
  }, [animaisFiltrados]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/animal/${animalToDelete}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao remover animal');
      }
      setAnimais(animais.filter((animal) => animal.id !== animalToDelete));
      setShowConfirmAlert(false);
    } catch (error) {
      console.error('Erro ao remover animal:', error);
    }
  };

  const confirmDelete = (id) => {
    setAnimalToDelete(id);
    setShowConfirmAlert(true);
  };

  return (
    <>
      <Container className="mt-3">
        <Row className="align-items-center">
          <Col>
            <h2>Animais</h2>
          </Col>
          <Col className="text-end">
            <Button as={Link} to="/animal/novo" variant="success">
              Cadastrar animal +
            </Button>
            <Button
              variant="primary"
              className="ms-2 d-md-none"
              onClick={() => setMostrarLista(!mostrarLista)}
            >
              {mostrarLista ? "Ocultar Lista" : "Mostrar Lista"}
            </Button>
          </Col>
        </Row>
        <div className="mt-2">
          <div>
            <Row>
              <Col lg="2">
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Nome"
                    name="nome"
                    value={filtros.nome}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col lg="2">
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="nº Baia"
                    name="numero_baia"
                    value={filtros.numero_baia}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col lg="2">
                <Form.Group className="mb-3">
                  <Form.Select
                    aria-label="Select Castração"
                    name="castracao"
                    value={filtros.castracao}
                    onChange={handleFilterChange}
                  >
                    <option value="">Castração</option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg="2">
                <Form.Group className="mb-3">
                  <Form.Select
                    aria-label="Select Espécie"
                    name="especie"
                    value={filtros.especie}
                    onChange={handleFilterChange}
                  >
                    <option value="">Espécie</option>
                    {especies.map((especie) => (
                      <option key={especie.id} value={especie.id}>
                        {especie.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg="2">
                <Form.Group className="mb-3">
                  <Form.Select
                    aria-label="Select Sexo"
                    name="sexo"
                    value={filtros.sexo}
                    onChange={handleFilterChange}
                  >
                    <option value="">Sexo</option>
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg="2">
                <Form.Group className="mb-3">
                  <Form.Select
                    aria-label="Select Adoção"
                    name="adocao"
                    value={filtros.adocao}
                    onChange={handleFilterChange}
                  >
                    <option value="">Adoção</option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <p className="mb-1">
              Foram encontrados {numAnimaisEncontrados} animais:
            </p>
          </div>
        </div>
      </Container>

      <Container className="mt-2">
        <Card>
          <Card.Body className="list pb-0">
            <Table className="m-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Baia</th>
                  <th>Nome</th>
                  <th>Espécie</th>
                  <th>Sexo</th>
                  <th>Castrado</th>
                  <th>Pelagem</th>
                  <th>Disp. adoção</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {animaisFiltrados.map((animal) => (
                  <tr key={animal.id}>
                    <td>{animal.id}</td>
                    <td>{animal.numero_baia}</td>
                    <td>{animal.nome}</td>
                    <td>{especiesMap[animal.especie]}</td>
                    <td>{animal.sexo}</td>
                    <td>{animal.castracao === 1 ? "Sim" : "Não"}</td>
                    <td>{animal.cor_pelagem}</td>
                    <td>{animal.adocao === 1 ? "Sim" : "Não"}</td>
                    <td className="d-flex align-items-center">
                      <Link to={`/animal/${animal.id}`} className="btn btn-primary view m-1">
                        Visualizar <FaEye />
                      </Link>
                      <Link to={`/animal/editar/${animal.id}`} className="btn btn-primary m-1">
                        Editar <FaPencilAlt />
                      </Link>
                      <Button
                        variant="danger"
                        className="m-1"
                        onClick={() => confirmDelete(animal.id)}
                      >
                        Remover <FaTrashAlt />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      <Modal
        show={showConfirmAlert}
        onHide={() => setShowConfirmAlert(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Deseja realmente excluir este animal?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmAlert(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Animais;
