import { App } from "../constants"
import { httpService } from "./httpService";

async function getAutori(){
    return await httpService.get('/Autor')
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}



export default{
    getAutori
};