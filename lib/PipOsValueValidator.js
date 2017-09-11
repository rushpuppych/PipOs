/**
 * PipOsValueValidator
 * @description
 * This is the ValueValidator Class it can check values and validate them.
 * PipOs is a Electron Application for Raspberry Pi Based Security and Pentests Developement
 * It is completely based on JavaScript and can be used to rappidely develop some Pentest environments.
 */
var PipOsValueValidator = function() {
  var $this = this;
  var _private = {};
  var helper = new PipOsHelper();

  $this.options = {
  };

  // Init
  this.init = function() {
  };

  /**
   * checkMaxSize
   * @description
   * This checks if the Value is not bigger than max size
   * @param strValue    The Value that has to be validated
   * @param numMaxSize  The Max Size as integer value
   * @return bool		Validation is successful or not     
   */
  this.checkMaxSize = function(strValue, numMaxSize) {
	if(strValue.length > numMaxSize) {
		return false;
	}
	return true;
  };
  
  /**
   * checkMinSize
   * @description
   * This checks if the Value is not smaller than max size
   * @param strValue    The Value that has to be validated
   * @param numMaxSize  The Min Size as integer value
   * @return bool		Validation is successful or not     
   */  
  this.checkMinSize = function(strValue, numMinSize) {
	if(strValueLength < numMinSize) {
		return false;
	}
	return true;
  };
    
  this.checkCharset = function(strValue, strCharset) {
	// Charset
  };
  
  this.checkFormat = function(strValue, strFormat) {
	// z.B. [0-255].[0-255].[0-255].[0-255]
  };
   
  this.customValidator = function(strValue, fncValidator) {
	// callback Validator (external Function)
  };
  
  this.checkEmail = function(strValue) {
	// check if is Email
  };
  
  this.checkDate = function(strValue, strFormat) {
	  // datum check
  };
  
  this.checkTime = function(strValue) {
	  // time check
  };  
  
  this.checkMandatory = function(strValue) {
  
  };
  
  this.checkDataType = function(strValue, strDatatype) {
	// check if Bool or String or Int or Float etc.
  };
  
  // Init Call
	$this.init();
}
