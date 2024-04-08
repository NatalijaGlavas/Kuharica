import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import ReceptService from "../../services/ReceptService";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function Recepti(){
    const [recepti, setRecepti] = useState();
    let navigate = useNavigate(); 

    async function dohvatiRecepte(){
        await ReceptService.get()
        .then((res)=>{
            setRecepti(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }

    useEffect(()=>{
        dohvatiRecepte();
    },[]);



    async function obrisiRecept(sifra) {
        const odgovor = await ReceptService.obrisi(sifra);
    
        if (odgovor.ok) {
            dohvatiRecepte();
        } else {
          alert(odgovor.poruka);
        }
      }

    return (

        <Container>
            <Link to={RoutesNames.RECEPTI_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Autor</th>
                        <th>Opis</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {recepti && recepti.map((recept,index)=>(
                        <tr key={index}>
                            <td>{recept.naziv}</td>
                            <td>{recept.autor}</td>
                            <td>{recept.opis}</td>
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/recepti/${recept.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiRecept(recept.sifra)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}