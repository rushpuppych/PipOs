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
   * @param fncCallback   Validation Callback
   * @return void
   */
  this.validate = function(fncCallback) {
    var boolValide = true;
    for(numIndex in $this.options.validation) {
      var objValidation = $this.options.validation[numIndex];

      // Set Validation to Success
      _private.renderValidationSuccess(objValidation.form, objValidation.element);

      // Validation Rule Loop
      for(var strRuleKey in objValidation.rule) {
        eval("var fncRule = _private." + strRuleKey + ";");
        if(typeof(fncRule) == 'function') {
          // Call Validation Method
          var objParameter = objValidation.rule[strRuleKey];
          var strValue = $("#" + objValidation.form).find('[name="' + objValidation.element + '"]').val();
          if(typeof(strValue) != 'undefined') {
            var objResult = fncRule(strValue, objParameter);

            // Render Validation Errors
            if(!objResult.valide) {
              boolValide = false;
              _private.renderValidationError(objValidation.form, objValidation.element, objResult.msg);
            }
          }
        } else {
          // If Rule is not Valid do a consol log
          console.log(strRuleKey + " IS NOT A VALIDATION RULE !!");
        }
      }
    }
    
    // Callback Call
    helper.callbackCall(fncCallback, boolValide);
  };

  /**
   * renderValidationError
   * @description
   * This is somekind of a Timeout Threat Savety workaround hack
   * @param strForm     UUID of the Form
   * @param strElement  Name of the Input Element
   * @param strMsg      Validation Error Message
   * @return void
   */
  _private.renderValidationError = function(strForm, strElement, strMsg) {
    setTimeout(function() {
      objElement = $("#" + strForm).find('[name="' + strElement + '"]');
      objElement.closest('div.form-group').addClass('pip-validation-error');
      objElement.closest('div.form-group').find('span.pip-validation').html(strMsg);
    }, 100);
  }

  /**
   * renderValidationSuccess
   * @description
   * This is somekind of a Timeout Threat Savety workaround hack
   * @param strForm     UUID of the Form
   * @param strElement  Name of the Input Element
   * @return void
   */
  _private.renderValidationSuccess = function(strForm, strElement) {
    setTimeout(function() {
      objElement = $("#" + strForm).find('[name="' + strElement + '"]');
      objElement.closest('div.form-group').removeClass('pip-validation-error');
      objElement.closest('div.form-group').find('span.pip-validation').html("");
    }, 80);
  }

  /**
   * checkMaxSize
   * @description
   * This checks if the Value is not bigger than max size
   * @param strValue    The Value that has to be validated
   * @param numMaxSize  The Max Size as integer value
   * @return objReturn  Validation Return Object
   */
  _private.checkMaxSize = function(strValue, numMaxSize) {
    var objReturn = {'valide': true};
  	if(strValue.length > numMaxSize) {
  		objReturn['valide'] = false;
      objReturn['msg'] = 'Value length must be shorter than "' + numMaxSize+ '"';
    }
  	return objReturn;
  };

  /**
   * checkMinSize
   * @description
   * This checks if the Value is not smaller than max size
   * @param strValue    The Value that has to be validated
   * @param numMinSize  The Min Size as integer value
   * @return objReturn  Validation Return Object
   */
  _private.checkMinSize = function(strValue, numMinSize) {
    var objReturn = {'valide': true};
  	if(strValue.length < numMinSize) {
      objReturn['valide'] = false;
      objReturn['msg'] = 'Value length must be bigger than "' + numMinSize + '"';
    }
    return objReturn;
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
