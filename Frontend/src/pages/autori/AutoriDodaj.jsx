import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import AutorService from "../../services/AutorService";
import { dohvatiPorukeAlert } from "../../services/httpService";

export default function AutoriDodaj(){
    const navigate = useNavigate();


    async function dodajAutora(autor){
        const odgovor = await AutorService.dodajAutora(autor);
        if(odgovor.ok){
          navigate(RoutesNames.AUTORI_PREGLED);
          return
        }

        alert(dohvatiPorukeAlert(odgovor.podaci));
        
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        //console.log(podaci.get('naziv'));

        const autor = 
        {
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email'),
            mjesto: podaci.get('mjesto'),
            drzava: podaci.get('drzava')=='on' ? true: false
          };

          //console.log(JSON.stringify(smjer));
          dodajAutora(autor);


    }

    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control 
                        type="text"
                        name="ime"
                    />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control 
                        type="text"
                        name="prezime"
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="text"
                        name="email"
                    />
                </Form.Group>

                <Form.Group controlId="mjesto">
                    <Form.Label>Mjesto</Form.Label>
                    <Form.Control 
                        type="text"
                        name="mjesto"
                    />
                </Form.Group>

                <Form.Group controlId="drzava">
                    <Form.Check 
                        label="Drzava"
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
                            Dodaj autora
                        </Button>
                    </Col>
                </Row>
                
           </Form>

        </Container>

    );

}