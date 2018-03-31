const {genericRequestGetWithPromise} = require('../utilities/generic-ml.js');

const {apiUrl,defaultSite,defaultLimit,defaultOffset} = require('../config/settings.json');
let categoryJson={},j=0,resultAcu=[];
//get categories with siteCode, example MLA,
module.exports.getSites = () =>{
  return new Promise((resolve,reject) => {
    genericRequestGetWithPromise(`sites`).then(result => resolve(result));
  });
};
module.exports.getSiteIdByName = siteName => {
  return new Promise((resolve,reject) => {
    siteName = siteName.replace(/\s/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    siteLength = siteName.length;
    let idResult = '';
    // console.log(siteName);
    this.getSites().then( sites => {
      if(!sites || sites.length<=0)resolve({"error":`Sites not found`})
      sites.map( site => {
        site.name = site.name.replace(/\s/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
        if(site.name.length>=siteLength){
            if(site.name.startsWith(siteName))idResult = site.id;
        }else if(siteName.startsWith(site.name))idResult = site.id;
      });
      resolve(idResult);
    });
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
