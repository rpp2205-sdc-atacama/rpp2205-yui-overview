import axios from 'axios';
import Models from '../server/models.js';

jest.mock('axios');

function add(a, b) {
  return a + b;
}

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

describe('style information', function() {
  test('should return style information for a specific product', function() {
    const response = {
      "product_id": "71697",
      "results": [
          {
              "style_id": 444218,
              "name": "Forest Green & Black",
              "original_price": "140.00",
              "sale_price": null,
              "default?": true,
              "photos": [
                  {
                      "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                      "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                  },
                  {
                      "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                      "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
                  },
                  {
                      "thumbnail_url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                      "url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
                  },
                  {
                      "thumbnail_url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                      "url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
                  },
                  {
                      "thumbnail_url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                      "url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                  },
                  {
                      "thumbnail_url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                      "url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                  }
              ],
              "skus": {
                  "2580526": {
                      "quantity": 8,
                      "size": "XS"
                  },
                  "2580527": {
                      "quantity": 16,
                      "size": "S"
                  },
                  "2580528": {
                      "quantity": 17,
                      "size": "M"
                  },
                  "2580529": {
                      "quantity": 10,
                      "size": "L"
                  },
                  "2580530": {
                      "quantity": 15,
                      "size": "XL"
                  },
                  "2580531": {
                      "quantity": 4,
                      "size": "XL"
                  }
              }
          },
      ]
    }
    axios.get.mockResolvedValue(response);
    return axios.get('http://localhost:3000/products/1/styles')
    .then(data => {
      expect(data.results[0].name).toEqual('Forest Green & Black');
      expect(data.results[0].photos).toHaveLength(6);
      expect(data.results[0].skus).toBeDefined();
    })
  })
})