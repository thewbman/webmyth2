/* adsf*/


enyo.kind({ name: "welcome",
	kind: "VFlexBox",
	className: "welcome enyo-view",
	published: {
		phonePixels: 500,
		viewMode: "tablet",
	},
	events: {
		onBannerMessage: "", 
		onFirstUse: "",
		onSelectMode: "",
		onHaveImageView: "",
		onSavePreferences: "",
		onMysqlPluginCommand: "",
	},
	
	components: [
	
		{name: "streamVideoService", kind: "PalmService", service: "palm://com.palm.applicationManager/", method: "launch"},
			
		{name: "getConnectionInfoService", kind: "WebService", handleAs: "xml", onSuccess: "connectionInfoResponse", onFailure: "connectionInfoFailure"},
		{name: "getSettingsService", kind: "WebService", handleAs: "json", onSuccess: "settingsResponse", onFailure: "settingsFailure"},
			
			{kind: "NetworkAlerts", onTap: "networkAlertsTapHandler"},
			
			{name: "header", kind: "Toolbar", components: [
				{kind: "Image", src: "webmyth2-28x28.png", onclick: "headerIconClick", style: "padding-right: 4px"},
				{kind: "VFlexBox", flex: 1, components: [
					{content: "WebMyth2", kind: "Control", className: "headerTitle"},
					{name: "headerSubtitle", content: "Master Backend", kind: "Control", className: "headerSubtitle"},
				]},
				{name: "welcomeRightMenuSpacer", kind: "Control", width: "32px"},
				{name: "welcomeSpinner", kind: "Spinner"},
			]},
			
			{name: "welcomeScroller", kind: "Scroller", autoHorizontal: false, horizontal: false, autoVertical: true, flex: 1, components: [
				{kind: "HFlexBox", components: [
					{flex: 1},
					{name: "remote", kind: "Button", width: "290px", content: "Remote", onclick: "selectButton"},
					{flex: 1},
				]},
				{kind: "HFlexBox", components: [
					{flex: 1},
					{name: "recorded", kind: "Button", width: "130px", content: "Recorded", onclick: "selectButton"},
					{name: "upcoming", kind: "Button", width: "130px", content: "Upcoming", onclick: "selectButton"},
					{flex: 1},
				]},
				{kind: "HFlexBox", components: [
					{flex: 1},
					{name: "guide", kind: "Button", width: "290px", content: "Guide", onclick: "selectButton"},
					{flex: 1},
				]},
				{kind: "HFlexBox", components: [
					{flex: 1},
					{name: "searchPeople", kind: "Button", width: "130px", content: "Search People", onclick: "selectButton"},
					{name: "searchTitle", kind: "Button", width: "130px", content: "Search Title", onclick: "selectButton"},
					{flex: 1},
				]},
				{kind: "HFlexBox", components: [
					{flex: 1},
					{name: "video", kind: "Button", width: "130px", content: "Video", onclick: "selectButton"},
					{name: "music", kind: "Button", width: "130px", content: "Music", onclick: "selectButton"},
					{flex: 1},
				]},
				{kind: "HFlexBox", components: [
					{flex: 1},
					{name: "backendstatus", kind: "Button", width: "130px", content: "Status", onclick: "selectButton"},
					{name: "backendlog", kind: "Button", width: "130px", content: "Log", onclick: "selectButton"},
					{flex: 1},
				]},
				{kind: "HFlexBox", components: [
					{flex: 1},
					{name: "preferences", kind: "Button", width: "290px", content: "Preferences", onclick: "selectButton"},
					{flex: 1},
				]},
				{kind: "HFlexBox", components: [
					{flex: 1},
					{name: "help", kind: "Button", width: "290px", content: "Help", onclick: "selectButton"},
					{flex: 1},
				]},
				//{kind: "HFlexBox", components: [
					//{flex: 1},
					//{name: "stream", kind: "Button", width: "290px", content: "Stream", onclick: "streamButton"},
					//{flex: 1},
				//]},
				//kind: "HFlexBox", components: [
					//flex: 1},
					//name: "exhibition", kind: "Button", width: "290px", content: "Exhibition", onclick: "selectButton"},
					//flex: 1},
				//]},
				{content: "&nbsp;"},
			]},
		
	],
	
	create: function() {
		if(debug) this.log("create");
		this.inherited(arguments);
		
	},
	
	//Externally called functions
	activate: function() {
		if(debug) this.log("activate");
		//this.render();
		
		var requestUrl = "";
		
		if(WebMyth.prefsCookie.mythwebXml) {
			
			requestUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetConnectionInfo?MythXMLKey=";
			requestUrl += WebMyth.prefsCookie.MythXML_key;
			
		} else {
			
			//still under /Myth/ in 0.25 DBSchemeVer
			requestUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":"+WebMyth.prefsCookie.masterBackendXmlPort+"/Myth/GetConnectionInfo";
			
		}
		
		this.$.headerSubtitle.setContent(WebMyth.prefsCookie.masterBackendIp);
		
		//if(debug) this.log("requestUrl: "+requestUrl);
		this.$.getConnectionInfoService.setUrl(requestUrl);
		
		if((WebMyth.prefsCookie.webserverName == "-")||(WebMyth.prefsCookie.masterBackendIp == "-")) {
			
			//this.bannerMessage("You must setup the backend IP in the preferences");
			
			//var countdown = setTimeout(enyo.bind(this, "bannerMessage","You must setup the backend IP in the preferences"), 1000);
			
			this.doFirstUse();
			
			//this.getSettings();
			//
			
		} else if(WebMyth.prefsCookie.databaseHost == "-") {
		
			this.$.welcomeSpinner.show();
			this.$.welcomeRightMenuSpacer.hide();
		
			this.$.getConnectionInfoService.call();
			
		} else if((WebMyth.finishedGettingConnectionInfo)||(WebMyth.prefsCookie.manualDatabase)) {
			//we already got info for today or using manual settings or recently cleared in preferences
			//if(debug) this.log("not actually doing connectionInfoCall");
			
			if(this.completedSettingsResponse) {
				//already got settings too
			} else {
		
				this.$.welcomeSpinner.show();
				this.$.welcomeRightMenuSpacer.hide();
				
				this.getSettings();
			}
			
		} else {
		
			this.$.welcomeSpinner.show();
			this.$.welcomeRightMenuSpacer.hide();
			
			this.$.getConnectionInfoService.call();
		}
		
		if(window.PalmSystem) this.$.networkAlerts.push({type: "Data"});
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
	selectButton: function(inSender) {
		if(debug) this.log("selectButton with "+inSender.getName());
		this.doSelectMode(inSender.getName());
	},
	streamButton: function(inSender) {
		if(debug) this.log("streamButton with "+inSender.getName());
		
		var filenameRequestUrl = "http://192.168.1.105:6544/Content/GetFile?StorageGroup=Streaming&FileName=1311_20120424195600.mpg.480x272_512kV_64kA.m3u8";
		
		if(window.PalmSystem) {
			this.$.streamVideoService.call({id: "com.palm.app.videoplayer", target: filenameRequestUrl, params: {target: filenameRequestUrl}});
		} else {
			window.open(filenameRequestUrl);
		}
	},
	headerIconClick: function() {
		if(debug) this.log("headerIconClick");
		
		//this.doHaveImageView("webmyth2-icon2.png");
		this.doFirstUse();
	},
	networkAlertsTapHandler: function(inSender, inResponse){
		if(debug) this.log("networkAlertsTapHandler: "+enyo.json.stringify(inResponse));
	},
	
	//Welcome functions
	connectionInfoResponse: function(inSender, inResponse) {
		if(debug) this.log("connectionInfoResponse");
		
		WebMyth.finishedGettingConnectionInfo = true;
		
		var xmlobject = inResponse;
		
		//Local variables
		var topNode, topNodesCount, topSingleNode, infoNode, databaseNode, versionNode, versionChildNode;
		var singleHostJson = {};
		var Count;
	
	
		//Start parsing
		topNode = xmlobject.getElementsByTagName("GetConnectionInfoResponse")[0];
		if(topNode)
		{
			if(debug) this.log("parsing connection info as < 0.25");
			
			var topNodesCount = topNode.childNodes.length;
			for(var i = 0; i < topNodesCount; i++) {
				topSingleNode = topNode.childNodes[i];
				switch(topSingleNode.nodeName) {
					case 'Info':
						infoNode = topSingleNode;
						
						for(var j = 0; j < infoNode.childNodes.length; j++) {
							switch(infoNode.childNodes[j].nodeName) {
								case 'Database':
									databaseNode = infoNode.childNodes[j];
									
									for(var k = 0; k < databaseNode.childNodes.length; k++) {
										switch(databaseNode.childNodes[k].nodeName) {
											case 'Host':
												WebMyth.prefsCookie.databaseHost = databaseNode.childNodes[k].childNodes[0].nodeValue;
											  break;
											case 'Port':
												WebMyth.prefsCookie.databasePort = databaseNode.childNodes[k].childNodes[0].nodeValue;
											  break;
											case 'UserName':
												WebMyth.prefsCookie.databaseUsername = databaseNode.childNodes[k].childNodes[0].nodeValue;
											  break;
											case 'Password':
												WebMyth.prefsCookie.databasePassword = databaseNode.childNodes[k].childNodes[0].nodeValue;
											  break;
											case 'Name':
												WebMyth.prefsCookie.databaseName = databaseNode.childNodes[k].childNodes[0].nodeValue;
											  break;
										}
									}
								
								  break;
								  
							}
						}
					
					  break;
				}
			}
		}
		else
		{
			//0.25
			topNode = xmlobject.getElementsByTagName("ConnectionInfo")[0];
			
			if(debug) this.log("parsing connection info as 0.25");
			
			var topNodesCount = topNode.childNodes.length;
			for(var i = 0; i < topNodesCount; i++) {
				topSingleNode = topNode.childNodes[i];
				switch(topSingleNode.nodeName) {
					case 'Version':
			
						versionNode = topSingleNode;
					
						//if(debug) this.log("inside version node of length: "+versionNode.childNodes.length);
						
						for(var k = 0; k < versionNode.childNodes.length; k++) {
							switch(versionNode.childNodes[k].nodeName) {
								case 'Version':
									//WebMyth.prefsCookie.databaseHost = versionNode.childNodes[k].childNodes[0].nodeValue;
								  break;
								case 'Branch':
									//WebMyth.prefsCookie.databasePort = versionNode.childNodes[k].childNodes[0].nodeValue;
								  break;
								case 'Protocol':
									WebMyth.prefsCookie.protoVer = versionNode.childNodes[k].childNodes[0].nodeValue;
								  break;
								case 'Binary':
									WebMyth.prefsCookie.mythBinaryVer = versionNode.childNodes[k].childNodes[0].nodeValue;
								  break;
								case 'Schema':
									WebMyth.prefsCookie.DBSchemaVer = versionNode.childNodes[k].childNodes[0].nodeValue;
								  break;
							}
						}
							
					  break;
					case 'Database':
						
						databaseNode = topSingleNode;
					
						//if(debug) this.log("inside database node of length: "+databaseNode.childNodes.length);
						
						for(var j = 0; j < databaseNode.childNodes.length; j++) {
							switch(databaseNode.childNodes[j].nodeName) {
								case 'Host':
									WebMyth.prefsCookie.databaseHost = databaseNode.childNodes[j].childNodes[0].nodeValue;
								  break;
								case 'Port':
									WebMyth.prefsCookie.databasePort = databaseNode.childNodes[j].childNodes[0].nodeValue;
								  break;
								case 'UserName':
									WebMyth.prefsCookie.databaseUsername = databaseNode.childNodes[j].childNodes[0].nodeValue;
								  break;
								case 'Password':
									WebMyth.prefsCookie.databasePassword = databaseNode.childNodes[j].childNodes[0].nodeValue;
								  break;
								case 'Name':
									WebMyth.prefsCookie.databaseName = databaseNode.childNodes[j].childNodes[0].nodeValue;
								  break;
							}
						}
								 
					
					  break;
					default:
						
						if(debug) this.log("inside other node: "+topSingleNode.nodeName);
					  break;
				}
			}
			
		}
			
			
		//if(debug) this.log("new DB settings: "+WebMyth.prefsCookie.databaseHost+WebMyth.prefsCookie.databasePort+WebMyth.prefsCookie.databaseUsername+WebMyth.prefsCookie.databaseName);
		
		if((WebMyth.prefsCookie.databaseHost == "127.0.0.1")||(WebMyth.prefsCookie.databaseHost == "localhost")||(WebMyth.prefsCookie.databaseHost.toUpperCase().indexOf("SOCK")>=0)){
			this.log("converting databaseHost from "+WebMyth.prefsCookie.databaseHost+" to "+WebMyth.prefsCookie.masterBackendIp);
			WebMyth.prefsCookie.databaseHost = WebMyth.prefsCookie.masterBackendIp;
			WebMyth.prefsCookie.manualDatabase = true;
		}
		
		this.getSettings();
		
	
	},
	connectionInfoFailure: function() {
		this.error("connectionInfoFailure");
	},
	getSettings: function(){
		if(debug) this.log("getSettings");
		
		var query = "SELECT `data`, `value`, `hostname` FROM `settings`  WHERE ";
		query += " `value` = 'AutoCommercialFlag'";
		query += " OR `value` = 'AutoTranscode' ";
		query += " OR `value` = 'AutoRunUserJob1' ";
		query += " OR `value` = 'AutoRunUserJob2' ";
		query += " OR `value` = 'AutoRunUserJob3' ";
		query += " OR `value` = 'AutoRunUserJob4' ";
		query += " OR `value` = 'DefaultStartOffset' ";
		query += " OR `value` = 'DefaultEndOffset' ";
		query += " OR `value` = 'UserJobDesc1' ";
		query += " OR `value` = 'UserJobDesc2' ";
		query += " OR `value` = 'UserJobDesc3' ";
		query += " OR `value` = 'UserJobDesc4' ";
		query += " OR `value` = 'MasterServerIP' ";
		query += " OR `value` = 'MasterServerPort' ";
		query += " OR `value` = 'BackendServerIP' ";
		query += " OR `value` = 'NetworkControlPort' ";
		query += " OR `value` = 'BackendServerPort' ";
		query += " OR `value` = 'MythXML_on' ";
		query += " OR `value` = 'MythXML_key' ";
		query += " OR `value` = 'DBSchemaVer' ";
		query += " UNION SELECT COUNT(*) AS `data`, 'music_songs' as `value`, 'all' AS `hostname` FROM `music_songs`";
		query += " ;";
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQLwithResponse";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.getSettingsService.setUrl(requestUrl);
			this.$.getSettingsService.call();
		
		} else {
		
			this.doMysqlPluginCommand("mysqlWelcomeGetSettings", query);
			
		}
	},
	settingsResponse: function(inSender, inResponse) {
		if(debug) this.log("settingsResponse");
		//if(debug) this.log("settingsResponse: "+enyo.json.stringify(inResponse));
		
		var fullList = inResponse;
		
		var hosts = [];
		var controlPorts = [];
		var backendPorts = [];
		var hostObject = {}, portObject = {}, backendObject;
	
		var i, j, k, l, s = {}, t = {};
	
		WebMyth.prefsCookie.backends.length = 0;
	
		for(i = 0; i < fullList.length; i++) {
			s = fullList[i];
			
			if(s.value == "AutoCommercialFlag") {
				WebMyth.prefsCookie.AutoCommercialFlag = s.data;
			} else if(s.value == "AutoTranscode") {
				WebMyth.prefsCookie.AutoTranscode = s.data;
			} else if(s.value == "AutoRunUserJob1") {
				WebMyth.prefsCookie.AutoRunUserJob1 = s.data;
			} else if(s.value == "AutoRunUserJob2") {
				WebMyth.prefsCookie.AutoRunUserJob2 = s.data;
			} else if(s.value == "AutoRunUserJob3") {
				WebMyth.prefsCookie.AutoRunUserJob3 = s.data;
			} else if(s.value == "AutoRunUserJob4") {
				WebMyth.prefsCookie.AutoRunUserJob4 = s.data;
			} else if(s.value == "DefaultStartOffset") {
				WebMyth.prefsCookie.DefaultStartOffset = parseInt(s.data);
			} else if(s.value == "DefaultEndOffset") {
				WebMyth.prefsCookie.DefaultEndOffset = parseInt(s.data);
			} else if(s.value == "UserJobDesc1") {
				WebMyth.prefsCookie.UserJobDesc1 = s.data;
			} else if(s.value == "UserJobDesc2") {
				WebMyth.prefsCookie.UserJobDesc2 = s.data;
			} else if(s.value == "UserJobDesc3") {
				WebMyth.prefsCookie.UserJobDesc3 = s.data;
			} else if(s.value == "UserJobDesc4") {
				WebMyth.prefsCookie.UserJobDesc4 = s.data;
			} else if(s.value == "DBSchemaVer") {
				WebMyth.prefsCookie.DBSchemaVer = s.data;
			} else if(s.value == "MasterServerIP") {
				WebMyth.prefsCookie.MasterServerIP = s.data;
			} else if(s.value == "MasterServerPort") {
				WebMyth.prefsCookie.masterBackendPort = s.data;
			} else if(s.value == "BackendServerIP") {
				hostObject = { "hostname": s.hostname, "ip": s.data, "master": false };
				WebMyth.prefsCookie.backends.push(hostObject);
			} else if(s.value == "NetworkControlPort") {
				portObject = { "hostname": s.hostname, "NetworkControlPort": s.data };
				controlPorts.push(portObject);
			} else if(s.value == "BackendServerPort") {
				backendObject = { "hostname": s.hostname, "BackendServerPort": s.data };
				backendPorts.push(backendObject);
			} else if(s.value == "MythXML_on") {
				WebMyth.prefsCookie.MythXML_on = s.data;
			} else if(s.value == "MythXML_key") {
				WebMyth.prefsCookie.MythXML_key = s.data;
			} else if(s.value == "music_songs") {
				WebMyth.prefsCookie.music_songs = parseInt(s.data);
			}
			
		}
		
		for(j = 0; j < WebMyth.prefsCookie.backends.length; j++) {
			t = WebMyth.prefsCookie.backends[j];
			
			if(t.ip == WebMyth.prefsCookie.MasterServerIP) {
				t.master = true;
			}
			
			for(k = 0; k < controlPorts.length; k++) {
				if(t.hostname == controlPorts[k].hostname) {
					t.NetworkControlPort = controlPorts[k].NetworkControlPort;
				}
			}
			
			for(l = 0; l < backendPorts.length; l++) {
				if(t.hostname == backendPorts[l].hostname) {
					t.BackendServerPort = backendPorts[l].BackendServerPort;
				}
			}
		}	
		
		//if(debug) this.log("updating prefs cookie: "+enyo.json.stringify(WebMyth.prefsCookie));
		
		enyo.setCookie("webmyth2-prefs", enyo.json.stringify(WebMyth.prefsCookie));
		
		this.completedSettingsResponse = true;
		
		this.$.welcomeSpinner.hide();
		this.$.welcomeRightMenuSpacer.show();
		
	},
	settingsFailure: function() {
		this.error("settingsFailure");
		
		this.$.welcomeSpinner.hide();
		this.$.welcomeRightMenuSpacer.show();
	},
	
});