const {apiUrl,defaultSite,defaultLimit,defaultOffset} = require('./settings.json');
const {getProductRangeByCategory} = require('./product-ml.js');
const {getElementRangeByOtherElement,getElementProfileById,genericRequestGetWithPromise} = require('./generic-ml.js');

module.exports.getUserIdByNickname = (nickname,siteId=defaultSite) => {
  return new Promise((resolve,reject) => {
    genericRequestGetWithPromise(`sites/${siteId}/search?nickname=${nickname}`).then(result => resolve(result));
  });
};
module.exports.getProductBySeller = (sellerId,offset=defaultOffset,limit=defaultLimit,siteId=defaultSite) => {
  return new Promise((resolve,reject) => {
    getElementRangeByOtherElement('seller_id',sellerId,offset,limit,siteId).then( result => resolve(result));
  });
};

module.exports.getProductByNickname = (nickname,offset=defaultOffset,limit=defaultLimit,siteId=defaultSite) => {
  nickname = nickname.replace(/\s/g,'%20');
  return new Promise((resolve,reject) => {
    genericRequestGetWithPromise(`sites/${siteId}/search?nickname=${nickname}&offset=${offset}&limit=${limit}`).then(result => resolve(result));
  });
};

module.exports.getAllSellersByCategory = (categoryId,siteId=defaultSite) => {
  return new  Promise((resolve,reject) => {
    let acuPromiseCategories = [],resultAcu=[];
    getProductRangeByCategory(categoryId,0,1,siteId).then( fullCategory => {
      let roundTotal = 250,i=0,j=0;
      let result = parseInt(fullCategory.paging.total / 200);
      result+= (fullCategory.paging.total % 200)>0?1:0;
      if(result<roundTotal)roundTotal=result;
      for(;i<roundTotal;i++){
        acuPromiseCategories.push(getProductRangeByCategory(categoryId,200*i,200,siteId));
      }
      Promise.all(acuPromiseCategories).then( fullCategoryPromisesAcu => {
        j=0;
        for(j in fullCategoryPromisesAcu){
          fullCategoryPromisesAcu[j].results.map( postSelling => {
            if(resultAcu.indexOf(postSelling.seller.id) === -1){
              resultAcu.push(postSelling.seller.id)
            }
          });
        }
        resolve(resultAcu);
      });
    });
  });
};

module.exports.getSellerProfileById = (id) => {
  return new Promise((resolve,reject) => {
    getElementProfileById('users',id).then( result => resolve(result));
  });
};
module.exports.getCantProductsBySeller = () => {

};
