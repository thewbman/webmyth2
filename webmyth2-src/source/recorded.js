/* adsf*/


enyo.kind({ name: "recorded",
	kind: "VFlexBox",
	className: "recorded enyo-view",			//enyo-view needed to get vflexbox to work?
	published: {},
	
	phonePixels: 500,
	viewMode: "tablet",
	currentSlider: "left",
	currentPane: "slidingPane",
	
	fullResultList: [],
	fullGroupsList: [],
	fullTitlesList: [],
	
	middleResultList: [],
	groupsList: [],
	titlesList: [],
	
	resultList: [],	
	
	programListOffset: 0,
	
	peopleList: [],
	jobqueueList: [],
	
	playList: [],
	
	detailsProgram: {},
	
	selectedTitle: "",
	selectedTitleIndex: -1,
	selectedChanid: "",
	selectedRecstartts: "",
	selectedProgramIndex: -1,
	
	carouselIndex: -1,
	
	filterString: "",
	
	UserJobDesc1: "userjob1",
	UserJobDesc2: "userjob2",
	UserJobDesc3: "userjob3",
	UserJobDesc4: "userjob4",
	showDeleteMenuButton: true,
	showUndeleteMenuButton: false,
	
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
		onRemoteCommand: "",
		onMysqlPluginCommand: "",
		onMysqlPluginExecute: "",
		onMythprotocolPluginCommand: "",
	},
	
	components: [
			
			{name: "streamVideoService", kind: "PalmService", service: "palm://com.palm.applicationManager/", method: "launch"},
			{name: "getRecordedService", kind: "WebService", handleAs: "xml", onSuccess: "recordedResponse", onFailure: "recordedFailure"},
			{name: "getRecorded25Service", kind: "WebService", handleAs: "xml", onSuccess: "recorded25Response", onFailure: "recorded25Failure"},
			
			{name: "getPeopleService", kind: "WebService", handleAs: "json", onSuccess: "peopleResponse", onFailure: "peopleFailure"},
			{name: "getJobqueueService", kind: "WebService", handleAs: "json", onSuccess: "jobqueueResponse", onFailure: "jobqueueFailure"},
			{name: "deleteRecordingService", kind: "WebService", handleAs: "txt", onSuccess: "deleteRecordingResponse", onFailure: "deleteRecordingFailure"},
			{name: "undeleteRecordingService", kind: "WebService", handleAs: "txt", onSuccess: "undeleteRecordingResponse", onFailure: "undeleteRecordingFailure"},
			{name: "scheduleJobService", kind: "WebService", handleAs: "txt", onSuccess: "scheduleJobResponse", onFailure: "scheduleJobFailure"},
			
			{name: "loadingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
				{kind: "HFlexBox", components: [
					{kind: "Spacer"},
					{kind: "SpinnerLarge"},
					{kind: "Spacer"},
				]},
				{content: $L("Loading")+"...", style: "text-align: center;"},
			]},
			
			{name: "recordedPane", kind: "Pane", flex: 1, transitionKind: "enyo.transitions.Simple", onSelectView: "viewSelected", components: [
			
				{name: "slidingPane", kind: "SlidingPane", flex: 1, multiViewMinWidth: 500, onSlideComplete: "slidingResize", onSelectView: "slidingSelected", components: [
					{name: "left", className: "left", dragAnywhere: false, width: "33%", components: [
						{name: "leftVFlexBox", kind: "VFlexBox", flex: 1, components: [
							{name: "leftHeader", kind: "Toolbar", layoutKind: "HFlexLayout", onclick: "leftRevealTop", components: [
								{name: "leftHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Recorded"), flex2: 1},
							]},
							
							{name: "recGroupSelectorItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", style: "border-bottom: none; border-top: none;", components: [
								{name: "recGroupSelector", kind: "ListSelector", label: $L("Group"), onChange: "recGroupSelect", flex: 1, items: [
									{caption: $L("All"), value: ""},
								]},
							]},
							{name: "titleDividier", kind: "Divider", caption: $L("Programs")},
							{name: "leftScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
								{name: "titlesVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getTitleItem", onclick: "titleSelect", components: [
									{name: "titleItem", kind: "Item", className: "programTitles", layoutKind: "HFlexLayout", components: [
										{name: "title", flex: 1},
										{name: "count"},
									]}
								]},
								{name: "errorMessage"},
								{content: "&nbsp"},
							]},
			
							{name: "leftFooter", kind: "Toolbar", components: [
								{name: "leftBackCommandIcon", kind: "Control", className: "backCommandIcon", onclick: "gotBack"},
								{kind: "Spacer"},
								{icon: 'images/menu-icon-refresh.png', onclick: "getRecorded"},
								{kind: "Spacer"},
								{name: "leftBackCommandIconSpacer", kind: "Control", className: "backCommandIconSpacer"},
							]},
						]},
					]},
					{name: "middle", className: "middle", dragAnywhere: false, width: "33%", components: [
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
										{kind: "VFlexBox", align: "center", pack: "center", className: "listScreenshotWrapper", onclick: "programScreenshotSelect", components: [
											{name: "screenshot", kind: "Image", className: "listScreenshot"},
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
							
							
							{name: "middleFooter", kind: "Toolbar", slidingHandler: false, components: [
								{name: "middleBackCommandIcon", kind: "GrabButton", className2: "backCommandIcon", onclick: "gotoLeft"},
								{kind: "Spacer"},
								{name: "sortCommandButton", caption: "Sort", onclick: "sortClick"},
								{kind: "Spacer"},
							]},
							
							{name: "sortPopupMenu", kind: "PopupSelect", defaultKind: "MenuCheckItem", className: "sortPopupMenu", onSelect: "sortSelect", onClose: "sortClosed", components: [
								//
							]},
						]},
					]},
					{name: "right", className: "right", dragAnywhere: false, width: "340px", flex: 1, components: [
						{name: "rightVFlexBox", kind: "VFlexBox", flex: 1, components: [
							{name: "rightHeader", kind: "Toolbar", layoutKind: "HFlexLayout", onclick: "rightRevealTop", components: [
								{name: "rightHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Details"), flex2: 1},
							]},
							
							{name: "rightScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
								{kind: "HFlexBox", components: [
									{kind: "Spacer"},
									{name: "rightDetailsScreenshot", kind: "Image", className: "largeScreenshot", onclick: "screenshotSelect", showing: false},
									{kind: "Spacer"},
								]},
								{name: "recStatusText", className: "recStatusText", kind: "Control"},
								{name: "generalDetailsRowGroup", kind: "RowGroup", caption: "General Details", components: [
									{name: "subtitleItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "subtitle", className: "value", flex: 1},
										{content: $L("Subtitle"), className: "label"},
									]},
									{name: "descriptionItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "detailsDescription", className: "description"},
									]},
									{name: "categoryItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "category", className: "value", flex: 1},
										{content: $L("Category"), className: "label"},
									]},
								]},
								{name: "programDetailsRowGroup", kind: "RowGroup", caption: "Program Details", components: [
									{name: "airdateItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "airdate", className: "value", flex: 1},
										{content: $L("Original Airdate"), className: "label"},
									]},
									{name: "seriesidItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "seriesid", className: "value", flex: 1},
										{content: $L("Series ID"), className: "label"},
									]},
									{name: "programidItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "programid", className: "value", flex: 1},
										{content: $L("Program ID"), className: "label"},
									]},
									{name: "channumItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "channum", className: "value", flex: 1},
										{content: $L("Channel Number"), className: "label"},
									]},
									{name: "channameItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "channame", className: "value", flex: 1},
										{content: $L("Channel Name"), className: "label"},
									]},
									{name: "starttimeItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "starttime", className: "value", flex: 1},
										{content: $L("Start Time"), className: "label"},
									]},
									{name: "endtimeItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "endtime", className: "value", flex: 1},
										{content: $L("End Time"), className: "label"},
									]},
								]},
								{name: "recordingDetailsRowGroup", kind: "RowGroup", caption: "Recording Details", components: [
									{name: "hostnameItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "hostname", className: "value", flex: 1},
										{content: $L("Hostname"), className: "label"},
									]},
									{name: "recgroupItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "recgroup", className: "value", flex: 1},
										{content: $L("Recording Group"), className: "label"},
									]},
									{name: "recstarttsItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "recstartts", className: "value", flex: 1},
										{content: $L("Recording Start"), className: "label"},
									]},
									{name: "filesizeItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "filesize", className: "value", flex: 1},
										{content: $L("Filesize"), className: "label"},
									]},
								]},
								{name: "jobqueueRowGroup", kind: "RowGroup", caption: "Queued or Recent Jobs", components: [
									{name: "jobqueueSpinnerItem", kind: "Item", align: "center", className: "enyo-single", tapHighlight: false, layoutKind: "HFlexLayout", pack: "center", align: "center", components: [
										{name: "jobqueueSpinner", kind: "Spinner"},
									]},
									{kind: "Item", className: "groupVirtualRepeater", components: [
										{name: "jobqueueVirtualRepeater", kind: "VirtualRepeater", className: "enyo-single", onSetupRow: "getJobqueueItem", onclick: "jobqueueSelect", components: [
											{name: "jobqueueItem", kind: "Item", className: "jobqueue", components: [
												{name: "jobqueueName", className: "value", flex: 1},
												{name: "jobqueueStatus", allowHtml: true, className: "label"},
											]}
										]},
									]},
								]},
								{name: "peopleRowGroup", kind: "RowGroup", caption: "People", components: [
									{name: "peopleSpinnerItem", kind: "Item", align: "center", className: "enyo-single", tapHighlight: false, layoutKind: "HFlexLayout", pack: "center", align: "center", components: [
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
								{name: "playCommandButton", caption: $L("Play"), onclick: "playClick"},
								{kind: "Spacer"},
								{name: "moreCommandButton", caption: $L("More"), onclick: "moreClick"},
								{kind: "Spacer"},
								//{name: "rightBackCommandIconSpacer", kind: "Control", className: "backCommandIconSpacer"},
							]},
							
							{name: "playPopupMenu", kind: "PopupSelect", className: "playPopupMenu", onSelect: "playSelect", onClose: "playClosed", components: [
								//
							]},
							{name: "morePopupMenu", kind: "PopupSelect", className: "morePopupMenu", onBeforeOpen2: "beforeMoreOpen", onSelect: "moreSelect", onClose: "moreClosed", components: [
								//
							]},
						]},
					]},
				]},
				
				{name: "recordedCarousel", kind: "Carousel", flex: 1, className: "recordedCarousel", onGetLeft: "getLeft", onGetRight: "getRight", onclick: "selectedCarouselProgram"},
				{name: "recordedImageView", kind: "ImageView", flex: 1, className: "imageView", onclick: "showSlidingPane"},
				
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
		
		this.playList.length = 0;
		
		if(WebMyth.prefsCookie.allowDownloads) {
			this.playList.push({caption: "Download"});
			this.playList.push({caption: "Stream"});
		}
		
		for(var i = 0; i < WebMyth.prefsCookie.frontends.length; i++) {
			this.playList.push({caption: WebMyth.prefsCookie.frontends[i].name});
		}
		
		this.$.playPopupMenu.setItems(this.playList);

		//this.$.userjob1.setCaption(WebMyth.prefsCookie.UserJobDesc1);
		//this.$.userjob2.setCaption(WebMyth.prefsCookie.UserJobDesc2);
		//this.$.userjob3.setCaption(WebMyth.prefsCookie.UserJobDesc3);
		//this.$.userjob4.setCaption(WebMyth.prefsCookie.UserJobDesc4);
		
		if(this.fullResultList.length == 0) {
			
			this.updateSortMenu();
			
			setTimeout(enyo.bind(this,"showDetails"),1);
			this.getRecorded();
		}

		this.resize(this.viewMode);
		
		
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
		
		this.programListOffset = Math.max(0,this.selectedProgramIndex-1);
		
		//this.fullResultList.length = 0;
		//this.fullGroupsList.length = 0;
		//this.fullTitlesList.length = 0;
		
		//this.detailsProgram = defaultProgram;
		
		//this.finishedGettingRecorded();
		
		//this.destroy();
	},
	resize: function(inViewMode) {
		if(debug) this.log("resize: "+inViewMode);

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
			if(this.fullResultList.length == 0) this.selectedTitle = "";
			
			this.$.slidingPane.setMultiView(true);
			
		} else {
			this.$.leftBackCommandIcon.show();
			this.$.leftBackCommandIconSpacer.show();
			//this.$.middleBackCommandIcon.show();
			//this.$.middleBackCommandIconSpacer.show();
			//this.$.rightBackCommandIcon.show();
			//this.$.rightBackCommandIconSpacer.show();
			
			this.$.slidingPane.setMultiView(false);
		}
		
		this.$.left.render();
		//this.$.middle.render();
		this.$.programsVirtualList.resized();
		this.$.right.render();
		
		this.slidingResize();
		
		this.$.recordedCarousel.render();
		this.$.recordedImageView.render();
		
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
	slidingResize: function () {
		if(debug) this.log("slidingResize");
		
		this.$.slidingPane.resize();
	
	},
	gotBack: function() {
		if(debug) this.log("gotBack while we are on "+this.currentPane+" at "+this.currentSlider);
		
		if((this.currentPane == "recordedImageView")||(this.currentPane == "recordedCarousel")) {
		
			this.showSlidingPane();
			
		} else {
			
			if(this.viewMode == "phone") {
				this.selectedTitle = "";
				this.selectedChanid = "";
				this.selectedRecstartts = "";
				this.$.titlesVirtualRepeater.render();
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
		if(debug) this.log("gotKey: "+inKey+" while we are at currentSlider: "+this.currentSlider+" and value is "+this.$.programsSearchInput.getValue());
		
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
		
		this.finishedSelectingTitle();
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
			this.selectedTitle = "";
			this.selectedChanid = "";
			this.selectedRecstartts = "";
			this.$.titlesVirtualRepeater.render();
			this.$.programsVirtualList.refresh();
		}

		this.slidingResize();
	},
	gotoMiddle: function() {
		if(debug) this.log("gotoMiddle");
		
		//this.middleRevealTop();
		this.$.slidingPane.selectView(this.$.middle);
		this.currentSlider = "middle";
		
		if(this.viewMode == "phone") {
			//this.selectedTitle = "asdf";
			this.selectedChanid = "";
			this.selectedRecstartts = "";
			this.$.titlesVirtualRepeater.render();
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
			case 'webmyth2_recorded_left':
				this.currentSlider = "left";
				this.$.programsSearchInput.forceBlur();
				break;
			case 'webmyth2_recorded_middle':
				this.currentSlider = "middle";
				if(this.filterString.length > 0) {
					
					this.$.programsSearchInput.setValue(this.filterString);
					this.$.programsSearchInput.forceFocus();
					
					this.filterString = "";
				}
				break;
			case 'webmyth2_recorded_right':
				this.currentSlider = "right";
				this.$.programsSearchInput.forceBlur();
				break;
		}
	},
	recGroupSelect: function(inSender, inValue, inOldValue) {
		if(debug) this.log("recGroupSelect from "+inOldValue+" to "+inValue);
		
		WebMyth.prefsCookie.recGroup = inValue;
		//this.selectedTitle = "";
		
		this.doSavePreferences();
		
		this.leftRevealTop();
		this.finishedSelectingGroup();
	},
	titleSelect: function(inSender, inEvent) {
		if(debug) this.log("titleSelect index "+inEvent.rowIndex);
		
		var oldTitleIndex = this.selectedTitleIndex;
		
		this.selectedTitleIndex = inEvent.rowIndex;
		this.selectedTitle = this.titlesList[inEvent.rowIndex].title;
		
		//this.$.titlesVirtualRepeater.render();
		this.$.titlesVirtualRepeater.renderRow(oldTitleIndex);
		this.$.titlesVirtualRepeater.renderRow(this.selectedTitleIndex);
		
		if(this.viewMode == "phone") this.gotoMiddle();
		
		this.resetProgramsSearch();
	},
	resetProgramsSearch: function(inSender) {
		if(debug) this.log("resetProgramsSearch");
		
		this.$.programsSearchInput.setValue("");
		//this.$.programsSearchInput.forceBlur();
		this.$.programsSearchClear.hide();
		
		if(this.viewMode == "tablet") {
			this.$.programsSearchInputWrapper.show();
			this.$.programsVirtualList.resized();
		} else {
			//this.$.programsSearchInputWrapper.hide();
			this.$.programsVirtualList.resized();
		}
		
		this.finishedSelectingTitle();
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
		
		this.finishedSelectingTitle();
		
		//this.$.programsSearchInput.forceBlur();
		this.$.programsSearchInputWrapper.show();
		this.$.programsVirtualList.resized();
	},
	programSelect: function(inSender, inEvent) {
		if(debug) this.log("programSelect index "+inEvent.rowIndex);

		var newIndex = inEvent.rowIndex+this.programListOffset;
		
		var row = this.resultList[newIndex];
		
		this.selectedChanid = row.chanid;
		this.selectedRecstartts = row.recstartts;
		
		this.detailsProgram = row;
		
		//this.$.programsVirtualList.updateRow(this.selectedProgramIndex);
		//this.$.programsVirtualList.updateRow(inEvent.rowIndex);
		
		this.selectedProgramIndex = newIndex;
		
		this.$.programsVirtualList.refresh();
		
		//this.programListOffset = Math.max(0,newIndex-1);
		
		this.peopleFailure();
		this.jobqueueFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	programScreenshotSelect: function(inSender, inEvent) {
		if(debug) this.log("programScreenshotSelect index "+inEvent.rowIndex);
		
		var newIndex = inEvent.rowIndex+this.programListOffset;
		
		var row = this.resultList[newIndex];
		/*
		if(WebMyth.prefsCookie.forceScriptScreenshots) {
			var screenshotUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile+"?op=getPremadeImage&chanid=";
			screenshotUrl += row.chanid + "&starttime=" + row.recstartts.replace("T"," ");
		} else {
			var screenshotUrl = "http://"+getBackendIP(WebMyth.prefsCookie.backends,row.hostname,WebMyth.prefsCookie.masterBackendIp)+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetPreviewImage?ChanId=";
			screenshotUrl += row.chanid + "&StartTime=" + row.recstartts.replace("T"," ");
		} 
			
		this.$.recordedImageView.setCenterSrc(screenshotUrl);
		this.$.recordedImageView.render();
		this.$.recordedPane.selectViewByName("recordedImageView");
		*/
		
		this.carouselIndex = newIndex;
		this.$.recordedCarousel.setCenterView(this.getCarouselView(this.carouselIndex));
		this.$.recordedPane.selectViewByName("recordedCarousel");
		
	},
	getCarouselView: function(inIndex) {
		if(debug) this.log("getCarouselView with index: "+inIndex);
	
		var row = this.resultList[inIndex];
		
		if(row) {
	
			if((row.subtitle == null)||(row.subtitle == "")||(row.subtitle == "None")) {
				row.useSubtitle = false;
				row.useDate = true;
			} else {
				row.useSubtitle = true;
				row.useDate = false;
			}
			
			if((row.description == null)||(row.description == "")||(row.description == "None")) {
				row.hasDescription = false;
			} else {
				row.hasDescription = true;
			}
			
			if(document.body.clientWidth > 800) {
				row.screenshotWidth = "800px";
			} else if(document.body.clientWidth > 500) {
				row.screenshotWidth = "500px";
			} else {
				row.screenshotWidth = "300px";
			} 
			
			
			if(WebMyth.prefsCookie.forceScriptScreenshots) {
				row.screenshotUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile+"?op=getPremadeImage&chanid=";
				row.screenshotUrl += row.chanid + "&starttime=" + row.recstartts.replace("T"," ");
			} else if(WebMyth.prefsCookie.DBSchemaVer > 1269) {
				var screenshotUrl = "http://"+getBackendIP(WebMyth.prefsCookie.backends,row.hostname,WebMyth.prefsCookie.masterBackendIp)+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Content/GetPreviewImage?ChanId=";
				screenshotUrl += row.chanid + "&StartTime=" + row.recstartts.replace("T"," ");
			} else {
				row.screenshotUrl = "http://"+getBackendIP(WebMyth.prefsCookie.backends,row.hostname,WebMyth.prefsCookie.masterBackendIp)+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetPreviewImage?ChanId=";
				row.screenshotUrl += row.chanid + "&StartTime=" + row.recstartts.replace("T"," ");
			}
			
			
			if(debug) this.log("getCarouselView screenshotUrl: "+row.screenshotUrl);
	
			return {kind: "VFlexBox", className: "recordedCarousel", flex: 1, align: "center", pack: "justify", owner: this, components: [
			
					{kind: "Toolbar", width: "100%", layoutKind: "VFlexLayout", components: [
						{content: row.title, kind: "Control", className: "headerTitle"},
						{content: row.subtitle, kind: "Control", className: "carouselSubtitle", showing: row.useSubtitle}, 
						{content: row.starttime.substring(0,10), kind: "Control", className: "carouselDate", showing: row.useDate}, 
					]},
							
					{kind: "HFlexBox", flex: 1, height: "auto", width: "100%", align: "center", pack: "center", components: [
					//	{kind: "Image", src: row.screenshotUrl, className: "carouselScreenshot", width: row.screenshotWidth, flex2: 1},
						{kind: "ImageView", flex2: 1, className: "imageView", centerSrc: row.screenshotUrl},
					]},
					
								
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
		this.selectedRecstartts = row.recstartts;
		
		this.detailsProgram = row;
		
		this.selectedProgramIndex = this.carouselIndex;
		
		this.programListOffset = Math.max(0,this.carouselIndex-1);
		this.$.programsVirtualList.punt();
		
		this.peopleFailure();
		this.jobqueueFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);

		//this.middleRevealTop();
		
		this.showSlidingPane();
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	screenshotSelect: function() {
		if(debug) this.log("screenshotSelect");
		
		var row = this.detailsProgram;
		
		
		if(WebMyth.prefsCookie.forceScriptScreenshots) {
			var screenshotUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile+"?op=getPremadeImage&chanid=";
			screenshotUrl += row.chanid + "&starttime=" + row.recstartts.replace("T"," ");
		} else if(WebMyth.prefsCookie.DBSchemaVer > 1269) {
			var screenshotUrl = "http://"+getBackendIP(WebMyth.prefsCookie.backends,row.hostname,WebMyth.prefsCookie.masterBackendIp)+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Content/GetPreviewImage?ChanId=";
			screenshotUrl += row.chanid + "&StartTime=" + row.recstartts.replace("T"," ");
		} else {
			var screenshotUrl = "http://"+getBackendIP(WebMyth.prefsCookie.backends,row.hostname,WebMyth.prefsCookie.masterBackendIp)+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetPreviewImage?ChanId=";
			screenshotUrl += row.chanid + "&StartTime=" + row.recstartts.replace("T"," ");
		} 
		
			
		this.$.recordedImageView.setCenterSrc(screenshotUrl);
		this.$.recordedImageView.render();
		this.$.recordedPane.selectViewByName("recordedImageView");
	},
	showSlidingPane: function() {
		if(debug)	this.log("showSlidingPane");
		
		this.$.recordedPane.selectViewByName("slidingPane");
	},
	peopleSelect: function(inSender, inEvent) {
		if(debug) this.log("peopleSelect index "+enyo.json.stringify(this.peopleList[inEvent.rowIndex]));
		
		this.doPersonSelected(this.peopleList[inEvent.rowIndex])	
	},	
	sortClick: function(inSender, inEvent) {
		if(debug) this.log("sortClick");
		
		//this.$.sortPopupMenu.openAtControl(inSender, {width: 100});
		this.$.sortPopupMenu.openAroundControl(inSender);
		//this.$.sortPopupMenu.openAroundNode(inSender.hasNode());
		//this.$.sortPopupMenu.openAtCenter();
		//this.$.sortPopupMenu.openAtEvent(inEvent);
	},
	sortSelect: function(inSender, inEvent) {
		if(inEvent) {
			if(debug) this.log("sortSelect: "+inEvent.value);
		
			var newSort;
			var sortArray = WebMyth.prefsCookie.recSort.split("[]:[]");
		
			if(this.selectedTitle == "") {
				newSort = inEvent.value+"[]:[]"+sortArray[1];
			} else {
				newSort = sortArray[0]+"[]:[]"+inEvent.value;
			}
		
			WebMyth.prefsCookie.recSort = newSort;
			this.finishedSelectingTitle();
		}
	},
	sortClosed: function() {
		if(debug) this.log("sortClosed");
	},
	playClick: function(inSender, inEvent) {
		if(debug) this.log("playClick");
		
		this.$.playPopupMenu.openAroundControl(this.$.playCommandButton);
	},
	playSelect: function(inSender, inEvent) {
		if(inEvent) {
			if(debug) this.log("playSelect: "+inEvent.value);
			
			var row = this.detailsProgram;
			
			var dateJS = new Date(isoToJS(this.detailsProgram.recstartts));
			
			var filenameRequestUrl = "http://"+WebMyth.prefsCookie.webserverUsername + ":" + WebMyth.prefsCookie.webserverPassword+"@";
			filenameRequestUrl += WebMyth.prefsCookie.webserverName+"/mythweb/pl/stream/";
			filenameRequestUrl += this.detailsProgram.chanid+"/";
			filenameRequestUrl += ((dateJS.getTime()/1000));
			filenameRequestUrl += ".mp4";
			
			if(debug) this.log("Download/stream URL is "+filenameRequestUrl);
			
			var myFilename = this.detailsProgram.title.replace(":","-") + "-" + this.detailsProgram.subtitle.replace(":","-") + ".mp4";
			myFilename.replace(/:/g,"-");
			
			if(debug) this.log("Filename is "+myFilename);
			
			
			if(inEvent.value == "Stream") {
			
				if(window.PalmSystem) {
					this.$.streamVideoService.call({id: "com.palm.app.videoplayer", target: filenameRequestUrl, params: {target: filenameRequestUrl}});
				} else {
					window.open(filenameRequestUrl);
				}
				
			} else if(inEvent.value == "Download") {
				
				var videoDirectory = "/media/internal/video/";
				
				this.doDownloadFile(filenameRequestUrl, myFilename, videoDirectory, "com.palm.app.videos");
			
			} else {
			
				if(debug) this.log("starting playback on frontend: "+inEvent.value);
				
				for(var i = 0; i < WebMyth.prefsCookie.frontends.length; i++) {
					if(inEvent.value == WebMyth.prefsCookie.frontends[i].name) WebMyth.prefsCookie.frontendIndex = parseInt(i);
				}
				
				var cmd = "program "+this.detailsProgram.chanid+" "+this.detailsProgram.recstartts+" resume";
	
				this.doRemoteCommand("play",cmd);
				
				if(WebMyth.prefsCookie.playJumpRemote) var countdown = setTimeout(enyo.bind(this, "doSelectMode", "remote"), 1000);
			
			}
	
		}
	},
	playClosed: function() {
		if(debug) this.log("playClosed");
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
			{name: "deleteMenuButton", showing: this.showDeleteMenuButton, caption: "Delete", components: [
				{caption: $L("Confirm Delete")},
			]},
			{name: "undeleteMenuButton", showing: this.showUndeleteMenuButton, caption: "Undelete", components: [
				{caption: $L("Confirm Undelete")},
			]},
			{caption: $L("Queue a job"), components: [
				{name: "transcode", caption: $L("Transcode")},
				{name: "flagCommercials", caption: $L("Flag Commercials")},
				{name: "userjob1", caption: WebMyth.prefsCookie.UserJobDesc1},
				{name: "userjob2", caption: WebMyth.prefsCookie.UserJobDesc2},
				{name: "userjob3", caption: WebMyth.prefsCookie.UserJobDesc3},
				{name: "userjob4", caption: WebMyth.prefsCookie.UserJobDesc4},
			]},
			{caption: $L("Setup Schedule")},
			{caption: $L("Guide"), components: [
				{caption: $L("Time")},
				{caption: $L("Title Search")},
			]}
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
					var dateJS = new Date(isoToJS(this.detailsProgram.recstartts.replace(" ","T")));
					var dateUTC = dateJS.getTime()/1000;
					
					this.doOpenWeb("MythWeb", "/"+this.detailsProgram.chanid+"/"+dateUTC);
					break;
				case $L("Confirm Delete"): 
					this.deleteProgram();
					break;
				case $L("Confirm Undelete"): 
					this.undeleteProgram();
					break;
				case $L("Transcode"): 
					this.queueJob(1);
					break;
				case $L("Flag Commercials"):
					this.queueJob(2);
					break;
				case WebMyth.prefsCookie.UserJobDesc1:
					this.queueJob(256);
					break;
				case WebMyth.prefsCookie.UserJobDesc2:
					this.queueJob(512);
					break;
				case WebMyth.prefsCookie.UserJobDesc3:
					this.queueJob(1024);
					break;
				case WebMyth.prefsCookie.UserJobDesc4:
					this.queueJob(2048);
					break;
				case "Setup Schedule":
					this.doSetupSchedule(this.detailsProgram);
					break;
				case "Time":
					this.doProgramGuide(this.detailsProgram.starttime);
					break;
				case "Title Search":
					this.doTitleSearch(this.detailsProgram.title);
					break;
			}
			
		}
	},
	moreClosed: function() {
		if(debug) this.log("moreClosed");
	},
	deleteProgram: function() {
		if(debug) this.log("deleteProgram");
	
		var intdate = this.detailsProgram.recstartts.replace("T","").replace(":","").replace(":","").replace("-","").replace("-","");
	
		var command = 'DELETE_RECORDING '+this.detailsProgram.chanid+" "+intdate;
	
		if(debug) this.log("Command is "+command);
		
		if(WebMyth.useScript){
	
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=backendCommand";				
			requestUrl += "&command64=";		
			requestUrl += Base64.encode(command);	
	
			if(debug) this.log("requestUrl: "+requestUrl);
			
			this.$.deleteRecordingService.setUrl(requestUrl);
			this.$.deleteRecordingService.call();
			
		} else {
		
			this.doMythprotocolPluginCommand("recorded","deleteRecordingResponse", command);
			
		}
		
	},
	undeleteProgram: function() {
		if(debug) this.log("undeleteProgram");
		
		var query = 'UPDATE `recorded` SET `recgroup` = "Default" WHERE `chanid` = '
		query += this.detailsProgram.chanid;
		query += ' AND `starttime` = "';
		query += this.detailsProgram.recstartts.replace("T"," ");
		query += '" LIMIT 1; ';
		
		if(debug) this.log("query: "+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQL";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);	
			
			if(debug) this.log("requestUrl: "+requestUrl);
			
			this.$.undeleteRecordingService.setUrl(requestUrl);
			this.$.undeleteRecordingService.call();
			
		} else {
			
			this.doMysqlPluginExecute("mysqlRecordedUndeleteRecording", query);
			
		}
		
	},
	queueJob: function(inJobType) {
		if(debug) this.log("queueJob: "+inJobType);
		
		var jobTypeNum = inJobType;
		/*
		switch(inSender.name) {
			case "transcode":
				jobTypeNum = 1;
				break;
			case "flagCommercials":
				jobTypeNum = 2;
				break;
			case "userjob1":
				jobTypeNum = 256;
				break;
			case "userjob2":
				jobTypeNum = 512;
				break;
			case "userjob3":
				jobTypeNum = 1024;
				break;
			case "userjob4":
				jobTypeNum = 2048;
				break;
		}
		*/
		
		var jobExists = false;
		
		for(var i = 0; i < this.jobqueueList.length; i++) {
			if(this.jobqueueList[i].type == jobTypeNum) jobExists = true;
		}
		
		if(jobExists) {
			this.bannerMessage("This job type is still active for this program.  You cannot start this job now.");
			
			return true;
		}
		
		var nowDate = new Date();
		var nowDateISO = dateJSToISO(nowDate);
	
		var query = 'INSERT INTO `jobqueue` SET `chanid` = "'+this.detailsProgram.chanid;
		query += '", starttime = "'+this.detailsProgram.recstartts.replace("T"," ");
		query += '", inserttime = "'+nowDateISO.replace("T"," ");
		query += '", type = "'+jobTypeNum;
		query += '", hostname = "';
		query += '", args = "';
		query += '", status = "1';
		query += '", statustime = "'+nowDateISO.replace("T"," ");
		query += '", schedruntime = "'+nowDateISO.replace("T"," ");
		query += '", comment = "Queued by WebMyth app';
		query += '", flags = "0" ;';
		
		if(debug) this.log("query: "+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQL";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);	
			
			if(debug) this.log("requestUrl: "+requestUrl);
			
			this.$.scheduleJobService.setUrl(requestUrl);
			this.$.scheduleJobService.call();
			
		} else {
			
			this.doMysqlPluginExecute("mysqlRecordedQueueJob", query);
			
		}
		
	},

	
	//Recorded functions
	getRecorded: function() {
		if(debug) this.log("getRecorded");
		
		//this.$.scrim.show();
		this.$.loadingPopup.openAtCenter();
		this.$.spinnerLarge.show();
		
		var requestUrl = "";
		
		if(false) {
		
			requestUrl += "http://192.168.1.105/dropbox/GetRecorded.xml";
			this.$.getRecorded25Service.setUrl(requestUrl);
			this.$.getRecorded25Service.call();
			
		} else if(WebMyth.prefsCookie.mythwebXml) {
			
			requestUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetRecorded?MythXMLKey=";
			requestUrl += WebMyth.prefsCookie.MythXML_key;
			
			this.$.getRecordedService.setUrl(requestUrl);
			this.$.getRecordedService.call();
			
		} else if(WebMyth.prefsCookie.DBSchemaVer > 1269){
			
			requestUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Dvr/GetRecorded";
			this.$.getRecorded25Service.setUrl(requestUrl);
			this.$.getRecorded25Service.call();
			
		} else {
			
			requestUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetRecorded";
			
			this.$.getRecordedService.setUrl(requestUrl);
			this.$.getRecordedService.call();
			
		}
		
		if(debug) this.log("requestUrl: "+requestUrl);
		
		//if(debug) window.open(requestUrl);
		
		//this.$.getRecordedService.setUrl(requestUrl);
		//this.$.getRecordedService.call();
	},
	recordedResponse: function(inSender, inResponse) {
		if(debug) this.log("recordedResponse");
		
		var xmlobject = inResponse;
		
		//Local variables
		var topNode, topNodesCount, topSingleNode, programsNode, programsNode;
		var singleProgramNode, singleProgramJson = {}, singleRecordedGroupJson = {}, singleRecordedTitleJson = {};
		var singleProgramChildNode;
		var protoVer;
		
		
		
		this.fullResultList.length = 0;
		this.fullGroupsList.length = 0;
		this.fullTitlesList.length = 0;
		
		try{
			//Start parsing
			topNode = xmlobject.getElementsByTagName("GetRecordedResponse")[0];
			var topNodesCount = topNode.childNodes.length;
			for(var i = 0; i < topNodesCount; i++) {
				topSingleNode = topNode.childNodes[i];
				//if(debug) this.log("topSingleNode.nodeName is "+topSingleNode.nodeName);
				switch(topSingleNode.nodeName) {
					case 'ProtoVer':
						protoVer = topSingleNode.childNodes[0].nodeValue;
						
						if(WebMyth.prefsCookie.protoVer != protoVer) WebMyth.prefsCookie.protoVerSubmitted = false;
						
						WebMyth.prefsCookie.protoVer = protoVer;
						
						break;
					case 'Recorded':
						if(debug) this.log('Starting to parse Recorded node');
						programsNode = topSingleNode.childNodes[0];
						for(var j = 0; j < programsNode.childNodes.length; j++) {
							programsSingleNode = programsNode.childNodes[j];
							//this.log("Node name is "+programsSingleNode.nodeName);
							if(programsSingleNode.nodeName == 'Program') {
								//this.log('Inside Program if');
								singleProgramNode = programsSingleNode;
								
										singleProgramJson = {
											"title": singleProgramNode.getAttributeNode("title").nodeValue, 
											"subtitle": singleProgramNode.getAttributeNode("subTitle").nodeValue, 
											"programflags": singleProgramNode.getAttributeNode("programFlags").nodeValue, 
											"category": singleProgramNode.getAttributeNode("category").nodeValue, 
											"filesize": singleProgramNode.getAttributeNode("fileSize").nodeValue, 
											"seriesid": singleProgramNode.getAttributeNode("seriesId").nodeValue, 
											"hostname": singleProgramNode.getAttributeNode("hostname").nodeValue, 
											"cattype": singleProgramNode.getAttributeNode("catType").nodeValue, 
											"programid": singleProgramNode.getAttributeNode("programId").nodeValue, 
											"repeat": singleProgramNode.getAttributeNode("repeat").nodeValue, 
						//					"stars": singleProgramNode.getAttributeNode("stars").nodeValue, 
											"endtime": singleProgramNode.getAttributeNode("endTime").nodeValue, 
						//					"airdate": singleProgramNode.getAttributeNode("airdate").nodeValue, 
											"starttime": singleProgramNode.getAttributeNode("startTime").nodeValue,
											"lastmodified": singleProgramNode.getAttributeNode("lastModified").nodeValue, 
											"starttimehourminute": singleProgramNode.getAttributeNode("startTime").nodeValue.substring(11,16),
											"endtimehourminute": singleProgramNode.getAttributeNode("endTime").nodeValue.substring(11,16)
										}
										
										try {
											singleProgramJson.stars = singleProgramNode.getAttributeNode("stars").nodeValue;
											singleProgramJson.airdate = singleProgramNode.getAttributeNode("airdate").nodeValue;
										} catch(e) {
											if(debug) this.log("Error with getting airdate and stars");
											singleProgramJson.stars = "";
											singleProgramJson.airdate = "";
										}
										
										singleRecordedTitleJson = {
											"label": singleProgramNode.getAttributeNode("title").nodeValue, 
											"title": singleProgramNode.getAttributeNode("title").nodeValue,
											"group": "",
										};
										
										for(var l = 0; l < singleProgramNode.childNodes.length; l++) {
											singleProgramChildNode = singleProgramNode.childNodes[l];
											
											if(l == 0) singleProgramJson.description = singleProgramChildNode.nodeValue;
											
											
											if(singleProgramChildNode.nodeName == "Channel") {
						//						singleProgramJson.inputId = singleProgramChildNode.getAttributeNode("inputId").nodeValue;
						//						singleProgramJson.chanFilters = singleProgramChildNode.getAttributeNode("chanFilters").nodeValue;
						//						singleProgramJson.commFree = singleProgramChildNode.getAttributeNode("commFree").nodeValue;
												singleProgramJson.channame = singleProgramChildNode.getAttributeNode("channelName").nodeValue;
						//						singleProgramJson.sourceId = singleProgramChildNode.getAttributeNode("sourceId").nodeValue;
												singleProgramJson.chanid = singleProgramChildNode.getAttributeNode("chanId").nodeValue;
												singleProgramJson.channum = singleProgramChildNode.getAttributeNode("chanNum").nodeValue;
												singleProgramJson.callsign = singleProgramChildNode.getAttributeNode("callSign").nodeValue;
											} 
											
											if(singleProgramChildNode.nodeName == "Recording") {
						//						singleProgramJson.recpriority = singleProgramChildNode.getAttributeNode("recPriority").nodeValue;
						//						singleProgramJson.playgroup = singleProgramChildNode.getAttributeNode("playGroup").nodeValue;
												singleProgramJson.recstatus = singleProgramChildNode.getAttributeNode("recStatus").nodeValue;
												singleProgramJson.recstartts = singleProgramChildNode.getAttributeNode("recStartTs").nodeValue;
												singleProgramJson.recgroup = singleProgramChildNode.getAttributeNode("recGroup").nodeValue;
						//						singleProgramJson.dupmethod = singleProgramChildNode.getAttributeNode("dupMethod").nodeValue;
												singleProgramJson.rectype = singleProgramChildNode.getAttributeNode("recType").nodeValue;
						//						singleProgramJson.encoderid = singleProgramChildNode.getAttributeNode("encoderId").nodeValue;
						//						singleProgramJson.recprofile = singleProgramChildNode.getAttributeNode("recProfile").nodeValue;
						//						singleProgramJson.recendts = singleProgramChildNode.getAttributeNode("recEndTs").nodeValue;
												singleProgramJson.recordid = singleProgramChildNode.getAttributeNode("recordId").nodeValue;
						//						singleProgramJson.dupintype = singleProgramChildNode.getAttributeNode("dupInType").nodeValue;
						
												singleRecordedGroupJson = {
													"label": singleProgramChildNode.getAttributeNode("recGroup").nodeValue,
													"group": singleProgramChildNode.getAttributeNode("recGroup").nodeValue,
													"caption": singleProgramChildNode.getAttributeNode("recGroup").nodeValue,
													//"command": "go-group"+singleProgramChildNode.getAttributeNode("recGroup").nodeValue
												};
												
												singleRecordedTitleJson.group = singleProgramChildNode.getAttributeNode("recGroup").nodeValue;
												
											}
											
										};
										
										
										if(singleProgramJson.description == null) singleProgramJson.description = "";
										
										this.fullResultList.push(singleProgramJson);
										this.fullGroupsList.push(singleRecordedGroupJson);
										this.fullTitlesList.push(singleRecordedTitleJson);
										//this.log("Program json is ", enyo.json.stringify(singleProgramJson));
										
									
								
							}
						}
						
						if(debug) this.log('Done parsing Recorded');
						
						//this.log("this.fullTitlesList: ",enyo.json.stringify(this.fullTitlesList));
						
						this.groupsList = cleanTitleList(this.fullGroupsList,"");
						this.groupsList.splice(0,0,{label: "All", group: "", value: "", caption: "All"});
		
						this.titlesList = cleanTitleList(this.fullTitlesList,WebMyth.prefsCookie.recGroup);
						
						//if(debug) this.log("fullResultList full json is ", enyo.json.stringify(this.fullResultList));
						//if(debug) this.log("groupsList full json is ", enyo.json.stringify(this.groupsList));
						//if(debug) this.log("titlesList full json is ", enyo.json.stringify(this.titlesList));
			
						
						break;
					default:
						//if(debug) this.log("node name is "+topSingleNode.nodeName);
						break;
				}
			}
		
		} catch(e) {
		
			this.error(e);
		
		}
	
		if(debug) this.log("completed recorded XML parsing with "+this.fullResultList.length+" total items");
		
		this.$.errorMessage.setContent("");
		
		this.leftRevealTop();
		
		this.finishedGettingRecorded();
		
	},
	recordedFailure: function(inSender, inResponse) {
		this.error("recordedFailure");
		
		this.$.errorMessage.setContent("ERROR: Failed to get list of recorded programs from backend at '"+WebMyth.prefsCookie.masterBackendIp+"'");
		
		this.finishedGettingRecorded();
	},
	recorded25Response: function(inSender, inResponse) {
		if(debug) this.log("recorded25Response");
		
		var xmlobject = inResponse;
		
		//Local variables
		var topNode, topNodesCount, topSingleNode, programsNode, programsNode;
		var singleProgramNode, singleProgramJson = {}, singleRecordedGroupJson = {}, singleRecordedTitleJson = {};
		var singleProgramChildNode, singleProgramChannelChildNode, singleProgramRecordingChildNode;
		var protoVer;
		
		
		this.fullResultList.length = 0;
		this.fullGroupsList.length = 0;
		this.fullTitlesList.length = 0;
		
		try {
			//Start parsing
			topNode = xmlobject.getElementsByTagName("ProgramList")[0];
			var topNodesCount = topNode.childNodes.length;
			for(var i = 0; i < topNodesCount; i++) {
				topSingleNode = topNode.childNodes[i];
				//if(debug) this.log("topSingleNode.nodeName is "+topSingleNode.nodeName);
				switch(topSingleNode.nodeName) {
					case 'ProtoVer':
						protoVer = topSingleNode.childNodes[0].nodeValue;
						
						if(WebMyth.prefsCookie.protoVer != protoVer) WebMyth.prefsCookie.protoVerSubmitted = false;
						
						WebMyth.prefsCookie.protoVer = protoVer;
						
						break;
					case 'Programs':
						//if(debug) this.log('Starting to parse Programs node');
						//programsNode = topSingleNode.childNodes[0];
						for(var j = 0; j < topSingleNode.childNodes.length; j++) {
						//for(var j = 260; j < topSingleNode.childNodes.length; j++) {
							programsSingleNode = topSingleNode.childNodes[j];
							//if(debug) this.log("Node name is "+programsSingleNode.nodeName);
							if(programsSingleNode.nodeName == 'Program') {
								//if(debug) this.log('Inside Program if');
								singleProgramNode = programsSingleNode;
								
								singleProgramJson = {};
								singleRecordedGroupJson = {};
								singleRecordedTitleJson = {};
								
								for(var l = 0; l < singleProgramNode.childNodes.length; l++) {
									//if(debug) this.log('singleProgramChildNode.nodeName: '+singleProgramChildNode.nodeName);
								
									singleProgramChildNode = singleProgramNode.childNodes[l];
									
									switch(singleProgramChildNode.nodeName) {
										case "StartTime":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.starttime = singleProgramChildNode.childNodes[0].nodeValue;
											break;
										case "EndTime":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.endtime = singleProgramChildNode.childNodes[0].nodeValue;
											break;
										case "Title":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.title = singleProgramChildNode.childNodes[0].nodeValue;
											if(singleProgramChildNode.childNodes[0]) singleRecordedTitleJson.title = singleProgramChildNode.childNodes[0].nodeValue;
											if(singleProgramChildNode.childNodes[0]) singleRecordedTitleJson.label = singleProgramChildNode.childNodes[0].nodeValue;
											
											break;
										case "SubTitle":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.subtitle = singleProgramChildNode.childNodes[0].nodeValue;
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
										case "SeriesId":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.seriesid = singleProgramChildNode.childNodes[0].nodeValue;
											break;
										case "ProgramId":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.programid = singleProgramChildNode.childNodes[0].nodeValue;
											break;
										case "Stars":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.stars = singleProgramChildNode.childNodes[0].nodeValue;
											break;
										case "FileSize":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.filesize = singleProgramChildNode.childNodes[0].nodeValue;
											break;
										case "LastModified":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.lastmodified = singleProgramChildNode.childNodes[0].nodeValue;
											break;
										case "ProgramFlags":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.programflags = singleProgramChildNode.childNodes[0].nodeValue;
											break;
										case "Hostname":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.hostname = singleProgramChildNode.childNodes[0].nodeValue;
											break;
										case "Airdate":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.airdate = singleProgramChildNode.childNodes[0].nodeValue;
											break;
										case "#text":
											singleProgramJson.description = singleProgramChildNode.nodeValue;
											break;
										case "Inetref":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.inetref = singleProgramChildNode.childNodes[0].nodeValue;
											break;
										case "Season":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.season = singleProgramChildNode.childNodes[0].nodeValue;
											break;
										case "Episode":
											if(singleProgramChildNode.childNodes[0]) singleProgramJson.episode = singleProgramChildNode.childNodes[0].nodeValue;
											break;
											
										case "Channel":
											for(var m = 0; m < singleProgramChildNode.childNodes.length; m++) {
												singleProgramChannelChildNode = singleProgramChildNode.childNodes[m];
												//if(debug) this.log('singleProgramChannelChildNode.nodeName: '+singleProgramChannelChildNode.nodeName);
												
												switch(singleProgramChannelChildNode.nodeName) {
													case "ChanId":
														if(singleProgramChannelChildNode.childNodes[0]) singleProgramJson.chanid = singleProgramChannelChildNode.childNodes[0].nodeValue;
														break;
													case "ChanNum":
														if(singleProgramChannelChildNode.childNodes[0]) singleProgramJson.channum = singleProgramChannelChildNode.childNodes[0].nodeValue;
														break;
													case "CallSign":
														if(singleProgramChannelChildNode.childNodes[0]) singleProgramJson.callsign = singleProgramChannelChildNode.childNodes[0].nodeValue;
														break;
													case "ChannelName":
														if(singleProgramChannelChildNode.childNodes[0]) singleProgramJson.channame = singleProgramChannelChildNode.childNodes[0].nodeValue;
														break;
												}
											}
											break;
										case "Recording":
											for(var m = 0; m < singleProgramChildNode.childNodes.length; m++) {
												singleProgramRecordingChildNode = singleProgramChildNode.childNodes[m];
												//if(debug) this.log('singleProgramRecordingChildNode.nodeName: '+singleProgramRecordingChildNode.nodeName);
												
												switch(singleProgramRecordingChildNode.nodeName) {
													case "Status":
														if(singleProgramRecordingChildNode.childNodes[0]) singleProgramJson.recstatus = singleProgramRecordingChildNode.childNodes[0].nodeValue;
														break;
													case "StartTs":
														if(singleProgramRecordingChildNode.childNodes[0]) singleProgramJson.recstartts = singleProgramRecordingChildNode.childNodes[0].nodeValue;
														break;
													case "EndTs":
														if(singleProgramRecordingChildNode.childNodes[0]) singleProgramJson.recendts = singleProgramRecordingChildNode.childNodes[0].nodeValue;
														break;
													case "RecordId":
														if(singleProgramRecordingChildNode.childNodes[0]) singleProgramJson.recordid = singleProgramRecordingChildNode.childNodes[0].nodeValue;
														break;
													case "RecGroup":
														if(singleProgramRecordingChildNode.childNodes[0]) singleProgramJson.recgroup = singleProgramRecordingChildNode.childNodes[0].nodeValue;
														if(singleProgramRecordingChildNode.childNodes[0]) singleRecordedTitleJson.group = singleProgramRecordingChildNode.childNodes[0].nodeValue;
														if(singleProgramRecordingChildNode.childNodes[0]) singleRecordedGroupJson.label = singleProgramRecordingChildNode.childNodes[0].nodeValue;
														if(singleProgramRecordingChildNode.childNodes[0]) singleRecordedGroupJson.caption = singleProgramRecordingChildNode.childNodes[0].nodeValue;
														if(singleProgramRecordingChildNode.childNodes[0]) singleRecordedGroupJson.group = singleProgramRecordingChildNode.childNodes[0].nodeValue;
														break;
													case "RecType":
														if(singleProgramRecordingChildNode.childNodes[0]) singleProgramJson.rectype = singleProgramRecordingChildNode.childNodes[0].nodeValue;
														break;
												}
											}
											break;
											
										default:
											if(debug) this.log('unknown singleProgramChildNode.nodeName: '+singleProgramChildNode.nodeName);
											break;
									}		
								}
										
								
								if(singleProgramJson.title == null) singleProgramJson.title = "[Unknown - Blank]";
								if(singleProgramJson.subtitle == null) singleProgramJson.subtitle = "";
								if(singleProgramJson.description == null) singleProgramJson.description = "";
								
								if(singleRecordedTitleJson.title == null) singleRecordedTitleJson.title = "[Unknown - Blank]";
								if(singleRecordedTitleJson.label == null) singleRecordedTitleJson.label = "[Unknown - Blank]";
								
								this.fullResultList.push(singleProgramJson);
								this.fullGroupsList.push(singleRecordedGroupJson);
								this.fullTitlesList.push(singleRecordedTitleJson);

								//this.log("Program json is ", enyo.json.stringify(singleProgramJson));
									
								
							}
						}
				}
			}
		} catch(e) {
			this.error(e);
		}
		
		//this.log("this.fullTitlesList: ",enyo.json.stringify(this.fullTitlesList));
		
		this.groupsList = cleanTitleList(this.fullGroupsList,"");
		this.groupsList.splice(0,0,{label: "All", group: "", value: "", caption: "All"});
		
		this.titlesList = cleanTitleList(this.fullTitlesList,WebMyth.prefsCookie.recGroup);
		
		if(debug) this.log("completed recorded XML parsing with "+this.fullResultList.length+" total items");
		
		this.$.errorMessage.setContent("");
		
		this.leftRevealTop();
		
		this.finishedGettingRecorded();
	},
	recorded25Failure: function(inSender, inResponse) {
		this.error("recorded25Failure");
		
		this.$.errorMessage.setContent("ERROR: Failed to get list of recorded programs from backend at '"+WebMyth.prefsCookie.masterBackendIp+"'");
		
		this.finishedGettingRecorded();
	},
	finishedGettingRecorded: function() {
		if(debug) this.log("finishedGettingRecorded");
		
		this.resize(this.viewMode);
		
		this.$.recGroupSelector.setItems(this.groupsList);
		
		this.finishedSelectingGroup();
	},
	finishedSelectingGroup: function() {
		if(debug) this.log("finishedSelectingGroup and have recGroup: "+WebMyth.prefsCookie.recGroup+" and selectedTitle: "+this.selectedTitle);
	
		this.titlesList.length = 0;
		this.middleResultList.length = 0;
		
		this.titlesList = cleanTitleList(this.fullTitlesList,WebMyth.prefsCookie.recGroup);
		this.middleResultList = trimList(this.fullResultList,"recgroup",WebMyth.prefsCookie.recGroup);
		
		this.$.recGroupSelector.setValue(WebMyth.prefsCookie.recGroup);
		this.titlesList.splice(0,0,{label: "All", title: "", count: this.middleResultList.length});
		
		this.finishedSelectingTitle();
	},
	finishedSelectingTitle: function() {
		if(debug) this.log("finishedSelectingTitle with selectedTitle: "+this.selectedTitle);
		
		this.$.titlesVirtualRepeater.render();
		
		this.resultList.length = 0;
		this.resultList = this.filterPrograms(trimList(this.middleResultList,"title",this.selectedTitle));
		
		if((this.selectedTitle == "")&&(WebMyth.prefsCookie.recGroup == "")) {
			this.$.middleHeaderTitle.setContent("All Recorded");
		} else if(this.selectedTitle == "") {
			this.$.middleHeaderTitle.setContent("Recorded ["+WebMyth.prefsCookie.recGroup+"]");
		} else {
			this.$.middleHeaderTitle.setContent(this.selectedTitle);
		}

		this.$.middleHeaderCount.setContent("("+this.resultList.length+" items)");
		
		var sort;
		var sortArray = WebMyth.prefsCookie.recSort.split("[]:[]");
		
		if(this.selectedTitle == "") {
			sort = sortArray[0];
		} else {
			sort = sortArray[1];
		}
		
		switch(sort){
			case "Category [Asc]":
				this.resultList.sort(triple_sort_by('category', 'title', 'recstartts', false));
				break;
			case "Category [Desc]":
				this.resultList.sort(triple_sort_by('category', 'title', 'recstartts', true));
				break;
			case "Date [Asc]":
				this.resultList.sort(double_sort_by('recstartts', 'title', false));
				break;
			case "Date [Desc]":
				this.resultList.sort(double_sort_by('recstartts', 'title', true));
				break;
			case "Original Airdate [Asc]":
				this.resultList.sort(triple_sort_by('airdate', 'title', 'recstartts', false));
				break;
			case "Original Airdate [Desc]":
				this.resultList.sort(triple_sort_by('airdate', 'title', 'recstartts', true));
				break;
			case "Title [Asc]":
				this.resultList.sort(double_sort_by('title', 'recstartts', false));
				break;
			case "Title [Desc]":
				this.resultList.sort(double_sort_by('title', 'recstartts', true));
				break;
			default: 
				this.resultList.sort(double_sort_by('recstartts', 'title', true));
				break;

		}
		
		this.updateSortMenu();
		
		this.middleRevealTop();
		
		this.detailsProgram = defaultProgram;
		this.selectedChanid = "";
		this.selectedRecstartts = "";
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
		
			if(s.title.toUpperCase().indexOf(filterString) >= 0) {
				finalList.push(s);
			} else if(s.subtitle.toUpperCase().indexOf(filterString) >= 0) {
				finalList.push(s);
			} else if(s.category.toUpperCase().indexOf(filterString) >= 0) {
				finalList.push(s);
			} else if(s.channame.toUpperCase().indexOf(filterString) >= 0) {
				finalList.push(s);
			} 
		}	
		
		return finalList;
	},
	getTitleItem: function(inSender, inIndex) {
		var row = this.titlesList[inIndex];
		
		if(row) {
		
			this.$.title.setContent(row.label);
			this.$.count.setContent("("+row.count+")");
						
			if((row.title == this.selectedTitle)&&(this.viewMode == "tablet")) {
				this.$.titleItem.addClass("selected");
				//this.$.titleItem.setStyle("background-color:rgba(255,255,255,0.05);border-top-color:rgba(0,0,0,0.05);");
			} else {
				this.$.titleItem.removeClass("selected");
				//this.$.titleItem.setStyle("background-color: none;");
			}
			
			if(inIndex == 0) this.$.titleItem.setStyle("border-top: none;");
			
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
			
			if(WebMyth.prefsCookie.forceScriptScreenshots) {
				var screenshotUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile+"?op=getPremadeImage&chanid=";
				screenshotUrl += row.chanid + "&starttime=" + row.recstartts.replace("T"," ");
			} else if(WebMyth.prefsCookie.DBSchemaVer > 1269) {
				var screenshotUrl = "http://"+getBackendIP(WebMyth.prefsCookie.backends,row.hostname,WebMyth.prefsCookie.masterBackendIp)+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Content/GetPreviewImage?ChanId=";
				screenshotUrl += row.chanid + "&StartTime=" + row.recstartts.replace("T"," ");
			} else {
				var screenshotUrl = "http://"+getBackendIP(WebMyth.prefsCookie.backends,row.hostname,WebMyth.prefsCookie.masterBackendIp)+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetPreviewImage?ChanId=";
				screenshotUrl += row.chanid + "&StartTime=" + row.recstartts.replace("T"," ");
			} 
			
			this.$.programTitle.setContent(row.title);
			
			this.$.screenshot.setSrc(screenshotUrl);
			
			this.$.row1.setContent(row.subtitle);
			this.$.row2.setContent(row.starttime.replace("T"," "));
			this.$.row3.setContent(row.category);
			
			if(row.recstatus == -2) {
				this.$.row4.setContent("Currently Recording");	
			} else {
				this.$.row4.setContent(row.channum+" - "+row.channame);	
			}
			
			if((row.chanid == this.selectedChanid)&&(row.recstartts == this.selectedRecstartts)&&(this.viewMode == "tablet")) {
				//this.$.programItem.setStyle("background-color:rgba(0,0,0,0.05);border-top-color:rgba(0,0,0,0.05);");
				//this.$.programItem.setClassName("enyo-item programList selected "+row.recgroup);
				this.$.programItem.addClass("selected");
			} else {
				//this.$.programItem.setStyle("background-color: none;");
				//this.$.programItem.setClassName("enyo-item programList "+row.recgroup);
				this.$.programItem.removeClass("selected");
			}

			this.$.programItem.addClass(row.recgroup);
			
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
		
		var sort;
		var sortArray = WebMyth.prefsCookie.recSort.split("[]:[]");
		
		if(this.selectedTitle == "") {
			sort = sortArray[0];
		} else {
			sort = sortArray[1];
		}
		
		try{
		
		switch(sort){
			case "Category [Asc]":
				var a = r0 && r0.category;
				var b = r1.category;
				break;
			case "Category [Desc]":
				var a = r0 && r0.category;
				var b = r1.category;
				break;
			case "Date [Asc]":
				//var a = r0 && r0.starttime.substring(0,10);
				//var b = r1.starttime.substring(0,10);
				var a = r0 && WebMyth.dateFormatter.format(new Date(isoToJS(r0.starttime)));
				var b = WebMyth.dateFormatter.format(new Date(isoToJS(r1.starttime)));
				break;
			case "Date [Desc]":
				//var a = r0 && r0.starttime.substring(0,10);
				//var b = r1.starttime.substring(0,10);
				var a = r0 && WebMyth.dateFormatter.format(new Date(isoToJS(r0.starttime)));
				var b = WebMyth.dateFormatter.format(new Date(isoToJS(r1.starttime)));
				break;
			case "Original Airdate [Asc]":
				//var a = r0 && r0.airdate;
				//var b = r1.airdate;
				var a = r0 && WebMyth.fulldateFormatter.format(new Date(isoToJS(r0.airdate+"T00:00:00")));
				var b = WebMyth.fulldateFormatter.format(new Date(isoToJS(r1.airdate+"T00:00:00")));
				break;
			case "Original Airdate [Desc]":
				//var a = r0 && r0.airdate;
				//var b = r1.airdate;
				var a = r0 && WebMyth.fulldateFormatter.format(new Date(isoToJS(r0.airdate+"T00:00:00")));
				var b = WebMyth.fulldateFormatter.format(new Date(isoToJS(r1.airdate+"T00:00:00")));
				break;
			case "Title [Asc]":
				var a = r0 && r0.title;
				var b = r1.title;
				break;
			case "Title [Desc]":
				var a = r0 && r0.title;
				var b = r1.title;
				break;
			default: 
				var a = r0 && r0.title;
				var b = r1.title;
				break;

		}
		
		} catch(e) {
			if(debug) this.log(e);
		}
		
		return a != b ? b : null;
	},
	showDetails: function() {
		if(debug) this.log("showDetails");
		
		var row = {};
		//var screenshotUrl;
		
		if(this.selectedChanid == "") {
			this.detailsProgram = defaultProgram;
			
			row = this.detailsProgram;
			
			this.$.rightDetailsScreenshot.hide();
			
			this.$.playCommandButton.hide();
			this.$.moreCommandButton.hide();
			
			this.$.rightCommandMenu.render();
			
			this.$.rightHeaderTitle.setContent("Details");
			
		} else {
			
			row = this.detailsProgram;
			
			
			if(WebMyth.prefsCookie.forceScriptScreenshots) {
				var screenshotUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile+"?op=getPremadeImage&chanid=";
				screenshotUrl += row.chanid + "&starttime=" + row.recstartts.replace("T"," ");
			} else if(WebMyth.prefsCookie.DBSchemaVer > 1269) {
				var screenshotUrl = "http://"+getBackendIP(WebMyth.prefsCookie.backends,row.hostname,WebMyth.prefsCookie.masterBackendIp)+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Content/GetPreviewImage?ChanId=";
				screenshotUrl += row.chanid + "&StartTime=" + row.recstartts.replace("T"," ");
			} else {
				var screenshotUrl = "http://"+getBackendIP(WebMyth.prefsCookie.backends,row.hostname,WebMyth.prefsCookie.masterBackendIp)+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetPreviewImage?ChanId=";
				screenshotUrl += row.chanid + "&StartTime=" + row.recstartts.replace("T"," ");
			} 
			
			
			this.$.rightDetailsScreenshot.setSrc(screenshotUrl);
			this.$.rightDetailsScreenshot.show();
			
			this.$.playCommandButton.show();
			this.$.moreCommandButton.show();
			
			this.$.rightCommandMenu.render();
			
			this.$.rightHeaderTitle.setContent(row.title);
		}
		
		if(row.recstatus == -2) {
			this.$.recStatusText.setContent("Currently Recording");
			this.$.recStatusText.show();
		} else {
			this.$.recStatusText.hide();
		} 
		
		if(this.detailsProgram.recgroup == "Deleted") {
			//this.$.deleteMenuButton.hide();
			//this.$.undeleteMenuButton.show();
			this.showDeleteMenuButton = false;
			this.showUndeleteMenuButton = true;
			
		} else {
			//this.$.deleteMenuButton.show();
			//this.$.undeleteMenuButton.hide();
			this.showDeleteMenuButton = true;
			this.showUndeleteMenuButton = false;
		
		}
		
		
		this.$.subtitle.setContent(row.subtitle);
		this.$.detailsDescription.setContent(row.description);
		this.$.category.setContent(row.category);
		
		this.$.airdate.setContent(row.airdate);
		this.$.seriesid.setContent(row.seriesid);
		this.$.programid.setContent(row.programid);
		this.$.channum.setContent(row.channum);
		this.$.channame.setContent(row.channame);
		this.$.starttime.setContent(row.starttime.replace("T"," "));
		this.$.endtime.setContent(row.endtime.replace("T"," "));
		
		this.$.hostname.setContent(row.hostname);
		this.$.recgroup.setContent(row.recgroup);
		this.$.recstartts.setContent(row.recstartts.replace("T"," "));
		
		if(row.filesize == "") {
			this.$.filesize.setContent("");
		} else {
			this.$.filesize.setContent(parseInt(row.filesize.substring(0,row.filesize.length-6))+" MB");
		}
		
		//this.$.rightDetails.setContent(enyo.json.stringify(row));
		
		this.rightRevealTop();
		
		this.$.peopleSpinnerItem.show();
		this.$.jobqueueSpinnerItem.show();
		
		if(row.filesize.length > 0) {
			this.getPeople();
		} else {
			this.peopleFailure(); 
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
			
			this.doMysqlPluginCommand("mysqlRecordedGetPeople", query);
			
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
		
		if(row.filesize.length > 0) {
			setTimeout(enyo.bind(this,"getJobqueue"),300);
		} else {
			this.jobqueueFailure(); 
		}
		
	},
	peopleFailure: function(inSender, inResponse) {
		if(debug) this.log("peopleFailure");
		
		this.peopleList.length = 0;
		
		this.$.peopleSpinner.hide();
		this.$.peopleSpinnerItem.hide();
		this.$.peopleVirtualRepeater.render();
		
		var row = this.detailsProgram;
		
		if(row.filesize.length > 0) {
			this.getJobqueue();
		} else {
			this.jobqueueFailure(); 
		}
		
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
	getJobqueue: function() {
		if(debug) this.log("getJobqueue");
		
		var query = 'SELECT * FROM `jobqueue` WHERE `chanid` = "'+this.detailsProgram.chanid+'" AND `starttime` = "'+this.detailsProgram.recstartts.replace("T"," ")+'" ;';
		
		if(debug) this.log("jobqueue query is :"+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQLwithResponse";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.getJobqueueService.setUrl(requestUrl);
			this.$.getJobqueueService.call();
		
		} else {
			
			this.doMysqlPluginCommand("mysqlRecordedGetJobqueue", query);
			
		}
		
	},
	jobqueueResponse: function(inSender, inResponse) {
		if(debug) this.log("jobqueueResponse: "+enyo.json.stringify(inResponse));
		
		this.jobqueueList.length = 0;
		
		this.jobqueueList = inResponse;
		
		this.$.jobqueueSpinner.hide();
		this.$.jobqueueSpinnerItem.hide();
		this.$.jobqueueVirtualRepeater.render();
		
	},
	jobqueueFailure: function(inSender, inResponse) {
		if(debug) this.log("jobqueueFailure");
		
		this.jobqueueList.length = 0;
		
		this.$.jobqueueSpinner.hide();
		this.$.jobqueueSpinnerItem.hide();
		this.$.jobqueueVirtualRepeater.render();
		
	},
	getJobqueueItem: function(inSender, inIndex) {
		var row = this.jobqueueList[inIndex];
		
		if(row) {
		
			if(row.hostname) {
			
				this.$.jobqueueName.setContent(decodeJobqueueType(row.type)+" on "+row.hostname);
				this.$.jobqueueStatus.setContent(decodeJobqueueStatus(row.status)+"<br/>"+row.comment);
				
				if(inIndex == 0) {
					this.$.jobqueueItem.addClass("enyo-first");
				} 
				if(inIndex == this.jobqueueList.length - 1) {
					this.$.jobqueueItem.addClass("enyo-last");
				}
				
				return true;
				
			} else if(row.status) {
			
				this.$.jobqueueName.setContent(decodeJobqueueType(row.type));
				this.$.jobqueueStatus.setContent(decodeJobqueueStatus(row.status)+"<br/>"+row.comment);

				if(inIndex == 0) {
                                        this.$.jobqueueItem.addClass("enyo-first");
                                }
				if(inIndex == this.jobqueueList.length - 1) {
                                        this.$.jobqueueItem.addClass("enyo-last");
                                }

				return true;
			}
		}
		
	},
	updateSortMenu: function() {
		if(debug) this.log("updateSortMenu: "+WebMyth.prefsCookie.recSort);
		
		this.doSavePreferences();
		
		var sortChoices = [
			{caption: "Category [Asc]", checked: false},
			{caption: "Category [Desc]", checked: false},
			{caption: "Date [Asc]", checked: false},
			{caption: "Date [Desc]", checked: false},
			{caption: "Original Airdate [Asc]", checked: false},
			{caption: "Original Airdate [Desc]", checked: false},
			{caption: "Title [Asc]", checked: false},
			{caption: "Title [Desc]", checked: false},
		];
		
		var sort;
		var sortArray = WebMyth.prefsCookie.recSort.split("[]:[]");
		
		if(this.selectedTitle == "") {
			sort = sortArray[0];
		} else {
			sort = sortArray[1];
		}
		
		switch(sort) {
			case "Category [Asc]":
				sortChoices[0].checked = true;
				break;
			case "Category [Desc]":
				sortChoices[1].checked = true;
				break;
			case "Date [Asc]":
				sortChoices[2].checked = true;
				break;
			case "Date [Desc]":
				sortChoices[3].checked = true;
				break;
			case "Original Airdate [Asc]":
				sortChoices[4].checked = true;
				break;
			case "Original Airdate [Desc]":
				sortChoices[5].checked = true;
				break;
			case "Title [Asc]":
				sortChoices[6].checked = true;
				break;
			case "Title [Desc]":
				sortChoices[7].checked = true;
				break;
		}
		
		this.$.sortPopupMenu.setItems(sortChoices);				
					
	},
	deleteRecordingResponse: function(inSender, inResponse) {
		if(debug) this.log("deleteRecordingResponse: "+inResponse);
		
		this.bannerMessage("Successfully deleted");
	},
	deleteRecordingFailure: function(inSender, inResponse) {
		this.error("deleteRecordingFailure");
		
		this.bannerMessage("Error deleting program");
		
	},
	undeleteRecordingResponse: function(inSender, inResponse) {
		if(debug) this.log("undeleteRecordingResponse: "+inResponse);
		
		this.bannerMessage("Successfully undeleted");
	},
	undeleteRecordingFailure: function(inSender, inResponse) {
		this.error("undeleteRecordingFailure");
		
		this.bannerMessage("Error undeleting program");
		
	},
	scheduleJobResponse: function(inSender, inResponse) {
		if(debug) this.log("scheduleJobResponse: "+inResponse);
		
		this.bannerMessage("Successfully queued job");
		
		var countdown = setTimeout(enyo.bind(this, "getJobqueue"), 1000);
	},
	scheduleJobFailure: function(inSender, inResponse) {
		this.error("scheduleJobFailure");
		
		this.bannerMessage("Error adding new job");
		
	},
	
});








