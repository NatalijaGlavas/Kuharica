import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReceptService from "../../services/ReceptService";
import { RoutesNames } from "../../constants";

export default function ReceptiPromjeni(){

    const navigate = useNavigate();
    const routeParams = useParams();
    

    async function dohvatiRecept(){
        await ReceptService.getBySifra(routeParams.sifra)
        .then((res)=>{
            setRecept(res.data)
        })
        .catch((e)=>{
            alert(e.poruka);
        });
    }

    useEffect(()=>{
        //console.log("useEffect")
        dohvatiRecept();
    },[]);

    async function promjeniRecept(recept){
        const odgovor = await ReceptService.promjeniRecept(routeParams.sifra,recept);
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

        const recept = 
        {
            naziv: podaci.get('naziv'),
            autor: podaci.get('autor'),
            opis: podaci.get('opis')
            
          };

          //console.log(JSON.stringify(autor));
          promjeniRecept(recept);
    }


    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={recept.naziv}
                        name="naziv"
                    />
                </Form.Group>

                <Form.Group controlId="autor">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={recept.autor}
                        name="autor"
                    />
                </Form.Group>

                <Form.Group controlId="opis">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={recept.opis}
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
                            Promjeni recept
                        </Button>
                    </Col>
                </Row>
                
           </Form>

        </Container>
    

    );

}