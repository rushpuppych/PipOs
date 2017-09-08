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
    var objForm = new PipOsFormBuilder();
    objForm.addSelectbox({label: 'Interface', options: [{value: 'wlan_raspi', key: 'wlan_raspi'}, {value: 'wlan_stick', key: 'wlan_stick'}, {value: 'wlan_alfa', key: 'wlan_alfa'}], help: 'This is the interface wich the Accesspoint will setup.'})
    objForm.addTextbox({label: 'SSID', placeholder: 'Please enter SSID', help: 'The SSID is the name of the Wireless Network wich can be seen by all clients in the radius.'});
    objForm.addCheckbox({label: 'Hidden SSID', multi: [{value: 'hide', key: 'Yes hide AP.'}], help: 'Stops Broadcasting and hides the network from being seen by nerby Clients.'})
    objForm.addTextbox({label: 'Channel', placeholder: 'Please enter a channel id from 1 to 14', help: 'This is the Channel number on wich the Accesspoint will send and recive data.'});
    objForm.addSelectbox({label: 'Encryption', options: [{value: 'none', key: 'None'}, {value: 'WEP', key: 'WEP'}, {value: 'WPA', key: 'WPA'}, {value: 'WPA-2', key: 'WPA-2'}], help: 'This helps you to secure the Accesspoint with a Passkey. For a strong Security chose WPA-2.'})
    objForm.addTextbox({label: 'Passphrase', placeholder: 'Please enter a strong passphrase', help: 'If you chose no encryption you can ignore this. Otherwise this is the Password to enter to the Accesspoint.'});
    objForm.addTextbox({label: 'MAC Filtering', placeholder: 'Please enter all valid MAC addresses', help: 'If you want to allow only specific MAC adresses, type those in. You can type multiple MAC adresses and seperate them with semicolon.'});
    objForm.addSubmit({});

    var strHtml = objForm.render();
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
