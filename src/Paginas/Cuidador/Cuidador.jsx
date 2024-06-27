import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Table, Modal, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function Cuidadores() {
  const [cuidadores, setCuidadores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cuidadorIdToDelete, setCuidadorIdToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [animaisVinculados, setAnimaisVinculados] = useState([]);
  const [filtros] = useState({
    nome: "",
    endereco: "",
    telefone: ""
  });

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/cuidador/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao remover cuidador');
      }
      setCuidadores(cuidadores.filter((cuidador) => cuidador.id !== id));
      setShowModal(false);
      setErrorMessage("");
      setAnimaisVinculados([]);
    } catch (error) {
      setErrorMessage(error.message);
      setAnimaisVinculados(error.animais || []);
      console.error('Erro ao remover cuidador:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCuidadorIdToDelete(null);
  };

  const handleShowModal = (id) => {
    setShowModal(true);
    setCuidadorIdToDelete(id);
  };

  const filtrarCuidadores = () => {
    return cuidadores
      .filter((cuidador) => cuidador.nome.toLowerCase().includes(filtros.nome.toLowerCase()))
      .filter((cuidador) => cuidador.endereco.toLowerCase().includes(filtros.endereco.toLowerCase()))
      .filter((cuidador) => cuidador.telefone.toLowerCase().includes(filtros.telefone.toLowerCase()));
  };

  const cuidadoresFiltrados = filtrarCuidadores();

  return (
    <>
      <Container className="mt-3">
        <Row className="align-items-center">
          <Col>
            <h2>Cuidadores</h2>
          </Col>
          <Col className="text-end">
            <Button as={Link} to="/cuidadores/novo" variant="success">
              Cadastrar +
            </Button>
            <Button variant="primary" className="ms-2 d-md-none"></Button>
          </Col>
        </Row>
      </Container>

      <Container className="mt-3">
        {errorMessage && (
          <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
            {errorMessage}
            {animaisVinculados.length > 0 && (
              <ul>
                {animaisVinculados.map((animal, index) => (
                  <li key={index}>{animal}</li>
                ))}
              </ul>
            )}
          </Alert>
        )}
        <Card>
          <Card.Body className="list pb-0">
            <Table className="m-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Endereço</th>
                  <th>Telefone</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cuidadoresFiltrados.map((cuidador) => (
                  <tr key={cuidador.id}>
                    <td>{cuidador.id}</td>
                    <td>{cuidador.nome}</td>
                    <td>{cuidador.endereco}</td>
                    <td>{cuidador.telefone}</td>
                    <td className="d-flex align-items-center">
                      <Link to={`/cuidadores/editar/${cuidador.id}`} className="btn btn-primary m-1">
                        Editar <FaPencilAlt />
                      </Link>
                      <Button variant="danger" onClick={() => handleShowModal(cuidador.id)} className="m-1">
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
          Tem certeza de que deseja excluir este cuidador?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(cuidadorIdToDelete)}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cuidadores;
