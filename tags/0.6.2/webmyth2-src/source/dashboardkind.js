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

enyo.kind({
	name: "Dashboardkind",
	kind: "HFlexBox",
	align: "center",
	className: "Dashboardkind",
	
	events: {
	},
	
	fullResultsList: [],
	resultsList: [],
	
	components: [
		{kind: "ApplicationEvents", onWindowParamsChange: "windowParamsChangeHandler"},
		
		{name: "dashboardImage", kind: "Image", className: "dashboardImage", src: "webmyth2-48x48-2.png", onclick: "dashboardClick"},
		
		{name: "dashboardPane", kind: "Pane", flex: 1, className: "dashboardPane", transitionKind: "enyo.transitions.Simple", onSelectView: "viewSelected", onCreateView: "viewCreated", components: [
			{name: "dashboard1", kind: "HFlexBox", align2: "center", pack: "justify", components: [
				{name: "dashboardOK", className: "dashboardButton dashboardText", content: "OK", onclick: "okClick"},
				{name: "dashboardLeft", className: "dashboardButton dashboardLeft", onclick: "leftClick"},
				{name: "dashboardDown", className: "dashboardButton dashboardDown", onclick: "downClick"},
				{name: "dashboardUp", className: "dashboardButton dashboardUp", onclick: "upClick"},
				{name: "dashboardRight", className: "dashboardButton dashboardRight", onclick: "rightClick"},
			]},
			{name: "dashboard2", kind: "HFlexBox", align2: "center", pack: "justify", components: [
				{kind: "Spacer"},
				{name: "dashboardBack", className: "dashboardButton dashboardBack", onclick: "backClick"},
				{kind: "Spacer"},
				{name: "dashboardPause", className: "dashboardButton dashboardPause", onclick: "pauseClick"},
				{kind: "Spacer"},
				{name: "dashboardForward", className: "dashboardButton dashboardForward", onclick: "forwardClick"},
				{kind: "Spacer"},
			]},
			{name: "dashboard3", kind: "HFlexBox", align2: "center", pack: "justify", components: [
				{kind: "Spacer"},
				{name: "dashboardVoldown", className: "dashboardButton dashboardVoldown", onclick: "voldownClick"},
				{kind: "Spacer"},
				{name: "dashboardMute", className: "dashboardButton dashboardMute", onclick: "muteClick"},
				{kind: "Spacer"},
				{name: "dashboardVolup", className: "dashboardButton dashboardVolup", onclick: "volupClick"},
				{kind: "Spacer"},
			]},
			{name: "dashboard4", kind: "HFlexBox", align2: "center", pack: "justify", components: [
				{name: "dashboardEsc", className: "dashboardButton dashboardText", flex: 1, content: "Esc", onclick: "escClick"},
				{name: "dashboardOK2", className: "dashboardButton dashboardText", flex: 1, content: "OK", onclick: "okClick"},
				{name: "dashboardMenu", className: "dashboardButton dashboardText", flex: 1, content: "Menu", onclick: "menuClick"},
				{name: "dashboardInfo", className: "dashboardButton dashboardText", flex: 1, content: "Info", onclick: "infoClick"},
			]},
			{name: "dashboard5", kind: "HFlexBox", align2: "center", pack: "justify", components: [
				{name: "dashboardLivetv", className: "dashboardButton dashboardText", flex: 1, content: "LiveTV", onclick: "livetvClick"},
				{name: "dashboardRecord", className: "dashboardButton dashboardText", flex: 1, content: "Record", onclick: "recordClick"},
				{name: "dashboardVideos", className: "dashboardButton dashboardText", flex: 1, content: "Videos", onclick: "videosClick"},
				{name: "dashboardMusic", className: "dashboardButton dashboardText", flex: 1, content: "Music", onclick: "musicClick"},
			]},
			
		
		]},
		
	],
	
	create: function() {
		if(debug) this.log("create");
		this.inherited(arguments);
		
		this.dashboardRemoteIndex = enyo.windowParams.dashboardRemoteIndex;
		
		switch(this.dashboardRemoteIndex) {
			case 1:
				this.$.dashboardPane.selectViewByName("dashboard1");
				break;
			case 2:
				this.$.dashboardPane.selectViewByName("dashboard2");
				break;
			case 3:
				this.$.dashboardPane.selectViewByName("dashboard3");
				break;
			case 4:
				this.$.dashboardPane.selectViewByName("dashboard4");
				break;
			case 5:
				this.$.dashboardPane.selectViewByName("dashboard5");
				break;
			default: 
				//
				break;
		}
		
	},
	
	windowParamsChangeHandler: function() {
		if(debug) this.log("dashboard windowParamsChangeHandler: "+enyo.json.stringify(enyo.windowParams))
		
		if(enyo.windowParams.dashboardRemoteIndex) {
		
			this.dashboardRemoteIndex = enyo.windowParams.dashboardRemoteIndex;
		
			switch(this.dashboardRemoteIndex) {
				case 1:
					this.$.dashboardPane.selectViewByName("dashboard1");
					break;
				case 2:
					this.$.dashboardPane.selectViewByName("dashboard2");
					break;
				case 3:
					this.$.dashboardPane.selectViewByName("dashboard3");
					break;
				case 4:
					this.$.dashboardPane.selectViewByName("dashboard4");
					break;
				case 5:
					this.$.dashboardPane.selectViewByName("dashboard5");
					break;
				default: 
					this.dashboardRemoteIndex = 1;
					this.$.dashboardPane.selectViewByName("dashboard1");
					break;
			}
			
		}
	},
	
	dashboardClick: function() {
		if(debug) this.log("dashboardClick");
		
		this.dashboardRemoteIndex++;

		switch(this.dashboardRemoteIndex) {
			case 1:
				this.$.dashboardPane.selectViewByName("dashboard1");
				break;
			case 2:
				this.$.dashboardPane.selectViewByName("dashboard2");
				break;
			case 3:
				this.$.dashboardPane.selectViewByName("dashboard3");
				break;
			case 4:
				this.$.dashboardPane.selectViewByName("dashboard4");
				break;
			case 5:
				this.$.dashboardPane.selectViewByName("dashboard5");
				break;
			default: 
				this.dashboardRemoteIndex = 1;
				this.$.dashboardPane.selectViewByName("dashboard1");
				break;
		}
		
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {dashboardRemoteIndex: this.dashboardRemoteIndex});
	},
	
	okClick: function() {
		if(debug) this.log("okClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteKey: "enter"});
	},
	leftClick: function() {
		if(debug) this.log("leftClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteKey: "left"});
	},
	downClick: function() {
		if(debug) this.log("downClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteKey: "down"});
	},
	upClick: function() {
		if(debug) this.log("upClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteKey: "up"});
	},
	rightClick: function() {
		if(debug) this.log("rightClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteKey: "right"});
	},
	backClick: function() {
		if(debug) this.log("backClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteKey: "q"});
	},
	pauseClick: function() {
		if(debug) this.log("pauseClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteKey: "p"});
	},
	forwardClick: function() {
		if(debug) this.log("forwardClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteKey: "z"});
	},
	voldownClick: function() {
		if(debug) this.log("voldownClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteKey: "f10"});
	},
	muteClick: function() {
		if(debug) this.log("muteClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteKey: "f9"});
	},
	volupClick: function() {
		if(debug) this.log("volupClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteKey: "f11"});
	},
	escClick: function() {
		if(debug) this.log("escClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteKey: "escape"});
	},
	menuClick: function() {
		if(debug) this.log("menuClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteKey: "m"});
	},
	infoClick: function() {
		if(debug) this.log("infoClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteKey: "i"});
	},
	livetvClick: function() {
		if(debug) this.log("livetvClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteJump: "livetv"});
	},
	recordClick: function() {
		if(debug) this.log("recordClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteJump: "playbackrecordings"});
	},
	videosClick: function() {
		if(debug) this.log("videosClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteJump: "mythvideo"});
	},
	musicClick: function() {
		if(debug) this.log("musicClick");
		enyo.windows.setWindowParams(enyo.windows.getRootWindow(), {remoteJump: "playmusic"});
	},
	
});

