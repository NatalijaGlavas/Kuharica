import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import AutorService from '../../services/AutorService';


export default function AutoriDodaj() {
  const navigate = useNavigate();


  async function dodajAutor(Autor) {
    const odgovor = await AutorService.dodaj(Autor);
    if (odgovor.ok) {
      navigate(RoutesNames.AUTORI_PREGLED);
    } else {
      alert(odgovor.poruka.errors);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodajAutor({
      ime: podaci.get('ime'),
      prezime: podaci.get('prezime'),
      email: podaci.get('email'),
      mjesto: podaci.get('mjesto'),
      drzava: podaci.get('drzava')
    });
  }

  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='ime'>
          <Form.Label>Ime</Form.Label>
          <Form.Control
            type='text'
            name='ime'
            placeholder='Ime autora'
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='prezime'>
          <Form.Label>Prezime</Form.Label>
          <Form.Control
            type='text'
            name='prezime'
            placeholder='Prezime autora'
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Email autora'
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



        <Form.Group className='mb-3' controlId='drzava'>
          <Form.Label>DRZAVA</Form.Label>
          <Form.Control
            type='text'
            name='drzava'
            placeholder='Država autora'
          />
        </Form.Group>

       

        <Row>
          <Col>
            <Link className='btn btn-danger gumb' to={RoutesNames.AUTORI_PREGLED}>
              Odustani
            </Link>
          </Col>
          <Col>
            <Button variant='primary' className='gumb' type='submit'>
              Dodaj autora
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
