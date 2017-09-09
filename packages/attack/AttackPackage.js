/**
 * AttackPackage
 * @description
 * This is the Attack Package for the PipOs Framework. The AttackPackage handels components and
 * lets the user build his own attack config over the GUI.
 * PipOs is a Electron Application for Raspberry Pi Based Security and Pentests Developement
 * It is completely based on JavaScript and can be used to rappidely develop some Pentest environments.
 */
var AttackPackage = function(options) {
  var $this = this;
  var helper = new PipOsHelper();

  // PipOs System Variables
  this.options = $.extend({
    elContainer: '',
    components: [],
    attack_plan: []
  }, options);

  /**
   * Init Constructor
   */
  this.init = function() {
    // Registering all components
    $this.registerComponents();
  };

  /**
   * getInfo
   * @description
   * This is a Mandatory method that returns the Package Informations
   * @param void
   * @return void
   */
  this.getInfo = function() {
    var objInfo = {
      title: "Attack",
      icon: "fa-rocket",
      category: "main"
    };
    return objInfo;
  };

  /**
   * registerComponents
   * @description
   * This method is used to register all components that could be used to build and
   * perform an attack.
   * @param void
   * @return void
   */
  this.registerComponents = function() {
    $this.addComponent(new AccessPointComponent());
  };

  /**
   * addComponent
   * @description
   * This Method is adding a Component to the Component List
   * @param void
   * @return void
   */
  this.addComponent = function(objComponent) {
    $this.options.components.push(objComponent);
  };

  /**
   * run
   * @description
   * This Runs the AttackPackage Gui (this will be called by clicking on the menu button)
   * @param elContainer    The Container where you render the Content into.
   * @return void
   */
  this.run = function(elContainer) {
    // Set and Clear Container
    $this.options.elContainer = elContainer;
    $(elContainer).html("");

    // Render Gui
    $this.renderAttackGui();

    // Run Event Manager
    $this.eventManager();
  };

  /**
   * renderAttackGui
   * @description
   * This Renders the AttackGui and Loads the Mustache Template from Server.
   * @param void
   * @return void
   */
  this.renderAttackGui = function() {
    // Build Template Variables
    var objTemplateVariables = {
      components: [],
      attack_plan: []
    };

    // Build Attack Plan
    for(numIndex in $this.options.attack_plan) {
      var objComponent = $this.options.attack_plan[numIndex];
      var objInfo = objComponent.getInfo();
      objInfo.index = numIndex;
      if(objInfo.color == 'success') {
        objInfo.color = 'default';
      }
      objTemplateVariables.attack_plan.push(objInfo);
    }

    // Build Components
    for(numIndex in $this.options.components) {
      var objComponent = $this.options.components[numIndex];
      var objInfo = objComponent.getInfo();
      objTemplateVariables.components.push(objInfo);
    }

    // Loading the Attack HTML and Render it to Container
    var strHtml = helper.loadHtmlTemplate("packages/attack/templates/attack.html", objTemplateVariables);
    $this.options.elContainer.html(strHtml);
  }

  /**
   * run
   * @description
   * This is the internal EventManager for the Add Component Modal
   * @param void
   * @return void
   */
  this.eventManager = function() {
    // Click: Add Component Button Handler
    $('body').on('click', 'button.add_modal_btn', function() {
      $('#modal_select_component').fadeIn();
    });

    // Click: Close Modal Button Handler
    $('body').on('click', 'span.close_modal_btn', function() {
      var strModalId = '#' + $(this).closest('div.pip-modal').attr('id');
      $(strModalId).hide();
      $this.renderAttackGui();
    });

    // Click: Select Component Button Handler
    $('body').on('click', 'button.add_component_btn', function() {
      var strComponentClass = $(this).data('class-name');
      eval("var objComponent = new " + strComponentClass + "();");
      $this.options.attack_plan.push(objComponent);
      $this.renderAttackGui();
      $this.runIlegalityCheck();
    });

    // Click: Config Component Button Handler
    $('body').on('click', 'button.config_component_btn', function() {
      var numIndex = $(this).data('id');
      var objComponent = $this.options.attack_plan[numIndex];
      var objContainer = $('#modal_config_component').find('p.pip-card-text');
      objContainer.html("");
      objComponent.renderConfigGui(objContainer);
      $('#modal_config_component').fadeIn();
      $('#modal_config_component').attr('data-component-id', numIndex);
    });

    // Click: Save

    // Click: Load

    // Click: Execute

    // Click Remove Component
  };

  /**
   * runIlegalityCheck
   * @description
   * This Loops the Attack Plan Components and evaluates the Ilegality of the Attack
   * @param void
   * @return void
   */
  this.runIlegalityCheck = function() {
    var boolWarning = false;
    var boolDanger = false;

    // Loop over all valide attack Plan Components and check the Ilegality
    for(numIndex in $this.options.attack_plan) {
      var objComponent = $this.options.attack_plan[numIndex];
      var objInfo = objComponent.getInfo();
      if(objInfo.valide == true) {
        if(objInfo.color == 'warning') {
          boolWarning = true;
        }
        if(objInfo.color == 'danger') {
          boolDanger = true;
        }
      }
    }

    // Show Ilegality Message
    if(boolWarning) {
      $('#msg_ilegal_caution').show();
      $('#msg_ilegal_warning').hide();
    }
    if(boolDanger) {
      $('#msg_ilegal_caution').hide();
      $('#msg_ilegal_warning').show();
    }
  };

  // Init Call
  $this.init();
};
