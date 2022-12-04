import axios from 'axios';
import Models from '../server/models.js';
import { Client } from 'pg';
import { success, failure } from './handler';
import theoretically from 'jest-theories';
import theories from './data.js';

console.log(theories)


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

describe('product information', function() {
  let client;

  beforeEach(() => {
    client = new Client();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  theoretically('should return all product level information for a specified product id', theories.productTheories, async (theory) => {
    client.query.mockResolvedValue(theory);
    const model = new Models();
    const product = await model.getProduct({product_id: 1});

    expect(client.connect).toBeCalledTimes(1);
    expect(client.query).toBeCalledWith('SELECT p.id, p.name, p.description, p.slogan, p.category, p.default_price, f.feature, f.value FROM product_info p INNER JOIN features f ON p.id = f.product_id WHERE p.id = $1;', [1]);
    expect(client.end).toBeCalledTimes(1);

    // const response = {
    //   id: 1,
    //   name: 'Camo Onesie',
    //   description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    //   slogan: 'Blend in to your crowd',
    //   category: 'Jackets',
    //   default_price: '140',
    //   features: [
    //     { feature: 'Fabric', value: 'Canvas' },
    //     { feature: 'Buttons', value: 'Brass' }
    //   ]
    // };

    // axios.get.mockResolvedValue(response);
    // const model = new Models();
    // const product = await model.getProduct({product_id: 1});
    // console.log('test product: ', product);
    // expect(product.name).toEqual(expected);
    // expect(product.features).toHaveLength(2);
  });
})

describe('style information', function() {
  let client;

  beforeEach(() => {
    client = new Client();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  theoretically('should return style information for a specific product', theories.styleTheories, async (theory) => {
    client.query.mockResolvedValue(theory.firstQueryValue);
    client.query.mockResolvedValue(theory.secondQueryValue);
    const model = new Models();
    const styles = await model.getStyles({product_id: 1});

    let firstStyle = theory.firstQueryValue.rows[0];
    let secondQueryVal = theory.secondQueryValue.rows[0];

    expect(client.connect).toBeCalledTimes(1);
    expect(client.query).toBeCalledWith('SELECT style_id, name, default_style FROM styles WHERE product_id = $1;', [1]);
    expect(client.end).toBeCalledTimes(1);
    expect(styles.results[0].style_id).toEqual(secondQueryVal.style_id);
    expect(styles.results[0].original_price).toBeDefined();
    expect(styles.results[0].sale_price).toBeDefined();
    expect(styles.results[0].photos[0].thumbnail_url).toBeDefined();
    expect(styles.results[0].photos[0].url).toBeDefined();
    expect(styles.results[0].skus).toBeDefined();
  })
})