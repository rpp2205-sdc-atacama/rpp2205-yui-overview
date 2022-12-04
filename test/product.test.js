import axios from 'axios';
import Models from '../server/models.js';
import { Client } from 'pg';
import { success, failure } from './handler';

jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

jest.mock('./handler.js', () => {
  return {
    success: jest.fn(),
    failure: jest.fn(),
  };
})


function add(a, b) {
  return a + b;
}

describe('setup test', function() {
  test('example test', function() {
    expect(add(1, 5)).toEqual(6);
  })
});

// describe('product information', function() {
//   test('should return all product level information for a specified product id', async function() {
//     const expected = 'Camo Onesie';

//     const response = {
//       id: 1,
//       name: 'Camo Onesie',
//       description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
//       slogan: 'Blend in to your crowd',
//       category: 'Jackets',
//       default_price: '140',
//       features: [
//         { feature: 'Fabric', value: 'Canvas' },
//         { feature: 'Buttons', value: 'Brass' }
//       ]
//     };

//     axios.get.mockResolvedValue(response);
//     const model = new Models();
//     const product = await model.getProduct({product_id: 1});
//     console.log('test product: ', product);
//     expect(product.name).toEqual(expected);
//     expect(product.features).toHaveLength(2);
//   });
// })

describe('style information', function() {
  let client;

  beforeEach(() => {
    client = new Client();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return style information for a specific product', async function() {

    client.query.mockResolvedValue({ rows:
    [
      { style_id: 2, name: 'Desert Brown & Tan', default_style: 0 },
      { style_id: 3, name: 'Ocean Blue & Grey', default_style: 0 },
      { style_id: 1, name: 'Forest Green & Black', default_style: 1 },
      { style_id: 4, name: 'Digital Red & Black', default_style: 0 },
      { style_id: 5, name: 'Sky Blue & White', default_style: 0 },
      { style_id: 6, name: 'Dark Grey & Black', default_style: 0 }
    ], rowCount: 6 });

    client.query.mockResolvedValue({
      rows: [
        {
        style_id: 3,
        original_price: 140,
        sale_price: 100,
        thumbnail_url: 'https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2761&q=80',
        sku_id: 13,
        size: 'XS',
        quantity: 8
      },
      {
        style_id: 3,
        original_price: 140,
        sale_price: 100,
        thumbnail_url: 'https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2761&q=80',
        sku_id: 14,
        size: 'S',
        quantity: 16
      }]
    });
    const model = new Models();
    const styles = await model.getStyles({product_id: 1});

    expect(client.connect).toBeCalledTimes(1);
    expect(client.query).toBeCalledWith('SELECT style_id, name, default_style FROM styles WHERE product_id = $1;', [1]);
    expect(client.end).toBeCalledTimes(1);
    expect(styles.results[0].style_id).toBeDefined();
    expect(styles.results[0].original_price).toBeDefined();
    expect(styles.results[0].sale_price).toBeDefined();
    expect(styles.results[0].thumbnail_url).toBeDefined();
    expect(styles.results[0].url).toBeDefined();
    expect(styles.results[0].sku_id).toBeDefined();
    expect(styles.results[0].size).toBeDefined();
    expect(styles.results[0].quantity).toBeDefined();




    // axios.get.mockResolvedValue(response);
    // const model = new Models();
    // const styles = await model.getStyles({product_id: 1});
    // console.log('test styles: ', styles);
    // expect(styles.results).toHaveLength(6);
    // expect(styles.results[0].style_id).toBeDefined();
    // expect(styles.results[0].name).toBeDefined();
    // expect(styles.results[0]['default?']).toBeDefined();
    // expect(styles.results[0].photos).toBeDefined();
    // expect(styles.results[0].skus).toBeDefined();
    // expect(styles.results[0].original_price).toBeDefined();
    // expect(styles.results[0].sale_price).toBeDefined();
  })
})