/* adsf*/


enyo.kind({ name: "exhibition",
	kind: "VFlexBox",
	className: "exhibition enyo-view",			//enyo-view needed to get vflexbox to work?
	published: {},
	
	encodersList: [],
	scheduledList: [],
	jobqueueList: [],
	storageList: [],
	
	fullResultList: [],
	
	resultList: [],
	
	currentRecordings: [],
	
	inputs: [],
	
	phonePixels: 500,
	viewMode: "tablet",
	currentSlider: "left",
	currentPane: "slidingPaneBox",
	statusLoop: false,
	
	playbackTotalTime: 3630,
	
	statusCountdown: "",
	upcomingCountdown: "",
	
	currentRecordingCountdown: "",
	
	currentRecordingIndex: -1,
	
	carouselIndex: -1,
	
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
		onMythprotocolBackgroundPluginCommand: "",
	},
	
	components: [
			
			{name: "getStatusService", kind: "WebService", handleAs: "xml", onSuccess: "getStatusResponse", onFailure: "getStatusFailure"},
			{name: "getUpcomingService", kind: "WebService", handleAs: "json", onSuccess: "getUpcomingResponse", onFailure: "getUpcomingFailure"},
			{name: "getInputsService", kind: "WebService", handleAs: "json", onSuccess: "getInputsResponse", onFailure: "getInputsFailure"},
			
			{name: "loadingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
				{kind: "HFlexBox", components: [
					{kind: "Spacer"},
					{kind: "SpinnerLarge"},
					{kind: "Spacer"},
				]},
				{content: "Loading...", style: "text-align: center;"},
			]},
			
			{name: "exhibitionPane", kind: "Pane", flex: 1, transitionKind: "enyo.transitions.Simple", onSelectView: "viewSelected", components: [
			
				{name: "slidingPaneBox", kind: "VFlexBox", flex: 1, components: [
				
					{name: "exhibitionHeader", kind: "Toolbar", layoutKind: "VFlexLayout", onclick: "headerClick", components: [
						{name: "exhibitionHeaderTitle", kind: "Control", className: "headerTitle", content: $L("WebMyth2")},
						{name: "exhibitionHeaderSubtitle", kind: "Control", className: "headerSubtitle", content: "&nbsp;"},
					]},
								
					{name: "slidingPane", kind: "SlidingPane", flex: 1, multiViewMinWidth: 500, onSelectView: "slidingSelected", components: [
						{name: "left", kind2: "Sliding", className: "left", dragAnywhere: false, width: "33%", components: [
							{name: "leftVFlexBox", kind: "VFlexBox", flex: 1, components: [
								
								{name: "leftScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
									
									{name: "currentRecordingWrapper", className: "currentRecordingWrapper", showing: false, onclick: "updateCurrentRecording", components: [
										{kind: "Divider", caption: "Currently Recording"},
										{name: "currentRecordingIconWrapper", kind: "HFlexBox", width: "100%", pack: "center", height: "70px", components: [
											{kind: "Spacer"},
											{name: "currentRecordingIcon", kind: "Image", height: "100%"},
											{kind: "Spacer"},
										]},
										{name: "currentRecordingTitle", className: "truncating"},
										{name: "currentRecordingSubtitle", allowHtml: true, className: "smallerFont truncating"},
										{name: "currentRecordingChanname", allowHtml: true, className: "smallerFont truncating"},
										{name: "currentRecordingTime", allowHtml: true, className: "smallerFont truncating"},
									]},
									{kind: "Divider", caption: "Encoders"},
									{name: "encodersVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getEncodersItem", onclick: "encodersSelect", components: [
										{name: "encodersItem", kind: "Item", className: "encodersItem", components: [
											{name: "encodersDescription", className: "encodersDescription"},
										]}
									]},
									{kind: "Divider", caption: "Jobqueue"},
									{name: "jobqueueVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getJobqueueItem", onclick: "jobqueueSelect", components: [
										{name: "jobqueueItem", kind: "Item", className: "jobqueueItem", components: [
											{name: "jobqueueTitle", className: "jobqueueTitle"},
											{name: "jobqueueStarttime", className: "jobqueueStarttime"},
											{name: "jobqueueType", className: "jobqueueType"},
											{name: "jobqueueStatus", className: "jobqueueStatus"},
											{name: "jobqueueComments", className: "jobqueueComments"},
										]}
									]},
									{content: "&nbsp"},
									
								]},
								
							]},
						]},
						{name: "middle", kind2: "Sliding", className: "middle", dragAnywhere: false, width: "33%", components: [
							{name: "middleVFlexBox", kind: "VFlexBox", flex: 1, components: [
								
								{name: "middleScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
									
									{kind: "HFlexBox", align: "center", pack: "center", height: "200px", components: [
										{kind: "Image", src: "webmyth2-icon2.png", height: "100%"},
									]},
									{kind: "Divider", caption: "Other"},
									{name: "statusDateItem", kind: "Item", className: "enyo-first", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "statusDate", className: "value", flex: 1},
										{content: "Current Date", className: "label"},
									]},
									{name: "statusTimeItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "statusTime", className: "value", flex: 1},
										{content: "Current Time", className: "label"},
									]},
									{name: "allLoadsItem", kind: "Item", className: "enyo-last", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "allLoads", className: "value", flex: 1},
										{content: "Load Avg", className: "label"},
									]},
									{content: "&nbsp"},
									
								]},
				
							]},
						]},
						{name: "right", kind2: "Sliding", className: "right", dragAnywhere: false, width: "340px", flex: 1, components: [
							{name: "rightVFlexBox", kind: "VFlexBox", flex: 1, components: [
								
								{name: "rightScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
									
									{name: "conflictingMessage", style: "text-align: center;"},
									{name: "upcomingRecordingWrapper", className: "upcomingRecordingWrapper", components: [
										{kind: "Divider", caption: "Next Recording"},
										{name: "upcomingRecordingIconWrapper", kind: "HFlexBox", width: "100%", pack: "center", height: "70px", components: [
											{kind: "Spacer"},
											{name: "upcomingRecordingIcon", kind: "Image", height: "100%"},
											{kind: "Spacer"},
										]},
										{name: "upcomingRecordingTitle", allowHtml: true, className: "truncating"},
										{name: "upcomingRecordingSubtitle", allowHtml: true, className: "smallerFont truncating"},
										{name: "upcomingRecordingChanname", allowHtml: true, className: "smallerFont truncating"},
										{name: "upcomingRecordingTime", allowHtml: true, className: "smallerFont truncating"},
									]},
									{kind: "Divider", caption: "Upcoming Recordings"},
									{name: "upcomingVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getUpcomingItem", onclick: "scheduledSelect", components: [
										{name: "programItem", kind: "Item", className: "programList", components: [
											{name: "programTitle", className: "title", onclick: "programSelect"},
											{kind: "HFlexBox", components: [
												{name: "channelIconWrapper", kind: "VFlexBox", align: "center", pack: "center", className: "channelIconWrapper", onclick: "programIconSelect", components: [
													{name: "channelIcon", kind: "Image", className: "channelIcon"},
												]},
												{kind: "VFlexBox", flex:1, onclick: "programSelect", components: [
													{name: "row1", allowHtml: true, className: "row1"},
													{name: "row2", allowHtml: true, className: "row2"},
													{name: "row3", allowHtml: true, className: "row3"},
													{name: "row4", allowHtml: true, className: "row4"},
												]},
											]},
										]},
									]},
									{content: "&nbsp"},
									
								]},
				
							]},
						]},
					]},	
					
					{kind: "Toolbar", components: [
						{name: "leftBackCommandIcon", kind: "Control", className: "backCommandIcon", onclick: "gotBack"},
						{kind: "Spacer"},
						{name: "exhibitionRadioGroup", kind: "RadioGroup", onChange: "exhibitionRadioGroupChanged", value: this.currentSlider, components: [
							{label: "Now", value: "left"},
							{label: "Other", value: "middle"},
							{label: "Next", value: "right"},
						]},
						{kind: "Spacer"},
						{name: "leftBackCommandIconSpacer", kind: "Control", className: "backCommandIconSpacer"},
					]},
				
				]},
				
				{name: "exhibitionCarousel", kind: "Carousel", flex: 1, className: "exhibitionCarousel", onGetLeft: "getLeft", onGetRight: "getRight", onclick: "selectedCarouselProgram"},
				{name: "exhibitionImageView", kind: "ImageView", flex: 1, className: "imageView", onclick: "showSlidingPane"},
				
			]},
			
		
	],
	
	create: function() {
		if(debug) this.log("create");
		this.inherited(arguments);
		
		this.render();
		
	},
	
	//Externally called functions
	activate: function(inViewMode) {
		if(debug) this.log("activate: "+inViewMode);
		//this.render();
		
		this.resize(inViewMode);
		
		this.showSlidingPane();
		
		this.leftRevealTop();
		this.middleRevealTop();
		this.rightRevealTop();
		
		this.updateHeader();
		
		this.startLoop();
		
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
		
		//this.statusLoop = false;
		this.stopLoop();
		
		//this.fullResultList.length = 0;
		//this.fullDatesList.length = 0;
		
		//this.detailsProgram = defaultProgram;
		
		//this.finishedGettingUpcoming();
	},
	resize: function(inViewMode) {
		if(debug) this.log("resize");

		this.viewMode = inViewMode;
		
		if(this.viewMode == "tablet") {
			if(debug) this.log("got viewMode of "+this.viewMode);
			
			this.gotoLeft();
			
			this.$.exhibitionRadioGroup.hide();
			
			
		} else {
			
			this.$.exhibitionRadioGroup.setValue(this.currentSlider);
			this.$.exhibitionRadioGroup.show();
		}
		
		this.updateHeader();
		
		this.$.slidingPane.resize();
		this.$.left.render();
		this.$.middle.render();
		this.$.right.render();
		
		//this.$.exhibitionCarousel.render();
		//this.$.exhibitionImageView.render();
		
		if(this.viewMode == "phone") {
			if(this.currentSlider == "left") {
				this.gotoLeft();
			} else if(this.currentSlider == "middle") {
				this.gotoMiddle();
			} else if(this.currentSlider == "right") {
				//this.gotoMiddle();
				this.gotoRight();
			}
		}
		
	},
	gotBack: function() {
		if(debug) this.log("gotBack while we are on "+this.currentPane+" at "+this.currentSlider);
		
		if(this.currentPane != "slidingPaneBox") {
		
			this.showSlidingPane();
			
		} else {

			this.doGetPreviousPane();	
		}
		
	},
	gotKey: function(inKey) {
		if(debug) this.log("gotKey: "+inKey+" while we are at currentSlider: "+this.currentSlider);
		
	},
	gotSpecialKey: function(inKey) {
		if(debug) this.log("gotSpecialKey: "+inKey);
		
	},
	bannerMessage: function(message) {
		if(debug) this.log("bannerMessage: "+message);
		
		this.doBannerMessage(message);
		
	},
	
	//Internal functions
	viewSelected: function(inSender, inView, inPreviousView) {
		if(inPreviousView) {
			if(debug) this.log("changing panes from "+inPreviousView.name+" to "+inView.name);
			this.currentPane = inView.name;
			this.previousPane = inPreviousView.name;
		}
		
		if(inView.name == "slidingPaneBox") {
			this.leftRevealTop();
			this.middleRevealTop();
			this.rightRevealTop();
		}
		
	},
	gotoLeft: function() {
		if(debug) this.log("gotoLeft");
		
		this.leftRevealTop();
		this.$.slidingPane.selectView(this.$.left);
		this.currentSlider = "left";
		
	},
	gotoMiddle: function() {
		if(debug) this.log("gotoMiddle");
		
		this.middleRevealTop();
		this.$.slidingPane.selectView(this.$.middle);
		this.currentSlider = "middle";
		
	},
	gotoRight: function() {
		if(debug) this.log("gotoRight");
		
		this.rightRevealTop();
		this.$.slidingPane.selectView(this.$.right);
		this.currentSlider = "right";
	},
	leftRevealTop: function() {
		if(debug) this.log("leftRevealTop");
		
		this.$.leftScroller.scrollIntoView(0,0);
	},
	middleRevealTop: function() {
		if(debug) this.log("middleRevealTop");
		
		this.$.middleScroller.scrollIntoView(0,0);
	},
	rightRevealTop: function() {
		if(debug) this.log("rightRevealTop");
		
		this.$.rightScroller.scrollIntoView(0,0);
	},
	slidingSelected: function(inSender, inSliding, inLastSliding) {
		if(debug) this.log("slidingSelected: "+inSliding.id);
		
		switch(inSliding.id) {
			case 'webmyth2_exhibition_left':
				this.currentSlider = "left";
				break;
			case 'webmyth2_exhibition_middle':
				this.currentSlider = "middle";
				break;
			case 'webmyth2_exhibition_right':
				this.currentSlider = "right";
				break;
		}
	},
	exhibitionRadioGroupChanged: function(inSender) {
		if(debug) this.log("exhibitionRadioGroupChanged: "+inSender.getValue());
		
		this.currentSlider = inSender.getValue();
		
		this.doSavePreferences();
		
		if(this.viewMode == "phone") {
		
			switch(this.currentSlider) {
				case "left":
					this.gotoLeft();
					break;
				case "middle":
					this.gotoMiddle();
					break;
				case "right":
					this.gotoRight();
					break;
			}
			
			this.updateHeader();
			
		}
	
	},
	showSlidingPane: function() {
		if(debug)	this.log("showSlidingPane");
		
		this.$.exhibitionPane.selectViewByName("slidingPaneBox");
		
		this.updateHeader();
		
		this.startLoop();
	},
	headerClick: function() {
		if(debug) this.log("headerClick");
		
		this.leftRevealTop();
		this.middleRevealTop();
		this.rightRevealTop();
	},
	
	//Exhibition functions
	updateHeader: function() {
		if(debug) this.log("updateHeader");
		
		this.$.exhibitionHeaderTitle.setContent("WebMyth2");
		this.$.exhibitionHeaderSubtitle.setContent(WebMyth.prefsCookie.masterBackendIp);
		
	},
	getEncodersItem: function(inSender, inIndex) {
		var row = this.encodersList[inIndex];
		
		if(row) {
		
			var text = "";
			
			text += "Encoder #"+row.id;
			
			for(var i = 0; i < this.inputs.length; i++) {
				if(this.inputs[i].cardid == row.id) text += " ("+this.inputs[i].displayname+")";
			}
			
			text += " on "+row.hostname+" is "+encoderStateDecode(row.state);
			
			this.$.encodersDescription.setContent(text);

			if(inIndex == 0) {
				this.$.encodersItem.addClass("enyo-first");
			} else if(inIndex == this.encodersList.length - 1) {
				this.$.encodersItem.addClass("enyo-last");
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
			} 
			
			if(inIndex == (this.jobqueueList.length-1)) {
				this.$.jobqueueItem.addClass("enyo-last");
			}
			
			return true;
		}
		
	},	
	getUpcomingItem: function(inSender, inIndex) {
	
		if(inIndex < 10) var row = this.resultList[inIndex + 1];	//skip 1st since showing above with icon
		
		if(row) {
		
			if(inIndex == 0) this.$.programItem.applyStyle("border-top", "none");
			if(inIndex == 9) this.$.programItem.applyStyle("border-bottom", "none");
		
			this.$.programTitle.setContent(row.title);
			
			this.$.row1.setContent(row.subtitle);
			this.$.row2.setContent(row.starttime.replace("T"," "));
			this.$.row3.setContent(row.category);
			
			if(row.recstatus == -1) {
				if((row.rectype == '8')||(row.rectype == '7')) {
					this.$.row4.setContent("(Forced) "+row.channum+" - "+row.channame);	
				} else {
					this.$.row4.setContent(row.channum+" - "+row.channame);	
				}
			} else  {
				this.$.row4.setContent(recstatusDecode(row.recstatus));	
			}
			
			
			if(WebMyth.prefsCookie.showChannelIcons) {
			
				var iconUrl = "";
				
				if(WebMyth.prefsCookie.mythwebXml) {
			
					iconUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetChannelIcon?MythXMLKey=";
					iconUrl += WebMyth.prefsCookie.MythXML_key+"&ChanId=";
					iconUrl += row.chanid;
					
				} else {
					iconUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetChannelIcon?ChanId=";
					iconUrl += row.chanid;
				}
				
				this.$.channelIcon.setSrc(iconUrl);
				this.$.channelIconWrapper.show();
				
			} else {
				
				this.$.channelIconWrapper.hide();
			}
			
			return true;
		}
		
	},
	startLoop: function() {
		if(debug) this.log("startLoop");
		
		clearTimeout(this.statusCountdown);
		clearTimeout(this.upcomingCountdown);
		clearTimeout(this.currentRecordingCountdown);
			
		this.statusLoop = true;
			
		this.statusCountdown = setTimeout(enyo.bind(this,"getStatus"), 100);
		
		clearTimeout(this.currentRecordingCountdown);
		
		this.currentRecordingCountdown = setTimeout(enyo.bind(this,"updateCurrentRecording"), 1000);
			
	},	
	stopLoop: function() {
		if(debug) this.log("stopLoop");
	
		clearTimeout(this.statusCountdown);
		clearTimeout(this.upcomingCountdown);
		clearTimeout(this.currentRecordingCountdown);
		
		this.statusLoop = false;
		
	},
	getStatus: function() {
		if(debug) this.log("getStatus");
		
		clearTimeout(this.statusCountdown);
		clearTimeout(this.upcomingCountdown);
		
		var requestUrl = "";
		
		if(WebMyth.prefsCookie.mythwebXml) {
			
			requestUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/xml?MythXMLKey=";
			requestUrl += WebMyth.prefsCookie.MythXML_key;
			
		} else {
			
			requestUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/xml";
			
		}
		
		if(debug) this.log("requestUrl: "+requestUrl);
		
		if(this.statusLoop) {
			this.$.getStatusService.setUrl(requestUrl);
			this.$.getStatusService.call();
		}
		
	},
	getStatusResponse: function(inSender, inResponse) {
		if(debug) this.log("getStatusResponse");
		
		//this.$.statusContent.setContent(htmlEncode(inResponse, true, 6));
		
		//this.$.errorMessage.setContent("");
		
		
		this.encodersList.length = 0;
		this.scheduledList.length = 0;
		this.jobqueueList.length = 0;
		this.storageList.length = 0;
		
		
		var singleEncoderNode, singleEncoderChildNode, singleEncoderJson;
		var singleScheduledNode, singleScheduledRecordingNode, singleScheduleJson;
		var singleJobqueueNode, singleJobqueueProgramNode, singleJobqueueJson;
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
		//if(debug) this.log("Full encoder list is: "+enyo.json.stringify(this.encodersList));
			
		
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
										"encoderid" : singleScheduledRecordingNode.getAttributeNode("encoderId").nodeValue,
										"recstartts" : singleScheduledRecordingNode.getAttributeNode("recStartTs").nodeValue.replace("T"," "),
									};
				//if(debug) this.log("Added scheduled %j to list", singleScheduledJson);
				this.scheduledList.push(singleScheduledJson);
			}
		} 
		//if(debug) this.log("Full scheduled is: "+enyo.json.stringify(this.scheduledList));
		
		
		//JobQueue
		var jobqueueNode=inResponse.getElementsByTagName("JobQueue")[0];
		var jobqueueCount = jobqueueNode.getAttributeNode("count").nodeValue;
		//if(debug) this.log("Count of jobqueue is "+jobqueueCount);
		//if(debug) this.log("Count of child jobqueue nodes is "+jobqueueNode.childNodes.length);
		for(var i = 0; i < jobqueueNode.childNodes.length; i++) {
			//if(debug) this.log("jobqueue nodeName is "+jobqueueNode.childNodes[i].nodeName);
			singleJobqueueNode = jobqueueNode.childNodes[i];
			if(singleJobqueueNode.nodeName == "Job") {
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
				
				//don't push finished and cancelled jobs
				if((singleJobqueueJson.status != 272)&&(singleJobqueueJson.status != 320)) this.jobqueueList.push(singleJobqueueJson);
			}
		} 
		//if(debug) this.log("Full jobqueue is: "+enyo.json.stringify(this.jobqueueList));
		
		
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
		//if(debug) this.log("Full storagelist is: "+enyo.json.stringify(this.storageList));
		
		
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
		
		this.finishedLoadingStatus();
	
	},
	getStatusFailure: function(inSender, inResponse) {
		this.error("getStatusFailure");
		
		this.finishedLoadingStatus();
		
	},
	finishedLoadingStatus: function() {
		if(debug) this.log("finishedLoadingStatus");
		
		this.$.encodersVirtualRepeater.render();
		this.$.jobqueueVirtualRepeater.render();
		
		this.$.statusDate.setContent(this.statusDate);
		this.$.statusTime.setContent(this.statusTime);
		this.$.allLoads.setContent(this.allLoads);
		
		this.upcomingCountdown = setTimeout(enyo.bind(this,"getUpcoming"), 100);
	},
	getUpcoming: function(inCommand) {
		if(debug) this.log("getUpcoming");
		
		clearTimeout(this.statusCountdown);
		clearTimeout(this.upcomingCountdown);
		
		if(WebMyth.useScript){
			
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=getPending";				//matches any recording rule
		
			if(debug) this.log("requestUrl: "+requestUrl);
		
			if(this.statusLoop) {
				this.$.getUpcomingService.setUrl(requestUrl);
				this.$.getUpcomingService.call();
			}
			
		} else {
		
			this.doMythprotocolBackgroundPluginCommand("QUERY_GETALLPENDING");
			
		} 
		
	},
	getUpcomingResponse: function(inSender, inResponse) {
		//if(debug) this.log("getUpcomingResponse: "+enyo.json.stringify(inResponse));
		if(debug) this.log("getUpcomingResponse");
		
		this.fullResultList.length = 0;
		this.currentRecordings.length = 0;
		
		this.fullResultList = inResponse;
		
		var conflicts = 0, s = {};
		
		for(var i = 0; i < this.fullResultList.length; i++) {
			s = this.fullResultList[i];
			if(s.recstatus == 7) conflicts++;
			if(s.recstatus == -2) this.currentRecordings.push(s);
		}
		
		this.resultList = trimUpcomingByGroup(this.fullResultList,"Exhibition");
		
		if(conflicts == 1) {
			this.$.conflictingMessage.setContent("There is 1 conflicting recording");
			//this.bannerMessage("There is 1 conflicting recording");
		} else if(conflicts > 1) {
			this.$.conflictingMessage.setContent("There are "+conflicts+" conflicting recordings");
			//this.bannerMessage("There are "+conflicts+" conflicting recordings");
		} else {
			this.$.conflictingMessage.setContent("");
			if(debug) this.log("we don't have any conflicts");
		}
		
		this.finishedGettingUpcoming();
	
	
	},
	getUpcomingFailure: function(inSender, inResponse) {
		this.error("getUpcomingFailure");
		
		this.finishedGettingUpcoming();
		
	},
	finishedGettingUpcoming: function() {
		if(debug) this.log("finishedGettingUpcoming");
		
		this.$.upcomingVirtualRepeater.render();
		
		var row = this.resultList[0];
		
		if(row) {
		
			this.$.upcomingRecordingWrapper.show();
			
			var iconUrl = "";
				
			if(WebMyth.prefsCookie.mythwebXml) {
			
				iconUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetChannelIcon?MythXMLKey=";
				iconUrl += WebMyth.prefsCookie.MythXML_key+"&ChanId=";
				iconUrl += row.chanid;
					
			} else {
				iconUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetChannelIcon?ChanId=";
				iconUrl += row.chanid;
			}
			
			this.$.upcomingRecordingIcon.setSrc(iconUrl);
			this.$.upcomingRecordingTitle.setContent(row.title);
			
			if((row.subtitle != "None")&&(row.subtitle != "")) {
				this.$.upcomingRecordingSubtitle.setContent(row.subtitle);
			} else {
				this.$.upcomingRecordingSubtitle.setContent("&nbsp;");
			}
			
			this.$.upcomingRecordingChanname.setContent(row.channum+" - "+row.channame);
			this.$.upcomingRecordingTime.setContent(row.recstartts.replace("T"," "));
		
		} else {
		
			this.$.upcomingRecordingWrapper.hide();
			
		} 
		
		if(this.inputs.length == 0) {
			this.getInputs();
		}
		
		this.statusCountdown = setTimeout(enyo.bind(this,"getStatus"), 10000);
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
			
			this.doMysqlPluginCommand("mysqlExhibitionGetInputs", query);
			
		}
		
	},
	getInputsResponse: function(inSender, inResponse) {
		if(debug) this.log("getInputsResponse: "+enyo.json.stringify(inResponse));
		
		this.inputs = inResponse;
		
		if(debug) this.log("this.inputs: "+enyo.json.stringify(this.inputs));
		
		this.$.encodersVirtualRepeater.render();
		this.$.jobqueueVirtualRepeater.render();
		//this.$.upcomingVirtualRepeater.render();
		
		this.statusCountdown = setTimeout(enyo.bind(this,"getStatus"), 10000);
		
	},
	getInputsFailure: function(inSender, inResponse) {
		this.error("getInputsFailure");

		this.inputs.push({cardid: -100, displayname: "none"});
		
		this.statusCountdown = setTimeout(enyo.bind(this,"getStatus"), 10000);
		
	},
	updateCurrentRecording: function() {
		if(debug) this.log("updateCurrentRecording index: "+this.currentRecordingIndex);
		
		clearTimeout(this.currentRecordingCountdown);
		
		if(this.currentRecordings.length == 0) {
			this.currentRecordingIndex = -1;
			this.$.currentRecordingWrapper.hide();
		} else {
			this.currentRecordingIndex++;
			if(this.currentRecordingIndex == this.currentRecordings.length) this.currentRecordingIndex = 0;
			
			var row = this.currentRecordings[this.currentRecordingIndex];
			
			var iconUrl = "";
				
			if(WebMyth.prefsCookie.mythwebXml) {
			
				iconUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetChannelIcon?MythXMLKey=";
				iconUrl += WebMyth.prefsCookie.MythXML_key+"&ChanId=";
				iconUrl += row.chanid;
					
			} else {
				iconUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetChannelIcon?ChanId=";
				iconUrl += row.chanid;
			}
			
			this.$.currentRecordingIcon.setSrc(iconUrl);
			this.$.currentRecordingTitle.setContent(row.title);
			
			if((row.subtitle != "None")&&(row.subtitle != "")) {
				this.$.currentRecordingSubtitle.setContent(row.subtitle);
			} else {
				this.$.currentRecordingSubtitle.setContent("&nbsp;");
			}
			
			this.$.currentRecordingChanname.setContent(row.channame);
			this.$.currentRecordingTime.setContent(row.starttime.substring(11,16)+" to "+row.endtime.substring(11,16));
			
			this.$.currentRecordingWrapper.show();
		}
		
		if(this.statusLoop) this.currentRecordingCountdown = setTimeout(enyo.bind(this,"updateCurrentRecording"), 6000);
		
	},
	
});



