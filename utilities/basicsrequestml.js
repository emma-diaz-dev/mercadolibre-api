let request = require('request');

//get sites to mercadolibre
module.exports.getSitesML = () => {
  return new Promise((resolve,reject) => {
    request({
      headers: {
        'Content-Type': 'application/json'
      },
      uri: 'https://api.mercadolibre.com/sites',
      method: 'GET'
    }, (err,res,body) => {
      if(err) reject(err);
      else resolve(JSON.parse(body));
    });
  });
};

module.exports.getListingTypesBySiteId = (siteId='MLA') => {
  return new Promise((resolve,reject) => {
    request({
      headers: {
        'Content-Type': 'application/json'
      },
      uri: `https://api.mercadolibre.com/sites/${siteId}/listing_types`,
      method: 'GET'
    }, (err,res,body) => {
      if(err) reject(err);
      else resolve(JSON.parse(body));
    });
  });
};

module.exports.getIdByUserName = (userName,siteCode='MLA') => {
  return new Promise((resolve,reject) => {
    request({
      headers: {
        'Content-Type': 'application/json'
      },
      uri: `https://api.mercadolibre.com/sites/${siteCode}/search?nickname=${userName}`,
      method: 'GET'
    }, (err,res,body) => {
      if(err) reject(err);
      else resolve(JSON.parse(body).seller.id);
    });
  });
};

module.exports.getPubInfoUserById = (userId) => {
  return new Promise((resolve,reject) => {
    request({
      headers: {
        'Content-Type': 'application/json'
      },
      uri: `https://api.mercadolibre.com/users/${userId}`,
      method: 'GET'
    }, (err,res,body) => {
      if(err) reject(err);
      else resolve(JSON.parse(body));
    });
  });
};

module.exports.getPubInfoUserByName = (userName, siteCode='MLA') => {
  return new Promise((resolve,reject) => {
    this.getIdByUsername(userName,siteCode).then( userId => {
      if(!userId)reject('Not found!');
      this.getPubInfoUserById(userId).then( pubInfoUser => {
        if(pubInfoUser)resolve(pubInfoUser);
        else reject('Not found!')
      });
    });
  });
};

module.exports.getVisitFromToByUserId = (userId,startDate,endDate) => {//dd-mm-yyyy
  //https://api.mercadolibre.com/users/4445513/items_visits?date_from=2018-01-01T00:00:00.000-00:00&date_to=2018-02-10T00:00:00.000-00:00
  return new Promise((resolve,reject) => {
      request({
        headers: {
          'Content-Type': 'application/json'
        },
        uri: `https://api.mercadolibre.com/users/${userId}/items_visits?date_from=${startDate.yyyy}-${startDate.mm}-${startDate.dd}T00:00:00.000-00:00&date_to=${endDate.yyyy}-${endDate.mm}-${endDate.dd}T00:00:00.000-00:00`,
        method: 'GET'
      }, (err,res,body) => {
        if(err) reject(err);
        else resolve(JSON.parse(body));
      });
  });
};

//1st param is id to user, 2th param is cant of the daies, 3th param is type => d | D=day, m | M=month and y | Y=year
module.exports.getVisitPerDMYByUserId = (userId,itemCant,type='d') => {
  type = type.trim().toLowerCase();
  type = type[0];
  switch (type) {
    case 'd':
      type = 'day';
      break;
    case 'm':
      type = 'month';
      break;
    case 'y':
      type = 'year';
      break;
    default:
      type = 'day';
  }
  return new Promise((resolve,reject) => {
      request({
        headers: {
          'Content-Type': 'application/json'
        },
        uri: `https://api.mercadolibre.com/users/${userId}/items_visits/time_window?last=${itemCant}&unit=${type}`,
        method: 'GET'
      }, (err,res,body) => {
        if(err) reject(err);
        else resolve(JSON.parse(body));
      });
  });
  //https://api.mercadolibre.com/users/4445513/items_visits/time_window?last=20&unit=day
};

module.exports.getTotalQuestionsFromToByUserId = (userId,startDate,endDate) => {//dd-mm-yyyy
  //https://api.mercadolibre.com/items/MLV421672596/contacts/questions?date_from=2014-08-01T00:00:00.000-03:00&date_to=2014-08-02T23:59:59.999
  return new Promise((resolve,reject) => {
      request({
        headers: {
          'Content-Type': 'application/json'
        },
        uri: `https://api.mercadolibre.com/users/${userId}/contacts/questions?date_from=${startDate.yyyy}-${startDate.mm}-${startDate.dd}T00:00:00.000-00:00&date_to=${endDate.yyyy}-${endDate.mm}-${endDate.dd}T00:00:00.000-00:00`,
        method: 'GET'
      }, (err,res,body) => {
        if(err) reject(err);
        else resolve(JSON.parse(body));
      });
  });
};

module.exports.getTotalQuestionsPerDMYByUserId = (userId,itemCant,type='d') => {
  type = type.trim().toLowerCase();
  type = type[0];
  switch (type) {
    case 'd':
      type = 'day';
      break;
    case 'm':
      type = 'month';
      break;
    case 'y':
      type = 'year';
      break;
    default:
      type = 'day';
  }
  return new Promise((resolve,reject) => {
      request({
        headers: {
          'Content-Type': 'application/json'
        },
        uri: `https://api.mercadolibre.com/users/${userId}/contacts/questions/time_window?last=${itemCant}&unit=${type}`,
        method: 'GET'
      }, (err,res,body) => {
        if(err) reject(err);
        else resolve(JSON.parse(body));
      });
  });
  //https://api.mercadolibre.com/users/4445513/items_visits/time_window?last=20&unit=day
};
