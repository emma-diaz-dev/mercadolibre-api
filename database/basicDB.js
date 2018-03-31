const mongoose = require('mongoose')
    Schema = mongoose.Schema;
let thisRef,newElementSchema,consultaJson;
class BasicDB{
  constructor(elementSchema,keySchema="name",dbName="tecnoscraping"){
    this.elementToNow = elementSchema;
    this.urlMongo = `mongodb://127.0.0.1:27017/${dbName}`;
    this._keySchema=keySchema;
    this._isConnected=false;
    this._connect();
  }
  _connect(){
    if(!this._isConnected){
      this._isConnected = true;
      this._connection = mongoose.connect(this.urlMongo);
    }
  }
  _disconnect(){
    if(this._isConnected){
      this._isConnected = false;
      mongoose.connection.close();
    }
  }
  getIdByKey(keyValue){
    return new Promise((resolve,reject) => {
      // this._connect();
      consultaJson = {};
      consultaJson[this._keySchema] = keyValue;
      this.elementToNow.findOne(consultaJson,(err, element) => {
        // console.log(element);
        if (err) {
          console.log(err);
          return null;
        } else {
          // this._disconnect();
          resolve(element?element._id:null);
        }
      });
    });
  }
  getElementByKey(keyValue){
    return new Promise((resolve,reject) => {
      let consultaJson = {};
      consultaJson[this._keySchema] = keyValue;
      this.elementToNow.findOne(consultaJson,(err, element) => {
        if (err) {
          reject('error',err);
        } else {
          resolve(element);
        }
      });
    });
  }
  getElementsByKey(keyValue){
    return new Promise((resolve,reject) => {
      this._connect();
      let consultaJson = {};
      consultaJson[this._keySchema] = keyValue;
      this.elementToNow.find(consultaJson,(err, elements) => {
        if (err) {
          reject('error',err);
        } else {
          resolve(elements);
        }
      });
    });
  }
  getElementsByField(fieldName,fieldValue){
    return new Promise((resolve,reject) => {
      this._connect();
      let consultaJson = {};
      consultaJson[fieldName] = fieldValue;
      this.elementToNow.find(consultaJson,(err, elements) => {
        if (err) {
          reject('error',err);
        } else {
          resolve(elements);
        }
      });
    });
  }
  getKeyById(idValue){
    return new Promise((resolve,reject) => {
      // this._connect();
      let consultaJson = {};
      consultaJson._id = idValue;
      this.elementToNow.findOne(consultaJson,(err, element) => {
        if (err) {
          console.log(err);
          return null;
        } else {
          // this._disconnect();
          resolve((element && element[this._keySchema])?element[this._keySchema]:null);
        }
      });
    });
  }
  findAllWebSites(){
    return new Promise((resolve,reject) =>{
      this._connect();
      this.elementToNow.find((err, elements) => {
        if (err) {
          console.log(err);
        } else {
          // this._disconnect();
            resolve(elements);
        }
      });
    });
  }
  findElementByName(keyValue){
    return new Promise((resolve,reject) =>{
      // this._connect();
      let consultaJson = {};
      consultaJson[this._keySchema] = keyValue;
      this.elementToNow.find(consultaJson,(err, element) => {
        if (err) {
          console.log(err);
        } else {
          // this._disconnect();
          resolve(element);
        }
      });
    });
  }
  findElementWithSkipLimit(numSkip=0,numLimit=5){
    return new Promise((resolve,reject) =>{
      this.elementToNow.find()
      .limit(numLimit)
      .skip(numSkip)
      .exec((err,data) => {
        if(err){
          console.log(err);
        }else{
          resolve(data);
        }
      });
    });
  }
  findOneElementByName(keyValue){
    return new Promise((resolve,reject) =>{
      // this._connect();
      let consultaJson = {};
      consultaJson[this._keySchema] = keyValue;
      this.elementToNow.findOne(consultaJson,(err, element) => {
        if (err) {
          console.log(err);
        } else {
          // this._disconnect();
          resolve(element);
        }
      });
    });
  }
  findElementByKeyWithState(keyValue,objState){
    return new Promise((resolve,reject) =>{
      // this._connect();
      let consultaJson = {};
      consultaJson[this._keySchema] = keyValue;
      this.elementToNow.findOne(consultaJson,(err, element) => {
        if (err) {
          console.log(err);
        } else {
          // this._disconnect();
          resolve({element,objState});
        }
      });
    });
  }
  updateElement(keyValue,fieldChangeName,fieldChangeValue){
    let conditions = {};
    conditions[this._keySchema] = keyValue;
    let updateJson = {};
    updateJson[fieldChangeName]=fieldChangeValue;
    let update = { $set: updateJson},
    options = { multi: true };
    this.elementToNow.update(conditions, update, options, (err,numAffect) =>{
      if(!err)console.log('Update successful!!');
    });
  }
  updateElementById(keyValue,fieldChangeName,fieldChangeValue){
    return new Promise((resolve,reject) => {
      let conditions = {};
      conditions._id = keyValue;
      let updateJson = {};
      updateJson[fieldChangeName]=fieldChangeValue;
      let options = { multi: true };
      this.elementToNow.update(conditions, { $set: updateJson}, options, (err,numAffect) =>{
        if(!err){
          console.log('Update successful!!');
          resolve();
        }
      });
    });
  }
  updateMultiElement(keyValue,objFields){
    return new Promise((resolve,reject)=>{
      let conditions = {};
      conditions[this._keySchema] = keyValue;
      this.elementToNow.update(conditions, { $set: objFields}, { multi: true }, (err,numAffect) =>{
        if(!err){
          console.log('Update successful!!', numAffect);resolve();
        }
        else reject();
      });
    });
  }
  saveElement(newElement,validate=true){
    thisRef = this;
    return new Promise((resolve,reject) =>{
      newElementSchema=null;
      // thisRef._connect();
      if(validate){
        thisRef.getIdByKey(newElement[this._keySchema]).then(result => {
        if(!result){
          newElementSchema = new thisRef.elementToNow(newElement);
          console.log(newElement);
          // thisRef._connect();
          newElementSchema.save( err => {
            if(!err)console.log('Save successful!');
            else{ console.log('en el error'); console.log(err);}
            // thisRef._disconnect()
            resolve();
          });
        }else {
          console.log(`El sitio Web ${newElement[this._keySchema]} ya esta agregado al a DB!`);
          // thisRef._disconnect();
          resolve();
        }
      });
    }else{
      newElementSchema = new thisRef.elementToNow(newElement);
      console.log(newElement);
      thisRef._connect();
      newElementSchema.save( err => {
        if(!err)console.log('Save successful!');
        else{ console.log('en el error'); console.log(err);}
        // thisRef._disconnect()
        resolve();
      });
    }
    })
  }

}
module.exports.BasicDB = BasicDB;
