/**
 * PipOsHelper
 * @description
 * This is the Helper Method for the PipOs Framework
 * PipOs is a Electron Application for Raspberry Pi Based Security and Pentests Developement
 * It is completely based on JavaScript and can be used to rappidely develop some Pentest environments.
 */
var PipOsHelper = function() {
  var $this = this;
  var _private = {};

  /**
   * helperCallbackCall
   * @description
   * This Helper is managing the Callback Call.
   * @param fncCallback    This is the Callback function that should be called
   * @param arrParameters  This is the Optional Parameter Array fot the Callback Function
   * @return optional      Gives Return if the callback function provides a Return value
   */
  this.callbackCall = function(fncCallback, arrParameters) {
    if(typeof(fncCallback) == "function") {
      if(typeof(arrParameters) == 'undefined') {
        return fncCallback();
      } else {
        return fncCallback(arrParameters);
      }
    }
  };

  /**
   * uuid
   * @description
   * This Method is generating a Unique UUID
   * @param void
   * @return void
   */
  this.uuid = function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };

  /**
   * loadHtmlTemplate
   * @description
   * This Method uses Ajax Asynchrone Loading mechanics to load a HMTL template and
   * renders the Mustache content.
   * @param strTemplatePath        Path to the HTML template
   * @param objTemplateVariables   The Mustache Template variables
   * @return String                The finished rendered HTML Result
   */
  this.loadHtmlTemplate = function(strTemplatePath, objTemplateVariables) {
    var strTemplateHtml = "";
    $.ajax({
      url: strTemplatePath,
      async: false,
      success: function(strPlainHtml) {
        strTemplateHtml = Mustache.render(strPlainHtml, objTemplateVariables);
      }
    });
    return strTemplateHtml;
  };

  /**
   * loadFile
   * @description
   * This Method uses Ajax Asynchrone Loading mechanics to load file
   * @param strFilePath        Path to file that should be loaded
   * @return String            The loaded file content
   */
  this.loadFile = function(strFilePath) {
    var strFile = "";
    $.ajax({
      url: strFilePath,
      async: false,
      success: function(strFileContent) {
        strFile = strFileContent;
      },
      error: function(objResponse) {
        strFile = objResponse.responseText;
      }
    });
    return strFile;
  };

  /**
   * externdRecursively
   * @description
   * This Method is Mergin two Object Recursively
   * @param objObject1        Object 1
   * @param objObject2        Object 2
   * @return objMerged        The Merged Object
   */
  this.externdRecursively = function(objObject1, objObject2) {
    var objMerged = objObject1 ;
    for (var prop in objObject2){
        if (objObject2.hasOwnProperty(prop)){
            objMerged[prop] = objMerged[prop].concat(objObject2[prop]);
        }
    }
    return objMerged;
  };
  
};
