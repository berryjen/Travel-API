const sum = require('./sum');

test('adds -1 + -7 to equal -8', () => {
  expect(sum(-1, -7)).toBe(-8);
});

/* test('adds 4 + 5 to equal 10', () => {
  expect(sum(4, 5)).toBe(10);
});

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
}); */

