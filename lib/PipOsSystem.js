/**
 * PipOsFilesystem
 * @description
 * This is the System Wrapper. It uses the Electron Node JS File System Component
 * PipOs is a Electron Application for Raspberry Pi Based Security and Pentests Developement
 * It is completely based on JavaScript and can be used to rappidely develop some Pentest environments.
 */
var PipOsSystem = function(options) {
  var $this = this;
  var _private = {};
  var helper = new PipOsHelper();

  // PipOs System Variables
  this.options = $.extend({
    config_path: ''
  }, options);

  /**
   * Init Constructor
   */
  this.init = function() {
    // Generate Config Nodes if not existing
    _private.buildConfigNodes();
  }

  /**
   * setConfiguration
   * @description
   * Set the Configuration vars into the Config file stored in PipOs_GLOBAL
   * @param strConfigFilePath   This is the Config File Path
   * @param objConfigVars       This are the Config Vars
   * @return void
   */
  this.setConfiguration = function(strConfigFilePath, objConfigVars) {
    // Load Config File
    _private.loadConfigFile(strConfigFilePath);

    // Set Config Vars
    _private.setConfigVars(strConfigFilePath, objConfigVars);
  };

  /**
   * loadConfigFile
   * @description
   * This is loading the Config file from the config folder
   * @param strConfigFilePath   This is the Config File Path
   * @return void
   */
  _private.loadConfigFile = function(strConfigFile) {
    // Write Configs to config node
    if(typeof(PipOs_GLOBAL['system']['config_files'][strConfigFile]) == 'undefined') {
      var strFilePath = $this.options.config_path + '/' + strConfigFile;
      strConfigData = helper.loadFile(strFilePath);
      PipOs_GLOBAL['system']['config_files'][strConfigFile] = strConfigData;
    }
  };

  /**
   * setConfigVars
   * @description
   * This sets the Config vars and extends them Recursively if needed
   * @param strConfigFilePath   This is the Config File Path
   * @param objConfigVars       This are the Config Vars
   * @return void
   */
  _private.setConfigVars = function(strConfigFile, objConfigVars) {
    // Write Config vars to config node
    if(typeof(PipOs_GLOBAL['system']['config_vars'][strConfigFile]) == 'undefined') {
      PipOs_GLOBAL['system']['config_vars'][strConfigFile] = objConfigVars;
    } else {
      var objActualConfigVars = PipOs_GLOBAL['system']['config_vars'][strConfigFile];
      var objMerged = helper.externdRecursively(objActualConfigVars, objConfigVars);
      PipOs_GLOBAL['system']['config_vars'][strConfigFile] = objMerged;
    }
  };

  /**
   * buildConfigNodes
   * @description
   * This builds the Config nodes and guarantees there existence
   * @param void
   * @return void
   */
  _private.buildConfigNodes = function() {
    // Build System Node if not existing
    if(typeof(PipOs_GLOBAL['system']) == 'undefined') {
      PipOs_GLOBAL['system'] = {};
    }

    // Build System Config Node if not exiting
    if(typeof(PipOs_GLOBAL['system']['config_files']) == 'undefined') {
      PipOs_GLOBAL['system']['config_files'] = {};
    }

    // Build System Config Node if not exiting
    if(typeof(PipOs_GLOBAL['system']['config_vars']) == 'undefined') {
      PipOs_GLOBAL['system']['config_vars'] = {};
    }
  };

  // Init Call
  $this.init();
}
