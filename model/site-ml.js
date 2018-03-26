const {genericRequestGetWithPromise} = require('../utilities/generic-ml.js');

const {apiUrl,defaultSite,defaultLimit,defaultOffset} = require('../config/settings.json');
let categoryJson={},j=0,resultAcu=[];
//get categories with siteCode, example MLA,
module.exports.getSites = () =>{
  return new Promise((resolve,reject) => {
    genericRequestGetWithPromise(`sites`).then(result => resolve(result));
  });
};
module.exports.getDomains = () => {
  return new Promise((resolve,reject) => {
    genericRequestGetWithPromise(`site_domains`).then(result => resolve(result));
  });
};
module.exports.getSiteDetail = (siteId=defaultSite) =>{
  return new Promise((resolve,reject) => {
    genericRequestGetWithPromise(`sites/${siteId}`).then(result => resolve(result));
  });
};
