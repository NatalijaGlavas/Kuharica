import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import ReceptSrvice from "../../services/ReceptService";

export default function ReceptiDodaj(){
    const navigate = useNavigate();


    async function dodajRecept(recept){
        const odgovor = await ReceptSrvice.dodajRecept(recept);
        if(odgovor.ok){
          navigate(RoutesNames.RECEPTI_PREGLED);
        }else{
          console.log(odgovor);
          alert(odgovor.poruka);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        //console.log(podaci.get('naziv'));

        const recept = 
        {
            naziv: podaci.get('ime'),
            autor: podaci.get('prezime'),
            opis: podaci.get('email')
           
          };

          //console.log(JSON.stringify(autor));
          dodajRecept(recept);


    }

    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control 
                        type="text"
                        name="naziv"
                    />
                </Form.Group>

                <Form.Group controlId="autor">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control 
                        type="text"
                        name="autor"
                    />
                </Form.Group>

                <Form.Group controlId="opis">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control 
                        type="text"
                        name="opis"
                    />
                </Form.Group>


                <Row className="akcije">
                    <Col>
                        <Link 
                        className="btn btn-danger"
                        to={RoutesNames.RECEPTI_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Dodaj recept
                        </Button>
                    </Col>
                </Row>
                
           </Form>

        </Container>




   

     
       

    );

}