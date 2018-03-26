const {apiUrl,defaultSite,defaultLimit,defaultOffset} = require('./settings.json');
const {getElementRangeByOtherElement,getElementProfileById,genericRequestGetWithPromise} = require('./generic-ml.js');
const {getSites} = require('./site-ml.js');
const {getCategoriesML} = require('./category-ml.js');



module.exports.getTrendsBySite = (siteId=defaultSite,limit=defaultLimit) =>{
  return new Promise((resolve,reject) => {
    genericRequestGetWithPromise(`sites/${siteId}/trends/search?limit=${limit}`).then(result => resolve(result));
  });
};

module.exports.getTrendAllSites = (limit=defaultLimit) =>{
  return new Promise((resolve,reject) => {
    let acuPromises = [],i=0,range=0;
    getSites().then( sites => {
      range = sites.length;
      for(;i<range;i++){
        acuPromises.push(this.getTrendsBySite(sites[i].id,limit));}

      Promise.all(acuPromises).then( result => {
        i=0;
        for(;i<range;i++){
          if(!result[i].status) sites[i].trends = result[i];
          else sites[i].trends = result[i].error
         }
        resolve(sites);
      });
    });
  });
};

module.exports.getTrendsByCategory = (categoryId,siteId=defaultSite,limit=defaultLimit) =>{
  return new Promise((resolve,reject) => {
    genericRequestGetWithPromise(`sites/${siteId}/trends/search?category=${categoryId}&limit=${limit}`).then(result => resolve(result));
  });
};

module.exports.getTrendAllCategories = (siteId=defaultSite,limit=defaultLimit) =>{
  return new Promise((resolve,reject) => {
    let acuPromises = [],i=0,range=0;
    getCategoriesML().then( categories => {
      range = categories.length;
      for(;i<range;i++){
        acuPromises.push(this.getTrendsByCategory(categories[i].id,siteId,limit));}

      Promise.all(acuPromises).then( result => {
        i=0;
        for(;i<range;i++){
          if(!result[i].status) categories[i].trends = result[i];
          else categories[i].trends = result[i].error
         }
        resolve(categories);
      });
    });
  });
};
