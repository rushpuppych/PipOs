/**
 * AccessPointComponent
 * @description
 * This PipOs Components is setting up an Wireless Device in AccessPoint Mode
 */
var AccessPointComponent = function(options) {
  var $this = this;
  var helper = new PipOsHelper();
  var formular = new PipOsFormBuilder();

  // PipOs System Variables
  this.options = $.extend({
    valide: false,
    resources: ["wlan_alfa"],
    config_files: ["/etc/network/network.conf"]
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
      name: "AccessPoint",
      icon: "fa fa-wifi",
      color: "warning",
      class_name: "AccessPointComponent",
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
   * @param elContainer     This is the Container where the GUI is rendered to
   * @return void
   */
  this.renderGui = function(elContainer) {
    formular.addTextbox({label: 'SSID', placeholder: 'Please enter SSID', help: 'The SSID is the name of the Wireless Network wich can be seen by all clients in the radius.'});
    formular.addInfoText({});
    formular.addTextArea({});
    formular.addRadiobox({});
    formular.addCheckbox({});
    formular.addSelectbox({});
    formular.addSubmit({});

    var strHtml = formular.render();
    $(elContainer).html(strHtml);
  };

  /**
   * setConfiguration
   * @description
   * This Method will be called to Set the Raspi Configuration
   * @param void
   * @return void
   */
  this.setConfiguration = function() {

  };

  /**
   * run
   * @description
   * This Method will be called to execute Shell Code wich is reading the Configs and Starting the
   * Attack Execution.
   * @param void
   * @return void
   */
  this.run = function() {

  };
};
