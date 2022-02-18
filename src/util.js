const base32 = require("base32");

const util = {
  base32encode(str) {
    if(!str){
      return ''
    }
    return base32.encode(str);
  },
  base32decode(str) {
    if(!str){
      return ''
    }
    return base32.decode(str);
  }
};

export default util