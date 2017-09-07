
//   PPPPPPPPPPPPPPPPP     iiii                          OOOOOOOOO
//   P::::::::::::::::P   i::::i                       OO:::::::::OO
//   P::::::PPPPPP:::::P   iiii                      OO:::::::::::::OO
//   PP:::::P     P:::::P                           O:::::::OOO:::::::O
//   P::::P     P:::::Piiiiiiippppp   ppppppppp   O::::::O   O::::::O    ssssssssss
//   P::::P     P:::::Pi:::::ip::::ppp:::::::::p  O:::::O     O:::::O  ss::::::::::s
//   P::::PPPPPP:::::P  i::::ip:::::::::::::::::p O:::::O     O:::::Oss:::::::::::::s
//   P:::::::::::::PP   i::::ipp::::::ppppp::::::pO:::::O     O:::::Os::::::ssss:::::s
//   P::::PPPPPPPPP     i::::i p:::::p     p:::::pO:::::O     O:::::O s:::::s  ssssss
//   P::::P             i::::i p:::::p     p:::::pO:::::O     O:::::O   s::::::s
//   P::::P             i::::i p:::::p     p:::::pO:::::O     O:::::O      s::::::s
//   P::::P             i::::i p:::::p    p::::::pO::::::O   O::::::Ossssss   s:::::s
//   PP::::::PP          i::::::ip:::::ppppp:::::::pO:::::::OOO:::::::Os:::::ssss::::::s
//   P::::::::P          i::::::ip::::::::::::::::p  OO:::::::::::::OO s::::::::::::::s
//   P::::::::P          i::::::ip::::::::::::::pp     OO:::::::::OO    s:::::::::::ss
//   PPPPPPPPPP          iiiiiiiip::::::pppppppp         OOOOOOOOO       sssssssssss
//                            p:::::p
//                            p:::::p
//                            p:::::::p
//                            p:::::::p
//                            p:::::::p
//                            ppppppppp

/**
 * PipOs
 * @description
 * PipOs is a Electron Application for Raspberry Pi Based Security and Pentests Developement
 * It is completely based on JavaScript and can be used to rappidely develop some Pentest environments.
 * @version 1.0
 * @author Severin Holm (info@severin-holm.ch)
 */
var PipOs = function(options) {
  var $this = this;
  var _private = {};
  var helper = new PipOsHelper();

  // PipOs System Variables
  this.options = $.extend({
    elRoot: 'div.pipos-content-box',
    packages: [],
    config: []
  }, options);

  /**
   * Init Constructor
   */
  this.init = function() {
    // Loading Config.json to options
    _private.loadConfig();

    // Registering all Packages
    _private.registerPackages();
  };

  /**
   * registerPackages
   * @description
   * This Method can bee used to register additional Package functionality.
   * Packages are shown in the Main navigation.
   * @param void
   * @return void
   */
  _private.registerPackages = function() {
    _private.addPackage(new AttackPackage($this.options));
  };

  /**
   * addPackage
   * @description
   * This Method is adding a Package to the Package Array
   * @param objPackage    This is the Package Object
   * @return void
   */
  _private.addPackage = function(objPackage) {
    strUid = helper.uuid();
    $this.options.packages[strUid] = objPackage;
  };

  /**
   * loadConfig
   * @description
   * This Method is loading the Config.json file and setting it to the Class Options
   * @param void
   * @return void
   */
  _private.loadConfig = function() {
    var objJsonConfig = helper.loadFile('config.json');
    $this.options.config = objJsonConfig;
  };

  /**
   * run
   * @description
   * This Method is starting the PipOs Application
   * @param void
   * @return void
   */
   this.run = function() {
     // Render Intro Animation
     _private.renderIntro();
     _private.eventHandler();
   };

   /**
    * eventHandler
    * @description
    * This Method is used to register all PipOs Events
    * @param void
    * @return void
    */
   _private.eventHandler = function() {
     // On Click Menu Button call the Package Handler
     $('body').on('click', 'button[data-menu-btn-package]', function() {
       _private.renderPackageContent($(this).data('menu-btn-package'));
     });

     // On Window Resize rerender Background
     $(window).resize(function(){
         _private.renderBackground();
     });
   };

   /**
    * renderIntro
    * @description
    * This Method renders the Intro Animation and renders§ the Application
    * HTML Wireframe to the elRoot Container.
    * @param void
    * @return void
    */
   _private.renderIntro = function(fncCallback) {
     _private.renderSplashScreenAnimation(function() {
       _private.renderBackground();
       _private.renderLoadingScreenAnimation(function() {
         _private.renderMainWireframe();
         helper.callbackCall(fncCallback);
       });
     });
   };

   /**
    * renderSplashScreenAnimation
    * @description
    * This Method is rendering the SplashScreen Animation for the PipOs
    * @param fncCallback    This Function will be called after animation is finished
    * @return void
    */
   _private.renderSplashScreenAnimation = function(fncCallback) {
     // todo: Splash Screen Animation

     // Callback Handling
    helper.callbackCall(fncCallback);
   };

   /**
    * renderBackground
    * @description
    * This Method is rendering the PipOs Background
    * @param void
    * @return void
    */
   _private.renderBackground = function() {
     // Get Number ob Stripes
     var numHeight = $($this.options.elRoot).height();
     var numCountStrips = parseInt(numHeight / 20) + 10;

     // Set Container CSS
     $($this.options.elRoot).css('margin', '0px');
     $($this.options.elRoot).css('padding', '0px');

     // Generate Background Box
     $('div.pipos-bg-box').remove();
     var strHtml = '<div class="pipos-bg-box"></div>';
     $($this.options.elRoot).append(strHtml);

     // Generate Stipes
     for(var numIndex = 0; numIndex < numCountStrips; numIndex++) {
       var strHtml = '<div class="pipos-bg-stipe pipos-bg-stipe-standard"></div>';
       $($this.options.elRoot).find('div.pipos-bg-box').append(strHtml);
     }

     // Light Box
     $('div.pipos-light-box').remove();
     var strHtml = '<div class="pipos-light-box"></div>';
     $($this.options.elRoot).append(strHtml);
   };

   /**
    * renderLoadingScreenAnimation
    * @description
    * This Method is rendering the Loading Screen Animation for the PipOs
    * @param fncCallback    This Function will be called after animation is finished
    * @return void
    */
   _private.renderLoadingScreenAnimation = function(fncCallback) {
     // Generate Html
     var strHtml = '';
     strHtml += '<span id="pipos_logo" class="pip-logo">';
     strHtml += '  <span class="pip-logo-wing-1 pip-logo-wing"></span>';
     strHtml += '  <span class="pip-logo-wing-2 pip-logo-wing"></span>';
     strHtml += '  <span class="pip-logo-wing-3 pip-logo-wing"></span>';
     strHtml += '  <span class="pip-logo-bg"></span>';
     strHtml += '  <span class="fa fa-cog pip-logo-icon fa-spin"></span>';
     strHtml += '  <span class="pip-title">VectorSix</span>';
     strHtml += '</span>';
     $($this.options.elRoot).append(strHtml);

     // Bring Logo to Background
     setTimeout(function () {
       // Set to Background
       $("#pipos_logo").css('opacity', '0.1');
       $("#pipos_logo").find('span.fa-spin').removeClass('fa-spin');

       // Callback Handling
      helper.callbackCall(fncCallback);
    }, 1000);
   };

   /**
    * renderMainWireframe
    * @description
    * This Method is rendering the Main Wireframe for the PipOs.
    * @param fncCallback    This Function will be called after animation is finished
    * @return void
    */
   _private.renderMainWireframe = function(fncCallback) {
     // Prepare HTML content
     $('div.pip-wireframe').remove();
     $($this.options.elRoot).parent().append('<div class="pip-os-bootstrap-wrapper pip-text">');

     // Build Template Variables
     var objTemplateVariables = {
       menu: []
     };
     for(var numIndex in $this.options.packages) {
       var objPackage = $this.options.packages[numIndex];
       var objInfo = objPackage.getInfo();
       if(objInfo.category == "main") {
         objInfo.uuid = numIndex;
         objTemplateVariables.menu.push(objInfo);
       }
     }

     // Load Html Template
     var strHtml = helper.loadHtmlTemplate("templates/wireframe.html", objTemplateVariables);
     $('div.pip-os-bootstrap-wrapper').append(strHtml);
     _private.runTime();

     // Callback Handling
     helper.callbackCall(fncCallback);
   };

   /**
    * runTime
    * @description
    * Renders the time on the main wireframe and run counter.
    * @param void
    * @return void
    */
   _private.runTime = function() {
     // Get Time
     var objDate = new Date();
     var strTime = _private.twoDiggits(objDate.getHours()) + ':' + _private.twoDiggits(objDate.getMinutes()) + ':' + _private.twoDiggits(objDate.getSeconds());
     var strDate = _private.twoDiggits(objDate.getDay()) + '/' + _private.twoDiggits(objDate.getMonth()) + '/' + _private.twoDiggits(objDate.getFullYear());

     // Get Battery Status
     var numBattery = 3; // todo: set Battery
     var numPercentBattery = 70 // todo: set Battery Percent
     var strBattery = '<span><i class="fa fa-battery-' + numBattery + '"></i>&nbsp;' + numPercentBattery + '%</span>';

     // Free Space
     var numPercentFreeSpace = 30; // todo: set free Space
     var strFreeSpace = '<span><i class="fa fa-hdd-o"></i>&nbsp;' + numPercentFreeSpace + '%</span>';

     // Network Trafic
     var numUpTrafic = 12.34;
     var numDownTrafic = 100.45;
     var strUpTrafic = '<span><i class="fa fa-arrow-up"></i>&nbsp;' + numUpTrafic + '</span>';
     var strDownTrafic = '<span><i class="fa fa-arrow-down"></i>&nbsp;' + numDownTrafic + '</span>';

     // Render Timer Gui
     var strSystem = '<div style="font-size: 11px; text-align: center; border-top: 1px dotted #81F79F; margin-top: 10px;">' + strFreeSpace + "&nbsp;|&nbsp;" + strBattery + "<br>" + strUpTrafic + "&nbsp;|&nbsp;" + strDownTrafic + '</span>';
     $('#gui-timer').html("Time: " + strTime +"<br>Date: " + strDate + "<br>" + strSystem);

     // Recall every second
     setTimeout(function(){_private.runTime()},1000);
   }

   /**
    * renderMainWireframe
    * @description
    * sets a diggit to a 2 char sized digit
    * @param numDigit   The digit number
    * @return void
    */
   _private.twoDiggits = function(numDigit) {
     if(numDigit < 10) {
       return "0" + numDigit;
     }
     return numDigit;
   }

   /**
    * renderMainWireframe
    * @description
    * This Method is triggering a packages run method to start up the Package GUI
    * @param strPackageUuid    The Uuid of the Package
    * @return void
    */
   _private.renderPackageContent = function(strPackageUuid) {
     $('#pip-package-content').fadeOut(function() {
       $('#pip-package-content').html("");
       $this.options.packages[strPackageUuid].run($('#pip-package-content'));
       $('#pip-package-content').fadeIn();
     });
   };

   // Init Call
   $this.init();
};
