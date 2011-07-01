/* adsf*/


enyo.kind({ name: "backendlog",
	kind: "VFlexBox",
	className: "backendlog enyo-view",
	published: {
		viewMode: "tablet"
	},
	events: {
		onBannerMessage: "",
		onSelectMode: "",
		onMysqlPluginCommand: "",
	},
	
	logList: [],
	currentLogGroup: "all",
	
	components: [
		{name: "getLogService", kind: "WebService", handleAs: "json", onSuccess: "getLogResponse", onFailure: "getLogFailure"},

		{name: "loadingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
			{kind: "HFlexBox", components: [
				{kind: "Spacer"},
				{kind: "SpinnerLarge"},
				{kind: "Spacer"},
			]},
			{content: "Loading...", style: "text-align: center;"},
		]},
			
		{name: "header", kind: "Toolbar", layoutKind: "HFlexLayout", onclick: "revealTop", components: [
			{name: "leftHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Log"), flex: 1},
		]},
		
		{kind: "HFlexBox", flex: 1, components: [
			{name: "logMenu", kind: "VFlexBox", className: "logMenu", components: [
				{name: "allMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem selected", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("All")},
				]},
				{name: "autoexpireMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Autoexpire")},
				]},
				{name: "commflagMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Commflag")},
				]},
				{name: "jobqueueMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Jobqueue")},
				]},
				{name: "mythbackendMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Mythbackend")},
				]},
				{name: "mythfilldatabaseMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Mythfilldatabase")},
				]},
				{name: "schedulerMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Scheduler")},
				]},
			]},
		
			{kind: "VFlexBox", flex: 1, components: [
				{name: "logVirtualList", kind: "VirtualList", onSetupRow: "setupLogItem", flex: 1, components: [
					{name: "logDivider", kind: "Divider"},
					{name: "logItem", kind: "Item", className: "logListItem", components: [
						{name: "logTitle", className: "title"},
						{name: "row1", className: "row1"},
						{name: "row2", className: "row2"},
					]},
				]},
			
				//{name: "errorMessage", content: "&nbsp;"},
			]},
		]},
		
		{name: "footer", kind: "Toolbar", components: [
			{name: "leftBackCommandIcon", kind: "Control", className: "backCommandIcon", onclick: "gotBack"},
			{kind: "Spacer"},
			{icon: 'images/menu-icon-refresh.png', onclick: "getLog"},
			{kind: "Spacer"},
			{name: "leftBackCommandIconSpacer", kind: "Control", className: "backCommandIconSpacer"},
		]},
								
		
	],
	
	
	create: function() {
		if(debug) this.log("create");
		this.inherited(arguments);
		
		this.render();
	},
	
	//Externally called functions
	activate: function(inViewMode) {
		if(debug) this.log("activate");
		//this.render();
		
		this.resize(inViewMode);
		
		this.$.allMenu.addClass("selected");
		this.$.autoexpireMenu.removeClass("selected");
		this.$.commflagMenu.removeClass("selected");
		this.$.jobqueueMenu.removeClass("selected");
		this.$.mythbackendMenu.removeClass("selected");
		this.$.mythfilldatabaseMenu.removeClass("selected");
		this.$.schedulerMenu.removeClass("selected");
		
		this.revealTop();
		
		this.getLog();
		
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
		
		//this.logList.length = 0;
		this.currentLogGroup = "all";
		
		this.finishedLoadingLog();
	},
	resize: function(inViewMode) {
		if(debug) this.log("resize: "+inViewMode);
		
		this.viewMode = inViewMode;
		
		if(this.viewMode == "tablet") {
			this.$.logMenu.render();
			this.$.logMenu.show();
		} else {
			this.$.logMenu.hide();
		}		
		
		this.$.logVirtualList.resized();
		
		
		//this.render();
		//this.revealTop();
	},
	gotBack: function() {
		if(debug) this.log("gotBack");
		
		this.doSelectMode("welcome");
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
	revealTop: function() {
		if(debug) this.log("revealTop");
		
		this.$.logVirtualList.punt();
		
	},
	
	//Status
	selectMenuButton: function(inSender) {
		if(debug) this.log("selectMenuButton with "+inSender.getName());
		
		var newMode = inSender.getName().substring(0,inSender.getName().length-4);
		
		this.$.allMenu.removeClass("selected");
		this.$.autoexpireMenu.removeClass("selected");
		this.$.commflagMenu.removeClass("selected");
		this.$.jobqueueMenu.removeClass("selected");
		this.$.mythbackendMenu.removeClass("selected");
		this.$.mythfilldatabaseMenu.removeClass("selected");
		this.$.schedulerMenu.removeClass("selected");
		
			
		switch(newMode) {
			case "all":
				this.$.allMenu.addClass("selected");
				
				this.currentLogGroup = "all";
				
				break;
			case "autoexpire":
				this.$.autoexpireMenu.addClass("selected");
				
				this.currentLogGroup = "autoexpire";
				
				break;
			case "commflag":
				this.$.commflagMenu.addClass("selected");
				
				this.currentLogGroup = "commflag";
				
				break;
			case "jobqueue":
				this.$.jobqueueMenu.addClass("selected");
				
				this.currentLogGroup = "jobqueue";
				
				break;
			case "mythbackend":
				this.$.mythbackendMenu.addClass("selected");
				
				this.currentLogGroup = "mythbackend";
				
				break;
			case "mythfilldatabase":
				this.$.mythfilldatabaseMenu.addClass("selected");
				
				this.currentLogGroup = "mythfilldatabase";
				
				break;
			case "scheduler":
				this.$.schedulerMenu.addClass("selected");
				
				this.currentLogGroup = "scheduler";
				
				break;
		}	
		
		this.revealTop();
		
		this.getLog();
		
		if(debug) this.log("finished changing to "+newMode);
	},
	getLog: function() {
		if(debug) this.log("getLog");
		
		this.$.loadingPopup.openAtCenter();
		this.$.spinnerLarge.show();
			
		var query = "SELECT * "; 
		query += " FROM mythlog ";
		
		if(this.currentLogGroup != 'all') {
			query += " WHERE `module` = '"+this.currentLogGroup+"' ";
		}
		
		query += " ORDER BY `logid` DESC ";
		query += " LIMIT 100 ";
		
		if(debug) this.log("Log SQL query is "+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQLwithResponse";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.getLogService.setUrl(requestUrl);
			this.$.getLogService.call();
		
		} else {
			
			this.doMysqlPluginCommand("mysqlBackendlogGetLog", query);
			
		}
		
		
	},
	getLogResponse: function(inSender, inResponse) {
		if(debug) this.log("getLogResponse");
		//if(debug) this.log("getLogResponse: "+enyo.json.stringify(inResponse));
		
		this.logList.length = 0;
		
		this.logList = inResponse;
		
		this.finishedLoadingLog();
		
	},
	getLogFailure: function(inSender, inResponse) {
		this.error("getLogFailure");
		
		this.$.errorMessage.setContent("Error getting status");
		
		this.finishedLoadingLog();
		
	},
	setupLogItem: function(inSender, inIndex) {
		var row = this.logList[inIndex];
		
		if(row) {
		
			//this.$.logDivider.setCaption(row.module);
			this.setupLogDivider(inIndex);
		
			this.$.logTitle.setContent(row.logdate+" - "+row.host);
			this.$.row1.setContent(row.message);
			this.$.row2.setContent(row.details);
			
			return true;
		}
		
	},
	setupLogDivider: function(inIndex) {
		//if(debug) this.log("setupLogDivider at index: "+inIndex);
		
		// use group divider at group transition, otherwise use item border for divider
		var group = this.getLogGroupName(inIndex);
		this.$.logDivider.setCaption(group);
		this.$.logDivider.canGenerate = Boolean(group);
		this.$.logItem.applyStyle("border-top", Boolean(group) ? "none" : "1px solid silver;");
		this.$.logItem.applyStyle("border-bottom", "none;");
    },
	getLogGroupName: function(inIndex) {
		//if(debug) this.log("getProgramGroupName at index: "+inIndex);
		
		var r0 = this.logList[inIndex-1];
		var r1 = this.logList[inIndex];
		
		var a = r0 && r0.module.toUpperCase();
		var b = r1.module.toUpperCase();
		
		return a != b ? b : null;
	},
	finishedLoadingLog: function() {
	
		this.$.logVirtualList.punt();
		
	
		this.$.loadingPopup.close();
		enyo.scrim.hide();
	
	},
	
	
});
