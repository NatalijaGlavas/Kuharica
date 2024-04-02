import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import AutorService from "../../services/AutorService";
import { RoutesNames } from "../../constants";
import { dohvatiPorukeAlert } from "../../services/httpService";

export default function AutoriPromjeni(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [autor,setAutor] = useState({});

    async function dohvatiAutora(){
        const odgovor = await AutorService.getBySifra(routeParams.sifra)
        if(!odgovor.ok){
            alert(dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        setAutor(odgovor.podaci);
    }

    useEffect(()=>{
        //console.log("useEffect")
        dohvatiAutora();
    },[]);

    async function promjeniAutora(autor){
        const odgovor = await AutorService.promjeniAutora(routeParams.sifra,autor);
        if(odgovor.ok){
          navigate(RoutesNames.AUTORI_PREGLED);
          return;
        }
        alert(dohvatiPorukeAlert(odgovor.podaci));
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);

        const autor = 
        {
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email'),
            mjesto: podaci.get('mjesto'),
            drzava: podaci.get('drzava')=='on' ? true: false
          };

          //console.log(JSON.stringify(autor));
          promjeniAutora(autor);
    }


    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={autor.ime}
                        name="ime"
                    />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>prezime</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={autor.prezime}
                        name="prezime"
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={autor.email}
                        name="email"
                    />
                </Form.Group>

                <Form.Group controlId="mjesto">
                    <Form.Label>Mjesto</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={autor.mjesto}
                        name="mjesto"
                    />
                </Form.Group>

                <Form.Group controlId="drzava">
                    <Form.Check 
                        label="Drzava"
                        defaultChecked={autor.drzava}
                        name="drzava"
                    />
                </Form.Group>

                <Row className="akcije">
                    <Col>
                        <Link 
                        className="btn btn-danger"
                        to={RoutesNames.AUTORI_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Promjeni autora
                        </Button>
                    </Col>
                </Row>
                
           </Form>

        </Container>

    );

}