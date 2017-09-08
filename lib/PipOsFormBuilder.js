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

  $this.options = {
    form: [],
    uuid: ''
	};

	// Init
	this.init = function() {
		this.options.uuid = '';
	};

  /**
   * render
   * @description
   * This renders the Form and returns the pure Form HTML
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return string        HTML Formular String
   */
	this.render = function() {
		// Html Form Rendering
		var strHtml = '<form id="{{uuid}}">';
		for(var numIndex in $this.options.form) {
			var objElement = $this.options.form[numIndex];
			strHtml += $('<div>').append(objElement.clone()).html();
		}
		strHtml += '<form>';

		// Event Manager
		// alle Button Events etc setzen. Auch das Submit Event von hier aus anhängen

		return strHtml;
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
		strHtml += '<div class="form-group">';
		strHtml += '   <label>{{label}}</label>';
		strHtml += '   <input type="text" class="form-control pip-control" value="{{value}}" placeholder="{{placeholder}}">';
		strHtml += '   <small class="form-text text-muted">{{help}}</small>';
		strHtml += '</div>';

    // Mustache Templating
    strHtml = Mustache.render(strHtml, objOptions);

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
		var strHtml = '';
		strHtml += '<div class="form-group">';
		strHtml += '   <label for="exampleInputEmail1">Email address</label>';
		strHtml += '   <textarea class="form-control pip-control"></textarea>';
		strHtml += '   <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>';
		strHtml += '</div>';

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
		var strHtml = '';
		strHtml += '<div class="form-group">';
		strHtml += '   <label for="exampleInputEmail1">Email address</label><br>';
		strHtml += '   <input type="radio" class="pip-control" value="1">&nbsp;Mastercard&nbsp;&nbsp;&nbsp;&nbsp;';
		strHtml += '   <input type="radio" class="pip-control" value="1">&nbsp;Visa&nbsp;&nbsp;&nbsp;&nbsp;';
		strHtml += '   <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>';
		strHtml += '</div>';

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
		strHtml += '<div class="form-group">';
		strHtml += '   <label>{{label}}</label><br>';
    strHtml += '   {{#multi}}';
		strHtml += '      <input type="checkbox" class="pip-control" value="{{value}}">&nbsp;{{key}}&nbsp;&nbsp;&nbsp;&nbsp;';
    strHtml += '   {{/multi}}';
		strHtml += '   <small class="form-text text-muted">{{help}}</small>';
		strHtml += '</div>';

    // Mustache Templating
    strHtml = Mustache.render(strHtml, objOptions);

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
		var strHtml = '';
		strHtml += '<div class="form-group">';
		strHtml += '   <label for="exampleInputEmail1">Email address</label><br>';
		strHtml += '   <select class="form-control pip-control">';
		strHtml += '      <option value="1">Mastercard</option>';
		strHtml += '      <option value="2">Visa</option>';
		strHtml += '   </select>';
		strHtml += '   <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>';
		strHtml += '</div>';

		var objElement = $(strHtml);
		$this.options.form.push(objElement)
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
		var strHtml = '';
		strHtml += '<div style="margin-bottom: 20px;">';
    strHtml += 'This is a Title<br><span class="pip-info-text">'
		strHtml += 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et.';
		strHtml += '</span></div>';

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
		var strHtml = '';
		strHtml += '<button type="button" class="btn btn-sm btn-success">Save</button>';
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
