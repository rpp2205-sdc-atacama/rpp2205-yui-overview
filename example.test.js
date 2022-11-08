function add(a, b) {
  return a + b;
}

describe('setup test', function() {
  test('example test', function() {
    expect(add(1, 5)).toEqual(6);
  })
});