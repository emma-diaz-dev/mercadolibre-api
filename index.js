const {jsonToPrettyTable,jsonFileToPrettyTable} = require('showtables');

// let args = process.argv.slice(2).join(' ');



module.exports.category = require('./model/category-ml.js');
module.exports.product = require('./model/product-ml.js');
module.exports.seller = require('./model/seller-ml.js');
module.exports.site = require('./model/site-ml.js');
module.exports.trend = require('./model/trend-ml.js');


if (require.main === module) {
  // console.log('hola mundoooo');
  let argv = process.argv.slice(2);
  if(!argv || argv.length<=0)argv = process.title.replace(/[\s\S]*meliapi/,'').trim().split(" ")
  if(argv[0]==="site") this.site.getSites().then( result => jsonToPrettyTable(result));
  else if(argv[0].length === 3 && argv[0].indexOf('M')!=-1) this.category.getCategoriesML(argv[0]).then(result => jsonToPrettyTable(result));
  else if(argv[0] === "trend") this.trend.getTrendsBySite(argv[1]?argv[1]:"MLA").then(result => jsonToPrettyTable(result));
}
