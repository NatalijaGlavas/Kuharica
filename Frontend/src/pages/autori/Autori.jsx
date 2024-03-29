import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import AutorService from "../../services/AutorService";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function Autori(){
    const [autori,setAutori] = useState();

    async function dohvatiAutore(){
        await AutorService.getAutori()
        .then((res)=>{
            setAutori(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }
     // Ovo se poziva dvaput u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    useEffect(()=>{
        dohvatiAutore();
    },[]);




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
                        <th>Drzava</th>
                        
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
                                <Link to={RoutesNames.AUTORI_PROMJENI}>
                                    <FaEdit 
                                    size={25}
                                    />
                                </Link>
                                
                                    &nbsp;&nbsp;&nbsp;
                                <Link>
                                    <FaTrash  
                                    size={25}
                                    />
                                </Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}