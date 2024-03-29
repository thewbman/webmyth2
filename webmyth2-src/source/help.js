/* adsf*/


enyo.kind({ name: "help",
	kind: "VFlexBox",
	className: "help enyo-view",
	published: {
		viewMode: "tablet"
	},
	events: {
		onBannerMessage: "",
		onOpenWeb: "",
		onGetPreviousPane: "",
	},
	
	components: [
		{name: "getFaqsService", kind: "WebService", handleAs: "txt", onSuccess: "getFaqsResponse", onFailure: "getFaqsFailure"},
		{name: "getTipsService", kind: "WebService", handleAs: "txt", onSuccess: "getTipsResponse", onFailure: "getTipsFailure"},
		{name: "getChangelogService", kind: "WebService", handleAs: "txt", onSuccess: "getChangelogResponse", onFailure: "getChangelogFailure"},
		{name: "getSupportService", kind: "WebService", handleAs: "txt", onSuccess: "getSupportResponse", onFailure: "getSupportFailure"},

		{name: "loadingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
			{kind: "HFlexBox", components: [
				{kind: "Spacer"},
				{kind: "SpinnerLarge"},
				{kind: "Spacer"},
			]},
			{content: "Loading...", style: "text-align: center;"},
		]},
			
		{name: "header", kind: "Toolbar", layoutKind: "VFlexLayout", onclick: "revealTop", components: [
			{name: "leftHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Help")},
			{name: "leftHeaderSubtitle", kind: "Control", className: "headerSubtitle", content: ""},
		]},
		
		{kind: "HFlexBox", flex: 1, components: [
			{name: "helpMenu", kind: "VFlexBox", className: "helpMenu", components: [
				{name: "allMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem selected", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("All")},
				]},
				{name: "faqsMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("FAQs")},
				]},
				{name: "tipsMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Tips")},
				]},
				{name: "changelogMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Changelog")},
				]},
				{name: "supportMenu", kind: "HFlexBox", align: "center", pack: "center", className: "menuItem", flex: 1, onclick: "selectMenuButton", components: [
					{content: $L("Support")},
				]},
			]},
		
			{name: "helpScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
		
				{name: "faqsDrawer", kind: "DividerDrawer", caption: "FAQs", open: false, animate: false, components: [
					
					{name: "faqsContent", allowHtml: true, className: "smallerFont helpContent"},
					
				]},
				
				{name: "tipsDrawer", kind: "DividerDrawer", caption: "Tips", open: false, animate: false, components: [
					
					{name: "tipsContent", allowHtml: true, className: "smallerFont helpContent"},
					
				]},
				
				{name: "changelogDrawer", kind: "DividerDrawer", caption: "Changelog", open: false, animate: false, components: [
					
					{name: "changelogContent", allowHtml: true, className: "smallerFont helpContent"},
					
				]},
				
				{name: "supportDrawer", kind: "DividerDrawer", caption: "Support", open: false, animate: false, components: [
					
					{name: "supportContent", allowHtml: true, className: "smallerFont helpContent"},
					
				]},
				
				{name: "errorMessage", content: "&nbsp;"},
			]},
		
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
		
		this.render();
		
		//this.activate("tablet");
	},
	
	//Externally called functions
	activate: function(inViewMode) {
		if(debug) this.log("activate");
		//this.render();
		
		this.resize(inViewMode);
		
		this.viewMode = inViewMode;
		
		this.$.allMenu.addClass("selected");
		this.$.faqsMenu.removeClass("selected");
		this.$.tipsMenu.removeClass("selected");
		this.$.changelogMenu.removeClass("selected");
		this.$.supportMenu.removeClass("selected");
		
		this.$.faqsDrawer.close();
		this.$.tipsDrawer.close();
		this.$.changelogDrawer.close();
		this.$.supportDrawer.close();
			
		this.$.faqsDrawer.toggleOpen();
		this.$.tipsDrawer.toggleOpen();
		this.$.changelogDrawer.toggleOpen();
		this.$.supportDrawer.toggleOpen();
		
		this.$.faqsDrawer.show();
		this.$.tipsDrawer.show();
		this.$.changelogDrawer.show();
		this.$.supportDrawer.show();
		
		this.$.faqsDrawer.render();
		this.$.tipsDrawer.render();
		this.$.changelogDrawer.render();
		this.$.supportDrawer.render();
		
		var appInfo = enyo.fetchAppInfo();
		this.$.leftHeaderSubtitle.setContent(appInfo.title+" - "+appInfo.version);
		
		this.revealTop();
		
		setTimeout(enyo.bind(this,"getFaqs"),100);
		setTimeout(enyo.bind(this,"getTips"),100);
		setTimeout(enyo.bind(this,"getChangelog"),100);
		setTimeout(enyo.bind(this,"getSupport"),100);
		
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
	},
	resize: function(inViewMode) {
		if(debug) this.log("resize: "+inViewMode);
		
		this.viewMode = inViewMode;
		
		if(this.viewMode == "tablet") {
			this.$.helpMenu.render();
			this.$.helpMenu.show();
		} else {
			this.$.helpMenu.hide();
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
	revealTop: function() {
		if(debug) this.log("revealTop");
		
		this.$.helpScroller.scrollIntoView(0,0);
		
	},
	
	//Help
	selectMenuButton: function(inSender) {
		if(debug) this.log("selectMenuButton with "+inSender.getName());
		
		var newMode = inSender.getName().substring(0,inSender.getName().length-4);
		
		this.$.faqsDrawer.close();
		this.$.tipsDrawer.close();
		this.$.changelogDrawer.close();
		this.$.supportDrawer.close();
		
		this.$.allMenu.removeClass("selected");
		this.$.faqsMenu.removeClass("selected");
		this.$.tipsMenu.removeClass("selected");
		this.$.changelogMenu.removeClass("selected");
		this.$.supportMenu.removeClass("selected");
		
		if(newMode == "all") {
		
			this.$.allMenu.addClass("selected");
			
			this.$.faqsDrawer.toggleOpen();
			this.$.tipsDrawer.toggleOpen();
			this.$.changelogDrawer.toggleOpen();
			this.$.supportDrawer.toggleOpen();
			
			this.$.faqsDrawer.show();
			this.$.tipsDrawer.show();
			this.$.changelogDrawer.show();
			this.$.supportDrawer.show();
			
			this.$.faqsDrawer.render();
			this.$.tipsDrawer.render();
			this.$.changelogDrawer.render();
			this.$.supportDrawer.render();
			
		} else {
		
			this.$.faqsDrawer.hide();
			this.$.tipsDrawer.hide();
			this.$.changelogDrawer.hide();
			this.$.supportDrawer.hide();
			
			switch(newMode) {
				case "faqs":
					this.$.faqsMenu.addClass("selected");
					
					this.$.faqsDrawer.toggleOpen();
					this.$.faqsDrawer.show();
					this.$.faqsDrawer.render();
					break;
				case "tips":
					this.$.tipsMenu.addClass("selected");
					
					this.$.tipsDrawer.toggleOpen();
					this.$.tipsDrawer.show();
					this.$.tipsDrawer.render();
					break;
				case "changelog":
					this.$.changelogMenu.addClass("selected");
					
					this.$.changelogDrawer.toggleOpen();
					this.$.changelogDrawer.show();
					this.$.changelogDrawer.render();
					break;
				case "support":
					this.$.supportMenu.addClass("selected");
					
					this.$.supportDrawer.toggleOpen();
					this.$.supportDrawer.show();
					this.$.supportDrawer.render();
					break;
			}	
		} 
		
		this.revealTop();
		
		if(debug) this.log("finished changing to "+newMode);
	},
	getFaqs: function() {
	
		this.$.getFaqsService.setUrl("./faqs.html");
		this.$.getFaqsService.call();
	
	},
	getFaqsResponse: function(inSender, inResponse) {
		//if(debug) this.log("getFaqsResponse: "+inResponse);
		if(debug) this.log("getFaqsResponse");
		
		this.$.faqsContent.setContent(inResponse);
		
	},
	getFaqsFailure: function(inSender, inResponse) {
		this.error("getFaqsFailure");
		
		this.$.faqsContent.setContent("Error getting FAQS");
		
	},
	getTips: function() {
	
		this.$.getTipsService.setUrl("./tips.html");
		this.$.getTipsService.call();
	
	},
	getTipsResponse: function(inSender, inResponse) {
		//if(debug) this.log("getTipsResponse: "+inResponse);
		if(debug) this.log("getTipsResponse");
		
		this.$.tipsContent.setContent(inResponse);
		
	},
	getTipsFailure: function(inSender, inResponse) {
		this.error("getTipsFailure");
		
		this.$.tipsContent.setContent("Error getting tips");
		
	},
	getChangelog: function() {
	
		this.$.getChangelogService.setUrl("./changelog.html");
		this.$.getChangelogService.call();
	
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
	getSupport: function() {
	
		this.$.getSupportService.setUrl("./support.html");
		this.$.getSupportService.call();
	
	},
	getSupportResponse: function(inSender, inResponse) {
		//if(debug) this.log("getSupportResponse: "+inResponse);
		if(debug) this.log("getSupportResponse");
		
		this.$.supportContent.setContent(inResponse);
		
	},
	getSupportFailure: function(inSender, inResponse) {
		this.error("getSupportFailure");
		
		this.$.supportContent.setContent("Error getting support");
		
	},
	
	
});