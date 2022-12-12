import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 10,
  duration: '30s'
}


const BASE_URL = 'http://localhost:3000';
export default function() {
  group('get product information', function() {
    http.get(`${BASE_URL}/products/1`);
  });
  group('get styles for a product', function() {
    http.get(`${BASE_URL}/products/1/styles`);
  })
  // let res = http.batch([
  //   ['GET', `${BASE_URL}/products/1`],
  //   ['GET', `${BASE_URL}/products/1/styles`]
  // ])

  // check(res[0], {
  //   'get product success': (r) => r.status== 200
  // });
  // check(res[1], {
  //   'get styles success': (r) => r.status== 200
  // });
}

