import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import ReceptService from "../../services/ReceptService";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function Recepti(){
    const [recepti,setRecepti] = useState();

    async function dohvatiRecepte(){
        await ReceptService.getRecepti()
        .then((res)=>{
            setRecepti(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }
     // Ovo se poziva dvaput u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    useEffect(()=>{
        dohvatiRecepte();
    },[]);




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
                        
                    
                        
                    </tr>
                </thead>
                <tbody>
                    {recepti && recepti.map((recept,index)=>(
                        <tr key={index}>
                            <td>{recept.naziv}</td>
                            <td>{recept.autor}</td>
                            <td>{recept.opis}</td>
                            
                           
                           
                            <td className="sredina">
                                <Link to={RoutesNames.RECEPTI_PROMJENI}>
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