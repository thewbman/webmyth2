/* adsf*/



enyo.kind({ name: "preferences",
	//kind: "HFlexBox",
	kind: "VFlexBox",
	flex: 1,
	className: "preferences enyo-view",			//enyo-view needed to get vflexbox to work?
	published: {
		viewMode: "phone",
	},
	events: {
		onBannerMessage: "",
		onGetPreviousPane: "",
	},
	
	components: [
		
		{name: "header", kind: "Toolbar", layoutKind: "VFlexLayout", onclick: "revealTop", components: [
			{name: "leftHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Preferences")},
			{name: "leftHeaderSubtitle", kind: "Control", className: "headerSubtitle", content: ""},
		]},
							
		
		{kind: "HFlexBox", flex: 1, components: [
			{name: "preferencesMenu", kind: "VFlexBox", className: "preferencesMenu", components: [
				{name: "allMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem selected", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("All")},
				]},
				{name: "backendMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Backend")},
				]},
				{name: "mysqlMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Database")},
				]},
				{name: "webserverMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Web Server")},
				]},
				{name: "imagesMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Images")},
				]},
				{name: "remoteMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Remote")},
				]},
				{name: "orientationMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Orientation")},
				]},
				{name: "metrixMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Metrix")},
				]},
				{name: "debugMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Debug")},
				]},
			]},
			
		{kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
			//{kind: "HFlexBox", flex: 1, components: [
				//{kind: "Spacer"},
		
				//{kind: "VFlexBox", width: "320px", flex: 1, components: [
					{name: "backendRowGroup", kind: "RowGroup", caption: "Master Backend", components: [
						/*{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Manual Backend IP", flex: 1},
							{name: "manualMasterBackend", kind: "ToggleButton", onChange: "manualMasterBackendToggle"},
						]},*/
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "masterBackendIp", kind: "Input", autoCapitalize: "lowercase", flex: 1, components: [
								{content: "Address", className: "label"},
							]},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "masterBackendPort", kind: "Input", autoCapitalize: "lowercase", flex: 1, components: [
								{content: "Port", className: "label"},
							]},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "masterBackendXmlPort", kind: "Input", autoCapitalize: "lowercase", flex: 1, components: [
								{content: "XML Port", className: "label"},
							]},
						]},
					]},
					{name: "databaseRowGroup", kind: "RowGroup", caption: "MySQL Server", components: [
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Manual Settings", flex: 1},
							{name: "manualDatabase", kind: "ToggleButton", onChange: "manualDatabaseToggle"},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "databaseHost", kind: "Input", autoCapitalize: "lowercase", flex: 1, components: [
								{content: "Address", className: "label"},
							]},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "databasePort", kind: "Input", autoCapitalize: "lowercase", flex: 1, components: [
								{content: "Port", className: "label"},
							]},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "databaseUsername", kind: "Input", autoCapitalize: "lowercase", flex: 1, components: [
								{content: "Username", className: "label"},
							]},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "databasePassword", kind: "PasswordInput", autoCapitalize: "lowercase", flex: 1, components: [
								{content: "Password", className: "label"},
							]},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "databaseName", kind: "Input", autoCapitalize: "lowercase", flex: 1, components: [
								{content: "Database", className: "label"},
							]},
						]},
					]},
					{name: "webserverRowGroup", kind: "RowGroup", caption: "Web Server", components: [
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "webserverName", kind: "Input", autoCapitalize: "lowercase", flex: 1, components: [
								{content: "Address", className: "label"},
							]},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "webserverUsername", kind: "Input", autoCapitalize: "lowercase", flex: 1, components: [
								{content: "Username", className: "label"},
							]},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "webserverPassword", kind: "PasswordInput", autoCapitalize: "lowercase", flex: 1, components: [
								{content: "Password", className: "label"},
							]},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Allow Downloads", flex: 1},
							{name: "allowDownloads", kind: "ToggleButton", onChange: "allowDownloadsToggle"},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "useScript", kind: "ListSelector", label: "Use Script", onChange: "useScriptSelect", flex: 1, items: [
								{caption: "Never", value: 0},
								{caption: "Non-remote", value: 1},
								{caption: "Always", value: 2},
							]},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Use MythWeb for XML", flex: 1},
							{name: "mythwebXml", kind: "ToggleButton", onChange: "mythwebXmlToggle"},
						]},
						{name: "MythXML_keyItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "MythXML_key", kind: "Input", autoCapitalize: "lowercase", flex: 1, components: [
								{content: "XML Key", className: "label"},
							]},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "webmythPythonFile", kind: "Input", autoCapitalize: "lowercase", flex: 1, components: [
								{content: "Script File", className: "label"},
							]},
						]},
					]},
					{name: "imagesRowGroup", kind: "RowGroup", caption: "Images", components: [
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Show Channel Icons", flex: 1},
							{name: "showChannelIcons", kind: "ToggleButton"},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Show Video Images (list)", flex: 1},
							{name: "showVideoListImages", kind: "ToggleButton"},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Show Videos Images (details)", flex: 1},
							{name: "showVideoDetailsImage", kind: "ToggleButton"},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Use script for screenshots", flex: 1},
							{name: "forceScriptScreenshots", kind: "ToggleButton"},
						]},
					]},
					{name: "remoteRowGroup", kind: "RowGroup", caption: "Remote", components: [
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "remoteHeader", kind: "ListSelector", label: "Remote Header", flex: 1, items: [
								{caption: "Pause", value: "Pause"},
								{caption: "Mute", value: "Mute"},
								{caption: "Nothing", value: "Nothing"},
							]},
						]},	
						{kind: "Item", showing: false, align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Remote Vibrate", flex: 1},
							{name: "remoteVibrate", kind: "ToggleButton"},
						]},
						{kind: "Item", showing: false, align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Remote Fullscreen", flex: 1},
							{name: "remoteFullscreen", kind: "ToggleButton"},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Start remote after playback start", flex: 1},
							{name: "playJumpRemote", kind: "ToggleButton"},
						]},
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Start remote after LiveTV start", flex: 1},
							{name: "livetvJumpRemote", kind: "ToggleButton"},
						]},
						{kind: "Item", showing: false, align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Dashboard Remote", flex: 1},
							{name: "remoteDashboard", kind: "ToggleButton"},
						]},
					]},
					{name: "orientationRowGroup", kind: "RowGroup", caption: "Orientation", components: [
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{name: "allowedOrientation", kind: "ListSelector", label: "Orientation", flex: 1, items: [
								{caption: "Up", value: "up"},
								{caption: "Left", value: "left"},
								//caption: "Down", value: "down"},
								//caption: "Right", value: "right"},
								{caption: "Free", value: "free"},
							]},
						]},	
					]},	
					{name: "metrixRowGroup", kind: "RowGroup", caption: "Metrix", components: [
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: 'Allow annoymous submissions to <a href="http://metrix.webosroundup.com/privacy">Metrix</a>', allowHtml: true, flex: 1},
							{name: "allowMetrix", kind: "ToggleButton", onChange: "metrixToggle"},
						]},
					]},
					{name: "debugRowGroup", kind: "RowGroup", caption: "Debug Mode", components: [
						{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
							{content: "Debug", flex: 1},
							{name: "debug", kind: "ToggleButton", onChange: "debugToggle"},
						]},
					]},
					
					{content: "&nbsp;"},
				]},
				
				]},
				
				{kind: "Toolbar", components: [
					{kind: "Spacer"},
					{content: 'Save', onclick: "savePreferences"},
					{kind: "Spacer"},
				]},
		
			//]},
		//]},
	],
	
	create: function() {
		if(debug) this.log("create");
		this.inherited(arguments);
		
		this.render();
		
		//this.activate("tablet");
		
	},
		
	//Externally called functions
	activate: function(inViewMode) {
		if(debug) this.log("activate");
		
		this.resize(inViewMode);
		
		this.$.allMenu.addClass("selected");
		this.$.backendMenu.removeClass("selected");
		this.$.mysqlMenu.removeClass("selected");
		this.$.webserverMenu.removeClass("selected");
		this.$.imagesMenu.removeClass("selected");
		this.$.remoteMenu.removeClass("selected");
		this.$.orientationMenu.removeClass("selected");
		this.$.metrixMenu.removeClass("selected");
		this.$.debugMenu.removeClass("selected");
		
		this.$.backendRowGroup.show();
		this.$.databaseRowGroup.show();
		this.$.webserverRowGroup.show();
		this.$.imagesRowGroup.show();
		this.$.remoteRowGroup.show();
		this.$.orientationRowGroup.show();
		this.$.metrixRowGroup.show();
		this.$.debugRowGroup.show();
	
		//this.$.manualMasterBackend.setState(WebMyth.prefsCookie.manualMasterBackend);
		this.$.masterBackendIp.setValue(WebMyth.prefsCookie.masterBackendIp);
		this.$.masterBackendPort.setValue(WebMyth.prefsCookie.masterBackendPort);
		this.$.masterBackendXmlPort.setValue(WebMyth.prefsCookie.masterBackendXmlPort);
		
		this.$.manualDatabase.setState(WebMyth.prefsCookie.manualDatabase);
		this.$.databaseHost.setValue(WebMyth.prefsCookie.databaseHost);
		this.$.databasePort.setValue(WebMyth.prefsCookie.databasePort);
		this.$.databaseUsername.setValue(WebMyth.prefsCookie.databaseUsername);
		this.$.databasePassword.setValue(WebMyth.prefsCookie.databasePassword);
		this.$.databaseName.setValue(WebMyth.prefsCookie.databaseName);
		
		this.$.webserverName.setValue(WebMyth.prefsCookie.webserverName);
		this.$.webserverUsername.setValue(WebMyth.prefsCookie.webserverUsername);
		this.$.webserverPassword.setValue(WebMyth.prefsCookie.webserverPassword);
		this.$.useScript.setValue(WebMyth.prefsCookie.useScript);
		this.$.mythwebXml.setState(WebMyth.prefsCookie.mythwebXml);
		this.$.MythXML_key.setValue(WebMyth.prefsCookie.MythXML_key);
		this.$.webmythPythonFile.setValue(WebMyth.prefsCookie.webmythPythonFile);
		this.$.allowDownloads.setState(WebMyth.prefsCookie.allowDownloads);
		
		this.$.showChannelIcons.setState(WebMyth.prefsCookie.showChannelIcons);
		this.$.showVideoListImages.setState(WebMyth.prefsCookie.showVideoListImages);
		this.$.showVideoDetailsImage.setState(WebMyth.prefsCookie.showVideoDetailsImage);
		this.$.forceScriptScreenshots.setState(WebMyth.prefsCookie.forceScriptScreenshots);
		
		this.$.remoteHeader.setValue(WebMyth.prefsCookie.remoteHeader);
		this.$.remoteVibrate.setState(WebMyth.prefsCookie.remoteVibrate);
		this.$.remoteFullscreen.setState(WebMyth.prefsCookie.remoteFullscreen);
		this.$.playJumpRemote.setState(WebMyth.prefsCookie.playJumpRemote);
		this.$.livetvJumpRemote.setState(WebMyth.prefsCookie.livetvJumpRemote);
		this.$.remoteDashboard.setState(WebMyth.prefsCookie.remoteDashboard);
		
		this.$.allowedOrientation.setValue(WebMyth.prefsCookie.allowedOrientation);
		
		this.$.allowMetrix.setState(WebMyth.prefsCookie.allowMetrix);
		
		this.$.debug.setState(WebMyth.prefsCookie.debug);
		
		
		if(WebMyth.prefsCookie.mythwebXml) {
			this.$.MythXML_keyItem.show();
		} else {
			this.$.MythXML_keyItem.hide();
		}
		
		//this.manualMasterBackendToggle();
		this.manualDatabaseToggle();
		//this.useScriptSelect();
		//this.allowDownloadsToggle();
		this.debugToggle();
		
		var appInfo = enyo.fetchAppInfo();
		this.$.leftHeaderSubtitle.setContent(appInfo.title+" - "+appInfo.version);
		
		this.revealTop();
		
		this.render();
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
	},
	resize: function(inViewMode) {
		if(debug) this.log("resize");
		
		this.viewMode = inViewMode;
		//this.render();
		
		if(this.viewMode == "tablet") {
			this.$.preferencesMenu.render();
			this.$.preferencesMenu.show();
		} else {
			this.$.preferencesMenu.hide();
		}	
	},
	gotBack: function() {
		if(debug) this.log("gotBack");
		
		this.savePreferences();
	},
	gotKey: function(inKey) {
		if(debug) this.log("gotKey: "+inKey);
	},
	gotSpecialKey: function(inKey) {
		if(debug) this.log("gotSpecialKey: "+inKey);
	},
	bannerMessage: function(message) {
		if(debug) this.log("bannerMessage: "+message);
		
		this.doBannerMessage(message);
		
	},
	
	//Internal functions
	selectMenuButton: function(inSender) {
		if(debug) this.log("selectMenuButton with "+inSender.getName());
		
		var newMode = inSender.getName().substring(0,inSender.getName().length-4);
		
		this.$.allMenu.removeClass("selected");
		this.$.backendMenu.removeClass("selected");
		this.$.mysqlMenu.removeClass("selected");
		this.$.webserverMenu.removeClass("selected");
		this.$.imagesMenu.removeClass("selected");
		this.$.remoteMenu.removeClass("selected");
		this.$.orientationMenu.removeClass("selected");
		this.$.metrixMenu.removeClass("selected");
		this.$.debugMenu.removeClass("selected");
		
		this.$.backendRowGroup.hide();
		this.$.databaseRowGroup.hide();
		this.$.webserverRowGroup.hide();
		this.$.imagesRowGroup.hide();
		this.$.remoteRowGroup.hide();
		this.$.orientationRowGroup.hide();
		this.$.metrixRowGroup.hide();
		this.$.debugRowGroup.hide();
		
		switch(newMode) {
			case "all":
			
				this.$.allMenu.addClass("selected");
					
				this.$.backendRowGroup.show();
				this.$.databaseRowGroup.show();
				this.$.webserverRowGroup.show();
				this.$.imagesRowGroup.show();
				this.$.remoteRowGroup.show();
				this.$.orientationRowGroup.show();
				this.$.metrixRowGroup.show();
				this.$.debugRowGroup.show();
				
				break;
			case "backend":
				this.$.backendMenu.addClass("selected");
				
				this.$.backendRowGroup.show();
				break;
			case "mysql":
				this.$.mysqlMenu.addClass("selected");
				
				this.$.databaseRowGroup.show();
				break;
			case "webserver":
				this.$.webserverMenu.addClass("selected");
				
				this.$.webserverRowGroup.show();
				break;
			case "images":
				this.$.imagesMenu.addClass("selected");
				
				this.$.imagesRowGroup.show();
				break;
			case "remote":
				this.$.remoteMenu.addClass("selected");
				
				this.$.remoteRowGroup.show();
				break;
			case "orientation":
				this.$.orientationMenu.addClass("selected");
				
				this.$.orientationRowGroup.show();
				break;
			case "metrix":
				this.$.metrixMenu.addClass("selected");
				
				this.$.metrixRowGroup.show();
				break;
			case "debug":
				this.$.debugMenu.addClass("selected");
				
				this.$.debugRowGroup.show();
				break;
				
		} 
		
		this.revealTop();
		
		if(debug) this.log("finished changing to "+newMode);
	},
	revealTop: function() {
		if(debug) this.log("revealTop");
		
		this.$.scroller.scrollIntoView(0,0);
	},
	manualMasterBackendToggle: function(inSender, inState) {
		if(debug) this.log("manualMasterBackendToggle to state: "+inState);
		
		this.$.masterBackendIp.setDisabled(!this.$.manualMasterBackend.getState());
		this.$.masterBackendPort.setDisabled(!this.$.manualMasterBackend.getState());
		this.$.masterBackendXmlPort.setDisabled(!this.$.manualMasterBackend.getState());
			
		if(inState == false) {
			this.$.masterBackendIp.setValue("-");
		}
		
		this.$.backendRowGroup.render();
	},
	manualDatabaseToggle: function(inSender, inState) {
		if(debug) this.log("manualDatabaseToggle to state: "+inState);
		
		this.$.databaseHost.setDisabled(!this.$.manualDatabase.getState());
		this.$.databasePort.setDisabled(!this.$.manualDatabase.getState());
		this.$.databaseUsername.setDisabled(!this.$.manualDatabase.getState());
		this.$.databasePassword.setDisabled(!this.$.manualDatabase.getState());
		this.$.databaseName.setDisabled(!this.$.manualDatabase.getState());
			
		if(inState == false) {
			this.$.databaseHost.setValue("-");
		}
				
		this.$.databaseRowGroup.render();
	},
	useScriptSelect: function(inSender, inState) {
		if(debug) this.log("useScriptSelect to state: "+inState);
		
		//this.bannerMessage("You must use the script for everything currently");
	},
	allowDownloadsToggle: function(inSender, inState) {
		if(debug) this.log("allowDownloadsToggle to state: "+inState);
		
		this.doBannerMessage("See homepage for download details", true);
	},
	mythwebXmlToggle: function(inSender, inState) {
		if(debug) this.log("mythwebXmlToggle to state: "+inState);
		
		this.doBannerMessage("See website for installing mythweb module", true);
		
		if(inState) {
			this.$.MythXML_keyItem.show();
		} else {
			this.$.MythXML_keyItem.hide();
		}
	},
	metrixToggle: function(inSender, inState) {
		if(debug) this.log("metrixToggle to state: "+inState);
		
		//this.bannerMessage("The app does not yet submit any data to Metrix, but it will do so in a future release.");
	},
	debugToggle: function(inSender, inState) {
		if(debug) this.log("debugToggle to state: "+inState);
		
		if(inState) {
			debug = this.$.debug.getState();
		}
	},
	
	savePreferences: function() {
		if(debug) this.log("savePreferences");
	
		//WebMyth.prefsCookie.manualMasterBackend = this.$.manualMasterBackend.getState();
		WebMyth.prefsCookie.masterBackendIp = this.$.masterBackendIp.getValue();
		WebMyth.prefsCookie.masterBackendPort = this.$.masterBackendPort.getValue();
		WebMyth.prefsCookie.masterBackendXmlPort = this.$.masterBackendXmlPort.getValue();
		
		WebMyth.prefsCookie.manualDatabase = this.$.manualDatabase.getState();
		WebMyth.prefsCookie.databaseHost = this.$.databaseHost.getValue();
		WebMyth.prefsCookie.databasePort = this.$.databasePort.getValue(WebMyth.prefsCookie.databasePort);
		WebMyth.prefsCookie.databaseUsername = this.$.databaseUsername.getValue();
		WebMyth.prefsCookie.databasePassword = this.$.databasePassword.getValue();
		WebMyth.prefsCookie.databaseName = this.$.databaseName.getValue();
		
		WebMyth.prefsCookie.webserverName = this.$.webserverName.getValue();
		WebMyth.prefsCookie.webserverUsername = this.$.webserverUsername.getValue();
		WebMyth.prefsCookie.webserverPassword = this.$.webserverPassword.getValue();
		WebMyth.prefsCookie.useScript = this.$.useScript.getValue();
		WebMyth.prefsCookie.mythwebXml = this.$.mythwebXml.getState();
		WebMyth.prefsCookie.MythXML_key = this.$.MythXML_key.getValue();
		WebMyth.prefsCookie.webmythPythonFile = this.$.webmythPythonFile.getValue();
		WebMyth.prefsCookie.allowDownloads = this.$.allowDownloads.getState();
		
		WebMyth.prefsCookie.showChannelIcons = this.$.showChannelIcons.getState();
		WebMyth.prefsCookie.showVideoListImages = this.$.showVideoListImages.getState();
		WebMyth.prefsCookie.showVideoDetailsImage = this.$.showVideoDetailsImage.getState();
		WebMyth.prefsCookie.forceScriptScreenshots = this.$.forceScriptScreenshots.getState();
		
		WebMyth.prefsCookie.remoteHeader = this.$.remoteHeader.getValue();
		WebMyth.prefsCookie.remoteVibrate = this.$.remoteVibrate.getState();
		WebMyth.prefsCookie.remoteFullscreen = this.$.remoteFullscreen.getState();
		WebMyth.prefsCookie.playJumpRemote = this.$.playJumpRemote.getState();
		WebMyth.prefsCookie.livetvJumpRemote = this.$.livetvJumpRemote.getState();
		WebMyth.prefsCookie.remoteDashboard = this.$.remoteDashboard.getState();
		
		WebMyth.prefsCookie.allowedOrientation = this.$.allowedOrientation.getValue();
		
		WebMyth.prefsCookie.allowMetrix = this.$.allowMetrix.getState();
		
		WebMyth.prefsCookie.debug = this.$.debug.getState();
		
		//Assume master backend is webserver
		if((WebMyth.prefsCookie.webserverName == "")||(WebMyth.prefsCookie.webserverName == "-")) WebMyth.prefsCookie.webserverName = WebMyth.prefsCookie.masterBackendIp;
		
		if(WebMyth.prefsCookie.useScript == 2) {
			WebMyth.useScript = true;
			WebMyth.useScriptRemote = true;
		} else if(WebMyth.prefsCookie.useScript == 1) {
			WebMyth.useScript = false;
			WebMyth.useScriptRemote = true;
		} else {
			WebMyth.useScript = false;
			WebMyth.useScriptRemote = false;
		}
		
		enyo.setAllowedOrientation(WebMyth.prefsCookie.allowedOrientation);	
		
		debug = this.$.debug.getState();
		
		enyo.setCookie("webmyth2-prefs", enyo.json.stringify(WebMyth.prefsCookie));
	
		if(debug) this.log("done savePreferences");
	
		this.doGetPreviousPane();
	},
	
});