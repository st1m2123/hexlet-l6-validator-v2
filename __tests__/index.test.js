// @ts-check

import { test } from 'node:test';
import assert from 'assert/strict';
import Validator from '../index.js';

test('step1', () => {
  const v = new Validator();
  const schema = v.string();

  assert.equal(schema.isValid(null), false);
  assert.equal(schema.isValid(true), false);
  assert.equal(schema.isValid(123), false);
  assert.equal(schema.isValid('0'), true);
  assert.equal(schema.isValid(''), true);
  assert.equal(schema.isValid('Hexlet'), true);

  const schema1 = v.string();
  assert.equal(schema1.isValid('Hexlet'), true);

  const schema2 = v.string().containsNumber();
  assert.equal(schema2.isValid('Hexlet'), false);
  assert.equal(schema2.isValid('Hexlet!1!!1!!!!'), true);
});

test('step2', () => {
  const v = new Validator();

  const schema1 = v.array();
  assert.equal(schema1.isValid([]), true);
  assert.equal(schema1.isValid(['1', '2']), true);
  assert.equal(schema1.isValid(12), false);
  assert.equal(schema1.isValid({}), false);
});

test('step3', () => {
  const v = new Validator();

  const schema1 = v.array().custom((element) => element.length > 3);
  assert.equal(schema1.isValid(['Hi']), false);
  assert.equal(schema1.isValid(['Hi1']), false);
  assert.equal(schema1.isValid(['Holla']), true);
});

test('step4', () => {
  const v = new Validator();

  const schema = v.object().shape({
    str: v.string(),
    obj: {
      array: v.array(),
      innerObj: {
        str: v.string().containsNumber(),
        deepestObj: {
          str: v.string(),
        },
      },
    },
  });

  assert.deepEqual((schema.isValid({
    str: 'Hey',
    obj: {
      array: ['1', '2'],
      innerObj: {
        str: 'Hey_Again1',
        deepestObj: { str: 'Hey_Hey' },
      },
    },
  })), true);

  assert.deepEqual(schema.isValid({}), false);
  assert.deepEqual(schema.isValid('not object'), false);
  assert.deepEqual(schema.isValid(1), false);

  assert.deepEqual((schema.isValid({
    str: 'Hey',
    wrong: 'this',
    obj: {
      array: ['1', '2'],
      innerObj: {
        str: 'Hey_Again1',
        deepestObj: { str: 'Hey_Hey' },
      },
    },
  })), false);
});
