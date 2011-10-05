/*
 *   WebMyth2 - A webOS app for controlling a MythTV frontend on tablets. 
 *   http://code.google.com/p/webmyth2/
 *   Copyright (C) 2011  Wes Brown
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License along
 *   with this program; if not, write to the Free Software Foundation, Inc.,
 *   51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

WebMyth = {};

var debug = true;

WebMyth.prefsCookieString = enyo.getCookie("webmyth2-prefs");
WebMyth.prefsCookie;

WebMyth.useScript = true;
WebMyth.useScriptRemote = true;

enyo.kind({
	name: "webmyth2",
	//kind: "HFlexBox",
	kind: "VFlexBox",
	className: "webmyth2",
	published: {
		appMode: "standard"
	},
	
	phonePixels: 500,					//slidingGroup switch from phone mode to tablet
	currentPane: "welcome",
	previousPane: "welcome",
	viewMode: "tablet",
	pluginIsReady: false,
		
	components: [
		{kind: "ApplicationEvents", onLoad: "appLoaded", onUnload: "appUnloaded", onError: "appError", onWindowActivated: "windowActivated", onWindowDeactivated: "windowDeactivated", onKeyup: "keypressHandler", onKeydown: "keypressHandler", onKeypress: "keypressHandler", onBack: "backHandler", onWindowParamsChange: "windowParamsChangeHandler"},
		
		{name: "plugin", kind: "enyo.Hybrid", executable: "webmyth_service", onPluginReady: "pluginReady", onPluginConnected: "pluginConnected", onPluginDisconnected: "pluginDisconnected"},
		
		{name: "openWebService", kind: "PalmService", service: "palm://com.palm.applicationManager/", method: "open", onSuccess: "openWebResponse", onFailure: "openWebFailure"},
		{name: "downloadFileService", kind: "PalmService", service: "palm://com.palm.downloadmanager/", method: "download", subscribe: true, onSuccess: "downloadFileResponse", onFailure: "downloadFileFailure"},
		{name: "openProgramService", kind: "PalmService", service: "palm://com.palm.applicationManager/", method: "launch", onSuccess: "openProgramResponse", onFailure: "openProgramFailure"},
		
		{kind: "AppMenu", components: [
			{kind: "EditMenu"},
			{caption: "Preferences", onclick: "openPreferences"},
			{caption: "Help", components: [
				{caption: "Help", onclick: "openHelp"},
				{caption: "App Homepage", onclick: "openHomepage"},
				{caption: "Leave review", onclick: "openCatalog"},
				{caption: "Email Developer", onclick: "emailDeveloper"},
			]},
		]},
		
		{name: "firstUsePopup", kind: "Popup", scrim: true, onBeforeOpen: "beforefirstUseOpen", components: [
			{content: "This app requires an existing MythTV system to connect to.", style: "text-align: center;"},
			{content: "If you aren't sure what that means this app is probably not for you.", style: "text-align: center;"},
			{kind: "Button", caption: "Backend Search", onclick:"openFindbackends"},
			{kind: "Button", caption: "Manual Backend Setup", onclick:"openManualPopup"},
			{kind: "Button", caption: "Preferences", onclick:"openPreferences"},
			{kind: "Button", caption: "Help", onclick:"openHelp"},
		]},
		{name: "manualBackendPopup", kind: "Popup", onBeforeOpen: "beforeManualBackendOpen", scrim: true, dismissWithClick: true, dismissWithEscape: true, showKeyboardWhenOpening: true, components: [
			{content: "Master Backend Address", style: "text-align: center;"},
			{name: "manualBackendInput", kind: "Input", className: "searchText"},
			{kind: "Button", caption: "Save", onclick: "submitManualBackend"},
		]},
		
		{name: "messagePopup", kind: "Popup", scrim: true, onBeforeOpen: "beforeBannerMessageOpen", components: [
			{name: "messagePopupText", style: "text-align: center;"},
			{kind: "Button", caption: "OK", onclick:"closeMessagePopup"}
		]},
		
		{name: "topMenu", className: "topMenu", kind: "TabGroup", value: "welcome", components: [
			{name: "welcomeMenu", content: $L("Home"), value: "welcome", flex: 1, className: "topMenuItem", onclick: "selectMenuButton"},
			{name: "remoteMenu", content: $L("Remote"), value: "remote", flex: 1, className: "topMenuItem", onclick: "selectMenuButton"},
			{name: "programsMenu", content: $L("Programs"), value: "programs", flex: 1, className: "topMenuItem", onclick: "programsClick"},
			{name: "guideMenu", content: $L("Guide"), value: "guide", flex: 1, className: "topMenuItem", onclick: "selectMenuButton"},
			{name: "searchMenu", content: $L("Search"), value: "search", flex: 1, className: "topMenuItem", onclick: "searchClick"},
			{name: "mediaMenu", content: $L("Media"), value: "media", flex: 1, className: "topMenuItem", onclick: "mediaClick"},
			{name: "backendMenu", content: $L("Backend"), value: "backend", flex: 1, className: "topMenuItem", onclick: "backendClick"},
			{name: "moreMenu", content: $L("More"), value: "more", flex: 1, className: "topMenuItem", onclick: "moreClick"},
		]},
		
		{name: "bottomContent", className: "bottomContent", kind: "VFlexBox", onkeypress2: "keypressHandler", flex: 1, components: [
		
			{name: "mainPane", kind: "Pane", flex: 1, className: "mainPane", transitionKind1: "enyo.transitions.LeftRightFlyin", transitionKind: "enyo.transitions.Simple", onSelectView: "viewSelected", onCreateView: "viewCreated", components: [
				{kind: "welcome", onBannerMessage: "bannerMessage", onFirstUse: "openFirstUse", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onHaveImageView: "gotImageView", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute"},
				{kind: "remote", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", onMythprotocolPluginCommand: "mythprotocolPluginCommand", onRemotePluginCommand: "remotePluginCommand", onRemotePluginClose: "remotePluginClose"},
				{kind: "recorded", onBannerMessage: "bannerMessage", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", onMythprotocolPluginCommand: "mythprotocolPluginCommand", onMythprotocolBackgroundPluginCommand: "mythprotocolBackgroundPluginCommand"},
				{kind: "upcoming", onBannerMessage: "bannerMessage", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", onMythprotocolPluginCommand: "mythprotocolPluginCommand", onMythprotocolBackgroundPluginCommand: "mythprotocolBackgroundPluginCommand"},
				{kind: "guide", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", onMythprotocolPluginCommand: "mythprotocolPluginCommand", onMythprotocolBackgroundPluginCommand: "mythprotocolBackgroundPluginCommand"},
				{kind: "searchTitle", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", onMythprotocolPluginCommand: "mythprotocolPluginCommand", onMythprotocolBackgroundPluginCommand: "mythprotocolBackgroundPluginCommand"},
				{kind: "searchPeople", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", onMythprotocolPluginCommand: "mythprotocolPluginCommand", onMythprotocolBackgroundPluginCommand: "mythprotocolBackgroundPluginCommand"},
				{kind: "music", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", onMythprotocolPluginCommand: "mythprotocolPluginCommand", onMythprotocolBackgroundPluginCommand: "mythprotocolBackgroundPluginCommand"},
				{kind: "video", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", onMythprotocolPluginCommand: "mythprotocolPluginCommand", onMythprotocolBackgroundPluginCommand: "mythprotocolBackgroundPluginCommand"},
				{kind: "backendstatus", onBannerMessage: "bannerMessage", onSelectMode: "changeMode", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute"},
				{kind: "backendlog", onBannerMessage: "bannerMessage", onSelectMode: "changeMode", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute"},
				{kind: "preferences", onBannerMessage: "bannerMessage", onSelectMode: "changeMode", onGetPreviousPane: "getPreviousPane", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute"},
				{kind: "setupschedule", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", onMythprotocolPluginCommand: "mythprotocolPluginCommand"},
				
				{kind: "help", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", onMythprotocolPluginCommand: "mythprotocolPluginCommand"},
				
				{kind: "exhibition", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", onMythprotocolPluginCommand: "mythprotocolPluginCommand", onMythprotocolBackgroundPluginCommand: "mythprotocolBackgroundPluginCommand"},
				
				{kind: "findbackends", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", onMythprotocolPluginCommand: "mythprotocolPluginCommand", onMythprotocolBackgroundPluginCommand: "mythprotocolBackgroundPluginCommand"},
				
				{name: "mainImageView", onBannerMessage: "bannerMessage", kind: "ImageView", flex: 1, className: "imageView", onclick: "getPreviousPane"},
					
			]},
			
			{name: "programsPopupMenu", kind: "PopupSelect", kind2: "PopupSelect", className: "programsPopupMenu", onSelect: "programsClickSelect", onClose: "programsClickClosed", components: [
				{name: "recordedMenu", caption: "Recorded"},
				{name: "upcomingMenu", caption: "Upcoming"},
			]},
			{name: "searchPopupMenu", kind: "PopupSelect", className: "searchPopupMenu", onSelect: "searchClickSelect", onClose: "searchClickClosed", components: [
				{name: "searchPeopleMenu", caption: "People"},
				{name: "searchTitleMenu", caption: "Program Title"},
			]},
			{name: "mediaPopupMenu", kind: "PopupSelect", className: "mediaPopupMenu", onSelect: "mediaClickSelect", onClose: "mediaClickClosed", components: [
				{name: "videoMenu", caption: "Video"},
				{name: "musicMenu", caption: "Music"},
			]},
			{name: "backendPopupMenu", kind: "PopupSelect", className: "backendPopupMenu", onSelect: "backendClickSelect", onClose: "backendClickClosed", components: [
				{name: "backendstatusMenu", caption: "Status"},
				{name: "backendlogMenu", caption: "Log"},
			]},
			{name: "morePopupMenu", kind: "PopupSelect", className: "morePopupMenu", onSelect: "moreClickSelect", onClose: "moreClickClosed", components: [
				{name: "preferencesMenu", caption: "Preferences"},
				{name: "helpMenu", caption: "Help"},
				{name: "findbackendsMenu", caption: "Find Backends"},
				{name: "exhibitionMenu", caption: "Exhibition"},
			]},
		
		]},
	],
	
	create: function() {
		if(debug) this.log("create");
		this.inherited(arguments);
		
		WebMyth.Metrix = new Metrix(); 
		
		if((WebMyth.prefsCookieString)&&(true)) {
			if(debug) this.log("we have cookie");
			WebMyth.prefsCookie = enyo.json.parse(WebMyth.prefsCookieString);
			
			if(WebMyth.prefsCookie.DBSchemaVer == null) WebMyth.prefsCookie.DBSchemaVer = 0;
			if(WebMyth.prefsCookie.ignoreArticlesSort == null) WebMyth.prefsCookie.ignoreArticlesSort = true;
			
			if(WebMyth.prefsCookie.allowMetrix) setTimeout(enyo.bind(this,"submitMetrix"),500);
			
		} else {
			if(debug) this.log("we don't have cookie");
			WebMyth.prefsCookie = defaultCookie();
			
			
			enyo.setCookie("webmyth2-prefs", enyo.json.stringify(WebMyth.prefsCookie));
			
			//setTimeout(enyo.bind(this,"openFirstUse"),500);
			
		}
		
		if(WebMyth.prefsCookie.useScript == 2) {
			WebMyth.useScript = true;
			WebMyth.useScriptRemote = true;
		} else if(WebMyth.prefsCookie.useScript == 1) {
			WebMyth.useScript = false;
			WebMyth.useScriptRemote = true;
		} else {
			WebMyth.useScript = false;
			WebMyth.useScriptRemote = false;
		}
			
		enyo.setAllowedOrientation(WebMyth.prefsCookie.allowedOrientation);	
		debug = WebMyth.prefsCookie.debug;
		
		enyo.keyboard.setResizesWindow(false);
		
		this.resizeHandler();
		
		WebMyth.dateFormatter = new enyo.g11n.DateFmt("EEEE, MMM d");
		WebMyth.fulldateFormatter = new enyo.g11n.DateFmt("MMM d, yyyy");
		WebMyth.datetimeFormatter = new enyo.g11n.DateFmt("MMM d, yyyy HH:mm");
		WebMyth.locale = enyo.g11n.currentLocale();
		
		if(WebMyth.prefsCookie.ignoreArticlesSort) {
			WebMyth.primer = ignoreArticlesFunction;
		} else {
			WebMyth.primer = sameFunction;
		}
		
		setTimeout(enyo.bind(this,"activate"),1);
	
	},
	activate: function() {
		if(debug) this.log("activate");
		
		switch(this.appMode) {
			case "exhibition":
				this.$.topMenu.hide();
				this.$.mainPane.selectViewByName("exhibition");
				break;
			default:
				//this.$.welcome.activate();
				break;
		}
		
	},
	
	
	//Internal functions
	openFirstUse: function() {
		if(debug) this.log("openFirstUse");
		
		this.$.firstUsePopup.openAtCenter();
	},
	openManualPopup: function() {
		if(debug) this.log("openManualPopup");
		
		this.$.firstUsePopup.close();
	
		this.$.manualBackendPopup.openAtCenter();
	
	},
	beforeManualBackendOpen: function() {
		if(debug) this.log("beforeManualBackendOpen");
		
		if(WebMyth.prefsCookie.masterBackendIp == "-"){
		
			this.$.manualBackendInput.setValue("");
			
		} else {
		
			this.$.manualBackendInput.setValue(WebMyth.prefsCookie.masterBackendIp);
		
		}
	
	},
	submitManualBackend: function() {
		if(debug) this.log("submitManualBackend");
		
		WebMyth.prefsCookie.masterBackendIp = this.$.manualBackendInput.getValue();
		
		if(WebMyth.prefsCookie.webserverName == "-") WebMyth.prefsCookie.webserverName = WebMyth.prefsCookie.masterBackendIp;
		
		this.savePreferences();
		
		this.$.manualBackendPopup.close();
		
		this.$.welcome.activate();
	},
	openPreferences: function() {
		if(debug) this.log("openPreferences");
		
		this.$.mainPane.selectViewByName("preferences");
		
		this.$.firstUsePopup.close();
	},
	openHelp: function() {
		if(debug) this.log("openHelp");
		
		this.$.mainPane.selectViewByName("help");
		
		this.$.firstUsePopup.close();
	},
	openHomepage: function() {
		if(debug) this.log("openHomepage");
		
		window.open("http://code.google.com/p/webmyth2/");
	},
	openCatalog: function() {
		if(debug) this.log("openCatalog");
		
		var appInfo = enyo.fetchAppInfo();
		
		window.open("http://developer.palm.com/appredirect/?packageid="+appInfo.id);
	},
	emailDeveloper: function() {
		if(debug) this.log("emailDeveloper");
		
		var appInfo = enyo.fetchAppInfo();
		
		window.open("mailto:webmyth.help@gmail.com?subject=WebMyth2 Help - v"+appInfo.version);
	},
	openFindbackends: function() {
		if(debug) this.log("openFindbackends");
		
		this.$.mainPane.selectViewByName("findbackends");
		
		this.$.firstUsePopup.close();
	},
	submitMetrix: function() {
		if(debug) this.log("submitMetrix");
		
		if(window.PalmSystem) WebMyth.Metrix.postDeviceData();
		
		if((WebMyth.prefsCookie.protoVer != "TBD")&&(WebMyth.prefsCookie.protoVerSubmitted == false)) {
                WebMyth.Metrix.customCounts("ProtoVer", WebMyth.prefsCookie.protoVer, 1);
                WebMyth.prefsCookie.protoVerSubmitted = true;
        }

		
		if(window.PalmSystem) WebMyth.Metrix.checkBulletinBoard(1, false);
		
	},
	selectMenuButton: function(inSender) {
		if(debug) this.log("selectMenuButton with "+inSender.getName());
		
		var newMode = inSender.getName().substring(0,inSender.getName().length-4);
		
		this.savePreferences();
		
		this.$.mainPane.selectViewByName(newMode);
		
		if(debug) this.log("finished changing to "+newMode);
	},
	programsClick: function(inSender, inEvent) {
		if(debug) this.log("programsClick");
		
		this.$.programsPopupMenu.openAroundControl(this.$.programsMenu);
	},
	programsClickSelect: function(inSender, inSelected) {
		if(debug) this.log("programsClickSelect: "+inSelected.getValue());
		
		switch(inSelected.getValue()) {
			case "Recorded": 
				this.$.mainPane.selectViewByName("recorded");
				break;
			case "Upcoming": 
				this.$.mainPane.selectViewByName("upcoming");
				break;
		}
	},
	searchClick: function(inSender, inEvent) {
		if(debug) this.log("searchClick");
		
		this.$.searchPopupMenu.openAroundControl(this.$.searchMenu);
	},
	searchClickSelect: function(inSender, inSelected) {
		if(debug) this.log("searchClickSelect: "+inSelected.getValue());
		
		switch(inSelected.getValue()) {
			case "People": 
				this.$.mainPane.selectViewByName("searchPeople");
				break;
			case "Program Title": 
				this.$.mainPane.selectViewByName("searchTitle");
				break;
		}
	},
	mediaClick: function(inSender, inEvent) {
		if(debug) this.log("backendClick");
		
		this.$.mediaPopupMenu.openAroundControl(this.$.mediaMenu);
	},
	mediaClickSelect: function(inSender, inSelected) {
		if(debug) this.log("mediaClickSelect: "+inSelected.getValue());
		
		switch(inSelected.getValue()) {
			case "Video": 
				this.$.mainPane.selectViewByName("video");
				break;
			case "Music": 
				this.$.mainPane.selectViewByName("music");
				break;
		}
	},
	backendClick: function(inSender, inEvent) {
		if(debug) this.log("backendClick");
		
		this.$.backendPopupMenu.openAroundControl(this.$.backendMenu);
	},
	backendClickSelect: function(inSender, inSelected) {
		if(debug) this.log("backendClickSelect: "+inSelected.getValue());
		
		switch(inSelected.getValue()) {
			case "Status": 
				this.$.mainPane.selectViewByName("backendstatus");
				break;
			case "Log": 
				this.$.mainPane.selectViewByName("backendlog");
				break;
		}
	},
	moreClick: function(inSender, inEvent) {
		if(debug) this.log("moreClick");
		
		this.$.morePopupMenu.openAroundControl(this.$.moreMenu);
	},
	moreClickSelect: function(inSender, inSelected) {
		if(debug) this.log("moreClickSelect: "+inSelected.getValue());
		
		switch(inSelected.getValue()) {
			case "Preferences": 
				this.$.mainPane.selectViewByName("preferences");
				break;
			case "Help": 
				this.$.mainPane.selectViewByName("help");
				break;
			case "Find Backends": 
				this.$.mainPane.selectViewByName("findbackends");
				break;
			case "Exhibition": 
				this.$.mainPane.selectViewByName("exhibition");
				break;
		}
	},
	changeMode: function(inSender, newMode) {
		if(debug) this.log("changeMode to "+newMode);
		
		this.savePreferences();
		
		this.$.mainPane.selectViewByName(newMode);
		
		if(debug) this.log("finished changing to "+newMode);
	
	},
	savePreferences: function() {
		if(debug) this.log("savePreferences");
		
		enyo.setCookie("webmyth2-prefs", enyo.json.stringify(WebMyth.prefsCookie));
		
	},
	gotImageView: function(inSender, url) {
		if(debug) this.log("gotImageView: "+url);
		
		this.$.mainImageView.setCenterSrc(url);
		this.$.mainImageView.render();
		this.$.mainPane.selectViewByName("mainImageView");
		
	},
	personSelected: function(inSender, personObject) {
		if(debug) this.log("personSelected: "+enyo.json.stringify(personObject));
		
		//send along viewMode just to make we are in correct mode
		this.$.searchPeople.setHaveIncomingPerson(true);
		this.$.searchPeople.externalPerson(personObject, this.viewMode);
		
		this.$.mainPane.selectViewByName("searchPeople");
		
	},
	openWeb: function(inSender, webType, webValue) {
		if(debug) this.log("openWeb: "+webType+" "+webValue);
		
		var url = "";
		
		if(this.viewMode == "tablet") {
			switch(webType) {
				case "URL":
					url = webValue;
					break;
				case "Wikipedia":
					url = "http://";
					url += WebMyth.locale.getLanguage();
					url += ".wikipedia.org/wiki/Special:Search?search="+webValue;
					break;
				case "themoviedb":
					url = "http://www.themoviedb.org/search/movies?search[text]="+webValue;
					break;
				case "IMDBtitle":
					url = "http://www.imdb.com/find?s=all&q="+webValue;
					break;
				case "IMDBperson":
					url = "http://www.imdb.com/find?realm=name&field=bio&q="+webValue;
					break;
				case "TheTVDB":
					url = "http://www.thetvdb.com/?searchseriesid=&tab=listseries&function=Search&string="+webValue;
					break;
				case "TV.com":
					url = "http://www.tv.com/search.php?type=11&stype=all&qs="+webValue;
					break;
				case "Google":
					url = "http://www.google.com/search?client=ms-palm-webOS&channel=iss&q="+webValue;
					break;
				case "Google Images":
					url = "http://www.google.com/search?client=ms-palm-webOS&site=images&channel=iss&q="+webValue;
					break;
				case "MythWeb":
					url = "http://"
					url += WebMyth.prefsCookie.webserverName;
					url += "/mythweb/tv/detail/";
					url += webValue;
					break;		
			}
			
		} else {
			switch(webType) {
				case "URL":
					url = webValue;
					break;
				case "Wikipedia":
					url = "http://";
					url += WebMyth.locale.getLanguage();
					url += ".m";
					url += ".wikipedia.org/wiki/Special:Search?search="+webValue;
					break;
				case "themoviedb":
					url = "http://www.themoviedb.org/search/movies?search[text]="+webValue;
					break;
				case "IMDBtitle":
					url = "http://m.imdb.com/find?s=all&q="+webValue;
					break;
				case "IMDBperson":
					url = "http://m.imdb.com/find?realm=name&field=bio&q="+webValue;
					break;
				case "TheTVDB":
					url = "http://www.thetvdb.com/?searchseriesid=&tab=listseries&function=Search&string="+webValue;
					break;
				case "TV.com":
					url = "http://www.tv.com/search.php?type=11&stype=all&qs="+webValue;
					break;
				case "Google":
					url = "http://www.google.com/m/search?client=ms-palm-webOS&channel=iss&q="+webValue;
					break;
				case "Google Images":
					url = "http://www.google.com/m/search?client=ms-palm-webOS&site=images&channel=iss&q="+webValue;
					break;
				case "MythWeb":
					url = "http://"
					url += WebMyth.prefsCookie.webserverName;
					url += "/mythweb/tv/detail/";
					url += webValue;
					break;		
			}
		
		}
		
		if(debug) this.log("url :"+url);
		
		if(window.PalmSystem) {
			if(debug) this.log("Opening using Palm system");
			this.$.openWebService.call({target: url});
		} else {
			if(debug) this.log("NOT opening using Palm system");
			window.open(url);
			//window.location = url;
		}
	 
	},
	setupSchedule: function(inSender, programObject) {
		if(debug) this.log("setupSchedule: "+enyo.json.stringify(programObject));
		
		this.$.setupschedule.externalProgram(programObject);
		
		this.$.mainPane.selectViewByName("setupschedule");

		//this.bannerMessage("setup schedule is not yet supported.  use MythWeb");
		
	},
	programGuide: function(inSender, isoTime) {
		if(debug) this.log("programGuide: "+isoTime);
		
		//send along viewMode just to make we are in correct mode
		this.$.guide.externalTime(isoTime, this.viewMode);
		
		this.$.mainPane.selectViewByName("guide");
		
	},
	titleSearch: function(inSender, title) {
		if(debug) this.log("titleSearch: "+title);
		
		//send along viewMode just to make we are in correct mode
		this.$.searchTitle.setHaveIncomingTitle(true);
		this.$.searchTitle.externalTitle(title, this.viewMode);
		
		this.$.mainPane.selectViewByName("searchTitle");
		
	},
	downloadFile: function(inSender, url, filename, directory, openApp) {
		if(debug) this.log("downloadFile: '"+url+"', save to '"+directory+"' as '"+filename+"' and open in "+openApp);
		
		this.downloadOpenApp = openApp;
		
		if(window.PalmSystem) {
			if(debug) this.log("Downloading using Palm system");
			this.bannerMessage("webmyth2", "Starting download");
			this.$.downloadFileService.call({target: url, targetFilename: filename,	targetDir: directory});
		} else {
			this.bannerMessage("webmyth2", "Downloading in the browser not supported.  You can try streaming and saving from there.");
		}
		
	},
	downloadFileResponse: function(inSender, inResponse) {
		if(inResponse.completed) {
			this.bannerMessage("webmyth2", "Download finished!");
			
			if(this.downloadOpenApp) this.$.openProgramService.call({id: this.downloadOpenApp});
			
			//open app
		} else {
		
			if(inResponse.amountReceived && inResponse.amountTotal) {
				var percent = (inResponse.amountReceived / inResponse.amountTotal)*100;
				percent = Math.round(percent);
				if(percent!=NaN) {
					if(this.currProgress != percent) {
						this.currProgress = percent;
						if(debug) this.log("Downloading: " + percent + "%", "");
					}
				}
			}
			
		}
				
	},
	downloadFileFailure: function(inSender, inResponse) {
		this.bannerMessage("webmyth2", "Error downloading file");
	},
	remoteCommand: function(inSender, inType, inCommand) {
		if(debug) this.log("remoteCommand: "+inType+" "+inCommand);
		
		this.$.remote.externalCommand(inType, inCommand);
	},
	bannerMessage: function(inSender, inMessage, forcePopup) {
		if(debug) this.log("bannerMessage: "+inMessage);
		
		if((forcePopup)||(!window.PalmSystem)){
			this.messageText = inMessage;
			this.$.messagePopup.openAtCenter();
		} else {
			enyo.windows.addBannerMessage(inMessage, "{}");
		} 
		
	},
	beforeBannerMessageOpen: function() {
		if(debug) this.log("beforeBannerMessageOpen");
		
		this.$.messagePopupText.setContent(this.messageText);
	},
	closeMessagePopup: function() {
		if(debug) this.log("messagePopupClick");
		
		this.$.messagePopup.close();
		
	},		
	getPreviousPane: function(inSender) {
		if(debug) this.log("getPreviousPane called from "+inSender);
		
		this.$.mainPane.back();
	},
	viewSelected: function(inSender, inView, inpreviousPane) {
		if(inpreviousPane) {
			if(debug) this.log("changing panes from "+inpreviousPane.name+" to "+inView.name+" and "+this.$.topMenu.getValue());
			this.currentPane = inView.name;
			this.previousPane = inpreviousPane.name;
		}

		this.$.remote.deactivate();
		this.$.exhibition.deactivate();
		
		switch(this.currentPane) {
			case 'welcome':
				this.$.welcome.activate(this.viewMode);
				this.$.topMenu.setValue("welcome");
			  break;
			case 'remote':
				this.$.remote.activate(this.viewMode);
				this.$.topMenu.setValue("remote");
			  break;
			case 'recorded':
				this.$.recorded.activate(this.viewMode);
				this.$.topMenu.setValue("programs");
			  break;
			case 'upcoming':
				this.$.upcoming.activate(this.viewMode);
				this.$.topMenu.setValue("programs");
			  break;
			case 'guide':
				this.$.guide.activate(this.viewMode);
				this.$.topMenu.setValue("guide");
			  break;
			case 'searchTitle':
				this.$.searchTitle.activate(this.viewMode);
				this.$.topMenu.setValue("search");
			  break;
			case 'searchPeople':
				this.$.searchPeople.activate(this.viewMode);
				this.$.topMenu.setValue("search");
			  break;
			case 'video':
				this.$.video.activate(this.viewMode);
				this.$.topMenu.setValue("media");
			  break;
			case 'music':
				this.$.music.activate(this.viewMode);
				this.$.topMenu.setValue("media");
			  break;
			case 'backendstatus':
				this.$.backendstatus.activate(this.viewMode);
				this.$.topMenu.setValue("backend");
			  break;
			case 'backendlog':
				this.$.backendlog.activate(this.viewMode);
				this.$.topMenu.setValue("backend");
			  break;
			case 'setupschedule':
				this.$.setupschedule.activate(this.viewMode);
				this.$.topMenu.setValue("nothing");
			  break;
			case 'preferences':
				this.$.preferences.activate(this.viewMode);
				this.$.topMenu.setValue("more");
			  break;
			case 'help':
				this.$.help.activate(this.viewMode);
				this.$.topMenu.setValue("more");
			  break;
			case 'findbackends':
				this.$.findbackends.activate(this.viewMode);
				this.$.topMenu.setValue("more");
			  break;
			case 'exhibition':
				this.$.exhibition.activate(this.viewMode);
				this.$.topMenu.hide();
			  break;
		}
		
		switch(this.previousPane) {
			case 'welcome':
				this.$.welcome.deactivate();
			  break;
			case 'remote':
				this.$.remote.deactivate();
			  break;
			case 'recorded':
				this.$.recorded.deactivate();
				//this.$.mainPane.removeHistoryItem("recorded");
			  break;
			case 'upcoming':
				this.$.upcoming.deactivate();
				//this.$.mainPane.removeHistoryItem("upcoming");
			  break;
			case 'guide':
				this.$.guide.deactivate();
			  break;
			case 'searchPeople':
				this.$.searchPeople.deactivate();
			  break;
			case 'searchTitle':
				this.$.searchTitle.deactivate();
			  break;
			case 'video':
				this.$.video.deactivate();
			  break;
			case 'music':
				this.$.music.deactivate();
			  break;
			case 'backendstatus':
				this.$.backendstatus.deactivate();
			  break;
			case 'backendlog':
				this.$.backendlog.deactivate();
			  break;
			case 'setupschedule':
				this.$.setupschedule.deactivate();
			  break;
			case 'preferences':
				this.$.preferences.deactivate();
			  break;
			case 'help':
				this.$.help.deactivate();
			  break;
			case 'findbackends':
				this.$.findbackends.deactivate();
			  break;
			case 'exhibition':
				this.$.exhibition.deactivate();
				this.resizeHandler();
			  break;
		}
		
		//this.resizeHandler();
		
		//return;
	},
	viewCreated: function(inSender, inName) {
		if(debug) this.log("viewCreated with name: "+inName);
		
		if (inName == "recorded") {
			this.$.mainPane.createComponent({kind: "recorded", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", owner: this});
			this.$.mainPane.selectViewByName(inName);
			this.$.topMenu.setValue("programs");
		} else if (inName == "upcoming") {
			this.$.mainPane.createComponent({kind: "upcoming", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", owner: this});
			this.$.mainPane.selectViewByName(inName);
			this.$.topMenu.setValue("programs");
		} else if (inName == "music") {
			this.$.mainPane.createComponent({kind: "music", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", owner: this});
			this.$.mainPane.selectViewByName(inName);
			this.$.topMenu.setValue("media");
		} else if (inName == "video") {
			this.$.mainPane.createComponent({kind: "video", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", owner: this});
			this.$.mainPane.selectViewByName(inName);
			this.$.topMenu.setValue("media");
		} else if (inName == "backendstatus") {
			this.$.mainPane.createComponent({kind: "backendstatus", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", owner: this});
			this.$.mainPane.selectViewByName(inName);
			this.$.topMenu.setValue("backend");
		} else if (inName == "backendlog") {
			this.$.mainPane.createComponent({kind: "backendlog", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", owner: this});
			this.$.mainPane.selectViewByName(inName);
			this.$.topMenu.setValue("backend");
		} else if (inName == "exhibition") {
			this.$.mainPane.createComponent({kind: "exhibition", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", owner: this});
			this.$.mainPane.selectViewByName(inName);
			this.$.topMenu.setValue("more");
		} else if (inName == "help") {
			this.$.mainPane.createComponent({kind: "help", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", owner: this});
			this.$.mainPane.selectViewByName(inName);
			this.$.topMenu.setValue("more");
		} else if (inName == "findbackends") {
			this.$.mainPane.createComponent({kind: "findbackends", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", owner: this});
			this.$.mainPane.selectViewByName(inName);
			this.$.topMenu.setValue("more");
		} else if (inName == "preferences") {
			this.$.mainPane.createComponent({kind: "preferences", onBannerMessage: "bannerMessage", onGetPreviousPane: "getPreviousPane", onSelectMode: "changeMode", onSavePreferences: "savePreferences", onPersonSelected: "personSelected", onOpenWeb: "openWeb", onSetupSchedule: "setupSchedule", onProgramGuide: "programGuide", onTitleSearch: "titleSearch", onDownloadFile: "downloadFile", onRemoteCommand: "remoteCommand", onMysqlPluginCommand: "mysqlPluginCommand", onMysqlPluginExecute: "mysqlPluginExecute", owner: this});
			this.$.mainPane.selectViewByName(inName);
			this.$.topMenu.setValue("more");
		}
		
		//return true;
	},
	
		
	//Handlers
	appLoaded: function() {
		if(debug) this.log("appLoaded");
	},
	appUnloaded: function() {
		if(debug) this.log("appUnloaded");
		
		try {
			this.dashWindow.close();
		} catch(e) {
			if(debug) this.log(e);
		}
	},
	appError: function() {
		if(debug) this.log("appError");
	},
	windowActivated: function() {
		if(debug) this.log("windowActivated");
		
		this.$[this.currentPane].activate(this.viewMode);
		
		try {
			this.dashWindow.close();
		} catch(e) {
			if(debug) this.log(e);
		}
	},
	windowDeactivated: function() {
		if(debug) this.log("windowDeactivated");
		
		this.$[this.currentPane].deactivate(this.viewMode);
		
		if((WebMyth.prefsCookie.remoteDashboard)&&(WebMyth.prefsCookie.frontends[WebMyth.prefsCookie.frontendIndex])) this.dashWindow = enyo.windows.openDashboard("dashboard.html", "dashWindowName", WebMyth.prefsCookie, {clickableWhenLocked: true});
		
		//if(this.appMode == "exhibition") window.close();
	},
	backHandler: function(inSender, e) {
		if(debug) this.log("backHandler");
		
		switch(this.$.mainPane.getViewName()) {
			case 'welcome':
				this.$.welcome.gotBack();
				break;
			case 'remote':
				e.preventDefault();
				this.$.remote.gotBack();
				break;
			case 'recorded':
				e.preventDefault();
				this.$.recorded.gotBack();
				break;
			case 'upcoming':
				e.preventDefault();
				this.$.upcoming.gotBack();
				break;
			case 'guide':
				e.preventDefault();
				this.$.guide.gotBack();
				break;
			case 'searchPeople':
				e.preventDefault();
				this.$.searchPeople.gotBack();
				break;
			case 'searchTitle':
				e.preventDefault();
				this.$.searchTitle.gotBack();
				break
			case 'music':
				e.preventDefault();
				this.$.music.gotBack();
				break;	
			case 'video':
				e.preventDefault();
				this.$.video.gotBack();
				break;	
			case 'backendstatus':
				e.preventDefault();
				//this.$.backendstatus.gotBack();
				this.getPreviousPane();
				break;
			case 'preferences':
				e.preventDefault();
				this.$.preferences.gotBack();
				break;
			case 'backendlog':
				e.preventDefault();
				//this.$.backendlog.gotBack();
				this.getPreviousPane();
				break;
			case 'setupschedule':
				e.preventDefault();
				//this.$.backendlog.gotBack();
				this.$.setupschedule.gotBack();
				break;
			case 'help':
				e.preventDefault();
				this.getPreviousPane();
				break;
			case 'findbackends':
				e.preventDefault();
				this.getPreviousPane();
				break;
			case 'exhibition':
				e.preventDefault();
				this.getPreviousPane();
				break;
			case 'mainImageView':
				e.preventDefault();
				this.getPreviousPane();
				break;
		};
		
		return true;
	},
	windowParamsChangeHandler: function() {
		if(debug) this.log("main windowParamsChangeHandler: "+enyo.json.stringify(enyo.windowParams))
		
		if(enyo.windowParams.dashboardRemoteIndex) {
			WebMyth.prefsCookie.dashboardRemoteIndex = enyo.windowParams.dashboardRemoteIndex;
			this.savePreferences();
		} else if(enyo.windowParams.remoteJump) {
			this.$.remote.sendJump(enyo.windowParams.remoteJump);
			this.$.remote.dashboardDisconnect();
		} else if(enyo.windowParams.remoteKey) {
			this.$.remote.sendKey(enyo.windowParams.remoteKey);
			this.$.remote.dashboardDisconnect();
		}
	},
	resizeHandler: function() {
		if(debug) this.log("doing resize to "+document.body.clientWidth+"x"+document.body.clientHeight);
		
		if(document.body.clientWidth > 500) {
		
			this.viewMode = "tablet";
			if(debug) this.log("setting viewMode to "+this.viewMode);
			
			//this.$.leftMenu.render();
			//this.$.leftMenu.show();
			this.addClass("tablet");
			this.removeClass("large-phone");
			this.removeClass("phone");
			this.$.topMenu.render();
			this.$.topMenu.show();
			
		} else if(document.body.clientWidth > 500) {
		
			this.viewMode = "phone";
			if(debug) this.log("setting viewMode to "+this.viewMode);
			
			//this.$.leftMenu.render();
			//this.$.leftMenu.show();
			this.removeClass("tablet");
			this.addClass("large-phone");
			this.removeClass("phone");
			this.$.topMenu.render();
			this.$.topMenu.show();
			
		} else {
			
			this.viewMode = "phone";
			if(debug) this.log("setting viewMode to "+this.viewMode);
			
			//this.$.leftMenu.hide();
			this.removeClass("tablet");
			this.removeClass("large-phone");
			this.addClass("phone");
			this.$.topMenu.hide();
		}
		
		
		
		if(debug) this.log("now sending resize event to pane: "+this.$.mainPane.getViewName()+" with value: "+this.viewMode);
		switch(this.$.mainPane.getViewName()) {
			case 'welcome':
				this.$.welcome.resize(this.viewMode);
				break;
			case 'remote':
				this.$.remote.resize(this.viewMode);
				break;
			case 'recorded':
				this.$.recorded.resize(this.viewMode);
				break;
			case 'upcoming':
				this.$.upcoming.resize(this.viewMode);
				break;
			case 'guide':
				this.$.guide.resize(this.viewMode);
				break;
			case 'searchPeople':
				this.$.searchPeople.resize(this.viewMode);
				break;
			case 'searchTitle':
				this.$.searchTitle.resize(this.viewMode);
				break;
			case 'video':
				this.$.video.resize(this.viewMode);
				break;
			case 'music':
				this.$.music.resize(this.viewMode);
				break;
			case 'backendstatus':
				this.$.backendstatus.resize(this.viewMode);
				break;
			case 'backendlog':
				this.$.backendlog.resize(this.viewMode);
				break;
			case 'setupschedule':
				this.$.setupschedule.resize(this.viewMode);
				break;
			case 'preferences':
				this.$.preferences.resize(this.viewMode);
				break;
			case 'help':
				this.$.help.resize(this.viewMode);
				break;
			case 'findbackends':
				this.$.findbackends.resize(this.viewMode);
				break;
			case 'exhibition':
				this.$.topMenu.hide();
				this.$.exhibition.resize(this.viewMode);
				break;
		};
	},
	keypressHandler: function(inSender, inEvent) {
		if(debug) this.log("keypressHandler: "+inEvent.keyCode);
		
		var key = "";
		var specialKey = "";
		
		switch(inEvent.keyCode){
			case 8:
				specialKey = "backspace"; break;
			case 9:
				specialKey = "tab"; break;
			case 13:
				specialKey = "enter"; break;
			case 16:
				specialKey = "shift"; break;
			case 17:
				specialKey = "ctrl"; break;
			case 18:
				specialKey = "alt"; break;
			case 19:
				specialKey = "pause"; break;
			case 20:
				specialKey = "capslock"; break;
			case 27:
				specialKey = "escape"; break;
			case 32:
				specialKey = "space"; break;
			case 33:
				specialKey = "pageup"; break;
			case 34:
				specialKey = "pagedown"; break;
			case 35:
				specialKey = "end"; break;
			case 36:
				specialKey = "home"; break;
			case 37:
				specialKey = "leftarrow"; break;
			case 38:
				specialKey = "uparrow"; break;
			case 39:
				specialKey = "rightarrow"; break;
			case 40:
				specialKey = "downarrow"; break;
			case 45:
				specialKey = "insert"; break;
			case 46:
				specialKey = "delete"; break;
			case 48:
				key = "0"; break;
			case 49:
				key = "1"; break;
			case 50:
				key = "2"; break;
			case 51:
				key = "3"; break;
			case 52:
				key = "4"; break;
			case 53:
				key = "5"; break;
			case 54:
				key = "6"; break;
			case 55:
				key = "7"; break;
			case 56:
				key = "8"; break;
			case 57:
				key = "9"; break;
			case 97:
				key = "a"; break;
			case 98:
				key = "b"; break;
			case 99:
				key = "c"; break;
			case 100:
				key = "d"; break;
			case 101:
				key = "e"; break;
			case 102:
				key = "f"; break;
			case 103:
				key = "g"; break;
			case 104:
				key = "h"; break;
			case 105:
				key = "i"; break;
			case 106:
				key = "j"; break;
			case 107:
				key = "k"; break;
			case 108:
				key = "l"; break;
			case 109:
				key = "m"; break;
			case 110:
				key = "n"; break;
			case 111:
				key = "o"; break;
			case 112:
				key = "p"; break;
			case 113:
				key = "q"; break;
			case 114:
				key = "r"; break;
			case 115:
				key = "s"; break;
			case 116:
				key = "t"; break;
			case 117:
				key = "u"; break;
			case 118:
				key = "v"; break;
			case 119:
				key = "w"; break;
			case 120:
				key = "x"; break;
			case 121:
				key = "y"; break;
			case 122:
				key = "z"; break;
				
		}
		
		if(debug) this.log("key: '"+key+"' specialKey '"+specialKey+"'");
		
		if(key.length > 0) {
			switch(this.$.mainPane.getViewName()) {
				case 'welcome':
					this.$.welcome.gotKey(key);
					break;
				case 'remote':
					this.$.remote.gotKey(key);
					break;
				case 'recorded':
					this.$.recorded.gotKey(key);
					break;
				case 'upcoming':
					this.$.upcoming.gotKey(key);
					break;
				case 'video':
					this.$.video.gotKey(key);
					break;
				case 'music':
					this.$.music.gotKey(key);
					break;
				case 'searchPeople':
					this.$.searchPeople.gotKey(key);
					break;
				case 'searchTitle':
					this.$.searchTitle.gotKey(key);
					break;
			};
		} else if(specialKey.length > 0) {
			switch(this.$.mainPane.getViewName()) {
				case 'welcome':
					this.$.welcome.gotSpecialKey(specialKey);
					break;
				case 'remote':
					this.$.remote.gotSpecialKey(specialKey);
					break;
				case 'recorded':
					this.$.recorded.gotSpecialKey(specialKey);
					break;
				case 'upcoming':
					this.$.upcoming.gotSpecialKey(specialKey);
					break;
				case 'video':
					this.$.video.gotSpecialKey(specialKey);
					break;
				case 'music':
					this.$.music.gotSpecialKey(specialKey);
					break;
				case 'searchPeople':
					this.$.searchPeople.gotSpecialKey(specialKey);
					break;
				case 'searchTitle':
					this.$.searchTitle.gotSpecialKey(specialKey);
					break;
			};
		}
	},

	
	//Hybrid plugin
	pluginReady: function() {
		if(debug) this.log("pluginReady");
		
		this.pluginIsReady = true;
		
		this.$.plugin.addCallback("mysqlWelcomeGetSettings",enyo.bind(this,this.mysqlWelcomeGetSettings), true);
		
		//remote control 
		this.$.plugin.addCallback("mysqlRemoteGetVideoDetails",enyo.bind(this,this.mysqlRemoteGetVideoDetails), true);
		
		this.$.plugin.addCallback("mysqlRecordedGetPeople",enyo.bind(this,this.mysqlRecordedGetPeople), true);
		this.$.plugin.addCallback("mysqlRecordedGetJobqueue",enyo.bind(this,this.mysqlRecordedGetJobqueue), true);
		this.$.plugin.addCallback("mysqlRecordedUndeleteRecording",enyo.bind(this,this.mysqlRecordedUndeleteRecording), true);
		this.$.plugin.addCallback("mysqlRecordedQueueJob",enyo.bind(this,this.mysqlRecordedQueueJob), true);
		
		this.$.plugin.addCallback("backgroundProtocolCommandResponse",enyo.bind(this,this.backgroundProtocolCommandResponse), true);
		this.$.plugin.addCallback("mysqlUpcomingGetPeople",enyo.bind(this,this.mysqlUpcomingGetPeople), true);
		
		this.$.plugin.addCallback("mysqlGuideGetPeople",enyo.bind(this,this.mysqlGuideGetPeople), true);
		
		this.$.plugin.addCallback("mysqlSearchPeopleGetProgramsPeople",enyo.bind(this,this.mysqlSearchPeopleGetProgramsPeople), true);
		this.$.plugin.addCallback("mysqlSearchPeopleGetVideosPeople",enyo.bind(this,this.mysqlSearchPeopleGetVideosPeople), true);
		this.$.plugin.addCallback("mysqlSearchPeopleGetPrograms",enyo.bind(this,this.mysqlSearchPeopleGetPrograms), true);
		this.$.plugin.addCallback("mysqlSearchPeopleGetVideos",enyo.bind(this,this.mysqlSearchPeopleGetVideos), true);
		this.$.plugin.addCallback("mysqlSearchPeopleGetPeople",enyo.bind(this,this.mysqlSearchPeopleGetPeople), true);
		
		this.$.plugin.addCallback("mysqlSearchTitleGetPrograms",enyo.bind(this,this.mysqlSearchTitleGetPrograms), true);
		this.$.plugin.addCallback("mysqlSearchTitleGetPeople",enyo.bind(this,this.mysqlSearchTitleGetPeople), true);
		
		this.$.plugin.addCallback("mysqlVideoGetVideos",enyo.bind(this,this.mysqlVideoGetVideos), true);
		this.$.plugin.addCallback("mysqlVideoGetStorageGroups",enyo.bind(this,this.mysqlVideoGetStorageGroups), true);
		this.$.plugin.addCallback("mysqlVideoGetUpnp",enyo.bind(this,this.mysqlVideoGetUpnp), true);
		this.$.plugin.addCallback("mysqlVideoGetPeople",enyo.bind(this,this.mysqlVideoGetPeople), true);
		
		this.$.plugin.addCallback("mysqlMusicGetMusic",enyo.bind(this,this.mysqlMusicGetMusic), true);
		this.$.plugin.addCallback("mysqlMusicGetPlaylists",enyo.bind(this,this.mysqlMusicGetPlaylists), true);
		this.$.plugin.addCallback("mysqlMusicSavePlaylist",enyo.bind(this,this.mysqlMusicSavePlaylist), true);
		
		this.$.plugin.addCallback("mysqlBackendlogGetLog",enyo.bind(this,this.mysqlBackendlogGetLog), true);
		
		this.$.plugin.addCallback("mysqlBackendstatusGetInputs",enyo.bind(this,this.mysqlBackendstatusGetInputs), true);
		
		this.$.plugin.addCallback("mysqlSetupscheduleGetInputs",enyo.bind(this,this.mysqlSetupscheduleGetInputs), true);
		this.$.plugin.addCallback("mysqlSetupscheduleGetRule",enyo.bind(this,this.mysqlSetupscheduleGetRule), true);
		this.$.plugin.addCallback("mysqlSetupscheduleSaveRule",enyo.bind(this,this.mysqlSetupscheduleSaveRule), true);
		
		this.$.plugin.addCallback("mysqlExhibitionGetInputs",enyo.bind(this,this.mysqlExhibitionGetInputs), true);
		
		if(debug) this.log("pluginReady after adding callbacks");
	},
	pluginConnected: function() {
		if(debug) this.log("pluginConnected");
	},
	pluginDisconnected: function() {
		if(debug) this.log("pluginDisconnected");
		
		this.bannerMessage("webmyth2","The plugin has crashed.  Try restarting the app or switch to using the script instead of the plugin.");
	},
	mysqlPluginCommand: function(inSender, functionName, query) {
		if(debug) this.log("mysqlPluginCommand - "+functionName+": "+query);
		
		this.functionName = functionName;
		this.query = query;

		try {
			this.$.plugin.callPluginMethodDeferred(enyo.bind(this,this.mysqlPluginDelayedResponse),"mysqlCommand",WebMyth.prefsCookie.databaseHost,WebMyth.prefsCookie.databaseUsername,WebMyth.prefsCookie.databasePassword,WebMyth.prefsCookie.databaseName,WebMyth.prefsCookie.databasePort,functionName,query.substring(0,250),query.substring(250,500),query.substring(500,750),query.substring(750,1000),query.substring(1000,1250),query.substring(1250,1500),query.substring(1500,1750),query.substring(1750,2000),query.substring(2000,2250),query.substring(2250,2500));
		} catch(e) {
			this.error(e);
			
			this.bannerMessage("webmyth2", "There was an error with the last query.");
		}
	},
	mysqlPluginExecute: function(inSender, functionName, query) {
		if(debug) this.log("mysqlPluginExecute - "+functionName+": "+query);
		
		this.functionName = functionName;
		this.query = query;

		try {
			this.$.plugin.callPluginMethodDeferred(enyo.bind(this,this.mysqlPluginDelayedResponse),"mysqlExecute",WebMyth.prefsCookie.databaseHost,WebMyth.prefsCookie.databaseUsername,WebMyth.prefsCookie.databasePassword,WebMyth.prefsCookie.databaseName,WebMyth.prefsCookie.databasePort,functionName,query.substring(0,250),query.substring(250,500),query.substring(500,750),query.substring(750,1000),query.substring(1000,1250),query.substring(1250,1500),query.substring(1500,1750),query.substring(1750,2000),query.substring(2000,2250),query.substring(2250,2500));
		} catch(e) {
			this.error(e);
			
			this.bannerMessage("webmyth2", "There was an error with the last query.");
		}	
	},
	mythprotocolPluginCommand: function(inSender, paneName, functionName, command) {
		if(debug) this.log("mythprotocolPluginCommand - "+paneName+" - "+functionName+": "+command);

		var response = this.$.plugin.callPluginMethod("mythprotocolCommand",WebMyth.prefsCookie.masterBackendIp,WebMyth.prefsCookie.masterBackendPort,WebMyth.prefsCookie.protoVer,command);
		
		if(debug) this.log("mythprotocolPluginCommand response: "+response);
		
		switch(paneName) {
			case "recorded": 
				if(functionName == "deleteRecordingResponse") this.$.recorded.deleteRecordingResponse(response);
				break;
			case "setupschedule":
				if(functionName == "rescheduleResponse") this.$.setupschedule.rescheduleResponse(response);
				break;
				
		}		
		
	},
	mythprotocolBackgroundPluginCommand: function(inSender, command) {
		if(debug) this.log("mythprotocolBackgroundPluginCommand: "+command);

		var response = this.$.plugin.callPluginMethodDeferred(enyo.bind(this,this.mysqlPluginDelayedResponse),"mythprotocolBackgroundCommand",WebMyth.prefsCookie.masterBackendIp,WebMyth.prefsCookie.masterBackendPort,WebMyth.prefsCookie.protoVer,command);
		
		if(debug) this.log("mythprotocolPluginCommand response: "+response);
		
	},
	remotePluginCommand: function(inSender, commandType, command) {
		if(debug) this.log("remotePluginCommand "+commandType+": "+command);
		
		var fullCommand = "";
		
		switch(commandType) {
			case "key":
				fullCommand = "key "+command;
				break;
			case "jump":
				fullCommand = "jump "+command;
				break;
			case "play":
				fullCommand = "play "+command;
				break;
			case "queryLocation":
				fullCommand = "query location";
				break;
			case "queryDetails":
				fullCommand = "query "+command;
				break;
			case "queryVolume":
				fullCommand = "query volume";
				break;
			case "sendChannel":
				fullCommand = command;
				break;
			case "testQuery": 
				fullCommand = "query location";
				break
		}
		
		var response = this.$.plugin.callPluginMethod("sendData",fullCommand);
		
		if(debug) this.log("remotePluginCommand response: "+response);
		
		if((response == "sendto() failed")||(response == "recvMsgSize == 0")) {
			//try once to reconnect and send command
			
			try {
			
				this.$.plugin.callPluginMethod("openFrontendSocket",WebMyth.prefsCookie.frontends[WebMyth.prefsCookie.frontendIndex].address,WebMyth.prefsCookie.frontends[WebMyth.prefsCookie.frontendIndex].port);
			
			
				response = this.$.plugin.callPluginMethod("sendData",fullCommand);
				
				if(debug) this.log("remotePluginCommand second response: "+response);
				
				if((response == "sendto() failed")||(response == "recvMsgSize == 0")) {
				
					this.bannerMessage("webmyth2", "Failed to connect to frontend");
					
				} else {
				
					response = response.substring(0,response.length-2);
				
					switch(commandType) {
						case "key":
							this.$.remote.sendKeySuccess("hybridPlugin",response);
							break;
						case "jump":
							this.$.remote.sendJumpSuccess("hybridPlugin",response);
							break;
						case "play":
							this.$.remote.sendPlaySuccess("hybridPlugin",response);
							break;
						case "queryLocation":
							this.$.remote.queryLocationSuccess("hybridPlugin",response);
							break;
						case "queryDetails":
							this.$.remote.queryDetailsSuccess("hybridPlugin",response);
							break;
						case "queryVolume":
							this.$.remote.queryVolumeSuccess("hybridPlugin",response);
							break;
						case "sendChannel":
							this.$.remote.sendChannelSuccess("hybridPlugin",response);
							break;
						case "testQuery":
							this.$.remote.testQuerySuccess("hybridPlugin",response);
							break;
					}
				
				}
				
			} catch(e) {
			
				this.error(e);
					
				this.bannerMessage("webmyth2", "Failed to connect to frontend");
					
				this.$.remote.stopLoop();
			
				
			}
			
		} else {
		
			response = response.substring(0,response.length-2);
		
			switch(commandType) {
				case "key":
					this.$.remote.sendKeySuccess("hybridPlugin",response);
					break;
				case "jump":
					this.$.remote.sendJumpSuccess("hybridPlugin",response);
					break;
				case "play":
					this.$.remote.sendPlaySuccess("hybridPlugin",response);
					break;
				case "queryLocation":
					this.$.remote.queryLocationSuccess("hybridPlugin",response);
					break;
				case "queryDetails":
					this.$.remote.queryDetailsSuccess("hybridPlugin",response);
					break;
				case "queryVolume":
					this.$.remote.queryVolumeSuccess("hybridPlugin",response);
					break;
				case "sendChannel":
					this.$.remote.sendChannelSuccess("hybridPlugin",response);
					break;
				case "testQuery":
					this.$.remote.testQuerySuccess("hybridPlugin",response);
					break;
			}
		}
		
	},
	remotePluginClose: function() {
		if(debug) this.log("remotePluginClose");
		
		this.$.plugin.callPluginMethodDeferred(enyo.bind(this,this.mysqlPluginDelayedResponse),"closeSocket");
	},
	mysqlPluginDelayedResponse: function(inResponse) {
		if(debug) this.log("mysqlPluginDelayedResponse: "+inResponse);
		
	},
	
	mysqlWelcomeGetSettings: function(inResponse){
		if(debug) this.log("mysqlWelcomeGetSettings");
		
		this.$.welcome.settingsResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	
	mysqlRemoteGetVideoDetails: function(inResponse){
		if(debug) this.log("mysqlRemoteGetVideoDetails");
		
		this.$.remote.videoDetailsSuccess("hybridPlugin",enyo.json.parse(inResponse));
	},
	
	mysqlRecordedGetPeople: function(inResponse){
		if(debug) this.log("mysqlRecordedGetPeople");
		
		this.$.recorded.peopleResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	mysqlRecordedGetJobqueue: function(inResponse){
		if(debug) this.log("mysqlRecordedGetJobqueue");
		
		this.$.recorded.jobqueueResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	mysqlRecordedUndeleteRecording: function(inResponse){
		if(debug) this.log("mysqlRecordedUndeleteRecording");
		
		this.$.recorded.undeleteRecordingResponse("hybridPlugin",inResponse);
	},
	mysqlRecordedQueueJob: function(inResponse){
		if(debug) this.log("mysqlRecordedQueueJob");
		
		this.$.recorded.scheduleJobResponse("hybridPlugin",inResponse);
	},
	
	backgroundProtocolCommandResponse: function(inResponse){
		if(debug) this.log("backgroundProtocolCommandResponse while on pane: "+this.currentPane);
		
		switch(this.currentPane) {
			case "upcoming":
				this.$.upcoming.upcomingResponse("hybridPlugin",parseUpcomingPlugin(inResponse));
				break;
			case "exhibition":
				this.$.exhibition.getUpcomingResponse("hybridPlugin",parseUpcomingPlugin(inResponse));
				break;
		}
	},
	mysqlUpcomingGetPeople: function(inResponse){
		if(debug) this.log("mysqlUpcomingGetPeople");
		
		this.$.upcoming.peopleResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	
	mysqlGuideGetPeople: function(inResponse){
		if(debug) this.log("mysqlGuideGetPeople");
		
		this.$.guide.peopleResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	
	mysqlSearchPeopleGetProgramsPeople: function(inResponse){
		if(debug) this.log("mysqlSearchPeopleGetProgramsPeople");
		
		this.$.searchPeople.searchPeopleProgramsResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	mysqlSearchPeopleGetVideosPeople: function(inResponse){
		if(debug) this.log("mysqlSearchPeopleGetVideosPeople");
		
		this.$.searchPeople.searchPeopleVideosResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	mysqlSearchPeopleGetPrograms: function(inResponse){
		if(debug) this.log("mysqlSearchPeopleGetPrograms");
		
		this.$.searchPeople.getProgramsResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	mysqlSearchPeopleGetVideos: function(inResponse){
		if(debug) this.log("mysqlSearchPeopleGetPeople");
		
		this.$.searchPeople.getVideosResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	mysqlSearchPeopleGetPeople: function(inResponse){
		if(debug) this.log("mysqlSearchPeopleGetPeople");
		
		this.$.searchPeople.peopleResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	
	mysqlSearchTitleGetPrograms: function(inResponse){
		if(debug) this.log("mysqlSearchTitleGetPrograms");
		
		this.$.searchTitle.searchTitleProgramsResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	mysqlSearchTitleGetPeople: function(inResponse){
		if(debug) this.log("mysqlSearchTitleGetPeople");
		
		this.$.searchTitle.peopleResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	
	mysqlVideoGetVideos: function(inResponse){
		if(debug) this.log("mysqlVideoGetVideos");
		
		this.$.video.videosResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	mysqlVideoGetStorageGroups: function(inResponse){
		if(debug) this.log("mysqlVideoGetStorageGroups");
		
		this.$.video.storageGroupsResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	mysqlVideoGetUpnp: function(inResponse){
		if(debug) this.log("mysqlVideoGetUpnp");
		
		this.$.video.upnpResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	mysqlVideoGetPeople: function(inResponse){
		if(debug) this.log("mysqlVideoGetPeople");
		
		this.$.video.peopleResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	
	mysqlMusicGetMusic: function(inResponse){
		if(debug) this.log("mysqlMusicGetMusic");
		
		this.$.music.musicResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	mysqlMusicGetPlaylists: function(inResponse){
		if(debug) this.log("mysqlMusicGetPlaylists");
		
		this.$.music.getPlaylistResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	mysqlMusicSavePlaylist: function(inResponse, inInsertId){
		if(debug) this.log("mysqlMusicSavePlaylist");
		
		this.$.music.savePlaylistResponse("hybridPlugin",inResponse, inInsertId);
	},
	
	mysqlBackendlogGetLog: function(inResponse){
		if(debug) this.log("mysqlBackendlogGetLog");
		
		this.$.backendlog.getLogResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	
	mysqlBackendstatusGetInputs: function(inResponse){
		if(debug) this.log("mysqlBackendstatusGetInputs");
		
		this.$.backendstatus.getInputsResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	
	mysqlSetupscheduleGetInputs: function(inResponse){
		if(debug) this.log("mysqlSetupscheduleGetInputs");
		
		this.$.setupschedule.getInputsResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	mysqlSetupscheduleGetRule: function(inResponse){
		if(debug) this.log("mysqlSetupscheduleGetRule");
		
		this.$.setupschedule.getRuleResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	mysqlSetupscheduleSaveRule: function(inResponse, inInsertId){
		if(debug) this.log("mysqlSetupscheduleSaveRule");
		
		this.$.setupschedule.saveRuleResponse("hybridPlugin",inResponse, inInsertId);
	},
	
	mysqlExhibitionGetInputs: function(inResponse){
		if(debug) this.log("mysqlExhibitionGetInputs");
		
		this.$.exhibition.getInputsResponse("hybridPlugin",enyo.json.parse(inResponse));
	},
	
});


