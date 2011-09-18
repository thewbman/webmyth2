/* adsf*/

var lotsOfText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sollicitudin malesuada felis quis dapibus. Maecenas ac ipsum at nunc euismod tincidunt. Phasellus laoreet dictum arcu, id cursus lorem malesuada ut. Curabitur ornare, arcu quis hendrerit auctor, ligula purus luctus purus, at fermentum neque orci a velit. In sed sapien diam. Maecenas ut diam non ligula luctus auctor. Donec id urna vel urna tempor accumsan at et justo. Morbi iaculis pharetra neque. Quisque quis porttitor sapien. Duis vulputate ultricies enim, sit amet euismod elit imperdiet id. Morbi nec nisl lacus, sit amet vehicula justo. Nullam iaculis, velit adipiscing varius egestas, turpis purus aliquet augue, eu gravida augue lorem quis purus.Proin commodo egestas dui eget eleifend. Suspendisse potenti. Nulla nec neque ut tortor porttitor semper quis nec sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi vehicula purus ut ante placerat accumsan a consectetur tortor. Vestibulum faucibus congue elit non consequat. Ut ultrices suscipit erat id ultrices. Morbi facilisis tempus purus vel malesuada. Vivamus tincidunt, sapien quis tristique adipiscing, risus nisl convallis dui, sit amet pellentesque turpis nunc elementum augue. Nulla facilisis, nulla et accumsan fringilla, dui nunc luctus massa, ut interdum mi urna a nisl.Nullam in mi vel diam posuere gravida at a augue. Aenean gravida, felis ut rutrum sagittis, turpis enim egestas massa, non accumsan velit mi eu lectus. Cras at nisl et mi varius euismod id vitae leo. Suspendisse potenti. Nunc vel tortor urna. Praesent euismod laoreet turpis non dignissim. Curabitur neque sapien, iaculis sed venenatis sed, congue ac lorem. Nam pretium, mi a gravida mollis, dui mi blandit leo, sed ullamcorper nibh lacus id turpis. Quisque at elit tristique diam accumsan aliquet. Proin a orci in arcu sollicitudin gravida a sed lectus. Pellentesque lorem tortor, ultricies in feugiat mattis, dignissim ac nisl. Cras et nulla sit amet velit porttitor blandit at a tellus. In hac habitasse platea dictumst. Integer massa lacus, mattis at pharetra non, pharetra eu massa. Donec dictum justo et tellus pulvinar ac mollis arcu accumsan. Nullam elementum mi eu lacus euismod ultricies tempus arcu vestibulum. Phasellus egestas ullamcorper lorem, eu cursus arcu mollis ut. Phasellus sollicitudin lobortis dui a viverra. Cras sit amet ante ligula, sit amet iaculis urna. Aenean vitae nunc nec orci euismod aliquet et eget enim.Maecenas porttitor nunc eu nisl congue mattis. Nullam vel hendrerit turpis. Praesent posuere consectetur est, quis dignissim ipsum vestibulum ac. Duis quis elit augue. Fusce eleifend, ligula eu aliquam molestie, urna lorem consectetur nisi, consectetur sodales justo nisl iaculis urna. Maecenas sed bibendum velit. Pellentesque faucibus eleifend purus id tempus. Aliquam erat volutpat. Vestibulum eget metus dui, sed pharetra turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Cras elementum mi fringilla velit fringilla tincidunt.Phasellus volutpat, augue vitae feugiat tempor, turpis velit congue velit, sed ultrices tortor turpis sed libero. Praesent condimentum rutrum metus vel facilisis. Morbi sollicitudin orci et augue pharetra sit amet suscipit orci volutpat. Integer et turpis id mauris volutpat sagittis eu vel risus. Morbi egestas, diam a ultrices consectetur, ligula eros luctus ligula, quis placerat tortor arcu eu mi. Proin vitae enim sed lorem dapibus vestibulum congue ut nulla. Sed eu mauris vitae ante sagittis faucibus. Praesent mi leo, porta blandit interdum vitae, bibendum facilisis dui. Nulla facilisi. Duis quis lacinia libero. Proin vel dolor diam, non dapibus sapien. Integer non porta quam. Nulla viverra urna sit amet urna pulvinar quis faucibus metus posuere. Donec placerat dapibus dui a vehicula.";

var defaultProgram = {title: "", subtitle: "", description: "", category: "", airdate: "", seriesid: "", programid: "", channum: "", channelname: "", channame: "", starttime: "", endtime: "", hostname: "", recgroup: "", recstartts: "", filesize: "", recstatus: "100", cardid: "", intid: "", plot: "", releasedate: "", fullEpisode: "", filename: ""};

function defaultCookie() {

	//These values are initiated in 'welcome' scene if not set

	var newCookieObject = {
		
		masterBackendIp: '-',
		masterBackendPort: 6543,
		masterBackendXmlPort: 6544,
		
		manualDatabase: false,
		databaseHost: '-',
		databasePort: '3306',
		databaseUsername: '',
		databasePassword: '',
		databaseName: 'mythconverg',
		
		webserverName: '-',
		webserverUsername: '',	
		webserverPassword: '',	
		useScript: 0,	
		mythwebXml: false,	
		MythXML_key: "DefaultKey",
		webmythPythonFile: "/cgi-bin/webmyth.py",
		allowDownloads: false,
		
		showChannelIcons: true,
		showVideoListImages: true,
		showVideoDetailsImage: true,
		forceScriptScreenshots: false,
		
		remoteHeader: "Nothing",
		remoteVibrate: false,
		remoteFullscreen: false,
		playJumpRemote: true,
		livetvJumpRemote: false,
		remoteDashboard: true,
		dashboardRemoteIndex: 1,
		
		allowedOrientation: 'free',
		
		remotePane: "Navigation",
		recGroup: "Default",
		recSort: "Date [Desc][]:[]Original Airdate [Asc]",
		upcomingGroup: "Upcoming",
		guideSort: "Default",	//asdf
		searchSort: "Date [Asc]",
		searchPeopleSort: "Date [Asc]",
		videosSort: "Title [Asc][]:[]Season [Asc]",
		videosGroup: "Directory",
		musicSort: "artist-asc",	//asdf
		
		recentGuideChannels: [],
		
		frontendIndex: 0,
		
		protoVer: "TBD",
		protoVerSubmitted: false,
		mythBinaryVer: 'TBD',
		mythXmlVer: "0.0",
		guideXmlVer: "0.0",
		dvrXmlVer: "0.0",
		contentXmlVer: "0.0",
		
		backends: [],
		frontends: [],
		
		AutoCommercialFlag: 1,
		AutoTranscode: 0,
		AutoRunUserJob1: 0,
		AutoRunUserJob2: 0,
		AutoRunUserJob3: 0,
		AutoRunUserJob4: 0,
		DefaultStartOffset: 0,
		DefaultEndOffset: 0,
		UserJobDesc1: "UserJob1",
		UserJobDesc2: "UserJob2",
		UserJobDesc3: "UserJob3",
		UserJobDesc4: "UserJob4",
		
		music_songs: 0,
		
		allowMetrix: true, 
		
		debug: false,
		
		DBSchemaVer: 0,
		
	};
	
	return newCookieObject;
};


var intToBool = function(inNumber) {
	
	if(inNumber == 0) {
		return false;
	} else {
		return true;
	}
	
}

var boolToInt = function(inBool) {
	
	if(inBool == true) {
		return 1;
	} else {
		return 0;
	}
	
}


var sort_by = function(field, reverse, primer){

   reverse = (reverse) ? -1 : 1;

   return function(a,b){

       a = a[field];
       b = b[field];

       if (typeof(primer) != 'undefined'){
           a = primer(a);
           b = primer(b);
       }

       if (a<b) return reverse * -1;
       if (a>b) return reverse * 1;
       return 0;

   }
};

var double_sort_by = function(field1, field2, reverse, primer){

   reverse = (reverse) ? -1 : 1;

   return function(a,b){

       a = a[field1]+"_"+a[field2];
       b = b[field1]+"_"+b[field2];

       if (typeof(primer) != 'undefined'){
           a = primer(a);
           b = primer(b);
       }

       if (a<b) return reverse * -1;
       if (a>b) return reverse * 1;
       
	   return 0;

   }
};

var triple_sort_by = function(field1, field2, field3, reverse, primer){

   reverse = (reverse) ? -1 : 1;

   return function(a,b){

       a = a[field1]+"_"+a[field2]+"_"+a[field3];
       b = b[field1]+"_"+b[field2]+"_"+b[field3];

       if (typeof(primer) != 'undefined'){
           a = primer(a);
           b = primer(b);
       }

       if (a<b) return reverse * -1;
       if (a>b) return reverse * 1;
       
	   return 0;

   }
};

var guide_sort_by = function(field, reverse, primer){

   reverse = (reverse) ? -1 : 1;

   return function(a,b){

       a = a[0][field];
       b = b[0][field];

       if (typeof(primer) != 'undefined'){
           a = primer(a);
           b = primer(b);
       }

       if (a<b) return reverse * -1;
       if (a>b) return reverse * 1;
       return 0;

   }
};

var trimList = function(fullList,filterField,inValue) {

	var finalList = [];
	
	//console.log("about to trim list of length "+fullList.length+" with field '"+filterField+"' by value '"+inValue+"'");
	
	var i, s = {};
	
	for(i = 0; i < fullList.length; i++) {
		s = {};
		s = fullList[i];
		
		if((inValue == "")||(s[filterField] == inValue)) {
			finalList.push(s);
		} else {
			//not matching filter - dont add
		}

	}
	
	return finalList;
	
}

var trimListSearch = function(fullList,filterField,inValue) {

	//returns all that match a text search insteda of 100% match
	var finalList = [];
	
	//console.log("about to trim list of length "+fullList.length+" with field '"+filterField+"' by value '"+inValue+"'");
	
	var i, s = {};
	
	for(i = 0; i < fullList.length; i++) {
		s = {};
		s = fullList[i];
		
		if((inValue == "")||(s[filterField].toUpperCase().indexOf(inValue.toUpperCase()) >= 0 )) {
		
			finalList.push(s);
			
		} else {
			//not matching filter - dont add
		}

	}
	
	return finalList;
	
}

var cleanListGroup = function(fullList,filterField,extraField) {

	var finalList = [];
	
	var i, j = -1, s = {}, currentLabel = 'asdf', currentGroup = 'asdf';
	
	fullList.sort(sort_by(filterField, false));
	
	//console.log("finished sorting cleanListGroup");
	
	for(i = 0; i < fullList.length; i++) {
		s = {};
		s = fullList[i];
		
		if(s[filterField] == currentLabel) {
			//Same recgroup as last, just add to counter
			//console.log("trying to update finalList ("+enyo.json.stringify(finalList)+") at index "+j);
			finalList[j].count++;
			//j++;
		} else {
			//console.log("new title, adding to list");
			s.count = 1;
			currentLabel = s[filterField];
			//finalList.push(s);
			finalList.push({label: s[filterField], value: s[filterField], extraField: s[extraField], count: s.count});
			j++;
		}

	}
	
	return finalList;
	
};

var cleanTitleList = function(fullList, inGroup) {

	var finalList = [];
	
	var i, j = -1, s = {}, currentLabel = 'asdf', currentGroup = 'asdf';
	
	fullList.sort(double_sort_by('label', 'group', false));
	
	//console.log("finished sorting cleanTitleList");
	
	for(i = 0; i < fullList.length; i++) {
		s = {};
		s = fullList[i];
		
		if(s.group.toUpperCase().indexOf(inGroup.toUpperCase()) < 0 ) {
			//not in our group filter, don't add to list
			//console.log("not in our group filter, don't add to list");
		} else if(s.label == currentLabel) {
			//Same recgroup as last, just add to counter
			//console.log("trying to update finalList ("+enyo.json.stringify(finalList)+") at index "+j);
			finalList[j].count++;
			//j++;
		} else {
			//console.log("new title, adding to list");
			s.count = 1;
			currentLabel = s.label;
			finalList.push(s);
			j++;
		}

	}
	
	return finalList;
	
};

var getBackendIP = function(fullBackendList, backendName, masterBackend) {   
	
	var returnIP = masterBackend;
	var i = 0;
	
	for(i = 0; i < fullBackendList.length; i++) {
		s = fullBackendList[i];
		
		if ((s.hostname == backendName)) {
			//Matches backend name
			if(s.master == true) {
				returnIP = masterBackend;
			} else {
				returnIP = s.ip;
			}
		} else {
			//Does not match
		}	
	
	}
	
	return returnIP;

};

var decodeJobqueueStatus = function(statusInt) {

	var statusText = "Unknown Status";
	
	switch(parseInt(statusInt)) {
		case 0:
			statusText = "Unknown";
			break;
		case 1:
			statusText = "Queued";
			break;
		case 2:
			statusText = "Pending";
			break;
		case 3:
			statusText = "Starting";
			break;
		case 4:
			statusText = "Running";
			break;
		case 5:
			statusText = "Stopped";
			break;
		case 6:
			statusText = "Paused";
			break;
		case 7:
			statusText = "Retry";
			break;
		case 8:
			statusText = "Erroring";
			break;
		case 9:
			statusText = "Aborting";
			break;
		case 256:
			statusText = "Done";
			break;
		case 272:
			statusText = "Finished";
			break;
		case 288:
			statusText = "Aborted";
			break;
		case 304:
			statusText = "Errored";
			break;
		case 320:
			statusText = "Cancelled";
			break;
		default: 
			statusText += " - "+statusInt;
			break;
	}
	
	return statusText;

}

var decodeJobqueueType = function(typeInt) {

	var typeText = "Unknown Type";
	
	switch(parseInt(typeInt)) {
		case 0:
			typeText = "System Job";
			break;
		case 1:
			typeText = "Transcode";
			break;
		case 2:
			typeText = "Commercial Flagging";
			break;
		case 256:
			typeText = WebMyth.prefsCookie.UserJobDesc1;
			break;
		case 512:
			typeText = WebMyth.prefsCookie.UserJobDesc2;
			break;
		case 1024:
			typeText = WebMyth.prefsCookie.UserJobDesc3;
			break;
		case 2048:
			typeText = WebMyth.prefsCookie.UserJobDesc4;
			break;
		default:
			typeText += " - "+typeInt;
			break;
	}
	
	return typeText;
	
}


/* Remote */
var timeToSeconds = function(inTime) {

	var seconds = 0;
	
	var timeArray = inTime.split(":");
	
	if(timeArray.length == 3) {
		seconds += parseInt(parseInt(timeArray[0])*3600);
		seconds += parseInt(parseInt(timeArray[1])*60);
		seconds += parseInt(parseInt(timeArray[2])*1);
	} else if(timeArray.length == 2) {
		seconds += parseInt(parseInt(timeArray[0])*60);
		seconds += parseInt(parseInt(timeArray[1])*1);
	} else if(timeArray.length == 1) {
		seconds += parseInt(parseInt(timeArray[0])*1);
	} 
	
	//console.log("inTime"+inTime+" "+timeArray[0]+" "+timeArray[1]+" "+timeArray[2]+" seconds"+seconds);
	
	return seconds;

}

var secondsToTime = function(inSeconds) {

	var fullTime = "";
	var intSeconds = parseInt(inSeconds);
	
	var hours = parseInt(intSeconds / 3600);
	var minutes = parseInt((intSeconds - (hours*3600)) / 60);
	var seconds = parseInt(intSeconds - (hours*3600) - (minutes*60));
	
	if(hours < 10) fullTime += "0";
	fullTime += hours;
	fullTime += ":";
	
	if(minutes < 10) fullTime += "0";
	fullTime += minutes;
	fullTime += ":";
	
	if(seconds < 10) fullTime += "0";
	fullTime += seconds;
	
	//console.log("inSeconds"+inSeconds+" intSeconds"+intSeconds+" hours"+hours+" minutes"+minutes+" seconds"+seconds);
	
	return fullTime;

}

var backendsToFrontends = function(backends) {

	var frontends = [];
	
	var s = {}, t = {};
	
	for(var i = 0; i < backends.length; i++) {
		s = backends[i];
		t = {};
		
		//hostname, ip, master, NetworkControlPort, BackendServerPort
		if(s.NetworkControlPort) {
		
			t.name = s.hostname;
			t.port = s.NetworkControlPort;
			
			if(s.master) {
				t.address = WebMyth.prefsCookie.masterBackendIp;
			} else {
				t.address = s.ip;
			}
			
			frontends.push(t);
			
		}
	
	}
	
	return frontends;

}


/* Upcoming */
var trimUpcomingByGroup = function(fullList, inGroup) {
	
	var finalList = []
	
	//Check for keyword for no filtering
	if (inGroup == "All") {
	
		var s = {};
		
		for(var i = 0; i < fullList.length; i++) {
			s = fullList[i];
			
			finalList.push(s);
		}
		
	} else if (inGroup == "Conflicting") {
	
		var i, s;
	
		for (i = 0; i < fullList.length; i++) {
	
			s = fullList[i];
			if ((s.recstatus == '7')) {
				//Matches conflicting
				finalList.push(s);
			} else {
				//Does not match
			}
		}
		
	} else if (inGroup == "Upcoming") {
	
		var i, s;
	
		for (i = 0; i < fullList.length; i++) {
	
			s = fullList[i];
			if ((s.recstatus == '7')||(s.recstatus == '-1')||(s.recstatus == '-2')||(s.recstatus == '-10')||(s.recstatus == '-9')) {
				//Matches conflicting, will record, recording, tuning, failed
				finalList.push(s);
			} else {
				//Does not match
			}
		}
		
	} else if (inGroup == "Overrides") {

		var i, s;
	
		for (i = 0; i < fullList.length; i++) {
	
			s = fullList[i];
			if ((s.rectype == '7')||(s.rectype == '8')) {
				//Matches forced do and don't record
				finalList.push(s);
			} else {
				//Does not match
			}
		}
		
	} else if (inGroup == "Exhibition") {
	
		var i, s;
	
		for (i = 0; i < fullList.length; i++) {
	
			s = fullList[i];
			if ((s.recstatus == '7')||(s.recstatus == '-1')) {
				//Matches conflicting, will record
				finalList.push(s);
			} else {
				//Does not match
			}
		}
		
	} 
	
	return finalList;

}

var cleanDateList = function(fullList) {

	var finalList = [];
	
	var i, j = -1, s = {}, t = {}, currentDate = 'asdf';
	
	fullList.sort(double_sort_by('starttime', 'title', false));
	
	//console.log("finished sorting cleanDateList");
	
	for(i = 0; i < fullList.length; i++) {
		s = {};
		s = fullList[i];
		t = {};
		
		if(s.starttime.substring(0,10) == currentDate) {
			//Same date as last, just add to counter
			finalList[j].count++;
			//j++;
		} else {
			//console.log("new date, adding to list");
			t.count = 1;
			currentDate = s.starttime.substring(0,10);
			t.value = currentDate;
			t.label = currentDate;
			finalList.push(t);
			j++;
		}

	}
	
	return finalList;
	
};

var recstatusDecode = function(recstatusInt) { 

	var newStatusText = "";
	
		switch(parseInt(recstatusInt)) {
			case -10:		
				newStatusText = $L("Tuning");
			break;
			case -9:		
				newStatusText = $L("Failed");
			break;
			case -8:		
				newStatusText = $L("Tuner Busy");
			break;
			case -7:		
				newStatusText = $L("Low Disk Space");
			break;
			case -6:		
				newStatusText = $L("Cancelled");
			break;
			case -5:		
				newStatusText = $L("Deleted");
			break;
			case -4:		
				newStatusText = $L("Aborted");
			break;
			case -3:		
				newStatusText = $L("Recorded");
			break;
			case -2:		
				newStatusText = $L("Currently Recording");
			break;
			case -1:		
				newStatusText = $L("Will Record");
			break;
			case 0:		
				newStatusText = $L("Unknown");
			break;
			case 1:		
				newStatusText = $L("Force Don't Record");
			break;
			case 2:		
				newStatusText = $L("Previously Recorded");
			break;
			case 3:		
				newStatusText = $L("Current Recording");
			break;
			case 4:		
				newStatusText = $L("Don't Record");
			break;
			case 5:		
				newStatusText = $L("Earlier Showing");
			break;
			case 6:		
				newStatusText = $L("Not Listed");
			break;
			case 7:		
				newStatusText = $L("Conflict");
			break;
			case 8:		
				newStatusText = $L("Later Showing");
			break;
			case 9:		
				newStatusText = $L("Repeat");
			break;
			case 10:		
				newStatusText = $L("Inactive");
			break;
			case 11:		
				newStatusText = $L("Never Record");
			break;
			
			case 100:		
				newStatusText = "";
				//Blank for when using defaultProgram
			break;
			
			default:
				newStatusText = " "+$L("No matching recording rule");
			break;
		}	
		
	return newStatusText;
	
};


var parseUpcomingPlugin = function(fullData) {

	//Determine how we should parse
	// http://www.mythtv.org/wiki/ProgramInfo_%28Myth_Protocol%29
	
	var finalList = [];
	var type = "upcoming";
	
	//this.log("About to start parsing upcoming plugin "+fullData);
	
	if(WebMyth.prefsCookie.protoVer == 23056){
		finalList = parsePrograms41(fullData, type);
	} else if(WebMyth.prefsCookie.protoVer >= 67){
		finalList = parsePrograms67(fullData, type);
	} else if(WebMyth.prefsCookie.protoVer >= 57){
		finalList = parsePrograms57(fullData, type);
	} else if(WebMyth.prefsCookie.protoVer >= 41){
		finalList = parsePrograms41(fullData, type);
	} else if(WebMyth.prefsCookie.protoVer >= 35){
		finalList = parsePrograms35(fullData, type);
	} else if(WebMyth.prefsCookie.protoVer >= 32){
		finalList = parsePrograms32(fullData, type);
	} else if(WebMyth.prefsCookie.protoVer >= 31){
		finalList = parsePrograms31(fullData, type);
	} else if(WebMyth.prefsCookie.protoVer >= 25){
		finalList = parsePrograms25(fullData, type);
	} 
	
	return finalList;

};

var parsePrograms67 = function(fullResponse, type) {	

	//Protocol verion 67 and up - 44 fields

	var finalList = [];
	var fullArray = fullResponse.split("[]:[]");
	var offset = 1;
	
	//this.log("Parsing upcoming total programs is "+fullArray[1]+", length is "+fullArray.length);
	
	if(type == "upcoming") {
		WebMyth.hasConflicts = fullArray[0].substring(8,9);
		WebMyth.expectedLength = fullArray[1];
		offset = 2;
	}
	
	var i, programNum = 0, fieldNum = 0;
	var singleProgramJson = {};
	var newDate = new Date();
	
	for(i = offset; i < fullArray.length; i++){
		switch(fieldNum){
			case 0:
				singleProgramJson.title = fullArray[i];
			  break;
			case 1:
				singleProgramJson.subtitle = fullArray[i];
			  break;
			case 2:
				singleProgramJson.description = fullArray[i];
			  break;
			case 3:
				singleProgramJson.season = fullArray[i];
			  break;
			case 4:
				singleProgramJson.episode = fullArray[i];
			  break;
			case 5:
				singleProgramJson.category = fullArray[i];
			  break;
			case 6:
				singleProgramJson.chanid = fullArray[i];
			  break;
			case 7:
				singleProgramJson.channum = fullArray[i];
			  break;
			case 8:
				singleProgramJson.callsign = fullArray[i];
			  break;
			case 9:
				singleProgramJson.channame = fullArray[i];
			  break;
			  
			case 10:
				//singleProgramJson.filename = fullArray[i];
			  break;
			case 11:
				//singleProgramJson.filesize = fullArray[i];
			  break; 
			case 12:
				singleProgramJson.starttimeint = fullArray[i];
				newDate.setTime(fullArray[i]*1000);
				singleProgramJson.starttime = dateJSToISO(newDate);
				//singleProgramJson.starttimespace = singleProgramJson.starttime.replace("T"," ");
			  break;
			case 13:
				singleProgramJson.endtimeint = fullArray[i];
				newDate.setTime(fullArray[i]*1000);
				singleProgramJson.endtime = dateJSToISO(newDate);
			  break;
		/*	case 14:
				//singleProgramJson.findid = fullArray[i];
			  break;
			case 15:
				//singleProgramJson.hostname = fullArray[i];
			  break;
			case 16:
				//singleProgramJson.sourceid = fullArray[i];
			  break;	*/
			case 17:
				singleProgramJson.cardid = fullArray[i];
			  break;
		/*	case 18:
				//singleProgramJson.inputid = fullArray[i];
			  break;
			case 19:
				//singleProgramJson.recpriority = fullArray[i];
			  break;  */
			  
			case 20:
				singleProgramJson.recstatus = fullArray[i];
				singleProgramJson.recstatustext = recstatusDecode(fullArray[i]);
			  break;
			case 21:
				//singleProgramJson.recordid = fullArray[i];
			  break;
			case 22:
				singleProgramJson.rectype = fullArray[i];
			  break;
			case 23:
				//singleProgramJson.dupin = fullArray[i];
			  break;
			case 24:
				//singleProgramJson.dupmethod = fullArray[i];
			  break;
			case 25:
				singleProgramJson.recstarttsint = fullArray[i];
				newDate.setTime(fullArray[i]*1000);
				singleProgramJson.recstartts = dateJSToISO(newDate);
			  break;
			case 26:
				singleProgramJson.recendtsint = fullArray[i];
				newDate.setTime(fullArray[i]*1000);
				singleProgramJson.recendts = dateJSToISO(newDate);
			  break;
		/*	case 27:
				//singleProgramJson.programflags = fullArray[i];
			  break;
			case 28:
				//singleProgramJson.recGroup = fullArray[i];
			  break;
			case 29:
				//singleProgramJson.outputFilters = fullArray[i];
			  break;	*/
			  
			case 30:
				singleProgramJson.seriesid = fullArray[i];
			  break;
			case 31:
				singleProgramJson.programid = fullArray[i];
			  break;
			case 32:
				singleProgramJson.initref = fullArray[i];
			  break;
		/*	case 33:
				//singleProgramJson.lastmodified = fullArray[i];
			  break;
			case 34:
				//singleProgramJson.stars = fullArray[i];
			  break;	*/
			case 35:
				singleProgramJson.airdate = fullArray[i];
			  break;
		/*	case 36:
				//singleProgramJson.playgroup = fullArray[i];
			  break;
			case 37:
				//singleProgramJson.recpriority2 = fullArray[i];
			  break;
			case 38:
				//singleProgramJson.parentid = fullArray[i];
			  break;
			case 39:
				//singleProgramJson.storagegroup = fullArray[i];
			  break;	*/
			  
			case 40:
				//singleProgramJson.audio_props = fullArray[i];
			  break;
			case 41:
				//singleProgramJson.video_props = fullArray[i];
			  break;
			case 42:
				//singleProgramJson.subtitle_type = fullArray[i];
			  break;  
			case 43:
				//41st field, push and reset counters
				//singleProgramJson.year = fullArray[i];
				
				finalList.push(singleProgramJson);
				
				singleProgramJson = {};
				programNum++;
				fieldNum = -1;
			  break;
		}
		
		fieldNum++;
	}
	
	WebMyth.parsedPrograms = programNum;
	
	return finalList;
	
}

var parsePrograms57 = function(fullResponse, type) {	

	//Protocol verion 57 and up - 41 fields

	var finalList = [];
	var fullArray = fullResponse.split("[]:[]");
	var offset = 1;
	
	//this.log("Parsing upcoming total programs is "+fullArray[1]+", length is "+fullArray.length);
	
	if(type == "upcoming") {
		WebMyth.hasConflicts = fullArray[0].substring(8,9);
		WebMyth.expectedLength = fullArray[1];
		offset = 2;
	}
	
	var i, programNum = 0, fieldNum = 0;
	var singleProgramJson = {};
	var newDate = new Date();
	
	for(i = offset; i < fullArray.length; i++){
		switch(fieldNum){
			case 0:
				singleProgramJson.title = fullArray[i];
			  break;
			case 1:
				singleProgramJson.subtitle = fullArray[i];
			  break;
			case 2:
				singleProgramJson.description = fullArray[i];
			  break;
			case 3:
				singleProgramJson.category = fullArray[i];
			  break;
			case 4:
				singleProgramJson.chanid = fullArray[i];
			  break;
			case 5:
				singleProgramJson.channum = fullArray[i];
			  break;
			case 6:
				singleProgramJson.callsign = fullArray[i];
			  break;
			case 7:
				singleProgramJson.channame = fullArray[i];
			  break;
			case 8:
				//singleProgramJson.filename = fullArray[i];
			  break;
			case 9:
				//singleProgramJson.filesize = fullArray[i];
			  break; 
			  
			case 10:
				singleProgramJson.starttimeint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.starttime = dateJSToISO(newDate);
				//singleProgramJson.starttimespace = singleProgramJson.starttime.replace("T"," ");
				
			  break;
			case 11:
				singleProgramJson.endtimeint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.endtime = dateJSToISO(newDate);
			  break;
		/*	case 12:
				//singleProgramJson.findid = fullArray[i];
			  break;
			case 13:
				//singleProgramJson.hostname = fullArray[i];
			  break;
			case 14:
				//singleProgramJson.sourceid = fullArray[i];
			  break;	*/
			case 15:
				singleProgramJson.cardid = fullArray[i];
			  break;
		/*	case 16:
				//singleProgramJson.inputid = fullArray[i];
			  break;
			case 17:
				//singleProgramJson.recpriority = fullArray[i];
			  break;  */
			case 18:
				singleProgramJson.recstatus = fullArray[i];
				singleProgramJson.recstatustext = recstatusDecode(fullArray[i]);
			  break;
			case 19:
				//singleProgramJson.recordid = fullArray[i];
			  break;
			  
			case 20:
				singleProgramJson.rectype = fullArray[i];
			  break;
			case 21:
				//singleProgramJson.dupin = fullArray[i];
			  break;
			case 22:
				//singleProgramJson.dupmethod = fullArray[i];
			  break;
			case 23:
				singleProgramJson.recstarttsint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.recstartts = dateJSToISO(newDate);
			  break;
			case 24:
				singleProgramJson.recendtsint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.recendts = dateJSToISO(newDate);
			  break;
		/*	case 25:
				//singleProgramJson.programflags = fullArray[i];
			  break;
			case 26:
				//singleProgramJson.recGroup = fullArray[i];
			  break;
			case 27:
				//singleProgramJson.outputFilters = fullArray[i];
			  break;	*/
			case 28:
				singleProgramJson.seriesid = fullArray[i];
			  break;
			case 29:
				singleProgramJson.programid = fullArray[i];
			  break;
			  
		/*	case 30:
				//singleProgramJson.lastmodified = fullArray[i];
			  break;
			case 31:
				//singleProgramJson.stars = fullArray[i];
			  break;	*/
			case 32:
				singleProgramJson.airdate = fullArray[i];
			  break;
		/*	case 33:
				//singleProgramJson.playgroup = fullArray[i];
			  break;
			case 34:
				//singleProgramJson.recpriority2 = fullArray[i];
			  break;
			case 35:
				//singleProgramJson.parentid = fullArray[i];
			  break;
			case 36:
				//singleProgramJson.storagegroup = fullArray[i];
			  break;
			case 37:
				//singleProgramJson.audio_props = fullArray[i];
			  break;
			case 38:
				//singleProgramJson.video_props = fullArray[i];
			  break;
			case 39:
				//singleProgramJson.subtitle_type = fullArray[i];
			  break;  */
			  
			case 40:
				//41st field, push and reset counters
				//singleProgramJson.year = fullArray[i];
				
				finalList.push(singleProgramJson);
				
				singleProgramJson = {};
				programNum++;
				fieldNum = -1;
			  break;
		}
		
		fieldNum++;
	}
	
	
	WebMyth.parsedPrograms = programNum;
	
	
	return finalList;
	
}

var parsePrograms41 = function(fullResponse, type) {	

	//Protocol verion 41 and up - 47 fields

	var finalList = [];
	var fullArray = fullResponse.split("[]:[]");
	var offset = 1;
	
	//this.log("Parsing upcoming total programs is "+fullArray[1]+", length is "+fullArray.length);
	
	if(type == "upcoming") {
		WebMyth.hasConflicts = fullArray[0].substring(8,9);
		WebMyth.expectedLength = fullArray[1];
		offset = 2;
	}
	
	
	var i, programNum = 0, fieldNum = 0;
	var singleProgramJson = {};
	var newDate = new Date();
	
	for(i = offset; i < fullArray.length; i++){
		switch(fieldNum){
			case 0:
				singleProgramJson.title = fullArray[i];
			  break;
			case 1:
				singleProgramJson.subtitle = fullArray[i];
			  break;
			case 2:
				singleProgramJson.description = fullArray[i];
			  break;
			case 3:
				singleProgramJson.category = fullArray[i];
			  break;
			case 4:
				singleProgramJson.chanid = fullArray[i];
			  break;
			case 5:
				singleProgramJson.channum = fullArray[i];
			  break;
			case 6:
				singleProgramJson.callsign = fullArray[i];
			  break;
			case 7:
				singleProgramJson.channame = fullArray[i];
			  break;
		/*	case 8:
				//singleProgramJson.filename = fullArray[i];
			  break;
			case 9:
				//singleProgramJson.fs_high = fullArray[i];
			  break; 
			case 10:
				//singleProgramJson.fs_low = fullArray[i];
			  break; */
			case 11:
				singleProgramJson.starttimeint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.starttime = dateJSToISO(newDate);
				//singleProgramJson.starttimespace = singleProgramJson.starttime.replace("T"," ");
				
			  break;
			case 12:
				singleProgramJson.endtimeint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.endtime = dateJSToISO(newDate);
			  break;
			case 13:
		/*		//singleProgramJson.duplicate = fullArray[i];
			  break;
			case 14:
				//singleProgramJson.shareable = fullArray[i];
			  break;
			case 15:
				//singleProgramJson.findid = fullArray[i];
			  break;
			case 16:
				//singleProgramJson.hostname = fullArray[i];
			  break;
			case 17:
				//singleProgramJson.sourceid = fullArray[i];
			  break;	*/
			case 18:
				singleProgramJson.cardid = fullArray[i];
			  break;
		/*	case 19:
				//singleProgramJson.inputid = fullArray[i];
			  break;
			  
			case 20:
				//singleProgramJson.recpriority = fullArray[i];
			  break;  */
			case 21:
				singleProgramJson.recstatus = fullArray[i];
				singleProgramJson.recstatustext = recstatusDecode(fullArray[i]);
			  break;
			case 22:
				//singleProgramJson.recordid = fullArray[i];
			  break;
			case 23:
				singleProgramJson.rectype = fullArray[i];
			  break;
			case 24:
				//singleProgramJson.dupin = fullArray[i];
			  break;
			case 25:
				//singleProgramJson.dupmethod = fullArray[i];
			  break;
			case 26:
				singleProgramJson.recstarttsint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.recstartts = dateJSToISO(newDate);
			  break;
			case 27:
				singleProgramJson.recendtsint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.recendts = dateJSToISO(newDate);
			  break;
		/*	case 28:
				//singleProgramJson.repeat = fullArray[i];
			  break;
			case 29:
				//singleProgramJson.programflags = fullArray[i];
			  break;
			  
			case 30:
				//singleProgramJson.recGroup = fullArray[i];
			  break;
			case 31:
				//singleProgramJson.commfree = fullArray[i];
			  break;
			case 32:
				//singleProgramJson.outputFilters = fullArray[i];
			  break;	*/
			case 33:
				singleProgramJson.seriesid = fullArray[i];
			  break;
			case 34:
				singleProgramJson.programid = fullArray[i];
			  break;
		/*	case 35:
				//singleProgramJson.lastmodified = fullArray[i];
			  break;
			case 36:
				//singleProgramJson.stars = fullArray[i];
			  break;	*/
			case 37:
				singleProgramJson.airdate = fullArray[i];
			  break;
		/*	case 38:
				//singleProgramJson.hasairdate = fullArray[i];
			  break;
			case 39:
				//singleProgramJson.playgroup = fullArray[i];
			  break;
			  
			case 40:
				//singleProgramJson.recpriority2 = fullArray[i];
			  break;
			case 41:
				//singleProgramJson.parentid = fullArray[i];
			  break;
			case 42:
				//singleProgramJson.storagegroup = fullArray[i];
			  break;
			case 43:
				//singleProgramJson.audio_props = fullArray[i];
			  break;
			case 44:
				//singleProgramJson.video_props = fullArray[i];
			  break;
			case 45:
				//singleProgramJson.subtitle_type = fullArray[i];
			  break;  */
			case 46:
				//47th field, push and reset counters
				//singleProgramJson.year = fullArray[i];
				
				finalList.push(singleProgramJson);
				
				singleProgramJson = {};
				programNum++;
				fieldNum = -1;
			  break;
		}
		
		fieldNum++;
	}
	
	
	WebMyth.parsedPrograms = programNum;
	
	
	return finalList;
	
}

var parsePrograms35 = function(fullResponse, type) {	

	//Protocol verion 35 and up - 46 fields

	var finalList = [];
	var fullArray = fullResponse.split("[]:[]");
	var offset = 1;
	
	//this.log("Parsing upcoming total programs is "+fullArray[1]+", length is "+fullArray.length);
	
	if(type == "upcoming") {
		WebMyth.hasConflicts = fullArray[0].substring(8,9);
		WebMyth.expectedLength = fullArray[1];
		offset = 2;
	}
	
	
	var i, programNum = 0, fieldNum = 0;
	var singleProgramJson = {};
	var newDate = new Date();
	
	for(i = offset; i < fullArray.length; i++){
		switch(fieldNum){
			case 0:
				singleProgramJson.title = fullArray[i];
			  break;
			case 1:
				singleProgramJson.subtitle = fullArray[i];
			  break;
			case 2:
				singleProgramJson.description = fullArray[i];
			  break;
			case 3:
				singleProgramJson.category = fullArray[i];
			  break;
			case 4:
				singleProgramJson.chanid = fullArray[i];
			  break;
			case 5:
				singleProgramJson.channum = fullArray[i];
			  break;
			case 6:
				singleProgramJson.callsign = fullArray[i];
			  break;
			case 7:
				singleProgramJson.channame = fullArray[i];
			  break;
		/*	case 8:
				//singleProgramJson.filename = fullArray[i];
			  break;
			case 9:
				//singleProgramJson.fs_high = fullArray[i];
			  break; 
			case 10:
				//singleProgramJson.fs_low = fullArray[i];
			  break; */
			case 11:
				singleProgramJson.starttimeint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.starttime = dateJSToISO(newDate);
				//singleProgramJson.starttimespace = singleProgramJson.starttime.replace("T"," ");
				
			  break;
			case 12:
				singleProgramJson.endtimeint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.endtime = dateJSToISO(newDate);
			  break;
			case 13:
		/*		//singleProgramJson.duplicate = fullArray[i];
			  break;
			case 14:
				//singleProgramJson.shareable = fullArray[i];
			  break;
			case 15:
				//singleProgramJson.findid = fullArray[i];
			  break;
			case 16:
				//singleProgramJson.hostname = fullArray[i];
			  break;
			case 17:
				//singleProgramJson.sourceid = fullArray[i];
			  break;	*/
			case 18:
				singleProgramJson.cardid = fullArray[i];
			  break;
		/*	case 19:
				//singleProgramJson.inputid = fullArray[i];
			  break;
			  
			case 20:
				//singleProgramJson.recpriority = fullArray[i];
			  break;  */
			case 21:
				singleProgramJson.recstatus = fullArray[i];
				singleProgramJson.recstatustext = recstatusDecode(fullArray[i]);
			  break;
			case 22:
				//singleProgramJson.recordid = fullArray[i];
			  break;
			case 23:
				singleProgramJson.rectype = fullArray[i];
			  break;
			case 24:
				//singleProgramJson.dupin = fullArray[i];
			  break;
			case 25:
				//singleProgramJson.dupmethod = fullArray[i];
			  break;
			case 26:
				singleProgramJson.recstarttsint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.recstartts = dateJSToISO(newDate);
			  break;
			case 27:
				singleProgramJson.recendtsint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.recendts = dateJSToISO(newDate);
			  break;
		/*	case 28:
				//singleProgramJson.repeat = fullArray[i];
			  break;
			case 29:
				//singleProgramJson.programflags = fullArray[i];
			  break;
			  
			case 30:
				//singleProgramJson.recGroup = fullArray[i];
			  break;
			case 31:
				//singleProgramJson.commfree = fullArray[i];
			  break;
			case 32:
				//singleProgramJson.outputFilters = fullArray[i];
			  break;	*/
			case 33:
				singleProgramJson.seriesid = fullArray[i];
			  break;
			case 34:
				singleProgramJson.programid = fullArray[i];
			  break;
		/*	case 35:
				//singleProgramJson.lastmodified = fullArray[i];
			  break;
			case 36:
				//singleProgramJson.stars = fullArray[i];
			  break;	*/
			case 37:
				singleProgramJson.airdate = fullArray[i];
			  break;
		/*	case 38:
				//singleProgramJson.hasairdate = fullArray[i];
			  break;
			case 39:
				//singleProgramJson.playgroup = fullArray[i];
			  break;
			  
			case 40:
				//singleProgramJson.recpriority2 = fullArray[i];
			  break;
			case 41:
				//singleProgramJson.parentid = fullArray[i];
			  break;
			case 42:
				//singleProgramJson.storagegroup = fullArray[i];
			  break;
			case 43:
				//singleProgramJson.audio_props = fullArray[i];
			  break;
			case 44:
				//singleProgramJson.video_props = fullArray[i];
			  break;  */
			case 45:
				//last field, push and reset counters
				//singleProgramJson.subtitle_type = fullArray[i];
				
				finalList.push(singleProgramJson);
				
				singleProgramJson = {};
				programNum++;
				fieldNum = -1;
			  break;
		}
		
		fieldNum++;
	}
	
	
	WebMyth.parsedPrograms = programNum;
	
	
	return finalList;
	
}

var parsePrograms32 = function(fullResponse, type) {	

	//Protocol verion 32 and up - 43 fields

	var finalList = [];
	var fullArray = fullResponse.split("[]:[]");
	var offset = 1;
	
	//this.log("Parsing upcoming total programs is "+fullArray[1]+", length is "+fullArray.length);
	
	if(type == "upcoming") {
		WebMyth.hasConflicts = fullArray[0].substring(8,9);
		WebMyth.expectedLength = fullArray[1];
		offset = 2;
	}
	
	
	var i, programNum = 0, fieldNum = 0;
	var singleProgramJson = {};
	var newDate = new Date();
	
	for(i = offset; i < fullArray.length; i++){
		switch(fieldNum){
			case 0:
				singleProgramJson.title = fullArray[i];
			  break;
			case 1:
				singleProgramJson.subtitle = fullArray[i];
			  break;
			case 2:
				singleProgramJson.description = fullArray[i];
			  break;
			case 3:
				singleProgramJson.category = fullArray[i];
			  break;
			case 4:
				singleProgramJson.chanid = fullArray[i];
			  break;
			case 5:
				singleProgramJson.channum = fullArray[i];
			  break;
			case 6:
				singleProgramJson.callsign = fullArray[i];
			  break;
			case 7:
				singleProgramJson.channame = fullArray[i];
			  break;
		/*	case 8:
				//singleProgramJson.filename = fullArray[i];
			  break;
			case 9:
				//singleProgramJson.fs_high = fullArray[i];
			  break; 
			case 10:
				//singleProgramJson.fs_low = fullArray[i];
			  break; */
			case 11:
				singleProgramJson.starttimeint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.starttime = dateJSToISO(newDate);
				//singleProgramJson.starttimespace = singleProgramJson.starttime.replace("T"," ");
				
			  break;
			case 12:
				singleProgramJson.endtimeint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.endtime = dateJSToISO(newDate);
			  break;
			case 13:
		/*		//singleProgramJson.duplicate = fullArray[i];
			  break;
			case 14:
				//singleProgramJson.shareable = fullArray[i];
			  break;
			case 15:
				//singleProgramJson.findid = fullArray[i];
			  break;
			case 16:
				//singleProgramJson.hostname = fullArray[i];
			  break;
			case 17:
				//singleProgramJson.sourceid = fullArray[i];
			  break;	*/
			case 18:
				singleProgramJson.cardid = fullArray[i];
			  break;
		/*	case 19:
				//singleProgramJson.inputid = fullArray[i];
			  break;
			  
			case 20:
				//singleProgramJson.recpriority = fullArray[i];
			  break;  */
			case 21:
				singleProgramJson.recstatus = fullArray[i];
				singleProgramJson.recstatustext = recstatusDecode(fullArray[i]);
			  break;
			case 22:
				//singleProgramJson.recordid = fullArray[i];
			  break;
			case 23:
				singleProgramJson.rectype = fullArray[i];
			  break;
			case 24:
				//singleProgramJson.dupin = fullArray[i];
			  break;
			case 25:
				//singleProgramJson.dupmethod = fullArray[i];
			  break;
			case 26:
				singleProgramJson.recstarttsint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.recstartts = dateJSToISO(newDate);
			  break;
			case 27:
				singleProgramJson.recendtsint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.recendts = dateJSToISO(newDate);
			  break;
		/*	case 28:
				//singleProgramJson.repeat = fullArray[i];
			  break;
			case 29:
				//singleProgramJson.programflags = fullArray[i];
			  break;
			  
			case 30:
				//singleProgramJson.recGroup = fullArray[i];
			  break;
			case 31:
				//singleProgramJson.commfree = fullArray[i];
			  break;
			case 32:
				//singleProgramJson.outputFilters = fullArray[i];
			  break;	*/
			case 33:
				singleProgramJson.seriesid = fullArray[i];
			  break;
			case 34:
				singleProgramJson.programid = fullArray[i];
			  break;
		/*	case 35:
				//singleProgramJson.lastmodified = fullArray[i];
			  break;
			case 36:
				//singleProgramJson.stars = fullArray[i];
			  break;	*/
			case 37:
				singleProgramJson.airdate = fullArray[i];
			  break;
		/*	case 38:
				//singleProgramJson.hasairdate = fullArray[i];
			  break;
			case 39:
				//singleProgramJson.playgroup = fullArray[i];
			  break;
			  
			case 40:
				//singleProgramJson.recpriority2 = fullArray[i];
			  break;
			case 41:
				//singleProgramJson.parentid = fullArray[i];
			  break;  */
			case 42:
				//last field, push and reset counters
				//singleProgramJson.storagegroup = fullArray[i];
				
				finalList.push(singleProgramJson);
				
				singleProgramJson = {};
				programNum++;
				fieldNum = -1;
			  break;
		}
		
		fieldNum++;
	}
	
	
	WebMyth.parsedPrograms = programNum;
	
	
	return finalList;
	
}

var parsePrograms31 = function(fullResponse, type) {	

	//Protocol verion 31 and up - 42 fields

	var finalList = [];
	var fullArray = fullResponse.split("[]:[]");
	var offset = 1;
	
	//this.log("Parsing upcoming total programs is "+fullArray[1]+", length is "+fullArray.length);
	
	if(type == "upcoming") {
		WebMyth.hasConflicts = fullArray[0].substring(8,9);
		WebMyth.expectedLength = fullArray[1];
		offset = 2;
	}
	
	
	var i, programNum = 0, fieldNum = 0;
	var singleProgramJson = {};
	var newDate = new Date();
	
	for(i = offset; i < fullArray.length; i++){
		switch(fieldNum){
			case 0:
				singleProgramJson.title = fullArray[i];
			  break;
			case 1:
				singleProgramJson.subtitle = fullArray[i];
			  break;
			case 2:
				singleProgramJson.description = fullArray[i];
			  break;
			case 3:
				singleProgramJson.category = fullArray[i];
			  break;
			case 4:
				singleProgramJson.chanid = fullArray[i];
			  break;
			case 5:
				singleProgramJson.channum = fullArray[i];
			  break;
			case 6:
				singleProgramJson.callsign = fullArray[i];
			  break;
			case 7:
				singleProgramJson.channame = fullArray[i];
			  break;
		/*	case 8:
				//singleProgramJson.filename = fullArray[i];
			  break;
			case 9:
				//singleProgramJson.fs_high = fullArray[i];
			  break; 
			case 10:
				//singleProgramJson.fs_low = fullArray[i];
			  break; */
			case 11:
				singleProgramJson.starttimeint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.starttime = dateJSToISO(newDate);
				//singleProgramJson.starttimespace = singleProgramJson.starttime.replace("T"," ");
				
			  break;
			case 12:
				singleProgramJson.endtimeint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.endtime = dateJSToISO(newDate);
			  break;
			case 13:
		/*		//singleProgramJson.duplicate = fullArray[i];
			  break;
			case 14:
				//singleProgramJson.shareable = fullArray[i];
			  break;
			case 15:
				//singleProgramJson.findid = fullArray[i];
			  break;
			case 16:
				//singleProgramJson.hostname = fullArray[i];
			  break;
			case 17:
				//singleProgramJson.sourceid = fullArray[i];
			  break;	*/
			case 18:
				singleProgramJson.cardid = fullArray[i];
			  break;
		/*	case 19:
				//singleProgramJson.inputid = fullArray[i];
			  break;
			  
			case 20:
				//singleProgramJson.recpriority = fullArray[i];
			  break;  */
			case 21:
				singleProgramJson.recstatus = fullArray[i];
				singleProgramJson.recstatustext = recstatusDecode(fullArray[i]);
			  break;
			case 22:
				//singleProgramJson.recordid = fullArray[i];
			  break;
			case 23:
				singleProgramJson.rectype = fullArray[i];
			  break;
			case 24:
				//singleProgramJson.dupin = fullArray[i];
			  break;
			case 25:
				//singleProgramJson.dupmethod = fullArray[i];
			  break;
			case 26:
				singleProgramJson.recstarttsint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.recstartts = dateJSToISO(newDate);
			  break;
			case 27:
				singleProgramJson.recendtsint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.recendts = dateJSToISO(newDate);
			  break;
		/*	case 28:
				//singleProgramJson.repeat = fullArray[i];
			  break;
			case 29:
				//singleProgramJson.programflags = fullArray[i];
			  break;
			  
			case 30:
				//singleProgramJson.recGroup = fullArray[i];
			  break;
			case 31:
				//singleProgramJson.commfree = fullArray[i];
			  break;
			case 32:
				//singleProgramJson.outputFilters = fullArray[i];
			  break;	*/
			case 33:
				singleProgramJson.seriesid = fullArray[i];
			  break;
			case 34:
				singleProgramJson.programid = fullArray[i];
			  break;
		/*	case 35:
				//singleProgramJson.lastmodified = fullArray[i];
			  break;
			case 36:
				//singleProgramJson.stars = fullArray[i];
			  break;	*/
			case 37:
				singleProgramJson.airdate = fullArray[i];
			  break;
		/*	case 38:
				//singleProgramJson.hasairdate = fullArray[i];
			  break;
			case 39:
				//singleProgramJson.playgroup = fullArray[i];
			  break;
			  
			case 40:
				//singleProgramJson.recpriority2 = fullArray[i];
			  break;  */
			case 41:
				//last field, push and reset counters
				//singleProgramJson.parentid = fullArray[i];
				
				finalList.push(singleProgramJson);
				
				singleProgramJson = {};
				programNum++;
				fieldNum = -1;
			  break;
		}
		
		fieldNum++;
	}
	
	
	WebMyth.parsedPrograms = programNum;
	
	
	return finalList;
	
}

var parsePrograms25 = function(fullResponse, type) {	

	//Protocol verion 25 and up - 41 fields
	//MythTV version 0.19 - won't support any older versions

	var finalList = [];
	var fullArray = fullResponse.split("[]:[]");
	var offset = 1;
	
	//this.log("Parsing upcoming total programs is "+fullArray[1]+", length is "+fullArray.length);
	
	if(type == "upcoming") {
		WebMyth.hasConflicts = fullArray[0].substring(8,9);
		WebMyth.expectedLength = fullArray[1];
		offset = 2;
	}
	
	
	var i, programNum = 0, fieldNum = 0;
	var singleProgramJson = {};
	var newDate = new Date();
	
	for(i = offset; i < fullArray.length; i++){
		switch(fieldNum){
			case 0:
				singleProgramJson.title = fullArray[i];
			  break;
			case 1:
				singleProgramJson.subtitle = fullArray[i];
			  break;
			case 2:
				singleProgramJson.description = fullArray[i];
			  break;
			case 3:
				singleProgramJson.category = fullArray[i];
			  break;
			case 4:
				singleProgramJson.chanid = fullArray[i];
			  break;
			case 5:
				singleProgramJson.channum = fullArray[i];
			  break;
			case 6:
				singleProgramJson.callsign = fullArray[i];
			  break;
			case 7:
				singleProgramJson.channame = fullArray[i];
			  break;
		/*	case 8:
				//singleProgramJson.filename = fullArray[i];
			  break;
			case 9:
				//singleProgramJson.fs_high = fullArray[i];
			  break; 
			case 10:
				//singleProgramJson.fs_low = fullArray[i];
			  break; */
			case 11:
				singleProgramJson.starttimeint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.starttime = dateJSToISO(newDate);
				//singleProgramJson.starttimespace = singleProgramJson.starttime.replace("T"," ");
				
			  break;
			case 12:
				singleProgramJson.endtimeint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.endtime = dateJSToISO(newDate);
			  break;
			case 13:
		/*		//singleProgramJson.duplicate = fullArray[i];
			  break;
			case 14:
				//singleProgramJson.shareable = fullArray[i];
			  break;
			case 15:
				//singleProgramJson.findid = fullArray[i];
			  break;
			case 16:
				//singleProgramJson.hostname = fullArray[i];
			  break;
			case 17:
				//singleProgramJson.sourceid = fullArray[i];
			  break;	*/
			case 18:
				singleProgramJson.cardid = fullArray[i];
			  break;
		/*	case 19:
				//singleProgramJson.inputid = fullArray[i];
			  break;
			  
			case 20:
				//singleProgramJson.recpriority = fullArray[i];
			  break;  */
			case 21:
				singleProgramJson.recstatus = fullArray[i];
				singleProgramJson.recstatustext = recstatusDecode(fullArray[i]);
			  break;
			case 22:
				//singleProgramJson.recordid = fullArray[i];
			  break;
			case 23:
				singleProgramJson.rectype = fullArray[i];
			  break;
			case 24:
				//singleProgramJson.dupin = fullArray[i];
			  break;
			case 25:
				//singleProgramJson.dupmethod = fullArray[i];
			  break;
			case 26:
				singleProgramJson.recstarttsint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.recstartts = dateJSToISO(newDate);
			  break;
			case 27:
				singleProgramJson.recendtsint = fullArray[i];
				
				newDate.setTime(fullArray[i]*1000);
				
				singleProgramJson.recendts = dateJSToISO(newDate);
			  break;
		/*	case 28:
				//singleProgramJson.repeat = fullArray[i];
			  break;
			case 29:
				//singleProgramJson.programflags = fullArray[i];
			  break;
			  
			case 30:
				//singleProgramJson.recGroup = fullArray[i];
			  break;
			case 31:
				//singleProgramJson.commfree = fullArray[i];
			  break;
			case 32:
				//singleProgramJson.outputFilters = fullArray[i];
			  break;	*/
			case 33:
				singleProgramJson.seriesid = fullArray[i];
			  break;
			case 34:
				singleProgramJson.programid = fullArray[i];
			  break;
		/*	case 35:
				//singleProgramJson.lastmodified = fullArray[i];
			  break;
			case 36:
				//singleProgramJson.stars = fullArray[i];
			  break;	*/
			case 37:
				singleProgramJson.airdate = fullArray[i];
			  break;
		/*	case 38:
				//singleProgramJson.hasairdate = fullArray[i];
			  break;
			case 39:
				//singleProgramJson.playgroup = fullArray[i];
			  break;  */
			  
			case 40:
				//last field, push and reset counters
				//singleProgramJson.recpriority2 = fullArray[i];
				
				finalList.push(singleProgramJson);
				
				singleProgramJson = {};
				programNum++;
				fieldNum = -1;
			  break;
		}
		
		fieldNum++;
	}
	
	
	WebMyth.parsedPrograms = programNum;
	
	
	return finalList;
	
}




/* Music */
var cleanMusic = function(fullList) {

	var finalList = [];
	
	var i, j, k, s, t = [], u = [];
	
	for(i = 0; i < fullList.length; i++) {
		s = fullList[i];
		
		//Break down name if is has '/'
		t = s.name.split("/");
		j = t.length;
		s.name = t[j - 1];
		
		//Break down filename 
		//u = s.filename.split("/");
		//k = u.length;
		//s.filenameEnd = u[k - 1];
			
		s.playlistOrder = 9000000;
		s.inPlaylist = false;
			
		if(s.track < 10) {
			s.track = '0'+parseInt(s.track);
		}
		
		finalList.push(s);
		
	}
	
	
	return finalList;
	
}

var cleanMusicPlaylists = function(fullList) {

	var finalList = [];
	
	finalList.push({"type": "1 - New", "playlist_id": "-1", "playlist_name": "Create new", "value": "+ Create new +", "caption": "+ Create new +", "label": "+ Create new +", "playlist_songs": "", "length": "0", "songcount": "0", "hostname": ""});
	
	var i, j, k, s, t = [], u = [];
	
	for(i = 0; i < fullList.length; i++) {
		s = fullList[i];
		
		if(s.hostname == ""){
			s.type = "3 - Named";
			s.label = s.playlist_name;
			s.value = s.playlist_name;
			s.caption = s.playlist_name;
			finalList.push(s);
		} else if(s.playlist_name == "default_playlist_storage") {
			s.type = "2 - Host";
			s.label = "Frontend: "+s.hostname;
			s.value = "Frontend: "+s.hostname;
			s.caption = "Frontend: "+s.hostname;
			finalList.push(s);
		}
		
	}
	
	finalList.sort(double_sort_by('type', 'hostname', false));
	
	return finalList;
	
}

var parseMusicInPlaylist = function(fullList, playlistObject) {
	
	var playlistOrderList = [];
	var	finalList = [];
	
	var myPlaylist = playlistObject.playlist_songs.split(",");
	
	var i, j, s = {};
	var sortListIndex = 0;
		
	//Flag music if in playlist
	for(j = 0; j < myPlaylist.length; j++) {
		
		if(myPlaylist[j] > 0) {
			//Make sure we are not getting playlists, just songs
			playlistOrderList.push({'song_id': myPlaylist[j], 'order': j});
		}	
	}
	
	playlistOrderList.sort(sort_by('song_id', false));
	
	
	//Prep music list
	fullList.sort(sort_by('song_id', false));
	
	for(i = 0; i < fullList.length; i++) {
		s = fullList[i];
		
		s.playlistOrder = 9000000;
		s.inPlaylist = false;
		
		//Break down name if is has '/'
		t = s.name.split("/");
		j = t.length;
		s.name = t[j - 1];
			
		if(s.track < 10) {
			s.track = '0'+parseInt(s.track);
		}
		
		if(playlistOrderList.length > 0) {		
			if(s.song_id == playlistOrderList[sortListIndex].song_id) {
				s.inPlaylist = true;
				s.playlistOrder = playlistOrderList[sortListIndex].order;
				
				if(s.playlistOrder < 10) {
					s.playlistOrder = "000000"+parseInt(s.playlistOrder);
				} else if(s.playlistOrder < 100) {
					s.playlistOrder = "00000"+parseInt(s.playlistOrder);
				} else if(s.playlistOrder < 1000) {
					s.playlistOrder = "0000"+parseInt(s.playlistOrder);
				} else if(s.playlistOrder < 10000) {
					s.playlistOrder = "000"+parseInt(s.playlistOrder);
				} else if(s.playlistOrder < 100000) {
					s.playlistOrder = "00"+parseInt(s.playlistOrder);
				} else if(s.playlistOrder < 9000000) {
					s.playlistOrder = "0"+parseInt(s.playlistOrder);
				} 
				
				sortListIndex++;
				
				if(sortListIndex >= playlistOrderList.length){
					sortListIndex--;
				}
			
			}
		}
		
		finalList.push(s);
		
	}
	
	finalList.sort(sort_by('playlistOrder', false));
	
	return finalList;	
	
}

var parsePlaylistsInPlaylist = function(fullList, playlistObject) {
	
	var	finalList = [];
	var playlistOrderList = [];
	
	var myPlaylist = playlistObject.playlist_songs.split(",");
	
	var i, j, s = {};
	var sortListIndex = 0;
		
	//Flag playlist if in playlist
	for(j = 0; j < myPlaylist.length; j++) {
		
		if(myPlaylist[j] < 0) {
			//Make sure we are not getting songs, just playlists
			playlistOrderList.push({"playlist_id": parseInt(-1*myPlaylist[j]), "order": j});
		}	
	}
	
	playlistOrderList.sort(sort_by('playlist_id', false));
	
	
	//Prep music list
	fullList.sort(sort_by("playlist_id", false));
	
	for(i = 0; i < fullList.length; i++) {
		s = fullList[i];
		
		s.playlistOrder = 9000000;
		s.inPlaylist = false;
		
		if(playlistOrderList.length > 0) {		
			if(s.playlist_id == playlistOrderList[sortListIndex].playlist_id) {
				s.inPlaylist = true;
				s.playlistOrder = playlistOrderList[sortListIndex].order;
				
				if(s.playlistOrder < 10) {
					s.playlistOrder = "000000"+parseInt(s.playlistOrder);
				} else if(s.playlistOrder < 100) {
					s.playlistOrder = "00000"+parseInt(s.playlistOrder);
				} else if(s.playlistOrder < 1000) {
					s.playlistOrder = "0000"+parseInt(s.playlistOrder);
				} else if(s.playlistOrder < 10000) {
					s.playlistOrder = "000"+parseInt(s.playlistOrder);
				} else if(s.playlistOrder < 100000) {
					s.playlistOrder = "00"+parseInt(s.playlistOrder);
				} else if(s.playlistOrder < 9000000) {
					s.playlistOrder = "0"+parseInt(s.playlistOrder);
				} 
				
				sortListIndex++;
				
				if(sortListIndex >= playlistOrderList.length){
					sortListIndex--;
				}
			
			}
		}
		
		if(s.type == "3 - Named") finalList.push(s);
		
	}
	
	finalList.sort(sort_by('playlistOrder', false));
	
	return finalList;	
	
}


/* Status */
var encoderStateDecode = function(stateInt) {

	var state = "Unknown";

	switch(parseInt(stateInt)) {
		case -1:
			state = $L("Disconnected");
			break;
		case 0:
			state = $L("Idle");
			break;
		case 1:
			state = $L("Watching Live TV");
			break;
		case 2:
			state = $L("Watching Pre-Recorded");
			break;
		case 3:
			state = $L("Watching Video");
			break;
		case 4:
			state = $L("Watching DVD");
			break;
		case 5:
			state = $L("Watching BD");
			break;
		case 6:
			state = $L("Recording");
			break;
		case 7:
			state = $L("Recording");
			break;
		case 8:
			state = $L("Unknown Status 8");
			break;
		case 9:
			state = $L("Unknown Status 9");
			break;
		default:
			state = $L("Unknown");
			break;
	};
	
	return state;
	
}

var jobqueueTypeDecode = function(typeInt) {

	var jobType = "Unknown";

	switch(parseInt(typeInt)) {
		case 0:
			jobType = $L("System Job");
			break;
		case 1:
			jobType = $L("Transcode");
			break;
		case 2:
			jobType = $L("Commercial Flagging");
			break;
		case 256:
			jobType = WebMyth.prefsCookie.UserJobDesc1;
			break;
		case 512:
			jobType = WebMyth.prefsCookie.UserJobDesc2;
			break;
		case 1024:
			jobType = WebMyth.prefsCookie.UserJobDesc3;
			break;
		case 2048:
			jobType = WebMyth.prefsCookie.UserJobDesc4;
			break;
		default:
			jobType = "Unknown Job Type";
			break;
	};
	
	return jobType;

}

var jobqueueStatusDecode = function(statusInt) {

	var statusText = "Unknown";

	switch(parseInt(statusInt)) {
		case -100:
			statusText = "";
			break;
		case 0:
			statusText = $L("Unknown");
			break;
		case 1:
			statusText = $L("Queued");
			break;
		case 2:
			statusText = $L("Pending");
			break;
		case 3:
			statusText = $L("Starting");
			break;
		case 4:
			statusText = $L("Running");
			break;
		case 5:
			statusText = $L("Stopped");
			break;
		case 6:
			statusText = $L("Paused");
			break;
		case 7:
			statusText = $L("Retry");
			break;
		case 8:
			statusText = $L("Erroring");
			break;
		case 9:
			statusText = $L("Aborting");
			break;
		case 256:
			statusText = $L("Done");
			break;
		case 272:
			statusText = $L("Finished");
			break;
		case 288:
			statusText = $L("Aborted");
			break;
		case 304:
			statusText = $L("Errored");
			break;
		case 320:
			statusText = $L("Cancelled");
			break;
		default:
			statusText = $L("Unknown");
			break;
	};
	
	return statusText;

}


/* Date functions */
var isoToJS = function(isoDate) { 
    
	isoDate.replace(" ","T");
	
	var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
        "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
        "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
    var d = isoDate.match(new RegExp(regexp));

    var offset = 0;
    var date = new Date(d[1], 0, 1);

    if (d[3]) { date.setMonth(d[3] - 1); }
    if (d[5]) { date.setDate(d[5]); }
    if (d[7]) { date.setHours(d[7]); }
    if (d[8]) { date.setMinutes(d[8]); }
    if (d[10]) { date.setSeconds(d[10]); }
    if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
    if (d[14]) {
        offset = (Number(d[16]) * 60) + Number(d[17]);
        offset *= ((d[15] == '-') ? 1 : -1);
    }

    //offset -= date.getTimezoneOffset();
    time = (Number(date));
	
	return Number(time);
 
};

var dateJSToISO = function(dateJS) { 

	var newDate = dateJS.getFullYear();
	newDate += "-";
	
	var month = dateJS.getMonth() + 1;
	
	if(month.toString().length == 2) {
		newDate += month.toString();
	} else {
		newDate += '0'+month.toString();
	}
	newDate += "-";
	if(dateJS.getDate().toString().length == 2) {
		newDate += dateJS.getDate().toString();
	} else {
		newDate += '0'+dateJS.getDate().toString();
	}
	newDate += "T";
	if(dateJS.getHours().toString().length == 2) {
		newDate += dateJS.getHours().toString();
	} else {
		newDate += '0'+dateJS.getHours().toString();
	}
	newDate += ":";
	if(dateJS.getMinutes().toString().length == 2) {
		newDate += dateJS.getMinutes().toString();
	} else {
		newDate += '0'+dateJS.getMinutes().toString();
	}
	newDate += ":";
	if(dateJS.getSeconds().toString().length == 2) {
		newDate += dateJS.getSeconds().toString();
	} else {
		newDate += '0'+dateJS.getSeconds().toString();
	}
    
	return newDate;
	
};

var dateJSToObject = function(dateJS) { 

	var newDate = {
		"year": dateJS.getFullYear(),
		"month": dateJS.getMonth() + 1,
		"day": dateJS.getDate(),
		"hour": dateJS.getHours(),
		"minute": dateJS.getMinutes(),
		"second": dateJS.getSeconds()
	}
    
	return newDate;
	
};

var isoTimeDifference = function(starttimeISO,endtimeISO) {

	var starttimeJS = new Date(isoToJS(starttimeISO));
	var endtimeJS = new Date(isoToJS(endtimeISO));
	
	return parseInt( (endtimeJS.getTime() - starttimeJS.getTime() + 3000) / (300000) )*5;

}


/* Guide */
var guideTimeRange = function(isoDate, viewMode) {

	var returnTimeRange = {};
	
	returnTimeRange.originaltimeISO = isoDate;
	
	if(parseInt(isoDate.substring(14,16)) < 30) {
		returnTimeRange.starttimeISO = isoDate.substring(0,14)+"00:01";
	} else {
		returnTimeRange.starttimeISO = isoDate.substring(0,14)+"30:01";
	}
	
	var minutes = 120;		//for tablet
	
	if(viewMode == "phone") minutes = 60
	
	returnTimeRange.starttimeJS = new Date(isoToJS(returnTimeRange.starttimeISO));
	returnTimeRange.endtimeJS = new Date(returnTimeRange.starttimeJS.getTime() + (1000 * 60 * minutes) - 2000);		//(1000*60*120)-2000 = 7200000 - 2000 = 7198000
	returnTimeRange.trueendtimeJS = new Date(returnTimeRange.starttimeJS.getTime() + (1000 * 60 * minutes));		//(1000*60*120) = 7200000
	
	returnTimeRange.endtimeISO = dateJSToISO(returnTimeRange.endtimeJS);
	returnTimeRange.trueendtimeISO = dateJSToISO(returnTimeRange.trueendtimeJS);
	
	return returnTimeRange;

}

var guideDayRange = function(isoDate, viewMode) {

	var returnDayRange = {};
	
	returnDayRange.originaltimeISO = isoDate;
	
	returnDayRange.starttimeISO = isoDate.substring(0,11)+"00:00:01";
	
	var minutes = 1440;		//24hrs * 60 mins
	
	returnDayRange.starttimeJS = new Date(isoToJS(returnDayRange.starttimeISO));
	returnDayRange.endtimeJS = new Date(returnDayRange.starttimeJS.getTime() + (1000 * 60 * minutes) - 2000);		//(1000*60*120)-2000 = 7200000 - 2000 = 7198000
	returnDayRange.trueendtimeJS = new Date(returnDayRange.starttimeJS.getTime() + (1000 * 60 * minutes));		//(1000*60*120) = 7200000
	
	returnDayRange.endtimeISO = dateJSToISO(returnDayRange.endtimeJS);
	returnDayRange.trueendtimeISO = dateJSToISO(returnDayRange.trueendtimeJS);
	
	return returnDayRange;

}


/* Setup schedule */
var cleanInputs = function(fullList) {

	var finalList = [];
	
	var i, s = {};
	
	finalList.push( { caption: "None", value: "0" } );
	
	for(i = 0; i < fullList.length; i++) {
		s = fullList[i];
		
		if(s.caption.length == 0){
			s.caption = "Input "+s.value;
		}
			
		finalList.push(s);
		
	}
	
	return finalList;
	
}

var dateDayAdjust = function(JSdayOfWeek) { 
    
    var newDay = JSdayOfWeek - 1;

    if(JSdayOfWeek < 0) {
		JSdayOfWeek = JSdayOfWeek + 7;
	}

	return newDay;
 
};

/* Video */
var cleanVideos = function(fullList) {

	var finalList = [];
	
	var i, j, s, t = [];
	
	for(i = 0; i < fullList.length; i++) {
		s = fullList[i];
		
		if(s.season == 0) {
			if(s.episode == 0) {	
				//No TV data - assuming full movie
				s.fullEpisode = 'N/A';
				s.season = "None";
				s.group = "Regular";
			} else if(s.episode < 10) {
				//Specials as listed on thetvdb.com
				s.fullEpisode = 'Special0'+s.episode;
				s.season = "Specials";
				s.group = "Specials";
			} else {
				//Specials as listed on thetvdb.com
				s.fullEpisode = 'Special'+s.episode;
				s.season = "Specials";
				s.group = "Specials";
			}
		} else {
			//TV episodes
			if(s.season < 10) {
				s.fullEpisode = "S0"+s.season;
			} else {
				s.fullEpisode = "S"+s.season;
			}
			
			if(s.episode < 10) {
				s.fullEpisode += "E0"+s.episode;
			} else {
				s.fullEpisode += "E"+s.episode;
			}
			
			if(s.season < 10) {
				s.season = "Season  "+s.season;
			} else {
				s.season = "Season "+s.season;
			}
			
			s.group = "TV";
				
		}
		
		//Break down file name
		t = s.filename.split("/");
		
		s.fileLevels = t.length;
		
		s.level1 = t[0];
		s.level2 = t[0]+"/"+t[1];
		s.level3 = t[0]+"/"+t[1]+"/"+t[2];
		s.level4 = t[0]+"/"+t[1]+"/"+t[2]+"/"+t[3];
		s.level5 = t[0]+"/"+t[1]+"/"+t[2]+"/"+t[3]+"/"+t[4];
		s.level6 = t[0]+"/"+t[1]+"/"+t[2]+"/"+t[3]+"/"+t[4]+"/"+t[5];
		
		s.onlyFilename = t[s.fileLevels-1];
		
		s.directory = s.filename.replace(s.onlyFilename,"");
			
			
		//Fix some blank values
		if(s.subtitle == 'None') s.subtitle = '';
		if(s.plot == 'None') s.plot = '';
		
		s.label = s.title;
		s.value = s.title;
		
		finalList.push(s);
		
	}
	
	finalList.sort(double_sort_by("title","fullEpisode"));
	
	return finalList;
	
};

var cleanVideosDirectories = function(fullList) {

	var finalList = [];
	
	var i, s = {}, t = {}, u = [];
	
	var lastDirectory1 = "asdf-fake-directory";
	var lastDirectory2 = "asdf-fake-directory";
	var lastDirectory3 = "asdf-fake-directory";
	var lastDirectory4 = "asdf-fake-directory";
	var lastDirectory5 = "asdf-fake-directory";
	var lastDirectory6 = "asdf-fake-directory";
	
	for(i = 0; i < fullList.length; i++) {
		s = fullList[i];
		t = {};
		u.length = 0;
		
		u = s.directory.split("/");
		
		if((s.fileLevels > 1)&&(lastDirectory1 != s.level1)){
			t = {};
			
			t.directory = s.level1+'/';
			t.directoryLevels = 2;
			t.localDirectory = u[t.directoryLevels-2];
			t.upperDirectory = t.directory.replace(t.localDirectory+'/',"");
			
			finalList.push(t);
			lastDirectory1 = s.level1;
		}
		
		
		if((s.fileLevels > 2)&&(lastDirectory2 != s.level2)){
			t = {};
			
			t.directory = s.level2+'/';
			t.directoryLevels = 3;
			t.localDirectory = u[t.directoryLevels-2];
			t.upperDirectory = t.directory.replace(t.localDirectory+'/',"");
			
			finalList.push(t);
			lastDirectory2 = s.level2;
		}
		
		if((s.fileLevels > 3)&&(lastDirectory3 != s.level3)){
			t = {};
			
			t.directory = s.level3+'/';
			t.directoryLevels = 4;
			t.localDirectory = u[t.directoryLevels-2];
			t.upperDirectory = t.directory.replace(t.localDirectory+'/',"");
			
			finalList.push(t);
			lastDirectory3 = s.level3;
		}
		
		if((s.fileLevels > 4)&&(lastDirectory4 != s.level4)){
			t = {};
			
			t.directory = s.level4+'/';
			t.directoryLevels = 5;
			t.localDirectory = u[t.directoryLevels-2];
			t.upperDirectory = t.directory.replace(t.localDirectory+'/',"");
			
			finalList.push(t);
			lastDirectory4 = s.level4;
		}
		
		if((s.fileLevels > 5)&&(lastDirectory5 != s.level5)){
			t = {};
			
			t.directory = s.level5+'/';
			t.directoryLevels = 6;
			t.localDirectory = u[t.directoryLevels-2];
			t.upperDirectory = t.directory.replace(t.localDirectory+'/',"");
			
			finalList.push(t);
			lastDirectory5 = s.level5;
		}
		
		if((s.fileLevels > 6)&&(lastDirectory4 != s.level6)){
			t = {};
			
			t.directory = s.level6+'/';
			t.directoryLevels = 7;
			t.localDirectory = u[t.directoryLevels-2];
			t.upperDirectory = t.directory.replace(t.localDirectory+'/',"");
			
			finalList.push(t);
			lastDirectory6 = s.level6;
		}
		
		
	}
	
	
	return finalList;
	
}

var trimVideosByGroup = function(fullList,inGroup,currentDirectory) {

	var finalList = []
	
	//Check for keyword for no filtering
	if (inGroup == 'All') {
	
		var s = {};
		
		for(var i = 0; i < fullList.length; i++) {
			s = fullList[i];
			
			finalList.push(s);
		}
		
	} else if (inGroup == 'Directory') {
	
		var i, s;
	
		for (i = 0; i < fullList.length; i++) {
	
			s = fullList[i];
			if (s.directory == currentDirectory) {
				finalList.push(s);
			} else {
				//Does not match
			}
		}
		
	} else {
	
		var i, s;
	
		for (i = 0; i < fullList.length; i++) {
	
			s = fullList[i];
			if (s.group == inGroup) {
				finalList.push(s);
			} else {
				//Does not match
			}
		}
		
	}
	
	return finalList;

}

var trimVideosDirectories = function(fullList,currentDirectory) {

	var finalList = []
	
	var i, s;
	
	for (i = 0; i < fullList.length; i++) {
		s = fullList[i];
			
		if (s.upperDirectory == currentDirectory) {
			finalList.push(s);
		} else {
			//Does not match
		}
	}
	
	return finalList;

}