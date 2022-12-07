import http from 'k6/http';
// import { sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 10,
  duration: '30s'
}

export default function() {
  http.get('http://localhost:3000/products/1/styles');
  // sleep(1);
}

