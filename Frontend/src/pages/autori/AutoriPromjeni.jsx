import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AutorService from '../../services/AutorService';
import { RoutesNames } from '../../constants';

export default function AutoriPromjeni() {
  const [autor, setAutor] = useState({});

  const routeParams = useParams();
  const navigate = useNavigate();


  async function dohvatiAutora() {

    await AutorService
      .getBySifra(routeParams.sifra)
      .then((response) => {
        console.log(response);
        setAutor(response.data);
      })
      .catch((err) => alert(err.poruka));

  }

  useEffect(() => {
    dohvatiAutora();
  }, []);

  async function promjeniAutora(autor) {
    const odgovor = await AutorService.promjeni(routeParams.sifra, autor);

    if (odgovor.ok) {
      navigate(RoutesNames.AUTORI_PREGLED);
    } else {
      alert(odgovor.poruka);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    promjeniAutora({
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
            defaultValue={autor.ime}
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='prezime'>
          <Form.Label>Prezime</Form.Label>
          <Form.Control
            type='text'
            name='prezime'
            defaultValue={autor.prezime}
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            defaultValue={autor.email}
            maxLength={255}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='mjesto'>
          <Form.Label>Mjesto</Form.Label>
          <Form.Control
            type='text'
            name='mjesto'
            defaultValue={autor.mjesto}
            maxLength={11}
          />
        </Form.Group>



        <Form.Group className='mb-3' controlId='drzava'>
          <Form.Label>Država</Form.Label>
          <Form.Control
            type='text'
            name='drzava'
            defaultValue={autor.drzava}
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
              Promjeni autora
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
