const {getCategoriesML,getSubCategiruesML,getAllCategoryML} = require('./category-ml.js');
const {getElementRangeByOtherElement,genericRequestGetWithPromise} = require('../utilities/generic-ml.js');
const {apiUrl,defaultSite,defaultLimit,defaultOffset,errorCantItem} = require('../config/settings.json');
const {getSites} = require('./site-ml.js');


let result = 0,rest=0,i=0,promiseAcu=[];
//sort=price_des
module.exports.getProductRangeByCategory = (categoryId,offset=defaultOffset,limit=defaultLimit,siteId=defaultSite,orderBy='') => {
  return new Promise((resolve,reject) => {
    if(orderBy.toLowerCase() === 'asc')orderBy='&sort=price_asc'
    else if(orderBy.toLowerCase() === 'desc') orderBy='&sort=price_desc'
    genericRequestGetWithPromise(`sites/${siteId}/search?category=${categoryId}&offset=${offset}&limit=${limit}${orderBy}`).then( result => resolve(result));
  });
};
module.exports.getCantProductByCategory = (categoryId,siteId=defaultSite) => {
  return new Promise((resolve,reject) => {
    this.getProductRangeByCategory(categoryId,0,1,siteId).then( productList =>{
      if(!productList) reject('Doesn\'t have items');
      resolve(productList.paging.total);
    });
  });
};
module.exports.getCantProductByCategories = (siteId=defaultSite) => {
  return new Promise((resolve,reject) =>{
    let promiseAcu=[],i=0,range=0,acuResult=[];
    getCategoriesML(siteId).then(categories => {
      categories.map( category => {
        promiseAcu.push(this.getCantProductByCategory(category.id,siteId));
      });
      range = categories.length;
      Promise.all(promiseAcu).then( result => {
        for(;i<range;i++){
          acuResult.push({"categoryId":categories[i].id,"categoryName":categories[i].name,"productTotal":result[i]})
        }
        acuResult.sort((a,b) => {
          if(parseInt(a.productTotal)<parseInt(b.productTotal)) return 1;
          if(parseInt(a.productTotal) === parseInt(b.productTotal)) return 0;
          return -1;
        })
        resolve(acuResult);
      });
    });
  });
};
module.exports.getCategoryWithMaxCantProductBySite = (siteId=defaultSite) => {
  return new Promise((resolve,reject) =>{
    this.getCantProductByCategories(siteId).then( categories => {
      resolve(categories[0]);
    });
  });
};
module.exports.getCategoryWithMaxCantProduct = () => {
  return new Promise((resolve,reject) =>{
    let promiseAcu=[],i=0,range=0,acuResult=[];
    getSites().then( sites => {
      sites.map(site => {
        promiseAcu.push(this.getCategoryWithMaxCantProductBySite(site.id));
      });
      range = sites.length;
      Promise.all(promiseAcu).then( result => {
        for(;i<range;i++){
          result[i]["siteId"] = sites[i].id;
          result[i]["siteName"] = sites[i].name;
          // acuResult.push({"siteId":sites[i].id,"siteName":sites[i].name,"categoryWithMaxCantProduct":})
        }
        result.sort((a,b) => {
          if(parseInt(a.productTotal)<parseInt(b.productTotal)) return 1;
          if(parseInt(a.productTotal) === parseInt(b.productTotal)) return 0;
          return -1;
        })
        resolve(result);
      });
    });
  });
};
module.exports.getCantProductsBySite = (siteId=defaultSite) => {
 return new Promise((resolve,reject) => {
   let acuPromiseCategories = [],productCant=0;
   getCategoriesML(siteId).then( categories => {
     if(!categories || categories.length <1) reject('Categories not found!')
     categories.map( category => {
       acuPromiseCategories.push(getSubCategiruesML(category.id));
     });
     Promise.all(acuPromiseCategories).then( categoryPromisesAcu => {
       categoryPromisesAcu.map( categoryPromise => {
         productCant+=parseInt(categoryPromise.total_items_in_this_category);
       });
       resolve(productCant);
     });
   });
 });
};

module.exports.getProductById = (productId) => {
  return new Promise((resolve,reject) => {
      genericRequestGetWithPromise(`items/${productId}`).then( result => resolve(result));
  });
};

module.exports.getProductDescriptionById = (productId) => {
  return new Promise((resolve,reject) => {
      genericRequestGetWithPromise(`items/${productId}/description`).then( result => resolve(result));
  });
};

module.exports.getProductVariationsById = (productId) => {
  return new Promise((resolve,reject) => {
      genericRequestGetWithPromise(`items/${productId}/variations`).then( result => resolve(result));
  });
};
module.exports.getCantProductsBySiteSubCategories = (siteId=defaultSite) => {
  return new Promise((resolve,reject) => {
    let acuPromiseCategories = [],productCant=0;
    getCategoriesML(siteId).then( categories => {
      console.log('llego a las categorias');
      console.log(categories);
      if(!categories || categories.length <1) reject('Categories not found!')
      categories.map( category => {
        acuPromiseCategories.push(getAllCategoryML(category.id));
      });
      Promise.all(acuPromiseCategories).then( categoryPromisesAcu => {
        categoryPromisesAcu.map( categoryPromise => {
          productCant+=parseInt(categoryPromise.total_items_in_this_category);
        });
        resolve(productCant);
      });
    });
  });
};
function bigSorting(arr) {
    // Complete this function
    // sortElement(arr)
    return arr.sort((first,second) => {
        first = parseInt(first);
        second = parseInt(second);
        if (first === second)  return 0;
        if (first < second)  return -1;
        return 1;
    });
}
const sortElement = (elementList,attributeOrder=null) => {
  let i=0,elementRange=0,acuRange=0,minValu=0,acu=[];
  const recurSorter = (elementList) => {
      i = 1,elementRange=elementList.length;
      minValu = elementList[0];
      for(;i<elementRange;i++){
        // console.log(elementList[i],minValu);
        if(elementList[i]<minValu)minValu= elementList[i];
      }
      acu.push(minValu);
      elementList.splice(elementList.indexOf(minValu),1);
      if(elementList.length>0)recurSorter(elementList);
      else return acu;
  };
  const recurSorterJson = (elements) => {
      i = 1,elementRange=elements.length,keyMinValue=0;
      minValu = elements[0];
      for(i in elements){
        // console.log(elementList[i][attributeOrder],minValu[attributeOrder],elementList[i][attributeOrder]<minValu[attributeOrder]);
        if(elements[i][attributeOrder]<minValu[attributeOrder]){
          minValu= elements[i];
          keyMinValue = i;
        }
      }
      acu.push(minValu);
      // console.log(elements.length);
      //console.log(keyMinValue,1);
      // console.log(elements);
    elements.splice(parseInt(keyMinValue),1);
      if(elements.length>0)recurSorterJson(elements);
      else return acu;
  };
  if(!attributeOrder) recurSorter(elementList);
  else recurSorterJson(elementList);
  // console.log(acu)
  return acu;
};
module.exports.getProductCantForCategoryBySite = (siteId=defaultSite) => {
  return new Promise((resolve,reject) => {
      let acuPromiseCategories = [],resultAcu=[],i=0;
    getCategoriesML(siteId).then( categories => {
      if(!categories || categories.length <1) reject('Categories not found!')
      categories.map( category => {
        acuPromiseCategories.push(this.getProductRangeByCategory(category.id,0,1,siteId));
      });
      Promise.all(acuPromiseCategories).then( fullCategoryPromisesAcu => {
        i=0;
        for(i in fullCategoryPromisesAcu){
          resultAcu.push({"countryId":siteId,"categoryId":categories[i].id,"categoryName":categories[i].name,"productCant":fullCategoryPromisesAcu[i].paging.total});
        }
        resultAcu = sortElement(resultAcu,'productCant');
        resolve(resultAcu);
      })
    });
  });
};

module.exports.getAllSellersByCategory = (categoryId,siteId=defaultSite) => {
  return new  Promise((resolve,reject) => {
    let acuPromiseCategories = [],resultAcu=[];
    this.getProductRangeByCategory(categoryId,0,1,siteId).then( fullCategory => {
      let roundTotal = 250,i=0;
      let result = parseInt(fullCategory.paging.total / 200);
      result+= fullCategory.paging.total % 200;
      if(result>roundTotal)roundTotal=result;
      for(;i<roundTotal;i++){
        acuPromiseCategories.push(this.getProductRangeByCategory(categoryId,200*i,200,siteId));
      }
      Promise.all(acuPromiseCategories).then( fullCategoryPromisesAcu => {
        for(let j in fullCategoryPromisesAcu){
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

module.exports.getAllSellersBySite = (siteId=defaultSite) => {
  return new Promise((resolve,reject) => {
    let acuPromiseCategories = [],resultAcu=[];
    getCategoriesML(siteId).then( categories => {
      categories.map( category => {
        acuPromiseCategories.push(this.getAllSellersByCategory(category.id,siteId));
      });
      Promise.all(acuPromiseCategories).then( acuSellersWithCategory => {
        for(let i in acuSellersWithCategory){
          resultAcu.push({"categoryId":categories[i].id,"categoryName":categories[i].name,"sellerArr":acuSellersWithCategory[i]});
        }
        resolve(resultAcu);
      });
    });
  });
};
let sequentialSellers = (categories,siteId,acuResult=[]) => {
  return new Promise((resolve,reject) => {
    if(categories.length === 0)resolve(acuResult);
    this.getAllSellersByCategory(categories[0].id,siteId).then( result => {
      categories= categories.slice(1);
      console.log(categories[0].id,categories[0].name,result.length);
      acuResult = acuResult.concat(result);
      if(categories.length === 0)resolve(acuResult);
      else sequentialSellers(categories,siteId,acuResult);
    });
  });
};
module.exports.getAllSellersBySiteSequential = (siteId=defaultSite) => {
  return new Promise((resolve,reject) => {
    let acuPromiseCategories = [],resultAcu=[];
    getCategoriesML(siteId).then( categories => {
      sequentialSellers(categories,siteId).then( result => {
        console.log('finish sellers search');
        resolve(result);
      });
    });
  });
};

module.exports.searchProduct = (queryString,offset=defaultOffset,limit=defaultLimit,siteId=defaultSite,orderBy='') => {
  queryString = queryString.replace(/\s/g,'%20');
  return new Promise((resolve,reject) => {
    if(orderBy.toLowerCase() === 'asc')orderBy='&sort=price_asc'
    else if(orderBy.toLowerCase() === 'desc') orderBy='&sort=price_desc'
    getElementRangeByOtherElement('q',queryString,offset,limit,siteId,orderBy).then( result => resolve(result));
  });
};

module.exports.getProductCantInSearch = (queryString,siteId=defaultSite) => {
  return new Promise((resolve,reject) => {
    this.searchProduct(queryString,0,1,siteId).then( result => resolve({"queryString":queryString,"cant":result.paging.total}));
  });
};
//https://api.mercadolibre.com/items/MLA627579355/description
