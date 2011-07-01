/* adsf*/


enyo.kind({ name: "changelog",
	kind: "VFlexBox",
	className: "changelog enyo-view",
	published: {
		phonePixels: 500,
		viewMode: "tablet",
	},
	events: {
		onBannerMessage: "",
		onSelectMode: ""
	},
	
	components: [
		{name: "getChangelogService", kind: "WebService", handleAs: "txt", onSuccess: "getChangelogResponse", onFailure: "getChangelogFailure"},

			{name: "loadingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
				{kind: "SpinnerLarge"},
				{content: "Loading...", style: "text-align: center;"},
			]},
			{name: "messagePopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, onclick: "messagePopupClick", components: [
				{name: "messagePopupText", style: "text-align: center;"},
				{content: "(Click anywhere to close this message)", style: "text-align: center;"},
			]},
			
			
		{name: "header", kind: "Toolbar", layoutKind: "VFlexLayout", onclick: "revealTop", components: [
			{name: "leftHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Changelog")},
			{name: "leftHeaderSubtitle", kind: "Control", className: "headerSubtitle", content: ""},
		]},
		
		{name: "changelogScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
			//{kind: "HtmlContent", srcId: "../changelog.html", flex: 1, width: "100%", height: "100%"},
			{name: "changelogContent", allowHtml: true, className: "smallerFont"},
			{content: "&nbsp;"},
		]},
		
		{name: "footer", kind: "Toolbar", components: [
			{name: "leftBackCommandIcon", kind: "Control", className: "backCommandIcon", onclick: "gotBack"},
			{kind: "Spacer"},
			{name: "leftBackCommandIconSpacer", kind: "Control", className: "backCommandIconSpacer"},
		]},
	],
	
	
	create: function() {
		if(debug) this.log("create");
		this.inherited(arguments);
		
		//this.render();
		
		//this.activate();
	},
	
	//Externally called functions
	activate: function() {
		if(debug) this.log("activate");
		this.render();
		
		var appInfo = enyo.fetchAppInfo();
		
		this.$.leftHeaderSubtitle.setContent(appInfo.title+" - "+appInfo.version);
		
		this.$.getChangelogService.setUrl("./changelog.html");
		this.$.getChangelogService.call();
		
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
		
		//this.destroy();
	},
	resize: function(inViewMode) {
		if(debug) this.log("resize");
		this.render();
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
		
		//this.$.messagePopupText.setContent(message);
		//this.$.messagePopup.openAtCenter();
		
	},
	messagePopupClick: function() {
		if(debug) this.log("messagePopupClick");
		
		this.$.messagePopup.close();
		
	},
	
	//internal functions
	revealTop: function() {
		if(debug) this.log("revealTop");
		
		this.$.changelogScroller.scrollIntoView(0,0);
		
	},
	getChangelogResponse: function(inSender, inResponse) {
		//if(debug) this.log("getChangelogResponse: "+inResponse);
		if(debug) this.log("getChangelogResponse");
		
		this.$.changelogContent.setContent(inResponse);
		
	},
	getChangelogFailure: function(inSender, inResponse) {
		this.error("getChangelogFailure");
		
		this.$.changelogContent.setContent("Error getting changelog");
		
	},
	
	
});