var expect = require('expect'); 

var {generateMessage} = require('./message.js'); 

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = "Nick"; 
    var text = "Some text"; 
    var message = generateMessage(from, text); 
    
    expect(message).toInclude({from, text}); 
    expect(message.createdAt).toBeA("number");
  });   
}); 