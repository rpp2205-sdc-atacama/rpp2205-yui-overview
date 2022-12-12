import axios from 'axios';
import Models from '../server/models.js';
import { Client, Pool } from 'pg';
import { success, failure } from './handler';
import theoretically from 'jest-theories';
import theories from './data.js';

jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };

  const mPool = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
    release: jest.fn()
  }
  return { Client: jest.fn(() => mClient), Pool: jest.fn(() => mPool) };
});

jest.mock('./handler.js', () => {
  return {
    success: jest.fn(),
    failure: jest.fn(),
  };
})

describe('product information', function() {
  let client;
  let pool;

  beforeEach(() => {
    client = new Client();
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  theoretically('should return all product level information for a specified product id', theories.productTheories, async (theory) => {
    pool.query.mockResolvedValue(theory);
    const model = new Models();
    const product = await model.getProduct({product_id: 1});

    expect(pool.connect).toBeCalledTimes(1);
    expect(pool.query).toBeCalledWith('SELECT p.id, p.name, p.description, p.slogan, p.category, p.default_price, f.feature, f.value FROM product_info p INNER JOIN features f ON p.id = f.product_id WHERE p.id = $1;', [1]);
    expect(pool.end).toBeCalledTimes(1);
    expect(product.id).toBeDefined();
    expect(product.name).toBeDefined();
    expect(product.description).toBeDefined();
    expect(product.slogan).toBeDefined();
    expect(product.category).toBeDefined();
    expect(product.default_price).toBeDefined();
    expect(product.features).toBeDefined();
  });
})

describe('style information', function() {
  let client;
  let pool;


  beforeEach(() => {
    client = new Client();
    pool = new Pool();

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  theoretically('should return style information for a specific product', theories.styleTheories, async (theory) => {
    pool.query.mockResolvedValue(theory.firstQueryValue);
    pool.query.mockResolvedValue(theory.secondQueryValue);
    const model = new Models();
    const styles = await model.getStyles({product_id: 1});

    let firstStyle = theory.firstQueryValue.rows[0];
    let secondQueryVal = theory.secondQueryValue.rows[0];

    expect(pool.connect).toBeCalledTimes(1);
    expect(pool.query).toBeCalledWith('SELECT style_id, name, default_style FROM styles WHERE product_id = $1;', [1]);
    expect(pool1.end).toBeCalledTimes(1);
    expect(styles.results[0].style_id).toEqual(secondQueryVal.style_id);
    expect(styles.results[0].original_price).toBeDefined();
    expect(styles.results[0].sale_price).toBeDefined();
    expect(styles.results[0].photos[0].thumbnail_url).toBeDefined();
    expect(styles.results[0].photos[0].url).toBeDefined();
    expect(styles.results[0].skus).toBeDefined();
  })
})