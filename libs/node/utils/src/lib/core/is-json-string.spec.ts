import { tryParseJSONObject } from './is-json-string';

describe('Testing tryParseJSONObject', () => {
  it('Passing an empty json string', () => {
    const val = tryParseJSONObject('{}');
    expect(val).toBeDefined();
    expect(typeof val).toBe('object');
  });

  it('Passing a one level json string', () => {
    const val = tryParseJSONObject(
      '{"value":1, "string": "due", "boolean": true}'
    );
    expect(val).toBeDefined();
    expect(typeof val).toBe('object');
  });

  it('Passing a two level json string', () => {
    const val = tryParseJSONObject(
      '{"value":1, "string": "due", "boolean": true, "nested":{"value":1, "string": "due", "boolean": true}}'
    );
    expect(val).toBeDefined();
    expect(typeof val).toBe('object');
  });

  it('Passing a string should throw', () => {
    const val = tryParseJSONObject('Testing');
    expect(val).not.toBeDefined();
  });

  it('Passing a string should throw', () => {
    const val = tryParseJSONObject('true');
    expect(val).not.toBeDefined();
  });
});
