const {jsonToPrettyTable,jsonFileToPrettyTable} = require('showtables');
const {showMenu} = require('./global-module/menu.js');

// let args = process.argv.slice(2).join(' ');



module.exports.category = require('./model/category-ml.js');
module.exports.product = require('./model/product-ml.js');
module.exports.seller = require('./model/seller-ml.js');
module.exports.site = require('./model/site-ml.js');
module.exports.trend = require('./model/trend-ml.js');

const splitParams = (str) => {
  let result = str.split('-').slice(1);
  let i = 0 , range = result.length;
  for(;i<range;i++){
    result[i] = result[i].replace(/\s/,'#$#%&%@');
    result[i] = result[i].replace(/\'|\"/g,"").trim().split('#$#%&%@');
  }
  return result;
};
if (require.main === module) {
  // console.log('hola mundoooo');
  let argv = process.argv.slice(2);
  // console.log(process.title);
  if(!argv || argv == undefined || argv.length<=0)argv = process.title.replace(/[\s\S]*meliapi/,'').trim().split(" ")
  // console.log(argv);
  argv = argv.join(' ');
  const actions = {
    "ca":{
      "empty":() => this.category.getCategoriesML().then( result => jsonToPrettyTable(result)),
      "siteId":(siteId) => this.category.getCategoriesML(siteId).then( result => jsonToPrettyTable(result))
    }
  }
  showMenu(argv,actions);
  argv = splitParams(argv);
  // console.log(argv);
  argv =[ "MLA"]
  // if(argv[0]==="site") this.site.getSites().then( result => jsonToPrettyTable(result));
  // else if(argv[0].length === 3 && argv[0].indexOf('M')!=-1) this.category.getCategoriesML(argv[0]).then(result => jsonToPrettyTable(result));
  // else if(argv[0] === "trend") this.trend.getTrendsBySite(argv[1]?argv[1]:"MLA").then(result => jsonToPrettyTable(result));
}
