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

  // PipOs System Variables
  $this.options = {
    validation: []
  };

  // Init
  this.init = function() {
  };

  /**
   * addValidation
   * @description
   * This adds a validation rule to the Quee.
   * @param fncElement  Dependency Injection function to get Element
   * @return objRule    Json Rule set.
   */
  this.addValidation = function(fncElement, objRule) {
    var objValidation = {
      getElement: fncElement,
      rule: objRule
    }
    $this.options.validation.push(objValidation);
  };

  /**
   * validate
   * @description
   * The Valdate Method is running the validations.
   * @param void
   * @return void
   */
  this.validate = function() {
    var boolValide = true;
    for(numIndex in $this.options.validation) {
      var objValidation = $this.options.validation[numIndex];
      // todo: objElement klapt so nicht irgend wie ist das troz Dependency Injection nicht das korrekte
      // Element :-(  )
      objElement = objValidation.getElement();

      // Validation Error
      console.log(objElement, objElement.closest('div.form-group'));
      objElement.closest('div.form-group').addClass('pip-validation-error');
      boolValide = false;
    }

    return boolValide;
  };

  /**
   * checkMaxSize
   * @description
   * This checks if the Value is not bigger than max size
   * @param strValue    The Value that has to be validated
   * @param numMaxSize  The Max Size as integer value
   * @return bool		Validation is successful or not
   */
  _private.checkMaxSize = function(strValue, numMaxSize) {
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
  _private.checkMinSize = function(strValue, numMinSize) {
  	if(strValueLength < numMinSize) {
  		return false;
  	}
  	return true;
  };

  _private.checkCharset = function(strValue, strCharset) {
	// Charset
  };

  _private.checkFormat = function(strValue, strFormat) {
	// z.B. [0-255].[0-255].[0-255].[0-255]
  };

  _private.customValidator = function(strValue, fncValidator) {
	// callback Validator (external Function)
  };

  _private.checkEmail = function(strValue) {
	// check if is Email
  };

  _private.checkDate = function(strValue, strFormat) {
	  // datum check
  };

  _private.checkTime = function(strValue) {
	  // time check
  };

  _private.checkMandatory = function(strValue) {

  };

  _private.checkDataType = function(strValue, strDatatype) {
	// check if Bool or String or Int or Float etc.
  };

  // Init Call
	$this.init();
}
