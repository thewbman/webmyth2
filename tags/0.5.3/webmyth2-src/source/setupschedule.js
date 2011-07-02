/* adsf*/


enyo.kind({ name: "setupschedule",
	kind: "VFlexBox",
	className: "setupschedule enyo-view",
	
	events: {
		onBannerMessage: "",
		onGetPreviousPane: "",
		onSelectMode: "",
		onSavePreferences: "",
		onPersonSelected: "",
		onOpenWeb: "",
		onSetupSchedule: "",
		onProgramGuide: "",
		onTitleSearch: "",
		onDownloadFile: "",
		onMysqlPluginCommand: "",
		onMysqlPluginExecute: "",
		onMythprotocolPluginCommand: "",
	},
	
	viewMode: "tablet",
	
	ruleTypes: [],
	
	inputs: [],
	
	detailsProgram: {},
	ruleObject: {},
	newRule: {},
	
	showForceRecordButton: true,
	showForceDontRecordButton: true,
	showNeverRecordButton: true,
	showForgetOldButton: true,
	showDeleteScheduleButton: true,
	deleteWrapperText: "Delete schedule", 
	deleteText: "Confirm delete",
		
	components: [
		{name: "getInputsService", kind: "WebService", handleAs: "json", onSuccess: "getInputsResponse", onFailure: "getInputsFailure"},
		{name: "getRuleService", kind: "WebService", handleAs: "json", onSuccess: "getRuleResponse", onFailure: "getRuleFailure"},
		{name: "saveRuleService", kind: "WebService", handleAs: "txt", onSuccess: "saveRuleResponse", onFailure: "saveRuleFailure"},
		{name: "rescheduleService", kind: "WebService", handleAs: "txt", onSuccess: "rescheduleResponse", onFailure: "rescheduleFailure"},

		{name: "loadingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
			{kind: "HFlexBox", components: [
				{kind: "Spacer"},
				{name: "loadingSpinnerLarge", kind: "SpinnerLarge"},
				{kind: "Spacer"},
			]},
			{content: "Loading...", style: "text-align: center;"},
		]},
		{name: "savingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
			{kind: "HFlexBox", components: [
				{kind: "Spacer"},
				{name: "savingSpinnerLarge", kind: "SpinnerLarge"},
				{kind: "Spacer"},
			]},
			{content: "Saving...", style: "text-align: center;"},
		]},
			
		{name: "header", kind: "Toolbar", layoutKind: "HFlexLayout", onclick: "revealTop", components: [
			{name: "leftHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Setup Schedule"), flex2: 1},
		]},
		
		{kind: "HFlexBox", flex: 1, components: [
			{name: "setupscheduleMenu", kind: "VFlexBox", className: "setupscheduleMenu", components: [
				{name: "allMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem selected", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("All")},
				]},
				{name: "typeMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Rule Type")},
				]},
				{name: "programMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Program Info")},
				]},
				{name: "programdetailsMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Program Details")},
				]},
				{name: "recordingMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Recording")},
				]},
				{name: "jobMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Jobs")},
				]},
			]},
		
			{name: "setupscheduleScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
			
				{name: "typeDrawer", kind: "DividerDrawer", caption: "Rule Type", open: true, animate: false, components: [
					{kind: "Item", className: "enyo-single", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "type", kind: "ListSelector", label: "", flex: 1, items: [
							//this.ruleTypes
						]},
					]},
				]},
				
				{name: "programDrawer", kind: "DividerDrawer", caption: "Program", open: true, animate: false, components: [
					{name: "titleItem", kind: "Item", className: "enyo-first", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "title", flex: 1},
						{content: "title", className: "label"},
					]},
					{name: "subtitleItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "subtitle", flex: 1},
						{content: "Subtitle", className: "label"},
					]},
					{name: "starttimeItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "starttime", flex: 1},
						{content: "starttime", className: "label"},
					]},
					{name: "recstatustextItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "recstatustext", flex: 1},
						{content: "Status", className: "label"},
					]},
					{name: "channameItem", kind: "Item", className: "enyo-last", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "channame", flex: 1},
						{content: "Channel Name", className: "label"},
					]},
					
				]},
				
				{name: "programdetailsDrawer", kind: "DividerDrawer", caption: "Program Details", open: false, animate: false, components: [
					{name: "descriptionItem", kind: "Item", className: "enyo-first", align: "center", tapHighlight: false, components: [
						{name: "description", className: "description"},
					]},
					{name: "categoryItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "category", flex: 1},
						{content: "category", className: "label"},
					]},
					{name: "seriesidItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "seriesid", flex: 1},
						{content: "seriesid", className: "label"},
					]},
					{name: "programidItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "programid", flex: 1},
						{content: "programid", className: "label"},
					]},
					{name: "endtimeItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "endtime", flex: 1},
						{content: "endtime", className: "label"},
					]},
					{name: "chanidItem", kind: "Item", className: "enyo-last", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "chanid", flex: 1},
						{content: "chanid", className: "label"},
					]},			
				]},
				
				{name: "recordingDrawer", kind: "DividerDrawer", caption: "Recording Options", open: false, animate: false, components: [
					{name: "recpriorityItem", kind: "Item", className: "enyo-first", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "recpriority", kind: "IntegerPicker", min: -100, max: 100, label: ""},
						{kind: "Spacer"},
						{content: "rec priority", className: "label"},
					]},
					{name: "prefinputItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "prefinput", kind: "ListSelector", label: "Preferred Input" , flex: 1, items: [
							//
						]},
					]},
					{name: "inactiveItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{className: "checkBoxLeftSpacer"},
						{name: "inactive", kind: "CheckBox"},
						{kind: "Spacer"},
						{content: "inactive", className: "label"},
					]},
					{name: "autoexpireItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{className: "checkBoxLeftSpacer"},
						{name: "autoexpire", kind: "CheckBox"},
						{kind: "Spacer"},
						{content: "autoexpire", className: "label"},
					]},
					{name: "maxnewestItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{className: "checkBoxLeftSpacer"},
						{name: "maxnewest", kind: "CheckBox"},
						{kind: "Spacer"},
						{content: "record new, expire old", className: "label"},
					]},
					{name: "maxepisodesItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "maxepisodes", kind: "IntegerPicker", min: 0, max: 100, label: ""},
						{kind: "Spacer"},
						{content: "maxepisodes", className: "label"},
					]},
					{name: "startoffsetItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "startoffset", kind: "IntegerPicker", min: -100, max: 100, label: ""},
						{kind: "Spacer"},
						{content: "start early", className: "label"},
					]},
					{name: "endoffsetItem", kind: "Item", className: "enyo-last", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{name: "endoffset", kind: "IntegerPicker", min: -100, max: 100, label: ""},
						{kind: "Spacer"},
						{content: "end late", className: "label"},
					]},
				]},
				
				{name: "jobDrawer", kind: "DividerDrawer", caption: "Job Options", open: false, animate: false, components: [
					{name: "autocommflagItem", kind: "Item", className: "enyo-first", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{className: "checkBoxLeftSpacer"},
						{name: "autocommflag", kind: "CheckBox"},
						{kind: "Spacer"},
						{content: "Commercial Flag", className: "label"},
					]},
					{name: "autotranscodeItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{className: "checkBoxLeftSpacer"},
						{name: "autotranscode", kind: "CheckBox"},
						{kind: "Spacer"},
						{content: "transcode", className: "label"},
					]},
					{name: "autouserjob1Item", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{className: "checkBoxLeftSpacer"},
						{name: "autouserjob1", kind: "CheckBox"},
						{kind: "Spacer"},
						{name: "autouserjob1label", className: "label"},
					]},
					{name: "autouserjob2Item", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{className: "checkBoxLeftSpacer"},
						{name: "autouserjob2", kind: "CheckBox"},
						{kind: "Spacer"},
						{name: "autouserjob2label", className: "label"},
					]},
					{name: "autouserjob3Item", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{className: "checkBoxLeftSpacer"},
						{name: "autouserjob3", kind: "CheckBox"},
						{kind: "Spacer"},
						{name: "autouserjob3label", className: "label"},
					]},
					{name: "autouserjob4Item", kind: "Item", className: "enyo-last", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
						{className: "checkBoxLeftSpacer"},
						{name: "autouserjob4", kind: "CheckBox"},
						{kind: "Spacer"},
						{name: "autouserjob4label", className: "label"},
					]},
				]},
				
				{name: "errorMessage", content: "&nbsp;"},
			]},
		
		]},
		
		{name: "footer", kind: "Toolbar", components: [
			{name: "leftBackCommandIcon", kind: "Control", className: "backCommandIcon", onclick: "gotBack"},
			{kind: "Spacer"},
			{name: "saveCommandButton", content: "Save", onclick: "saveClick"},		//rename to create
			{kind: "Spacer"},
			{name: "moreCommandButton", content: "More", onclick: "moreClick"},		//rename parts to override
			{kind: "Spacer"},
			{name: "leftBackCommandIconSpacer", kind: "Control", className: "backCommandIconSpacer"},
		]},
		
		{name: "morePopupMenu", kind: "PopupSelect", className: "morePopupMenu", onBeforeOpen2: "beforeMoreOpen", onSelect: "moreSelect", onClose: "moreClosed", components: [
			//
		]},
								
	],
	
	
	create: function() {
		if(debug) this.log("create");
		this.inherited(arguments);
		
		this.render();
	},
	
	//Externally called functions
	activate: function() {
		if(debug) this.log("activate");
		//this.render();
		
		this.$.allMenu.addClass("selected");
		this.$.typeMenu.removeClass("selected");
		this.$.programMenu.removeClass("selected");
		this.$.programdetailsMenu.removeClass("selected");
		this.$.recordingMenu.removeClass("selected");
		this.$.jobMenu.removeClass("selected");
		
		this.$.typeDrawer.close();
		this.$.programDrawer.close();
		this.$.programdetailsDrawer.close();
		this.$.recordingDrawer.close();
		this.$.jobDrawer.close();
		
		this.$.typeDrawer.toggleOpen();
		this.$.programDrawer.toggleOpen();
			
		this.$.typeDrawer.show();
		this.$.programDrawer.show();
		this.$.programdetailsDrawer.show();
		this.$.recordingDrawer.show();
		this.$.jobDrawer.show();
		
		this.revealTop();
		
		this.$.autouserjob1label.setContent(WebMyth.prefsCookie.UserJobDesc1);
		this.$.autouserjob2label.setContent(WebMyth.prefsCookie.UserJobDesc2);
		this.$.autouserjob3label.setContent(WebMyth.prefsCookie.UserJobDesc3);
		this.$.autouserjob4label.setContent(WebMyth.prefsCookie.UserJobDesc4);
		
		this.ruleTypes.length = 0;
		this.ruleTypes = [
			{caption: $L("Record anytime"), value: 4},
			{caption: $L("Anytime on channel"), value: 3},
			{caption: $L("Find one each week"), value: 10},
			{caption: $L("Find one each day"), value: 9},
			{caption: $L("Find one showing"), value: 6},
			{caption: $L("Timeslot every week"), value: 5},
			{caption: $L("Timeslot every day"), value: 2},
			{caption: $L("Only this showing"), value: 1},
			{caption: $L("No recording rule"), value: 0},
		];
		
		this.getInputs();
		
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
		
		this.ruleTypes.length = 0;
		this.$.type.setItems(this.ruleTypes);
		
		this.ruleObject = {};
		
	},
	resize: function(inViewMode) {
		if(debug) this.log("resize: "+inViewMode);
		
		this.viewMode = inViewMode;
		
		if(this.viewMode == "tablet") {
			this.$.setupscheduleMenu.render();
			this.$.setupscheduleMenu.show();
		} else {
			this.$.setupscheduleMenu.hide();
		}
		
	},
	gotBack: function() {
		if(debug) this.log("gotBack");
		
		this.doGetPreviousPane();
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
	externalProgram: function(inProgram, inViewMode) {
		if(debug) this.log("externalProgram: "+enyo.json.stringify(inProgram));
		
		this.viewMode = inViewMode;
		
		this.detailsProgram = inProgram;
		
	},
	
	
	//internal functions
	revealTop: function() {
		if(debug) this.log("revealTop");
		
		this.$.setupscheduleScroller.scrollIntoView(0,0);
		
	},
	saveClick: function(inSender, inEvent) {
		if(debug) this.log("saveClick");
		
		this.newRule = this.buildRule();
		
		if(this.newRule.type == 0) {
		
			this.bannerMessage("You must select a rule type to create a new recording rule.");
			
		} else if(this.newRule.recordid){
			//we are updating an existing rule
				
			this.$.savingPopup.openAtCenter();
			this.$.savingSpinnerLarge.show();
			
			this.schedulerRule = this.newRule.recordid;
			
			var query = 'UPDATE `record` SET `type` = "'+this.newRule.type+'", `title` = "'+this.newRule.title+'", `subtitle` = "'+this.newRule.subtitle;
			query += '", startdate = "'+this.newRule.startdate+'", starttime = "'+this.newRule.starttime+'", station = "'+this.newRule.station;
			query += '", description = "'+this.newRule.description+'", category = "'+this.newRule.category+'", seriesid = "'+this.newRule.seriesid;
			query += '", programid = "'+this.newRule.programid+'", chanid = "'+this.newRule.chanid+'", endtime = "'+this.newRule.endtime;
			query += '", enddate = "'+this.newRule.enddate+'", profile = "'+this.newRule.profile+'", transcoder = "'+this.newRule.transcoder;
			query += '", recgroup = "'+this.newRule.recgroup+'", storagegroup = "'+this.newRule.storagegroup+'", playgroup = "'+this.newRule.playgroup;
			query += '", recpriority = "'+this.newRule.recpriority+'", dupmethod = "'+this.newRule.dupmethod;
			query += '", dupin = "'+this.newRule.dupin+'", prefinput = "'+this.newRule.prefinput+'", inactive = "'+this.newRule.inactive;
			query += '", autoexpire = "'+this.newRule.autoexpire+'", maxnewest = "'+this.newRule.maxnewest+'", maxepisodes = "'+this.newRule.maxepisodes;
			query += '", startoffset = "'+this.newRule.startoffset+'", endoffset = "'+this.newRule.endoffset+'", autocommflag = "'+this.newRule.autocommflag;
			query += '", autotranscode = "'+this.newRule.autotranscode+'", autouserjob1 = "'+this.newRule.autouserjob1+'", autouserjob2 = "'+this.newRule.autouserjob2;
			query += '", autouserjob3 = "'+this.newRule.autouserjob3+'", autouserjob4 = "'+this.newRule.autouserjob4;
			query += '" WHERE `recordid` = '+this.newRule.recordid+' LIMIT 1;';
			
			if(debug) this.log("update query is "+query);
			
			if(WebMyth.useScript) {
			
				var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
				requestUrl += "?op=executeSQL";				
				requestUrl += "&query64=";		
				requestUrl += Base64.encode(query);
				
				if(debug) this.log("requestUrl: "+requestUrl);
			
				this.$.saveRuleService.setUrl(requestUrl);
				this.$.saveRuleService.call();
			
			} else {
			
				this.doMysqlPluginExecute("mysqlSetupscheduleSaveRule", query);
			
			}
	
		} else{
			//we are creating a new rule
				
			this.$.savingPopup.openAtCenter();
			this.$.savingSpinnerLarge.show();
			
			this.schedulerRule = -1;
			
			var query = 'INSERT INTO `record` SET `type` = "'+this.newRule.type+'", `title` = "'+this.newRule.title+'", `subtitle` = "'+this.newRule.subtitle;
			query += '", startdate = "'+this.newRule.startdate+'", starttime = "'+this.newRule.starttime+'", station = "'+this.newRule.station;
			query += '", description = "'+this.newRule.description+'", category = "'+this.newRule.category+'", seriesid = "'+this.newRule.seriesid;
			query += '", programid = "'+this.newRule.programid+'", chanid = "'+this.newRule.chanid+'", endtime = "'+this.newRule.endtime;
			query += '", enddate = "'+this.newRule.enddate+'", profile = "'+this.newRule.profile+'", transcoder = "'+this.newRule.transcoder;
			query += '", recgroup = "'+this.newRule.recgroup+'", storagegroup = "'+this.newRule.storagegroup+'", playgroup = "'+this.newRule.playgroup;
			query += '", recpriority = "'+this.newRule.recpriority+'", dupmethod = "'+this.newRule.dupmethod;
			query += '", dupin = "'+this.newRule.dupin+'", prefinput = "'+this.newRule.prefinput+'", inactive = "'+this.newRule.inactive;
			query += '", autoexpire = "'+this.newRule.autoexpire+'", maxnewest = "'+this.newRule.maxnewest+'", maxepisodes = "'+this.newRule.maxepisodes;
			query += '", startoffset = "'+this.newRule.startoffset+'", endoffset = "'+this.newRule.endoffset+'", autocommflag = "'+this.newRule.autocommflag;
			query += '", autotranscode = "'+this.newRule.autotranscode+'", autouserjob1 = "'+this.newRule.autouserjob1+'", autouserjob2 = "'+this.newRule.autouserjob2;
			query += '", autouserjob3 = "'+this.newRule.autouserjob3+'", autouserjob4 = "'+this.newRule.autouserjob4;
			query += '", findtime = "'+this.newRule.starttime+'", findday = "'+this.newRule.findday+'", findid = "'+this.newRule.findid;
			query += '" ;';
	
			
			if(debug) this.log("create query is "+query);
			
			if(WebMyth.useScript) {
			
				var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
				requestUrl += "?op=executeSQL";				
				requestUrl += "&query64=";		
				requestUrl += Base64.encode(query);
				
				if(debug) this.log("requestUrl: "+requestUrl);
			
				this.$.saveRuleService.setUrl(requestUrl);
				this.$.saveRuleService.call();
			
			} else {
			
				this.doMysqlPluginExecute("mysqlSetupscheduleSaveRule", query);
			
			}
		
		}
		
	},
	moreClick: function(inSender, inEvent) {
		if(debug) this.log("moreClick");
		
		this.$.morePopupMenu.setItems([
			{caption: $L("Web"), components: [
				{name: "MythWeb", caption: "MythWeb"},
				{name: "Wikipedia", caption: "Wikipedia"},
				{name: "themoviedb", caption: "themoviedb"},
				{name: "IMDB", caption: "IMDB"},
				{name: "TheTVDB", caption: "TheTVDB"},
				{name: "TV.com", caption: "TV.com"},
				{name: "Google", caption: "Google"},
			]},
			{caption: $L("Guide"), components: [
				{caption: $L("Time")},
				{caption: $L("Title Search")},
			]},
			{name: "forceRecord", showing: this.showForceRecordButton, caption: "Force record"},
			{name: "forceDontRecord", showing: this.showForceDontRecordButton, caption: "Force don't record"},
			{name: "neverRecord", showing: this.showNeverRecordButton, caption: "Never record"},
			{name: "forgetOld", showing: this.showForgetOldButton, caption: "Forget old"},
			{name: "deleteScheduleWrapper", showing: this.showDeleteScheduleButton, caption: this.deleteWrapperText, components: [
				{name: "deleteSchedule", caption: this.deleteText},
			]},
		]);
								
		this.$.morePopupMenu.openAroundControl(this.$.moreCommandButton);
	},
	moreSelect: function(inSender, inEvent) {
		if(inEvent) {
			if(debug) this.log("moreSelect: "+inEvent.value);
			
			switch(inEvent.value) {
				case "Wikipedia":
					this.doOpenWeb("Wikipedia", this.detailsProgram.title);
					break;
				case "themoviedb":
					this.doOpenWeb("themoviedb", this.detailsProgram.title);
					break;
				case "IMDB":
					this.doOpenWeb("IMDBtitle", this.detailsProgram.title);
					break;
				case "TheTVDB":
					this.doOpenWeb("TheTVDB", this.detailsProgram.title);
					break;
				case "TV.com":
					this.doOpenWeb("TV.com", this.detailsProgram.title);
					break;
				case "Google":
					this.doOpenWeb("Google", this.detailsProgram.title);
					break;
				case "MythWeb":
					var dateJS = new Date(isoToJS(this.detailsProgram.starttime.replace(" ","T")));
					var dateUTC = dateJS.getTime()/1000;
					this.doOpenWeb("MythWeb", "/"+this.detailsProgram.chanid+"/"+dateUTC);
					break;
				case "Time":
					this.doProgramGuide(this.detailsProgram.starttime);
					break;
				case "Title Search":
					this.doTitleSearch(this.detailsProgram.title);
					break;
				case "Force record": 
					this.forceRecordClick();
					break;
				case "Force don't record": 
					this.forceDontRecordClick();
					break;
				case "Never record": 
					this.neverRecordClick();
					break;
				case "Forget old": 
					this.forgetOldClick();
					break;
				case "Confirm delete": 
					this.deleteScheduleClick();
					break;
					
			}
			
		}
	},
	moreClosed: function(inSender) {
		if(debug) this.log("moreClosed");
		
	},
	guideTime: function(inSender) {
		if(debug) this.log("guideTime");
		
		this.doProgramGuide(this.detailsProgram.starttime);
	},
	titleSearch: function(inSender) {
		if(debug) this.log("titleSearch");
		
		this.doTitleSearch(this.detailsProgram.title);
	},
	forceRecordClick: function() {
		if(debug) this.log("forceRecordClick");
		
		this.newRule = this.buildRule();
		
		if(this.ruleObject.type == 8) {
			//is force don't record - so toggle
			
			this.newRule.type = 7;
			this.toggleOverride();
			
		} else {
		
			this.$.savingPopup.openAtCenter();
			this.$.savingSpinnerLarge.show();
			
			this.newRule.type = 7;
			
			this.schedulerRule = -1;
			//this.schedulerRule = this.newRule.recordid;
			
			var query = 'INSERT INTO `record` SET `type` = "'+this.newRule.type+'", `title` = "'+this.newRule.title+'", `subtitle` = "'+this.newRule.subtitle;
			query += '", startdate = "'+this.newRule.startdate+'", starttime = "'+this.newRule.starttime+'", station = "'+this.newRule.station;
			query += '", description = "'+this.newRule.description+'", category = "'+this.newRule.category+'", seriesid = "'+this.newRule.seriesid;
			query += '", programid = "'+this.newRule.programid+'", chanid = "'+this.newRule.chanid+'", endtime = "'+this.newRule.endtime;
			query += '", enddate = "'+this.newRule.enddate+'", profile = "'+this.newRule.profile+'", transcoder = "'+this.newRule.transcoder;
			query += '", recgroup = "'+this.newRule.recgroup+'", storagegroup = "'+this.newRule.storagegroup+'", playgroup = "'+this.newRule.playgroup;
			query += '", recpriority = "'+this.newRule.recpriority+'", dupmethod = "'+this.newRule.dupmethod;
			query += '", dupin = "'+this.newRule.dupin+'", prefinput = "'+this.newRule.prefinput+'", inactive = "'+this.newRule.inactive;
			query += '", autoexpire = "'+this.newRule.autoexpire+'", maxnewest = "'+this.newRule.maxnewest+'", maxepisodes = "'+this.newRule.maxepisodes;
			query += '", startoffset = "'+this.newRule.startoffset+'", endoffset = "'+this.newRule.endoffset+'", autocommflag = "'+this.newRule.autocommflag;
			query += '", autotranscode = "'+this.newRule.autotranscode+'", autouserjob1 = "'+this.newRule.autouserjob1+'", autouserjob2 = "'+this.newRule.autouserjob2;
			query += '", autouserjob3 = "'+this.newRule.autouserjob3+'", autouserjob4 = "'+this.newRule.autouserjob4;
			query += '", findtime = "'+this.newRule.starttime+'", findday = "'+this.newRule.findday+'", findid = "'+this.newRule.findid;
			query += '", last_record = "'+this.newRule.last_record+'", last_delete = "'+this.newRule.last_delete;
			query += '" ;';
	
			
			if(debug) this.log("forceRecord query is "+query);
			
			if(WebMyth.useScript) {
			
				var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
				requestUrl += "?op=executeSQL";				
				requestUrl += "&query64=";		
				requestUrl += Base64.encode(query);
				
				if(debug) this.log("requestUrl: "+requestUrl);
			
				this.$.saveRuleService.setUrl(requestUrl);
				this.$.saveRuleService.call();
			
			} else {
			
				this.doMysqlPluginExecute("mysqlSetupscheduleSaveRule", query);
			
			}
		}
		
	},
	forceDontRecordClick: function() {
		if(debug) this.log("forceDontRecordClick");
		
		this.newRule = this.buildRule();
		
		if(this.ruleObject.type == 7) {
			//is force record - so toggle
			
			this.newRule.type = 8;
			this.toggleOverride();
			
		} else {
		
			this.$.savingPopup.openAtCenter();
			this.$.savingSpinnerLarge.show();
			
			this.newRule.type = 8;
			
			this.schedulerRule = -1;
			//this.schedulerRule = this.newRule.recordid;
			
			var query = 'INSERT INTO `record` SET `type` = "'+this.newRule.type+'", `title` = "'+this.newRule.title+'", `subtitle` = "'+this.newRule.subtitle;
			query += '", startdate = "'+this.newRule.startdate+'", starttime = "'+this.newRule.starttime+'", station = "'+this.newRule.station;
			query += '", description = "'+this.newRule.description+'", category = "'+this.newRule.category+'", seriesid = "'+this.newRule.seriesid;
			query += '", programid = "'+this.newRule.programid+'", chanid = "'+this.newRule.chanid+'", endtime = "'+this.newRule.endtime;
			query += '", enddate = "'+this.newRule.enddate+'", profile = "'+this.newRule.profile+'", transcoder = "'+this.newRule.transcoder;
			query += '", recgroup = "'+this.newRule.recgroup+'", storagegroup = "'+this.newRule.storagegroup+'", playgroup = "'+this.newRule.playgroup;
			query += '", recpriority = "'+this.newRule.recpriority+'", dupmethod = "'+this.newRule.dupmethod;
			query += '", dupin = "'+this.newRule.dupin+'", prefinput = "'+this.newRule.prefinput+'", inactive = "'+this.newRule.inactive;
			query += '", autoexpire = "'+this.newRule.autoexpire+'", maxnewest = "'+this.newRule.maxnewest+'", maxepisodes = "'+this.newRule.maxepisodes;
			query += '", startoffset = "'+this.newRule.startoffset+'", endoffset = "'+this.newRule.endoffset+'", autocommflag = "'+this.newRule.autocommflag;
			query += '", autotranscode = "'+this.newRule.autotranscode+'", autouserjob1 = "'+this.newRule.autouserjob1+'", autouserjob2 = "'+this.newRule.autouserjob2;
			query += '", autouserjob3 = "'+this.newRule.autouserjob3+'", autouserjob4 = "'+this.newRule.autouserjob4;
			query += '", findtime = "'+this.newRule.starttime+'", findday = "'+this.newRule.findday+'", findid = "'+this.newRule.findid;
			query += '", last_record = "'+this.newRule.last_record+'", last_delete = "'+this.newRule.last_delete;
			query += '" ;';
	
			
			if(debug) this.log("forceDontRecord query is "+query);
			
			if(WebMyth.useScript) {
			
				var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
				requestUrl += "?op=executeSQL";				
				requestUrl += "&query64=";		
				requestUrl += Base64.encode(query);
				
				if(debug) this.log("requestUrl: "+requestUrl);
			
				this.$.saveRuleService.setUrl(requestUrl);
				this.$.saveRuleService.call();
			
			} else {
			
				this.doMysqlPluginExecute("mysqlSetupscheduleSaveRule", query);
			
			}
		}
		
	},
	toggleOverride: function() {
		if(debug) this.log("toggleOverride");
		
		this.$.savingPopup.openAtCenter();
		this.$.savingSpinnerLarge.show();
		
		this.schedulerRule = -1;
		
		var query = 'UPDATE `record` SET `type` = "'+this.newRule.type+'", `title` = "'+this.newRule.title+'", `subtitle` = "'+this.newRule.subtitle;
		query += '", startdate = "'+this.newRule.startdate+'", starttime = "'+this.newRule.starttime+'", station = "'+this.newRule.station;
		query += '", description = "'+this.newRule.description+'", category = "'+this.newRule.category+'", seriesid = "'+this.newRule.seriesid;
		query += '", programid = "'+this.newRule.programid+'", chanid = "'+this.newRule.chanid+'", endtime = "'+this.newRule.endtime;
		query += '", enddate = "'+this.newRule.enddate+'", profile = "'+this.newRule.profile+'", transcoder = "'+this.newRule.transcoder;
		query += '", recgroup = "'+this.newRule.recgroup+'", storagegroup = "'+this.newRule.storagegroup+'", playgroup = "'+this.newRule.playgroup;
		query += '", recpriority = "'+this.newRule.recpriority+'", dupmethod = "'+this.newRule.dupmethod;
		query += '", dupin = "'+this.newRule.dupin+'", prefinput = "'+this.newRule.prefinput+'", inactive = "'+this.newRule.inactive;
		query += '", autoexpire = "'+this.newRule.autoexpire+'", maxnewest = "'+this.newRule.maxnewest+'", maxepisodes = "'+this.newRule.maxepisodes;
		query += '", startoffset = "'+this.newRule.startoffset+'", endoffset = "'+this.newRule.endoffset+'", autocommflag = "'+this.newRule.autocommflag;
		query += '", autotranscode = "'+this.newRule.autotranscode+'", autouserjob1 = "'+this.newRule.autouserjob1+'", autouserjob2 = "'+this.newRule.autouserjob2;
		query += '", autouserjob3 = "'+this.newRule.autouserjob3+'", autouserjob4 = "'+this.newRule.autouserjob4;
		query += '" WHERE `recordid` = '+this.newRule.recordid+' LIMIT 1;';
		
		if(debug) this.log("toggleOverride query is "+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQL";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.saveRuleService.setUrl(requestUrl);
			this.$.saveRuleService.call();
		
		} else {
			
			this.doMysqlPluginExecute("mysqlSetupscheduleSaveRule", query);
			
		}
		
	},
	neverRecordClick: function() {
		if(debug) this.log("neverRecordClick");
		
		this.newRule = this.buildRule();
		
		this.$.savingPopup.openAtCenter();
		this.$.savingSpinnerLarge.show();
		
		this.schedulerRule = this.newRule.recordid;
		
		var query = 'REPLACE INTO oldrecorded (chanid,starttime,endtime,title,';
		query += 'subtitle,description,category,seriesid,programid,';
		query += 'recordid,station,rectype,recstatus,duplicate) VALUES ("';
		query += this.newRule.chanid+'","'+this.newRule.starttime+'","'+this.newRule.endtime+'","'+this.newRule.title+'","';
		query += this.newRule.subtitle+'","'+this.newRule.description+'","'+this.newRule.category+'","'+this.newRule.seriesid+'","'+this.newRule.programid+'","';
		query += this.newRule.recordid+'","'+this.newRule.station+'","'+this.newRule.type+'",11,1);';
	
		if(debug) this.log("neverrecord query is "+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQL";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.saveRuleService.setUrl(requestUrl);
			this.$.saveRuleService.call();
		
		} else {
			
			this.doMysqlPluginExecute("mysqlSetupscheduleSaveRule", query);
			
		}
		
	},
	forgetOldClick: function() {
		if(debug) this.log("forgetOldClick");
		
		this.newRule = this.buildRule();
		
		this.$.savingPopup.openAtCenter();
		this.$.savingSpinnerLarge.show();
		
		this.schedulerRule = this.newRule.recordid;
		
		var query = 'DELETE FROM `oldrecorded` WHERE ';
		query += '`title` = "'+this.newRule.title;
		query += '" AND `subtitle` = "'+this.newRule.subtitle;
		query += '" AND `description` = "'+this.newRule.description;
		query += '"';
	
		if(debug) this.log("forgetOld query is "+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQL";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.saveRuleService.setUrl(requestUrl);
			this.$.saveRuleService.call();
		
		} else {
			
			this.doMysqlPluginExecute("mysqlSetupscheduleSaveRule", query);
			
		}
		
	},
	deleteScheduleClick: function() {
		if(debug) this.log("deleteScheduleClick");
		
		this.newRule = this.buildRule();
		
		this.$.savingPopup.openAtCenter();
		this.$.savingSpinnerLarge.show();
		
		//this.schedulerRule = -1;
		this.schedulerRule = this.newRule.recordid;
		
		var query = "DELETE FROM `record` ";
		query += " WHERE `recordid` = "+this.newRule.recordid+" LIMIT 1;";
		
		if(debug) this.log("delete query is "+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQL";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.saveRuleService.setUrl(requestUrl);
			this.$.saveRuleService.call();
		
		} else {
			
			this.doMysqlPluginExecute("mysqlSetupscheduleSaveRule", query);
			
		}
		
	},
	
	
	//setupschedule
	selectMenuButton: function(inSender) {
		if(debug) this.log("selectMenuButton with "+inSender.getName());
		
		var newMode = inSender.getName().substring(0,inSender.getName().length-4);
		
		this.$.typeDrawer.close();
		this.$.programDrawer.close();
		this.$.programdetailsDrawer.close();
		this.$.recordingDrawer.close();
		this.$.jobDrawer.close();
		
		this.$.typeDrawer.toggleOpen();
		this.$.programDrawer.toggleOpen();
		
		this.$.allMenu.removeClass("selected");
		this.$.typeMenu.removeClass("selected");
		this.$.programMenu.removeClass("selected");
		this.$.programdetailsMenu.removeClass("selected");
		this.$.recordingMenu.removeClass("selected");
		this.$.jobMenu.removeClass("selected");
		
		if(newMode == "all") {
		
			this.$.allMenu.addClass("selected");
			
			this.$.typeDrawer.show();
			this.$.programDrawer.show();
			this.$.programdetailsDrawer.show();
			this.$.recordingDrawer.show();
			this.$.jobDrawer.show();
			
		} else {
		
			this.$.typeDrawer.hide();
			this.$.programDrawer.hide();
			this.$.programdetailsDrawer.hide();
			this.$.recordingDrawer.hide();
			this.$.jobDrawer.hide();
			
			switch(newMode) {
				case "type":
					this.$.typeMenu.addClass("selected");
					
					//this.$.typeDrawer.toggleOpen();
					this.$.typeDrawer.show();
					break;
				case "program":
					this.$.programMenu.addClass("selected");
					
					//this.$.programDrawer.toggleOpen();
					this.$.programDrawer.show();
					break;
				case "programdetails":
					this.$.programdetailsMenu.addClass("selected");
					
					this.$.programdetailsDrawer.toggleOpen();
					this.$.programdetailsDrawer.show();
					break;
				case "recording":
					this.$.recordingMenu.addClass("selected");
					
					this.$.recordingDrawer.toggleOpen();
					this.$.recordingDrawer.show();
					break;
				case "job":
					this.$.jobMenu.addClass("selected");
					
					this.$.jobDrawer.toggleOpen();
					this.$.jobDrawer.show();
					break;
			}	
		} 
		
		this.revealTop();
		
		if(debug) this.log("finished changing to "+newMode);
	},
	getInputs: function() {
		if(debug) this.log("getInputs");
		
		this.$.loadingPopup.openAtCenter();
		this.$.loadingSpinnerLarge.show();
		
		var query = "SELECT cardinputid AS value, displayname AS caption FROM cardinput ORDER BY value;";
		
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
			
			this.doMysqlPluginCommand("mysqlSetupscheduleGetInputs", query);
			
		}
		
	},
	getInputsResponse: function(inSender, inResponse) {
		if(debug) this.log("getInputsResponse: "+enyo.json.stringify(inResponse));
		
		this.inputs = cleanInputs(inResponse);
		
		this.$.prefinput.setItems(this.inputs);
		
		if(debug) this.log("this.inputs: "+enyo.json.stringify(this.inputs));
		
		this.finishedLoadingInputs();
		
	},
	getInputsFailure: function(inSender, inResponse) {
		this.error("getInputsFailure");
		
		this.inputs = cleanInputs([]);
		
		this.$.prefinput.setItems(this.inputs);
		
		this.$.errorMessage.setContent("Error getting inputs");
		
		this.finishedLoadingInputs();
		
	},
	finishedLoadingInputs: function() {
		if(debug) this.log("finishedLoadingInputs");
		
		this.$.title.setContent(this.detailsProgram.title);
		this.$.subtitle.setContent(this.detailsProgram.subtitle);
		this.$.starttime.setContent(this.detailsProgram.starttime.replace("T"," "));
		this.$.recstatustext.setContent(recstatusDecode(this.detailsProgram.recstatus));
		this.$.channame.setContent(this.detailsProgram.channame);
		
		this.$.description.setContent(this.detailsProgram.description);
		this.$.category.setContent(this.detailsProgram.category);
		this.$.seriesid.setContent(this.detailsProgram.seriesid);
		this.$.programid.setContent(this.detailsProgram.programid);
		this.$.endtime.setContent(this.detailsProgram.endtime.replace("T"," "));
		this.$.chanid.setContent(this.detailsProgram.chanid);
		
		if(this.detailsProgram.recordid) {
			this.getRule();
		} else {
			this.showDefaults();
		}
	
		this.$.loadingPopup.close();
		enyo.scrim.hide();
	
	},
	getRule: function() {
		if(debug) this.log("getRule");
		
		var query = "SELECT * FROM record WHERE recordid="+this.detailsProgram.recordid+" LIMIT 1; ";
	
		if(debug) this.log("recordid SQL query is "+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQLwithResponse";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.getRuleService.setUrl(requestUrl);
			this.$.getRuleService.call();
		
		} else {
			
			this.doMysqlPluginCommand("mysqlSetupscheduleGetRule", query);
			
		}
		
	},
	getRuleResponse: function(inSender, inResponse) {
		if(debug) this.log("getRuleResponse: "+enyo.json.stringify(inResponse));
		
		if((inResponse == " ]\n")||(inResponse.length == 0)) {
		
			this.getRuleFailure();
			return;
			
		} else {
			
			this.ruleObject = inResponse[0];
			
			if((this.ruleObject.type == 7)|(this.ruleObject.type == 8)) {
				//is an override rule
				this.ruleTypes.length = 0;
				this.ruleTypes.push({caption: $L("Force  record"), value: 7});
				this.ruleTypes.push({caption: $L("Force don't record"), value: 8});
				this.$.type.setDisabled(true);
			} else {
				this.ruleTypes.splice(8,1);
				this.$.type.setDisabled(false);
			}
			
			this.$.type.setItems(this.ruleTypes);
			
			this.$.type.setValue(this.ruleObject.type);
			
			this.$.recpriority.setValue(this.ruleObject.recpriority);
			this.$.prefinput.setValue(this.ruleObject.prefinput);
			this.$.inactive.setChecked(intToBool(this.ruleObject.inactive));
			this.$.autoexpire.setChecked(intToBool(this.ruleObject.autoexpire));
			this.$.maxnewest.setChecked(intToBool(this.ruleObject.maxnewest));
			this.$.maxepisodes.setValue(this.ruleObject.maxepisodes);
			
			this.$.startoffset.setValue(this.ruleObject.startoffset);
			this.$.endoffset.setValue(this.ruleObject.endoffset);
			
			this.$.autocommflag.setChecked(intToBool(this.ruleObject.autocommflag));
			this.$.autotranscode.setChecked(intToBool(this.ruleObject.autotranscode));
			this.$.autouserjob1.setChecked(intToBool(this.ruleObject.autouserjob1));
			this.$.autouserjob2.setChecked(intToBool(this.ruleObject.autouserjob2));
			this.$.autouserjob3.setChecked(intToBool(this.ruleObject.autouserjob3));
			this.$.autouserjob4.setChecked(intToBool(this.ruleObject.autouserjob4));
			
			this.$.saveCommandButton.setCaption("Save");
			this.$.moreCommandButton.setCaption("More");
			
			//check for overrides - this.recordRule.type == 7)||(this.recordRule.type == 8)
			switch(this.ruleObject.type) {
				case 7:
					//force record
					this.showForceRecordButton = false;
					this.showForceDontRecordButton = true;
					this.deleteWrapperText = "Schedule normally";
					this.deleteText = "Confirm delete";
					break;
				case "7":
					//force record
					this.showForceRecordButton = false;
					this.showForceDontRecordButton = true;
					this.deleteWrapperText = "Schedule normally";
					this.deleteText = "Confirm delete";
					break;
				case 8:
					//force dont record
					this.showForceRecordButton = true;
					this.showForceDontRecordButton = false;
					this.deleteWrapperText = "Schedule normally";
					this.deleteText = "Confirm delete";
					break;
				case "8":
					//force dont record
					this.showForceRecordButton = true;
					this.showForceDontRecordButton = false;
					this.deleteWrapperText = "Schedule normally";
					this.deleteText = "Confirm delete";
					break;
				case -3:
					//recorded
					this.showForceRecordButton = false;
					this.showForceDontRecordButton = false;
					this.deleteWrapperText = "Delete rule";
					this.deleteText = "Confirm delete";
					break;
				case "-3":
					//recorded
					this.showForceRecordButton = false;
					this.showForceDontRecordButton = false;
					this.deleteWrapperText = "Delete rule";
					this.deleteText = "Confirm delete";
					break;
				default:
					this.showForceRecordButton = true;
					this.showForceDontRecordButton = true;
					this.deleteWrapperText = "Delete rule";
					this.deleteText = "Confirm delete";
					break;
			}
			
			switch(this.detailsProgram.recstatus) {
				case 11:
					//never record
					this.showForgetOldButton = true;
					this.showNeverRecordButton = false;
					break;
				case "11":
					this.showForgetOldButton = true;
					this.showNeverRecordButton = false;
					break;
				case 2:
					//previously recorded
					this.showForgetOldButton = true;
					this.showNeverRecordButton = false;
					break;
				case "2":
					this.showForgetOldButton = true;
					this.showNeverRecordButton = false;
					break;
				default: 
					this.showForgetOldButton = false;
					this.showNeverRecordButton = true;
			}
				
			this.showDeleteScheduleButton = true
			
			this.$.morePopupMenu.render();
			
			this.$.footer.render();
			
			this.$.loadingPopup.close();
			enyo.scrim.hide();
			
		}
		
	},
	getRuleFailure: function(inSender, inResponse) {
		this.error("getRuleFailure");
		
		this.bannerMessage("Failed to get recording rule information, just using defaults.");
		
		this.showDefaults();
	},
	showDefaults: function() {
		if(debug) this.log("showDefaults");
		
		this.ruleObject = defaultRuleObject;
		
		this.$.type.setItems(this.ruleTypes);
		this.$.type.setDisabled(false);
		
		this.$.type.setValue(0);
		
		this.$.recpriority.setValue(this.ruleObject.recpriority);
		this.$.prefinput.setValue(this.ruleObject.prefinput);
		this.$.inactive.setChecked(intToBool(this.ruleObject.inactive));
		this.$.autoexpire.setChecked(intToBool(this.ruleObject.autoexpire));
		this.$.maxnewest.setChecked(intToBool(this.ruleObject.maxnewest));
		this.$.maxepisodes.setValue(this.ruleObject.maxepisodes);
		
		this.$.startoffset.setValue(WebMyth.prefsCookie.DefaultStartOffset);
		this.$.endoffset.setValue(WebMyth.prefsCookie.DefaultEndOffset);
		
		this.$.autocommflag.setChecked(intToBool(WebMyth.prefsCookie.AutoCommercialFlag));
		this.$.autotranscode.setChecked(intToBool(WebMyth.prefsCookie.AutoTranscode));
		this.$.autouserjob1.setChecked(intToBool(WebMyth.prefsCookie.AutoRunUserJob1));
		this.$.autouserjob2.setChecked(intToBool(WebMyth.prefsCookie.AutoRunUserJob2));
		this.$.autouserjob3.setChecked(intToBool(WebMyth.prefsCookie.AutoRunUserJob3));
		this.$.autouserjob4.setChecked(intToBool(WebMyth.prefsCookie.AutoRunUserJob4));
		
		this.$.saveCommandButton.setCaption("Create");
		this.$.moreCommandButton.setCaption("More");
		
		this.showForceRecordButton = false;
		this.showForceDontRecordButton = false;
		this.showNeverRecordButton = false;
		this.showForgetOldButton = false;
		this.showDeleteScheduleButton = false
		this.$.morePopupMenu.render();
		
		this.$.loadingPopup.close();
		enyo.scrim.hide();
		
	},
	buildRule: function() {
		if(debug) this.log("buildRule: "+this.detailsProgram.starttime.substring(0,10)+"T00:00:00");
		
		var myDate = new Date(isoToJS(this.detailsProgram.starttime.substring(0,10)+"T00:00:00"));
		
		var newRule = {};
		
		newRule.recordid = this.ruleObject.recordid;
		newRule.type = this.$.type.getValue();
		newRule.chanid = this.detailsProgram.chanid;
		newRule.starttime = this.detailsProgram.starttime.substring(11,19);		//HH:MM:SS
		newRule.startdate = this.detailsProgram.starttime.substring(0,10);		//YYYY-MM-DD
		
		newRule.endtime = this.detailsProgram.endtime.substring(11,19);
		newRule.enddate = this.detailsProgram.endtime.substring(0,10);
		newRule.title = this.detailsProgram.title;
		newRule.subtitle = this.detailsProgram.subtitle;
		newRule.description = this.detailsProgram.description;
		
		newRule.category = this.detailsProgram.category;
		newRule.profile = this.ruleObject.profile;
		newRule.recpriority = this.$.recpriority.getValue();
		newRule.autoexpire = boolToInt(this.$.autoexpire.getChecked());
		newRule.maxepisodes = this.$.maxepisodes.getValue();
		
		newRule.maxnewest = boolToInt(this.$.maxnewest.getChecked());
		newRule.startoffset = this.$.startoffset.getValue();
		newRule.endoffset = this.$.endoffset.getValue();
		newRule.recgroup = this.ruleObject.recgroup;
		newRule.dupmethod = this.ruleObject.dupmethod;
		
		newRule.dupin = this.ruleObject.dupin;
		newRule.station = this.detailsProgram.callsign;
		newRule.seriesid = this.detailsProgram.seriesid;
		newRule.programid = this.detailsProgram.programid;
		newRule.search = this.ruleObject.search;
		
		newRule.autotranscode = boolToInt(this.$.autotranscode.getChecked());
		newRule.autocommflag = boolToInt(this.$.autocommflag.getChecked());
		newRule.autouserjob1 = boolToInt(this.$.autouserjob1.getChecked());
		newRule.autouserjob2 = boolToInt(this.$.autouserjob2.getChecked());
		newRule.autouserjob3 = boolToInt(this.$.autouserjob3.getChecked());
		
		newRule.autouserjob4 = boolToInt(this.$.autouserjob4.getChecked());
		newRule.findday = dateDayAdjust(myDate.getDay()+1);						//only use next 3 if override rule
		if(newRule.findday > 6) newRule.findday = newRule.findday - 7;
		newRule.findtime = this.detailsProgram.starttime.substring(11,19);
		//newRule.findid = parseInt(myDate.getTime()/86400000+719464);			//(UNIX_TIMESTAMP(program.starttime)/60/60/24)+719528 - off by 74?
		//newRule.findid = parseInt(parseInt(myDate.getTime()/86400000)+719495);			//(UNIX_TIMESTAMP(program.starttime)/60/60/24)+719528 - off by 43?
		newRule.findid = parseInt(parseInt(myDate.getTime()/86400000)+719090);			//(UNIX_TIMESTAMP(program.starttime)/60/60/24)+719528 - off by 438?
		newRule.inactive = boolToInt(this.$.inactive.getChecked());
		
		//734641 app, 734236 mythweb = 405
		
		newRule.parentid = this.ruleObject.parentid;
		newRule.transcoder = this.ruleObject.transcoder;
		newRule.playgroup = this.ruleObject.playgroup;
		newRule.prefinput = this.$.prefinput.getValue();
		//newRule.next_record = this.detailsProgram.chanid;					//leave blank, scheduler will fill in
		
		newRule.last_record = this.ruleObject.last_record;
		newRule.last_delete = this.ruleObject.last_delete;				
		newRule.storagegroup = this.ruleObject.storagegroup;
		newRule.avg_delay = this.ruleObject.avg_delay;
		
		if(debug) this.log("newRule is: "+enyo.json.stringify(newRule));
		
		return newRule;
	
	},
	saveRuleResponse: function(inSender, inResponse, inInsertId) {
		if(debug) this.log("saveRuleResponse: "+inResponse+"  "+inInsertId);
		
		if(inResponse.indexOf("Finished running SQL with insert_id") >= 0) {
			if(debug) this.log("insert_id: "+parseInt(inResponse.substring(37)));
			if(parseInt(inResponse.substring(37)) > 0) this.schedulerRule = parseInt(inResponse.substring(37));
		} else if(inInsertId) {
			if(debug) this.log("inInsertId: "+parseInt(inInsertId));
			if(parseInt(inInsertId) > 0) this.schedulerRule = parseInt(inInsertId);
		} else {
			if(debug) this.log("Did not get inInsertId or insert_id");
		}
		
		if(WebMyth.useScript) {
			
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=reschedule";				
			requestUrl += "&recordId=";		
			requestUrl += this.schedulerRule;	
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.rescheduleService.setUrl(requestUrl);
			this.$.rescheduleService.call();
		
		} else {
		
			this.doMythprotocolPluginCommand("setupschedule","rescheduleResponse", "RESCHEDULE_RECORDINGS "+this.schedulerRule);
			
		}
		
	},
	saveRuleFailure: function(inSender, inResponse) {
		this.error("saveRuleFailure");
		
		this.$.savingPopup.close();
		enyo.scrim.hide();
		
		this.bannerMessage("Failed to save rule.  Try MythWeb.");
		
	},	
	rescheduleResponse: function(inSender, inResponse) {
		if(debug) this.log("rescheduleResponse: "+inResponse);
		
		var countdown = setTimeout(enyo.bind(this, "finshedReschedule"), 4000);
		
	},
	rescheduleFailure: function(inSender, inResponse) {
		this.error("rescheduleFailure");
		
		this.$.savingPopup.close();
		enyo.scrim.hide();
		
		this.bannerMessage("Failed to trigger a reschedule.  Try MythWeb");
		
	},
	finshedReschedule: function() {
		if(debug) this.log("finishedReschedule");
		
		this.$.savingPopup.close();
		enyo.scrim.hide();
		
		this.gotBack();
	},
	
});



var defaultRuleObject = {
	recpriority: 0, 
	prefinput: 0, 
	inactive: 0, 
	autoexpire: 0, 
	maxnewest: 0, 
	maxepisodes: 0, 
	profile: "Default", 
	transcoder: 0, 
	recgroup: "Default", 
	storagegroup: "Default", 
	playgroup: "Default", 
	dupmethod: 6, 
	dupin: 15, 
	parentid: 0, 
	avg_delay: "100", 
	search: 0,
	last_record: "0000-00-00",
	last_delete: "0000-00-00"
};
