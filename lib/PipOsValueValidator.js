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
   * @param strFormId   ID of the Elements Formular
   * @param strElName   Name of the Element
   * @return objRule    Json Rule set.
   */
  this.addValidation = function(strFormId, strElName, objRule) {
    var objValidation = {
      form: strFormId,
      element: strElName,
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

      // Validation
      // todo: Loop over all Validation Rules and VALIDATE

      // Validation Error
      /*
      boolValide = false;
      setTimeout(function() {
        objElement = $("#" + objValidation.form).find('[name="' + objValidation.element + '"]');
        objElement.closest('div.form-group').addClass('pip-validation-error');
        objElement.closest('div.form-group').find('span.pip-validation').html('VALIDATION ERROR');
      }, 100);
      */
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
