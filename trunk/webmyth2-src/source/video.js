/* adsf*/


enyo.kind({ name: "video",
	kind: "VFlexBox",
	className: "video enyo-view",			//enyo-view needed to get vflexbox to work?
	
	published: {
		phonePixels: 500,
		viewMode: "tablet",
		currentSlider: "left",
		currentPane: "slidingPane",
	},
	
	fullResultList: [],
	fullTitlesList: [],
	
	middleResultList: [],
	titlesList: [],
	
	resultList: [],	
	
	fullDirectoryList: [],
	
	directoriesList: [],
	
	programListOffset: 0,
	
	peopleList: [],
	
	playList: [],
	
	storageGroups: [],
	
	detailsProgram: {},
	
	selectedTitle: "",
	selectedTitleIndex: -1,
	selectedIntid: -1,
	selectedProgramIndex: -1,
	
	currentDirectory: "",
	
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
		onRemoteCommand: "",
		onMysqlPluginCommand: "",
	},
	
	components: [
			
			{name: "streamVideoService", kind: "PalmService", service: "palm://com.palm.applicationManager/", method: "launch"},
			{name: "getVideosService", kind: "WebService", handleAs: "json", onSuccess: "videosResponse", onFailure: "videosFailure"},
			{name: "getStorageGroupsService", kind: "WebService", handleAs: "json", onSuccess: "storageGroupsResponse", onFailure: "storageGroupsFailure"},
			{name: "getUpnpService", kind: "WebService", handleAs: "json", onSuccess: "upnpResponse", onFailure: "upnpFailure"},
			{name: "getPeopleService", kind: "WebService", handleAs: "json", onSuccess: "peopleResponse", onFailure: "peopleFailure"},
			
			{name: "loadingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
				{kind: "HFlexBox", components: [
					{kind: "Spacer"},
					{kind: "SpinnerLarge"},
					{kind: "Spacer"},
				]},
				{content: "Loading...", style: "text-align: center;"},
			]},
			
			{name: "videoPane", kind: "Pane", flex: 1, transitionKind: "enyo.transitions.Simple", onSelectView: "viewSelected", components: [
			
				{name: "slidingPane", kind: "SlidingPane", flex: 1, multiViewMinWidth: 500, onSelectView: "slidingSelected", components: [
					{name: "left", kind2: "Sliding", className: "left", dragAnywhere: false, width: "33%", components: [
						{name: "leftVFlexBox", kind: "VFlexBox", flex: 1, components: [
							{name: "leftHeader", kind: "Toolbar", layoutKind: "HFlexLayout", onclick: "leftRevealTop", components: [
								{name: "leftHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Videos"), flex2: 1},
							]},
							
							{name: "videosGroupSelectorItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", style: "border-bottom: none; border-top: none;", components: [
								{name: "videosGroupSelector", kind: "ListSelector", label: "Group", onChange: "videosGroupSelect", flex: 1, items: [
									{caption: "All", value: "All", selected: true},
									{caption: "Directory", value: "Directory"},
									{caption: "Regular", value: "Regular"},
									{caption: "TV", value: "TV"},
									{caption: "Specials", value: "Specials"},
								]},
							]},
							{name: "titleDivider", kind: "Divider", caption: "Titles"},
							//name: "leftScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
								{name: "titlesVirtualList", kind: "VirtualList", onSetupRow: "getTitleItem", onclick: "titleSelect", flex: 1, components: [
								//name: "titlesVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getTitleItem", onclick: "titleSelect", components: [
									{name: "titleItem", kind: "Item", className: "programDates", layoutKind: "HFlexLayout", components: [
										{name: "title", flex: 1},
										{name: "count"},
									]}
								]},
								{name: "errorMessage"},
								//content: "&nbsp"},
							//]},
			
							{kind: "Toolbar", components: [
								{name: "leftBackCommandIcon", kind: "Control", className: "backCommandIcon", onclick: "gotBack"},
								{kind: "Spacer"},
								{icon: "images/menu-icon-refresh.png", onclick: "getVideos"},
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
									{kind: "HFlexBox", components: [
										{name: "videoImageWrapper", kind: "VFlexBox", align: "center", pack: "center", className: "videoImageWrapper", onclick: "videoImageSelect", components: [
											{name: "videoImage", kind: "Image", className: "videoImage"},
										]},
										{kind: "VFlexBox", flex:1, onclick: "programSelect", components: [
											{name: "programTitle", className: "title", onclick: "programSelect"},
											{name: "row1", className: "row1"},
											{name: "row2", className: "row2"},
											{name: "row3", className: "row3"},
											{name: "row4", className: "row4"},
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
								{name: "rightDetailsCoverartWrapper", kind: "HFlexBox", pack: "center", components: [
									{kind: "Spacer"},
									{name: "rightDetailsCoverart", kind: "Image", className: "detailsCoverart", onclick: "coverartSelect"},
									{name: "detailsSpinner", kind: "Spinner", className: "detailsSpinner"},
									{kind: "Spacer"},
								]},
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
								]},
								{name: "programDetailsRowGroup", kind: "RowGroup", caption: "Program Details", components: [
									{name: "releasedateItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "releasedate", className: "value", flex: 1},
										{content: "Release Date", className: "label"},
									]},
									{name: "fullepisodeItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "fullepisode", className: "value", flex: 1},
										{content: "Episode", className: "label"},
									]},
									{name: "filenameItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "filename", className: "value", flex: 1},
										{content: "Filename", className: "label"},
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
								{name: "playCommandButton", caption: $L("Play"), onclick: "playClick"},
								{kind: "Spacer"},
								{name: "webCommandButton", caption: "Web", onclick: "webClick"},
								{kind: "Spacer"},
							]},
							
							{name: "playPopupMenu", kind: "PopupSelect", className: "playPopupMenu", onSelect: "playSelect", onClose: "playClosed", components: [
								//
							]},
							{name: "webPopupMenu", kind: "PopupSelect", className: "webPopupMenu", onSelect: "webSelect", onClose: "moreClosed", components: [
								{name: "Homepage", caption: "Homepage"},
								{name: "Wikipedia", caption: "Wikipedia"},
								{name: "themoviedb", caption: "themoviedb"},
								{name: "IMDB", caption: "IMDB"},
								{name: "TheTVDB", caption: "TheTVDB"},
								{name: "TV.com", caption: "TV.com"},
								{name: "Google", caption: "Google"},
							]},
						]},
					]},
				]},
				
				{name: "videoCarousel", kind: "Carousel", flex: 1, className: "videoCarousel", onGetLeft: "getLeft", onGetRight: "getRight", onclick: "selectedCarouselProgram"},
				{name: "videoImageView", kind: "ImageView", flex: 1, className: "imageView", onclick: "showSlidingPane"},
				
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
		
		this.$.programsVirtualList.punt();
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
			
		this.updateSortMenu();
			
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.fullResultList.length == 0) {
			
			this.getVideos();
		}
		
		if(WebMyth.prefsCookie.videosGroup == "Directory") {
			this.$.titleDivider.setCaption("Directories");
		} else {
			this.$.titleDivider.setCaption("Titles");
		}
		
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
		
		this.programListOffset = Math.max(0,this.selectedProgramIndex-1);
		
		//this.fullResultList.length = 0;
		//this.fullTitlesList.length = 0;
		
		//this.detailsProgram = defaultProgram;
		
		//this.finishedGettingVideos();
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
			if(this.fullResultList.length == 0) this.selectedTitle = "";
			
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
		this.$.titlesVirtualList.resized();
		//this.$.middle.render();
		this.$.programsVirtualList.resized();
		this.$.right.render();
		
		this.$.videoCarousel.render();
		//this.$.videoImageView.render();
		
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
		
		if((this.currentPane == "videoImageView")||(this.currentPane == "videoCarousel")) {
		
			this.showSlidingPane();
			
		} else {
			
			if(this.viewMode == "phone") {
				this.selectedTitle = "";
				this.selectedIntid = -1;
				//this.$.titlesVirtualRepeater.render();
				this.$.titlesVirtualList.refresh();
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
			this.$.titlesVirtualList.refresh();
			this.$.programsVirtualList.refresh();
		}
		
	},
	gotoLeft: function() {
		if(debug) this.log("gotoLeft");
		
		this.$.slidingPane.selectView(this.$.left);
		this.currentSlider = "left";
		
		if(this.viewMode == "phone") {
			this.resetProgramsSearch();
			this.selectedTitle = "";
			this.selectedIntid = -1;
			//this.$.titlesVirtualRepeater.render();
			this.$.titlesVirtualList.refresh();
			this.$.programsVirtualList.refresh();
		}
	},
	gotoMiddle: function() {
		if(debug) this.log("gotoMiddle");
		
		//this.middleRevealTop();
		this.$.slidingPane.selectView(this.$.middle);
		this.currentSlider = "middle";
		
		if(this.viewMode == "phone") {
			//this.selectedTitle = "asdf";
			this.selectedIntid = -1;
			//this.$.titlesVirtualRepeater.render();
			this.$.titlesVirtualList.refresh();
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
		
		//this.$.leftScroller.scrollIntoView(0,0);
		this.$.titlesVirtualList.punt();
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
			case 'webmyth2_video_left':
				this.currentSlider = "left";
				this.$.programsSearchInput.forceBlur();
				break;
			case 'webmyth2_video_middle':
				this.currentSlider = "middle";
				if(this.filterString.length > 0) {
					
					this.$.programsSearchInput.setValue(this.filterString);
					this.$.programsSearchInput.forceFocus();
					
					this.filterString = "";
				}
				break;
			case 'webmyth2_video_right':
				this.currentSlider = "right";
				this.$.programsSearchInput.forceBlur();
				break;
		}
	},
	videosGroupSelect: function(inSender, inValue, inOldValue) {
		if(debug) this.log("videosGroupSelect from "+inOldValue+" to "+inValue);
		
		if(inValue == "Directory") {
			
			this.$.titleDivider.setCaption("Directories");
			
			WebMyth.prefsCookie.videosGroup = inValue;
			
		} else {
		
			this.$.titleDivider.setCaption("Titles");
			
			WebMyth.prefsCookie.videosGroup = inValue;
		}
		
		this.currentDirectory = "";
		
		this.selectedTitle = "";
		this.selectedIntid = -1;
		
		this.doSavePreferences();
		
		this.leftRevealTop();
		
		this.$.programsSearchInput.setValue("");
		this.$.programsSearchClear.hide();
		
		this.finishedSelectingGroup();
	},
	titleSelect: function(inSender, inEvent) {
		if(debug) this.log("titleSelect index "+inEvent.rowIndex);
		
		if(WebMyth.prefsCookie.videosGroup == "Directory") {
		
			var row = this.directoriesList[inEvent.rowIndex];
			
			this.currentDirectory = row.directory;
			
			this.finishedSelectingGroup();
			
		} else {
		
			var oldTitleIndex = this.selectedTitleIndex;
			
			this.selectedTitleIndex = inEvent.rowIndex;
			this.selectedTitle = this.titlesList[inEvent.rowIndex].value;
			
			//this.$.titlesVirtualRepeater.render();
			//this.$.titlesVirtualRepeater.renderRow(oldTitleIndex);
			//this.$.titlesVirtualRepeater.renderRow(this.selectedTitleIndex);
			this.$.titlesVirtualList.refresh();
			
			if(this.viewMode == "phone") this.gotoMiddle();
			
			this.resetProgramsSearch();
		}
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
		
		//this.programListOffset = Math.max(0,newIndex-1);
		
		var row = this.resultList[newIndex];
		
		this.selectedIntid = row.intid;
		
		this.detailsProgram = row;
		
		//this.$.programsVirtualList.updateRow(this.selectedProgramIndex);
		//this.$.programsVirtualList.updateRow(newIndex);
		
		this.selectedProgramIndex = newIndex;
		
		this.$.programsVirtualList.refresh();
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	videoImageSelect: function(inSender, inEvent) {
		if(debug) this.log("videoImageSelect index "+inEvent.rowIndex);
		
		var newIndex = inEvent.rowIndex+this.programListOffset;
		
		var row = this.resultList[newIndex];
		
		this.carouselIndex = newIndex;
		this.$.videoCarousel.setCenterView(this.getCarouselView(this.carouselIndex));
		this.$.videoPane.selectViewByName("videoCarousel");
		
	},
	getCarouselView: function(inIndex) {
		if(debug) this.log("getCarouselView with index: "+inIndex);
	
		var row = this.resultList[inIndex];
		
		if(row) {
	
			if((row.subtitle == null)||(row.subtitle == "")||(row.subtitle == "None")) {
				row.carouselText = "&nbsp;"
			} else {
				row.carouselText = row.fullEpisode+" - "+row.subtitle;
			}
			
			if((row.plot == null)||(row.plot == "")||(row.plot == "None")) {
				row.hasPlot = false;
			} else {
				row.hasPlot = true;
			}
			
			row.coverartUrl = "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/pl/coverart/";
			row.coverartUrl += row.coverfile;
			
			
			if(debug) this.log("carousel coverartUrl coverartUrl: "+row.coverartUrl);
			
			return {kind: "VFlexBox", className: "videoCarousel", flex: 1, align: "center", pack: "justify", owner: this, components: [
			
					{kind: "Toolbar", width: "100%", layoutKind: "VFlexLayout", components: [
						{content: row.title, kind: "Control", className: "headerTitle"},
						{content: row.carouselText, kind: "Control", className: "carouselSubtitle"}, 
					]},
					
					//kind: "Spacer"},
					
					{kind: "HFlexBox", flex: 1, width: "100%", align: "center", pack: "center", components: [
						//kind: "Image", src: row.coverartUrl, className: "carouselVideoImage"},
						{kind: "ImageView", flex2: 1, className: "imageView", centerSrc: row.coverartUrl},
					]},

					//kind: "Spacer"},
							
					{kind: "Toolbar", width: "100%", layoutKind: "HFlexLayout", components: [
						{content: row.plot, kind: "Control", className: "carouselDescription", showing: row.hasPlot},
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
		
		this.selectedIntid = row.intid;
		
		this.detailsProgram = row;
		
		this.selectedProgramIndex = this.carouselIndex;
		
		this.programListOffset = Math.max(0,this.carouselIndex-1);
		this.$.programsVirtualList.punt();
		
		this.peopleFailure();
		
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		this.showSlidingPane();
		
		if(this.viewMode == "phone") this.gotoRight();
		
	},
	coverartSelect: function() {
		if(debug) this.log("coverartSelect");
		
		var row = this.detailsProgram;
		
		var coverartUrl = "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/pl/coverart/";
		coverartUrl += row.coverfile;
		
		this.$.videoImageView.setCenterSrc(coverartUrl);
		this.$.videoImageView.render();
		this.$.videoPane.selectViewByName("videoImageView");
		
	},
	showSlidingPane: function() {
		if(debug)	this.log("showSlidingPane");
		
		this.$.videoPane.selectViewByName("slidingPane");
	},
	peopleSelect: function(inSender, inEvent) {
		if(debug) this.log("peopleSelect index "+enyo.json.stringify(this.peopleList[inEvent.rowIndex]));
		
		this.doPersonSelected(this.peopleList[inEvent.rowIndex])	
	},
	sortClick: function(inSender, inEvent) {
		if(debug) this.log("sortClick");
		
		this.$.sortPopupMenu.openAroundControl(inSender);
	},
	sortSelect: function(inSender, inEvent) {
		if(inEvent) {
			if(debug) this.log("sortSelect: "+inEvent.value);
		
			var newSort;
			var sortArray = WebMyth.prefsCookie.videosSort.split("[]:[]");
		
			if(this.selectedTitle == "") {
				newSort = inEvent.value+"[]:[]"+sortArray[1];
			} else {
				newSort = sortArray[0]+"[]:[]"+inEvent.value;
			}
		
			WebMyth.prefsCookie.videosSort = newSort;
			
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
			
			var videoUrl = "http://"+WebMyth.prefsCookie.masterBackendIp+":6544/Myth/GetVideo/Id";
			videoUrl += this.detailsProgram.upnpid;
			
			if(inEvent.value == "Stream") {
			
				if(window.PalmSystem) {
					this.$.streamVideoService.call({id: "com.palm.app.videoplayer", target: videoUrl, params: {target: videoUrl}});
				} else {
					window.open(videoUrl);
				}
				
			} else if(inEvent.value == "Download") {
					
				var videoFilename = row.title+" - "+row.fullEpisode;		//adsf
				
				var videoDirectory = "/media/internal/video/";
				
				this.doDownloadFile(videoUrl, videoFilename, videoDirectory, "com.palm.app.videos");
			
			} else {
			
				if(debug) this.log("starting playback on frontend: "+inEvent.value);
				
				for(var i = 0; i < WebMyth.prefsCookie.frontends.length; i++) {
					if(inEvent.value == WebMyth.prefsCookie.frontends[i].name) WebMyth.prefsCookie.frontendIndex = parseInt(i);
				}
				
				var videoBase = "/";
				var s = {};
				
				for(var i = 0; i < this.storageGroups.length; i++) {
					s = this.storageGroups[i];
					
					if((s.groupname == "Videos")&&(s.hostname == this.detailsProgram.host)) videoBase = s.dirname;
				}
				
				var cmd = "file '";
				
				if(WebMyth.prefsCookie.protoVer >= 64) {
					//Fixed this playback at https://github.com/MythTV/mythtv/blob/7422f241a9c62216da5a3cfc698c3f22431cd084/mythtv/programs/mythfrontend/networkcontrol.cpp
					cmd += "myth://Videos@"+this.detailsProgram.host+"/"+videoBase+"/"+this.detailsProgram.filename+"'";
				} else if((this.detailsProgram.filename == this.detailsProgram.level1) && (true)) {
					//Try using a myth:// URL when not using subdirectories - FAILING IN 0.24 - using full filename for all
					cmd += "myth://"+this.detailsProgram.host+"/"+this.detailsProgram.filename+"'";
				} else {
					//Use a direct file reference as a backup
					cmd += videoBase+"/"+this.detailsProgram.filename+"'";
				}
	
				this.doRemoteCommand("play",cmd);
				
				if(WebMyth.prefsCookie.playJumpRemote) var countdown = setTimeout(enyo.bind(this, "doSelectMode", "remote"), 1000);
			
			}
			
		}
	},
	playClosed: function() {
		if(debug) this.log("playClosed");
	},	
	webClick: function(inSender, inEvent) {
		if(debug) this.log("webClick");
		
		this.$.webPopupMenu.openAroundControl(this.$.webCommandButton);
	},
	webSelect: function(inSender, inEvent) {
		if(inEvent) {
			if(debug) this.log("webSelect: "+inEvent.value);
			
			switch(inEvent.value) {
				case "Homepage":
					this.doOpenWeb("URL", this.detailsProgram.homepage);
					break;
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
			}
		}		
	},
	setupSchedule: function(inSender) {
		if(debug) this.log("setupSchedule");
		
		this.doSetupSchedule(this.detailsProgram);
	},
	guideTime: function(inSender) {
		if(debug) this.log("guideTime");
		
		this.doProgramGuide(this.detailsProgram.starttime);
	},
	titleSearch: function(inSender) {
		if(debug) this.log("titleSearch");
		
		this.doTitleSearch(this.detailsProgram.title);
	},
	
	
	//Video functions
	getVideos: function() {
		if(debug) this.log("getVideos");
		
		//this.$.scrim.show();
		this.$.loadingPopup.openAtCenter();
		this.$.spinnerLarge.show();
		
        var query = "SELECT videometadata.intid, videometadata.title, videometadata.subtitle, videometadata.plot, videometadata.releasedate,  "; 
		query += " videometadata.homepage, videometadata.director, videometadata.year, videometadata.rating, videometadata.length, ";	//asdf
        query += " videometadata.hash, videometadata.host, videometadata.insertdate, videometadata.inetref, ";	//asdf
		query += " videocategory.category, videometadata.coverfile, videometadata.season, videometadata.episode, videometadata.filename ";
        query += " FROM videometadata ";
        query += " LEFT OUTER JOIN videocategory ON videocategory.intid = videometadata.category ";
       
		//cannot get upnp here since needs end filename
		
		if(debug) this.log("videos query is :"+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQLwithResponse";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.getVideosService.setUrl(requestUrl);
			this.$.getVideosService.call();
		
		} else {
			
			this.doMysqlPluginCommand("mysqlVideoGetVideos", query);
			
		}
		
	},
	videosResponse: function(inSender, inResponse) {
		//if(debug) this.log("videosResponse: "+enyo.json.stringify(inResponse));
		if(debug) this.log("videosResponse");
		
		this.fullResultList.length = 0;
		this.fullTitlesList.length = 0;
		
		this.fullResultList = cleanVideos(inResponse);
		
		if(debug) this.log("completed video parsing with "+this.fullResultList.length+" total items");
		//if(debug) this.log("video fullResultList is: "+enyo.json.stringify(this.fullResultList));
		
		this.fullDirectoryList.length = 0;
		
		this.fullDirectoryList = cleanVideosDirectories(this.fullResultList.sort(sort_by('filename', false)));
		
		if(debug) this.log("completed video directories parsing with length "+this.fullDirectoryList.length+": "+enyo.json.stringify(this.fullDirectoryList));
		
		this.currentDirectory = "";
		
		this.$.errorMessage.setContent("");
		
		this.leftRevealTop();
		
		this.finishedGettingVideos();
		
	},
	videosFailure: function(inSender, inResponse) {
		this.error("videosFailure");
		
		this.$.errorMessage.setContent("ERROR: Failed to get list of videos from backend at '"+WebMyth.prefsCookie.webserverName+"'");
		
		this.finishedGettingVideos();
	},
	finishedGettingVideos: function() {
		if(debug) this.log("finishedGettingVideos");
		
		this.resize(this.viewMode);
		
		if(this.storageGroups.length == 0) {
		
			var query = "SELECT * FROM storagegroup ;";
		   
			//cannot get upnp here since needs end filename
			
			if(debug) this.log("storageGroups query is :"+query);
			
			if(WebMyth.useScript) {
			
				var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
				requestUrl += "?op=executeSQLwithResponse";				
				requestUrl += "&query64=";		
				requestUrl += Base64.encode(query);
				
				if(debug) this.log("requestUrl: "+requestUrl);
			
				this.$.getStorageGroupsService.setUrl(requestUrl);
				this.$.getStorageGroupsService.call();
			
			} else {
			
				this.doMysqlPluginCommand("mysqlVideoGetStorageGroups", query);
				
			}
		
		}
		
		this.finishedSelectingGroup();
	},
	storageGroupsResponse: function(inSender, inResponse) {
		//if(debug) this.log("storageGroupsResponse: "+enyo.json.stringify(inResponse));
		if(debug) this.log("storageGroupsResponse");
		
		this.storageGroups.length = 0;
		
		this.storageGroups = inResponse;
		
	},
	storageGroupsFailure: function(inSender, inResponse) {
		if(debug) this.log("storageGroupsFailure");
		
	},
	finishedSelectingGroup: function() {
		if(debug) this.log("finishedSelectingGroup and have videosGroup: "+WebMyth.prefsCookie.videosGroup+" and selectedTitle: '"+this.selectedTitle+"' and directory: '"+this.currentDirectory+"'");
	
		this.titlesList.length = 0;
		this.middleResultList.length = 0;
		
		this.directoriesList.length = 0;
		
		this.middleResultList = trimVideosByGroup(this.fullResultList,WebMyth.prefsCookie.videosGroup,this.currentDirectory);
		this.titlesList = cleanTitleList(this.middleResultList, this.selectedTitle);
		
		this.$.videosGroupSelector.setValue(WebMyth.prefsCookie.videosGroup);
		this.titlesList.splice(0,0,{label: "All", value: "", count: this.middleResultList.length});
		
		this.directoriesList = trimVideosDirectories(this.fullDirectoryList,this.currentDirectory);
		
		if(this.currentDirectory != "") {
			this.directoriesList.splice(0,0,{localDirectory: " - Top Level - ", directory: ""});
			
			var currentDirectoryArray = this.currentDirectory.split("/");
			var directoryRightOffset = "-";
			var directoryRoot = "";
			
			if(debug) this.log("currentDirectoryArray: "+enyo.json.stringify(currentDirectoryArray));
			
			for(var i = 0; i < currentDirectoryArray.length - 1; i++) {
				directoryRightOffset = directoryRightOffset + "-";
				directoryRoot += currentDirectoryArray[i] + "/";
				this.directoriesList.splice(i+1,0,{localDirectory: " "+directoryRightOffset+" "+currentDirectoryArray[i], directory: directoryRoot});
			}
		}
		
		if(debug) this.log("this.directoriesList: "+enyo.json.stringify(this.directoriesList));
		
		this.finishedSelectingTitle();
	},
	finishedSelectingTitle: function() {
		if(debug) this.log("finishedSelectingTitle with selectedTitle: "+this.selectedTitle);
		
		//this.$.titlesVirtualRepeater.render();
		if(WebMyth.prefsCookie.videosGroup == "Directory") {
			this.$.titlesVirtualList.punt();
		} else {
			this.$.titlesVirtualList.refresh();
		}
		
		this.resultList.length = 0;
		this.resultList = this.filterPrograms(trimList(this.middleResultList,"title",this.selectedTitle));
		//this.resultList = this.middleResultList;
		
		if((this.selectedTitle == "")&&(WebMyth.prefsCookie.videosGroup == "All")) {
			this.$.middleHeaderTitle.setContent("All Videos");
		} else if(WebMyth.prefsCookie.videosGroup == "Directory") {
			//this.$.middleHeaderTitle.setContent("Videos ['/"+this.currentDirectory+"']");
			this.$.middleHeaderTitle.setContent("/"+this.currentDirectory+"");
		} else if(this.selectedTitle == "") {
			this.$.middleHeaderTitle.setContent("Videos ["+WebMyth.prefsCookie.videosGroup+"]");
		} else {
			this.$.middleHeaderTitle.setContent(this.selectedTitle);
		}
		
		this.$.middleHeaderCount.setContent("("+this.resultList.length+" items)");
		
		var sort;
		var sortArray = WebMyth.prefsCookie.videosSort.split("[]:[]");
		
		if(this.selectedTitle == "") {
			sort = sortArray[0];
		} else {
			sort = sortArray[1];
		}
		
		switch(sort){
			case "Category [Asc]":
				this.resultList.sort(triple_sort_by('category', 'title', 'fullEpisode', false));
				break;
			case "Category [Desc]":
				this.resultList.sort(triple_sort_by('category', 'title', 'fullEpisode', true));
				break;
			case "Release Date [Asc]":
				this.resultList.sort(double_sort_by('releasedate', 'title', false));
				break;
			case "Release Date [Desc]":
				this.resultList.sort(double_sort_by('releasedate', 'title', true));
				break;
			case "Season [Asc]":
				this.resultList.sort(double_sort_by('fullEpisode', 'title', false));
				break;
			case "Season [Desc]":
				this.resultList.sort(double_sort_by('fullEpisode', 'title', true));
				break;
			case "Title [Asc]":
				this.resultList.sort(double_sort_by('title', 'fullEpisode', false));
				break;
			case "Title [Desc]":
				this.resultList.sort(double_sort_by('title', 'fullEpisode', true));
				break;
			default: 
				this.resultList.sort(double_sort_by('title', 'fullEpisode', true));
				break;

		}
		
		this.updateSortMenu();
		
		this.middleRevealTop();
		
		this.detailsProgram = defaultProgram;
		this.selectedIntid = -1;
		this.selectedProgramIndex = -1;
		setTimeout(enyo.bind(this,"showDetails"),1);
		
		this.$.programsVirtualList.refresh();
		
		this.$.loadingPopup.hide();
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
			} else if(s.fullEpisode.toUpperCase().indexOf(filterString) >=0) {
				finalList.push(s);
			} 
		}	
		
		return finalList;
	},
	getTitleItem: function(inSender, inIndex) {
		if(WebMyth.prefsCookie.videosGroup == "Directory") var row1 = this.directoriesList[inIndex];
		else var row2 = this.titlesList[inIndex];
		
		if(row1) {
		
			this.$.title.setContent(row1.localDirectory);
			this.$.count.setContent("");
			
			if(inIndex == this.directoriesList.length-1) this.$.titleItem.setStyle("border-bottom: none;");
			if(inIndex == 0) this.$.titleItem.setStyle("border-top: none;");
			
			return true;
		}
		
		if(row2) {
		
			this.$.title.setContent(row2.label);
			this.$.count.setContent("("+row2.count+")");
						
			if((row2.value == this.selectedTitle)&&(this.viewMode == "tablet")) {
				//this.$.dateItem.setStyle("background-color:rgba(0,0,0,0.05);border-top-color:rgba(0,0,0,0.05);");
				this.$.titleItem.addClass("selected");
			} else {
				//this.$.dateItem.setStyle("background-color: none;");
				this.$.titleItem.removeClass("selected");
			}
			
			if(inIndex == this.titlesList.length-1) this.$.titleItem.setStyle("border-bottom: none;");
			if(inIndex == 0) this.$.titleItem.setStyle("border-top: none;");
			
			return true;
		}
		
	},
	setupProgramItem: function(inSender, inIndex) {
		//if(debug) this.log("setupProgramItem index: "+inIndex+" and offset: "+this.programListOffset);
		
		var newIndex = this.programListOffset+inIndex;
		
		var row = this.resultList[newIndex];
		
		//if(debug) this.log("setupProgramItem data: "+enyo.json.to(row));
		
		if(row) {
		
			this.setupProgramDivider(newIndex);
		
			this.$.programTitle.setContent(row.title);
			
			this.$.row1.setContent(row.subtitle);
			this.$.row2.setContent(row.releasedate.replace("T"," "));
			this.$.row3.setContent(row.category);
			this.$.row4.setContent(row.fullEpisode);	
			
			
			if(WebMyth.prefsCookie.showVideoListImages) {
			
				var coverartUrl = "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/pl/coverart/";
				coverartUrl += row.coverfile;
				
				this.$.videoImage.setSrc(coverartUrl);
				this.$.videoImageWrapper.show();
				
			} else {
				
				this.$.videoImageWrapper.hide();
			}
			
			if((row.intid == this.selectedIntid)&&(this.viewMode == "tablet")) {
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
		
		var sort;
		var sortArray = WebMyth.prefsCookie.videosSort.split("[]:[]");
		
		if(this.selectedTitle == "") {
			sort = sortArray[0];
		} else {
			sort = sortArray[1];
		}
		
		switch(sort){
			case "Category [Asc]":
				var a = r0 && r0.category;
				var b = r1.category;
				break;
			case "Category [Desc]":
				var a = r0 && r0.category;
				var b = r1.category;
				break;
			case "Release Date [Asc]":
				var a = r0 && r0.releasedate;
				var b = r1.releasedate;
				break;
			case "Release Date [Desc]":
				var a = r0 && r0.releasedate;
				var b = r1.releasedate;
				break;
			case "Season [Asc]":
				var a = r0 && r0.season;
				var b = r1.season;
				break;
			case "Season [Desc]":
				var a = r0 && r0.season;
				var b = r1.season;
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
		
		return a != b ? b : null;
	},
	showDetails: function() {
		if(debug) this.log("showDetails");
		
		var row = {};
		
		if(this.selectedIntid == -1) {
			this.detailsProgram = defaultProgram;
			
			row = this.detailsProgram;
			
			this.$.rightDetailsCoverartWrapper.hide();
			
			this.$.playCommandButton.hide();
			this.$.webCommandButton.hide();
			
			this.$.rightCommandMenu.render();
			
			this.$.rightHeaderTitle.setContent("Details");
			
			this.peopleFailure();
			
		} else {
			
			row = this.detailsProgram;
			
			var query = 'SELECT * FROM `upnpmedia` WHERE `filename` = "'+row.onlyFilename+'" LIMIT 1;' ;
       
			if(debug) this.log("videos query is :"+query);
			
			if(WebMyth.useScript) {
			
				var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
				requestUrl += "?op=executeSQLwithResponse";				
				requestUrl += "&query64=";		
				requestUrl += Base64.encode(query);
				
				if(debug) this.log("requestUrl: "+requestUrl);
			
				this.$.getUpnpService.setUrl(requestUrl);
				this.$.getUpnpService.call();
			
			} else {
			
				this.doMysqlPluginCommand("mysqlVideoGetUpnp", query);
				
			}
			
			this.$.rightDetailsCoverartWrapper.show();
				
			//this.$.rightDetailsSpinnerWrapper.show();
			//this.$.rightDetailsCoverart.hide();
			//this.$.detailsSpinner.show();
			
			
			if(WebMyth.prefsCookie.showVideoDetailsImage) {		
			
				var iconUrl = "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/pl/coverart/";
				iconUrl += row.coverfile;
				
				this.$.rightDetailsCoverart.setSrc(iconUrl);
				this.$.rightDetailsCoverartWrapper.show();
				
			} else {
				
				this.$.rightDetailsCoverartWrapper.hide();
			}
			
			this.$.playCommandButton.show();
			this.$.webCommandButton.show();
			
			this.$.rightCommandMenu.render();
			
			this.$.rightHeaderTitle.setContent(row.title);
		
			this.$.peopleSpinnerItem.show();
			
			//this.getPeople();
		}
		
		
		this.$.subtitle.setContent(row.subtitle);
		this.$.detailsDescription.setContent(row.plot);
		this.$.category.setContent(row.category);
		
		this.$.releasedate.setContent(row.releasedate);
		this.$.fullepisode.setContent(row.fullepisode);
		this.$.filename.setContent(row.filename);
		
		//this.$.rightDetails.setContent(enyo.json.to(row));
		
		this.rightRevealTop();
		
	},
	upnpResponse: function(inSender, inResponse) {
		if(debug) this.log("upnpResponse: "+enyo.json.stringify(inResponse));
		if(debug) this.log("upnpResponse");
		
		//var xmlobject = inResponse;
		this.detailsProgram.upnpid = inResponse[0].intid;

		this.playList.length = 0;
		
		if(inResponse[0].intid) {
			this.playList.push({caption: "Download"});
			this.playList.push({caption: "Stream"});
		}
		
		for(var i = 0; i < WebMyth.prefsCookie.frontends.length; i++) {
			this.playList.push({caption: WebMyth.prefsCookie.frontends[i].name});
		}
		
		this.$.playPopupMenu.setItems(this.playList);
			
		this.$.detailsSpinner.hide();
		
		if(WebMyth.prefsCookie.showChannelIcons) {
			this.$.rightDetailsCoverart.show();		
			this.$.rightDetailsCoverartWrapper.show();
		} else {
			this.$.rightDetailsCoverartWrapper.hide();
		}
			
		setTimeout(enyo.bind(this,"getPeople"),300);
		
	},
	upnpFailure: function(inSender, inResponse) {
		this.error("upnpFailure");
		
		this.$.detailsSpinner.hide();
		
		if(WebMyth.prefsCookie.showChannelIcons) {
			this.$.rightDetailsCoverart.show();		
			this.$.rightDetailsCoverartWrapper.show();
		} else {
			this.$.rightDetailsCoverartWrapper.hide();
		}
		
		this.bannerMessage("ERROR: Failed to get program details from backend at '"+WebMyth.prefsCookie.masterBackendIp+"'");
			
		this.getPeople();

	},
	getPeople: function() {
		if(debug) this.log("getPeople");
			
		var query = 'SELECT `videometadatacast`.`idcast`, `videometadatacast`.`idvideo`, ';
		query += ' `videocast`.`intid` AS videoPersonId, `videocast`.`cast` AS name, ';
		query += ' `people`.`person` ';
		query += ' FROM `videometadatacast` ';
		query += ' LEFT OUTER JOIN `videocast` ON `videometadatacast`.`idcast` = `videocast`.`intid` ';
		query += ' LEFT OUTER JOIN `people` ON `videocast`.`cast` = `people`.`name` ';
		query += ' WHERE `videometadatacast`.`idvideo` = '+this.detailsProgram.intid+' ';
		query += ' ORDER BY `name` ';
		
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
			
			this.doMysqlPluginCommand("mysqlVideoGetPeople", query);
			
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
				//this.$.peopleRole.setContent(row.role);
				
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
		if(debug) this.log("updateSortMenu: "+WebMyth.prefsCookie.videosSort);
		
		this.doSavePreferences();
		
		var sortChoices = [
			{caption: "Category [Asc]", checked: false},
			{caption: "Category [Desc]", checked: false},
			{caption: "Release Date [Asc]", checked: false},
			{caption: "Release Date [Desc]", checked: false},
			{caption: "Season [Asc]", checked: false},
			{caption: "Season [Desc]", checked: false},
			{caption: "Title [Asc]", checked: false},
			{caption: "Title [Desc]", checked: false},
		];
		
		var sort;
		var sortArray = WebMyth.prefsCookie.videosSort.split("[]:[]");
		
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
			case "Release Date [Asc]":
				sortChoices[2].checked = true;
				break;
			case "Release Date [Desc]":
				sortChoices[3].checked = true;
				break;
			case "Season [Asc]":
				sortChoices[4].checked = true;
				break;
			case "Season [Desc]":
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



