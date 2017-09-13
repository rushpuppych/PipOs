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
    attack_plan: [],
    attack_is_running: false
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
    $('body').on('click', 'span.close_modal_btn, button.close_modal_btn', function() {
      $this.btnCloseModalBtn(this);
    });

    // Click: Select Component Button Handler
    $('body').on('click', 'button.add_component_btn', function() {
      $this.btnAddComponentClick(this);
    });

    // Click: Config Component Button Handler
    $('body').on('click', 'button.config_component_btn', function() {
      $this.btnConfigComponentClick(this);
    });

    // Click: Save
    $('body').on('click', 'button.btn-save-attack', function() {
      // todo: create Save
    });

    // Click: Load
    $('body').on('click', 'button.btn-load-attack', function() {
      // todo: create load
    });

    // Click: Execute
    $('body').on('click', 'button.btn-execute-attack', function() {
      $this.btnExecuteClick(this);
    });

    // Click: Stop Execution
    $('body').on('dblclick', 'div.btn-quit-attack', function() {
      $this.btnRollbackDblClick(this);
    });


    // Click Remove Component
  };

  /**
   * btnCloseModalBtn
   * @description
   * This is the close Modal handler (on Click close modal button)
   * @param elElement     This is the Element that triggers the Event
   * @return void
   */
  this.btnCloseModalBtn = function(elElement) {
    var strModalId = '#' + $(elElement).closest('div.pip-modal').attr('id');
    $(strModalId).hide();
    $this.renderAttackGui();
    $this.runIlegalityCheck();
  };

  /**
   * btnAddComponentClick
   * @description
   * This is the Add Component Click handler (on Click add component button)
   * @param elElement     This is the Element that triggers the Event
   * @return void
   */
  this.btnAddComponentClick = function(elElement) {
    var strComponentClass = $(elElement).data('class-name');
    eval("var objComponent = new " + strComponentClass + "();");
    $this.options.attack_plan.push(objComponent);
    $this.renderAttackGui();
    $this.runIlegalityCheck();
  };

  /**
   * btnConfigComponentClick
   * @description
   * This is the Confing Component Handler (on Click config component Button)
   * @param elElement     This is the Element that triggers the Event
   * @return void
   */
  this.btnConfigComponentClick = function(elElement) {
    var numIndex = $(elElement).data('id');
    var objComponent = $this.options.attack_plan[numIndex];
    var objContainer = $('#modal_config_component').find('p.pip-card-text');
    objContainer.html("");
    objComponent.renderConfigGui(objContainer);
    $('#modal_config_component').fadeIn();
    $('#modal_config_component').attr('data-component-id', numIndex);
  };

  /**
   * btnExecuteClick
   * @description
   * This is the Attack Execution Handler (on Click execute Button)
   * @param elElement     This is the Element that triggers the Event
   * @return void
   */
  this.btnExecuteClick = function(elElement) {
    // Open Terminal
    $('#modal_execute_attack').fadeIn();
    var objTerminal = $('#execution_terminal').terminal(function(command) {
    },
    {
      greetings: '',
      name: 'execute_attack',
      height: 300,
      prompt: '[PipOs]> '
    });

    // Set All Packages Configuration
    for(var numIndex in $this.options.attack_plan) {
      if($this.options.attack_plan[numIndex].options.valide) {
        $this.options.attack_plan[numIndex].setConfiguration(objTerminal);
      }
    };

    // Run All Packages Executions
    for(var numIndex in $this.options.attack_plan) {
      if($this.options.attack_plan[numIndex].options.valide) {
        $this.options.attack_plan[numIndex].execute(objTerminal);
      }
    };

    // Render Execution GUI
    $this.options.attack_is_running = true;
    $this.renderExecutionGuiLoop(objTerminal);
  };

  /**
   * renderExecutionGuiLoop
   * @description
   * This is the Attack Result Loop
   * @param objTerminal     This is the Terminal Instance for Console Out
   * @return void
   */
  this.renderExecutionGuiLoop = function(objTerminal) {
    // Stop Execution
    if(!$this.options.attack_is_running) {
      return;
    }

    // Render Terminal
    objTerminal.clear();
    for(var numIndex in $this.options.attack_plan) {
      if($this.options.attack_plan[numIndex].options.valide) {
        $this.options.attack_plan[numIndex].renderExecutionGui(objTerminal);
      }
    };

    // Recal Terminal Refresher every 1 Second
    setTimeout(function() {
        $this.renderExecutionGuiLoop(objTerminal);
    }, 1000);
  };

  /**
   * btnRollbackDblClick
   * @description
   * This is the Attack Execution Handler (on Click execute Button)
   * @param elElement     This is the Element that triggers the Event
   * @return void
   */
  this.btnRollbackDblClick = function(elElement) {
    // Stop Running attack
    $this.options.attack_is_running = false;
    $(elElement).hide()

    // todo: Config Rollback

    // Execute Rollback Methodes
    for(var numIndex in $this.options.attack_plan) {
      if($this.options.attack_plan[numIndex].options.valide) {
        $this.options.attack_plan[numIndex].rollbackAttack();
      }
    };
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
