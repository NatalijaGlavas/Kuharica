import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReceptService from '../../services/ReceptService';
import { RoutesNames } from '../../constants';
import AutorService from '../../services/AutorService';

export default function ReceptiPromjeni() {
  const [recept, setRecept] = useState({});

  const routeParams = useParams();
  const navigate = useNavigate();

  const [autori, setAutori] = useState([]);
  const [autorSifra, setAutorSifra] = useState(0);

  async function dohvatiRecept() {
    await ReceptService
      .getBySifra(routeParams.sifra)
      .then((response) => {
        let recept = response.data
        setRecept(response.data);
        setAutorSifra(recept.autorSifra)
      })
      .catch((err) => alert(err.poruka));

  }

  async function dohvatiAutori(){
    await AutorService.get().
      then((o)=>{
        setAutori(o.data);
        setAutorSifra(o.data[0].sifra);
      });
  }

  async function dohvatiInicijalnePodatke() {
    await dohvatiAutori();
    await dohvatiRecept();
   
  }

  useEffect(() => {
    dohvatiInicijalnePodatke();
  }, []);

  async function promjeniRecept(recept) {
    const odgovor = await ReceptService.promjeni(routeParams.sifra, recept);
    if (odgovor.ok) {
      navigate(RoutesNames.RECEPTI_PREGLED);
      return;
    }
      alert(odgovor.poruka);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    promjeniRecept({
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
            defaultValue={recept.naziv}
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='autor'>
          <Form.Label>Autor</Form.Label>
          <Form.Select
             value={autorSifra}
             onChange={(e) => {
              setAutorSifra(e.target.value);
             }}
          >
            {autori &&
              autori.map((autor, index) => (
                <option key={index} value={autor.sifra}>
                  {autor.ime} {autor.prezime}
                </option>
              ))}
          </Form.Select>
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
