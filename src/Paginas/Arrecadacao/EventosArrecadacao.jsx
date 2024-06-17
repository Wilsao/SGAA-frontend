import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Table, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function Arrecadacao() {
  const [listaArrecadacaoCadastro, setListaArrecadacaoCadastro] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);
  const [filtros, setFiltros] = useState({
    dataInicial: "",
    dataFinal: "",
    descricao: ""
  });

  useEffect(() => {
    const fetchArrecadacao = async () => {
      try {
        const response = await fetch("http://localhost:3001/arrecadacao");
        if (!response.ok) {
          throw new Error('Erro ao buscar eventos de arrecadação');
        }
        const data = await response.json();
        setListaArrecadacaoCadastro(data);
      } catch (error) {
        console.error('Erro ao buscar eventos de arrecadação:', error);
      }
    };
    fetchArrecadacao();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/arrecadacao/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao remover evento de arrecadação');
      }
      setListaArrecadacaoCadastro(listaArrecadacaoCadastro.filter((evento) => evento.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao remover evento de arrecadação:', error);
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

  const filtrarArrecadacao = () => {
    return listaArrecadacaoCadastro.filter(
      (evento) =>
        (filtros.dataInicial === "" || evento.data_evento >= filtros.dataInicial) &&
        (filtros.dataFinal === "" || evento.data_evento <= filtros.dataFinal) &&
        (filtros.descricao === "" || evento.descricao.toLowerCase().includes(filtros.descricao.toLowerCase()))
    );
  };

  const arrecadacaoFiltrada = filtrarArrecadacao();
  const quantidadeEventos = arrecadacaoFiltrada.length;
  const valorTotalArrecadado = arrecadacaoFiltrada.reduce((total, evento) => total + parseFloat(evento.valor_arrecadado), 0);

  return (
    <>
      <Container className="mt-3">
        <Row className="align-items-center">
          <Col>
            <h2>Eventos de arrecadação</h2>
          </Col>
          <Col className="text-end">
            <Button as={Link} to="/eventos-arrecadacao/novo" variant="success">
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
                    name="dataInicial"
                    value={filtros.dataInicial}
                    onChange={handleFilterChange}
                    placeholder="Data Inicial"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="date"
                    name="dataFinal"
                    value={filtros.dataFinal}
                    onChange={handleFilterChange}
                    placeholder="Data Final"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="descricao"
                    value={filtros.descricao}
                    onChange={handleFilterChange}
                    placeholder="Descrição"
                  />
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <p className="mb-0">Quantidade de Eventos: {quantidadeEventos}</p>
          </Col>
          <Col>
            <p className="mb-0">Valor Total Arrecadado: R$ {valorTotalArrecadado.toFixed(2)}</p>
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
                  <th>Valor Arrecadado</th>
                  <th>Descrição</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {arrecadacaoFiltrada.map((evento) => (
                  <tr key={evento.id}>
                    <td>{evento.id}</td>
                    <td>{new Date(evento.data_evento).toLocaleDateString()}</td>
                    <td>R$ {parseFloat(evento.valor_arrecadado).toFixed(2)}</td>
                    <td>{evento.descricao}</td>
                    <td className="d-flex align-items-center">
                      <Link to={`/eventos-arrecadacao/editar/${evento.id}`} className="btn btn-primary m-1">
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
          Tem certeza de que deseja excluir este evento de arrecadação?
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

export default Arrecadacao;
