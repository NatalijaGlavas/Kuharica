import  { httpService, obradiGresku, obradiUspjeh } from "./httpService";

async function getAutori(){
    return await httpService.get('/Autor')
        .then((res)=>{
            return obradiUspjeh(res);
        }).catch((e)=>{
            return obradiGresku(e);
        });
}

async function obrisiAutora(sifra){
    return await httpService.delete('/Autor/' + sifra)
        .then((res)=>{
            return obradiUspjeh(res);
        }).catch((e)=>{
            return obradiGresku(e);
        });
}

async function dodajAutora(autor){
    return await httpService.post('/Autor',autor)
        .then((res)=>{
            return obradiUspjeh(res);
        }).catch((e)=>{
            return obradiGresku(e);
        });
}

async function promjeniAutora(sifra,autor){
    return await httpService.put('/Autor/'+sifra,autor)
        .then((res)=>{
            return obradiUspjeh(res);
        }).catch((e)=>{
            return obradiGresku(e);
        });
}

async function getBySifra(sifra){
    return await httpService.get('/Autor/' + sifra)
        .then((res)=>{
            return obradiUspjeh(res);
        }).catch((e)=>{
            return obradiGresku(e);
        });
}



export default{
    getAutori,
    obrisiAutora,
    dodajAutora,
    promjeniAutora,
    getBySifra
};