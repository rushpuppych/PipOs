/**
 * AccessPointComponent
 * @description
 * This PipOs Components is setting up an Wireless Device in AccessPoint Mode
 */
var AccessPointComponent = function(options) {
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
      resource: ["wlan_alfa"],
      config: ["/etc/network/network.conf"],
      legal_code: 1 // 1= no Problem | 2= might be ilegal | 3= This is ilegal
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
  this.renderGui() {

  };

  /**
   * setConfiguration
   * @description
   * This Method will be called to Set the Raspi Configuration
   * @param void
   * @return void
   */
  this.setConfiguration() {

  };

  /**
   * run
   * @description
   * This Method will be called to execute Shell Code wich is reading the Configs and Starting the
   * Attack Execution.
   * @param void
   * @return void
   */
  this.run() {

  };
};
