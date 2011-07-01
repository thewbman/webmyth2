/* adsf*/


enyo.kind({ name: "remote",
	kind: "VFlexBox",
	className: "remote enyo-view",			//enyo-view needed to get vflexbox to work?
	published: {},
	
	phonePixels: 500,
	viewMode: "tablet",
	currentSlider: "left",
	currentSettingsSlider: "left",
	currentPane: "slidingPaneBox",
	statusLoop: false,
	currentVolume: 50,
	currentLocation: "",
	
	playbackTotalTime: 3630,
	
	locationCountdown: "",
	detailsCountdown: "",
	volumeCountdown: "",
	
	frontendIndex: 0,
	
	searchHosts: [],
	
	carouselIndex: -1,
	
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
		onDownloadFile: "",
		onRemotePluginCommand: "",
		onRemotePluginClose: "",
	},
	
	components: [
			
			{name: "sendKeyService", kind: "WebService", handleAs: "txt", onSuccess: "sendKeySuccess", onFailure: "sendKeyFailure"},
			{name: "sendJumpService", kind: "WebService", handleAs: "txt", onSuccess: "sendJumpSuccess", onFailure: "sendJumpFailure"},
			{name: "sendPlayService", kind: "WebService", handleAs: "txt", onSuccess: "sendPlaySuccess", onFailure: "sendPlayFailure"},
			{name: "sendChannelService", kind: "WebService", handleAs: "txt", onSuccess: "sendChannelSuccess", onFailure: "sendChannelFailure"},
			{name: "queryLocationService", kind: "WebService", handleAs: "txt", onSuccess: "queryLocationSuccess", onFailure: "queryLocationFailure"},
			{name: "queryDetailsService", kind: "WebService", handleAs: "txt", onSuccess: "queryDetailsSuccess", onFailure: "queryDetailsFailure"},
			{name: "queryVolumeService", kind: "WebService", handleAs: "txt", onSuccess: "queryVolumeSuccess", onFailure: "queryVolumeFailure"},
			{name: "videoDetailsService", kind: "WebService", handleAs: "json", onSuccess: "videoDetailsSuccess", onFailure: "videoDetailsFailure"},
			
			{name: "getHostsService", kind: "WebService", handleAs: "xml", onSuccess: "getHostsSuccess", onFailure: "getHostsFailure"},
			
			{name: "testQueryService", kind: "WebService", handleAs: "txt", onSuccess: "testQuerySuccess", onFailure: "testQueryFailure"},
			
			{name: "loadingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
				{kind: "HFlexBox", components: [
					{kind: "Spacer"},
					{kind: "SpinnerLarge"},
					{kind: "Spacer"},
				]},
				{content: "Loading...", style: "text-align: center;"},
			]},
			{name: "messagePopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, onclick: "messagePopupClick", components: [
				{name: "messagePopupText", style: "text-align: center;"},
				{content: "(Click anywhere to close this message)", style: "text-align: center;"},
			]},
			{name: "searchHostsPopup", kind: "Popup", className: "searchHostsPopup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
				{name: "searchHostsVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getSearchHostsItem", onclick: "searchHostsSelect", components: [
					{name: "searchHostsItem", kind: "Item", className: "frontendItem", components: [
						{name: "searchHostsName", className: "frontendName"},
						{name: "searchHostsAddressAndPort", className: "frontendAddressAndPort"},
					]},
				]},
			]},
			
			{name: "remotePane", kind: "Pane", flex: 1, transitionKind: "enyo.transitions.Simple", onSelectView: "viewSelected", components: [
			
				{name: "slidingPaneBox", kind: "VFlexBox", flex: 1, components: [
				
					{name: "remoteHeader", kind: "Toolbar", layoutKind: "VFlexLayout", onclick: "headerClick", components: [
						{name: "remoteHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Navigation"), flex2: 1},
						{name: "remoteHeaderSubtitle", kind: "Control", className: "headerSubtitle", content: "&nbsp;", flex2: 1},
					]},
								
					{name: "slidingPane", kind: "SlidingPane", flex: 1, multiViewMinWidth: 500, onSelectView: "slidingSelected", components: [
						{name: "left", kind2: "Sliding", className: "left", dragAnywhere: false, width: "33%", components: [
							{name: "leftVFlexBox", kind: "VFlexBox", flex: 1, components: [
								
								//{name: "leftScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
									{kind: "HFlexBox", components: [
										{kind: "Button", caption: "Mute", value: "f9", flex: 1, onclick: "keyButtonClick"},
										{kind: "Button", caption: "Vol-", value: "f10", flex: 1, onclick: "keyButtonClick"},
										{kind: "Button", caption: "Vol+", value: "f11", flex: 1, onclick: "keyButtonClick"},
									]},
									{content: "&nbsp"},
									{name: "standardRemoteWrapper", showing: true, components: [
										{kind: "HFlexBox", components: [
											{kind: "Button", caption: "Back", value: "escape", flex: 1, onclick: "keyButtonClick"},
											{kind: "Button", caption: "Up", value: "up", flex: 1, onclick: "keyButtonClick"},
											{kind: "Button", caption: "Delete", value: "d", flex: 1, onclick: "keyButtonClick"},
										]},
										{kind: "HFlexBox", components: [
											{kind: "Button", caption: "Left", value: "left", flex: 1, onclick: "keyButtonClick"},
											{kind: "Button", caption: "Select", value: "space", flex: 1, onclick: "keyButtonClick"},
											{kind: "Button", caption: "Right", value: "right", flex: 1, onclick: "keyButtonClick"},
										]},
										{kind: "HFlexBox", components: [
											{kind: "Button", caption: "Menu", value: "m", flex: 1, onclick: "keyButtonClick"},
											{kind: "Button", caption: "Down", value: "down", flex: 1, onclick: "keyButtonClick"},
											{kind: "Button", caption: "Info", value: "i", flex: 1, onclick: "keyButtonClick"},
										]},
									]},
									{name: "flickRemoteWrapper", showing: false, components: [
										{kind: "HFlexBox", components: [
											{kind: "Button", caption: "X", value: "escape", flex2: 1, onclick: "keyButtonClick"},
											{kind: "Spacer"},
											{kind: "Button", caption: "D", value: "d", flex2: 1, onclick: "keyButtonClick"},
										]},
										{kind: "HFlexBox", aling: "center", pack: "center", components: [
											{kind: "CustomButton", height: "200px", width: "200px", className: "flickNavButton", onclick: "flickButtonClick", onflick: "flickFlick", ongesturestart: "flickGestureStart", ongestureend: "flickGestureEnd"},
											//{kind: "Image", src: "images/arrows-200x200-clear.png", onclick: "flickButtonClick"},
										]},
										{kind: "HFlexBox", components: [
											{kind: "Button", caption: "M", value: "m", flex2: 1, onclick: "keyButtonClick"},
											{kind: "Spacer"},
											{kind: "Button", caption: "I", value: "i", flex2: 1, onclick: "keyButtonClick"},
										]},
									]},
									{content: "&nbsp"},
									{kind: "HFlexBox", showing: true, components: [
										{kind: "Button", caption: "|&lt;&lt;", allowHtml: true, value: "q", flex: 1, onclick: "keyButtonClick"},
										{kind: "Button", caption: "||", value: "p", flex: 1, onclick: "keyButtonClick"},
										{kind: "Button", caption: "&gt;&gt;|", allowHtml: true, value: "z", flex: 1, onclick: "keyButtonClick"},
									]},
									{content: "&nbsp", showing: true},
									{kind: "HFlexBox", components: [
										{kind: "Button", caption: "LiveTV", value: "livetv", flex: 1, onclick: "jumpButtonClick"},
										{kind: "Button", caption: "Recorded", value: "playbackrecordings", flex: 1, onclick: "jumpButtonClick"},
										//{kind: "Button", caption: "Video", value: "mythvideo", flex: 1, onclick: "jumpButtonClick"},
										//{kind: "Button", caption: "Music", value: "playmusic", flex: 1, onclick: "jumpButtonClick"},
									]},
									{kind: "HFlexBox", components: [
										//{kind: "Button", caption: "LiveTV", value: "livetv", flex: 1, onclick: "jumpButtonClick"},
										//{kind: "Button", caption: "Recorded", value: "playbackrecordings", flex: 1, onclick: "jumpButtonClick"},
										{kind: "Button", caption: "Video", value: "mythvideo", flex: 1, onclick: "jumpButtonClick"},
										{kind: "Button", caption: "Music", value: "playmusic", flex: 1, onclick: "jumpButtonClick"},
									]},
									//{content: "&nbsp"},
								//]},
								
							]},
						]},
						{name: "middle", kind2: "Sliding", className: "middle", dragAnywhere: false, width: "33%", components: [
							{name: "middleVFlexBox", kind: "VFlexBox", flex: 1, components: [
								
								{name: "middleScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
									{style: "height: 10px"},
									{kind: "HFlexBox", components: [
										{content: "Keyboard", flex: 1},
										{name: "keyboardToggle", kind: "ToggleButton", onChange: "showKeyboardToggle"},
									]},
									{content: "&nbsp"},
									{kind: "HFlexBox", components: [
										{kind: "Button", caption: "1", value: "1", flex: 1, onclick: "keyButtonClick"},
										{kind: "Button", caption: "2", value: "2", flex: 1, onclick: "keyButtonClick"},
										{kind: "Button", caption: "3", value: "3", flex: 1, onclick: "keyButtonClick"},
									]},
									{kind: "HFlexBox", components: [
										{kind: "Button", caption: "4", value: "4", flex: 1, onclick: "keyButtonClick"},
										{kind: "Button", caption: "5", value: "5", flex: 1, onclick: "keyButtonClick"},
										{kind: "Button", caption: "6", value: "6", flex: 1, onclick: "keyButtonClick"},
									]},
									{kind: "HFlexBox", components: [
										{kind: "Button", caption: "7", value: "7", flex: 1, onclick: "keyButtonClick"},
										{kind: "Button", caption: "8", value: "8", flex: 1, onclick: "keyButtonClick"},
										{kind: "Button", caption: "9", value: "9", flex: 1, onclick: "keyButtonClick"},
									]},
									{kind: "HFlexBox", components: [
										{flex: 1.5},
										{kind: "Button", caption: "0", value: "0", flex: 1, onclick: "keyButtonClick"},
										{flex: 1.5},
									]},
									{content: "&nbsp"},
								]},
				
							]},
						]},
						{name: "right", kind2: "Sliding", className: "right", dragAnywhere: false, width: "340px", flex: 1, components: [
							{name: "rightVFlexBox", kind: "VFlexBox", flex: 1, components: [
								
								{name: "rightScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
									{name: "volumeRowGroup", kind: "RowGroup", caption: "Volume", components: [
										{kind: "Item", layoutKind: "HFlexLayout", components: [
											{style: "width: 10px;"},
											{name: "volumeSlider", kind: "Slider", onChanging: "volumeSliderChanging", onChange: "volumeSliderChange", tapPosition: false, maximum: 100, minimum: 0, position: 50, snap: 2, flex: 1},
											{style: "width: 10px;"},
										]},
									]},
									{kind: "HFlexBox", components: [
										{kind: "Button", caption: "|&lt;&lt;", allowHtml: true, value: "q", flex: 1, onclick: "keyButtonClick"},
										{kind: "Button", caption: "||", value: "p", flex: 1, onclick: "keyButtonClick"},
										{kind: "Button", caption: "&gt;&gt;|", allowHtml: true, value: "z", flex: 1, onclick: "keyButtonClick"},
									]},
									{name: "playbackRowGroup", kind: "RowGroup", caption: "Location", components: [
										{name: "playbackSliderItem", kind: "Item", showing: false, layoutKind: "HFlexLayout", components: [
											{style: "width: 8px;"},
											{name: "playbackSlider", kind: "Slider", onChanging: "playbackSliderChanging", onChange: "playbackSliderChange", tapPosition: false, maximum: 100, minimum: 0, position: 0, snap: 1, flex: 1},
											{style: "width: 8px;"},
										]},
										{name: "playbackTimeItem", kind: "Item", layoutKind: "HFlexLayout", components: [
											{name: "playbackSpeedText", className: "label"},
											{kind: "Spacer"},
											{name: "playbackTimeText", content: "Disconnected", style: "text-align: center;", className: "smallerFont"},
											{kind: "Spacer"},
										]},
										{name: "playbackTitleItem", kind: "Item", showing: false, layoutKind: "HFlexLayout", components: [
											{kind: "Spacer"},
											{name: "playbackTitleText", style: "text-align: center;", className: "smallerFont"},
											{kind: "Spacer"},
										]},
										{name: "playbackExtrasItem", kind: "Item", showing: false, layoutKind: "HFlexLayout", components: [
											{kind: "Spacer"},
											{name: "playbackExtrasText", style: "text-align: center;", className: "smallerFont"},
											{kind: "Spacer"},
										]},
									]},
								]},
				
							]},
						]},
					]},	
					
					{kind: "Toolbar", components: [
						{name: "remoteBackCommandIcon", kind: "Control", className: "backCommandIcon", onclick: "gotBack"},
						{kind: "Spacer"},
						{name: "remoteRadioGroup", kind: "RadioGroup", onChange: "remoteRadioGroupChanged", value: "Navigation", components: [
							{label: "Nav", value: "Navigation"},
							{label: "#A", value: "Numbers"},
							{label: "Play", value: "Playback"},
						]},
						{kind: "Spacer"},
						{name: "remoteSettingCommandIcon", kind: "Control", className: "settingsCommandIcon", onclick: "showSettingsSlidingPane"},
					]},
				
				]},
				
				{name: "settingsSlidingPane", kind: "SlidingPane", flex: 1, multiViewMinWidth: 500, onSelectView: "settingsSlidingSelected", components: [
					{name: "settingsLeft", kind2: "Sliding", className: "left", dragAnywhere: false, width: "33%", components: [
						{name: "settingsLeftVFlexBox", kind: "VFlexBox", flex: 1, components: [
							{name: "settingsLeftHeader", kind: "Toolbar", layoutKind: "HFlexLayout", onclick: "settingsleftRevealTop", components: [
								{name: "settingsLeftHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Frontends"), flex2: 1},
							]},
							
							{name: "settingsLeftScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
								
								{name: "frontendsVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getFrontendItem", components: [
									{name: "frontendItem", kind: "SwipeableItem", onclick: "frontendSelect", onConfirm: "frontendDelete", className: "frontendItem", components: [
										{name: "frontendName", className: "frontendName"},
										{name: "frontendAddressAndPort", className: "frontendAddressAndPort"},
									]},
								]},
								
								{content: "&nbsp"},
							
							]},
							
							{kind: "Toolbar", components: [
								{name: "leftBackCommandIcon", kind: "Control", className: "backCommandIcon", onclick: "gotBack"},
								{kind: "Spacer"},
								{name: "addCommandButton", caption: $L("Add"), onclick: "addClick"},
								{kind: "Spacer"},
								{name: "searchCommandButton", caption: $L("Search"), onclick: "searchClick"},
								{kind: "Spacer"},
								{name: "leftBackCommandIconSpacer", kind: "Control", className: "backCommandIconSpacer"},
							]},
							
						]},
					]},
					{name: "settingsMiddle", kind2: "Sliding", className: "middle", dragAnywhere: false, width: "33%", components: [
						{name: "settingsMiddleVFlexBox", kind: "VFlexBox", flex: 1, components: [
							{name: "settingsMiddleHeader", kind: "Toolbar", layoutKind: "HFlexLayout", onclick: "settingsMiddleRevealTop", components: [
								{name: "settingsMiddleHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Add/Edit"), flex2: 1},
							]},
							
							{name: "settingsMiddleScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
								
								{name: "addEditRowGroup", kind: "RowGroup", caption: "Edit", components: [
									{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "frontendNameInput", kind: "Input", autoCapitalize: "lowercase", flex: 1, components: [
											{content: "Name", className: "label"},
										]},
									]},
									{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "frontendPortInput", kind: "Input", autoCapitalize: "lowercase", flex: 1, components: [
											{content: "Port", className: "label"},
										]},
									]},
									{kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", components: [
										{name: "frontendAddressInput", kind: "Input", autoCapitalize: "lowercase", flex: 1, components: [
											{content: "Address", className: "label"},
										]},
									]},
								]},
								
								{content: "&nbsp;"},
							
							]},
							
							{kind: "Toolbar", components: [
								{kind: "GrabButton", onclick: "gotoSettingsLeft"},
								{kind: "Spacer"},
								{name: "saveCommandButton", caption: $L("Save"), onclick: "saveClick"},
								{kind: "Spacer"},
								{name: "testCommandButton", caption: $L("Test"), onclick: "testClick"},
								{kind: "Spacer"},
							]},
						]},
					]},
					{name: "settingsRight", kind2: "Sliding", className: "right", dragAnywhere: false, flex: 1, components: [
						{name: "settingsRightVFlexBox", kind: "VFlexBox", flex: 1, components: [
							{name: "settingsRightHeader", kind: "Toolbar", layoutKind: "HFlexLayout", onclick: "settingsRightRevealTop", components: [
								{name: "settingsRightHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Test"), flex2: 1},
							]},
							
							{name: "settingsRightScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
								
								{name: "frontendStatusRowGroup", kind: "RowGroup", caption: "Current Location", components: [
									{name: "frontendStatusItem", kind: "Item", layoutKind: "HFlexLayout", className: "frontendStatus", components: [
										{name: "frontendStatus", className: "smallerFont", flex: 1},
									]},
								]},
								
								{name: "remoteScreenshotWrapper", kind: "HFlexBox", align: "center", pack: "center", className: "remoteScreenshotWrapper", components: [
									{name: "remoteScreenshot", kind: "Image", className: "remoteScreenshot", onclick: "remoteScreenshotClick"},
								]},
							
							]},
							
							{kind: "Toolbar", components: [
								{kind: "GrabButton", onclick: "gotoSettingsMiddle"},
								{kind: "Spacer"},
								{name: "doneCommandButton", caption: $L("Done"), onclick: "gotoSettingsLeft"},
								{kind: "Spacer"},
							]},
						]},
					]},
				]},
				
				{name: "remoteCarousel", kind: "Carousel", flex: 1, className: "remoteCarousel", onGetLeft: "getLeft", onGetRight: "getRight", onclick: "selectedCarouselProgram"},
				{name: "remoteImageView", kind: "ImageView", flex: 1, className: "imageView", onclick: "showSettingsSlidingPane"},
				
			]},
			
		
	],
	
	create: function() {
		if(debug) this.log("create");
		this.inherited(arguments);
		
		this.render();
		
		//this.activate();
		
	},
	
	//Externally called functions
	activate: function(inViewMode) {
		if(debug) this.log("activate: "+inViewMode);
		//this.render();
		
		this.viewMode = inViewMode;
		
		this.resize(this.viewMode);
		
		this.frontendIndex = WebMyth.prefsCookie.frontendIndex;
		
		this.showSlidingPane();
		
		this.leftRevealTop();
		this.middleRevealTop();
		this.rightRevealTop();
		
		this.clearTest();
		
		this.updateHeader();
		
		this.$.keyboardToggle.setState(false);
		
		this.startLoop();
		
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
		
		enyo.keyboard.setManualMode(false);
		
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
			
			this.$.remoteBackCommandIcon.hide();
			
			this.$.remoteRadioGroup.hide();
			
			this.$.doneCommandButton.hide();
			
			
		} else {
		
			this.$.remoteBackCommandIcon.show();
			
			this.$.remoteRadioGroup.setValue(WebMyth.prefsCookie.remotePane);
			this.$.remoteRadioGroup.show();
			
			switch(WebMyth.prefsCookie.remotePane) {
				case "Navigation":
					this.currentSlider = "left";
					break;
				case "Numbers":
					this.currentSlider = "middle";
					break;
				case "Playback":
					this.currentSlider = "right";
					break;
			}
			
			this.$.doneCommandButton.show();
		}
		
		this.updateHeader();
		
		this.$.slidingPane.resize();
		this.$.left.render();
		this.$.middle.render();
		this.$.right.render();
		
		if(this.currentPane != "settingsSlidingPane") {
			this.$.settingsSlidingPane.resize();
			this.$.settingsLeft.render();
			this.$.settingsMiddle.render();
			this.$.settingsRight.render();
		}
		
		//this.$.remoteCarousel.render();
		//this.$.remoteImageView.render();
		
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
		
		if(this.currentPane == "slidingPaneBox") {
			this.sendKey(inKey);
		}
		
	},
	gotSpecialKey: function(inKey) {
		if(debug) this.log("gotSpecialKey: "+inKey);
		
		this.finishedSelectingDate();
	},
	bannerMessage: function(message) {
		if(debug) this.log("bannerMessage: "+message);
		
		this.doBannerMessage(message);
		
		//this.$.messagePopupText.setContent(message);
		//this.$.messagePopup.openAtCenter();
		
	},
	messagePopupClick: function() {
		if(debug) this.log("messagePopupClick");
		
		this.$.messagePopup.close();
		
	},
	externalCommand: function(inType, inCommand) {
		if(debug) this.log("externalCommand: "+inType+" "+inCommand);
		
		this.frontendIndex = WebMyth.prefsCookie.frontendIndex;
		
		switch(inType) {
			case "play":
				this.sendPlay(inCommand);
				break;
			case "channel":
				this.channelLoopIndex = 0;
				this.newChannel = inCommand;
				
				this.sendChannel();
				break;
		}
		
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
		
		//this.$.leftScroller.scrollIntoView(0,0);
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
			case 'webmyth2_remote_left':
				this.currentSlider = "left";
				break;
			case 'webmyth2_remote_middle':
				this.currentSlider = "middle";
				break;
			case 'webmyth2_remote_right':
				this.currentSlider = "right";
				break;
		}
	},
	remoteRadioGroupChanged: function(inSender) {
		if(debug) this.log("remoteRadioGroupChanged: "+inSender.getValue());
		
		WebMyth.prefsCookie.remotePane = inSender.getValue();
		
		this.doSavePreferences();
		
		if(this.viewMode == "phone") {
		
			switch(WebMyth.prefsCookie.remotePane) {
				case "Navigation":
					this.gotoLeft();
					break;
				case "Numbers":
					this.gotoMiddle();
					break;
				case "Playback":
					this.gotoRight();
					break;
			}
			
			this.updateHeader();
			
		}
	
	},
	showSlidingPane: function() {
		if(debug)	this.log("showSlidingPane");
		
		this.$.remotePane.selectViewByName("slidingPaneBox");
		
		this.updateHeader();
		
		this.startLoop();
	},
	showSettingsSlidingPane: function() {
		if(debug) this.log("showSettingsSlidingPane");

		//this.statusLoop = false;
		this.stopLoop();
		
		this.frontendIndex = WebMyth.prefsCookie.frontendIndex;
		
		this.$.frontendNameInput.setValue(WebMyth.prefsCookie.frontends[this.frontendIndex].name);
		this.$.frontendPortInput.setValue(WebMyth.prefsCookie.frontends[this.frontendIndex].port);
		this.$.frontendAddressInput.setValue(WebMyth.prefsCookie.frontends[this.frontendIndex].address);
		
		this.$.frontendsVirtualRepeater.render();
		
		this.clearTest();
		
		this.$.remotePane.selectViewByName("settingsSlidingPane");
		
	},
	gotoSettingsLeft: function() {
		if(debug) this.log("gotoSettingsLeft");
		
		this.settingsLeftRevealTop();
		this.$.settingsSlidingPane.selectView(this.$.settingsLeft);
		this.currentSettingsSlider = "left";
		
	},
	gotoSettingsMiddle: function() {
		if(debug) this.log("gotoMiddle");
		
		this.settingsMiddleRevealTop();
		this.$.settingsSlidingPane.selectView(this.$.settingsMiddle);
		this.currentSettingsSlider = "middle";
		
	},
	gotoSettingsRight: function() {
		if(debug) this.log("gotoSettingsRight");
		
		this.settingsRightRevealTop();
		this.$.settingsSlidingPane.selectView(this.$.settingsRight);
		this.currentSettingsSlider = "right";
	},
	settingsLeftRevealTop: function() {
		if(debug) this.log("settingsLeftRevealTop");
		
		this.$.frontendsVirtualRepeater.render();
		this.$.settingsLeftScroller.scrollIntoView(0,0);
	},
	settingsMiddleRevealTop: function() {
		if(debug) this.log("settingsMiddleRevealTop");
		
		this.$.settingsMiddleScroller.scrollIntoView(0,0);
	},
	settingsRightRevealTop: function() {
		if(debug) this.log("settingsRightRevealTop");
		
		this.$.settingsRightScroller.scrollIntoView(0,0);
	},
	headerClick: function() {
		if(debug) this.log("headerClick");
		
		switch(WebMyth.prefsCookie.remoteHeader) {
			case "Pause":
				this.sendKey("p");
				break;
			case "Mute":
				this.sendKey("f9");
				break;
			case "Nothing":
				//
				break;
		}
	},
	keyButtonClick: function(inSender) {
		if(debug) this.log("keyButtonClick: "+inSender.value);
		
		this.sendKey(inSender.value);
	},
	flickButtonClick: function(inSender) {
		if(debug) this.log("flickButtonClick");
		
		this.sendKey("space");
	},
	flickFlick: function(inSender) {
		if(debug) this.log("flickFlick");
		
	},
	flickGestureStart: function(inSender) {
		if(debug) this.log("flickGestureStart");
		
	},
	flickGestureEnd: function(inSender) {
		if(debug) this.log("flickGestureEnd");
		
	},
	jumpButtonClick: function(inSender) {
		if(debug) this.log("jumpButtonClick: "+inSender.value);
		
		this.sendJump(inSender.value);
	},
	volumeSliderChanging: function() {
		if(debug) this.log("volumeSliderChanging: "+this.$.volumeSlider.getPosition());
		
		this.statusLoop = false;
		
		this.$.volumeRowGroup.setCaption("Volume: "+this.$.volumeSlider.getPosition()+"%");
	},
	volumeSliderChange: function() {
		if(debug) this.log("volumeSliderChange: "+this.$.volumeSlider.getPosition());
		
		this.currentVolume = this.$.volumeSlider.getPosition();
		
		//this.$.volumeDisplay.setContent(this.currentVolume+"%");
		this.$.volumeRowGroup.setCaption("Volume: "+this.currentVolume+"%");
		
		this.sendPlay("volume "+this.currentVolume+"%");
	},
	playbackSliderChanging: function() {
		if(debug) this.log("playbackSliderChanging: "+this.$.playbackSlider.getPosition());
		
		this.statusLoop = false;
		
		this.$.playbackTimeText.setContent(secondsToTime((this.$.playbackSlider.getPosition()/100)*this.playbackTotalTime)+" of "+secondsToTime(this.playbackTotalTime));
	},
	playbackSliderChange: function() {
		if(debug) this.log("playbackSliderChange: "+this.$.playbackSlider.getPosition());
		
		this.playbackCurrentTime = parseInt((this.$.playbackSlider.getPosition()/100)*this.playbackTotalTime);
		
		this.sendPlay("seek "+secondsToTime(this.playbackCurrentTime));
	},
	showKeyboardToggle: function(inSender, inState) {
		if(debug) this.log("showKeyboardToggle to state: "+inState);
		
		if(inState == true) {
			enyo.keyboard.forceShow(5);
		} else {
			enyo.keyboard.setManualMode(false);
		}
	
	},
	frontendSelect: function(inSender, inEvent) {
		if(debug) this.log("frontendSelect index "+inEvent.rowIndex);
		
		this.frontendIndex = inEvent.rowIndex;
		WebMyth.prefsCookie.frontendIndex = this.frontendIndex;
		
		this.$.frontendNameInput.setValue(WebMyth.prefsCookie.frontends[this.frontendIndex].name);
		this.$.frontendPortInput.setValue(WebMyth.prefsCookie.frontends[this.frontendIndex].port);
		this.$.frontendAddressInput.setValue(WebMyth.prefsCookie.frontends[this.frontendIndex].address);
		
		this.doSavePreferences();
		
		this.$.frontendsVirtualRepeater.render();
		
		this.clearTest();
		
		if(this.viewMode == "phone") this.gotoSettingsMiddle();
		
	},
	frontendDelete: function(inSender, inEvent) {
		if(debug) this.log("frontendDelete index "+enyo.json.stringify(inEvent));
		
		WebMyth.prefsCookie.frontends.splice(enyo.json.stringify(inEvent),1);
		
		this.frontendIndex = 0;
		WebMyth.prefsCookie.frontendIndex = 0;
		
		this.$.frontendNameInput.setValue(WebMyth.prefsCookie.frontends[this.frontendIndex].name);
		this.$.frontendPortInput.setValue(WebMyth.prefsCookie.frontends[this.frontendIndex].port);
		this.$.frontendAddressInput.setValue(WebMyth.prefsCookie.frontends[this.frontendIndex].address);
		
		this.doSavePreferences();
		
		this.$.frontendsVirtualRepeater.render();
		
		this.clearTest();
		
	},
	clearTest: function() {
		if(debug) this.log("clearTest");
		
		this.$.frontendStatus.setContent("");
		
		this.$.remoteScreenshotWrapper.hide();
		
	},
	addClick: function() {
		if(debug) this.log("addClick");
		
		this.frontendIndex = WebMyth.prefsCookie.frontends.length;
		
		this.settingsLeftRevealTop();
		
		this.$.frontendNameInput.setValue("");
		this.$.frontendPortInput.setValue("");
		this.$.frontendAddressInput.setValue("");
		
		this.clearTest();
		
		if(this.viewMode == "phone") this.gotoSettingsMiddle();
		
		this.$.frontendNameInput.forceFocus();
		
	},
	searchClick: function() {
		if(debug) this.log("searchClick");
		
		//this.bannerMessage("Searching for frontends is not currently supported");
		
		var requestUrl = "http://"+WebMyth.prefsCookie.masterBackendIp+":6544/Myth/GetHosts";
		
		this.$.getHostsService.setUrl(requestUrl);
		this.$.getHostsService.call();
		
	},
	saveClick: function() {
		if(debug) this.log("saveClick");
		
		if(this.frontendIndex < WebMyth.prefsCookie.frontends.length) {
		
			WebMyth.prefsCookie.frontends[this.frontendIndex].name = this.$.frontendNameInput.getValue();
			WebMyth.prefsCookie.frontends[this.frontendIndex].port = this.$.frontendPortInput.getValue();
			WebMyth.prefsCookie.frontends[this.frontendIndex].address = this.$.frontendAddressInput.getValue();
			
		} else {
		
			var s = {};
			
			s.name = this.$.frontendNameInput.getValue();
			s.port = this.$.frontendPortInput.getValue();
			s.address = this.$.frontendAddressInput.getValue();
			
			WebMyth.prefsCookie.frontends.push(s);
			
		}
		
		WebMyth.prefsCookie.frontendIndex = this.frontendIndex;
		
		this.doSavePreferences();
		
		this.$.frontendsVirtualRepeater.render();
		
		this.gotoSettingsLeft();
		
	},
	testClick: function() {
		if(debug) this.log("testClick");
		
		if(this.frontendIndex < WebMyth.prefsCookie.frontends.length) {
		
			WebMyth.prefsCookie.frontends[this.frontendIndex].name = this.$.frontendNameInput.getValue();
			WebMyth.prefsCookie.frontends[this.frontendIndex].port = this.$.frontendPortInput.getValue();
			WebMyth.prefsCookie.frontends[this.frontendIndex].address = this.$.frontendAddressInput.getValue();
			
		} else {
		
			var s = {};
			
			s.name = this.$.frontendNameInput.getValue();
			s.port = this.$.frontendPortInput.getValue();
			s.address = this.$.frontendAddressInput.getValue();
			
			WebMyth.prefsCookie.frontends.push(s);
			
		}
		
		WebMyth.prefsCookie.frontendIndex = this.frontendIndex;
		
		this.doSavePreferences();
		
		this.$.frontendsVirtualRepeater.render();
		
		//doesn't work on FE-only boxes?
		var screenshotUrl = "http://"+WebMyth.prefsCookie.frontends[this.frontendIndex].address+":6547/MythFE/GetScreenShot";	//Height=#&width=#
		//var screenshotUrl = "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/remote/screenshot?format=png&host="+WebMyth.prefsCookie.frontends[this.frontendIndex].name;
		
		this.$.remoteScreenshot.setSrc(screenshotUrl);
		
		this.$.remoteScreenshotWrapper.show();

		
		if(WebMyth.useScriptRemote) {
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=remote&type=query";
			requestUrl += "&host="+WebMyth.prefsCookie.frontends[this.frontendIndex].name;
			requestUrl += "&cmd=location";
			
			if(debug) this.log("requestUrl: "+requestUrl);
			
			this.$.testQueryService.setUrl(requestUrl);
			this.$.testQueryService.call();
			
		} else {
		
			this.doRemotePluginCommand("testQuery","location");
		
		}
		
		this.$.frontendsVirtualRepeater.render();
		
		if(this.viewMode == "phone") this.gotoSettingsRight();
			
	},
	remoteScreenshotClick: function() {
		if(debug) this.log("remoteScreenshotClick");
		
		this.frontendIndex = WebMyth.prefsCookie.frontendIndex;
		
		//doesn't work on FE-only boxes?
		var screenshotUrl = "http://"+WebMyth.prefsCookie.frontends[this.frontendIndex].address+":6547/MythFE/GetScreenShot";	//Height=#&width=#
		//var screenshotUrl = "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/remote/screenshot?format=png&host="+WebMyth.prefsCookie.frontends[this.frontendIndex].name;
			
		this.$.remoteImageView.setCenterSrc(screenshotUrl);
		this.$.remoteImageView.render();
		this.$.remotePane.selectViewByName("remoteImageView");
		
	},	
	
	//Remote functions
	updateHeader: function() {
		if(debug) this.log("updateHeader");
		
		if(this.viewMode == "phone") {
			switch(WebMyth.prefsCookie.remotePane) {
				case "Navigation":
					this.$.remoteHeaderTitle.setContent("Navigation");
					break;
				case "Numbers":
					this.$.remoteHeaderTitle.setContent("Numbers");
					break;
				case "Playback":
					this.$.remoteHeaderTitle.setContent("Playback");
					break;
			}
		} else {
			this.$.remoteHeaderTitle.setContent("Remote");
		}
		
		try {
			this.$.remoteHeaderSubtitle.setContent(WebMyth.prefsCookie.frontends[this.frontendIndex].name);
		} catch(e) {
			this.$.remoteHeaderSubtitle.setContent("&nbsp;");
		}
		
	},
	getFrontendItem: function(inSender, inIndex) {
		if(WebMyth.prefsCookie) {
		
			var row = WebMyth.prefsCookie.frontends[inIndex];
			
			if(row) {
			
				this.$.frontendName.setContent(row.name); 
				this.$.frontendAddressAndPort.setContent(row.address+":"+row.port); 
				
				if(inIndex == this.frontendIndex) {
					this.$.frontendItem.addClass("selected");
				} else {
					this.$.frontendItem.removeClass("selected");
				}
			
				return true;
			}
		}
	},
	sendKey: function(inKey) {
		if(debug) this.log("sendKey: "+inKey);
		
		var cmdvalue = encodeURIComponent(inKey);
		
		if(WebMyth.useScriptRemote) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=remote&type=key";
			requestUrl += "&host="+WebMyth.prefsCookie.frontends[this.frontendIndex].name;
			requestUrl += "&cmd="+cmdvalue;
			
			if(debug) this.log("requestUrl: "+requestUrl);
			
			this.$.sendKeyService.setUrl(requestUrl);
			this.$.sendKeyService.call();
			
		} else {
		
			this.doRemotePluginCommand("key",inKey);
		
		}
		
	},
	sendKeySuccess: function(inSender, inResponse) {
		if(debug) this.log("sendKeySuccess: "+inResponse);
		
		this.startLoop();
	
	},
	sendKeyFailure: function(inSender, inResponse) {
		this.error("sendKeyFailure");
		
		this.bannerMessage("ERROR: Failed to send key to frontend: '"+WebMyth.prefsCookie.frontends[this.frontendIndex].name+"'");
		
	},
	sendJump: function(inJump) {
		if(debug) this.log("sendJump: "+inJump);
		
		var cmdvalue = encodeURIComponent(inJump);
		
		if(WebMyth.useScriptRemote) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=remote&type=jump";
			requestUrl += "&host="+WebMyth.prefsCookie.frontends[this.frontendIndex].name;
			requestUrl += "&cmd="+cmdvalue;
			
			if(debug) this.log("requestUrl: "+requestUrl);
			
			this.$.sendJumpService.setUrl(requestUrl);
			this.$.sendJumpService.call();
			
		} else {
		
			this.doRemotePluginCommand("jump",inJump);
		
		}
		
	},
	sendJumpSuccess: function(inSender, inResponse) {
		if(debug) this.log("sendJumpSuccess: "+inResponse);
		
		this.startLoop();
	
	},
	sendJumpFailure: function(inSender, inResponse) {
		this.error("sendJumpFailure");
		
		this.bannerMessage("ERROR: Failed to send jump point to frontend: '"+WebMyth.prefsCookie.frontends[this.frontendIndex].name+"'");
		
	},	
	sendPlay: function(inPlay) {
		if(debug) this.log("sendPlay: "+inPlay);
		
		var cmdvalue = encodeURIComponent(inPlay);
		
		if(WebMyth.useScriptRemote) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=remote&type=play";
			requestUrl += "&host="+WebMyth.prefsCookie.frontends[this.frontendIndex].name;
			requestUrl += "&cmd="+cmdvalue;
			
			if(debug) this.log("requestUrl: "+requestUrl);
			
			this.$.sendPlayService.setUrl(requestUrl);
			this.$.sendPlayService.call();
			
		} else {
		
			this.doRemotePluginCommand("play",inPlay);
		
		}
		
	},
	sendPlaySuccess: function(inSender, inResponse) {
		if(debug) this.log("sendPlaySuccess: "+inResponse);
		
		this.startLoop();
	
	},
	sendPlayFailure: function(inSender, inResponse) {
		this.error("sendPlayFailure");
		
		this.bannerMessage("ERROR: Failed to send play command to frontend: '"+WebMyth.prefsCookie.frontends[this.frontendIndex].name+"'");
		
	},
	sendChannel: function() {
		if(debug) this.log("sendChannel: "+this.channelLoopIndex);
		
		if(WebMyth.useScriptRemote) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=remote&host="+WebMyth.prefsCookie.frontends[this.frontendIndex].name;
			
			switch(this.channelLoopIndex) {
				case 0:
					requestUrl += "&type=query&cmd=location";
					break;
				case 1:
					requestUrl += "&type=jump&cmd=livetv";
					break;
				case 2:
					requestUrl += "&type=play&cmd=chanid "+this.newChannel;
					break;
			}
			
			if(debug) this.log("requestUrl: "+requestUrl);
			
			this.$.sendChannelService.setUrl(requestUrl);
			this.$.sendChannelService.call();
			
		} else {
		
			var fullCommand = "";
		
			switch(this.channelLoopIndex) {
				case 0:
					fullCommand += "query location";
					break;
				case 1:
					fullCommand += "jump livetv";
					break;
				case 2:
					fullCommand += "play chanid "+this.newChannel;
					break;
			}
			
			this.doRemotePluginCommand("sendChannel",fullCommand);
			
		}
		
	},
	sendChannelSuccess: function(inSender, inResponse) {
		if(debug) this.log("sendChannelSuccess: "+inResponse);
		
		if(this.channelLoopIndex == 0) {
			//Just did 'query location'
			if(inResponse.indexOf("LiveTV") >=0) {
				this.channelLoopIndex = 2;
			} else {
				this.channelLoopIndex = 1;
			}
			
			this.sendChannel();
			
		} else if(this.channelLoopIndex == 1) {
			//Just did 'jump livetv'
			this.channelLoopIndex = 2;
			
			this.sendChannel();
			
		} else {
		
			if(debug) this.log("finished changing channel to "+this.newChannel);
		
		}
	
	},
	sendChannelFailure: function(inSender, inResponse) {
		this.error("sendChannelFailure");
		
	},
	startLoop: function() {
		if(debug) this.log("startLoop");
		
		if(WebMyth.prefsCookie.frontends.length > 0) {
			
			clearTimeout(this.locationCountdown);
			clearTimeout(this.detailsCountdown);
			clearTimeout(this.volumeCountdown);
			
			this.statusLoop = true;
			
			this.locationCountdown = setTimeout(enyo.bind(this,"queryLocation"), 3000);
			
		} else {
		
			if(debug) this.log("No frontends found, generating frontends list from settings table.");
			
			WebMyth.prefsCookie.frontends = backendsToFrontends(WebMyth.prefsCookie.backends);
			
			if(debug) this.log("new frontends are: "+enyo.json.stringify(WebMyth.prefsCookie.frontends));
			
			WebMyth.prefsCookie.frontendIndex = 0;
			
			this.startLoop();
		
		}
			
	},	
	resetLoop: function() {
		if(debug) this.log("resetLoop");
		
		clearTimeout(this.locationCountdown);
		clearTimeout(this.detailsCountdown);
		clearTimeout(this.volumeCountdown);
		
		this.statusLoop = true;
		
		this.locationCountdown = setTimeout(enyo.bind(this,"queryLocation"), 5000);
			
	},
	stopLoop: function() {
		if(debug) this.log("stopLoop");

		this.playbackTotalTime = 3630;
	
		clearTimeout(this.locationCountdown);
		clearTimeout(this.detailsCountdown);
		clearTimeout(this.volumeCountdown);
		
		this.statusLoop = false;
		
		this.currentLocation = "Disconnected";
		
		this.$.playbackSliderItem.hide();
		this.$.playbackTitleItem.hide();
		this.$.playbackExtrasItem.hide();
		
		this.playbackType = "None";
			
		this.$.playbackRowGroup.setCaption("Location");
		
		this.$.playbackTimeText.setContent(this.currentLocation);
		this.$.playbackSpeedText.setContent("");
		
		if(!WebMyth.useScriptRemote) this.doRemotePluginClose();
		
		this.$.playbackRowGroup.render();
		
	},
	queryLocation: function() {
		if(debug) this.log("queryLocation");
		
		clearTimeout(this.locationCountdown);
		clearTimeout(this.detailsCountdown);
		clearTimeout(this.volumeCountdown);
		
		if(this.statusLoop) {
		
			if(WebMyth.useScriptRemote) {
			
				var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
				requestUrl += "?op=remote&type=query";
				requestUrl += "&host="+WebMyth.prefsCookie.frontends[this.frontendIndex].name;
				requestUrl += "&cmd=location";
				
				if(debug) this.log("requestUrl: "+requestUrl);
				
				this.$.queryLocationService.setUrl(requestUrl);
				this.$.queryLocationService.call();
				
			} else {
		
				this.doRemotePluginCommand("queryLocation","location");
		
			}
		}
		
	},
	queryLocationSuccess: function(inSender, inResponse) {
		if(debug) this.log("queryLocationSuccess: "+inResponse);
		
		this.statusLoop = true;
		
		this.currentLocation = inResponse;
		
		this.$.playbackSliderItem.hide();
		this.$.playbackTitleItem.hide();
		this.$.playbackExtrasItem.hide();
		
		if(this.currentLocation.substring(0,8) == "Playback") {
		
			var currentLocationArray = this.currentLocation.split(" ");
			
			this.playbackType = currentLocationArray[1];
			this.playbackCurrentTime = timeToSeconds(currentLocationArray[2]);
			
			this.$.playbackRowGroup.setCaption("Playback: "+this.playbackType);
			
			this.$.playbackSliderItem.show();
			this.$.playbackTitleItem.show();
			
			switch(this.playbackType) {
				case "Video":
					this.speed = currentLocationArray[3];
					this.filename = currentLocationArray[4];
					this.currentSize = currentLocationArray[5];
					this.framerate = currentLocationArray[6];
					
					this.$.playbackSlider.setPosition(parseInt(100*(this.playbackCurrentTime / this.playbackTotalTime)));
					
					if(this.speed != "1x") {
						this.$.playbackSpeedText.setContent(this.speed);
					} else {
						this.$.playbackSpeedText.setContent("");
					}
		
					this.$.playbackTimeText.setContent(secondsToTime(this.playbackCurrentTime)+" of "+secondsToTime(this.playbackTotalTime));
					
					//this.queryDetails();
					this.$.playbackTitleText.setContent(this.filename);
					
					if(this.playbackTotalTime == 3630) {
										
						var query = "SELECT videometadata.intid, videometadata.title, videometadata.filename, videometadata.length ";
						query += " FROM videometadata ";
						query += ' WHERE `filename` LIKE "%'+this.filename.substring(35,500)+'%" LIMIT 1 ';
						//		"myth://Videos@192.168.100.105/..."
					   
						if(debug) this.log("video details query is :"+query);
						
						
						if(WebMyth.useScript) {
						
							var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
							requestUrl += "?op=executeSQLwithResponse";				
							requestUrl += "&query64=";		
							requestUrl += Base64.encode(query);
							
							if(debug) this.log("requestUrl: "+requestUrl);
						
							this.$.videoDetailsService.setUrl(requestUrl);
							this.$.videoDetailsService.call();
						
						} else {
			
							this.doMysqlPluginCommand("mysqlRemoteGetVideoDetails", query);
			
						}
		
					} else {
					
						this.volumeCountdown = setTimeout(enyo.bind(this,"queryVolume"), 500);
						
					}
					
					break;
				case "Recorded":
					//of = currentLocationArray[3];
					this.playbackTotalTime = timeToSeconds(currentLocationArray[4]);
					this.speed = currentLocationArray[5];
					this.chanid = currentLocationArray[6];
					this.recstartts = currentLocationArray[7];
					this.currentSize = currentLocationArray[8];
					this.filename = currentLocationArray[9];
					this.framerate = currentLocationArray[10];
					
					this.$.playbackSlider.setPosition(parseInt(100*(this.playbackCurrentTime / this.playbackTotalTime)));
					
					if(this.speed != "1x") {
						this.$.playbackSpeedText.setContent(this.speed);
					} else {
						this.$.playbackSpeedText.setContent("");
					}
		
					this.$.playbackTimeText.setContent(secondsToTime(this.playbackCurrentTime)+" of "+secondsToTime(this.playbackTotalTime));
					
					//this.queryDetails("recording "+this.chanid+" "+this.recstartts);
					this.detailsCountdown = setTimeout(enyo.bind(this,"queryDetails","recording "+this.chanid+" "+this.recstartts), 500);
					
					break;
				case "LiveTV":
					//of = currentLocationArray[3];
					this.playbackTotalTime = timeToSeconds(currentLocationArray[4]);
					this.speed = currentLocationArray[5];
					this.chanid = currentLocationArray[6];
					this.starttime = currentLocationArray[7];
					this.currentSize = currentLocationArray[8];
					this.filename = currentLocationArray[9];
					this.framerate = currentLocationArray[10];
					
					this.$.playbackSlider.setPosition(parseInt(100*(this.playbackCurrentTime / this.playbackTotalTime)));
					
					if(this.speed != "1x") {
						this.$.playbackSpeedText.setContent(this.speed);
					} else {
						this.$.playbackSpeedText.setContent("");
					}
		
					this.$.playbackTimeText.setContent(secondsToTime(this.playbackCurrentTime)+" of "+secondsToTime(this.playbackTotalTime));
					
					this.$.playbackExtrasItem.show();
			
					//this.queryDetails("livetv "+this.chanid);
					this.detailsCountdown = setTimeout(enyo.bind(this,"queryDetails","livetv "+this.chanid), 500);
					
					break;
			}
			
			//location responses
			//mythvideo playback:  Playback Video 0:00:03 1x myth://Videos@192.168.1.105:6543/movies/full_length/300.avi 73 23.976
			//                     "        "     H:MM:SS speed myth://Vidoes@host:port/[filename] MBread framerate
			//
			//recorded playback:   Playback Recorded 0:07:00 of 2:07:46 1x 3688 2010-10-06T12:56:00 25214 /mythtv/3688_20101006125600.mpg 59.9401
			//                     ""       ""       H:MM:SS of H:MM:SS speed chanid restartts MBread filename framerate
			//
			//livetv playback:     Playback LiveTV 0:04 of 0:08 1x 1041 2011-05-04T21:00:00 145 /htpc/mythtv/1041_20110504213559.mpg 25
			//                     ""       ""     M:SS of M:SS speed chanid starttime MBread filename framerate
	
		} else {
		
			this.playbackType = "None";
			this.playbackTotalTime = 3530;
			
			this.$.playbackRowGroup.setCaption("Location");
		
			this.$.playbackTimeText.setContent(this.currentLocation);
			this.$.playbackSpeedText.setContent("");
			
			this.volumeCountdown = setTimeout(enyo.bind(this,"queryVolume"), 500);
			
		}
		
		this.$.playbackRowGroup.render();
		
	
	},
	queryLocationFailure: function(inSender, inResponse) {
		this.error("queryLocationFailure");
		
		//this.statusLoop = false;
		this.stopLoop();
		
	},
	queryDetails: function(inCommand) {
		if(debug) this.log("queryDetails: "+inCommand);
		
		clearTimeout(this.locationCountdown);
		clearTimeout(this.detailsCountdown);
		clearTimeout(this.volumeCountdown);
		
		var cmdvalue = encodeURIComponent(inCommand);
		
		if(this.statusLoop) {
		
			if(WebMyth.useScriptRemote) {
			
				var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
				requestUrl += "?op=remote&type=query";
				requestUrl += "&host="+WebMyth.prefsCookie.frontends[this.frontendIndex].name;
				requestUrl += "&cmd="+inCommand;
				
				if(debug) this.log("requestUrl: "+requestUrl);
				
				this.$.queryDetailsService.setUrl(requestUrl);
				this.$.queryDetailsService.call();
				
			} else {
		
				this.doRemotePluginCommand("queryDetails",inCommand);
		
			}
		
		}
		
	},
	queryDetailsSuccess: function(inSender, inResponse) {
		if(debug) this.log("queryDetailsSuccess: "+inResponse);
		
		switch(this.playbackType) {
			case "Recorded":
				this.playbackTitle = inResponse.substring(25,1000);
				this.playbackExtras = inResponse.substring(0,4)
				break;
			case "LiveTV":
				this.playbackTitle = inResponse.substring(44,1000);
				this.playbackExtras = inResponse.substring(0,43).replace("T"," ").replace("T"," ");
				break;
				
				
			//query recording CHANID STARTTIME
			//	chanid starttime title ="subtitle"
			//query livetv chanid
			//	chanid starttime endtime title -"subtitle"
	
		}
		
		this.$.playbackTitleText.setContent(this.playbackTitle);
		this.$.playbackExtrasText.setContent(this.playbackExtras);
		
		if(debug) this.log("playbackTitle: "+this.playbackTitle);
		
		this.volumeCountdown = setTimeout(enyo.bind(this,"queryVolume"), 500);
	
	},
	queryDetailsFailure: function(inSender, inResponse) {
		this.error("queryDetailsFailure");
		
		//this.statusLoop = false;
		this.stopLoop();
		
	},
	videoDetailsSuccess: function(inSender, inResponse) {
		if(debug) this.log("videoDetailsSuccess: "+enyo.json.stringify(inResponse));
		
		this.playbackTotalTime = parseInt(parseInt(inResponse[0].length) * 60);
		
		this.volumeCountdown = setTimeout(enyo.bind(this,"queryVolume"), 500);

	},
	videoDetailsFailure: function(inSender, inResponse) {
		this.error("videoDetailsFailure");
		
		this.playbackTotalTime = 3530;
		
		this.volumeCountdown = setTimeout(enyo.bind(this,"queryVolume"), 500);
		
	},
	queryVolume: function() {
		if(debug) this.log("queryVolume");
		
		clearTimeout(this.locationCountdown);
		clearTimeout(this.detailsCountdown);
		clearTimeout(this.volumeCountdown);
		
		if(this.statusLoop) {
		
			if(WebMyth.useScriptRemote) {
			
				var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
				requestUrl += "?op=remote&type=query";
				requestUrl += "&host="+WebMyth.prefsCookie.frontends[this.frontendIndex].name;
				requestUrl += "&cmd=volume";
				
				if(debug) this.log("requestUrl: "+requestUrl);
				
				this.$.queryVolumeService.setUrl(requestUrl);
				this.$.queryVolumeService.call();
				
			} else {
		
				this.doRemotePluginCommand("queryVolume","volume");
		
			}
		
		}
		
	},
	queryVolumeSuccess: function(inSender, inResponse) {
		if(debug) this.log("queryVolumeSuccess: "+inResponse);
		
		this.currentVolume = inResponse.replace("%","");
		
		//this.$.volumeDisplay.setContent(this.currentVolume+"%");
		this.$.volumeRowGroup.setCaption("Volume: "+this.currentVolume+"%");
		this.$.volumeSlider.setPosition(this.currentVolume);
		
		this.statusLoop = true;
		
		this.resetLoop();
	
	},
	queryVolumeFailure: function(inSender, inResponse) {
		this.error("queryVolumeFailure");
		
		//this.statusLoop = false;
		this.stopLoop();
		
	},
	testQuerySuccess: function(inSender, inResponse) {
		if(debug) this.log("testQuerySuccess: "+inResponse);
		
		this.$.frontendStatus.setContent(inResponse);
	
	},
	testQueryFailure: function(inSender, inResponse) {
		this.error("testQueryFailure");
		
		this.frontendIndex = WebMyth.prefsCookie.frontendIndex;
		
		this.bannerMessage("ERROR: Failed to get current status of frontend: '"+WebMyth.prefsCookie.frontends[this.frontendIndex].name+"'");
		
	},
	getHostsSuccess: function(inSender, inResponse) {
		if(debug) this.log("getHostsResponse");
		
		this.searchHosts.length = 0;
		
		var xmlobject = inResponse;
		
		var hostNodes = xmlobject.getElementsByTagName("Host");
		var name = "", port = "", address = "";
		var s = {}, t = {};
		
		for(var i = 0; i < hostNodes.length; i++) {
			if(debug) this.log("Parsing hostNode "+i+" - "+hostNodes[i].childNodes[0].nodeValue);
			
			t = {};
			
			t.name = hostNodes[i].childNodes[0].nodeValue;
			t.port = 6546;
			t.address = WebMyth.prefsCookie.masterBackendIp
			
			for(var j = 0; j < WebMyth.prefsCookie.backends.length; j++) {
				s = WebMyth.prefsCookie.backends[j];
				
				if(t.name == s.hostname) {
					if(s.NetworkControlPort) t.port = s.NetworkControlPort
					if(s.ip) t.address = s.ip;
				}
				
			}
			
			this.searchHosts.push(t);
		}
		
		if(debug) this.log("full searchHosts is "+enyo.json.stringify(this.searchHosts));
		
		//this.$.searchHostsVirtualRepeater.render();
		this.$.searchHostsPopup.openAtCenter();
		
	},
	getHostsFailure: function(inSender, inResponse) {
		if(debug) this.log("getHostsFailure");
		
		this.bannerMessage("Failed to get list of hosts");
		
	},
	getSearchHostsItem: function(inSender, inIndex) { 
		if(debug) this.log("getSearchHostsItem: "+inIndex);
		
		var row = this.searchHosts[inIndex];
		
		if(row) {
		
			this.$.searchHostsName.setContent(row.name);
			this.$.searchHostsAddressAndPort.setContent(row.address+":"+row.port);
			
			return true;
		}
	},
	searchHostsSelect: function(inSender, inEvent) {
		if(debug) this.log("searchHostsSelect: "+inEvent.rowIndex);
		
		var row = this.searchHosts[inEvent.rowIndex];
		
		this.frontendIndex = WebMyth.prefsCookie.frontends.length;
		WebMyth.prefsCookie.frontends.push(row);
		WebMyth.prefsCookie.frontendIndex = this.frontendIndex;
		
		this.$.frontendNameInput.setValue(WebMyth.prefsCookie.frontends[this.frontendIndex].name);
		this.$.frontendPortInput.setValue(WebMyth.prefsCookie.frontends[this.frontendIndex].port);
		this.$.frontendAddressInput.setValue(WebMyth.prefsCookie.frontends[this.frontendIndex].address);
		
		this.doSavePreferences();
		
		this.$.frontendsVirtualRepeater.render();
		
		this.$.searchHostsPopup.close();
		
		this.clearTest();
		
		if(this.viewMode == "phone") this.gotoSettingsMiddle();
	},
	
	
});



