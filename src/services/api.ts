// @ts-ignore
import { BASE_URL, PUBLIC_KEY, PRIVATE_KEY } from '@env';
import axios from 'axios';
import md5 from 'md5';

const publicKey = PUBLIC_KEY;
const privateKey = PRIVATE_KEY;
const timestamp = new Date().getTime(); 
const hash = md5( timestamp + privateKey + publicKey );

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: publicKey,
    ts: timestamp,
    hash: hash,
  }
});

export default api;