/* adsf*/


enyo.kind({ name: "backendstatus",
	kind: "VFlexBox",
	className: "backendstatus enyo-view",
	published: {
		viewMode: "tablet"
	},
	events: {
		onBannerMessage: "",
		onSelectMode: "",
		onMysqlPluginCommand: "",
	},
	
	encodersList: [],
	scheduledList: [],
	jobqueueList: [],
	storageList: [],
	
	inputs: [],
	
	components: [
	
		{name: "getStatusService", kind: "WebService", handleAs: "xml", onSuccess: "getStatusResponse", onFailure: "getStatusFailure"},
		{name: "getInputsService", kind: "WebService", handleAs: "json", onSuccess: "getInputsResponse", onFailure: "getInputsFailure"},

		{name: "loadingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
			{kind: "HFlexBox", components: [
				{kind: "Spacer"},
				{kind: "SpinnerLarge"},
				{kind: "Spacer"},
			]},
			{content: "Loading...", style: "text-align: center;"},
		]},
			
		{name: "header", kind: "Toolbar", layoutKind: "VFlexLayout", onclick: "revealTop", components: [
			{name: "leftHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Status")},
			{name: "leftHeaderSubtitle", content: "Master Backend", kind: "Control", className: "headerSubtitle"},
		]},
		
		{kind: "HFlexBox", flex: 1, components: [
			{name: "statusMenu", kind: "VFlexBox", className: "statusMenu", components: [
				{name: "allMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem selected", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("All")},
				]},
				{name: "encodersMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Encoders")},
				]},
				{name: "scheduledMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Scheduled")},
				]},
				{name: "jobqueueMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Jobqueue")},
				]},
				{name: "storageMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Storage")},
				]},
				{name: "guideMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Guide")},
				]},
				{name: "otherMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Other")},
				]},
			]},
		
			{name: "statusScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
		
				{name: "encodersDrawer", kind: "DividerDrawer", open: false, caption: "Encoders", animate: false, components: [
					{name: "encodersVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getEncodersItem", onclick: "encodersSelect", components: [
						{name: "encodersItem", kind: "Item", className: "encodersItem", components: [
							{name: "encodersDescription", className: "encodersDescription"},
							{name: "encodersProgram", allowHtml: true, className: "encodersProgram"},
						]}
					]},
				]},
				
				{name: "scheduledDrawer", kind: "DividerDrawer", open: false, caption: "Scheduled", animate: false, components: [
					{name: "scheduledVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getScheduledItem", onclick: "scheduledSelect", components: [
						{name: "scheduledItem", kind: "Item", className: "scheduledItem", components: [
							{name: "scheduledTitle", className: "scheduledTitle"},
							{name: "scheduledSubtitle", className: "scheduledSubtitle"},
							{name: "scheduledRecstartts", className: "scheduledRecstartts"},
							{name: "scheduledEncoder", className: "scheduledEncoder"},
						]}
					]},
				]},
				
				{name: "jobqueueDrawer", kind: "DividerDrawer", open: false, caption: "Job Queue", animate: false, components: [
					{name: "jobqueueVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getJobqueueItem", onclick: "jobqueueSelect", components: [
						{name: "jobqueueItem", kind: "Item", className: "jobqueueItem", components: [
							{name: "jobqueueTitle", className: "jobqueueTitle"},
							{name: "jobqueueStarttime", className: "jobqueueStarttime"},
							{name: "jobqueueType", className: "jobqueueType"},
							{name: "jobqueueStatus", className: "jobqueueStatus"},
							{name: "jobqueueComments", className: "jobqueueComments"},
						]}
					]},
					{content: "No recent or current jobs", name: "nojobs"},
				]},
				
				{name: "storageDrawer", kind: "DividerDrawer", open: false, caption: "Storage Locations", animate: false, components: [
					{name: "storageVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getStorageItem", onclick: "storageSelect", components: [
						{name: "storageItem", kind: "Item", className: "storageItem", components: [
							{name: "storageName", className: "storageName"},
							{name: "storageFree", className: "storageFree"},
							{name: "storageUsed", className: "storageUsed"},
							{name: "storageTotal", className: "storageTotal"},
						]}
					]},
				]},
				
				{name: "guideDrawer", kind: "DividerDrawer", open: false, caption: "Guide Information", animate: false, components: [
					
					{name: "guideStartItem", kind: "Item", className: "enyo-first", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "guideStart", flex: 1},
						{content: "Last Run", className: "label"},
					]},
					{name: "guideStatusItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "guideStatus", flex: 1},
						{content: "Last Run", className: "label"},
					]},
					{name: "guideThruItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "guideThru", flex: 1},
						{content: "Data Until", className: "label"},
					]},
					{name: "guideDaysItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "guideDays", flex: 1},
						{content: "Days", className: "label"},
					]},
					{name: "guideNextItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "guideNext", flex: 1},
						{content: "Next Run", className: "label"},
					]},
					{name: "guideCommentsItem", kind: "Item", className: "enyo-last", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "guideComments", flex: 1},
						{content: "Comments", className: "label"},
					]},
					
				]},
				
				{name: "otherDrawer", kind: "DividerDrawer", open: false, caption: "Other Information", animate: false, components: [
					
					{name: "masterBackendItem", kind: "Item", className: "enyo-first", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "masterBackend", flex: 1},
						{content: "Master Backend", className: "label"},
					]},
					{name: "protoVerItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "protoVer", flex: 1},
						{content: "Protocol Version", className: "label"},
					]},
					{name: "statusVersionItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "statusVersion", flex: 1},
						{content: "MythTV Version", className: "label"},
					]},
					{name: "statusDateItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "statusDate", flex: 1},
						{content: "Current Date", className: "label"},
					]},
					{name: "statusTimeItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "statusTime", flex: 1},
						{content: "Current Time", className: "label"},
					]},
					{name: "allLoadsItem", kind: "Item", className: "enyo-last", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "allLoads", flex: 1},
						{content: "Load Avg", className: "label"},
					]},
					
				]},
				
				{name: "errorMessage", content: "&nbsp;"},
			]},
		
		]},
		
		{name: "footer", kind: "Toolbar", components: [
			{name: "leftBackCommandIcon", kind: "Control", className: "backCommandIcon", onclick: "gotBack"},
			{kind: "Spacer"},
			{icon: 'images/menu-icon-refresh.png', onclick: "getStatus"},
			{kind: "Spacer"},
			{name: "leftBackCommandIconSpacer", kind: "Control", className: "backCommandIconSpacer"},
		]},
								
		
	],
	
	
	create: function() {
		if(debug) this.log("create");
		this.inherited(arguments);
		
		this.guideStart = "";
		this.guideStatus = "";
		this.guideThru = "";
		this.guideDays = "";
		this.guideNext = "";
		this.guideComments = "";
		
		
		this.statusVersion = "";
		this.statusDate = "";
		this.statusTime = "";
		this.allLoads = "";
		
		
		this.render();
	},
	
	//Externally called functions
	activate: function(inViewMode) {
		if(debug) this.log("activate");
		//this.render();
		
		this.resize(inViewMode);
		
		this.$.leftHeaderSubtitle.setContent(WebMyth.prefsCookie.masterBackendIp);
		
		this.$.allMenu.addClass("selected");
		this.$.encodersMenu.removeClass("selected");
		this.$.scheduledMenu.removeClass("selected");
		this.$.jobqueueMenu.removeClass("selected");
		this.$.storageMenu.removeClass("selected");
		this.$.guideMenu.removeClass("selected");
		this.$.otherMenu.removeClass("selected");
		
		this.$.encodersDrawer.close();
		this.$.scheduledDrawer.close();
		this.$.jobqueueDrawer.close();
		this.$.storageDrawer.close();
		this.$.guideDrawer.close();
		this.$.otherDrawer.close();
			
		this.$.encodersDrawer.show();
		this.$.scheduledDrawer.show();
		this.$.jobqueueDrawer.show();
		this.$.storageDrawer.show();
		this.$.guideDrawer.show();
		this.$.otherDrawer.show();
		
		this.revealTop();
		
		this.getStatus();
		
		if(this.inputs.length == 0) this.getInputs();
		
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
		
		this.encodersList.length = 0;
		this.scheduledList.length = 0;
		this.jobqueueList.length = 0;
		this.storageList.length = 0;
		
		this.finishedLoadingStatus();
	},
	resize: function(inViewMode) {
		if(debug) this.log("resize: "+inViewMode);
		
		this.viewMode = inViewMode;
		
		if(this.viewMode == "tablet") {
			this.$.statusMenu.render();
			this.$.statusMenu.show();
		} else {
			this.$.statusMenu.hide();
		}		
		
		
		
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
		
		this.$.statusScroller.scrollIntoView(0,0);
		
	},
	
	//Status
	selectMenuButton: function(inSender) {
		if(debug) this.log("selectMenuButton with "+inSender.getName());
		
		var newMode = inSender.getName().substring(0,inSender.getName().length-4);
		
		this.$.encodersDrawer.close();
		this.$.scheduledDrawer.close();
		this.$.jobqueueDrawer.close();
		this.$.storageDrawer.close();
		this.$.guideDrawer.close();
		this.$.otherDrawer.close();
		
		this.$.allMenu.removeClass("selected");
		this.$.encodersMenu.removeClass("selected");
		this.$.scheduledMenu.removeClass("selected");
		this.$.jobqueueMenu.removeClass("selected");
		this.$.storageMenu.removeClass("selected");
		this.$.guideMenu.removeClass("selected");
		this.$.otherMenu.removeClass("selected");
		
		if(newMode == "all") {
		
			this.$.allMenu.addClass("selected");
			
			this.$.encodersDrawer.show();
			this.$.scheduledDrawer.show();
			this.$.jobqueueDrawer.show();
			this.$.storageDrawer.show();
			this.$.guideDrawer.show();
			this.$.otherDrawer.show();
			
		} else {
		
			this.$.encodersDrawer.hide();
			this.$.scheduledDrawer.hide();
			this.$.jobqueueDrawer.hide();
			this.$.storageDrawer.hide();
			this.$.guideDrawer.hide();
			this.$.otherDrawer.hide();
			
			switch(newMode) {
				case "encoders":
					this.$.encodersMenu.addClass("selected");
					
					this.$.encodersDrawer.toggleOpen();
					this.$.encodersDrawer.show();
					this.$.encodersDrawer.render();
					break;
				case "scheduled":
					this.$.scheduledMenu.addClass("selected");
					
					this.$.scheduledDrawer.show();
					this.$.scheduledDrawer.toggleOpen();
					this.$.scheduledDrawer.render();
					break;
				case "jobqueue":
					this.$.jobqueueMenu.addClass("selected");
					
					this.$.jobqueueDrawer.toggleOpen();
					this.$.jobqueueDrawer.show();
					this.$.jobqueueDrawer.render();
					break;
				case "storage":
					this.$.storageMenu.addClass("selected");
					
					this.$.storageDrawer.toggleOpen();
					this.$.storageDrawer.show();
					this.$.storageDrawer.render();
					break;
				case "guide":
					this.$.guideMenu.addClass("selected");
					
					this.$.guideDrawer.toggleOpen();
					this.$.guideDrawer.show();
					this.$.guideDrawer.render();
					break;
				case "other":
					this.$.otherMenu.addClass("selected");
					
					this.$.otherDrawer.toggleOpen();
					this.$.otherDrawer.show();
					this.$.otherDrawer.render();
					break;
			}	
		} 
		
		this.revealTop();
		
		if(debug) this.log("finished changing to "+newMode);
	},
	getStatus: function() {
		if(debug) this.log("getStatus");
		
		this.$.loadingPopup.openAtCenter();
		this.$.spinnerLarge.show();
		
		var requestUrl = "";
		
		if(WebMyth.prefsCookie.mythwebXml) {
			
			requestUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/xml?MythXMLKey=";
			requestUrl += WebMyth.prefsCookie.MythXML_key;
			
		} else {
			
			requestUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/xml";
			
		}
		
		if(debug) this.log("requestUrl: "+requestUrl);
		
		this.$.getStatusService.setUrl(requestUrl);
		this.$.getStatusService.call();
		
	},
	getStatusResponse: function(inSender, inResponse) {
		if(debug) this.log("getStatusResponse");
		
		//this.$.statusContent.setContent(htmlEncode(inResponse, true, 6));
		
		this.$.errorMessage.setContent("");
		
		
		this.encodersList.length = 0;
		this.scheduledList.length = 0;
		this.jobqueueList.length = 0;
		this.storageList.length = 0;
		
		
		var singleEncoderNode, singleEncoderChildNode, singleEncoderJson;
		var singleScheduledNode, singleScheduledRecordingNode, singleScheduleJson;
		var singleJobqueueNode, singleJobqueueProgramNode, singleJobqueueJson;
		var hasJobs = false, tempJobsList = [];
		var singleStorageNode, singleStorageJson;
		
		
		//Encoders
		var encodersNode = inResponse.getElementsByTagName("Encoders")[0];
		var encodersCount = encodersNode.getAttributeNode("count").nodeValue;
		//if(debug) this.log("Count of encoders is "+encodersCount);
		//if(debug) this.log("Count of child encoder nodes is "+encodersNode.childNodes.length);
		for(var i = 0; i < encodersNode.childNodes.length; i++) {
			//if(debug) this.log("Encoder nodeName is "+encodersNode.childNodes[i].nodeName);
			singleEncoderNode = encodersNode.childNodes[i];
			if(singleEncoderNode.nodeName == "Encoder") {
				singleEncoderJson = { 
										"hostname" : singleEncoderNode.getAttributeNode("hostname").nodeValue,
										"state" : singleEncoderNode.getAttributeNode("state").nodeValue,
										"id" : singleEncoderNode.getAttributeNode("id").nodeValue,
										"local" : singleEncoderNode.getAttributeNode("local").nodeValue,
										"sleepstatus" : singleEncoderNode.getAttributeNode("sleepstatus").nodeValue,
										"connected" : singleEncoderNode.getAttributeNode("connected").nodeValue,
										"encoderName" : ""
									};
				for(var j = 0; j < singleEncoderNode.childNodes.length; j++) {
					singleEncoderChildNode = singleEncoderNode.childNodes[j];
					if(singleEncoderChildNode.nodeName == "Program") {
						singleEncoderJson.title = singleEncoderChildNode.getAttributeNode("title").nodeValue;
						singleEncoderJson.subtitle = singleEncoderChildNode.getAttributeNode("subTitle").nodeValue;
						singleEncoderJson.endtime = singleEncoderChildNode.getAttributeNode("endTime").nodeValue.replace("T", " ");
					}
				}
					
				//if(debug) this.log("Added encoder %j to list", singleEncoderJson);
				this.encodersList.push(singleEncoderJson);
			}
		} 
		if(debug) this.log("Full encoder list is: "+enyo.json.stringify(this.encodersList));
		//this.controller.modelChanged(this.encodersListModel);
			
		
		//Scheduled
		var scheduledNode=inResponse.getElementsByTagName("Scheduled")[0];
		var scheduledCount = scheduledNode.getAttributeNode("count").nodeValue;
		//if(debug) this.log("Count of scheduled is "+scheduledCount);
		//if(debug) this.log("Count of child scheduled nodes is "+scheduledNode.childNodes.length);
		for(var i = 0; i < scheduledNode.childNodes.length; i++) {
			//if(debug) this.log("scheduled nodeName is "+scheduledNode.childNodes[i].nodeName);
			singleScheduledNode = scheduledNode.childNodes[i];
			if(singleScheduledNode.nodeName == "Program") {
				singleScheduledRecordingNode = singleScheduledNode.getElementsByTagName("Recording")[0];
				singleScheduledJson = { 
										"starttime" : singleScheduledNode.getAttributeNode("startTime").nodeValue.replace("T", " "),
										"title" : singleScheduledNode.getAttributeNode("title").nodeValue,
										"hostname" : singleScheduledNode.getAttributeNode("hostname").nodeValue,
										"subtitle" : singleScheduledNode.getAttributeNode("subTitle").nodeValue,
										"description" : singleScheduledNode.childNodes[0].nodeValue,
										"chanid" : singleScheduledNode.getElementsByTagName("Channel")[0].getAttributeNode("chanId").nodeValue,
										"encoderId" : singleScheduledRecordingNode.getAttributeNode("encoderId").nodeValue,
										"recstartts" : singleScheduledRecordingNode.getAttributeNode("recStartTs").nodeValue.replace("T"," "),
										"encoderName" : ""
									};
				//if(debug) this.log("Added scheduled %j to list", singleScheduledJson);
				this.scheduledList.push(singleScheduledJson);
			}
		} 
		if(debug) this.log("Full scheduled is: "+enyo.json.stringify(this.scheduledList));
		//this.controller.modelChanged(this.scheduledListModel);
		
		
		//JobQueue
		var jobqueueNode=inResponse.getElementsByTagName("JobQueue")[0];
		var jobqueueCount = jobqueueNode.getAttributeNode("count").nodeValue;
		//if(debug) this.log("Count of jobqueue is "+jobqueueCount);
		//if(debug) this.log("Count of child jobqueue nodes is "+jobqueueNode.childNodes.length);
		for(var i = 0; i < jobqueueNode.childNodes.length; i++) {
			//if(debug) this.log("jobqueue nodeName is "+jobqueueNode.childNodes[i].nodeName);
			singleJobqueueNode = jobqueueNode.childNodes[i];
			if(singleJobqueueNode.nodeName == "Job") {
				hasJobs = true;
				singleJobqueueProgramNode = singleJobqueueNode.getElementsByTagName("Program")[0];
				singleJobqueueJson = { 
										"starttime" : singleJobqueueNode.getAttributeNode("startTime").nodeValue.replace("T", " "),
										"id" : singleJobqueueNode.getAttributeNode("id").nodeValue,
										"status" : singleJobqueueNode.getAttributeNode("status").nodeValue,
										"type" : singleJobqueueNode.getAttributeNode("type").nodeValue,
										"hostname" : singleJobqueueNode.getAttributeNode("hostname").nodeValue,
										"comments" : singleJobqueueNode.childNodes[0].nodeValue,
										"title" : singleJobqueueProgramNode.getAttributeNode("title").nodeValue,
										"subtitle" : singleJobqueueProgramNode.getAttributeNode("subTitle").nodeValue,
										"fullTitle" : singleJobqueueProgramNode.getAttributeNode("title").nodeValue+": "+singleJobqueueProgramNode.getAttributeNode("subTitle").nodeValue
									};
				//if(debug) this.log("Added jobqueue %j to list", singleJobqueueJson);
				tempJobsList.push(singleJobqueueJson);
			}
		} 
		if(hasJobs) {
			//Only update jobs list if we had jobs
		
			this.jobqueueList.length = 0;
			this.jobqueueList = tempJobsList;
			//this.controller.modelChanged(this.jobqueueListModel);
			
		}
		if(debug) this.log("Full jobqueue is: "+enyo.json.stringify(this.jobqueueList));
		
		
		//Storage
		var storageNode=inResponse.getElementsByTagName("Storage")[0];
		//if(debug) this.log("Count of child storage nodes is "+storageNode.childNodes.length);
		for(var i = 0; i < storageNode.childNodes.length; i++) {
			//if(debug) this.log("Storage nodeName is "+storageNode.childNodes[i].nodeName);
			singleStorageNode = storageNode.childNodes[i];
			if(singleStorageNode.nodeName == "Group") {
				singleStorageJson = { 
					"dir" : singleStorageNode.getAttributeNode("dir").nodeValue,
					"id" : singleStorageNode.getAttributeNode("id").nodeValue,
					"free" : parseInt(singleStorageNode.getAttributeNode("free").nodeValue),
					//"freeText": $L("Free")+": "+Mojo.Format.formatNumber(parseInt(singleStorageNode.getAttributeNode("free").nodeValue))+" MB",
					"total" : parseInt(singleStorageNode.getAttributeNode("total").nodeValue),
					//"totalText": $L("Total")+": "+Mojo.Format.formatNumber(parseInt(singleStorageNode.getAttributeNode("total").nodeValue))+" MB",
					"used" : parseInt(singleStorageNode.getAttributeNode("used").nodeValue),
					//"usedText": $L("Used")+": "+Mojo.Format.formatNumber(parseInt(singleStorageNode.getAttributeNode("used").nodeValue))+" MB"
				};
				
				//singleStorageJson.freePercentage = Mojo.Format.formatNumber(100*singleStorageJson.free/singleStorageJson.total, {fractionDigits: 1})+"%";
				//singleStorageJson.usedPercentage = Mojo.Format.formatNumber(100*singleStorageJson.used/singleStorageJson.total, {fractionDigits: 1})+"%";
				
				//if(debug) this.log("Added storage group %j to list", singleStorageJson);
				this.storageList.push(singleStorageJson);
			}
		} 
		if(debug) this.log("Full storagelist is: "+enyo.json.stringify(this.storageList));
		//this.controller.modelChanged(this.storageListModel);
		
		
		//Guide
		this.guideStart = "";
		this.guideStatus = "";
		this.guideThru = "";
		this.guideDays = "";
		this.guideNext = "";
		this.guideComments = "";
		
		try {
			var guideNode=inResponse.getElementsByTagName("Guide")[0];
		
			this.guideStart = guideNode.getAttributeNode("start").nodeValue.replace("T", " ");
			this.guideStatus = guideNode.getAttributeNode("status").nodeValue.replace("T", " ");
			this.guideThru = guideNode.getAttributeNode("guideThru").nodeValue.replace("T", " ");
			this.guideDays = guideNode.getAttributeNode("guideDays").nodeValue.replace("T", " ");
			this.guideNext = guideNode.getAttributeNode("next").nodeValue.replace("T", " ");
			
			this.guideComments = guideNode.childNodes[0].nodeValue;
			
		} catch (e) {
		
			this.error(e);
			
		}
		
		
		
		
		//General
		
		try {
			var statusNode=inResponse.getElementsByTagName("Status")[0];
			var loadNode=inResponse.getElementsByTagName("Load")[0];
		
			this.statusVersion = statusNode.getAttributeNode("version").nodeValue;
			this.statusDate = statusNode.getAttributeNode("date").nodeValue;
			this.statusTime = statusNode.getAttributeNode("time").nodeValue;
			this.allLoads = loadNode.getAttributeNode("avg1").nodeValue+", "+loadNode.getAttributeNode("avg2").nodeValue+", "+loadNode.getAttributeNode("avg3").nodeValue;
			
			WebMyth.prefsCookie.mythVer = statusNode.getAttributeNode("version").nodeValue;
			
		} catch (e) {
			this.error(e);
		}
		
		
		
		
		
		
		//Show encoders names only after we get both XML status and SQL response
		this.doneStatusXML = true;
		
		if(this.doneCardinputs) {
			this.combineEncoders();
		}
		
		this.finishedLoadingStatus();
		
		
	},
	getStatusFailure: function(inSender, inResponse) {
		this.error("getStatusFailure");
		
		this.$.errorMessage.setContent("Error getting status");
		
		this.finishedLoadingStatus();
		
	},	
	getInputs: function() {
		if(debug) this.log("getInputs");
		
		var query = "SELECT cardid, displayname FROM cardinput ORDER BY cardid;";
		
		if(debug) this.log("cardinput SQL query is "+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQLwithResponse";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.getInputsService.setUrl(requestUrl);
			this.$.getInputsService.call();
		
		} else {
			
			this.doMysqlPluginCommand("mysqlBackendstatusGetInputs", query);
			
		}
		
	},
	getInputsResponse: function(inSender, inResponse) {
		if(debug) this.log("getInputsResponse: "+enyo.json.stringify(inResponse));
		
		this.inputs = inResponse;
		
		if(debug) this.log("this.inputs: "+enyo.json.stringify(this.inputs));
		
		this.$.encodersVirtualRepeater.render();
		this.$.scheduledVirtualRepeater.render();
		
	},
	getInputsFailure: function(inSender, inResponse) {
		this.error("getInputsFailure");
		
	},
	getEncodersItem: function(inSender, inIndex) {
		var row = this.encodersList[inIndex];
		
		if(row) {
		
			var text = "";
			
			//text += "Encoder #"+row.id;
			text += "#"+row.id;
			
			for(var i = 0; i < this.inputs.length; i++) {
				if(this.inputs[i].cardid == row.id) text += " ("+this.inputs[i].displayname+")";
			}
			
			text += " on "+row.hostname+" is "+encoderStateDecode(row.state);
			
			var programText = "";
			if(row.title) {
				programText += row.title;
				if(row.subtitle.length > 0) programText += ': '+row.subtitle+'<br />';
				programText += 'Program finishes at '+row.endtime+'</div>';
			}
			
			this.$.encodersDescription.setContent(text);
			this.$.encodersProgram.setContent(programText);

			if(inIndex == 0) {
				this.$.encodersItem.addClass("enyo-first");
			} else if(inIndex == this.encodersList.length - 1) {
				this.$.encodersItem.addClass("enyo-last");
			}
			
			return true;
		}
		
	},
	getScheduledItem: function(inSender, inIndex) {
		var row = this.scheduledList[inIndex];
		
		if(row) {
		
			var encoderText = "";
			
			encoderText += "Encoder #"+row.encoderId;
			
			for(var i = 0; i < this.inputs.length; i++) {
				if(this.inputs[i].cardid == row.encoderId) encoderText += " ("+this.inputs[i].displayname+")";
			}
			
			encoderText += " on "+row.hostname;
			
			
			this.$.scheduledTitle.setContent(row.title);
			this.$.scheduledSubtitle.setContent(row.subtitle);
			this.$.scheduledRecstartts.setContent(row.recstartts.replace("T"," "));
			this.$.scheduledEncoder.setContent(encoderText);

			if(inIndex == 0) {
				this.$.scheduledItem.addClass("enyo-first");
			} else if(inIndex == this.scheduledList.length - 1) {
				this.$.scheduledItem.addClass("enyo-last");
			}
			
			return true;
		}
		
	},
	getJobqueueItem: function(inSender, inIndex) {
		var row = this.jobqueueList[inIndex];
		
		if(row) {
		
			var typeText = "";
			var statusText = "";
			
			typeText += jobqueueTypeDecode(row.type);
			typeText += " on "+row.hostname;
			
			statusText += jobqueueStatusDecode(row.status);
			
			this.$.jobqueueTitle.setContent(row.title);
			this.$.jobqueueStarttime.setContent(row.starttime.replace("T"," "));
			this.$.jobqueueType.setContent(typeText);
			this.$.jobqueueStatus.setContent(statusText);
			
			if(row.comments) {
				this.$.jobqueueComments.setContent(row.comments);
			} else {
				this.$.jobqueueComments.setContent("");
			}

			if(inIndex == 0) {
				this.$.jobqueueItem.addClass("enyo-first");
			} else if(inIndex == this.jobqueueList.length - 1) {
				this.$.jobqueueItem.addClass("enyo-last");
			}
			
			return true;
		}
		
	},	
	getStorageItem: function(inSender, inIndex) {
		var row = this.storageList[inIndex];
		
		if(row) {
		
			this.$.storageName.setContent(row.dir);
			this.$.storageFree.setContent("Free: "+row.free+" MB");
			this.$.storageUsed.setContent("Used: "+row.used+" MB");
			this.$.storageTotal.setContent("Total: "+row.total+" MB");

			if(inIndex == 0) {
				this.$.storageItem.addClass("enyo-first");
			} else if(inIndex == this.storageList.length - 1) {
				this.$.storageItem.addClass("enyo-last");
			}
			
			return true;
		}
		
	},		
	finishedLoadingStatus: function() {
	
		this.$.encodersVirtualRepeater.render();
		this.$.scheduledVirtualRepeater.render();
		this.$.jobqueueVirtualRepeater.render();
		this.$.storageVirtualRepeater.render();
		
		
		this.$.guideStart.setContent(this.guideStart);
		this.$.guideStatus.setContent(this.guideStatus);
		this.$.guideThru.setContent(this.guideThru);
		this.$.guideDays.setContent(this.guideDays);
		this.$.guideNext.setContent(this.guideNext);
		this.$.guideComments.setContent(this.guideComments);
		
		
		this.$.masterBackend.setContent(WebMyth.prefsCookie.masterBackendIp);
		this.$.protoVer.setContent(WebMyth.prefsCookie.protoVer);
		this.$.statusVersion.setContent(this.statusVersion);
		this.$.statusDate.setContent(this.statusDate);
		this.$.statusTime.setContent(this.statusTime);
		this.$.allLoads.setContent(this.allLoads);
		
		
		if(this.jobqueueList.length == 0) {
			this.$.nojobs.show();
		} else {
			this.$.nojobs.hide();
		}
	
		this.$.loadingPopup.close();
		enyo.scrim.hide();
	
	},
	
	
});