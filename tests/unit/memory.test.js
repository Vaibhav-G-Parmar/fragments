// tests/unit/memory.test.js

//testing the following async functions 
const { readFragment, writeFragment, readFragmentData, writeFragmentData } = require('../../src/model/data/memory')

describe('memory', () => {
  
  test("readFragment() reads a fragment's metadata from memory db that was written", async () => {
    const data = { ownerId: '123', id: '1', fragment: 'for readFragment test' };
    await writeFragment(data);
    const result = await readFragment('123', '1');
    expect(result).toEqual(data);
  });

  test('readFragment() tries to read invalid ownerId and id', async () => {
    expect(() => readFragment('999', '333').rejects.toThrow());
  });

  test("writeFragment() writes a fragment's metadata to memory db", async () => {
    const data = { ownerId: '456', id: '4', fragment: 'for writeFragment test' };
    const result = await writeFragment(data);
    expect(result).toEqual(undefined);
  });

  test("readFragmentData() reads a fragment's data from memory db that was written", async () => {
    await writeFragmentData('234', '2', 'for readFragmentData test');
    const result = await readFragmentData('234', '2');
    expect(result).toEqual('for readFragmentData test');
  });

  test('readFragmentData() tries to read invalid owner id', async () => {
    await writeFragmentData('888', '7', 'read for invalid owner id');
    expect(() => readFragmentData('8', '7').rejects.toThrow());
  });

  test('readFragmentData() tries to read invalid id', async () => {
    await writeFragmentData('888', '7', 'read for invalid id');
    expect(() => readFragmentData('888', '777').rejects.toThrow());
  });

  test("writeFragmentData() writes a fragment's data buffer to memory db", async () => {
    const result = await writeFragmentData('678', '6', 'for writeFragmentData test');
    expect(result).toEqual(undefined);
  });

});
