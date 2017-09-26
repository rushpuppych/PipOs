/**
 * WifiMonitorComponent
 * @description
 * This PipOs Components is setting up an Wireless Device in Monitor Mode
 */
var WifiMonitorComponent = function(options) {
  var $this = this;
  var helper = new PipOsHelper();

  // PipOs System Variables
  this.options = $.extend({
  }, options);

  /**
   * getInfo
   * @description
   * This are the Main Component Infos wich are used for the resource management
   * @param void
   * @return void
   */
  this.getInfo = function() {
    var objInfo = {
      name: "Wifi Monitor",
      icon: "fa fa-wifi",
      color: "",
      class_name: "WifiMonitorComponent",
      valide: $this.options.valide,
      resource: $this.options.resources,
      config_files: $this.options.config_files
    }


    return objInfo;
  }

  /**
   * renderGui
   * @description
   * THis Method will be called to render the Components Config UI
   * @param void
   * @return void
   */
  this.renderConfigGui = function() {

  };

  /**
   * setConfiguration
   * @description
   * This Method will be called to Set the Raspi Configuration
   * @param objTerminal     This is the Terminal Instance for Console Out
   * @return void
   */
  this.setConfiguration = function(objTerminal) {

  };

  /**
   * execute
   * @description
   * This Method will be called to execute Shell Code wich is reading the Configs and Starting the
   * Attack Execution.
   * @param objTerminal     This is the Terminal Instance for Console Out
   * @return void
   */
  this.execute = function(objTerminal) {

  };

  /**
   * renderExecutionGui
   * @description
   * This is the Gui Element that will be showed when the Attack is running
   * @param objTerminal     This is the Terminal Instance for Console Out
   * @return void
   */
  this.renderExecutionGui = function(objTerminal) {

  };

  /**
   * rollbackAttack
   * @description
   * This willbe called for Rollback Execution
   * @param void
   * @return void
   */
  this.rollbackAttack = function() {

  };
};
