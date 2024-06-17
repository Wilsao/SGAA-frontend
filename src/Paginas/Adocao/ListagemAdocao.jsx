import React, { useState, useEffect } from "react";
import { Container, Card, Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye, FaTrashAlt } from "react-icons/fa";

function FormulariosAdocao() {
  const [formularios, setFormularios] = useState([]);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [formularioToDelete, setFormularioToDelete] = useState(null);

  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        const response = await fetch("http://localhost:3001/adocao");
        if (!response.ok) {
          throw new Error("Erro ao buscar formulários de adoção");
        }
        const data = await response.json();
        setFormularios(data);
      } catch (error) {
        console.error("Erro ao buscar formulários de adoção:", error);
      }
    };
    fetchFormularios();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/adocao/${formularioToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao remover formulário de adoção");
      }
      setFormularios(formularios.filter((formulario) => formulario.id !== formularioToDelete));
      setShowConfirmAlert(false);
    } catch (error) {
      console.error("Erro ao remover formulário de adoção:", error);
    }
  };

  const confirmDelete = (id) => {
    setFormularioToDelete(id);
    setShowConfirmAlert(true);
  };

  return (
    <>
      <Container className="mt-3">
        <h2>Formulários de Adoção</h2>
      </Container>

      <Container className="mt-2">
        <Card>
          <Card.Body className="list pb-0">
            <Table className="m-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome Adotante</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Cidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {formularios.map((formulario) => (
                  <tr key={formulario.id}>
                    <td>{formulario.id}</td>
                    <td>{formulario.nome}</td>
                    <td>{formulario.email}</td>
                    <td>{formulario.telefone}</td>
                    <td>{formulario.cidade}</td>
                    <td className="d-flex align-items-center">
                      <Link to={`/adocao/${formulario.id}`} className="btn btn-primary view m-1">
                        Visualizar <FaEye />
                      </Link>
                      <Button
                        variant="danger"
                        className="m-1"
                        onClick={() => confirmDelete(formulario.id)}
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
          <p>Deseja realmente excluir este formulário de adoção?</p>
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

export default FormulariosAdocao;
