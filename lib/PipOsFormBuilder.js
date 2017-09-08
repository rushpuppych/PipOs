/**
 * PipOsFormBuilder
 * @description
 * This is the PipOs Formular Builder Lib. It Can be used to easily build some fancy UI components
 * PipOs is a Electron Application for Raspberry Pi Based Security and Pentests Developement
 * It is completely based on JavaScript and can be used to rappidely develop some Pentest environments.
 */
var PipOsFormBuilder = function() {
  var $this = this;
  $this.options = {
    form: [],
    uuid: ''
	}
  
	// Init
	this.init = function() {
		this.options.uuid = '';
	};
	
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
	
	this.addTextbox = function(objOptions) {
		var strHtml = '';
		strHtml += '<div class="form-group">';
		strHtml += '   <label for="exampleInputEmail1">Email address</label>';
		strHtml += '   <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">';
		strHtml += '   <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>';
		strHtml += '</div>';
		  	
		var objElement = $(strHtml);
		$this.options.form.push(objElement)
	};
	
	this.addTextArea = function(objOptions) {
		var strHtml = '';
		strHtml += '<div class="form-group">';
		strHtml += '   <label for="exampleInputEmail1">Email address</label>';
		strHtml += '   <textarea class="form-control"></textarea>';
		strHtml += '   <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>';
		strHtml += '</div>';
		  	
		var objElement = $(strHtml);
		$this.options.form.push(objElement)
	};
	
	this.addRadiobox = function(objOptions) {
		var strHtml = '';
		strHtml += '<div class="form-group">';
		strHtml += '   <label for="exampleInputEmail1">Email address</label><br>';
		strHtml += '   <input type="radio" value="1">&nbsp;Mastercard&nbsp;&nbsp;&nbsp;&nbsp;';
		strHtml += '   <input type="radio" value="1">&nbsp;Visa&nbsp;&nbsp;&nbsp;&nbsp;';
		strHtml += '   <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>';
		strHtml += '</div>';
		  	
		var objElement = $(strHtml);
		$this.options.form.push(objElement)
	};
	
	this.addCheckbox = function(objOptions) {
		var strHtml = '';
		strHtml += '<div class="form-group">';
		strHtml += '   <label for="exampleInputEmail1">Email address</label><br>';
		strHtml += '   <input type="checkbox" value="1">&nbsp;Mastercard&nbsp;&nbsp;&nbsp;&nbsp;';
		strHtml += '   <input type="checkbox" value="1">&nbsp;Visa&nbsp;&nbsp;&nbsp;&nbsp;';
		strHtml += '   <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>';
		strHtml += '</div>';
		  	
		var objElement = $(strHtml);
		$this.options.form.push(objElement)		
	};
	
	this.addSelectbox = function(objOptions) {
		var strHtml = '';
		strHtml += '<div class="form-group">';
		strHtml += '   <label for="exampleInputEmail1">Email address</label><br>';
		strHtml += '   <select class="form-control">';
		strHtml += '      <option value="1">Mastercard</option>';
		strHtml += '      <option value="2">Visa</option>';
		strHtml += '   </select>';
		strHtml += '   <small id="emailHelp" class="form-text text-muted">Well never share your email with anyone else.</small>';
		strHtml += '</div>';
		  	
		var objElement = $(strHtml);
		$this.options.form.push(objElement)				
	};

	this.addLookup = function(objOptions) {
		// Selectbox mit werten aus dem Cache (z.B. SSIDs etc.)
	};
	
	this.addTimePicker = function(objOptions) {
		
	};
	
	this.addDatePicker = function(objOptions) {
		
	};	
	
	this.addIconPicker = function(objOptions) {
		
	};
	
	this.addColorPicker = function(objOptions) {
		
	};
	
	this.addInfoText = function(objOptions) {
		var strHtml = '';
		strHtml += '<div>';
		strHtml += 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
		strHtml += '</div>';
		  	
		var objElement = $(strHtml);
		$this.options.form.push(objElement)	
	};
	
  /**
   * addSubmit
   * @description
   * This generates a Submit Button
   * @param objOptions     This is the Optional Option Array for the Html Element rendering.
   * @return optional      Gives Return if the callback function provides a Return value
   */  
	this.addSubmit = function(objOptions) {
		var strHtml = '';
		strHtml += '<button type="button" class="btn btn-sm btn-success">submit</button>';
		var objElement = $(strHtml);
		$this.options.form.push(objElement)
	};
	
	$this.init();  
}
