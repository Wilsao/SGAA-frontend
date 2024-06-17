import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Form, Table, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaPencilAlt, FaTrashAlt, FaEye } from "react-icons/fa";
import $ from "jquery";
import "./Animais.css";

function Animais() {
  const { idAnimal } = useParams();
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
    const filteredValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setFiltros({ ...filtros, [name]: filteredValue });
  };

  const filtrarAnimais = (animais) => {
    return animais.filter(
      (animal) =>
        (filtros.nome === "" ||
          animal.nome.toLowerCase().includes(filtros.nome.toLowerCase())) &&
        (filtros.numero_baia === "" || animal.numero_baia === parseInt(filtros.numero_baia)) &&
        (filtros.castracao === "" || animal.castracao === filtros.castracao) &&
        (filtros.especie === "" || animal.especie === filtros.especie) &&
        (filtros.sexo === "" || animal.sexo === filtros.sexo) &&
        (filtros.adocao === "" || animal.adocao === filtros.adocao)
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

  useEffect(() => {
    $(".label-animation").each(function () {
      const $this = $(this);
      if (!$this.hasClass("label-processed")) {
        if ($this.is('input[type="date"]')) {
          $this
            .wrap('<div class="label-animation type-date"></div>')
            .addClass("label-processed");
          $("<label>" + $this.attr("placeholder") + "</label>").insertAfter(
            this
          );
        } else if ($this.is("input") || $this.is("textarea")) {
          $this
            .wrap('<div class="label-animation"></div>')
            .addClass("label-processed");
          $("<label>" + $this.attr("placeholder") + "</label>").insertAfter(
            this
          );
        }
      }
      if ($this.val() === "") {
        $this.parent().removeClass("active");
      } else {
        $this.parent().addClass("active");
      }
    })
      .on("focus", function () {
        $(this).parent().addClass("active").addClass("focus");
      })
      .on("focusout", function () {
        $(this).parent().removeClass("focus");
        if ($(this).val() === "") {
          $(this).parent().removeClass("active");
        }
      });
  }, []);

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
                    className="label-animation"
                  />
                </Form.Group>
              </Col>
              <Col lg="2">
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="nº Baia"
                    name="numero_baia"
                    value={filtros.numero_baia}
                    onChange={handleFilterChange}
                    className="label-animation"
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
                    className="label-animation"
                  >
                    <option value="">Castração</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
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
                    className="label-animation"
                  >
                    <option value="">Espécie</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
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
                    className="label-animation"
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
                    className="label-animation"
                  >
                    <option value="">Adoção</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
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
                  <th>Castração</th>
                  <th>Disponível para adoção?</th>
                </tr>
              </thead>
              <tbody>
                {animaisFiltrados.map((animal) => (
                  <tr key={animal.id}>
                    <td>{animal.id}</td>
                    <td>{animal.numero_baia}</td>
                    <td>{animal.nome}</td>
                    <td>{animal.especie}</td>
                    <td>{animal.sexo}</td>
                    <td>{animal.castracao}</td>
                    <td>{animal.adocao}</td>
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
