import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Table, Modal, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function Especies() {
  const [especies, setEspecies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [especieIdToDelete, setEspecieIdToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/especie/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao remover espécie');
      }
      setEspecies(especies.filter((especie) => especie.id !== id));
      setShowModal(false);
      setErrorMessage(""); // Limpa a mensagem de erro em caso de sucesso
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Erro ao remover espécie:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEspecieIdToDelete(null);
  };

  const handleShowModal = (id) => {
    setShowModal(true);
    setEspecieIdToDelete(id);
  };

  return (
    <>
      <Container className="mt-3">
        <Row className="align-items-center">
          <Col>
            <h2>Espécies</h2>
          </Col>
          <Col className="text-end">
            <Button as={Link} to="/especies/novo" variant="success">
              Cadastrar especie +
            </Button>
            <Button variant="primary" className="ms-2 d-md-none"></Button>
          </Col>
        </Row>
      </Container>

      <Container className="mt-3">
        {errorMessage && (
          <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
            {errorMessage}
          </Alert>
        )}
        <Card>
          <Card.Body className="list pb-0">
            <Table className="m-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Especie</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {especies.map((especie) => (
                  <tr key={especie.id}>
                    <td>{especie.id}</td>
                    <td>{especie.nome}</td>
                    <td className="d-flex align-items-center">
                      <Link to={`/especies/editar/${especie.id}`} className="btn btn-primary m-1">
                        Editar <FaPencilAlt />
                      </Link>
                      <Button variant="danger" onClick={() => handleShowModal(especie.id)} className="m-1">
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
          Tem certeza de que deseja excluir esta espécie?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(especieIdToDelete)}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Especies;
