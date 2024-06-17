import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Table, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function EventosCastracao() {
  const [eventos, setEventos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);
  const [filtros, setFiltros] = useState({
    data_evento: "",
    tipo_animal: "",
    sexo_animal: ""
  });

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch("http://localhost:3001/castracao");
        if (!response.ok) {
          throw new Error('Erro ao buscar eventos de castração');
        }
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        console.error('Erro ao buscar eventos de castração:', error);
      }
    };
    fetchEventos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/castracao/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao remover evento de castração');
      }
      setEventos(eventos.filter((evento) => evento.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao remover evento de castração:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEventIdToDelete(null);
  };

  const handleShowModal = (id) => {
    setShowModal(true);
    setEventIdToDelete(id);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const filtrarEventos = () => {
    return eventos.filter(
      (evento) =>
        (filtros.data_evento === "" ||
          new Date(evento.data_evento).toLocaleDateString().includes(filtros.data_evento)) &&
        (filtros.tipo_animal === "" || evento.tipo_animal.toLowerCase().includes(filtros.tipo_animal.toLowerCase())) &&
        (filtros.sexo_animal === "" || evento.sexo_animal.toLowerCase().includes(filtros.sexo_animal.toLowerCase()))
    );
  };

  const eventosFiltrados = filtrarEventos();

  return (
    <>
      <Container className="mt-3">
        <Row className="align-items-center">
          <Col>
            <h2>Eventos de castração</h2>
          </Col>
          <Col className="text-end">
            <Button as={Link} to="/eventos-castracao/novo" variant="success">
              Cadastrar evento +
            </Button>
            <Button variant="primary" className="ms-2 d-md-none"></Button>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Form>
              <Row className="align-items-end">
                <Col>
                  <Form.Control
                    type="date"
                    name="data_evento"
                    value={filtros.data_evento}
                    onChange={handleFilterChange}
                    placeholder="Data do Evento"
                  />
                </Col>
                <Col>
                  <Form.Select
                    name="tipo_animal"
                    value={filtros.tipo_animal}
                    onChange={handleFilterChange}
                    placeholder="Tipo de Animal"
                  >
                    <option value="">Tipo de Animal</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    name="sexo_animal"
                    value={filtros.sexo_animal}
                    onChange={handleFilterChange}
                    placeholder="Sexo do Animal"
                  >
                    <option value="">Sexo do Animal</option>
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container className="mt-3">
        <Card>
          <Card.Body className="list pb-0">
            <Table className="m-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data do Evento</th>
                  <th>Tipo de Animal</th>
                  <th>Sexo do Animal</th>
                  <th>Quantidade Castrada</th>
                  <th>Local do Evento</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {eventosFiltrados.map((evento) => (
                  <tr key={evento.id}>
                    <td>{evento.id}</td>
                    <td>{new Date(evento.data_evento).toLocaleDateString()}</td>
                    <td>{evento.tipo_animal}</td>
                    <td>{evento.sexo_animal}</td>
                    <td>{evento.quantidade_castrada}</td>
                    <td>{evento.local_evento}</td>
                    <td className="d-flex align-items-center">
                      <Link to={`/eventos-castracao/editar/${evento.id}`} className="btn btn-primary m-1">
                        Editar <FaPencilAlt />
                      </Link>
                      <Button variant="danger" onClick={() => handleShowModal(evento.id)} className="m-1">
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir este evento de castração?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(eventIdToDelete)}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EventosCastracao;
