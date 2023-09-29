import axios from 'axios';

import {ADDNEW_TODO} from './type';

const API_URL = 'http://localhost:8000';

export const addNewTodo = (data)=>async(dispatch) =>{
    try{
        const res = await axios.post(`${API_URL}/todos`,(data));
        dispatch({type: ADDNEW_TODO, paload: res.data})
    }catch(error){
        console.log("Erro while calling addNewTodo",error.message);
    }

    
}

