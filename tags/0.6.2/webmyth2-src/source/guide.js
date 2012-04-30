/* adsf*/


enyo.kind({ name: "guide",
	kind: "VFlexBox",
	className: "guide enyo-view",			//enyo-view needed to get vflexbox to work?
	published: {
		phonePixels: 500,
		viewMode: "tablet",
		currentSlider: "left",
		currentPane: "slidingPane",
		currentMode: "Now",
	},
	
	timeISO: "2011-04-25T20:00:01",
	timeISO2: "2011-04-25T21:00:01",
	dayRange: {},
	chanid: "",
	
	fullResultList: [],
	
	middleResultList: [],
	datesList: [],
	
	resultList: [],	
	
	peopleList: [],
	
	playList: [],
	
	detailsProgram: {},
	
	selectedDate: "",
	selectedDateIndex: -1,
	selectedChanid: "",
	selectedStarttime: "",
	selectedProgramIndex: -1,
	
	carouselIndex: -1,
	
	events: {
		onBannerMessage: "",
		onSelectMode: "",
		onSavePreferences: "",
		onPersonSelected: "",
		onOpenWeb: "",
		onSetupSchedule: "",
		onProgramGuide: "",
		onTitleSearch: "",
		onRemoteCommand: "",
		onMysqlPluginCommand: "",
	},
	
	components: [
			
			{name: "getGuideService", kind: "WebService", handleAs: "xml", onSuccess: "getGuideResponse", onFailure: "getGuideFailure"},
			{name: "getGuide25Service", kind: "WebService", handleAs: "xml", onSuccess: "getGuide25Response", onFailure: "getGuide25Failure"},
			
			{name: "getProgramDetailsService", kind: "WebService", handleAs: "xml", onSuccess: "getProgramDetailsResponse", onFailure: "getProgramDetailsFailure"},
			{name: "getProgramDetails25Service", kind: "WebService", handleAs: "xml", onSuccess: "getProgramDetails25Response", onFailure: "getProgramDetailsFailure"},
			
			{name: "getPeopleService", kind: "WebService", handleAs: "json", onSuccess: "peopleResponse", onFailure: "peopleFailure"},
			
			{name: "loadingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
				{kind: "HFlexBox", components: [
					{kind: "Spacer"},
					{kind: "SpinnerLarge"},
					{kind: "Spacer"},
				]},
				{content: "Loading...", style: "text-align: center;"},
			]},
			
			{name: "guidePane", kind: "Pane", flex: 1, transitionKind: "enyo.transitions.Simple", onSelectView: "viewSelected", components: [
			
				{name: "slidingPane", kind: "SlidingPane", flex: 1, multiViewMinWidth: 500, onSelectView: "slidingSelected", components: [
					{name: "left", kind2: "Sliding", className: "left", dragAnywhere: false, width: "66%", components: [
						{name: "leftVFlexBox", kind: "VFlexBox", flex: 1, components: [
							{name: "leftHeader", kind: "Toolbar", layoutKind: "VFlexLayout", onclick: "leftRevealTop", components: [
								{name: "leftHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Guide")},
								{name: "leftHeaderDetails", kind: "Control", className: "headerSubtitle", content: ""},
							]},
							
							{name: "topGuideTimeLabelRow", kind: "HFlexBox", className: "topGuideTimeLabelRow", components: [
							//{name: "topGuideTimeLabelRow", kind: "PrevNextBanner", className: "topGuideTimeLabelRow", components: [
								{name: "guideLabelTimeTitle", content: "&nbsp;", className: "channelTitle"},
								{name: "guideLabelPreviousWrapper", className: "guidePreviousWrapper"},
								{name: "guideLabel0", content: "", flex: 1, className: "guideLabel"}, 
								{name: "guideLabel1", content: "", flex: 1, className: "guideLabel"}, 
								{name: "guideLabel2", content: "", flex: 1, className: "guideLabel"}, 
								{name: "guideLabel3", content: "", flex: 1, className: "guideLabel"}, 
								{name: "guideLabelNextWrapper", className: "guideNextWrapper"},
							]},
							
							{name: "guideTimeVirtualList", kind: "VirtualList", onSetupRow: "getGuideTimeItem", flex: 1, components: [
								{name: "guideProgramRow", kind2: "PrevNextBanner", kind: "Item", className: "guideProgramRow", layoutKind: "HFlexLayout", components: [
									{name: "channelTitleWrapper", kind: "Control", layoutKind: "VFlexLayout", align: "center", pack: "center", className: "channelTitle", onclick: "channelTitleSelect", components: [
										{name: "channelTimeTitleIcon", kind: "Image", className: "channelTitleIcon"},
										{name: "channelTimeTitle", content: "", className: "channelTitle"},
									]},
									{name: "guidePreviousWrapper", className: "guidePreviousWrapper", components: [
										{name: "guidePreviousIcon", kind: "Image", className: "guidePreviousIcon"},
									]},
									
									{name: "guideProgram0", kind2: "VFlexBox", flex2: 1, className: "guideProgram", onclick: "guideProgram0select", components: [
										{name: "guideProgramTitle0", content: "", className: "guideProgramTitle"},
										{name: "guideProgramSubtitle0", content: "", className: "guideProgramSubtitle"},
									]},
									{name: "guideProgram1", kind2: "VFlexBox", flex2: 1, className: "guideProgram", onclick: "guideProgram1select", components: [
										{name: "guideProgramTitle1", content: "", className: "guideProgramTitle"},
										{name: "guideProgramSubtitle1", content: "", className: "guideProgramSubtitle"},
									]},
									{name: "guideProgram2", kind2: "VFlexBox", flex2: 1, className: "guideProgram", onclick: "guideProgram2select", components: [
										{name: "guideProgramTitle2", content: "", className: "guideProgramTitle"},
										{name: "guideProgramSubtitle2", content: "", className: "guideProgramSubtitle"},
									]},
									{name: "guideProgram3", kind2: "VFlexBox", flex2: 1, className: "guideProgram", onclick: "guideProgram3select", components: [
										{name: "guideProgramTitle3", content: "", className: "guideProgramTitle"},
										{name: "guideProgramSubtitle3", content: "", className: "guideProgramSubtitle"},
									]},
									{name: "guideProgram4", kind2: "VFlexBox", flex2: 1, className: "guideProgram", onclick: "guideProgram4select", components: [
										{name: "guideProgramTitle4", content: "", className: "guideProgramTitle"},
										{name: "guideProgramSubtitle4", content: "", className: "guideProgramSubtitle"},
									]},
									{name: "guideProgram5", kind2: "VFlexBox", flex2: 1, className: "guideProgram", onclick: "guideProgram5select", components: [
										{name: "guideProgramTitle5", content: "", className: "guideProgramTitle"},
										{name: "guideProgramSubtitle5", content: "", className: "guideProgramSubtitle"},
									]},
									{name: "guideProgram6", kind2: "VFlexBox", flex2: 1, className: "guideProgram", onclick: "guideProgram6select", components: [
										{name: "guideProgramTitle6", content: "", className: "guideProgramTitle"},
										{name: "guideProgramSubtitle6", content: "", className: "guideProgramSubtitle"},
									]},
									{name: "guideProgram7", kind2: "VFlexBox", flex2: 1, className: "guideProgram", onclick: "guideProgram7select", components: [
										{name: "guideProgramTitle7", content: "", className: "guideProgramTitle"},
										{name: "guideProgramSubtitle7", content: "", className: "guideProgramSubtitle"},
									]},
									{name: "guideProgram8", kind2: "VFlexBox", flex2: 1, className: "guideProgram", onclick: "guideProgram8select", components: [
										{name: "guideProgramTitle8", content: "", className: "guideProgramTitle"},
										{name: "guideProgramSubtitle8", content: "", className: "guideProgramSubtitle"},
									]},
									
									{name: "guideNextWrapper", className: "guideNextWrapper", components: [
										{name: "guideNextIcon", kind: "Image", className: "guideNextIcon"},
									]},
								]},
							]},
							
							{name: "topGuideChannelLabelRow", kind: "HFlexBox", className: "topGuideChannelLabelRow", components: [
							//{name: "topGuideTimeLabelRow", kind: "PrevNextBanner", className: "topGuideTimeLabelRow", components: [
								{name: "guideLabelChannelIcon", kind: "Image", className: "guideLabelChannelIcon"},
								{name: "guideLabelChannelTitle", content: "", className: "guideLabelChannelTitle", flex: 1},
							]},
							
							{name: "guideChannelVirtualList", kind: "VirtualList", onSetupRow: "getGuideChannelItem", flex: 1, components: [
								{name: "guideChannelProgramRow", kind: "Item", className: "guideChannelProgramRow", layoutKind: "HFlexLayout", onclick: "channelProgramSelect", components: [
									{name: "channelTimeWrapper", className: "channelTime", onclick: "channelTimeSelect", components: [
										{name: "channelTimeStart", content: "", className: "channelTimeStart"},
										{name: "channelTimeMiddle", content: " to ", className: "channelTimeMiddle"},
										{name: "channelTimeEnd", content: "", className: "channelTimeEnd"},
									]},
									{name: "channelProgram", kind: "VFlexBox", flex: 1, className: "channelProgram", onclick: "channelProgramSelect", components: [
										{name: "channelProgramTitle", content: "", className: "channelProgramTitle"},
										{name: "channelProgramSubtitle", content: "", className: "channelProgramSubtitle"},
									]},
								]},
							]},
							
							{name: "errorMessage"},
							//	{content: "&nbsp"}
							//]},
							
							{kind: "Toolbar", components: [
								{name: "leftBackCommandIcon", kind: "Control", className: "backCommandIcon", onclick: "gotBack"},
								{kind: "Spacer"},
								{name: "leftCommandButton", caption: $L("<<"), onclick: "leftClick"},
								{kind: "Spacer"},
								{name: "modeCommandButton", caption: $L("Mode"), onclick: "modeClick"},
								{kind: "Spacer"},
								{name: "rightCommandButton", caption: $L(">>"), onclick: "rightClick"},
								{kind: "Spacer"},
								{name: "leftBackCommandIconSpacer", kind: "Control", className: "backCommandIconSpacer"},
							]},
							{name: "modePopupMenu", kind: "PopupSelect", defaultKind: "MenuCheckItem", className: "modePopupMenu", onSelect: "modeSelect", onClose: "modeClosed", components: [
								//
							]},
							{name: "timePickerPopupMenu", kind: "Popup", onBeforeOpen: "beforeTimePickerOpen", className: "datePickerPopupMenu", components: [
								{name: "guideDatePicker", kind: "DatePicker", label: "Date", onChange: "pickerPick"},
								{name: "guideTimePicker", kind: "TimePicker", is24HrMode: true, label: "Time", onChange: "pickerPick"},
								{name: "timePickerPopupMenuButton", kind: "Button", caption: "Submit", onclick: "timePickerSubmit"},
								//
							]},
						]},
					]},
					{name: "right", kind2: "Sliding", className: "right", dragAnywhere: false, width: "340px", flex: 1, components: [
						{name: "rightVFlexBox", kind: "VFlexBox", flex: 1, components: [
							{name: "rightHeader", kind: "Toolbar", layoutKind: "HFlexLayout", onclick: "rightRevealTop", components: [
								{name: "rightHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Details"), flex2: 1},
							]},
							
							{name: "rightScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
								{name: "rightDetailsChannelIconWrapper", kind: "HFlexBox", pack: "center", height: "70px", components: [
									{kind: "Spacer"},
									{name: "rightDetailsChannelIcon", kind: "Image", className: "largeChannelIcon"},
									{name: "detailsSpinner", kind: "Spinner", className: "detailsSpinner"},
									{kind: "Spacer"},
								]},
								{name: "recStatusText", className: "recStatusText", kind: "Control"},
								{name: "generalDetailsRowGroup", kind: "RowGroup", caption: "General Details", components: [
									{name: "subtitleItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "subtitle", className: "value", flex: 1},
										{content: "Subtitle", className: "label"},
									]},
									{name: "descriptionItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "detailsDescription", className: "description"},
									]},
									{name: "categoryItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "category", className: "value", flex: 1},
										{content: "Category", className: "label"},
									]},
									{name: "recstatusItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "recstatus", className: "value", flex: 1},
										{content: "Recording Status", className: "label"},
									]},
									{name: "starttimeItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "starttime", className: "value", flex: 1},
										{content: "Start Time", className: "label"},
									]},
									{name: "endtimeItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "endtime", className: "value", flex: 1},
										{content: "End Time", className: "label"},
									]},
								]},
								{name: "programDetailsRowGroup", kind: "RowGroup", caption: "Program Details", components: [
									{name: "airdateItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "airdate", className: "value", flex: 1},
										{content: "Original Airdate", className: "label"},
									]},
									{name: "seriesidItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "seriesid", className: "value", flex: 1},
										{content: "Series ID", className: "label"},
									]},
									{name: "programidItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "programid", className: "value", flex: 1},
										{content: "Program ID", className: "label"},
									]},
									{name: "channumItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "channum", className: "value", flex: 1},
										{content: "Channel Number", className: "label"},
									]},
									{name: "channameItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "channame", className: "value", flex: 1},
										{content: "Channel Name", className: "label"},
									]},
								]},
								{name: "peopleRowGroup", kind: "RowGroup", caption: "People", components: [
									{name: "peopleSpinnerItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", pack: "center", align: "center", components: [
										{name: "peopleSpinner", kind: "Spinner"},
									]},
									{kind: "Item", className: "groupVirtualRepeater", components: [
										{name: "peopleVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getPeopleItem", onclick: "peopleSelect", components: [
											{name: "peopleItem", kind: "Item", className: "people", layoutKind: "HFlexLayout", components: [
												{name: "peopleName", className: "value", flex: 1},
												{name: "peopleRole", className: "label"},
											]}
										]},
									]},
								]},
								{content: "&nbsp;"},
							]},
							
							{name: "rightCommandMenu", kind: "Toolbar", slidingHandler: false, components: [
								{name: "rightBackCommandIcon", kind: "GrabButton", className2: "backCommandIcon", onclick: "gotoLeft"},
								{kind: "Spacer"},
								{name: "playCommandButton", caption: $L("Play"), onclick: "playClick"},
								{kind: "Spacer"},
								{name: "moreCommandButton", caption: $L("More"), onclick: "moreClick"},
								{kind: "Spacer"},
							]},
							
							{name: "playPopupMenu", kind: "PopupSelect", className: "playPopupMenu", onSelect: "playSelect", onClose: "playClosed", components: [
								//
							]},
							{name: "morePopupMenu", kind: "PopupSelect", className: "morePopupMenu", onSelect: "moreSelect", onClose: "moreClosed", components: [
								{caption: "Web", components: [
									{name: "MythWeb", caption: "MythWeb"},
									{name: "Wikipedia", caption: "Wikipedia"},
									{name: "themoviedb", caption: "themoviedb"},
									{name: "IMDB", caption: "IMDB"},
									{name: "TheTVDB", caption: "TheTVDB"},
									{name: "TV.com", caption: "TV.com"},
									{name: "Google", caption: "Google"},
								]},
								{caption: "Setup Schedule", onclick2: "setupSchedule"},
								{caption: "Guide", components: [
									{caption: "Time"},
									{caption: "Title Search"},
								]},
							]},
						]},
					]},
				]},
				
				{name: "upcomingCarousel", kind: "Carousel", flex: 1, className: "upcomingCarousel", onGetLeft: "getLeft", onGetRight: "getRight", onclick: "selectedCarouselProgram"},
				{name: "upcomingImageView", kind: "ImageView", flex: 1, className: "upcomingImageView", onclick: "showSlidingPane"},
				
			]},
		
	],
	
	create: function() {
		if(debug) this.log("create");
		this.inherited(arguments);
		
		this.detailsProgram = defaultProgram;
		
		this.render();
		
		this.$.topGuideChannelLabelRow.hide();
		this.$.guideChannelVirtualList.hide();
		
		//this.updateModeMenu();
		
		//this.$.guideVirtualTable.setEditable(false);
		
		//this.activate();
		
	},
	
	//Externally called functions
	activate: function(inViewMode) {
		if(debug) this.log("activate");
		//this.render();
		
		this.resize(inViewMode);
		
		
		if(this.haveIncomingTitle) {
			
			//data is passed through externalTitle();
			
		} else if(this.fullResultList.length == 0) {
		
			this.leftRevealTop();
			this.rightRevealTop();
			
			setTimeout(enyo.bind(this,"showDetails"),1);
			this.getGuide();
		}

		this.playList.length = 0;
		
		for(var i = 0; i < WebMyth.prefsCookie.frontends.length; i++) {
			this.playList.push({caption: WebMyth.prefsCookie.frontends[i].name});
		}
		
		this.$.playPopupMenu.setItems(this.playList);
		
		this.updateModeMenu();
		
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
		
		//this.fullResultList.length = 0;
		//this.fullDatesList.length = 0;
		
		//this.detailsProgram = defaultProgram;
		
		//this.finishedGettingGuide();
	},
	resize: function(inViewMode) {
		if(debug) this.log("resize");

		this.viewMode = inViewMode;
		
		if(this.viewMode == "tablet") {
			if(debug) this.log("got viewMode of "+this.viewMode);
			
			this.gotoLeft();
			
			this.$.leftBackCommandIcon.hide();
			this.$.leftBackCommandIconSpacer.hide();
			//this.$.middleBackCommandIcon.hide();
			//this.$.middleBackCommandIconSpacer.hide();
			//this.$.rightBackCommandIcon.hide();
			//this.$.rightBackCommandIconSpacer.hide();
			
			//Show All title pick for initial tablet
			if(this.fullResultList.length == 0) this.selectedDate = "";
			
		} else {
		
			this.$.leftBackCommandIcon.show();
			this.$.leftBackCommandIconSpacer.show();
			//this.$.middleBackCommandIcon.show();
			//this.$.middleBackCommandIconSpacer.show();
			//this.$.rightBackCommandIcon.show();
			//this.$.rightBackCommandIconSpacer.show();
		}
		
		this.$.slidingPane.resize();
		//this.$.left.render();
		this.$.guideTimeVirtualList.resized();
		this.$.guideChannelVirtualList.resized();
		this.$.right.render();
		
		this.$.upcomingCarousel.render();
		//this.$.upcomingImageView.render();
		
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
		
		if(this.currentPane == "upcomingImageView") {
			this.showSlidingPane();
			
		} else {
			
			if(this.viewMode == "phone") {
				this.selectedDate = "asdf";
				this.selectedChanid = "";
				this.selectedStarttime = "";
				//this.$.datesVirtualRepeater.render();
				//this.$.programsVirtualList.refresh();
			}
			
			if(this.currentSlider == "left") {
				this.doSelectMode("welcome");
			} else if(this.currentSlider == "middle") {
				this.gotoLeft();
			} else if(this.currentSlider == "right") {
				this.gotoMiddle();
			}
		}
		
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
	externalTime: function(inTime, inViewMode) {
		if(debug) this.log("externalTime: "+inTime);
		
		this.viewMode = inViewMode;
		
		this.haveIncomingTime = true
		
		this.timeISO = inTime.replace(" ","T").substring(0,17)+"01";
		this.currentMode = "Time";
		//this.$.leftHeaderTitle.setContent("Title Search: '"+this.searchText+"'");
		
		var externalTimeJS = new Date(isoToJS(this.timeISO));
		
		this.fullResultList.length = 0;
		
		this.selectedChanid = "";
		this.selectedStarttime = "";
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		this.gotoLeft();
		
		this.getGuide();
		
	},
	
	//Internal functions
	viewSelected: function(inSender, inView, inPreviousView) {
		if(inPreviousView) {
			if(debug) this.log("changing panes from "+inPreviousView.name+" to "+inView.name);
			this.currentPane = inView.name;
			this.previousPane = inPreviousView.name;
		}
		
		if(inView.name == "slidingPane") {
			this.$.programsVirtualList.refresh();
		}
		
	},
	gotoLeft: function() {
		if(debug) this.log("gotoLeft");
		
		this.$.slidingPane.selectView(this.$.left);
		this.currentSlider = "left";
		
		if(this.viewMode == "phone") {
			this.selectedDate = "asdf";
			this.selectedChanid = "";
			this.selectedStarttime = "";
			//this.$.datesVirtualRepeater.render();
			//this.$.programsVirtualList.refresh();
		}
	},
	gotoMiddle: function() {
		if(debug) this.log("gotoMiddle");
		
		this.gotoLeft();
		
	},
	gotoRight: function() {
		if(debug) this.log("gotoRight");
		
		this.rightRevealTop();
		this.$.slidingPane.selectView(this.$.right);
		this.currentSlider = "right";
	},
	leftRevealTop: function() {
		if(debug) this.log("leftRevealTop");
		
		//this.$.leftScroller.scrollIntoView(0,0);
		this.$.guideTimeVirtualList.punt();
		this.$.guideChannelVirtualList.punt();
		
	},
	middleRevealTop: function() {
		if(debug) this.log("middleRevealTop");
		
		//this.$.programsVirtualList.punt();
	},
	rightRevealTop: function() {
		if(debug) this.log("rightRevealTop");
		
		this.$.rightScroller.scrollIntoView(0,0);
	},
	slidingSelected: function(inSender, inSliding, inLastSliding) {
		if(debug) this.log("slidingSelected: "+inSliding.id);
		
		switch(inSliding.id) {
			case 'webmyth2_guide_left':
				this.currentSlider = "left";
				break;
			case 'webmyth2_guide_middle':
				this.currentSlider = "middle";
				break;
			case 'webmyth2_guide_right':
				this.currentSlider = "right";
				break;
		}
	},
	channelTitleSelect: function(inSender, inEvent) {
		if(debug) this.log("channelTitleSelect index "+inEvent.rowIndex);
		
		var row = this.fullResultList[inEvent.rowIndex];
		
		this.currentMode = "Channel";
		this.chanid = row[0].chanid;
		
		this.getGuide();
		
		//this.bannerMessage("Channel now yet working.  chanid: "+row[0].chanid);
			
	},
	guideProgram0select: function(inSender, inEvent) {
		if(debug) this.log("guideProgram0select index "+inEvent.rowIndex);
		
		var row = this.fullResultList[inEvent.rowIndex];
		var column = row[0];
		
		this.selectedChanid = column.chanid;
		this.selectedStarttime = column.starttime;
		
		this.detailsProgram = column;
		
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	guideProgram1select: function(inSender, inEvent) {
		if(debug) this.log("guideProgram1select index "+inEvent.rowIndex);
		
		var row = this.fullResultList[inEvent.rowIndex];
		var column = row[1];
		
		this.selectedChanid = column.chanid;
		this.selectedStarttime = column.starttime;
		
		this.detailsProgram = column;
		
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	guideProgram2select: function(inSender, inEvent) {
		if(debug) this.log("guideProgram2select index "+inEvent.rowIndex);
		
		var row = this.fullResultList[inEvent.rowIndex];
		var column = row[2];
		
		this.selectedChanid = column.chanid;
		this.selectedStarttime = column.starttime;
		
		this.detailsProgram = column;
		
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	guideProgram3select: function(inSender, inEvent) {
		if(debug) this.log("guideProgram3select index "+inEvent.rowIndex);
		
		var row = this.fullResultList[inEvent.rowIndex];
		var column = row[3];
		
		this.selectedChanid = column.chanid;
		this.selectedStarttime = column.starttime;
		
		this.detailsProgram = column;
		
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	guideProgram4select: function(inSender, inEvent) {
		if(debug) this.log("guideProgram4select index "+inEvent.rowIndex);
		
		var row = this.fullResultList[inEvent.rowIndex];
		var column = row[4];
		
		this.selectedChanid = column.chanid;
		this.selectedStarttime = column.starttime;
		
		this.detailsProgram = column;
		
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	guideProgram5select: function(inSender, inEvent) {
		if(debug) this.log("guideProgram5select index "+inEvent.rowIndex);
		
		var row = this.fullResultList[inEvent.rowIndex];
		var column = row[5];
		
		this.selectedChanid = column.chanid;
		this.selectedStarttime = column.starttime;
		
		this.detailsProgram = column;
		
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	guideProgram6select: function(inSender, inEvent) {
		if(debug) this.log("guideProgram6select index "+inEvent.rowIndex);
		
		var row = this.fullResultList[inEvent.rowIndex];
		var column = row[6];
		
		this.selectedChanid = column.chanid;
		this.selectedStarttime = column.starttime;
		
		this.detailsProgram = column;
		
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	guideProgram7select: function(inSender, inEvent) {
		if(debug) this.log("guideProgram7select index "+inEvent.rowIndex);
		
		var row = this.fullResultList[inEvent.rowIndex];
		var column = row[7];
		
		this.selectedChanid = column.chanid;
		this.selectedStarttime = column.starttime;
		
		this.detailsProgram = column;
		
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	guideProgram8select: function(inSender, inEvent) {
		if(debug) this.log("guideProgram8select index "+inEvent.rowIndex);
		
		var row = this.fullResultList[inEvent.rowIndex];
		var column = row[8];
		
		this.selectedChanid = column.chanid;
		this.selectedStarttime = column.starttime;
		
		this.detailsProgram = column;
		
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	channelProgramSelect: function(inSender, inEvent) {
		if(debug) this.log("channelProgramSelect index "+inEvent.rowIndex);
		
		var row = this.fullResultList[0];
		var column = row[inEvent.rowIndex];
		
		this.selectedChanid = column.chanid;
		this.selectedStarttime = column.starttime;
		
		this.detailsProgram = column;
		
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	getCarouselView: function(inIndex) {
		if(debug) this.log("getCarouselView with index: "+inIndex);
	
		//return {kind: "VFlexBox", align: "center", pack: "center", content: enyo.json.stringify(this.resultList[inIndex])};
		
		var row = this.resultList[inIndex];
		
		if(row) {
	
			if((row.subtitle == null)||(row.subtitle == "")||(row.subtitle == "None")) {
				row.useSubtitle = false;
				//row.useDate = true;
			} else {
				row.useSubtitle = true;
				//row.useDate = false;
			}
			
			row.useDate = true;
			
			if((row.description == null)||(row.description == "")||(row.description == "None")) {
				row.hasDescription = false;
			} else {
				row.hasDescription = true;
			}
			
			row.iconUrl = "";
			
			if(WebMyth.prefsCookie.mythwebXml) {
			
				row.iconUrl = "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetChannelIcon?MythXMLKey=";
				row.iconUrl += WebMyth.prefsCookie.MythXML_key+"&ChanId=";
				
			} else if(WebMyth.prefsCookie.DBSchemaVer > 1269){
			
				row.iconUrl = "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Guide/GetChannelIcon?ChanId=";
				
			} else {
			
				row.iconUrl = "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetChannelIcon?ChanId=";
				
			}
			
			row.iconUrl += row.chanid;
			
			if(debug) this.log("getCarouselView iconUrl: "+row.iconUrl);
			
			return {kind: "VFlexBox", className: "guideCarousel", flex: 1, align: "center", pack: "justify", owner: this, components: [
			
					{kind: "ButtonHeader", content: row.title, width: "100%", onclick: "gotBack"},
						{kind: "HFlexBox", flex2: 1, height: "auto", width: "100%", align: "center", pack: "center", components: [
							{kind: "Image", src: row.iconUrl, className: "carouselIcon"},
						]},

					
				]};
				
		} else {
			return false;
		}
								
	},
	getLeft: function(inSender, inSnap) {
		if(debug) this.log("getLeft: "+inSnap);
		inSnap && this.carouselIndex--;
		return this.getCarouselView(this.carouselIndex-1);
	},
	getRight: function(inSender, inSnap) {
		if(debug) this.log("getRight: "+inSnap);
		inSnap && this.carouselIndex++;
		return this.getCarouselView(this.carouselIndex+1);
	},
	selectedCarouselProgram: function() {
		if(debug) this.log("selectedCarouselProgram and have index: "+this.carouselIndex);
		
		var row = this.resultList[this.carouselIndex];
		
		this.selectedChanid = row.chanid;
		this.selectedStarttime = row.starttime;
		
		this.detailsProgram = row;
		
		//this.$.programsVirtualList.updateRow(this.selectedProgramIndex);
		//this.$.programsVirtualList.updateRow(inEvent.rowIndex);
		
		this.selectedProgramIndex = this.carouselIndex;
		
		this.$.programsVirtualList.refresh();
		
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);

		//this.middleRevealTop();
		
		this.showSlidingPane();
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	showSlidingPane: function() {
		if(debug)	this.log("showSlidingPane");
		
		this.$.guidePane.selectViewByName("slidingPane");
	},
	peopleSelect: function(inSender, inEvent) {
		if(debug) this.log("peopleSelect index "+enyo.json.stringify(this.peopleList[inEvent.rowIndex]));
		
		this.doPersonSelected(this.peopleList[inEvent.rowIndex])	
	},	
	modeClick: function(inSender, inEvent) {
		if(debug) this.log("modeClick");
		
		this.$.modePopupMenu.openAroundControl(inSender);
	},
	modeSelect: function(inSender, inEvent) {
		if(inEvent) {
			if(debug) this.log("modeSelect: "+inEvent.value);
		
			if(inEvent.value == "Channel") {
			
				this.updateModeMenu();
				
				this.bannerMessage("Select a channel using the icon/channel number on the left side of the guide.");
				
			} else if(inEvent.value == "Time") {
				this.currentMode = inEvent.value;
				
				this.$.timePickerPopupMenu.openAtCenter();
			} else {
				this.currentMode = inEvent.value;
				
				this.getGuide();
			}
			
		}
	},
	beforeTimePickerOpen: function() {
		if(debug) this.log("beforeTimePickerOpen");
		
		var timeJS = new Date(isoToJS(this.timeISO));
		
		this.$.guideDatePicker.setValue(timeJS);
		this.$.guideTimePicker.setValue(timeJS);
		
	},
	modeClosed: function() {
		if(debug) this.log("modeClosed");
	},
	leftClick: function(inSender, inEvent) {
		if(debug) this.log("leftClick");
		
		if(this.currentMode == "Channel") {
			var newDate = new Date(this.dayRange.starttimeJS.getTime() - 86400000);
			this.timeISO = dateJSToISO(newDate);
			
			this.getGuide();
			
		} else if(this.viewMode == "phone"){
			var newDate = new Date(this.timeRange.starttimeJS.getTime() - 3600000);
			this.timeISO = dateJSToISO(newDate);
			
			this.currentMode = "Time";
			
			this.getGuide();
			
		} else {
			var newDate = new Date(this.timeRange.starttimeJS.getTime() - 7200000);
			this.timeISO = dateJSToISO(newDate);
			
			this.currentMode = "Time";
			
			this.getGuide();
		}
		
	},
	rightClick: function(inSender, inEvent) {
		if(debug) this.log("rightClick");
		
		if(this.currentMode == "Channel") {
			var newDate = new Date(this.dayRange.starttimeJS.getTime() + 86400000);
			this.timeISO = dateJSToISO(newDate);
			
			this.getGuide();
			
		} else if(this.viewMode == "phone"){
			var newDate = new Date(this.timeRange.starttimeJS.getTime() + 3600000);
			this.timeISO = dateJSToISO(newDate);
			
			this.currentMode = "Time";
			
			this.getGuide();
			
		} else {
			var newDate = new Date(this.timeRange.starttimeJS.getTime() + 7200000);
			this.timeISO = dateJSToISO(newDate);
			
			this.currentMode = "Time";
			
			this.getGuide();
		}
	},
	timePickerSubmit: function() {
		if(debug) this.log("timePickerSubmit");
		
		this.timeISO = "";
		
		var selectedDateISO = dateJSToISO(this.$.guideDatePicker.getValue());
		var selectedTimeISO = dateJSToISO(this.$.guideTimePicker.getValue());
		
		this.timeISO = selectedDateISO.substring(0,10);
		this.timeISO += "T";
		this.timeISO += selectedTimeISO.substring(11,16) + ":00"; 
		
		if(debug) this.log("new timeISO is: "+this.timeISO);
		
		this.$.timePickerPopupMenu.close();
		
		this.getGuide();
		
	},
	playClick: function(inSender, inEvent) {
		if(debug) this.log("playClick");
		
		this.$.playPopupMenu.openAroundControl(this.$.playCommandButton);
	},
	playSelect: function(inSender, inEvent) {
		if(inEvent) {
			if(debug) this.log("playSelect: "+inEvent.value);
			
			var row = this.detailsProgram;
			
			if(debug) this.log("starting playback on frontend: "+inEvent.value);
				
			for(var i = 0; i < WebMyth.prefsCookie.frontends.length; i++) {
				if(inEvent.value == WebMyth.prefsCookie.frontends[i].name) WebMyth.prefsCookie.frontendIndex = parseInt(i);
			}
			
			this.doRemoteCommand("channel",this.detailsProgram.chanid);
			
			if(WebMyth.prefsCookie.livetvJumpRemote) var countdown = setTimeout(enyo.bind(this, "doSelectMode", "remote"), 1000);
		
		}
		
	},
	playClosed: function() {
		if(debug) this.log("playClosed");
	},	
	moreClick: function(inSender, inEvent) {
		if(debug) this.log("moreClick");
		
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
				case "Setup Schedule":
					this.doSetupSchedule(this.detailsProgram);
					break;
				case "Time":
					this.doProgramGuide(this.detailsProgram.starttime);
					break;
				case "Title Search":
					this.doTitleSearch(this.detailsProgram.title);
					break
			}
			
		}
	},
	moreClosed: function() {
		if(debug) this.log("moreClosed");
	},
	
	
	//Upcoming functions
	getGuide: function() {
		if(debug) this.log("getGuide");
		
		//this.$.scrim.show();
		this.$.loadingPopup.openAtCenter();
		this.$.spinnerLarge.show();
		
		var requestUrl = "";
		
		var nowTimeJS = new Date();	//defaults to now
		var nowTimeISO = dateJSToISO(nowTimeJS);
		
		if(WebMyth.prefsCookie.mythwebXml) {
			
			requestUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetProgramGuide?Details=0&MythXMLKey=";
			requestUrl += WebMyth.prefsCookie.MythXML_key;
			
		} else if(WebMyth.prefsCookie.DBSchemaVer > 1269){
			
			requestUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Guide/GetProgramGuide?Details=0";
			
			nowTimeISO = dateJSToISO(dateToUtc(new Date(isoToJS(nowTimeISO.replace(" ","T")))));
			this.timeISO = dateJSToISO(dateToUtc(new Date(isoToJS(this.timeISO.replace(" ","T")))));
								
			
		} else {
			
			requestUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetProgramGuide?";
			
		}
		
		
		this.nowTimeRange = guideTimeRange(nowTimeISO, this.viewMode);
		this.timeRange = guideTimeRange(this.timeISO, this.viewMode);
		
		this.dayRange = guideDayRange(this.timeRange.starttimeISO);
		
		if(WebMyth.prefsCookie.DBSchemaVer > 1269){
			this.dayRange.starttimeISO = dateJSToISO(dateToUtc(new Date(isoToJS(this.dayRange.starttimeISO.replace(" ","T")))));
			this.dayRange.endtimeISO = dateJSToISO(dateToUtc(new Date(isoToJS(this.dayRange.endtimeISO.replace(" ","T")))));
		}
		
		
		if(debug) this.log("time range objects are: "+enyo.json.stringify(this.nowTimeRange)+" and "+enyo.json.stringify(this.timeRange)+" and "+enyo.json.stringify(this.dayRange));
		
			
		if(this.currentMode == "Time") {
			requestUrl += "&StartTime="+this.timeRange.starttimeISO;
			requestUrl += "&EndTime="+this.timeRange.endtimeISO;							
			requestUrl += "&NumOfChannels=10000";							
			//this.$.leftHeaderDetails.setContent(this.timeISO.replace("T"," ").substring(0,16));
			this.$.leftHeaderDetails.setContent(WebMyth.datetimeFormatter.format(new Date(isoToJS(this.timeISO))));
		} else if(this.currentMode == "Now") {
			requestUrl += "&StartTime="+this.nowTimeRange.starttimeISO;
			requestUrl += "&EndTime="+this.nowTimeRange.endtimeISO;							
			requestUrl += "&NumOfChannels=10000";						
			this.timeISO = nowTimeISO;
			//this.$.leftHeaderDetails.setContent("Now");
			this.$.leftHeaderDetails.setContent("Now ["+WebMyth.datetimeFormatter.format(new Date(isoToJS(this.timeISO)))+"]");
		} else if(this.currentMode == "Channel") {
			requestUrl += "&StartTime="+this.dayRange.starttimeISO;							
			requestUrl += "&EndTime="+this.dayRange.endtimeISO;							
			requestUrl += "&NumOfChannels=1";						
			requestUrl += "&NumChannels=1";
			requestUrl += "&StartChanId="+this.chanid;
			//this.$.leftHeaderDetails.setContent("Channel");
			this.$.leftHeaderDetails.setContent("Channel ["+WebMyth.dateFormatter.format(new Date(isoToJS(this.dayRange.starttimeISO)))+"]");
		} else {
			requestUrl += "&StartTime="+this.nowTimeRange.starttimeISO;
			requestUrl += "&EndTime="+this.nowTimeRange.endtimeISO;							
			requestUrl += "&NumOfChannels=10000";							
			this.$.leftHeaderDetails.setContent("Now");
			this.timeISO = nowTimeISO;
			
			this.currentMode = "Now";
		}
		
		
		
		if(debug) this.log("guide requestUrl :"+requestUrl);
		
		
		if(WebMyth.prefsCookie.DBSchemaVer > 1269) {
			nowTimeISO = dateJSToISO(dateFromUtc(new Date(isoToJS(nowTimeISO.replace(" ","T")))));
			this.timeISO = dateJSToISO(dateFromUtc(new Date(isoToJS(this.timeISO.replace(" ","T")))));
			
			//time should always be local after request
			this.nowTimeRange = guideTimeRange(nowTimeISO, this.viewMode);
			this.timeRange = guideTimeRange(this.timeISO, this.viewMode);
			
			
			if(this.currentMode == "Time") {
				this.$.leftHeaderDetails.setContent(WebMyth.datetimeFormatter.format(new Date(isoToJS(this.timeISO))));
			} else if(this.currentMode == "Now") {
				this.$.leftHeaderDetails.setContent("Now ["+WebMyth.datetimeFormatter.format(new Date(isoToJS(this.timeISO)))+"]");
			} else if(this.currentMode == "Channel") {
				this.$.leftHeaderDetails.setContent("Channel ["+WebMyth.dateFormatter.format(new Date(isoToJS(this.dayRange.starttimeISO)))+"]");
			} else {					
				this.$.leftHeaderDetails.setContent("Now");
			}
			
			//this.$.getGuide25Service.setUrl("http://192.168.1.105/dropbox/GetProgramGuide.xml");
			this.$.getGuide25Service.setUrl(requestUrl);
			this.$.getGuide25Service.call();
		} else {
			this.$.getGuideService.setUrl(requestUrl);
			this.$.getGuideService.call();
		}
		
	},
	getGuideResponse: function(inSender, inResponse) {
		//if(debug) this.log("getGuideResponse: "+enyo.json.stringify(inResponse));
		if(debug) this.log("getGuideResponse");
		
		this.fullResultList.length = 0;
		
		var xmlobject = inResponse;
		
		//Local variables
		var topNode, topNodesCount, topSingleNode, programGuideNode, programGuideSingleNode;
		var singleChannelNode, singleChannelChildNode, singleChannelJson;
		var singleProgramNode, singleProgramNode, singleProgramJson;
		var singleProgramChildNode;
		//var starttime, endtime, StartChanId, EndChanId, NumOfChannels, Count, AsOf, Version, ProtoVer;
		var newChannelList = [];
		
		
		//Time used for sorting recent channels
		var nowTimeJS = new Date();	//defaults to now
		var nowTimeISO = dateJSToISO(nowTimeJS);
		
		
		var channelCount = 0;
		var programsList = [];
		
		
		var s = {};
		
		
		if(debug) this.log("About to start parsing guide data");
		
		
		//Start parsing
		topNode = xmlobject.getElementsByTagName("GetProgramGuideResponse")[0];
		var topNodesCount = topNode.childNodes.length;
		for(var i = 0; i < topNodesCount; i++) {
			topSingleNode = topNode.childNodes[i];
			switch(topSingleNode.nodeName) {
				case 'starttime':
					//starttime = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'endtime':
					//endtime = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'StartChanId':
					//StartChanId = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'EndChanId':
					//EndChanId = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'NumOfChannels':
					//NumOfChannels = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'Count':
					//Count = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'AsOf':
					//AsOf = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'Version':
					//Version = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'ProtoVer':
					WebMyth.prefsCookie.protoVer = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'ProgramGuide':
					
					if(debug) this.log('Starting to parse ProgramGuide node');
					
					
					programGuideNode = topSingleNode.childNodes[0];
					for(var j = 0; j < programGuideNode.childNodes.length; j++) {
						programGuideSingleNode = programGuideNode.childNodes[j];
						//if(debug) this.log("node name is "+programGuideSingleNode.nodeName);
						if(programGuideSingleNode.nodeName == 'Channel') {
							//if(debug) this.log('inside channel if');
							singleChannelNode = programGuideSingleNode;
							singleChannelJson = {
								label: singleChannelNode.getAttributeNode("chanNum").nodeValue+": "+singleChannelNode.getAttributeNode("channelName").nodeValue,
								command: "go-channel___"+singleChannelNode.getAttributeNode("chanId").nodeValue+"---"+singleChannelNode.getAttributeNode("chanNum").nodeValue,
								"channumInt": parseInt(singleChannelNode.getAttributeNode("chanNum").nodeValue),
								"channum": singleChannelNode.getAttributeNode("chanNum").nodeValue,
								"channame": singleChannelNode.getAttributeNode("channelName").nodeValue,
								"chanid": singleChannelNode.getAttributeNode("chanId").nodeValue,
								"lastUpdate": ' Earlier'
							}	
							newChannelList.push(singleChannelJson);
							
							for(var k = 0; k < singleChannelNode.childNodes.length; k++) {
								singleChannelChildNode = singleChannelNode.childNodes[k];
								if(singleChannelChildNode.nodeName == 'Program') {
									singleProgramJson = {
										"channame": singleChannelNode.getAttributeNode("channelName").nodeValue, 
										"chanid": singleChannelNode.getAttributeNode("chanId").nodeValue, 
										"channum": singleChannelNode.getAttributeNode("chanNum").nodeValue, 
										"channumInt": parseInt(singleChannelNode.getAttributeNode("chanNum").nodeValue), 
										"callsign": singleChannelNode.getAttributeNode("callSign").nodeValue, 
										"title": singleChannelChildNode.getAttributeNode("title").nodeValue, 
										"subtitle": singleChannelChildNode.getAttributeNode("subTitle").nodeValue, 
										//"programFlags": singleChannelChildNode.getAttributeNode("programFlags").nodeValue, 
										"category": singleChannelChildNode.getAttributeNode("category").nodeValue, 
										//"fileSize": singleChannelChildNode.getAttributeNode("fileSize").nodeValue, 
										//"seriesId": singleChannelChildNode.getAttributeNode("seriesId").nodeValue, 
										//"hostname": singleChannelChildNode.getAttributeNode("hostname").nodeValue, 
										"catType": singleChannelChildNode.getAttributeNode("catType").nodeValue, 
										//"programId": singleChannelChildNode.getAttributeNode("programId").nodeValue, 
										//"repeat": singleChannelChildNode.getAttributeNode("repeat").nodeValue, 
					//					"stars": singleChannelChildNode.getAttributeNode("stars").nodeValue, 
										"endtime": singleChannelChildNode.getAttributeNode("endTime").nodeValue, 
					//					"airdate": singleChannelChildNode.getAttributeNode("airdate").nodeValue, 
										"starttime": singleChannelChildNode.getAttributeNode("startTime").nodeValue,
										//"lastModified": singleChannelChildNode.getAttributeNode("lastModified").nodeValue, 
										"starttimeHourMinute": singleChannelChildNode.getAttributeNode("startTime").nodeValue.substring(11,16),
										"endtimeHourMinute": singleChannelChildNode.getAttributeNode("endTime").nodeValue.substring(11,16),
										"lastUpdate": ' Earlier',
										"recstatus": "-20"
									}
									if(singleProgramJson.chanNumInt == NaN) singleProgramJson.chanNumInt = 0;
									
									try {
										//singleProgramJson.airdate = singleChannelChildNode.getAttributeNode("airdate").nodeValue;
										//singleProgramJson.stars = singleChannelChildNode.getAttributeNode("stars").nodeValue; 
									} catch(e) {
										//singleProgramJson.airdate = "";
										//singleProgramJson.stars = ""; 
									}
									
									
									//singleProgramJson.description = "";
									
									for(var l = 0; l < singleChannelChildNode.childNodes.length; l++) {
										singleProgramChildNode = singleChannelChildNode.childNodes[l];
										
										if(l == 0) singleProgramJson.description = singleProgramChildNode.nodeValue;
										
										if(singleProgramChildNode.nodeName == "Recording") {
											singleProgramJson.recpriority = singleProgramChildNode.getAttributeNode("recPriority").nodeValue;
											//singleProgramJson.playGroup = singleProgramChildNode.getAttributeNode("playGroup").nodeValue;
											singleProgramJson.recstatus = singleProgramChildNode.getAttributeNode("recStatus").nodeValue;
											singleProgramJson.recstartts = singleProgramChildNode.getAttributeNode("recStartTs").nodeValue;
											//singleProgramJson.recGroup = singleProgramChildNode.getAttributeNode("recGroup").nodeValue;
											//singleProgramJson.dupMethod = singleProgramChildNode.getAttributeNode("dupMethod").nodeValue;
											//singleProgramJson.recType = singleProgramChildNode.getAttributeNode("recType").nodeValue;
											//singleProgramJson.encoderId = singleProgramChildNode.getAttributeNode("encoderId").nodeValue;
											//singleProgramJson.recProfile = singleProgramChildNode.getAttributeNode("recProfile").nodeValue;
											singleProgramJson.recendts = singleProgramChildNode.getAttributeNode("recEndTs").nodeValue;
											//singleProgramJson.recordId = singleProgramChildNode.getAttributeNode("recordId").nodeValue;
											//singleProgramJson.dupInType = singleProgramChildNode.getAttributeNode("dupInType").nodeValue;
										}
									}
									
									
									singleProgramJson.recstatusText = recstatusDecode(singleProgramJson.recstatus);
									
									//this.fullResultList[channelCount].push(singleProgramJson);
									programsList.push(singleProgramJson);
									
									//if(debug) this.log("program "+k+" json is %j", singleProgramJson);
								}
							}
							
							programsList.sort(sort_by("starttime", false));
							
							this.fullResultList[channelCount] = programsList.concat([]);
							
							programsList.length = 0;
							
							channelCount++;
						}
					}
					
					//if(debug) this.log('Done parsing ProgramGuide');
					
					//if(debug) this.log("full json is: ", enyo.json.stringify(this.fullResultList));
					//if(debug) this.log("channels json is %j", this.channelList);
					
					/*
					if((this.channelList.length == 0)&&(newChannelList.length>0)) {
						if(debug) this.log("Didn't find any channels - adding now");
						this.channelList = newChannelList;
						
						this.channelList.sort(sort_by('channumInt', false));
						
						this.updateChannelListCookie();
						
					} 
					
					if(debug) this.log("Finished updating channels (if needed)");
					
					*/
					
					
					break;
				default:
					//if(debug) this.log("node name is "+topSingleNode.nodeName);
					break;
			}
		}
		
		
		if(debug) this.log("completed upcoming parsing with "+this.fullResultList.length+" total channels");
		
		this.$.errorMessage.setContent("");
		
		this.finishedGettingGuide();
		
	},
	getGuideFailure: function(inSender, inResponse) {
		this.error("getGuideFailure");
		
		this.$.errorMessage.setContent("ERROR: Failed to get list of upcoming programs from backend at '"+WebMyth.prefsCookie.masterBackendIp+"'");
		
		this.finishedGettingGuide();
	},
	getGuide25Response: function(inSender, inResponse) {
		//if(debug) this.log("getGuide25Response: "+enyo.json.stringify(inResponse));
		if(debug) this.log("getGuide25Response");
		
		this.fullResultList.length = 0;
		
		var xmlobject = inResponse;
		
		//Local variables
		var topNode, topNodesCount, topSingleNode, channelsNode, programGuideSingleNode;
		var singleChannelNode, singleChannelChildNode, singleChannelJson;
		var programsNode, singleProgramNode, singleProgramJson;
		var singleProgramChildNode, singleRecordingChildNode;
		//var starttime, endtime, StartChanId, EndChanId, NumOfChannels, Count, AsOf, Version, ProtoVer;
		var newChannelList = [];
		
		
		//Time used for sorting recent channels
		var nowTimeJS = new Date();	//defaults to now
		var nowTimeISO = dateJSToISO(nowTimeJS);
		
		
		var channelCount = 0;
		var programsList = [];
		
		
		var s = {};
		
		
		if(debug) this.log("About to start parsing guide data");
		
		
		//Start parsing
		topNode = xmlobject.getElementsByTagName("ProgramGuide")[0];
		var topNodesCount = topNode.childNodes.length;
		for(var i = 0; i < topNodesCount; i++) {
			topSingleNode = topNode.childNodes[i];
			switch(topSingleNode.nodeName) {
				case 'StartTime':
					//starttime = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'EndTime':
					//endtime = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'StartChanId':
					//StartChanId = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'EndChanId':
					//EndChanId = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'NumOfChannels':
					//NumOfChannels = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'Count':
					//Count = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'AsOf':
					//AsOf = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'Version':
					//Version = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'ProtoVer':
					var protoVer = topSingleNode.childNodes[0].nodeValue;
						
					if(WebMyth.prefsCookie.protoVer != protoVer) WebMyth.prefsCookie.protoVerSubmitted = false;
						
					WebMyth.prefsCookie.protoVer = protoVer;
					break;
				case 'Channels':
					
					if(debug) this.log('Starting to parse Channels node');
					
					
					channelsNode = topSingleNode;
					for(var j = 0; j < channelsNode.childNodes.length; j++) {
						programGuideSingleNode = channelsNode.childNodes[j];
						if(debug) this.log("node name is "+programGuideSingleNode.nodeName);
						if(programGuideSingleNode.nodeName == 'ChannelInfo') {
							if(debug) this.log('inside ChannelInfo');
							singleChannelNode = programGuideSingleNode;
							
							singleChannelJson = {};
							
							for(var k = 0; k < singleChannelNode.childNodes.length; k++) {
								singleChannelChildNode = singleChannelNode.childNodes[k];
								
								//if(debug) this.log("singleChannelChildNode.nodeName: "+singleChannelChildNode.nodeName);
								
								switch(singleChannelChildNode.nodeName) {
									case "ChanId":
										if(singleChannelChildNode.childNodes[0]) singleChannelJson.chanid = singleChannelChildNode.childNodes[0].nodeValue;
										break;
									case "ChanNum":
										if(singleChannelChildNode.childNodes[0]) singleChannelJson.channum = singleChannelChildNode.childNodes[0].nodeValue;
										if(singleChannelChildNode.childNodes[0]) singleChannelJson.channumInt = parseInt(singleChannelChildNode.childNodes[0].nodeValue);
										break;	
									case "ChannelName":
										if(singleChannelChildNode.childNodes[0]) singleChannelJson.channame = singleChannelChildNode.childNodes[0].nodeValue;
										break;
									case "CallSign":
										if(singleChannelChildNode.childNodes[0]) singleChannelJson.callsign = singleChannelChildNode.childNodes[0].nodeValue;
										break;
									case "Programs":
										for(var l = 0; l < singleChannelChildNode.childNodes.length; l++) {
											if(singleChannelChildNode.childNodes[l].nodeName == "Program") {
												singleProgramJson = {};
												
												singleProgramNode = singleChannelChildNode.childNodes[l];
												
												singleProgramJson.chanid = singleChannelJson.chanid;
												singleProgramJson.channum = singleChannelJson.channum;
												singleProgramJson.channumInt = singleChannelJson.channumInt;
												singleProgramJson.channame = singleChannelJson.channame;
												singleProgramJson.callsign = singleChannelJson.callsign;
												
												singleProgramJson.recpriority = 0;
												singleProgramJson.recstatus = 0;
												singleProgramJson.recstartts = "1900-01-01T00:00:00";
												singleProgramJson.recendts = "1900-01-01T00:00:00";
												
												for(var m = 0; m < singleProgramNode.childNodes.length; m++) {
													singleProgramChildNode = singleProgramNode.childNodes[m];
													
													switch(singleProgramChildNode.nodeName) {
														case "StartTime":
															if(singleProgramChildNode.childNodes[0]) singleProgramJson.starttimeutc = singleProgramChildNode.childNodes[0].nodeValue;
															break;
														case "EndTime":
															if(singleProgramChildNode.childNodes[0]) singleProgramJson.endtimeutc = singleProgramChildNode.childNodes[0].nodeValue;
															break;
														case "Title":
															if(singleProgramChildNode.childNodes[0]) singleProgramJson.title = singleProgramChildNode.childNodes[0].nodeValue;
															break;
														case "Category":
															if(singleProgramChildNode.childNodes[0]) singleProgramJson.category = singleProgramChildNode.childNodes[0].nodeValue;
															break;
														case "CatType":
															if(singleProgramChildNode.childNodes[0]) singleProgramJson.cattype = singleProgramChildNode.childNodes[0].nodeValue;
															break;
														case "Repeat":
															if(singleProgramChildNode.childNodes[0]) singleProgramJson.repeat = singleProgramChildNode.childNodes[0].nodeValue;
															break;
														case "Recording":
															for(var n = 0; n < singleProgramChildNode.childNodes.length; n++) {
																singleRecordingChildNode = singleProgramChildNode.childNodes[n];
																
																switch(singleRecordingChildNode.nodeName) {
																	case "Status":
																		if(singleRecordingChildNode.childNodes[0]) singleProgramJson.recstatus = singleRecordingChildNode.childNodes[0].nodeValue;
																		break;
																	case "Priority":
																		if(singleRecordingChildNode.childNodes[0]) singleProgramJson.recpriority = singleRecordingChildNode.childNodes[0].nodeValue;
																		break;
																	case "StartTs":
																		if(singleRecordingChildNode.childNodes[0]) singleProgramJson.recstarttsutc = singleRecordingChildNode.childNodes[0].nodeValue;
																		if(singleRecordingChildNode.childNodes[0]) singleProgramJson.recstartts = dateJSToISO(dateFromUtc(new Date(isoToJS(singleProgramJson.recstarttsutc.replace(" ","T")))));
																		break;
																	case "EndTs":
																		if(singleRecordingChildNode.childNodes[0]) singleProgramJson.recendts = singleRecordingChildNode.childNodes[0].nodeValue;
																		break;
																}
															}
															
															
															break;
													}
												}
												
												singleProgramJson.starttime = dateJSToISO(dateFromUtc(new Date(isoToJS(singleProgramJson.starttimeutc.replace(" ","T")))));
												singleProgramJson.endtime = dateJSToISO(dateFromUtc(new Date(isoToJS(singleProgramJson.endtimeutc.replace(" ","T")))));
								
												
												singleProgramJson.recstatusText = recstatusDecode(singleProgramJson.recstatus);
									
												programsList.push(singleProgramJson);
											}
										}
										break;
								}
							}
								
							
							programsList.sort(sort_by("starttime", false));
							
							this.fullResultList[channelCount] = programsList.concat([]);
						
							programsList.length = 0;
						
							channelCount++;
							
						}
					}
					
					//if(debug) this.log('Done parsing ProgramGuide');
					
					if(debug) this.log("full json is: ", enyo.json.stringify(this.fullResultList));
					//if(debug) this.log("channels json is %j", this.channelList);
					
					/*
					if((this.channelList.length == 0)&&(newChannelList.length>0)) {
						if(debug) this.log("Didn't find any channels - adding now");
						this.channelList = newChannelList;
						
						this.channelList.sort(sort_by('channumInt', false));
						
						this.updateChannelListCookie();
						
					} 
					
					if(debug) this.log("Finished updating channels (if needed)");
					
					*/
					
					
					break;
				default:
					//if(debug) this.log("node name is "+topSingleNode.nodeName);
					break;
			}
		}
		
		
		if(debug) this.log("completed upcoming parsing with "+this.fullResultList.length+" total channels");
		
		this.$.errorMessage.setContent("");
		
		this.finishedGettingGuide();
	},
	getGuide25Failure: function(inSender, inResponse) {
		this.error("getGuide25Failure");
		
		this.$.errorMessage.setContent("ERROR: Failed to get list of upcoming programs from backend at '"+WebMyth.prefsCookie.masterBackendIp+"'");
		
		this.finishedGettingGuide();
	},
	finishedGettingGuide: function() {
		if(debug) this.log("finishedGettingGuide");
		
		this.resize(this.viewMode);
		
		this.updateModeMenu();
		
		if(this.currentMode == "Now") {
			this.timeRange = this.nowTimeRange;
		}
		
		if(this.currentMode == "Channel") {
			
			this.$.topGuideTimeLabelRow.hide();
			this.$.guideTimeVirtualList.hide();
			this.$.topGuideChannelLabelRow.show();
			this.$.guideChannelVirtualList.show();
			
			this.$.guideChannelVirtualList.resized();
			
			this.$.guideChannelVirtualList.punt();
			
		} else {
		
			this.$.topGuideTimeLabelRow.show();
			this.$.guideTimeVirtualList.show();
			this.$.topGuideChannelLabelRow.hide();
			this.$.guideChannelVirtualList.hide();
			
			this.$.guideTimeVirtualList.resized();
		
			this.fullResultList.sort(guide_sort_by("channumInt", false));	
			
			this.$.guideTimeVirtualList.punt();
			
			if(this.currentMode == "Now") {
				var tempTime0 = new Date(isoToJS(this.nowTimeRange.starttimeISO));
				var tempTime1 = new Date(tempTime0.getTime() + 1800000);
				var tempTime2 = new Date(tempTime0.getTime() + 3600000);
				var tempTime3 = new Date(tempTime0.getTime() + 5400000);
				
				this.$.guideLabel0.setContent(dateJSToISO(tempTime0).substring(11,16));
				this.$.guideLabel1.setContent(dateJSToISO(tempTime1).substring(11,16));
				this.$.guideLabel2.setContent(dateJSToISO(tempTime2).substring(11,16));
				this.$.guideLabel3.setContent(dateJSToISO(tempTime3).substring(11,16));
			} else if(this.currentMode == "Time") {
				var tempTime0 = new Date(isoToJS(this.timeRange.starttimeISO));
				var tempTime1 = new Date(tempTime0.getTime() + 1800000);
				var tempTime2 = new Date(tempTime0.getTime() + 3600000);
				var tempTime3 = new Date(tempTime0.getTime() + 5400000);
				
				this.$.guideLabel0.setContent(dateJSToISO(tempTime0).substring(11,16));
				this.$.guideLabel1.setContent(dateJSToISO(tempTime1).substring(11,16));
				this.$.guideLabel2.setContent(dateJSToISO(tempTime2).substring(11,16));
				this.$.guideLabel3.setContent(dateJSToISO(tempTime3).substring(11,16));
			}  
			
			if(this.viewMode == "tablet") {
				this.$.guideLabel2.show();
				this.$.guideLabel3.show(); 
			} else {
				this.$.guideLabel2.hide();
				this.$.guideLabel3.hide(); 
			}
			
		}
			
		this.detailsProgram = defaultProgram;
		this.selectedChanid = "";
		this.selectedStarttime = "";
		this.selectedProgramIndex = -1;
		setTimeout(enyo.bind(this,"showDetails"),1);
			
		
		this.$.loadingPopup.close();
		enyo.scrim.hide();
		
	},
	getGuideTimeItem: function(inSender, inIndex) {
		var row = this.fullResultList[inIndex];
		
		var column = [];
		
		if(row) {
		
			//var channelGuidePrograms = [];
			
			//this.$.date.setContent(row.label);
			this.$.channelTimeTitle.setContent(row[0].channum);
			
			var iconUrl = "";
			
			if(WebMyth.prefsCookie.mythwebXml) {
			
				iconUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetChannelIcon?MythXMLKey=";
				iconUrl += WebMyth.prefsCookie.MythXML_key+"&ChanId=";
				
			} else if(WebMyth.prefsCookie.DBSchemaVer > 1269){
			
				iconUrl = "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Guide/GetChannelIcon?ChanId=";
				
			} else {
			
				iconUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetChannelIcon?ChanId=";
				
			}
		
			iconUrl += row[0].chanid;
			
			if(WebMyth.prefsCookie.showChannelIcons) {
				this.$.channelTimeTitleIcon.setSrc(iconUrl);
				this.$.channelTimeTitleIcon.show();
			} else {
				this.$.channelTimeTitleIcon.hide();
			}
			
			
			//if(debug) this.log("getGuideTimeItem row: "+enyo.json.stringify(row));
			
			column.length = 0;
			
			this.$.guideProgram0.hide();
			this.$.guideProgram1.hide();
			this.$.guideProgram2.hide();
			this.$.guideProgram3.hide();
			this.$.guideProgram4.hide();
			this.$.guideProgram5.hide();
			this.$.guideProgram6.hide();
			this.$.guideProgram7.hide();
			this.$.guideProgram8.hide();
			
			for(var i = 0; i < row.length; i++) {
		
				column = row[i];
				
				switch(i) {
					case 0:
						this.$.guideProgram0.show();
						this.$.guideProgramTitle0.setContent(column.title);
						this.$.guideProgramSubtitle0.setContent(column.subtitle);
						
						this.$.guideProgram0.addClass("recstatus_"+column.recstatus);
						
						if(column.endtime.substring(0,16) > this.timeRange.trueendtimeISO.substring(0,16)) {
							//this.$.guideProgramTitle0.setContent("&lt;&lt;"+column.title+"&gt;&gt;");
							this.$.guidePreviousWrapper.addClass("activated");
						} else if(column.starttime.substring(0,16) < this.timeRange.starttimeISO.substring(0,16)) {
							this.$.guideProgram0.addClass("length-"+isoTimeDifference(this.timeRange.starttimeISO,column.endtime));
							//this.$.guideProgramTitle0.setContent("&lt;&lt;"+column.title);
							this.$.guidePreviousWrapper.addClass("activated");
							//add previous indicator
						} else {
							this.$.guideProgram0.addClass("length-"+isoTimeDifference(column.starttime,column.endtime));
						}
						
						break;
					case 1:
						this.$.guideProgram1.show();
						this.$.guideProgramTitle1.setContent(column.title);
						this.$.guideProgramSubtitle1.setContent(column.subtitle);
						
						this.$.guideProgram1.addClass("recstatus_"+column.recstatus);
						
						if(column.endtime.substring(0,16) > this.timeRange.trueendtimeISO.substring(0,16)) {
							this.$.guideProgram1.addClass("length-"+isoTimeDifference(column.starttime,this.timeRange.trueendtimeISO));
							//this.$.guideProgramTitle1.setContent(column.title+"&gt;&gt;");
							this.$.guideNextWrapper.addClass("activated");
							//add end later indicator
						} else {
							this.$.guideProgram1.addClass("length-"+isoTimeDifference(column.starttime,column.endtime));
						}
						
						break;
					case 2:
						this.$.guideProgram2.show();
						this.$.guideProgramTitle2.setContent(column.title);
						this.$.guideProgramSubtitle2.setContent(column.subtitle);
						
						this.$.guideProgram2.addClass("recstatus_"+column.recstatus);
						
						if(column.endtime.substring(0,16) > this.timeRange.trueendtimeISO.substring(0,16)) {
							this.$.guideProgram2.addClass("length-"+isoTimeDifference(column.starttime,this.timeRange.trueendtimeISO));
							//this.$.guideProgramTitle2.setContent(column.title+"&gt;&gt;");
							this.$.guideNextWrapper.addClass("activated");
							//add end later indicator
						} else {
							this.$.guideProgram2.addClass("length-"+isoTimeDifference(column.starttime,column.endtime));
						}
						
						break;
					case 3:
						this.$.guideProgram3.show();
						this.$.guideProgramTitle3.setContent(column.title);
						this.$.guideProgramSubtitle3.setContent(column.subtitle);
						
						this.$.guideProgram3.addClass("recstatus_"+column.recstatus);
						
						if(column.endtime.substring(0,16) > this.timeRange.trueendtimeISO.substring(0,16)) {
							this.$.guideProgram3.addClass("length-"+isoTimeDifference(column.starttime,this.timeRange.trueendtimeISO));
							//this.$.guideProgramTitle3.setContent(column.title+"&gt;&gt;");
							this.$.guideNextWrapper.addClass("activated");
							//add end later indicator
						} else {
							this.$.guideProgram3.addClass("length-"+isoTimeDifference(column.starttime,column.endtime));
						}
						
						break;
					case 4:
						this.$.guideProgram4.show();
						this.$.guideProgramTitle4.setContent(column.title);
						this.$.guideProgramSubtitle4.setContent(column.subtitle);
						
						this.$.guideProgram4.addClass("recstatus_"+column.recstatus);
						
						if(column.endtime.substring(0,16) > this.timeRange.trueendtimeISO.substring(0,16)) {
							this.$.guideProgram4.addClass("length-"+isoTimeDifference(column.starttime,this.timeRange.trueendtimeISO));
							//this.$.guideProgramTitle4.setContent(column.title+"&gt;&gt;");
							this.$.guideNextWrapper.addClass("activated");
							//add end later indicator
						} else {
							this.$.guideProgram4.addClass("length-"+isoTimeDifference(column.starttime,column.endtime));
						}
						
						break;
					case 5:
						this.$.guideProgram5.show();
						this.$.guideProgramTitle5.setContent(column.title);
						this.$.guideProgramSubtitle5.setContent(column.subtitle);
						
						this.$.guideProgram5.addClass("recstatus_"+column.recstatus);
						
						if(column.endtime.substring(0,16) > this.timeRange.trueendtimeISO.substring(0,16)) {
							this.$.guideProgram5.addClass("length-"+isoTimeDifference(column.starttime,this.timeRange.trueendtimeISO));
							//this.$.guideProgramTitle5.setContent(column.title+"&gt;&gt;");
							this.$.guideNextWrapper.addClass("activated");
							//add end later indicator
						} else {
							this.$.guideProgram5.addClass("length-"+isoTimeDifference(column.starttime,column.endtime));
						}
						
						break;
					case 6:
						this.$.guideProgram6.show();
						this.$.guideProgramTitle6.setContent(column.title);
						this.$.guideProgramSubtitle6.setContent(column.subtitle);
						
						this.$.guideProgram6.addClass("recstatus_"+column.recstatus);
						
						if(column.endtime.substring(0,16) > this.timeRange.trueendtimeISO.substring(0,16)) {
							this.$.guideProgram6.addClass("length-"+isoTimeDifference(column.starttime,this.timeRange.trueendtimeISO));
							//this.$.guideProgramTitle6.setContent(column.title+"&gt;&gt;");
							this.$.guideNextWrapper.addClass("activated");
							//add end later indicator
						} else {
							this.$.guideProgram6.addClass("length-"+isoTimeDifference(column.starttime,column.endtime));
						}
						
						break;
					case 7:
						this.$.guideProgram7.show();
						this.$.guideProgramTitle7.setContent(column.title);
						this.$.guideProgramSubtitle7.setContent(column.subtitle);
						
						this.$.guideProgram7.addClass("recstatus_"+column.recstatus);
						
						if(column.endtime.substring(0,16) > this.timeRange.trueendtimeISO.substring(0,16)) {
							this.$.guideProgram7.addClass("length-"+isoTimeDifference(column.starttime,this.timeRange.trueendtimeISO));
							//this.$.guideProgramTitle7.setContent(column.title+"&gt;&gt;");
							this.$.guideNextWrapper.addClass("activated");
							//add end later indicator
						} else {
							this.$.guideProgram7.addClass("length-"+isoTimeDifference(column.starttime,column.endtime));
						}
						
						break;
					case 8:
						this.$.guideProgram8.show();
						this.$.guideProgramTitle8.setContent(column.title);
						this.$.guideProgramSubtitle8.setContent(column.subtitle);
						
						this.$.guideProgram8.addClass("recstatus_"+column.recstatus);
						
						if(column.endtime.substring(0,16) > this.timeRange.trueendtimeISO.substring(0,16)) {
							this.$.guideProgram8.addClass("length-"+isoTimeDifference(column.starttime,this.timeRange.trueendtimeISO));
							//this.$.guideProgramTitle8.setContent(column.title+"&gt;&gt;");
							this.$.guideNextWrapper.addClass("activated");
							//add end later indicator
						} else {
							this.$.guideProgram8.addClass("length-"+isoTimeDifference(column.starttime,column.endtime));
						}
						
						break;
				}
			}
			
			//this.$.guidePrograms.setComponents(channelGuidePrograms);
		
			return true;
		}
		
	},
	getGuideChannelItem: function(inSender, inIndex) {
		var row = this.fullResultList[0];
		var column = row[inIndex];
		
		if(inIndex == 0) {
		
			var iconUrl = "";
			
			if(WebMyth.prefsCookie.mythwebXml) {
			
				iconUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetChannelIcon?MythXMLKey=";
				iconUrl += WebMyth.prefsCookie.MythXML_key+"&ChanId=";
				
			} else if(WebMyth.prefsCookie.DBSchemaVer > 1269){
			
				iconUrl = "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Guide/GetChannelIcon?ChanId=";
				
			} else {
			
				iconUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetChannelIcon?ChanId=";
			}
			
			iconUrl += row[0].chanid;
			
			
			if(WebMyth.prefsCookie.showChannelIcons) {
				this.$.guideLabelChannelIcon.setSrc(iconUrl);
				this.$.guideLabelChannelIcon.show();
			} else {
				this.$.guideLabelChannelIcon.hide();
			}
		
			//this.$.guideLabelChannelTitle.setContent(row[0].channum + " - " + row[0].channame + " ["+WebMyth.dateFormatter.format(new Date(isoToJS(this.dayRange.starttimeISO)))+"]");
			this.$.guideLabelChannelTitle.setContent(row[0].channum + " - " + row[0].channame);
			
		}
			
		if(column) {
		
			this.$.channelProgramTitle.setContent(column.title);
			this.$.channelProgramSubtitle.setContent(column.subtitle);
			
			this.$.channelProgram.addClass("recstatus_"+column.recstatus);
						
			this.$.channelTimeStart.setContent(column.starttime.substring(11,16));
			this.$.channelTimeEnd.setContent(column.endtime.substring(11,16));
			
			return true;
		}
	},
	showDetails: function() {
		if(debug) this.log("showDetails");
		
		var row = {};
		
		if(this.selectedChanid == "") {
			this.detailsProgram = defaultProgram;
			
			row = this.detailsProgram;
			
			this.$.rightDetailsChannelIconWrapper.hide();
			
			this.$.playCommandButton.hide();
			this.$.moreCommandButton.hide();
			
			this.$.rightCommandMenu.render();
			
			this.$.recStatusText.hide();
			
			this.$.rightHeaderTitle.setContent("Details");
			
		} else {
			
			row = this.detailsProgram;
			
			var requestUrl = "";
			
			if(WebMyth.prefsCookie.mythwebXml) {
			
				requestUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetProgramDetails?Details=1&MythXMLKey=";
				requestUrl += WebMyth.prefsCookie.MythXML_key;
				requestUrl += "&StartTime=";
				requestUrl += row.starttime.replace(" ","T");
					
			} else if(WebMyth.prefsCookie.DBSchemaVer > 1269){
			
				requestUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Guide/GetProgramDetails?StartTime=";
				requestUrl += row.starttimeutc.replace(" ","T");
				
			} else {
				
				requestUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetProgramDetails?StartTime=";
				requestUrl += row.starttime.replace(" ","T");
				
			}
				
			requestUrl += "&ChanId=";
			requestUrl += row.chanid;

			if(debug) this.log("XML details URL is: "+requestUrl);
			
			this.$.rightDetailsChannelIconWrapper.show();
				
			//this.$.rightDetailsSpinnerWrapper.show();
			this.$.rightDetailsChannelIcon.hide();
			this.$.detailsSpinner.show();
			
			if(WebMyth.prefsCookie.DBSchemaVer > 1269) {
				//this.$.getProgramDetails25Service.setUrl("http://192.168.1.105/dropbox/GetProgramDetails.xml");
				this.$.getProgramDetails25Service.setUrl(requestUrl);
				this.$.getProgramDetails25Service.call();
			} else {
				this.$.getProgramDetailsService.setUrl(requestUrl);
				this.$.getProgramDetailsService.call();
			}
			
			if(WebMyth.prefsCookie.showChannelIcons) {
		
				var iconUrl = "";
			
				if(WebMyth.prefsCookie.mythwebXml) {
		
					iconUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetChannelIcon?MythXMLKey=";
					iconUrl += WebMyth.prefsCookie.MythXML_key+"&ChanId=";
					
				} else if(WebMyth.prefsCookie.DBSchemaVer > 1269){
			
					iconUrl = "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Guide/GetChannelIcon?ChanId=";
					
				} else {
					iconUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetChannelIcon?ChanId=";
				}
				
				iconUrl += row.chanid;
				
			
				this.$.rightDetailsChannelIcon.setSrc(iconUrl);
				//this.$.rightDetailsChannelIconWrapper.show();
				
			} else {
				//this.$.rightDetailsChannelIconWrapper.hide();
			}
			
			this.$.playCommandButton.show();
			this.$.moreCommandButton.show();
			
			this.$.rightCommandMenu.render();
			
			this.$.rightHeaderTitle.setContent(row.title);
		
			var nowDate = new Date();
			var nowTimeISO = dateJSToISO(nowDate);
			
			if(row.recstatus == -2) {
				this.$.recStatusText.setContent("Currently Recording");
				this.$.recStatusText.show();
			} else if(row.endtime.replace(" ","T") < nowTimeISO.replace(" ","T")) {
				this.$.recStatusText.setContent("In the Past");
				this.$.recStatusText.show();
			} else {
				this.$.recStatusText.hide();
			} 
			
			this.$.peopleSpinnerItem.show();
			
			this.getPeople();
			
		}
			
			
		this.$.subtitle.setContent(row.subtitle);
		this.$.detailsDescription.setContent("");
		this.$.category.setContent(row.category);
		this.$.recstatus.setContent("");
		
		this.$.airdate.setContent("");
		this.$.seriesid.setContent("");
		this.$.programid.setContent("");
		this.$.channum.setContent(row.channum);
		this.$.channame.setContent(row.channame);
		
		this.$.starttime.setContent(row.starttime.replace("T"," "));
		this.$.endtime.setContent(row.endtime.replace("T"," "));
		
		//this.$.rightDetails.setContent(enyo.json.stringify(row));
		
		this.rightRevealTop();
		
	},
	getProgramDetailsResponse: function(inSender, inResponse) {
		if(debug) this.log("getProgramDetailsResponse");
		
		var xmlobject = inResponse;
		
			
		//Local variables
		var topNode, topNodesCount, topSingleNode, programDetailsNode;
		var programNode, programChildNode;
		
		
		var s = {};
		
		//Start parsing
		topNode = xmlobject.getElementsByTagName("GetProgramDetailsResponse")[0];
		var topNodesCount = topNode.childNodes.length;
		for(var i = 0; i < topNodesCount; i++) {
			topSingleNode = topNode.childNodes[i];
			switch(topSingleNode.nodeName) {
				case 'StartTime':
					//StartTime = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'ChanId':
					//ChanId = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'Count':
					//Count = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'AsOf':
					//AsOf = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'Version':
					//Version = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'ProtoVer':
					//ProtoVer = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'ProgramDetails':
					if(debug) this.log('Starting to parse ProgramDetails');
					programNode = topSingleNode.childNodes[0];
					
					s = {
						"title": programNode.getAttributeNode("title").nodeValue, 
						"subtitle": programNode.getAttributeNode("subTitle").nodeValue, 
						"programflags": programNode.getAttributeNode("programFlags").nodeValue, 
						"category": programNode.getAttributeNode("category").nodeValue, 
						"filesize": programNode.getAttributeNode("fileSize").nodeValue, 
						"seriesid": programNode.getAttributeNode("seriesId").nodeValue, 
						"hostname": programNode.getAttributeNode("hostname").nodeValue, 
						"cattype": programNode.getAttributeNode("catType").nodeValue, 
						"programid": programNode.getAttributeNode("programId").nodeValue, 
						"repeat": programNode.getAttributeNode("repeat").nodeValue, 
					//	"stars": programNode.getAttributeNode("stars").nodeValue, 
						"endtime": programNode.getAttributeNode("endTime").nodeValue, 
					//	"airdate": programNode.getAttributeNode("airdate").nodeValue, 
						"starttime": programNode.getAttributeNode("startTime").nodeValue,
						"lastmodified": programNode.getAttributeNode("lastModified").nodeValue
					};
					
					try {
						s.stars = programNode.getAttributeNode("stars").nodeValue;
						s.airdate = programNode.getAttributeNode("airdate").nodeValue;
					} catch(e) {
						if(debug) this.log("Error with getting airdate and stars");
						s.stars = "";
						s.airdate = "";
					}
					
					for(var j = 0; j < programNode.childNodes.length; j++) {
						programChildNode = programNode.childNodes[j];
						//if(debug) this.log("Node name is "+programChildNode.nodeName);
						
						if(j == 0) s.description = programChildNode.nodeValue;
										
						if(programChildNode.nodeName == 'Channel') {
							//if(debug) this.log('Inside channel if');

							s.inputid = programChildNode.getAttributeNode("inputId").nodeValue;
							s.chanfilters = programChildNode.getAttributeNode("chanFilters").nodeValue;
							s.commfree = programChildNode.getAttributeNode("commFree").nodeValue;
							s.channame = programChildNode.getAttributeNode("channelName").nodeValue;
							s.sourceId = programChildNode.getAttributeNode("sourceId").nodeValue;
							s.chanid = programChildNode.getAttributeNode("chanId").nodeValue;
							s.channum = programChildNode.getAttributeNode("chanNum").nodeValue;
							s.callsign = programChildNode.getAttributeNode("callSign").nodeValue;
						}
						
										
						if(programChildNode.nodeName == "Recording") {
							//if(debug) this.log('Inside recording if');
							
							s.recpriority = programChildNode.getAttributeNode("recPriority").nodeValue;
							s.playgroup = programChildNode.getAttributeNode("playGroup").nodeValue;
							s.recstatus = programChildNode.getAttributeNode("recStatus").nodeValue;
							s.recstartts = programChildNode.getAttributeNode("recStartTs").nodeValue;
							s.recgroup = programChildNode.getAttributeNode("recGroup").nodeValue;
							s.dupmethod = programChildNode.getAttributeNode("dupMethod").nodeValue;
							s.rectype = programChildNode.getAttributeNode("recType").nodeValue;
							s.encoderid = programChildNode.getAttributeNode("encoderId").nodeValue;
							s.recprofile = programChildNode.getAttributeNode("recProfile").nodeValue;
							s.recendts = programChildNode.getAttributeNode("recEndTs").nodeValue;
							s.recordid = programChildNode.getAttributeNode("recordId").nodeValue;
							s.dupInType = programChildNode.getAttributeNode("dupInType").nodeValue;
							
							
							s.recstatustext = recstatusDecode(s.recstatus);
									
						} 
							
					}
					
					if(s.description == null) s.description = "";
					if(s.recstatustext == null) s.recStatusText = recstatusDecode(-20);
					
					if(debug) this.log('Done parsing programDetails');
					//if(debug) this.log("full guide details json is: ", enyo.json.stringify(s)); 
					
				break;
					
				default:
					//Mojo.Log.error("node name is "+topSingleNode.nodeName);
					break;
			}
		}
		
		this.detailsProgram = s;
		
		this.updateDetails();
		
	},
	getProgramDetails25Response: function(inSender, inResponse) {
		if(debug) this.log("getProgramDetails25Response");
		
		var xmlobject = inResponse;
		
			
		//Local variables
		var topNode, topSingleNode;
		var channelChildNode, recordingChildNode;
		
		
		var s = {};
		
		//Start parsing
		topNode = xmlobject.getElementsByTagName("Program")[0];
		for(var i = 0; i < topNode.childNodes.length; i++) {
			topSingleNode = topNode.childNodes[i];
			switch(topSingleNode.nodeName) {
				case 'StartTime':
					if(topSingleNode.childNodes[0]) s.starttimeutc = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'EndTime':
					if(topSingleNode.childNodes[0]) s.endtimeutc = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'Title':
					if(topSingleNode.childNodes[0]) s.title = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'SubTitle':
					if(topSingleNode.childNodes[0]) s.subtitle = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'Category':
					if(topSingleNode.childNodes[0]) s.category = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'CatType':
					if(topSingleNode.childNodes[0]) s.cattype = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'Repeat':
					if(topSingleNode.childNodes[0]) s.repeat = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'SeriesId':
					if(topSingleNode.childNodes[0]) s.seriesid = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'ProgramId':
					if(topSingleNode.childNodes[0]) s.programid = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'Airdate':
					if(topSingleNode.childNodes[0]) s.airdate = topSingleNode.childNodes[0].nodeValue;
					break;
				case "#text":
					s.description = topSingleNode.nodeValue;
					break;
				case "Description":
					if(topSingleNode.childNodes[0]) s.description = topSingleNode.childNodes[0].nodeValue;
					break;
				case "Channel":
					for(var j = 0; j < topSingleNode.childNodes.length; j++) {
						channelChildNode = topSingleNode.childNodes[j];
						
						switch(channelChildNode.nodeName) {
							case "ChanId":
								if(channelChildNode.childNodes[0]) s.chanid = channelChildNode.childNodes[0].nodeValue;
								break;
							case "ChanNum":
								if(channelChildNode.childNodes[0]) s.channum = channelChildNode.childNodes[0].nodeValue;
								if(channelChildNode.childNodes[0]) s.channumInt = parseInt(channelChildNode.childNodes[0].nodeValue);
								break;
							case "CallSign":
								if(channelChildNode.childNodes[0]) s.callsign = channelChildNode.childNodes[0].nodeValue;
								break;
							case "ChannelName":
								if(channelChildNode.childNodes[0]) s.channame = channelChildNode.childNodes[0].nodeValue;
								break;
						}
					}
					break;
					
				case "Recording":
					for(var j = 0; j < topSingleNode.childNodes.length; j++) {
						recordingChildNode = topSingleNode.childNodes[j];
						
						switch(recordingChildNode.nodeName) {
							case "Status":
								if(recordingChildNode.childNodes[0]) s.recstatus = parseInt(recordingChildNode.childNodes[0].nodeValue);
								if(recordingChildNode.childNodes[0]) s.recstatustext = recstatusDecode(recordingChildNode.childNodes[0].nodeValue);
								break;
							case "Priority":
								if(recordingChildNode.childNodes[0]) s.recpriority = recordingChildNode.childNodes[0].nodeValue;
								break;
							case "StartTs":
								if(recordingChildNode.childNodes[0]) s.recstarttsutc = recordingChildNode.childNodes[0].nodeValue;
								if(recordingChildNode.childNodes[0]) s.recstartts = dateJSToISO(dateFromUtc(new Date(isoToJS(s.recstarttsutc.replace(" ","T")))));
								break;
							case "EndTs":
								if(recordingChildNode.childNodes[0]) s.recendts = recordingChildNode.childNodes[0].nodeValue;
								break;
							case "RecordId":
								if(recordingChildNode.childNodes[0]) s.recordid = recordingChildNode.childNodes[0].nodeValue;
								break;
						}
					}
					break;
				
			}
		}
			
		s.starttime = dateJSToISO(dateFromUtc(new Date(isoToJS(s.starttimeutc.replace(" ","T")))));
		s.endtime = dateJSToISO(dateFromUtc(new Date(isoToJS(s.endtimeutc.replace(" ","T")))));
								
			
		if(s.title == null) s.title = "";
		if(s.subtitle == null) s.subtitle = "";
		if(s.description == null) s.description = "";
		
		if(s.recstatus == 0) s.recordid = null;
		if(s.recstatustext == null) s.recstatustext = recstatusDecode(-20);
					
		
		
		if(debug) this.log("full guide details json is: ", enyo.json.stringify(s)); 
					
		this.detailsProgram = s;
		
		this.updateDetails();
		
		
		
	},
	getProgramDetailsFailure: function(inSender, inResponse) {
		this.error("getProgramDetailsFailure");
		
		this.$.detailsSpinner.hide();
		
		if(WebMyth.prefsCookie.showChannelIcons) {
			this.$.rightDetailsChannelIcon.show();		
			this.$.rightDetailsChannelIconWrapper.show();
		} else {
			this.$.rightDetailsChannelIconWrapper.hide();
		}
		
		this.bannerMessage("ERROR: Failed to get program details from backend at '"+WebMyth.prefsCookie.masterBackendIp+"'");

	},
	updateDetails: function() {
		if(debug) this.log("updateDetails");
		
		var row = this.detailsProgram;
		
		
		var nowDate = new Date();
		var nowTimeISO = dateJSToISO(nowDate);
		
		if(row.recstatus == -2) {
			this.$.recStatusText.setContent("Currently Recording");
			this.$.recStatusText.show();
		} else if(row.endtime.replace(" ","T") < nowTimeISO.replace(" ","T")) {
			this.$.recStatusText.setContent("In the Past");
			this.$.recStatusText.show();
		} else {
			this.$.recStatusText.hide();
		} 
		
		
		this.$.subtitle.setContent(row.subtitle);
		this.$.detailsDescription.setContent(row.description);
		this.$.category.setContent(row.category);
		this.$.recstatus.setContent(recstatusDecode(row.recstatus));
		
		this.$.airdate.setContent(row.airdate);
		this.$.seriesid.setContent(row.seriesid);
		this.$.programid.setContent(row.programid);
		this.$.channum.setContent(row.channum);
		this.$.channame.setContent(row.channame);
		this.$.starttime.setContent(row.starttime.replace("T"," "));
		this.$.endtime.setContent(row.endtime.replace("T"," "));
		
		this.$.detailsSpinner.hide();
		
		if(WebMyth.prefsCookie.showChannelIcons) {
			this.$.rightDetailsChannelIcon.show();		
			this.$.rightDetailsChannelIconWrapper.show();
		} else {
			this.$.rightDetailsChannelIconWrapper.hide();
		}
	},
	getPeople: function() {
		if(debug) this.log("getPeople");
		
		var query = 'SELECT UPPER(`credits`.`role`) AS `role`, ';
		query += ' `people`.`name`, `people`.`person`, ';
		query += ' `videocast`.`intid` AS videoPersonId ';
		query += ' FROM `credits` ';
		query += ' LEFT OUTER JOIN `people` ON `credits`.`person` = `people`.`person` ';
		query += ' LEFT OUTER JOIN `videocast` ON `videocast`.`cast` = `people`.`name` ';
		query += ' WHERE (`credits`.`chanid` = '+this.detailsProgram.chanid+' AND `credits`.`starttime` = "'+this.detailsProgram.starttime.replace("T"," ")+'" ) ';
		query += ' ORDER BY `role`,`name` ';
		
		if(debug) this.log("people query is :"+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQLwithResponse";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.getPeopleService.setUrl(requestUrl);
			this.$.getPeopleService.call();
		
		} else {
			
			this.doMysqlPluginCommand("mysqlGuideGetPeople", query);
			
		}
		
	},
	peopleResponse: function(inSender, inResponse) {
		//if(debug) this.log("peopleResponse: "+enyo.json.stringify(inResponse));
		if(debug) this.log("peopleResponse");
		
		this.peopleList.length = 0;
		this.peopleList = inResponse;
		
		this.$.peopleSpinner.hide();
		this.$.peopleSpinnerItem.hide();
		this.$.peopleVirtualRepeater.render();
		
		var row = this.detailsProgram;
		
	},
	peopleFailure: function(inSender, inResponse) {
		if(debug) this.log("peopleFailure");
		
		this.peopleList.length = 0;
		
		this.$.peopleSpinner.hide();
		this.$.peopleSpinnerItem.hide();
		this.$.peopleVirtualRepeater.render();
		
		var row = this.detailsProgram;
		
	},
	getPeopleItem: function(inSender, inIndex) {
		var row = this.peopleList[inIndex];
		
		if(row) {
		
			if(row.name) {
			
				this.$.peopleName.setContent(row.name);
				this.$.peopleRole.setContent(row.role);
				

                                if(inIndex == 0) {
                                        this.$.peopleItem.addClass("enyo-first");
                                }
                                if(inIndex == this.peopleList.length - 1) {
                                        this.$.peopleItem.addClass("enyo-last");
                                }
				
				return true;
			}
		}
		
	},
	updateModeMenu: function() {
		if(debug) this.log("updateModeMenu: "+this.currentMode);
		
		var modeChoices = [
			{caption: "Channel", checked: false},
			{caption: "Now", checked: false},
			{caption: "Time", checked: false},
		];
		
		switch(this.currentMode) {
			case "Channel":
				modeChoices[0].checked = true;
				break;
			case "Now":
				modeChoices[1].checked = true;
				break;
			case "Time":
				modeChoices[2].checked = true;
				break;
		}
		
		this.$.modePopupMenu.setItems(modeChoices);				
					
	},

});


