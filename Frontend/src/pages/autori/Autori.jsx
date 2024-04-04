import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import AutorService from "../../services/AutorService";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function Autori(){
    const [autori, setAutori] = useState();
    let navigate = useNavigate(); 

    async function dohvatiAutore(){
        await AutorService.get()
        .then((res)=>{
            setAutori(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }

    useEffect(()=>{
        dohvatiAutore();
    },[]);



    async function obrisiAutor(sifra) {
        const odgovor = await AutorService.obrisi(sifra);
    
        if (odgovor.ok) {
            dohvatiAutore();
        } else {
          alert(odgovor.poruka);
        }
      }

    return (

        <Container>
            <Link to={RoutesNames.AUTORI_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Email</th>
                        <th>Mjesto</th>
                        <th>Država</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {autori && autori.map((autor,index)=>(
                        <tr key={index}>
                            <td>{autor.ime}</td>
                            <td>{autor.prezime}</td>
                            <td>{autor.email}</td>
                            <td>{autor.mjesto}</td>
                            <td>{autor.drzava}</td>
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/autori/${autor.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiAutor(autor.sifra)}
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