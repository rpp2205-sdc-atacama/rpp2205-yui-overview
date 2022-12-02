import axios from 'axios';
import Models from '../server/models.js';

jest.mock('axios');

function add(a, b) {
  return a + b;
}

// beforeAll(done => {
//   done();
// })

// afterAll(done => {
//   done();
// })

describe('setup test', function() {
  test('example test', function() {
    expect(add(1, 5)).toEqual(6);
  })
});

describe('product information', function() {
  test('should return all product level information for a specified product id', async function() {
    const expected = 'Camo Onesie';

    const response = {
      id: 1,
      name: 'Camo Onesie',
      description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
      slogan: 'Blend in to your crowd',
      category: 'Jackets',
      default_price: '140',
      features: [
        { feature: 'Fabric', value: 'Canvas' },
        { feature: 'Buttons', value: 'Brass' }
      ]
    };

    axios.get.mockResolvedValue(response);
    return axios.get('http://localhost:3000/products/1')
    .then(data => {
      expect(data.name).toEqual(expected);
      expect(data.features).toHaveLength(2);
    })
  });
})

