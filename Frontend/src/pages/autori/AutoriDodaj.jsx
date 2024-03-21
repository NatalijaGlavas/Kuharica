import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import AutorSrvice from "../../services/AutorService";

export default function AutoriDodaj(){
    const navigate = useNavigate();


    async function dodajAutor(autor){
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
            drzava: podaci.get('verificiran')
          };

          //console.log(JSON.stringify(autor));
          dodajAutor(autor);


    }

    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

                <Form.Autor controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control 
                        type="text"
                        name="ime"
                    />
                </Form.Autor>

                <Form.Autor controlId="prezime">
                    <Form.Label>Trajanje</Form.Label>
                    <Form.Control 
                        type="text"
                        name="prezime"
                    />
                </Form.Autor>

                <Form.Autor controlId="email">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control 
                        type="text"
                        name="email"
                    />
                </Form.Autor>

                <Form.Autor controlId="mjesto">
                    <Form.Label>Upisnina</Form.Label>
                    <Form.Control 
                        type="text"
                        name="mjesto"
                    />
                </Form.Autor>

                <Form.Autor controlId="drzava">
                    <Form.Check 
                        label="text"
                        name="drzava"
                    />
                </Form.Autor>

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