const _ = require('lodash');
const {lenguage} = require('../config/settings.json');
let lenguageOn={};
for(let key in lenguage){
  if(lenguage[key].isOn){
    lenguageOn = lenguage[key];
    delete lenguageOn.isOn;
    break;
  }
}
if(_.isEmpty(lenguageOn)){
  if(!_.isEmpty(lenguage)){
    for(let key in lenguage){
      lenguageOn = lenguage[key];
      delete lenguageOn.isOn;
      break;
    }
  }else{
    lenguageOn = {
      "help":{
        "singular":"help",
        "plural":"helps"
      },
      "category":{
        "singular":"category",
        "plural":"categories"
      },
      "product":{
        "singular":"product",
        "plural":"products"
      },
      "trend":{
        "singular":"trend",
        "plural":"trends"
      },
      "seller":{
        "singular":"seller",
        "plural":"sellers"
      },
      "site":{
        "singular":"site",
        "plural":"sites"
      }
    };
  }
}
module.exports = lenguageOn;
