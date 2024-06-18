import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { cpf, cnpj } from 'cpf-cnpj-validator';
import InputMask from 'react-input-mask';

function CuidadorCadastro() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [cuidador, setCuidador] = useState({
    nome: '',
    endereco: '',
    email: '',
    telefone: '',
    tipo_pessoa: 'PF',
    identificacao: '',
  });

  const [erroValidacao, setErroValidacao] = useState('');

  useEffect(() => {
    if (id) {
      const fetchCuidador = async () => {
        try {
          const response = await fetch(`http://localhost:3001/cuidador/${id}`);
          if (!response.ok) {
            throw new Error('Erro ao buscar cuidador');
          }
          const data = await response.json();
          setCuidador(data);
        } catch (error) {
          console.error('Erro ao buscar cuidador:', error);
        }
      };
      fetchCuidador();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuidador({ ...cuidador, [name]: value });
  };

  const getLabelAndMask = () => {
    if (cuidador.tipo_pessoa === 'PF') {
      return {
        label: 'CPF',
        mask: '999.999.999-99',
      };
    } else if (cuidador.tipo_pessoa === 'PJ') {
      return {
        label: 'CNPJ',
        mask: '99.999.999/9999-99',
      };
    }
    return {
      label: 'CPF/CNPJ',
      mask: '',
    };
  };

  const { label, mask } = getLabelAndMask();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cuidador.tipo_pessoa === 'PF') {
      if (!cpf.isValid(cuidador.identificacao)) {
        setErroValidacao('CPF inválido');
        return;
      }
    } else if (cuidador.tipo_pessoa === 'PJ') {
      if (!cnpj.isValid(cuidador.identificacao)) {
        setErroValidacao('CNPJ inválido');
        return;
      }
    }

    setErroValidacao('');

    try {
      const response = await fetch(
        `http://localhost:3001/cuidador${id ? `/${id}` : ''}`,
        {
          method: id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cuidador),
        }
      );

      console.log('Resposta da API:', response);

      if (!response.ok) {
        throw new Error('Erro ao salvar cuidador');
      }

      navigate('/cuidadores');
    } catch (error) {
      console.error('Erro ao salvar cuidador:', error);
    }
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md="8">
          <Card>
            <Card.Body>
              <h2>{id ? "Editar Cuidador" : "Cadastrar Cuidador"}</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={cuidador.nome}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    type="text"
                    name="endereco"
                    value={cuidador.endereco}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={cuidador.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Telefone</Form.Label>
                  <InputMask
                    mask="(99) 99999-9999"
                    type="text"
                    name="telefone"
                    value={cuidador.telefone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo pessoa</Form.Label>
                  <Form.Select
                    name="tipo_pessoa"
                    value={cuidador.tipo_pessoa}
                    onChange={handleChange}
                    required
                  >
                    <option value="PF">PF</option>
                    <option value="PJ">PJ</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{label}</Form.Label>
                  <InputMask
                    mask={mask}
                    type="text"
                    name="identificacao"
                    value={cuidador.identificacao}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  {id ? "Atualizar" : "Cadastrar"}
                </Button>
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => navigate("/cuidadores")}
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

export default CuidadorCadastro;
