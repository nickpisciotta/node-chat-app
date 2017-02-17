const expect = require('expect'); 

var {isRealString} = require('./validation.js');

describe('isRealString', () => {
  it ('should reject non-string values', () => {
    var params = {name: 123, room: 1}; 
    
    expect(isRealString(params.name)).toBe(false);
    expect(isRealString(params.room)).toBe(false);
  });  

  it('should reject strings with only spaces', () => {
    var params = {name: '  ', room:'  '}; 

    expect(isRealString(params.name)).toBe(false); 
    expect(isRealString(params.name)).toBe(false); 
  });

  it('should allow strings with non-space characters', () => {
    var params = {name: " Nick ", room: ' React '}; 

    expect(isRealString(params.name)).toBe(true); 
    expect(isRealString(params.name)).toBe(true); 
  }); 
})