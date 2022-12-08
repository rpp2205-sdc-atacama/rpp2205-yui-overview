import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 10,
  duration: '1s'
}


const BASE_URL = 'http://localhost:3000';
export default function() {
  let res = http.batch([
    ['GET', `${BASE_URL}/products/1`],
    // ['GET', `${BASE_URL}/products/1/styles`]
  ])
  // const test = http.get('http://localhost:3000/products/1/styles');
  check(res[0], {
    'get product success': (r) => r.status== 200
  });
  // check(res[1], {
  //   'get style success': (r) => r.status== 200
  // });
  // sleep(1);
}

