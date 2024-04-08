import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReceptService from '../../services/ReceptService';
import { RoutesNames } from '../../constants';

export default function ReceptiPromjeni() {
  const [recept, setRecept] = useState({});

  const routeParams = useParams();
  const navigate = useNavigate();


  async function dohvatiRecept() {

    await ReceptService
      .getBySifra(routeParams.sifra)
      .then((response) => {
        console.log(response);
        setRecept(response.data);
      })
      .catch((err) => alert(err.poruka));

  }

  useEffect(() => {
    dohvatiRecept();
  }, []);

  async function promjeniRecept(recept) {
    const odgovor = await ReceptService.promjeni(routeParams.sifra, recept);

    if (odgovor.ok) {
      navigate(RoutesNames.RECEPTI_PREGLED);
    } else {
      alert(odgovor.poruka);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    promjeniRecept({
      naziv: podaci.get('naziv'),
      autor: podaci.get('autor'),
      opis: podaci.get('opis')
      
    });
  }

  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>

      <Form.Group className='mb-3' controlId='naziv'>
          <Form.Label>Naziv</Form.Label>
          <Form.Control
            type='text'
            name='naziv'
            defaultValue={recept.naziv}
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='autor'>
          <Form.Label>Autor</Form.Label>
          <Form.Control
            type='text'
            name='autor'
            defaultValue={recept.autor}
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='opis'>
          <Form.Label>Opis</Form.Label>
          <Form.Control
            type='opis'
            name='opis'
            defaultValue={recept.opis}
            maxLength={255}
          />
        </Form.Group>

        

        <Row>
          <Col>
            <Link className='btn btn-danger gumb' to={RoutesNames.RECEPTI_PREGLED}>
              Odustani
            </Link>
          </Col>
          <Col>
            <Button variant='primary' className='gumb' type='submit'>
              Promjeni recept
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
