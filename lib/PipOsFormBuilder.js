/**
 * PipOsFormBuilder
 * @description
 * This is the PipOs Formular Builder Lib. It Can be used to easily build some fancy UI components
 * PipOs is a Electron Application for Raspberry Pi Based Security and Pentests Developement
 * It is completely based on JavaScript and can be used to rappidely develop some Pentest environments.
 */
var PipOsFormBuilder = function() {
  var $this = this;
  var _private = {};
  var helper = new PipOsHelper();
  var validator = new PipOsValueValidator();

  $this.options = {
    tabs: [],
    form: [],
    uuid: '',
    submit_callback: {},
	};

	// Init
	this.init = function() {
    // Generate Form UUID
		$this.options.uuid = helper.uuid();

    // Run Event Manager
    $('body').find('button.form-submit-btn').off();
    _private.eventManager();
	};

  /**
   * render
   * @description
   * This renders the Form and returns the pure Form HTML
   * @param strContainer   This is the Container in wich the Form will be rendered
   * @return void
   */
	this.render = function(elContainer) {
		// Html Template Tabs
		var strHtml = '';
    if($this.options.tabs.length > 0) {
      strHtml += '<ul class="nav nav-tabs pip-tabs">';
      for(var numIndex in $this.options.tabs) {
  			var objElement = $this.options.tabs[numIndex];
  			strHtml += $('<div>').append(objElement.clone()).html();
  		}
      strHtml += '</ul><br>';
    }

    // Html Template Form
    strHtml += '<form id="{{uuid}}">';
		for(var numIndex in $this.options.form) {
			var objElement = $this.options.form[numIndex];
			strHtml += $('<div>').append(objElement.clone()).html();
		}
		strHtml += '<form>';

    // Mustache Templating
    strHtml = Mustache.render(strHtml, {uuid: $this.options.uuid});
    elContainer.html(strHtml);

    // Trigger Click First Nav
    $($('#' + $this.options.uuid).closest('p.pip-card-text').find('a.nav-link')[0]).trigger('click');
    
    // Run OnScreen Keyboard
    $('input').off().keyboard();
	};

  /**
   * setGuiData
   * @description
   * This is a setvalue Helper AFTER gui is rendered. It can set the Values by the Name Tag
   * @param objData     This is the KeyValue Array of the settable data.
   * @return void
   */
  this.setGuiData = function(objData) {
    var objForm = $('#' + $this.options.uuid);
    for(var strName in objData) {
      objForm.find('[name="' + strName + '"]').val(objData[strName]);
    }
  }

  /**
   * eventManager
   * @description
   * This is the Eventmanager for the FormBuilder
   * @param void
   * @return void
   */
  _private.eventManager = function() {
    // Submit Eventhandler
    $('body').off('click', 'button.form-submit-btn');
		$('body').on('click', 'button.form-submit-btn', function() {
      var objForm = $('#' + $this.options.uuid);
      var objData = {};
      objForm.find('.pip-control').each(function(numIndex, objElement) {
        var strKey = $(objElement).attr('name');
        var strValue = $(objElement).val();
        objData[strKey] = strValue;
      });

      // Validation Mode Options
      if($(this).attr('data-validate-form') == "true") {
        validator.validate(function(boolValidate) {
          // Run Callback
          objData.valid = boolValidate;
          helper.callbackCall($this.options.submit_callback, objData);
        });
      }
    });
  };

  /**
   * addTab
   * @description
   * This is adding a Simple Tabnavigation to the FormBuilder
   * @param void
   * @return void
   */
  this.addTab = function(objOptions) {
    // Set FirstTab to Active
    if($this.options.tabs.length == 0) {
      objOptions.active = "active";
    } else {
      objOptions.active = "";
    }

    // JavaScript
    strJs = "$('#" + $this.options.uuid + "').find('.form-group').hide();";
    strJs += "$('#" + $this.options.uuid + "').find('div.{{group}}').fadeIn();";
    strJs += "$('#" + $this.options.uuid + "').closest('p.pip-card-text').find('a.nav-link').removeClass('active');";
    strJs += "$(this).addClass('active');";

    // Html Template
    var strHtml = '';
		strHtml += '<li class="nav-item">';
    strHtml += '   <a class="nav-link {{active}}" href="#" onClick="' + strJs + '">{{name}}</a>';
		strHtml += '</li>';

    // Mustache Templating
    strHtml = Mustache.render(strHtml, objOptions);

    // Generate Form Element
		var objElement = $(strHtml);
		$this.options.tabs.push(objElement);
  };

  /**
   * addTextbox
   * @description
   * This generates a Textbox
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return void
   */
	this.addTextbox = function(objOptions) {
    // Html Template
    var strHtml = '';
		strHtml += '<div class="form-group {{tab_group}}">';
    strHtml += '   <span class="pip-validation"></span>';
		strHtml += '   <label>{{label}}</label>';
		strHtml += '   <input type="text" name="{{name}}" class="form-control pip-control" value="{{value}}" placeholder="{{placeholder}}">';
    strHtml += '   <small class="form-text text-muted">{{help}}</small>';
		strHtml += '</div>';

    // Mustache Templating
    strHtml = Mustache.render(strHtml, objOptions);

    // Set Validator
    if(typeof(objOptions['validation']) != 'undefined') {
      validator.addValidation($this.options.uuid, objOptions['name'], objOptions['validation']);
    }

    // Generate Form Element
		var objElement = $(strHtml);
		$this.options.form.push(objElement);
	};

  /**
   * addTextArea
   * @description
   * This generates a Submit Button
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return void
   */
	this.addTextArea = function(objOptions) {
    // Html Template
		var strHtml = '';
		strHtml += '<div class="form-group {{tab_group}}">';
    strHtml += '   <span class="pip-validation"></span>';
		strHtml += '   <label for="exampleInputEmail1">Email address</label>';
		strHtml += '   <textarea name="{{name}}" class="form-control pip-control"></textarea>';
		strHtml += '   <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>';
		strHtml += '</div>';

    // Mustache Templating
    strHtml = Mustache.render(strHtml, objOptions);

    // Set Validator
    if(typeof(objOptions['validation']) != 'undefined') {
      validator.addValidation($this.options.uuid, objOptions['name'], objOptions['validation']);
    }

    // Generate Form Element
		var objElement = $(strHtml);
		$this.options.form.push(objElement)
	};

  /**
   * addRadiobox
   * @description
   * This generates a Radio Box
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return void
   */
	this.addRadiobox = function(objOptions) {
    // Html Template
		var strHtml = '';
		strHtml += '<div class="form-group {{tab_group}}">';
    strHtml += '   <span class="pip-validation"></span>';
		strHtml += '   <label for="exampleInputEmail1">Email address</label><br>';
		strHtml += '   <input name="{{name}}" type="radio" class="pip-control" value="1">&nbsp;Mastercard&nbsp;&nbsp;&nbsp;&nbsp;';
		strHtml += '   <input name="{{name}}" type="radio" class="pip-control" value="1">&nbsp;Visa&nbsp;&nbsp;&nbsp;&nbsp;';
		strHtml += '   <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>';
		strHtml += '</div>';

    // Mustache Templating
    strHtml = Mustache.render(strHtml, objOptions);

    // Set Validator
    if(typeof(objOptions['validation']) != 'undefined') {
      validator.addValidation($this.options.uuid, objOptions['name'], objOptions['validation']);
    }

    // Generate Form Element
		var objElement = $(strHtml);
		$this.options.form.push(objElement)
	};

  /**
   * addCheckbox
   * @description
   * This generates a Checkbox
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return void
   */
	this.addCheckbox = function(objOptions) {
    // Html Template
		var strHtml = '';
		strHtml += '<div class="form-group {{tab_group}}">';
    strHtml += '   <span class="pip-validation"></span>';
		strHtml += '   <label>{{label}}</label><br>';
    strHtml += '   {{#multi}}';
		strHtml += '      <input name="{{name}}" type="checkbox" class="pip-control" value="{{value}}">&nbsp;{{key}}&nbsp;&nbsp;&nbsp;&nbsp;';
    strHtml += '   {{/multi}}';
		strHtml += '   <small class="form-text text-muted">{{help}}</small>';
		strHtml += '</div>';

    // Mustache Templating
    strHtml = Mustache.render(strHtml, objOptions);

    // Set Validator
    if(typeof(objOptions['validation']) != 'undefined') {
      validator.addValidation($this.options.uuid, objOptions['name'], objOptions['validation']);
    }

    // Generate Form Element
		var objElement = $(strHtml);
		$this.options.form.push(objElement);
	};

  /**
   * addSelectbox
   * @description
   * This generates a Selectbox
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return void
   */
	this.addSelectbox = function(objOptions) {
    // Html Template
    var strHtml = '';
		strHtml += '<div class="form-group {{tab_group}}">';
    strHtml += '   <span class="pip-validation"></span>';
		strHtml += '   <label>{{label}}</label><br>';
		strHtml += '   <select name="{{name}}" class="form-control pip-control">';
    strHtml += '      {{#options}}';
		strHtml += '      <option value="{{value}}">{{key}}</option>';
    strHtml += '      {{/options}}';
		strHtml += '   </select>';
		strHtml += '   <small class="form-text text-muted">{{help}}</small>';
		strHtml += '</div>';

    // Mustache Templating
    strHtml = Mustache.render(strHtml, objOptions);

    // Set Validator
    if(typeof(objOptions['validation']) != 'undefined') {
      validator.addValidation($this.options.uuid, objOptions['name'], objOptions['validation']);
    }

    // Generate Form Element
		var objElement = $(strHtml);
		$this.options.form.push(objElement);
	};

  /**
   * addLookup
   * @description
   * This generates a Modal Selection for some Lookup Data
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return void
   */
	this.addLookup = function(objOptions) {
		// Selectbox mit werten aus dem Cache (z.B. SSIDs etc.)
	};

  /**
   * addTimePicker
   * @description
   * This generates a Time Picker
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return void
   */
	this.addTimePicker = function(objOptions) {
    // todo:
	};

  /**
   * addDatePicker
   * @description
   * This generates a Date Picker
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return void
   */
	this.addDatePicker = function(objOptions) {
    // todo:
	};

  /**
   * addIconPicker
   * @description
   * This generates a Icon Picker
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return void
   */
	this.addIconPicker = function(objOptions) {
    // todo:
	};

  /**
   * addColorPicker
   * @description
   * This generates a Color Picker
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return void
   */
	this.addColorPicker = function(objOptions) {
    // todo:
	};

  /**
   * addInfoText
   * @description
   * This generates a Information Text.
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return void
   */
	this.addInfoText = function(objOptions) {
    // Html Template
		var strHtml = '';
		strHtml += '<div style="margin-bottom: 20px;">';
    strHtml += 'This is a Title<br><span class="pip-info-text">'
		strHtml += 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et.';
		strHtml += '</span></div>';

    // Mustache Templating
    strHtml = Mustache.render(strHtml, objOptions);

    // Generate Form Element
		var objElement = $(strHtml);
		$this.options.form.push(objElement)
	};

  /**
   * addSubmit
   * @description
   * This generates a Submit Button
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return void
   */
	this.addSubmit = function(objOptions) {
    // Html Template
		var strHtml = '';
		strHtml += '<button type="button" class="btn btn-sm btn-success form-submit-btn" data-validate-form="{{validate_form}}">Save</button>';

    // Mustache Templating
    strHtml = Mustache.render(strHtml, objOptions);

    // Set Callback function
    var fncCallback = _private.getValue(objOptions, 'callback', {});
    $this.options.submit_callback = fncCallback;

    // Generate Form Element
    var objElement = $(strHtml);
		$this.options.form.push(objElement)
	};

  /**
   * addCloseModal
   * @description
   * This generates a close Modal Btn
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return void
   */
  this.addCloseModal = function(objOptions) {
    // Html Template
		var strHtml = '';
		strHtml += '<button type="button" class="btn btn-sm btn-warning close_modal_btn" style="margin-left: 5px; margin-right: 5px;">Close</button>';

    // Mustache Templating
    strHtml = Mustache.render(strHtml, objOptions);

    // Generate Form Element
    var objElement = $(strHtml);
		$this.options.form.push(objElement)
  };

  /**
   * getValue
   * @description
   * This is a Helper to check for Options
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @param strKey         The Option key you are looking for
   * @param strDefault     The Default Value if the key is not found
   * @return String        The Value of the Option or the Default value
   */
  _private.getValue = function(objOption, strKey, strDefault) {
    if(typeof(objOption[strKey]) != 'undefined') {
      return objOption[strKey];
    } else {
      return strDefault;
    }
  };

  // Init Call
	$this.init();
}
