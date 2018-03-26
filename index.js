let basicsml = require('./utilities/basicsrequestml.js');
let querystring = require('querystring');
const {jsonToPrettyTable,jsonFileToPrettyTable} = require('showtables');
let {BasicDB} = require('./database/basicDB.js');

let request = require('request');
let args = process.argv.slice(2).join(' ');
let product = args;
let async = require('async');
// const chalk = require('chalk');
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
let productXSite = new Schema({
  countryName: String,
  productCant: Number
});
module.exports.ProductXSite = mongoose.model('productXSite',productXSite);
// const { ProductSchema } = require('../../schemas/tecnoSchemas.js');
// const {BasicDB} = require('../basicDB.js');
// let ProductDB=new BasicDB(ProductSchema,'link');
///([a-zA-Z])\1{1,}/g
let ProductML,{
  getCantProductsBySite,
  getCantProductByCategory,
  getCantProductByCategories,
  getCantProductsBySiteSubCategories,
  getAllSellersBySite,
  getAllSellersBySiteSequential,
  getProductCantInSearch,
  getProductCantForCategoryBySite,
  getCategoryWithMaxCantProductBySite,
  getCategoryWithMaxCantProduct
} = require('./model/product-ml.js');
const {getAllSellersByCategory,getProductByNickname} = require('./model/seller-ml.js');

let CategoryML,{getCategoriesML,getSubCategiruesML,getAllCategoryML} = require('./model/category-ml.js');
const {getSites,getDomains} = require('./model/site-ml.js');
const {getTrends,getTrendsByCategory,getTrendAllCategories} = require('./model/trend-ml.js');


// getTrends(10).then( result => {
//   result.map( element => console.log(element))
//   // console.log(result);
// })
getCategoryWithMaxCantProduct().then(result => console.log(result))
// getCantProductsBySite().then( result => {
//   console.log(result);
// });
// getCategoriesML().then( categories => {
//   categories.map(category => {
//     getCantProductByCategory(category.id).then( result => {
//       console.log(category.name,result);
//     });
//   });
// })
// getTrendAllCategories('MLA',10).then( result => {
//   result.map(element1 => {
//     console.log(element1.trends);
//   })
//   // console.log(result);
// });
// getCategoriesML().then(result => {
//   console.log(result);
// });

// getAllSellersByCategory('MLA1051','MLA').then( sellersWithCategory => {
//   console.log(sellersWithCategory);
// })
// getCategoriesML().then( categories => {
  // categories.map(category => {
// let getRecursiveSellers = (categories) => {
//   getAllSellersByCategory(categories[0].id,'MLA').then( arrSellerIds => {
//     console.log('categoryName:',categories[0].name,'| sellerCant:',arrSellerIds.length);
//     categories = categories.slice(1);
//     if(categories.length>0)getRecursiveSellers(categories);
//   });
// };
// // getProductRangeByNickname('CARESTINO BEBES').then( result => {
// //   console.log(result);
// // });
// getProductCantForCategoryBySite().then( cantProductForCategory => {
//   console.log(cantProductForCategory[0].countryId);
//   cantProductForCategory.map( element => console.log(element.categoryName,element.productCant));
//   // console.log(cantProductForCategory);
// });
// getProductCantInSearch('computadoras gamers').then( result => console.log(result.queryString,result.cant));
// getProductCantInSearch('perrors de raza').then( result => console.log(result.queryString,result.cant));
// getProductCantInSearch('monitores 29 pulgadas').then( result => console.log(result.queryString,result.cant));
// getProductCantInSearch('televisores smartv').then( result => console.log(result.queryString,result.cant));
// getProductCantInSearch('Deportes y Fitness').then( result => console.log(result.queryString,result.cant));
// getCantProductBySite().then( categories => console.log(categories))
// getAllSellersByCategory('MLA1384','MLA').then( arrSellerIds => {
//   console.log('categoryName:','MLA1384','| sellerCant:',arrSellerIds.length);
// });
// getAllCategoryML('MLA1384').then( subCategories => {
//   // getRecursiveSellers(categories);
//   console.log(subCategories);
// })
// getSubCategiruesML
  // });
// });
//cantItems for Category for site
// objDB = new BasicDB(this.ProductXSite,'countryName','vistas-ml');
// getSites().then( sites => {
//   console.log(' countryCant:',sites.length);
//   sites.map( site => {
//     getCantProductsBySite(site.id).then( result => {
//       objDB.saveElement({'countryName':site.name,'productCant':result});
//       // console.log('        countryName:',site.name,'productCant:',result);
//     });
//     // getCategoriesML(site.id).then( categories => {
//     //   categories.map( category => {
//     //     getCantProductByCategory(category.id,site.id).then( cantProductByCategory => {
//     //       console.log('Country:',site.name,'| CategoryName:',category.name,"| ProductCant:",cantProductByCategory);
//     //     });
//     //   });
//     //   // console.log('country:',site.name,"categoryCant:",categories.length);
//     // })
//   });
// });


// let predictionCategory = (dataBody) => {
//   return new Promise((resolve,reject) => {
//     if(dataBody){
//       request({
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           uri: 'https://api.mercadolibre.com/sites/MLB/category_predictor/predict',
//           body:dataBody,
//           method: 'POST'
//         },  (err, res, body) => {
//           if(err) reject(err);
//           let jsonResult = JSON.parse(body);
//           resolve(jsonResult);
//         }
//       );
//     }else reject('dataBody is Empty!')
//   });
// };

// getCategoriesML().then( categoryList => {
//   console.log(categoryList);
// });
// basicsmla.getSitesML().then( siteList => {
//   siteList.map( ({id}) =>{
//     basicsmla.getCategoriesML(id).then( categoryList => {
//       console.log(categoryList);
//     });
//   });
// });

// basicsml.getIdByUserName('TBXHERRAMIENTAS').then( userId => {
//   console.log('TBXHERRAMIENTAS',userId);
// });

// basicsml.getPubInfoUserByName('TBXHERRAMIENTAS').then( pubInfoUser => {
//   console.log(pubInfoUser);
// });

// basicsml.getPubInfoUserById('4445513').then( pubInfoUser => {
//   console.log(pubInfoUser);
// });
// basicsml.getVisitFromToByUserId('4445513',{dd:'10',mm:'01',yyyy:'2018'},{dd:'10',mm:'02',yyyy:'2018'}).then( viewToUser => {
//   console.log('Visits');
//   console.log(viewToUser);
// });
// basicsml.getTotalQuestionsFromToByUserId('4445513',{dd:'10',mm:'05',yyyy:'2017'},{dd:'10',mm:'02',yyyy:'2018'}).then( viewToUser => {
//   console.log('Questions');
//   console.log(viewToUser);
// });
//
// basicsml.getVisitPerDMYByUserId('4445513',5,'d').then( viewToUser =>{
//   // console.log(viewToUser);
//   viewToUser.results.map( element => {
//     // console.log(element.date,element.total);
//   });
// });
// let productTotalML = 0;
// // CategoryML.getCategoriesML('MLA').then( categoryList => {
// //   categoryList.map( category => {
// //     console.log(category);
// //   //   ProductML.getCantProductByCategory(category.id,'MLA').then( cantProduct => {console.log("CATEGORY_CODE:",category.id,"| CATEGORIE_NAME:",category.name,"| TOTAL:",cantProduct);productTotalML+=cantProduct;console.log(productTotalML);});
// //   });
// //   // console.log(categoryList);
// // });
//
// let key='',indexAcu={},rowAcu='',rowAcuHead='',columns,rows,diff=0;
// let  showInTable = (objList,bgColor='yellow',charColor='black') => {
//   bgColor='bg'+bgColor[0].toUpperCase()+bgColor.slice(1);
//   rows=process.stdout.rows,columns=process.stdout.columns;
//   indexAcu={};
//   key='';
//   for(key in objList[0]){
//     indexAcu[key] = key.length;
//   }
//   objList.map( element => {
//     key='';
//     for(key in element){
//       if(!indexAcu[key] || indexAcu[key] < element[key].toString().length) indexAcu[key]=element[key].toString().length;
//     }
//   });
//   //header
//   objList
//   key='',
//   rowAcuHead='';
//   for(key in objList[0]){
//     let dif = indexAcu[key]-key.toString().length;
//     let midd = parseInt(dif/2);
//     let rest = dif % 2;
//     rowAcuHead+='| '
//     for(let j=0;j<midd;j++) rowAcuHead+=' ';
//     rowAcuHead+=key.toUpperCase();
//     for(let j=0;j<midd;j++) rowAcuHead+=' ';
//     if(rest>0) rowAcuHead+=' ';
//   }
//   rowAcuHead = rowAcuHead+'|';
//   diff = columns-rowAcuHead.length;
//   diff = diff /2;
//   for(let j = 0;j<diff-1;j++){
//     rowAcuHead=' '+rowAcuHead+' ';
//   }
//   console.log(chalk[bgColor][charColor](rowAcuHead));
//   let count=0;
//   objList.map( element => {
//     count++;
//     key='',
//     rowAcu='';
//     for(key in element){
//       let dif = indexAcu[key]-element[key].toString().length;
//       let midd = parseInt(dif/2);
//       let rest = dif % 2;
//       rowAcu+='| '
//       for(let j=0;j<midd;j++) rowAcu+=' ';
//       rowAcu+=element[key];
//       for(let j=0;j<midd;j++) rowAcu+=' ';
//       if(rest>0) rowAcu+=' ';
//     }
//     if(count>= (rows-1)){
//       count=0;
//       console.log(chalk[bgColor][charColor](rowAcuHead));
//     }
//     rowAcu = rowAcu+"|";
//     diff = columns-rowAcu.length;
//     diff = diff /2;
//     for(let j = 0;j<diff-1;j++){
//       rowAcu=' '+rowAcu+' ';
//     }
//     console.log(rowAcu);
//   });
//   return indexAcu;
// };
// let listAcu=[];
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":23})
// listAcu.push({"name":"dfdasfsdfas","lastName":"dicccxcaz","edad":223})
// listAcu.push({"name":"asfsdfdfdas","lastName":"diaz","edad":213})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":3})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":23})
// listAcu.push({"name":"dfdasfsdfas","lastName":"dicccxcaz","edad":223})
// listAcu.push({"name":"asfsdfdfdas","lastName":"diaz","edad":213})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":3})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":23})
// listAcu.push({"name":"dfdasfsdfas","lastName":"dicccxcaz","edad":223})
// listAcu.push({"name":"asfsdfdfdas","lastName":"diaz","edad":213})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":3})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":23})
// listAcu.push({"name":"dfdasfsdfas","lastName":"dicccxcaz","edad":223})
// listAcu.push({"name":"asfsdfdfdas","lastName":"diaz","edad":213})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":3})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":23})
// listAcu.push({"name":"dfdasfsdfas","lastName":"dicccxcaz","edad":223})
// listAcu.push({"name":"asfsdfdfdas","lastName":"diaz","edad":213})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":3})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":23})
// listAcu.push({"name":"dfdasfsdfas","lastName":"dicccxcaz","edad":223})
// listAcu.push({"name":"asfsdfdfdas","lastName":"diaz","edad":213})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":3})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":23})
// listAcu.push({"name":"dfdasfsdfas","lastName":"dicccxcaz","edad":223})
// listAcu.push({"name":"asfsdfdfdas","lastName":"diaz","edad":213})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":3})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":23})
// listAcu.push({"name":"dfdasfsdfas","lastName":"dicccxcaz","edad":223})
// listAcu.push({"name":"asfsdfdfdas","lastName":"diaz","edad":213})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":3})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":23})
// listAcu.push({"name":"dfdasfsdfas","lastName":"dicccxcaz","edad":223})
// listAcu.push({"name":"asfsdfdfdas","lastName":"diaz","edad":213})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":3})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":23})
// listAcu.push({"name":"dfdasfsdfas","lastName":"dicccxcaz","edad":223})
// listAcu.push({"name":"asfsdfdfdas","lastName":"diaz","edad":213})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":3})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":23})
// listAcu.push({"name":"dfdasfsdfas","lastName":"dicccxcaz","edad":223})
// listAcu.push({"name":"asfsdfdfdas","lastName":"diaz","edad":213})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":3})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":23})
// listAcu.push({"name":"dfdasfsdfas","lastName":"dicccxcaz","edad":223})
// listAcu.push({"name":"asfsdfdfdas","lastName":"diaz","edad":213})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":3})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":23})
// listAcu.push({"name":"dfdasfsdfas","lastName":"dicccxcaz","edad":223})
// listAcu.push({"name":"asfsdfdfdas","lastName":"diaz","edad":213})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":3})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":23})
// listAcu.push({"name":"dfdasfsdfas","lastName":"dicccxcaz","edad":223})
// listAcu.push({"name":"asfsdfdfdas","lastName":"diaz","edad":213})
// listAcu.push({"name":"asfsdfas","lastName":"diaz","edad":3})
// listAcu.push({"name":"asfscxvxcvxdfas","lastName":"diacvxcbbbbbbbbbvxcvxcvz","edad":2223})
// let listAcu = require('./example-data.js')
// jsonToPrettyTable(listAcu)
// jsonFileToPrettyTable('./example-data.js')
// CategoryML.getAllCategoryML('MLA1000').then((subCategoryList) => {
//   let listAcu=[];
//   for(let i in subCategoryList){
//     listAcu.push({
//       "id":subCategoryList[i].id,
//       "name":subCategoryList[i].name,
//       "total items":subCategoryList[i].total_items_in_this_category
//     });
//     // console.log('SubCategory:',subCategoryList[i].id,'-',subCategoryList[i].name);
//     // console.log('Total Products:',subCategoryList[i].total_items_in_this_category);
//     // console.log(subCategoryList[i].id,subCategoryList[i].path_from_root);
//   }
//   jsonToPrettyTable(listAcu);
// });
// ProductML.getProductRangeByCategory('MLA1574',0,1,'MLA').then( productList =>{
//   console.log(productList.paging.total);
// });
//go to database and send products to category prediction
// ProductDB.findElementWithSkipLimit(0,2).then( productList => {
//   let elementToSend = [];
//   for(let i in productList){
//     // elementToSend.push({"title":productList[i].name});
//   }
//   // elementToSend.push({"title":"game"})
//   elementToSend.push({"title":"aire acondicionado"})
//   // elementToSend.push({"title":"tecnologia"})
//   let data = JSON.stringify(elementToSend);
//   predictionCategory(data).then( jsonResult => {
//     for(let i in jsonResult){
//       console.log('----------------------------------');
//       console.log(jsonResult[i]);
//       console.log('----------------------------------');
//     }
//     console.log(jsonResult.length);
//   }).catch((err) => console.log(err));
// });
// let data = JSON.stringify([{"title": "Ipod Touch Apple 16gb 5 Geração","category_from": "MLB1743"}]);



// curl -X POST -H "Content-Type: application/json" -d '' https://api.mercadolibre.com/sites/MLB/category_predictor/predict
