import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import ReceptService from '../../services/ReceptService';


export default function ReceptiDodaj() {
  const navigate = useNavigate();


  async function dodajRecept(Recept) {
    const odgovor = await ReceptService.dodaj(Recept);
    if (odgovor.ok) {
      navigate(RoutesNames.RECEPTI_PREGLED);
    } else {
      alert(odgovor.poruka.errors);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodajRecept({
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
            placeholder='Naziv recepta'
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='autor'>
          <Form.Label>Autor</Form.Label>
          <Form.Control
            type='text'
            name='autor'
            placeholder='Autor'
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='opis'>
          <Form.Label>Opis</Form.Label>
          <Form.Control
            type='opis'
            name='opis'
            placeholder='Opis recepta'
            maxLength={255}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='mjesto'>
          <Form.Label>MJESTO</Form.Label>
          <Form.Control
            type='text'
            name='mjesto'
            placeholder='Mjesto autora'
            maxLength={11}
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
              Dodaj recept
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
