/* adsf*/


enyo.kind({ name: "upcoming",
	kind: "VFlexBox",
	className: "upcoming enyo-view",			//enyo-view needed to get vflexbox to work?
	published: {},
	
	phonePixels: 500,
	viewMode: "tablet",
	currentSlider: "left",
	currentPane: "slidingPane",
	
	fullResultList: [],
	fullDatesList: [],
	
	middleResultList: [],
	datesList: [],
	
	resultList: [],	
	
	programListOffset: 0,
	
	peopleList: [],
	
	detailsProgram: {},
	
	selectedDate: "",
	selectedDateIndex: -1,
	selectedChanid: "",
	selectedStarttime: "",
	selectedProgramIndex: -1,
	
	carouselIndex: -1,
	
	filterString: "",
	
	events: {
		onBannerMessage: "",
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
			
			{name: "getUpcomingService", kind: "WebService", handleAs: "json", onSuccess: "upcomingResponse", onFailure: "upcomingFailure"},
			{name: "getProgramDetailsService", kind: "WebService", handleAs: "xml", onSuccess: "getProgramDetailsResponse", onFailure: "getProgramDetailsFailure"},
			{name: "getPeopleService", kind: "WebService", handleAs: "json", onSuccess: "peopleResponse", onFailure: "peopleFailure"},
			
			{name: "loadingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
				{kind: "HFlexBox", components: [
					{kind: "Spacer"},
					{kind: "SpinnerLarge"},
					{kind: "Spacer"},
				]},
				{content: "Loading...", style: "text-align: center;"},
			]},
			
			{name: "upcomingPane", kind: "Pane", flex: 1, transitionKind: "enyo.transitions.Simple", onSelectView: "viewSelected", components: [
			
				{name: "slidingPane", kind: "SlidingPane", flex: 1, multiViewMinWidth: 500, onSelectView: "slidingSelected", components: [
					{name: "left", kind2: "Sliding", className: "left", dragAnywhere: false, width: "33%", components: [
						{name: "leftVFlexBox", kind: "VFlexBox", flex: 1, components: [
							{name: "leftHeader", kind: "Toolbar", layoutKind: "HFlexLayout", onclick: "leftRevealTop", components: [
								{name: "leftHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Upcoming"), flex2: 1},
							]},
							
							{name: "upcomingGroupSelectorItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", style: "border-bottom: none; border-top: none;", components: [
								{name: "upcomingGroupSelector", kind: "ListSelector", label: "Group", onChange: "upcomingGroupSelect", flex: 1, items: [
									{caption: "All", value: "All"},
									{caption: "Conflicting", value: "Conflicting"},
									{caption: "Overrides", value: "Overrides"},
									{caption: "Upcoming", value: "Upcoming", selected: true},
								]},
							]},
							{name: "titleDivider", kind: "Divider", caption: "Dates"},
							{name: "leftScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
								{name: "datesVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getDateItem", onclick: "dateSelect", components: [
									{name: "dateItem", kind: "Item", className: "programDates", layoutKind: "HFlexLayout", components: [
										{name: "date", flex: 1},
										{name: "count"},
									]}
								]},
								{name: "errorMessage"},
								{content: "&nbsp"},
							]},
			
							{kind: "Toolbar", components: [
								{name: "leftBackCommandIcon", kind: "Control", className: "backCommandIcon", onclick: "gotBack"},
								{kind: "Spacer"},
								{icon: "images/menu-icon-refresh.png", onclick: "getUpcoming"},
								{kind: "Spacer"},
								{name: "leftBackCommandIconSpacer", kind: "Control", className: "backCommandIconSpacer"},
							]},
						]},
					]},
					{name: "middle", kind2: "Sliding", className: "middle", dragAnywhere: false, width: "33%", components: [
						{name: "middleVFlexBox", kind: "VFlexBox", flex: 1, components: [
							
							{name: "middleHeader", kind: "Toolbar", layoutKind: "VFlexLayout", onclick: "middleRevealTop", components: [
								{name: "middleHeaderTitle", kind: "Control", className: "headerTitle", content: "List"},
								{name: "middleHeaderCount", kind: "Control", className: "headerSubtitle", content: ""},
							]},
							
							{name: "programsSearchInputWrapper", className: "searchInputWrapper", kind: "HFlexBox", components: [
								{name: "programsSearchInput", kind: "Input", hint: "Filter", oninput: "programsInput", flex: 1, components: [
									{name: "programsSearchClear", kind: "Image", src: "images/11-x@2x.png", showing: false, className: "searchClear", onclick: "resetProgramsSearch"},
									{name: "programsSearchSpinner", kind: "Spinner"},
								]}
							]},
							
							{name: "programsVirtualList", kind: "VirtualList", onSetupRow: "setupProgramItem", flex: 1, components: [
								{name: "programDivider", kind: "Divider"},
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
							
							
							{kind: "Toolbar", slidingHandler: false, components: [
								{name: "middleBackCommandIcon", kind: "GrabButton", className2: "backCommandIcon", onclick: "gotoLeft"},
								{kind: "Spacer"},
								{kind: "Spacer"},
							]},
							
							
						]},
					]},
					{name: "right", kind2: "Sliding", className: "right", dragAnywhere: false, width: "340px", flex: 1, components: [
						{name: "rightVFlexBox", kind: "VFlexBox", flex: 1, components: [
							{name: "rightHeader", kind: "Toolbar", layoutKind: "HFlexLayout", onclick: "rightRevealTop", components: [
								{name: "rightHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Details"), flex2: 1},
							]},
							
							{name: "rightScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
								{name: "rightDetailsChannelIconWrapper", kind: "HFlexBox", pack: "center", components: [
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
									{name: "recstarttsItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "recstartts", className: "value", flex: 1},
										{content: "Recording Start", className: "label"},
									]},
									{name: "recstatusItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "recstatus", className: "value", flex: 1},
										{content: "Recording Status", className: "label"},
									]},
									{name: "cardidItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "cardid", className: "value", flex: 1},
										{content: "Encoder ID", className: "label"},
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
									{name: "starttimeItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "starttime", className: "value", flex: 1},
										{content: "Start Time", className: "label"},
									]},
									{name: "endtimeItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "endtime", className: "value", flex: 1},
										{content: "End Time", className: "label"},
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
											]},
										]},
									]},
								]},
								{content: "&nbsp;"},
							]},
							
							{name: "rightCommandMenu", kind: "Toolbar", slidingHandler: false, components: [
								{name: "rightBackCommandIcon", kind: "GrabButton", className2: "backCommandIcon", onclick: "gotoMiddle"},
								{kind: "Spacer"},
								{name: "moreCommandButton", caption: "More", onclick: "moreClick"},
								{kind: "Spacer"},
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
								{caption: "Setup Schedule"},
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
		
		//this.activate("tablet");
		
	},
	
	//Externally called functions
	activate: function(inViewMode) {
		if(debug) this.log("activate");
		//this.render();
		
		this.resize(inViewMode);
		
		//this.$.programsVirtualList.punt();
		//this.middleRevealTop();
		this.rightRevealTop();
		
		if(this.fullResultList.length == 0) {
			
			setTimeout(enyo.bind(this,"showDetails"),1);
			this.getUpcoming();
		}
		
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
		
		this.programListOffset = Math.max(0,this.selectedProgramIndex-1);
		
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
		this.$.left.render();
		//this.$.middle.render();
		this.$.programsVirtualList.resized();
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
		
		if((this.currentPane == "upcomingImageView")||(this.currentPane == "upcomingCarousel")) {
		
			this.showSlidingPane();
			
		} else {
			
			if(this.viewMode == "phone") {
				this.selectedDate = "";
				this.selectedChanid = "";
				this.selectedStarttime = "";
				this.$.datesVirtualRepeater.render();
				this.$.programsVirtualList.refresh();
			}
			
			if(this.currentSlider == "right") {
				this.gotoMiddle();
			} else if(this.$.programsSearchInput.getValue().length > 0) {
				this.resetProgramsSearch();
			} else if(this.currentSlider == "left") {
				this.doSelectMode("welcome");
			} else if(this.currentSlider == "middle") {
				this.gotoLeft();
			} 
		}
		
	},
	gotKey: function(inKey) {
		if(debug) this.log("gotKey: "+inKey+" while we are at currentSlider: "+this.currentSlider);
		
		if(this.viewMode == "tablet") {
		
			this.$.programsSearchInputWrapper.show();
			this.$.programsVirtualList.resized();
			
			if((this.$.programsSearchInput.getValue() == "")&&(!this.$.programsSearchInput.hasFocus())) {
				this.$.programsSearchInput.setValue(inKey);
				this.$.programsSearchClear.show();
			}
			
			this.$.programsSearchInput.forceFocus();
			
		} else if(this.currentSlider == "left"){
		
			this.$.programsSearchInputWrapper.show();
			this.$.programsVirtualList.resized();
		
			this.selectedTitleIndex = 0;
			this.selectedTitle = "";
			
			this.gotoMiddle();
			
			this.filterString += inKey;
			
		} else if(this.currentSlider == "middle"){
		
			this.$.programsSearchInputWrapper.show();
			this.$.programsVirtualList.resized();
		
			if((this.$.programsSearchInput.getValue() == "")&&(!this.$.programsSearchInput.hasFocus())) {
				this.$.programsSearchInput.setValue(inKey);
				this.$.programsSearchClear.show();
			}
			
			this.$.programsSearchInput.forceFocus();
			
		}
	},
	gotSpecialKey: function(inKey) {
		if(debug) this.log("gotSpecialKey: "+inKey);
		
		this.finishedSelectingDate();
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
		
		if(inView.name == "slidingPane") {
			this.$.programsVirtualList.refresh();
		}
		
	},
	gotoLeft: function() {
		if(debug) this.log("gotoLeft");
		
		this.$.slidingPane.selectView(this.$.left);
		this.currentSlider = "left";
		
		if(this.viewMode == "phone") {
			this.selectedDate = "";
			this.selectedChanid = "";
			this.selectedStarttime = "";
			this.$.datesVirtualRepeater.render();
			this.$.programsVirtualList.refresh();
		}
	},
	gotoMiddle: function() {
		if(debug) this.log("gotoMiddle");
		
		//this.middleRevealTop();
		this.$.slidingPane.selectView(this.$.middle);
		this.currentSlider = "middle";
		
		if(this.viewMode == "phone") {
			//this.selectedDate = "asdf";
			this.selectedChanid = "";
			this.selectedStarttime = "";
			this.$.datesVirtualRepeater.render();
			this.$.programsVirtualList.refresh();
		}
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
		
		this.programListOffset = 0;
		this.$.programsVirtualList.punt();
	},
	rightRevealTop: function() {
		if(debug) this.log("rightRevealTop");
		
		this.$.rightScroller.scrollIntoView(0,0);
	},
	slidingSelected: function(inSender, inSliding, inLastSliding) {
		if(debug) this.log("slidingSelected: "+inSliding.id);
		
		switch(inSliding.id) {
			case 'webmyth2_upcoming_left':
				this.currentSlider = "left";
				this.$.programsSearchInput.forceBlur();
				break;
			case 'webmyth2_upcoming_middle':
				this.currentSlider = "middle";
				if(this.filterString.length > 0) {
					
					this.$.programsSearchInput.setValue(this.filterString);
					this.$.programsSearchInput.forceFocus();
					
					this.filterString = "";
				}
				break;
			case 'webmyth2_upcoming_right':
				this.currentSlider = "right";
				this.$.programsSearchInput.forceBlur();
				break;
		}
	},
	upcomingGroupSelect: function(inSender, inValue, inOldValue) {
		if(debug) this.log("upcomingGroupSelect from "+inOldValue+" to "+inValue);
		
		WebMyth.prefsCookie.upcomingGroup = inValue;
		//this.selectedDate = "";
		
		this.doSavePreferences();
		
		this.leftRevealTop();
		
		this.$.programsSearchInput.setValue("");
		this.$.programsSearchClear.hide();
		
		this.finishedSelectingGroup();
	},
	dateSelect: function(inSender, inEvent) {
		if(debug) this.log("dateSelect index "+inEvent.rowIndex);
		
		var oldTitleIndex = this.selectedDateIndex;
		
		this.selectedDateIndex = inEvent.rowIndex;
		this.selectedDate = this.datesList[inEvent.rowIndex].value;
		
		//this.$.datesVirtualRepeater.render();
		this.$.datesVirtualRepeater.renderRow(oldTitleIndex);
		this.$.datesVirtualRepeater.renderRow(this.selectedDateIndex);
		
		if(this.viewMode == "phone") this.gotoMiddle();
		
		this.resetProgramsSearch();
	},
	resetProgramsSearch: function(inSender) {
		if(debug) this.log("resetProgramsSearch");
		
		this.$.programsSearchInput.setValue("");
		this.$.programsSearchClear.hide();
		
		if(this.viewMode == "tablet") {
			this.$.programsSearchInputWrapper.show();
			this.$.programsVirtualList.resized();
		} else {
			//this.$.programsSearchInputWrapper.hide();
			this.$.programsVirtualList.resized();
		}
		
		this.finishedSelectingDate();
	},
	programsInput: function(inSender) {
		if(debug) this.log("programsInput: "+this.$.programsSearchInput.getValue());
		
		this.$.programsSearchClear.hide();
		this.$.programsSearchSpinner.show();
		
		enyo.job("programsSearch", enyo.bind(this, "programsSearch"),200);
	},
	programsSearch: function(inSender) {
		if(debug) this.log("programsSearch: "+this.$.programsSearchInput.getValue());
		
		this.$.programsSearchClear.show();
		this.$.programsSearchSpinner.hide();
		
		this.finishedSelectingDate();
		
		//this.$.programsSearchInput.forceBlur();
		this.$.programsSearchInputWrapper.show();
		this.$.programsVirtualList.resized();
	},
	programSelect: function(inSender, inEvent) {
		if(debug) this.log("programSelect index "+inEvent.rowIndex);

		var newIndex = inEvent.rowIndex+this.programListOffset;
		
		//this.programListOffset = Math.max(0,newIndex-1);
		
		var row = this.resultList[newIndex];
		
		this.selectedChanid = row.chanid;
		this.selectedStarttime = row.starttime;
		
		this.detailsProgram = row;
		
		//this.$.programsVirtualList.updateRow(this.selectedProgramIndex);
		//this.$.programsVirtualList.updateRow(inEvent.rowIndex);
		
		this.selectedProgramIndex = newIndex;
		
		this.$.programsVirtualList.refresh();
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	programIconSelect: function(inSender, inEvent) {
		if(debug) this.log("programIconSelect index "+inEvent.rowIndex);
		
		var newIndex = inEvent.rowIndex+this.programListOffset;
		
		var row = this.resultList[newIndex];
		
		this.carouselIndex = newIndex;
		this.$.upcomingCarousel.setCenterView(this.getCarouselView(this.carouselIndex));
		this.$.upcomingPane.selectViewByName("upcomingCarousel");
		
	},
	getCarouselView: function(inIndex) {
		if(debug) this.log("getCarouselView with index: "+inIndex);
	
		var row = this.resultList[inIndex];
		
		if(row) {
	
			row.showrecstatus = true;
			row.recstatustext = recstatusDecode(row.recstatus);
	
			if(row.recstatus == -1) {
				//row.showrecstatus = false;
			}
	
			if((row.subtitle == null)||(row.subtitle == "")||(row.subtitle == "None")) {
				row.subtitle = "&nbsp;";
			}
			
			if((row.description == null)||(row.description == "")||(row.description == "None")) {
				row.hasDescription = false;
			} else {
				row.hasDescription = true;
			}
			
			if(WebMyth.prefsCookie.mythwebXml) {
			
				row.iconUrl = "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetChannelIcon?MythXMLKey=";
				row.iconUrl += WebMyth.prefsCookie.MythXML_key+"&ChanId=";
				
			} else if(WebMyth.prefsCookie.DBSchemaVer > 1269) {
			
				row.iconUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Guide/GetChannelIcon?ChanId=";
				
			} else {
				row.iconUrl = "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetChannelIcon?ChanId=";
				
			}
			
			row.iconUrl += row.chanid;
			
			row.fulltime = row.starttime.replace("T"," ") + " - " + row.endtime.replace("T"," ");
			
			
			if(debug) this.log("getCarouselView iconUrl: "+row.iconUrl);
			
			return {kind: "VFlexBox", className: "upcomingCarousel", flex: 1, align: "center", pack: "justify", owner: this, components: [
			
					{kind: "Toolbar", width: "100%", layoutKind: "VFlexLayout", components: [
						{content: row.title, kind: "Control", className: "headerTitle"},
						{content: row.subtitle, kind: "Control", className: "carouselSubtitle"}, 
					]},

					{kind: "Spacer", showing: row.showrecstatus},
					{content: row.recstatustext, className: "carouselDate", showing: row.showrecstatus}, 
							
					{kind: "Spacer"},
					
					{kind: "HFlexBox", flex2: 1, height: "auto", width: "100%", align: "center", pack: "center", components: [
						{kind: "Image", src: row.iconUrl, className: "carouselIcon"},
					]},

					{kind: "Spacer"},
					{content: row.fulltime, className: "carouselDate"}, 
					{kind: "Spacer"},
							
					{kind: "Toolbar", width: "100%", layoutKind: "HFlexLayout", components: [
							{content: row.description, kind: "Control", className: "carouselDescription", showing: row.hasDescription}, 
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
		
		this.selectedProgramIndex = this.carouselIndex;
		
		this.programListOffset = Math.max(0,this.carouselIndex-1);
		this.$.programsVirtualList.punt();
		
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		this.showSlidingPane();
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	showSlidingPane: function() {
		if(debug)	this.log("showSlidingPane");
		
		this.$.upcomingPane.selectViewByName("slidingPane");
	},
	peopleSelect: function(inSender, inEvent) {
		if(debug) this.log("peopleSelect index "+enyo.json.stringify(this.peopleList[inEvent.rowIndex]));
		
		this.doPersonSelected(this.peopleList[inEvent.rowIndex])	
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
	getUpcoming: function() {
		if(debug) this.log("getUpcoming");
		
		//this.$.scrim.show();
		this.$.loadingPopup.openAtCenter();
		this.$.spinnerLarge.show();
		
		if(WebMyth.useScript){
			
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=getPending";				//matches any recording rule
		
			this.$.getUpcomingService.setUrl(requestUrl);
			this.$.getUpcomingService.call();
			
		} else {
		
			this.doMythprotocolBackgroundPluginCommand("QUERY_GETALLPENDING");
			
		} 
		
	},
	upcomingResponse: function(inSender, inResponse) {
		//if(debug) this.log("upcomingResponse: "+enyo.json.stringify(inResponse));
		if(debug) this.log("upcomingResponse");
		
		this.fullResultList.length = 0;
		this.fullDatesList.length = 0;
		
		this.fullResultList = inResponse;
		
		var conflicts = 0;
		
		for(var i = 0; i < this.fullResultList.length; i++) {
			if(this.fullResultList[i].recstatus == 7) conflicts++;
		}
		
		if(conflicts == 1) {
			this.bannerMessage("There is 1 conflicting recording");
		} else if(conflicts > 1) {
			this.bannerMessage("There are "+conflicts+" conflicting recordings");
		} else {
			if(debug) this.log("We don't have any conflicts");
		}
		
		if(debug) this.log("Completed upcoming parsing with "+this.fullResultList.length+" total items");
		
		this.$.errorMessage.setContent("");
		
		this.leftRevealTop();
		
		this.finishedGettingUpcoming();
		
	},
	upcomingFailure: function(inSender, inResponse) {
		this.error("upcomingFailure");
		
		this.$.errorMessage.setContent("ERROR: Failed to get list of upcoming programs from backend at '"+WebMyth.prefsCookie.masterBackendIp+"'");
		
		this.finishedGettingUpcoming();
	},
	finishedGettingUpcoming: function() {
		if(debug) this.log("finishedGettingUpcoming");
		
		this.resize(this.viewMode);
		
		this.finishedSelectingGroup();
	},
	finishedSelectingGroup: function() {
		if(debug) this.log("finishedSelectingGroup and have upcomingGroup: "+WebMyth.prefsCookie.upcomingGroup+" and selectedDate: "+this.selectedDate);
	
		this.datesList.length = 0;
		this.middleResultList.length = 0;
		
		this.middleResultList = trimUpcomingByGroup(this.fullResultList,WebMyth.prefsCookie.upcomingGroup);
		this.datesList = cleanDateList(this.middleResultList);
		
		this.$.upcomingGroupSelector.setValue(WebMyth.prefsCookie.upcomingGroup);
		this.datesList.splice(0,0,{label: "All", value: "", count: this.middleResultList.length});
		
		this.finishedSelectingDate();
	},
	finishedSelectingDate: function() {
		if(debug) this.log("finishedSelectingDate with selectedDate: "+this.selectedDate);
		
		this.$.datesVirtualRepeater.render();
		
		this.resultList.length = 0;
		this.resultList = this.filterPrograms(trimListSearch(this.middleResultList,"starttime",this.selectedDate));
		//this.resultList = this.middleResultList;
		
		if((this.selectedDate == "")&&(WebMyth.prefsCookie.upcomingGroup == "All")) {
			this.$.middleHeaderTitle.setContent("All Upcoming");
		} else if((this.selectedDate == "")&&(WebMyth.prefsCookie.upcomingGroup == "Upcoming")) {
			this.$.middleHeaderTitle.setContent("Upcoming");
		} else if(this.selectedDate == "") {
			this.$.middleHeaderTitle.setContent("Upcoming ["+WebMyth.prefsCookie.upcomingGroup+"]");
		} else {
			//this.$.middleHeaderTitle.setContent(this.selectedDate);
			this.$.middleHeaderTitle.setContent(WebMyth.dateFormatter.format(new Date(isoToJS(this.selectedDate+"T00:00:00"))));
		}
		
		this.$.middleHeaderCount.setContent("("+this.resultList.length+" items)");
		
		this.middleRevealTop();
		
		this.detailsProgram = defaultProgram;
		this.selectedChanid = "";
		this.selectedStarttime = "";
		this.selectedProgramIndex = -1;
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		this.$.programsVirtualList.refresh();
		
		this.$.loadingPopup.close();
		enyo.scrim.hide();
		
	},
	filterPrograms: function(inList) {
		if(debug) this.log("filterPrograms with list of length: "+inList.length);
		
		var finalList = [];
		var s = {};
		var filterString = this.$.programsSearchInput.getValue().toUpperCase();
		
		for(var i = 0; i < inList.length; i++) {
			s = inList[i];
		
			if(s.title.toUpperCase().indexOf(filterString) >=0) {
				finalList.push(s);
			} else if(s.subtitle.toUpperCase().indexOf(filterString) >=0) {
				finalList.push(s);
			} else if(s.category.toUpperCase().indexOf(filterString) >=0) {
				finalList.push(s);
			} else if(recstatusDecode(s.recstatus).toUpperCase().indexOf(filterString) >=0) {
				finalList.push(s);
			} else if(s.channame.toUpperCase().indexOf(filterString) >=0) {
				finalList.push(s);
			} 
		}	
		
		return finalList;
	},
	getDateItem: function(inSender, inIndex) {
		var row = this.datesList[inIndex];
		
		if(row) {
		
			try{
				row.formattedDate = WebMyth.dateFormatter.format(new Date(isoToJS(row.label+"T00:00:00")));
				this.$.date.setContent(row.formattedDate);
			} catch(e) {
				this.$.date.setContent(row.label);
			}
			
			this.$.count.setContent("("+row.count+")");
						
			if((row.value == this.selectedDate)&&(this.viewMode == "tablet")) {
				//this.$.dateItem.setStyle("background-color:rgba(0,0,0,0.05);border-top-color:rgba(0,0,0,0.05);");
				this.$.dateItem.addClass("selected");
			} else {
				//this.$.dateItem.setStyle("background-color: none;");
				this.$.dateItem.removeClass("selected");
			}
			
			if(inIndex == 0) this.$.dateItem.setStyle("border-top: none;");
			
			return true;
		}
		
	},
	setupProgramItem: function(inSender, inIndex) {
		//if(debug) this.log("setupProgramItem index: "+inIndex+" and offset: "+this.programListOffset);
		
		var newIndex = this.programListOffset+inIndex;
		
		var row = this.resultList[newIndex];
		
		//if(debug) this.log("setupProgramItem data: "+enyo.json.stringify(row));
		
		if(row) {
		
			this.setupProgramDivider(newIndex);
		
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
					
				} else if(WebMyth.prefsCookie.DBSchemaVer > 1269) {
			
					iconUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Guide/GetChannelIcon?ChanId=";
				
				} else {
					
					iconUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetChannelIcon?ChanId=";
					
				}
				
				iconUrl += row.chanid;
				
				this.$.channelIcon.setSrc(iconUrl);
				this.$.channelIconWrapper.show();
				
			} else {
				
				this.$.channelIconWrapper.hide();
			}
			
			if((row.chanid == this.selectedChanid)&&(row.starttime == this.selectedStarttime)&&(this.viewMode == "tablet")) {
				//this.$.programItem.setStyle("background-color:rgba(0,0,0,0.05);border-top-color:rgba(0,0,0,0.05);");
				//this.$.programItem.setClassName("enyo-item programList selected "+row.recgroup);
				this.$.programItem.addClass("selected");
				this.$.programItem.addClass(row.recgroup);
			} else {
				//this.$.programItem.setStyle("background-color: none;");
				//this.$.programItem.setClassName("enyo-item programList "+row.recgroup);
				this.$.programItem.removeClass("selected");
				this.$.programItem.removeClass(row.recgroup);
			}
			
			return true;
		}
		
	},
	setupProgramDivider: function(inIndex) {
		//if(debug) this.log("setupProgramDivider at index: "+inIndex);
		
		// use group divider at group transition, otherwise use item border for divider
		var group = this.getProgramGroupName(inIndex);
		this.$.programDivider.setCaption(group);
		this.$.programDivider.canGenerate = Boolean(group);
		this.$.programItem.applyStyle("border-top", Boolean(group) ? "none" : "1px solid silver;");
		this.$.programItem.applyStyle("border-bottom", "none;");
    },
	getProgramGroupName: function(inIndex) {
		//if(debug) this.log("getProgramGroupName at index: "+inIndex);
		
		var r0 = this.resultList[inIndex-1];
		var r1 = this.resultList[inIndex];
		
		//var a = r0 && r0.starttime.substring(0,10);
		//var b = r1.starttime.substring(0,10);
		
		var a = r0 && WebMyth.dateFormatter.format(new Date(isoToJS(r0.starttime)));
		var b = WebMyth.dateFormatter.format(new Date(isoToJS(r1.starttime)));
		
		return a != b ? b : null;
	},
	showDetails: function() {
		if(debug) this.log("showDetails");
		
		var row = {};
		
		if(this.selectedChanid == "") {
			this.detailsProgram = defaultProgram;
			
			row = this.detailsProgram;
			
			this.$.rightDetailsChannelIconWrapper.hide();
			
			this.$.moreCommandButton.hide();
			
			this.$.rightCommandMenu.render();
			
			this.$.rightHeaderTitle.setContent("Details");
			
			this.peopleFailure();
			
		} else {
			
			row = this.detailsProgram;
			
			var requestUrl = "";
			
			if(WebMyth.prefsCookie.mythwebXml) {
			
				requestUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetProgramDetails?Details=1&MythXMLKey=";
				requestUrl += WebMyth.prefsCookie.MythXML_key;
				requestUrl += "&StartTime=";
					
			} else if(WebMyth.prefsCookie.DBSchemaVer > 1269) {
			
				requestUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Guide/GetProgramDetails?StartTime=";
				
			} else {
				
				requestUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetProgramDetails?StartTime=";
				
			}
				
			requestUrl += row.starttime;
			requestUrl += "&ChanId=";
			requestUrl += row.chanid;

			if(debug) this.log("XML details URL is: "+requestUrl);
			
			this.$.rightDetailsChannelIconWrapper.show();
				
			//this.$.rightDetailsSpinnerWrapper.show();
			this.$.rightDetailsChannelIcon.hide();
			this.$.detailsSpinner.show();
			
			this.$.getProgramDetailsService.setUrl(requestUrl);
			this.$.getProgramDetailsService.call();
			
			if(WebMyth.prefsCookie.showChannelIcons) {
			
				var iconUrl = "";
				
				if(WebMyth.prefsCookie.mythwebXml) {
			
					iconUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetChannelIcon?MythXMLKey=";
					iconUrl += WebMyth.prefsCookie.MythXML_key+"&ChanId=";
					
				} else if(WebMyth.prefsCookie.DBSchemaVer > 1269) {
			
					iconUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Guide/GetChannelIcon?ChanId=";
				
				} else {
				
					iconUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetChannelIcon?ChanId=";
				
				}	
				
				iconUrl += row.chanid;
				
				this.$.rightDetailsChannelIcon.setSrc(iconUrl);
				this.$.rightDetailsChannelIconWrapper.show();
				
			} else {
				
				this.$.rightDetailsChannelIconWrapper.hide();
			}
			
			this.$.moreCommandButton.show();
			
			this.$.rightCommandMenu.render();
			
			this.$.rightHeaderTitle.setContent(row.title);
			
			this.$.peopleSpinnerItem.show();
			
			this.getPeople();
		
		}
		
		if(row.recstatus == -2) {
			this.$.recStatusText.setContent("Currently Recording");
			this.$.recStatusText.show();
		} else {
			this.$.recStatusText.hide();
		} 
		
		
		this.$.subtitle.setContent(row.subtitle);
		this.$.detailsDescription.setContent(row.description);
		this.$.category.setContent(row.category);
		this.$.recstartts.setContent(row.recstartts.replace("T"," "));
		this.$.recstatus.setContent(recstatusDecode(row.recstatus));
		this.$.cardid.setContent(row.cardid);
		
		this.$.airdate.setContent(row.airdate);
		this.$.seriesid.setContent(row.seriesid);
		this.$.programid.setContent(row.programid);
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
					if(s.recstatustext == null) s.recstatustext = recstatusDecode(-20);
					
					if(debug) this.log('Done parsing programDetails');
					//if(debug) this.log("full guide details json is: ", enyo.json.stringify(s)); 
					
				break;
					
				default:
					//if(debug) this.log("node name is "+topSingleNode.nodeName);
					break;
			}
		}
		
		this.detailsProgram = s;
		var row = s;
		
		
		var nowDate = new Date();
		var nowDateISO = dateJSToISO(nowDate);
		
		if(row.recstatus == -2) {
			this.$.recStatusText.setContent("Currently Recording");
			this.$.recStatusText.show();
		} else if(row.endtime.replace(" ","T") < nowDateISO.replace(" ","T")) {
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
			
			this.doMysqlPluginCommand("mysqlUpcomingGetPeople", query);
			
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

	
});



