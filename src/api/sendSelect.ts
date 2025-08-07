import axios from 'axios';

const base = '/api';               // proxy в .htaccess остаётся

export const sendStart = (sessionId: string) =>
  axios.post(`${base}/send-select.php`, { sessionId });

export const sendProgress = (body: any) =>
  axios.post(`${base}/send-select.php`, body);

export const sendFinish = (body: any) =>
  axios.post(`${base}/send-select.php`, body);
