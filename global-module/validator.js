module.exports = class Validator {
  constructor(strCompared,lenguageOn){
    this.strCompared = strCompared;
    this.lenguage = lenguageOn;
  }
  validateOptionMenu(str){
    return str.indexOf(this.strCompared.toLowerCase()) !== -1 ;
  }
  fullValidateOptionMenu(str){
    return this.validateOptionMenu(this.lenguage[str].singular) || this.validateOptionMenu(this.lenguage[str].plural);
  }
}
