import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import AutorSrvice from "../../services/AutorService";

export default function AutoriDodaj(){
    const navigate = useNavigate();


    async function dodajAutora(autor){
        const odgovor = await AutorSrvice.dodajAutora(autor);
        if(odgovor.ok){
          navigate(RoutesNames.AUTORI_PREGLED);
        }else{
          console.log(odgovor);
          alert(odgovor.poruka);
        }
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
            drzava: podaci.get('drzava')
          };

          //console.log(JSON.stringify(autor));
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
                    <Form.Label>Trajanje</Form.Label>
                    <Form.Control 
                        type="text"
                        name="prezime"
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control 
                        type="text"
                        name="email"
                    />
                </Form.Group>

                <Form.Group controlId="mjesto">
                    <Form.Label>Upisnina</Form.Label>
                    <Form.Control 
                        type="text"
                        name="mjesto"
                    />
                </Form.Group>

                <Form.Group controlId="drzava">
                    <Form.Check 
                        label="text"
                        name="drzava"
                    />
                </Form.Group>

                <Row className="akcije">
                    <Col>
                        <Link 
                        className="btn btn-danger"
                        to={RoutesNames.AUTOR_PREGLED}>Odustani</Link>
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