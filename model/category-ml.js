const {getElementRangeByOtherElement,genericRequestGetWithPromise} = require('../utilities/generic-ml.js');
const {apiUrl,defaultSite,defaultLimit,defaultOffset} = require('../config/settings.json');
const {getSiteIdByName} = require('./site-ml.js');

let categoryJson={},j=0,resultAcu=[];
//get categories with siteCode, example MLA,
module.exports.getCategoriesBySite = (siteId=defaultSite) =>{
  return new Promise((resolve,reject) => {
    genericRequestGetWithPromise(`sites/${siteId}/categories`).then(result => resolve(result)).catch( error => resolve([{"error":`Categories not found in site ${siteId}`}]));
  });
};
module.exports.getCategoriesBySiteName = siteName => {
  return new Promise((resolve,reject) => {
    getSiteIdByName(siteName).then( siteId => {
      if(siteId){
        this.getCategoriesBySite(siteId).then( categories =>{
          if(!categories || categories.length<=0)resolve([{"error":"siteId not found"}]);
          else resolve(categories)
        });
      }else resolve([{"error":`site ${siteName}  not found`}]);
    });
  });
};
module.exports.getSubCategiruesML = categoryId => {
  return new Promise((resolve,reject) => {
    genericRequestGetWithPromise(`categories/${categoryId}`).then(result => resolve(result));
  });
};
let recurGetCategpry = (categoryIdNow,resultAcuNow) => {
  return new Promise((resolve,reject) => {
    let promiseAcu=[];
    this.getSubCategiruesML(categoryIdNow).then( subCategory => {
      if(subCategory.children_categories && subCategory.children_categories.length > 0){
        // console.log(subCategory.id);
        for(let i in subCategory.children_categories){
          promiseAcu.push(recurGetCategpry(subCategory.children_categories[i].id,resultAcuNow));
        }
        Promise.all(promiseAcu).then(() => {
          resolve();
        });
      }else{
        resultAcuNow.push(subCategory);
        resolve();
      }
    });
  });
};
module.exports.getAllCategoryML = categoryId => {
  return new Promise((resolve,reject) => {
    recurGetCategpry(categoryId,resultAcu).then(() =>{
      // console.log('llego al then');
      resolve(resultAcu);
    })
  });
};
