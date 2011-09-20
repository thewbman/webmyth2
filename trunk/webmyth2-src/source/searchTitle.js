/* adsf*/


enyo.kind({ name: "searchTitle",
	kind: "VFlexBox",
	className: "searchTitle enyo-view",			//enyo-view needed to get vflexbox to work?
	published: {
		haveIncomingTitle: false,
	},
	
	phonePixels: 500,
	viewMode: "tablet",
	currentSlider: "left",
	currentPane: "slidingPane",
	
	searchText: "",
	
	fullResultList: [],
	fullDatesList: [],
	
	middleResultList: [],
	datesList: [],
	
	resultList: [],	
	
	peopleList: [],
	
	detailsProgram: {},
	
	selectedDate: "",
	selectedDateIndex: -1,
	
	selectedChanid: "",
	selectedStarttime: "",
	selectedProgramIndex: -1,
	
	carouselIndex: -1,
	
	programListOffset: 0,
	
	filterString: "",
	
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
		onMysqlPluginCommand: "",
	},
	
	components: [
			
			{name: "searchTitleProgramsService", kind: "WebService", handleAs: "json", onSuccess: "searchTitleProgramsResponse", onFailure: "searchTitleProgramsFailure"},
			{name: "getProgramsService", kind: "WebService", handleAs: "json", onSuccess: "getProgramsResponse", onFailure: "getProgramsFailure"},
			
			{name: "getProgramDetailsService", kind: "WebService", handleAs: "xml", onSuccess: "getProgramDetailsResponse", onFailure: "getProgramDetailsFailure"},
			{name: "getProgramDetails25Service", kind: "WebService", handleAs: "xml", onSuccess: "getProgramDetails25Response", onFailure: "getProgramDetailsFailure"},
			
			{name: "getPeopleService", kind: "WebService", handleAs: "json", onSuccess: "peopleResponse", onFailure: "peopleFailure"},
			
			{name: "newSearchPopup", kind: "Popup", onOpen: "newSearchPopupOpen", scrim: true, dismissWithClick: true, dismissWithEscape: true, showKeyboardWhenOpening: true, components: [
				{name: "searchTextInput", kind: "Input", className: "searchText", onkeypress: "searchKeypress"},
				{kind: "Button", caption: "Title Search", onclick: "submitSearch"},
			]},
			{name: "searchingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
				{kind: "HFlexBox", components: [
					{kind: "Spacer"},
					{name: "searchingSpinnerLarge", kind: "SpinnerLarge"},
					{kind: "Spacer"},
				]},
				{content: $L("Searching")+"...", style: "text-align: center;"},
			]},
			
			{name: "searchTitlePane", kind: "Pane", flex: 1, transitionKind: "enyo.transitions.Simple", onSelectView: "viewSelected", components: [
			
				{name: "slidingPane", kind: "SlidingPane", flex: 1, multiViewMinWidth: 500, onSlideComplete2: "slidingResize", onSelectView: "slidingSelected", components: [
					{name: "left", kind2: "Sliding", className: "left", dragAnywhere: false, width: "33%", components: [
						{name: "leftVFlexBox", kind: "VFlexBox", flex: 1, components: [
							{name: "leftHeader", kind: "Toolbar", layoutKind: "HFlexLayout", onclick: "leftRevealTop", components: [
								{name: "leftHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Title Search: "), flex2: 1},
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
								{caption: "Search", onclick: "newTitleSearch"},
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
										{kind: "VFlexBox", flex:1, onclick: "programSelect", components: [
											{name: "row1", className: "row1"},
											{name: "row2", className: "row2"},
											{name: "row3", className: "row3"},
											{name: "row4", className: "row4"},
										]},
										{name: "channelIconWrapper", kind: "VFlexBox", align: "center", pack: "center", className: "channelIconWrapper", onclick: "programSelect", components: [
											{name: "channelIcon", kind: "Image", className: "channelIcon"},
										]},
									]},
								]},
							]},
							
							
							{kind: "Toolbar", slidingHandler: false, components: [
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
											]}
										]},
									]},
								]},
								{content: "&nbsp;"},
							]},
							
							{name: "rightCommandMenu", kind: "Toolbar", slidingHandler: false, components: [
								{name: "rightBackCommandIcon", kind: "GrabButton", className2: "backCommandIcon", onclick: "gotoMiddle"},
								{kind: "Spacer"},
								{name: "moreCommandButton", caption: $L("More"), onclick: "moreClick"},
								{kind: "Spacer"},
							]},
							
							{name: "playPopupMenu", kind: "PopupSelect", className: "playPopupMenu", onSelect: "playSelect", onClose: "playClosed", components: [
								//
							]},
							{name: "morePopupMenu", kind: "PopupSelect", className: "morePopupMenu", onSelect: "moreSelect", onClose: "moreClosed", components: [
								{caption: $L("Web"), components: [
									{name: "MythWeb", caption: "MythWeb"},
									{name: "Wikipedia", caption: "Wikipedia"},
									{name: "themoviedb", caption: "themoviedb"},
									{name: "IMDB", caption: "IMDB"},
									{name: "TheTVDB", caption: "TheTVDB"},
									{name: "TV.com", caption: "TV.com"},
									{name: "Google", caption: "Google"},
								]},
								{caption: $L("Setup Schedule")},
								{caption: $L("Guide"), components: [
									{caption: $L("Time")},
									{caption: $L("Title Search")},
								]},
							]},
						]},
					]},
				]},
				
				{name: "searchTitleCarousel", kind: "Carousel", flex: 1, className: "searchTitleCarousel", onGetLeft: "getLeft", onGetRight: "getRight", onclick: "selectedCarouselProgram"},
				{name: "searchTitleImageView", kind: "ImageView", flex: 1, className: "searchTitleImageView", onclick: "showSlidingPane"},
				
			]},
		
	],
	
	create: function() {
		if(debug) this.log("create");
		this.inherited(arguments);
		
		this.detailsProgram = defaultProgram;
		
		this.render();
		
		//setTimeout(enyo.bind(this,"showDetails"),1);
		
		//this.activate2("tablet");
		
	},
	
	//Externally called functions
	activate: function(inViewMode) {
		if(debug) this.log("activate");
		
		this.resize(inViewMode);
		
		//this.leftRevealTop();
		//this.middleRevealTop();
		setTimeout(enyo.bind(this,"showDetails"),1);

		if(this.haveIncomingTitle) {
			
			//data is passed through externalTitle();
			
		} else if(this.fullResultList.length == 0){
		
			this.resetProgramsSearch();
			this.gotoLeft();
			this.newTitleSearch();
			
		} else {
		
			//just keep previous search results
			//this.resetProgramsSearch();
		
		}

		//this.resize(this.viewMode);
		
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
		
		this.programListOffset = Math.max(0,this.selectedProgramIndex-1);
		
		//this.detailsProgram = defaultProgram;
		
		//this.fullResultList.length = 0;
		//this.datesList.length = 0;
		
		//this.$.datesVirtualRepeater.render();
		
		//this.searchText = "";
		
		//this.resultList.length = 0;
		//this.$.programsVirtualList.punt();
		//this.$.middleHeaderTitle.setContent("Programs");
		//this.$.middleHeaderCount.setContent("");
		
		//this.selectedChanid = "";
		//this.selectedStarttime = "";
		//setTimeout(enyo.bind(this,"showDetails"),1);
		
		this.haveIncomingTitle = false;
		
		//this.destroy();
	},
	resize: function(inViewMode) {
		if(debug) this.log("resize");

		this.viewMode = inViewMode;
		
		if(this.viewMode == "tablet") {
			if(debug) this.log("got viewMode of "+this.viewMode);
			
			this.gotoLeft();
			
			this.$.leftBackCommandIcon.hide();
			this.$.leftBackCommandIconSpacer.hide();
			
			this.$.slidingPane.setMultiView(true);
			
		} else {
			this.$.leftBackCommandIcon.show();
			this.$.leftBackCommandIconSpacer.show();
			
			this.$.slidingPane.setMultiView(false);
		}
		
		//this.$.left.render();
		//this.$.middle.render();
		//this.$.peopleVirtualList.resized();
		this.$.programsVirtualList.resized();
		this.$.right.render();
		
		this.slidingResize();
		
		this.$.searchTitleCarousel.render();
		this.$.searchTitleImageView.render();
		
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
		
		if((this.currentPane == "searchTitleImageView")||(this.currentPane == "searchTitleCarousel")) {
		
			this.showSlidingPane();
			
		} else {
			
			if(this.viewMode == "phone") {
				this.selectedTitle = "asdf";
				this.selectedChanid = "";
				this.selectedStarttime = "";
				//this.$.titlesVirtualRepeater.render();
				this.$.programsVirtualList.refresh();
			}
			
			if(this.currentSlider == "right") {
				this.gotoMiddle();
			} else if(this.$.programsSearchInput.getValue().length > 0) {
				this.resetProgramsSearch();
			} else if(this.currentSlider == "left") {
				this.doGetPreviousPane();
			} else if(this.currentSlider == "middle") {
				this.gotoLeft();
			} 
		}
		
	},
	gotKey: function(inKey) {
		if(debug) this.log("gotKey: "+inKey);
		
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
	},
	bannerMessage: function(message) {
		if(debug) this.log("bannerMessage: "+message);
		
		this.doBannerMessage(message);
		
	},
	externalTitle: function(inTitle, inViewMode) {
		if(debug) this.log("externalTitle: "+inTitle);
		
		this.viewMode = inViewMode;
		
		this.haveIncomingTitle = true;
		
		this.searchText = inTitle;
		//this.$.leftHeaderTitle.setContent("Title Search: '"+this.searchText+"'");
		
		this.fullResultList.length = 0;
		this.middleResultList.length = 0;
		
		this.selectedDateIndex = -1;
		this.selectedDate = "";
		
		this.resultList.length = 0;
		this.$.programsSearchInput.setValue("");
		this.$.programsSearchClear.hide();
		this.$.programsVirtualList.punt();
		this.$.middleHeaderTitle.setContent("Programs");
		this.$.middleHeaderCount.setContent("");
		
		this.selectedChanid = "";
		this.selectedStarttime = "";
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		this.startTitleSearch();
		
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
			this.selectedTitle = "asdf";
			this.selectedChanid = "";
			this.selectedStarttime = "";
			//this.$.titlesVirtualRepeater.render();
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
			this.selectedStarttime = "";
			//this.$.titlesVirtualRepeater.render();
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
			case 'webmyth2_searchTitle_left':
				this.currentSlider = "left";
				this.$.programsSearchInput.forceBlur();
				break;
			case 'webmyth2_searchTitle_middle':
				this.currentSlider = "middle";
				if(this.filterString.length > 0) {
					
					this.$.programsSearchInput.setValue(this.filterString);
					this.$.programsSearchInput.forceFocus();
					
					this.filterString = "";
				}
				break;
			case 'webmyth2_searchTitle_right':
				this.currentSlider = "right";
				this.$.programsSearchInput.forceBlur();
				break;
		}
	},
	searchKeypress: function(inSender, inEvent) {
		if(debug) this.log("searchKeypress: "+inEvent.keyCode);
		
		//Chrome
		if(inEvent.keyCode == 13) this.submitSearch();
		
		//Palm?
		if(inEvent.keyCode == 10) this.submitSearch();
		
	},
	newSearchPopupOpen: function() {
		if(debug) this.log("newSearchPopupOpen");
		
		this.$.searchTextInput.forceFocusEnableKeyboard();
	},
	submitSearch: function() {
		if(debug) this.log("submitSearch: "+this.$.searchTextInput.getValue());
		
		this.searchText = this.$.searchTextInput.getValue();
		
		this.$.newSearchPopup.close();
		this.$.searchTextInput.setValue("");
		
		this.$.searchTextInput.forceBlur();
		
		this.selectedDateIndex = -1;
		this.selectedDate = "";
		
		this.startTitleSearch();
		
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
		
		this.selectedProgramIndex = inEvent.rowIndex;
		
		this.$.programsVirtualList.refresh();
		
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	peopleSelect: function(inSender, inEvent) {
		if(debug) this.log("peopleSelect index "+enyo.json.stringify(this.peopleList[inEvent.rowIndex]));
		
		this.doPersonSelected(this.peopleList[inEvent.rowIndex])	
	},	
	showSlidingPane: function() {
		if(debug)	this.log("showSlidingPane");
		
		this.$.searchTitlePane.selectViewByName("slidingPane");
	},
	sortClick: function(inSender, inEvent) {
		if(debug) this.log("sortClick");
		
		this.$.sortPopupMenu.openAroundControl(inSender);
	},
	sortSelect: function(inSender, inEvent) {
		if(inEvent) {
			if(debug) this.log("sortSelect: "+inEvent.value);
		
			WebMyth.prefsCookie.searchSort = inEvent.value;
			this.finishedSelectingDate();
		}
	},
	sortClosed: function() {
		if(debug) this.log("sortClosed");
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
	
	
	//Search title functions
	newTitleSearch: function() {
		if(debug) this.log("newTitleSearch");
		
		//this.$.scrim.show();
		this.$.newSearchPopup.openAtCenter();
		this.$.searchTextInput.forceFocus();
	},
	startTitleSearch: function() {
		if(debug) this.log("startTitleSearch: "+this.searchText);
	
		this.$.searchingPopup.openAtCenter();
		this.$.searchingSpinnerLarge.show();
		
		var query = "SELECT `program`.title, `program`.subtitle AS subtitle, `program`.chanid AS chanid";
		query += ", `program`.starttime AS starttime, `program`.endtime AS endtime";
		query += ", `program`.category, `program`.originalairdate AS airdate";
		query += ", `channel`.callsign, `channel`.channum, `channel`.name AS channame";
		query += " FROM `program` "
		query += " LEFT OUTER JOIN `channel` ON `program`.chanid = `channel`.chanid ";
		query += ' WHERE `title` LIKE "%'+this.searchText+'%" ';
		query += " ORDER BY starttime, channum ";
		query += " LIMIT 1000 ";
		
		if(debug) this.log("search query is :"+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQLwithResponse";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.searchTitleProgramsService.setUrl(requestUrl);
			this.$.searchTitleProgramsService.call();
		
		} else {
			
			//have to delay here for some weird race condition with plugin?
			//this.doMysqlPluginCommand("mysqlSearchTitleGetPrograms", query);
			setTimeout(enyo.bind(this,"doMysqlPluginCommand","mysqlSearchTitleGetPrograms", query),200);
			
		}
		
		this.$.leftHeaderTitle.setContent("Title Search: '"+this.searchText+"'");
		
	},
	searchTitleProgramsResponse: function(inSender, inResponse) {
		//if(debug) this.log("searchTitleProgramsResponse: "+enyo.json.stringify(inResponse));
		if(debug) this.log("searchTitleProgramsResponse");
		
		this.fullResultList.length = 0;
		this.fullDatesList.length = 0;
		
		if(inResponse == " ]\n") {
			//no matching searches
		} else {
			this.fullResultList = inResponse;
		}
		
		this.finishedGettingPrograms();
		
	},
	searchTitleProgramsFailure: function(inSender, inResponse) {
		this.error("searchTitleProgramsFailure");
		
		this.$.errorMessage.setContent("ERROR: Failed to get search people programs for '"+this.searchText+"'");
		
		this.finishedGettingPrograms();
		
	},
	finishedGettingPrograms: function() {
		if(debug) this.log("finishedGettingPrograms");
		
		this.datesList.length = 0;
		this.middleResultList.length = 0;
		
		//this.middleResultList = trimUpcomingByGroup(this.fullResultList,WebMyth.prefsCookie.upcomingGroup);
		this.middleResultList = this.fullResultList;
		this.datesList = cleanDateList(this.middleResultList);
		
		this.datesList.splice(0,0,{label: "All", value: "", count: this.middleResultList.length});
		
		//if(debug) this.log("datesList: "+enyo.json.stringify(this.datesList));
		
		this.leftRevealTop();
		
		this.finishedSelectingDate();
	
	},
	finishedSelectingDate: function() {
		if(debug) this.log("finishedSelectingDate");
	
		this.$.datesVirtualRepeater.render();
		
		this.resultList.length = 0;
		this.resultList = this.filterPrograms(trimListSearch(this.middleResultList,"starttime",this.selectedDate));
		//this.resultList = this.middleResultList;
		
		if(this.selectedDate == "") {
			this.$.middleHeaderTitle.setContent("All");
		} else {
			//this.$.middleHeaderTitle.setContent(this.selectedDate);
			this.$.middleHeaderTitle.setContent(WebMyth.dateFormatter.format(new Date(isoToJS(this.selectedDate+"T00:00:00"))));
		}
		
		this.$.middleHeaderCount.setContent("("+this.resultList.length+" items)");
		
		
		switch(WebMyth.prefsCookie.searchSort){
			case "Category [Asc]":
				this.resultList.sort(double_sort_by('category', 'title', false));
				break;
			case "Category [Desc]":
				this.resultList.sort(double_sort_by('category', 'title', true));
				break;
			case "Date [Asc]":
				this.resultList.sort(double_sort_by('starttime', 'title', false));
				break;
			case "Date [Desc]":
				this.resultList.sort(double_sort_by('starttime', 'title', true));
				break;
			case "Original Airdate [Asc]":
				this.resultList.sort(double_sort_by('airdate', 'title', false));
				break;
			case "Original Airdate [Desc]":
				this.resultList.sort(double_sort_by('airdate', 'title', true));
				break;
			case "Title [Asc]":
				this.resultList.sort(double_sort_by('title', 'starttime', false));
				break;
			case "Title [Desc]":
				this.resultList.sort(double_sort_by('title', 'starttime', true));
				break;
			default: 
				this.resultList.sort(double_sort_by('starttime', 'title', true));
				break;

		}
		
		this.updateSortMenu();
		
		this.middleRevealTop();
		
		this.detailsProgram = defaultProgram;
		this.selectedChanid = "";
		this.selectedStarttime = "";
		this.selectedProgramIndex = -1;
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		this.$.programsVirtualList.refresh();
		
		this.$.searchingPopup.hide();
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
		//if(debug) this.log("setupProgramItem index: "+inIndex);
		
		var row = this.resultList[inIndex];
		
		//if(debug) this.log("setupProgramItem data: "+enyo.json.to(row));
		
		if(row) {
		
			this.setupProgramDivider(inIndex);
			
			this.$.programTitle.setContent(row.title);
			
			this.$.row1.setContent(row.subtitle);
			
			this.$.row2.setContent(row.starttime.replace("T"," "));
			this.$.row3.setContent(row.category);
			this.$.row4.setContent(row.channum+" - "+row.channame);
			
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
				this.$.programItem.addClass("selected");
			} else {
				this.$.programItem.removeClass("selected");
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

		try {
		
		switch(WebMyth.prefsCookie.searchSort){
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
			this.error(e);
		}
		
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
			
			this.$.recStatusText.hide();
			
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
			
			if(WebMyth.prefsCookie.DBSchemaVer > 1269) {
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
					
				} else if(WebMyth.prefsCookie.DBSchemaVer > 1269) {
					
					iconUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Guide/GetChannelIcon?ChanId=";
				
				} else {
					
					iconUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetChannelIcon?ChanId=";
				
				}
				
				iconUrl += row.chanid;		
			
				this.$.rightDetailsChannelIcon.setSrc(iconUrl);
				//this.$.rightDetailsChannelIconWrapper.show();
				
			} else {
				
				//this.$.rightDetailsChannelIconWrapper.hide();
			}
			
			this.$.moreCommandButton.show();
			
			this.$.rightCommandMenu.render();
			
			this.$.rightHeaderTitle.setContent(row.title);
		
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
		
		//this.$.rightDetails.setContent(enyo.json.to(row));
		
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
						
						if(j == 0) s.description =programChildNode.nodeValue;
										
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
					if(topSingleNode.childNodes[0]) s.starttime = topSingleNode.childNodes[0].nodeValue;
					break;
				case 'EndTime':
					if(topSingleNode.childNodes[0]) s.endtime = topSingleNode.childNodes[0].nodeValue;
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
								if(recordingChildNode.childNodes[0]) s.recstartts = recordingChildNode.childNodes[0].nodeValue;
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
			
			this.doMysqlPluginCommand("mysqlSearchTitleGetPeople", query);
			
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
	updateSortMenu: function() {
		if(debug) this.log("updateSortMenu: "+WebMyth.prefsCookie.searchSort);
		
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
		
		var sort = WebMyth.prefsCookie.searchSort;
		
		
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
	
	
});

