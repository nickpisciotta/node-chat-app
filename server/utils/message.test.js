var expect = require('expect'); 

var {generateMessage, generateLocationMessage} = require('./message.js'); 

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = "Nick"; 
    var text = "Some text"; 
    var message = generateMessage(from, text); 
    
    expect(message).toInclude({from, text}); 
    expect(message.createdAt).toBeA("number");
  });   
}); 

describe('generateLocationMessage', () => {
  it("should generate correct location object", () => {
    var from = "Nick";  
    var lat = 1; 
    var long = 1; 
    var url = "https://www.google.com/maps?q=1,1"; 
    var response = generateLocationMessage(from, lat, long);
    

    expect(response.createdAt).toBeA("number"); 
    expect(response).toInclude({from, url}); 
  });
});