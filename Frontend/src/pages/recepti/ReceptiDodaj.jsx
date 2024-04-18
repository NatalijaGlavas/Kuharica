import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import ReceptService from '../../services/ReceptService';
import AutorService from '../../services/AutorService';
import { useEffect, useState } from 'react';


export default function ReceptiDodaj() {
  const navigate = useNavigate();

  const [autori, setAutori] = useState([]);
  const [autorSifra, setAutorSifra] = useState(0);

  async function dodajRecept(Recept) {
    const odgovor = await ReceptService.dodaj(Recept);
    if (odgovor.ok) {
      navigate(RoutesNames.RECEPTI_PREGLED);
    } else {
      alert(odgovor.poruka.errors);
    }
  }

  async function dohvatiAutori(){
    await AutorService.get().
      then((o)=>{
        setAutori(o.data);
        setAutorSifra(o.data[0].sifra);
      });
  }

  async function ucitaj(){
    await dohvatiAutori();
  }

  useEffect(()=>{
    ucitaj();
  },[]);

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodajRecept({
      naziv: podaci.get('naziv'),
      autorSifra: parseInt(autorSifra),
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
          <Form.Select
          onChange={(e)=>{setAutorSifra(e.target.value)}}
          >
          {autori && autori.map((e,index)=>(
            <option key={index} value={e.sifra}>
              {e.ime} {e.prezime}
            </option>
          ))}
          </Form.Select>
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
