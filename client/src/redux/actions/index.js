import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const addNewTodo = (data) =>{
    axios.post(`$(API_URL)/todos`,(data))
}

