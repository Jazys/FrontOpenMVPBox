import axios from 'axios';

let apiKey:string|null="";

if(typeof localStorage !== 'undefined' )
{    
    if(localStorage.getItem('apiKey') != null)
      apiKey=localStorage.getItem('apiKey');
}

const http = axios.create({
    baseURL: import.meta.env.VITE_URL_SRV,
    headers: { 'Accept': "application/json",'Content-Type': 'application/json', 'api-key':apiKey},   
  })

export default http;