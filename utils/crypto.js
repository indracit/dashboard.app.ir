//Checking the crypto module
const crypto = require('crypto');
const algorithm = 'aes-128-cbc'; //Using AES encryption
const key = 'integramicro1234';
const iv = Buffer.alloc(16);

// Decrypting text
function decrypt(text) {
    let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted = decipher.update(text,'base64','utf-8');
    decrypted += decipher.final('utf-8')
    return decrypted;
}


module.exports={decrypt}