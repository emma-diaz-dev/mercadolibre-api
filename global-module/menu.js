let Validator = require('./validator.js');
const lenguage = require('./lenguage.js');
const {jsonToPrettyTable,jsonFileToPrettyTable} = require('showtables');
const menu = require('./menu.json');


const splitParams = (str) => {
  let result = str.split('-').slice(1);
  let i = 0 , range = result.length,j=0,acu=[],tempValue='';
  for(;i<range;i++){
    result[i] = result[i].replace(/'|\"/g,'##--##');
    result[i] = result[i].split("##-");
    result[i] = result[i].filter(element => element && element.length>0 && element != '-##');
    j=0;
    for(;j<result[i].length;j++){
      if(result[i][j].indexOf('-##') === -1){
        tempValue = result[i][j].replace(/\s/g,'#$#%&%@');
        tempValue = tempValue.replace(/'|\"/g,'%&$#&$#%')
        tempValue = tempValue.trim().split('#$#%&%@');
        tempValue.map( element => {
          if(element)acu.push(element);
        });
        // tempValue = tempValue.filter( element => element)
      }else acu.push(result[i][j].replace(/\-\#\#/g,''));
    }
    // result[i] = result[i].replace(/\s/g,'#$#%&%@');
    // result[i] = result[i].replace(/'|\"/g,'%&$#&$#%')
    // console.log(result[i]);
    // result[i] = result[i].trim().split('#$#%&%@');
    // console.log(result[i]);
    // result[i] = result[i].filter( element => element)
    // console.log(result[i]);
    result[i] = acu;
  }
  // console.log(acu);
  return result;
};
let options = ['ca','pr','se','si','tr'];
module.exports.showMenu = (argv,actions) => {
  let i =0,range = 0,tempI=0,tempOpt='',tempValue=[];
  argv = splitParams(argv);
  range = argv.length;
  if(range === 0)helper(lenguage.help.singular);
  for(;i<range;i++){
    // console.log(argv[i]);
    if(lenguage.help.singular.indexOf(argv[i][0]) !== -1){
      tempI = options.indexOf(argv[i][1]?argv[i][1].slice(0,2):argv[i][1]) ;
      if(tempI !== -1){
        helper(options[tempI]);
      }else{
        helper(lenguage.help.singular);
      }
    }
    else if(lenguage.help.singular.indexOf(argv[i][1]) !== -1){
      helper(argv[i][0]);
    }
    else if(options.indexOf(argv[i][0].toLowerCase())!== -1){
      tempOpt = argv[i][0];
      tempValue = argv[i].splice(1);
      // console.log(tempOpt);
      // console.log(tempValue);
      switch (tempOpt) {
        case "ca":
          tempAction = actions["ca"];
          //-ca [siteId]
          if(tempValue.length <= 0){
            tempAction.empty();
          }else if(tempValue[0].length <= 3 && 'all' === tempValue[0].toLowerCase()){
            if(tempValue[1] && tempValue[1].length>0){
              tempAction.allCategory(tempValue[1].toUpperCase());
            }
          }else if(tempValue[0].length <= 3 && 'sub' === tempValue[0].toLowerCase()){
            if(tempValue[1] && tempValue[1].length>0){
              tempAction.subCategory(tempValue[1].toUpperCase());
            }
          }else{
            if(tempValue[0].length === 3)tempAction.siteId(tempValue[0].toUpperCase(  ));
            else tempAction.siteName(tempValue[0]);
          }
          break;
        case "pr":
          console.log(tempOpt);
          console.log(tempValue);
          break;
        case "se":
          console.log(tempOpt);
          console.log(tempValue);
          break;
        case "si":
          console.log(tempOpt);
          console.log(tempValue);
          break;
        case "tr":
          console.log(tempOpt);
          console.log(tempValue);
          break;
        default:

      }
    }
  }

};


// const validator = (str1,str2) => {
//   return str1.indexOf(str2.toLowerCase()) !== -1;
// };

const helper = (helpered='') => {
  let objV = new Validator(helpered,lenguage);
  if(helpered === ''){
    return ;
  }else if(objV.fullValidateOptionMenu('help')){
    jsonToPrettyTable(menu.english.help,'white','blue');
  }else if(objV.fullValidateOptionMenu('category')){
    jsonToPrettyTable(menu.english.category,'white','blue');
  }else if(objV.fullValidateOptionMenu('product')){
    jsonToPrettyTable(menu.english.product,'white','blue');
  }else if(objV.fullValidateOptionMenu('trend')){
    jsonToPrettyTable(menu.english.trend,'white','blue');
  }else if(objV.fullValidateOptionMenu('seller')){
    jsonToPrettyTable(menu.english.seller,'white','blue');
  }else if(objV.fullValidateOptionMenu('site')){
    jsonToPrettyTable(menu.english.site,'white','blue');
  }
};
// helper('help');
