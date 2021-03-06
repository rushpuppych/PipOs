/**
 * AccessPointComponent
 * @description
 * This PipOs Components is setting up an Wireless Device in AccessPoint Mode
 */
var AccessPointComponent = function(options) {
  var $this = this;
  var _private = {};
  var helper = new PipOsHelper();
  var system = new PipOsSystem({config_path: 'packages/attack/component/configs'});

  // PipOs System Variables
  this.options = $.extend({
    valide: false,
    resources: ["wlan_alfa"],
    config_files: ["/etc/network/network.conf"],
    config_vars: {}
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
   * renderConfigGui
   * @description
   * THis Method will be called to render the Components Config UI
   * @param elContainer     This is the Container where the GUI is rendered to
   * @return void
   */
  this.renderConfigGui = function(elContainer) {
    // Build Form
    var objForm = new PipOsFormBuilder();

    // Build Tab Naviation
    objForm.addTab({group: 'basic', name: 'Basic'});
    objForm.addTab({group: 'security', name: 'Security'});
    objForm.addTab({group: 'terminal', name: 'Output'});

    // Interface Selectbox
    objForm.addSelectbox({
      label: 'Interface',
      name:'iface',
      tab_group: 'basic',
      options: [
        {value: 'wlan_raspi', key: 'wlan_raspi'},
        {value: 'wlan_stick', key: 'wlan_stick'},
        {value: 'wlan_alfa', key: 'wlan_alfa'}
      ],
      help: 'This is the interface wich the Accesspoint will setup.'
    });

    // SSID Textbox
    objForm.addTextbox({
      label: 'SSID',
      name:'ssid' ,
      tab_group: 'basic',
      placeholder: 'Please enter SSID',
      help: 'The SSID is the name of the Wireless Network wich can be seen by all clients in the radius.',
      validation: {
        checkMaxSize: 32,
        checkMinSize: 3
      }
    });

    // Channel Textbox
    objForm.addTextbox({
      label: 'Channel',
      name:'channel' ,
      tab_group: 'basic',
      placeholder: 'Please enter a channel id from 1 to 14',
      help: 'This is the Channel number on wich the Accesspoint will send and recive data.'
    });

    // Encryption Selectbox
    objForm.addSelectbox({
      label: 'Encryption',
      name:'encryption',
      tab_group: 'security',
      options: [
        {value: 'none', key: 'None'},
        {value: 'WEP', key: 'WEP'},
        {value: 'WPA', key: 'WPA'},
        {value: 'WPA-2', key: 'WPA-2'}
      ],
      help: 'This helps you to secure the Accesspoint with a Passkey. For a strong Security chose WPA-2.'
    });

    // Passphrase Textbox
    objForm.addTextbox({
      label: 'Passphrase',
      name:'passphrase' ,
      tab_group: 'security',
      placeholder: 'Please enter a strong passphrase',
      help: 'If you chose no encryption you can ignore this. Otherwise this is the Password to enter to the Accesspoint.'
    });

    // MAC Filtering Textbox
    objForm.addTextbox({
      label: 'MAC Filtering',
      name:'mac_filter' ,
      tab_group: 'security',
      placeholder: 'Please enter all valid MAC addresses',
      help: 'If you want to allow only specific MAC adresses, type those in. You can type multiple MAC adresses and seperate them with semicolon.'
    });

    // Hidden SSID Checkbox
    objForm.addCheckbox({
      label: 'Hidden SSID',
      tab_group: 'security',
      multi: [
        {name:'hidden_ssid', value: 'hide', key: 'Yes hide AP.'}
      ],
      help: 'Stops Broadcasting and hides the network from being seen by nerby Clients.'
    });

    // Form Submit Button
    objForm.addSubmit({
      callback: function(objData) {
        $this.options.valide = objData.valid;
        $this.options.config_vars = objData;
        _private.renderForm(elContainer, objForm);
      },
      validate_form: true
    });

    // Form Close Modal Button
    objForm.addCloseModal({});

    // Render Form
    _private.renderForm(elContainer, objForm);
  };

  /**
   * renderForm
   * @description
   * Rendering Formular
   * @param elContainer   The HTML Form will be rendered into this Formular
   * @param objForm       This Form will be rendered
   * @return void
   */
  _private.renderForm = function(elContainer, objForm) {
    var strHtml = objForm.render(elContainer);
    objForm.setGuiData($this.options.config_vars);
  };

  /**
   * setConfiguration
   * @description
   * This Method will be called to Set the Raspi Configuration
   * @param objTerminal     This is the Terminal Instance for Console Out
   * @return void
   */
  this.setConfiguration = function(objTerminal) {
    // Write Config.conf
    var objConfig = {
      components: [
        {test_content: 'Config 1'},
        {test_content: 'Config 2'},
        {test_content: 'Config 3'},
      ]
    };
    system.setConfiguration('config.conf', objConfig);

    // Write next config.
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
    objTerminal.echo('[AccessPoint]> Execute: Restart LAN Adapter "wlan_alfa"');
    // todo:
    // run shell code
  };

  /**
   * renderExecutionGui
   * @description
   * This is the Gui Element that will be showed when the Attack is running
   * INFO: This will be called every second. So you can Refresh the Output.
   * @param objTerminal     This is the Terminal Instance for Console Out
   * @return void
   */
  this.renderExecutionGui = function(objTerminal) {
    objTerminal.echo("[[;#ffc107;]AccessPoint: ]Connected Clients: " + Date.now());
    // this goes into the Execution Terminal
    // this is the Gui Part wich is rendered wenn attack is running
  };

  /**
   * rollbackAttack
   * @description
   * This willbe called for Rollback Execution
   * @param void
   * @return void
   */
  this.rollbackAttack = function() {
    console.log('RESET ACCESSPOINT');
  };
};
