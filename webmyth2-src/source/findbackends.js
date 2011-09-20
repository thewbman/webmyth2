/* adsf*/


enyo.kind({ name: "findbackends",
	kind: "VFlexBox",
	className: "findbackends enyo-view",
	published: {
		phonePixels: 500,
		viewMode: "tablet",
	},
	
	foundHosts: [],
	confirmedHosts: [],
	//confirmedHosts: [{address: "192.168.1.105"}],
	
	hostsIndex: 0,
	
	events: {
		onBannerMessage: "", 
		onSelectMode: "",
		onHaveImageView: "",
		onSavePreferences: "",
		onMysqlPluginCommand: "",
	},
	
	components: [
	
		{name: "findBackendsService", kind: "PalmService", service: "palm://com.palm.zeroconf/", method: "browse", subscribe: true, onSuccess: "findBackendsSuccess", onFailure: "findBackendsFailure"},
		{name: "resolveBackendService", kind: "PalmService", service: "palm://com.palm.zeroconf/", method: "resolve", subscribe: true, onSuccess: "resolveBackendSuccess", onFailure: "resolveBackendFailure"},
		
		{name: "testBackendService", kind: "WebService", handleAs: "xml", onSuccess: "testBackendResponse", onFailure: "testBackendFailure"},
			
			{name: "searchingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
				{kind: "HFlexBox", components: [
					{kind: "Spacer"},
					{name: "searchingSpinnerLarge", kind: "SpinnerLarge"},
					{kind: "Spacer"},
				]},
				{content: $L("Searching")+"...", style: "text-align: center;"},
			]},
			
			{name: "selectedBackendPopup", kind: "Popup", scrim: true, onBeforeOpen: "beforeMessageOpen", components: [
				{content: "Set the master backend address?", style: "text-align: center;"},
				{name: "selectedBackendText", style: "text-align: center;"},
				{kind: "Button", caption: "OK", className: "enyo-button-affirmative", onclick:"confirmMessagePopup"},
				{kind: "Button", caption: "Cancel", className: "enyo-button-negative", onclick:"closeMessagePopup"}
			]},
				
			{name: "header", kind: "Toolbar", layoutKind: "VFlexLayout", components: [
				{name: "middleHeaderTitle", kind: "Control", className: "headerTitle", content: "Find Backends"},
				{name: "middleHeaderSubtitle", kind: "Control", className: "headerSubtitle", content: ""},
			]},
			
			//{kind: "HFlexBox", flex: 1, align: "center", pack: "center", components: [
				{name: "findbackendsScroller", kind: "Scroller", flex: 1, style2: "max-width: 400px", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
					{name: "backendsVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getBackendItem", onclick: "backendSelect", components: [
						{name: "backendItem", kind: "Item", className: "backend", layoutKind: "HFlexLayout", components: [
							{name: "backendName"},
						]},
					]},
					{content: "&nbsp;"},
				]},
			//]},
			
			{name: "leftFooter", kind: "Toolbar", components: [
				{name: "leftBackCommandIcon", kind: "Control", className: "backCommandIcon", onclick: "gotBack"},
				{kind: "Spacer"},
				{icon: 'images/menu-icon-refresh.png', onclick: "getBackends"},
				{kind: "Spacer"},
				{name: "leftBackCommandIconSpacer", kind: "Control", className: "backCommandIconSpacer"},
			]},
		
	],
	
	create: function() {
		if(debug) this.log("create");
		this.inherited(arguments);
		
		this.render();
		
		//this.activate2("tablet");
	},
	
	//Externally called functions
	activate: function(inViewMode) {
		if(debug) this.log("activate");
		//this.render();
		
		this.viewMode = inViewMode;
		
		var appInfo = enyo.fetchAppInfo();
		this.$.middleHeaderSubtitle.setContent(appInfo.title+" - "+appInfo.version);
		
		this.getBackends();
		
		this.resize();
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
	},
	resize: function(inViewMode) {
		if(debug) this.log("resize");
		this.viewMode = inViewMode;
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
		
	},
	
	//Internal functions
	backendSelect: function(inSender, inEvent) {
		if(debug) this.log("backendSelect index "+enyo.json.stringify(this.confirmedHosts[inEvent.rowIndex]));
		
		var row = this.confirmedHosts[inEvent.rowIndex];
		
		this.selectedAddress = row.address;
		
		this.$.selectedBackendPopup.openAtCenter();
		
	},	
	confirmMessagePopup: function() {
		if(debug) this.log("confirmMessagePopup");
		
		WebMyth.prefsCookie.webserverName = this.selectedAddress;
		WebMyth.prefsCookie.masterBackendIp = this.selectedAddress;
		
		this.doSavePreferences();
		
		this.gotBack();
	},
	beforeMessageOpen: function() {
		if(debug) this.log("beforeMessageOpen");
		
		this.$.selectedBackendText.setContent(this.selectedAddress);
	},
	closeMessagePopup: function() {
		if(debug) this.log("closeMessagePopup");
		
		this.gotBack();
	},
	
	//findbackends functions
	getBackends: function() {
		if(debug) this.log("getBackends");
		
		this.$.searchingPopup.openAtCenter();
		this.$.searchingSpinnerLarge.show();
		
		this.initialBackendsSuccess = false;
		
		var myParameters = {regType: "_workstation._tcp", subscribe: true};
		
		this.$.findBackendsService.call({regType: "_workstation._tcp", subscribe: true, params: {regType: "_workstation._tcp", subscribe: true}});
	
	},
	findBackendsSuccess: function(inSender, inResponse) {
		if(debug) this.log("findBackendsSuccess: "+enyo.json.stringify(inResponse));
		
		if(this.initialBackendsSuccess == false) {
		
			this.initialBackendsSuccess = true;
			
		} else {
		
			this.foundHosts.push(inResponse);
			
			var newLength = this.foundHosts.length;
			
			this.resolveHost(newLength-1);
			
		}
	},
	findBackendsFailure: function(inSender, inResponse) {
		if(debug) this.log("findBackendsFailure");
		
		this.$.searchingPopup.close();
		
		this.bannerMessage("Failed to start searching for backends");
		
	},
	resolveHost: function(inValue){
		if(debug) this.log("resolveHost: "+inValue+": "+enyo.json.stringify(this.foundHosts[inValue]));
		
		var info = this.foundHosts[inValue];
		
		//var myParameters = {regType: info.regType, domainName: info.domainName, instanceName: info.instanceName, subscribe: true};
			
		this.$.resolveBackendService.call({regType: info.regType, instanceName: info.instanceName, domainName: info.domainName, subscribe: true, params: {regType: info.regType, instanceName: info.instanceName, domainName: info.domainName, subscribe: true}});
		
		/*
		var r = new enyo.PalmService();
		r.service = "palm://com.palm.zeroconf/";
		r.method = "resolve";
		r.onSuccess = "resolveBackendSuccess";
		r.onFailure = "resolveBackendFailure";
		r.call({regType: info.regType, domainName: info.domainName, instanceName: info.instanceName, subscribe: true, params: {regType: info.regType, domainName: info.domainName, instanceName: info.instanceName, subscribe: true}});
		*/
	},
	resolveBackendSuccess: function(inSender, inResponse) {
		if(debug) this.log("resolveBackendSuccess: "+enyo.json.stringify(inResponse));
		
		if(inResponse.IPv4Address) {
		
			this.foundHosts[this.hostsIndex].IPv4Address = inResponse.IPv4Address;
			this.foundHosts[this.hostsIndex].fullName = inResponse.fullName;
			
			this.hostsIndex++;
			
			this.testHost(inResponse.IPv4Address);
		
		}
		
	},
	resolveBackendFailure: function(inSender, inResponse) {
		if(debug) this.log("resolveBackendFailure");
		
		this.bannerMessage("Failed to start searching for backends");
		
	},
	testHost: function(inAddress) {
		if(debug) this.log("testHost: "+inAddress);
		
		if(inAddress) {
		
			var requestUrl = "http://"+inAddress+":6544/Myth/GetSetting?Key=MasterServerIP";
		
			if(debug) this.log("requestUrl: "+requestUrl);
			
			this.$.testBackendService.setUrl(requestUrl);
			this.$.testBackendService.call();
			
		}
		
	},
	testBackendResponse: function(inSender, inResponse) {
		if(debug) this.log("testBackendResponse");
		
		this.$.searchingPopup.close();
		
		var serverIP = "none";
		
		try {
			var valueNode = inResponse.getElementsByTagName("Value")[0];
			serverIP = valueNode.childNodes[0].nodeValue;
		} catch(e) {
			//failed in pre-0.25 methods
		}
		
		try {
			var stringNode = inResponse.getElementsByTagName("String")[0];
			serverIP = stringNode.childNodes[0].nodeValue;
		} catch(e) {
			//failed for 0.25 methods
		}
		
		if(debug) this.log("Get MasterServerIP value of "+serverIP);
		
		if(serverIP != "none") {
			this.confirmedHosts.push({address: serverIP});
		}
		
		this.$.backendsVirtualRepeater.render();
	
	},
	testBackendFailure: function() {	
		if(debug) this.log("testBackendFailure");
	
	},
	getBackendItem: function(inSender, inIndex) {
		var row = this.confirmedHosts[inIndex];
		
		if(row) {
		
			this.$.backendName.setContent(row.address);
			
			return true;
		}
		
	},
	
});