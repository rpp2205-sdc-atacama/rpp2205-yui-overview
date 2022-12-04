const productTheories = [
  {
    rows: [
      {
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
      }
    ],
    rowCount: 1
  }
];

const styleTheories = [
  {
    firstQueryValue: {
      rows:
      [
        { style_id: 2, name: 'Desert Brown & Tan', default_style: 0 },
        { style_id: 3, name: 'Ocean Blue & Grey', default_style: 0 },
        { style_id: 1, name: 'Forest Green & Black', default_style: 1 },
        { style_id: 4, name: 'Digital Red & Black', default_style: 0 },
        { style_id: 5, name: 'Sky Blue & White', default_style: 0 },
        { style_id: 6, name: 'Dark Grey & Black', default_style: 0 }
      ],
      rowCount: 6
    },
    secondQueryValue: {
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
      }],
      rowCount: 1
    }
  },
  {
    firstQueryValue: {
      rows:
      [
        { style_id: 2, name: 'Desert Brown & Tan', default_style: 0 },
        { style_id: 3, name: 'Ocean Blue & Grey', default_style: 0 },
        { style_id: 1, name: 'Forest Green & Black', default_style: 1 },
        { style_id: 4, name: 'Digital Red & Black', default_style: 0 },
        { style_id: 5, name: 'Sky Blue & White', default_style: 0 },
        { style_id: 6, name: 'Dark Grey & Black', default_style: 0 }
      ],
      rowCount: 6
    },
    secondQueryValue: {
      rows: [
        {
        style_id: 6,
        original_price: 0,
        sale_price: 21,
        thumbnail_url: 'https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2761&q=80',
        sku_id: 13,
        size: 'XS',
        quantity: 8
      }],
      rowCount: 1
    }
  }
];

module.exports = {
  productTheories: productTheories,
  styleTheories: styleTheories
}