/* adsf*/


enyo.kind({ name: "music",
	kind: "VFlexBox",
	className: "music enyo-view",			//enyo-view needed to get vflexbox to work?
	published: {
		phonePixels: 500,
		viewMode: "tablet",
		currentSlider: "left",
		currentPane: "slidingPane",
		musicMode: "musicSongs",
	},
	
	rawResultList: [],
	fullResultList: [],
	//fullArtistsList: [],
	//fullAlbumsList: [],
	
	middleResultList: [],
	artistsList: [],
	albumsList: [],
	
	resultList: [],	
	
	editPlaylists: [],
	displayEditPlaylists: [],
	selectPlaylists: [],
	
	detailsSong: {},
	
	selectedArtist: "",
	selectedArtistIndex: -1,
	
	selectedAlbum: "",
	selectedAlbumIndex: -1,
	
	selectedSong: -1,
	selectedSongIndex: -1,
	
	selectedPlaylist: {},
	
	carouselIndex: -1,
	
	artistsFilterString: "",
	albumsFilterString: "",
	songsFilterString: "",
	
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
		onMysqlPluginCommand: "",
		onMysqlPluginExecute: "",
	},
	
	components: [
			
			{name: "streamSongService", kind: "PalmService", service: "palm://com.palm.applicationManager/", method: "launch"},
			{name: "getMusicService", kind: "WebService", handleAs: "json", onSuccess: "musicResponse", onFailure: "musicFailure"},
			{name: "getPlaylistService", kind: "WebService", handleAs: "json", onSuccess: "getPlaylistResponse", onFailure: "getPlaylistFailure"},
			{name: "savePlaylistService", kind: "WebService", handleAs: "txt", onSuccess: "savePlaylistResponse", onFailure: "savePlaylistFailure"},
			
			{name: "loadingPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, components: [
				{kind: "HFlexBox", components: [
					{kind: "Spacer"},
					{kind: "SpinnerLarge"},
					{kind: "Spacer"},
				]},
				{content: $L("Loading")+"...", style: "text-align: center;"},
				{name: "loadingPopupSubtitle", content: $L("(This may take a long time)"), style: "text-align: center;"},
			]},
			
			{name: "musicDetailsPopup", kind: "Popup", scrim: true, dismissWithClick: true, dismissWithEscape: true, className: "musicDetailsPopup", components: [
				{name: "detailsAlbumArtItem", kind: "Item", layoutKind: "HFlexLayout", className: "detailsAlbumArtItem", onclick: "musicDetailsPopupClick", components: [
					{kind: "Spacer"},
					{name: "detailsAlbumArt", kind: "Image", className: "detailsAlbumArt"},
					{kind: "Spacer"},
				]},
				{name: "detailsTitleText", kind: "Item", onclick: "musicDetailsWebClick", style: "text-align: center;"},
				{name: "detailsArtistText", kind: "Item", onclick: "musicDetailsWebClick", style: "text-align: center;"},
				{name: "detailsAlbumText", kind: "Item", onclick: "musicDetailsWebClick", style: "text-align: center;"},
				{kind: "Item", layoutKind: "HFlexLayout", className: "detailsPlayButtonsItem", components: [
					{name: "streamButton", caption: "Stream", kind: "Button", flex: 1, onclick: "playButtonClick"},
					{name: "downloadButton", caption: "Download", kind: "Button", flex: 1, onclick: "playButtonClick"},
				]},
			]},
		
			{name: "playlistConfirmPopup", kind: "Popup", scrim: true, onBeforeOpen: "beforePlaylistConfirmOpen", scrim: true, components: [
				{name: "confirmMessagePopupText", style: "text-align: center;"},
				{kind: "Button", caption: "Yes", className: "enyo-button-affirmative", onclick:"savePlaylist"},
				{kind: "Button", caption: "No", className: "enyo-button-negative", onclick:"closeConfirmPopup"},
			]},
			{name: "playlistNamePopup", kind: "Popup", onOpen: "playlistNameOpen", scrim: true, showKeyboardWhenOpening: true, components: [
				{name: "playlistNameInput", kind: "Input", hint: "Enter playlist name"},
				{kind: "Button", caption: "Save playlist", onclick: "savePlaylist"},
			]},
			
			{name: "musicPane", kind: "Pane", flex: 1, transitionKind: "enyo.transitions.Simple", onSelectView: "viewSelected", components: [
			
				{name: "slidingPane", kind: "SlidingPane", flex: 1, multiViewMinWidth: 500, onSlideComplete2: "slidingResize", onSelectView: "slidingSelected", components: [
					{name: "left", kind2: "Sliding", className: "left", dragAnywhere: false, width: "33%", components: [
						{name: "leftVFlexBox", kind: "VFlexBox", flex: 1, components: [
						
							{name: "leftHeader", kind: "Toolbar", layoutKind: "VFlexLayout", onclick: "leftRevealTop", components: [
								{name: "leftHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Music")},
								{name: "leftHeaderSubtitle", kind: "Control", className: "headerSubtitle", content: $L("Songs")},
							]},
							
							{name: "musicRadioGroup", kind: "RadioGroup", onChange: "musicRadioGroupChanged", value: "musicSongs", components: [
								{label: "Songs", value: "musicSongs"},
								{label: "Playlists", value: "musicPlaylists"},
							]},
							
							{name: "editPlaylistsWrapper", kind: "VFlexBox", showing: false, components: [
							
								//caption: $L("Playlists"), kind: "Divider"},
							
								{name: "editPlaylistSelectorItem", kind: "Item", align: "center", tapHighlight: false, layoutKind: "HFlexLayout", style: "border-top: none; border-bottom: none;", components: [
									{name: "editPlaylistSelector", kind: "ListSelector", label: $L("Playlist"), onChange: "editPlaylistChange", flex: 1, items: [
										//{"type": "1 - New", "playlist_id": "-1", "playlist_name": "Create new", "value": "+ Create new +", "label": "+ Create new +", "playlist_songs": "", "length": "0", "songcount": "0", "hostname": ""},
									]},
								]},
								
								//name: "savePlaylist", kind: "Button", width: "92%", content: "Save", onclick: "savePlaylistClick"},
					
								{caption: $L("Artists"), kind: "Divider"},
							
							]},
								
							{name: "artistsSearchInputWrapper", className: "searchInputWrapper", kind: "HFlexBox", components: [
								{name: "artistsSearchInput", kind: "Input", hint: "Filter", oninput: "artistsInput", flex: 1, components: [
									{name: "artistsSearchClear", kind: "Image", src: "images/11-x@2x.png", showing: false, className: "searchClear", onclick: "resetArtistsSearch"},
									{name: "artistsSearchSpinner", kind: "Spinner"},
								]}
							]},
							
							{name: "artistsVirtualList", kind: "VirtualList", onSetupRow: "setupArtistItem", onclick: "artistSelect", flex: 1, components: [
								{name: "artistDivider", kind: "Divider"},
								{name: "artistItem", kind: "Item", className: "artistsList", layoutKind: "HFlexLayout", components: [
									{name: "artistName", flex: 1},
									{name: "artistCount"},
								]},
							]},
			
							{name: "leftFooter", kind: "Toolbar", components: [
								{name: "leftBackCommandIcon", kind: "Control", className: "backCommandIcon", onclick: "gotBack"},
								{kind: "Spacer"},
								{name: "refreshCommandButton", icon: 'images/menu-icon-refresh.png', onclick: "getMusic"},
								{name: "savePlaylistCommandButton", caption: $L("Save Playlist"), onclick: "savePlaylistClick", showing: false},
								{kind: "Spacer"},
								{name: "leftBackCommandIconSpacer", kind: "Control", className: "backCommandIconSpacer"},
							]},
							
							{name: "savePlaylistPopupMenu", kind: "PopupSelect", className: "savePlaylistPopupMenu", onSelect: "savePlaylistSelect", onClose: "savePlaylistClosed", components: [
								//
							]},
						]},
					]},
					{name: "middle", kind2: "Sliding", className: "middle", dragAnywhere: false, width: "33%", components: [
						{name: "middleVFlexBox", kind: "VFlexBox", flex: 1, components: [
						
							{name: "middleHeader", kind: "Toolbar", layoutKind: "VFlexLayout", onclick: "middleRevealTop", components: [
								{name: "middleHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Albums")},
								{name: "middleHeaderSubtitle", kind: "Control", className: "headerSubtitle", content: "All Artists"},
							]},
							
							{name: "albumsSearchInputWrapper", className: "searchInputWrapper", kind: "HFlexBox", components: [
								{name: "albumsSearchInput", kind: "Input", hint: "Filter", oninput: "albumsInput", flex: 1, components: [
									{name: "albumsSearchClear", kind: "Image", src: "images/11-x@2x.png", showing: false, className: "searchClear", onclick: "resetAlbumsSearch"},
									{name: "albumsSearchSpinner", kind: "Spinner"},
								]}
							]},
							
							{name: "albumsVirtualList", kind: "VirtualList", onSetupRow: "setupAlbumItem", onclick: "albumSelect", flex: 1, components: [
								{name: "albumDivider", kind: "Divider"},
								{name: "albumItem", kind: "Item", className: "albumsList", layoutKind: "HFlexLayout", components: [
									{name: "albumArt", kind: "Image", className: "albumArt"},
									{name: "albumName", flex: 1},
									{name: "albumCount"},
								]},
							]},
							
							{name: "middleFooter", kind: "Toolbar", slidingHandler: false, components: [
								{name: "middleBackCommandIcon", kind: "GrabButton", className2: "backCommandIcon", onclick: "gotoLeft"},
								{kind: "Spacer"},
								{kind: "Spacer"},
							]},
							
							{name: "sortPopupMenu", kind: "PopupSelect", defaultKind: "MenuCheckItem", className: "sortPopupMenu", onSelect: "sortSelect", onClose: "sortClosed", components: [
								//
							]},
						]},
					]},
					{name: "right", kind2: "Sliding", className: "right", dragAnywhere: false, width2: "340px", flex: 1, components: [
						{name: "rightVFlexBox", kind: "VFlexBox", flex: 1, components: [
						
							{name: "rightHeader", kind: "Toolbar", layoutKind: "VFlexLayout", onclick: "rightRevealTop", components: [
								{name: "rightHeaderTitle", kind: "Control", className: "headerTitle", content: $L("Songs")},
								{name: "rightHeaderSubtitle", kind: "Control", className: "headerSubtitle", content: "All Albums"},
							]},
							
							{name: "selectPlaylistsWrapper", kind: "VFlexBox", showing: false, components: [
							
								{name: "selectPlaylistsDrawer", kind: "DividerDrawer", open: false, caption: "Playlists", animate: false, onOpenChanged: "selectPlaylistsDrawerChanged", components: [
									{name: "playlistsVirtualRepeater", kind: "VirtualRepeater", onSetupRow: "getPlaylistItem", onclick: "selectPlaylistSelect", components: [
										{name: "playlistItem", kind: "Item", className: "playlistItem", layoutKind: "HFlexLayout", components: [
											{name: "playlistName", className: "truncating", flex: 1},
											{name: "playlistChecked", kind: "Image", className: "playlistChecked", src: "images/checkmark.png"},
										]}
									]},
								]},
					
								{caption: $L("Songs"), kind: "Divider"},
							
							]},
							
							{name: "songsSearchInputWrapper", className: "searchInputWrapper", kind: "HFlexBox", components: [
								{name: "songsSearchInput", kind: "Input", hint: "Filter", oninput: "songsInput", flex: 1, components: [
									{name: "songsSearchClear", kind: "Image", src: "images/11-x@2x.png", showing: false, className: "searchClear", onclick: "resetSongsSearch"},
									{name: "songsSearchSpinner", kind: "Spinner"},
								]}
							]},
							
							{name: "songsVirtualList", kind: "VirtualList", onSetupRow: "setupSongItem", onclick: "songSelect", flex: 1, components: [
								{name: "songItem", kind: "Item", className: "songsList", layoutKind: "HFlexLayout", components: [
									{name: "songAlbumArt", kind: "Image", className: "songAlbumArt"},
									{kind: "VFlexBox", flex: 1, components: [
										{name: "songName", className: "songName truncating"},
										{name: "songArtist", className: "songArtist truncating"},
										{name: "songAlbum", className: "songAlbum truncating"},
										{name: "songTrack", className: "songTrack truncating"},
									]},
									{name: "songChecked", kind: "Image", className: "songChecked", src: "images/checkmark.png"},
								]},
							]},
							
							{name: "songsSoundWrapper", className: "songsSoundWrapper", showing: false, kind: "Item", layoutKind: "HFlexLayout", align: "center", pack: "center", components: [
								{name: "songsVideo", kind: "Video", src: "none", showControls: true, flex: 1, width: "300px", height: "30px"},
							]},
							
							{name: "rightCommandMenu", kind: "Toolbar", slidingHandler: false, components: [
								{name: "rightBackCommandIcon", kind: "GrabButton", className2: "backCommandIcon", onclick: "gotoMiddle"},
								{flex: 2},
								{name: "playCommandButton", caption: $L("Play"), onclick: "playClick", showing: false},
								{kind: "Spacer"},
								{name: "webCommandButton", caption: $L("Web"), onclick: "webClick", showing: false},
								{name: "moreCommandButton", caption: $L("More"), onclick: "moreClick", showing: false},
								{flex: 2},
							]},
							
							{name: "playPopupMenu", kind: "PopupSelect", className: "playPopupMenu", onSelect: "playSelect", onClose: "playClosed", components: [
								{name: "Download", caption: "Download"},
								{name: "Stream", caption: "Stream"},
							]},
							{name: "webPopupMenu", kind: "PopupSelect", className: "webPopupMenu", onSelect: "webSelect", onClose: "webClosed", components: [
								{caption: $L("Artist"), components: [
									{name: "Artist[]:[]Wikipedia", caption: "Wikipedia"},
									{name: "Artist[]:[]Google", caption: "Google"},
								]},
								{caption: $L("Album"), components: [
									{name: "Album[]:[]Wikipedia", caption: "Wikipedia"},
									{name: "Album[]:[]Google", caption: "Google"},
								]},
								{caption: $L("Song"), components: [
									{name: "Song[]:[]Wikipedia", caption: "Wikipedia"},
									{name: "Song[]:[]Google", caption: "Google"},
								]},
							]},
							{name: "morePopupMenu", kind: "PopupSelect", className: "morePopupMenu", onSelect: "moreSelect", onClose: "moreClosed", components: [
								{name: "Select all", caption: "Select all"},
								{name: "Deselect all", caption: "Deselect all"},
							]},
						]},
					]},
				]},
				
				{name: "musicCarousel", kind: "Carousel", flex: 1, className: "musicCarousel", onGetLeft: "getLeft", onGetRight: "getRight", onclick: "selectedCarouselProgram"},
				{name: "musicImageView", kind: "ImageView", flex: 1, className: "musicImageView", onclick: "showSlidingPane"},
				
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
		
		//this.leftRevealTop();
		//this.middleRevealTop();
		//this.rightRevealTop();
		
		if(this.fullResultList.length == 0) {
			
			this.getMusic();
		}

		this.resize(this.viewMode);
		
	},
	deactivate: function() {
		if(debug) this.log("deactivate");
		
		//this.fullResultList.length = 0;
		//this.fullGroupsList.length = 0;
		//this.fullTitlesList.length = 0;
		
		//this.detailsProgram = defaultProgram;
		
		//this.finishedGettingRecorded();
		
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
			//this.$.middleBackCommandIcon.hide();
			//this.$.middleBackCommandIconSpacer.hide();
			//this.$.rightBackCommandIcon.hide();
			//this.$.rightBackCommandIconSpacer.hide();
			
			//Show All title pick for initial tablet
			//if(this.fullResultList.length == 0) this.selectedTitle = "";
			
			this.$.slidingPane.setMultiView(true);
			
		} else {
			this.$.leftBackCommandIcon.show();
			this.$.leftBackCommandIconSpacer.show();
			//this.$.middleBackCommandIcon.show();
			//this.$.middleBackCommandIconSpacer.show();
			//this.$.rightBackCommandIcon.show();
			//this.$.rightBackCommandIconSpacer.show();
			
			this.$.slidingPane.setMultiView(false);
		}
		
		//this.$.left.render();
		//this.$.middle.render();
		//this.$.right.render();
		
		this.slidingResize();
		
		this.$.musicCarousel.render();
		this.$.musicImageView.render();
		
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
		
		this.$.artistsVirtualList.resized();
		this.$.albumsVirtualList.resized();
		this.$.songsVirtualList.resized();
		
	},
	slidingResize: function () {
		if(debug) this.log("slidingResize");
		
		this.$.slidingPane.resize();
	
	},
	gotBack: function() {
		if(debug) this.log("gotBack while we are on "+this.currentPane+" at "+this.currentSlider);
		
		if((this.currentPane == "musicImageView")||(this.currentPane == "musicCarousel")) {
		
			this.showSlidingPane();
			
		} else {
			
			if(this.viewMode == "phone") {
				//this.selectedTitle = "asdf";
				//this.selectedChanid = "";
				//this.selectedRecstartts = "";
				//this.$.titlesVirtualRepeater.render();
				//this.$.programsVirtualList.refresh();
			}
			
			if(this.$.songsSearchInput.getValue() != "") {
				this.resetSongsSearch();
			} else if(this.currentSlider == "right") {
				this.gotoMiddle();
			} else if(this.$.albumsSearchInput.getValue() != "") {
				this.resetAlbumsSearch();
			} else if(this.currentSlider == "middle") {
				this.gotoLeft();
			} else if(this.$.artistsSearchInput.getValue() != "") {
				this.resetArtistsSearch();
			} else if(this.currentSlider == "left") {
				this.doSelectMode("welcome");
			}
		}
		
	},
	gotKey: function(inKey) {
		if(debug) this.log("gotKey: "+inKey);
		
		if((this.currentSlider == "right")||(this.$.songsSearchInput.hasFocus())){
		
			this.$.songsSearchInputWrapper.show();
			this.$.songsVirtualList.resized();
			
			if((this.$.songsSearchInput.getValue() == "")&&(!this.$.songsSearchInput.hasFocus())) {
				this.$.songsSearchInput.setValue(inKey);
				this.$.songsSearchClear.show();
			}
			
			this.$.songsSearchInput.forceFocus();
			
		} else if((this.currentSlider == "middle")||(this.$.albumsSearchInput.hasFocus())){
		
			this.$.albumsSearchInputWrapper.show();
			this.$.albumsVirtualList.resized();
			
			if((this.$.albumsSearchInput.getValue() == "")&&(!this.$.albumsSearchInput.hasFocus())) {
				this.$.albumsSearchInput.setValue(inKey);
				this.$.albumsSearchClear.show();
			}
			
			this.$.albumsSearchInput.forceFocus();
			
		} else if(this.currentSlider == "left") {
		
			this.$.artistsSearchInputWrapper.show();
			this.$.artistsVirtualList.resized();
			
			if((this.$.artistsSearchInput.getValue() == "")&&(!this.$.artistsSearchInput.hasFocus())) {
				this.$.artistsSearchInput.setValue(inKey);
				this.$.artistsSearchClear.show();
			}
			
			this.$.artistsSearchInput.forceFocus();
			
		}
	},
	gotSpecialKey: function(inKey) {
		if(debug) this.log("gotSpecialKey: "+inKey);
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
			this.$.programsVirtualList.refresh();
		}
		
	},
	gotoLeft: function() {
		if(debug) this.log("gotoLeft");
		
		this.$.slidingPane.selectView(this.$.left);
		this.currentSlider = "left";
		
		if(this.viewMode == "phone") {
			//this.selectedTitle = "asdf";
			//this.selectedChanid = "";
			//this.selectedRecstartts = "";
			//this.$.titlesVirtualRepeater.render();
			//this.$.programsVirtualList.refresh();
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
			//this.selectedChanid = "";
			//this.selectedRecstartts = "";
			//this.$.titlesVirtualRepeater.render();
			//this.$.programsVirtualList.refresh();
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
		
		this.$.artistsVirtualList.punt();
	},
	middleRevealTop: function() {
		if(debug) this.log("middleRevealTop");
		
		this.$.albumsVirtualList.punt();
	},
	rightRevealTop: function() {
		if(debug) this.log("rightRevealTop");
		
		this.$.songsVirtualList.punt();
	},
	slidingSelected: function(inSender, inSliding, inLastSliding) {
		if(debug) this.log("slidingSelected: "+inSliding.id);
		
		switch(inSliding.id) {
			case 'webmyth2_music_left':
				this.currentSlider = "left";
				break;
			case 'webmyth2_music_middle':
				this.currentSlider = "middle";
				break;
			case 'webmyth2_music_right':
				this.currentSlider = "right";
				break;
		}
		
		//this.$.artistsVirtualList.resized();
		//this.$.albumsVirtualList.resized();
		//this.$.songsVirtualList.resized();
	},
	musicRadioGroupChanged: function(inSender) {
		if(debug) this.log("musicRadioGroupChanged: "+inSender.getValue());
		
		this.musicMode = inSender.getValue();
		
		for(var i = 0; i < this.fullResultList.length; i++) {
			this.fullResultList[i].inPlaylist == false;
		}
			
		this.resetSongSelect();
		
		if(this.musicMode == "musicSongs") {
			//ask to save playlist
			
			this.$.editPlaylistsWrapper.hide();
			this.$.artistsVirtualList.resized();
			
			this.$.selectPlaylistsWrapper.hide();
			this.$.songsVirtualList.resized();
			
			this.fullResultList.length = 0;
			this.fullResultList = cleanMusic(this.rawResultList);
			
			this.$.leftHeaderSubtitle.setContent($L("Songs"));
			
			this.$.refreshCommandButton.show();
			this.$.savePlaylistCommandButton.hide();
			
			this.finishedGettingMusic();
			
		} else {
		
			//this.selectedPlaylist = this.editPlaylists[0];
			this.$.editPlaylistSelector.setValue(this.selectedPlaylist.caption);
		
			this.$.editPlaylistsWrapper.show();
			this.$.artistsVirtualList.resized();
			
			this.$.selectPlaylistsWrapper.show();
			this.$.playlistsVirtualRepeater.render();
			this.$.songsVirtualList.resized();
			
			this.$.leftHeaderSubtitle.setContent($L("Playlists"));
			
			this.$.refreshCommandButton.hide();
			this.$.savePlaylistCommandButton.show();
			
			this.finishedGettingMusic();
			
			//this.doBannerMessage("Viewing playlists works, but saving currently does not", true);
		}
	},
	editPlaylistChange: function(inSender, inValue, inOldValue) {
		if(debug) this.log("editPlaylistChange from "+inOldValue+" to "+inValue+" and getValue: "+this.$.editPlaylistSelector.getValue());
		
		//ask to save old
		
		this.selectedPlaylist = {};
		
		for(var i = 0; i < this.editPlaylists.length; i++) {
			if(inValue == this.editPlaylists[i].caption) this.selectedPlaylist = this.editPlaylists[i];
		}
		
		if(debug) this.log("selectedPlaylist: "+enyo.json.stringify(this.selectedPlaylist));
		
		this.fullResultList.length = 0;
		this.selectPlaylists.length = 0;
		
		this.fullResultList = parseMusicInPlaylist(this.rawResultList, this.selectedPlaylist);
		this.selectPlaylists = parsePlaylistsInPlaylist(this.editPlaylists, this.selectedPlaylist);
		
		this.$.playlistsVirtualRepeater.render();
		
		this.$.editPlaylistSelector.setValue(this.selectedPlaylist.caption);
		
		this.finishedGettingMusic();
		
	},
	savePlaylistClick: function() {
		if(debug) this.log("savePlaylistClick");
		
		var saveOptions = [];
		
		switch(this.selectedPlaylist.type) {
			case "1 - New":
				saveOptions.push({caption: "New playlist"});
				break;
			case "2 - Host":
				saveOptions.push({caption: "Update '"+this.selectedPlaylist.caption+"'"});
				saveOptions.push({caption: "New playlist"});
				break;
			case "3 - Named":
				saveOptions.push({caption: "Update '"+this.selectedPlaylist.caption+"'"});
				saveOptions.push({caption: "New playlist"});
				saveOptions.push({caption: "Delete"});
				break;
		}
				
		
		this.$.savePlaylistPopupMenu.setItems(saveOptions);
		
		this.$.savePlaylistPopupMenu.openAroundControl(this.$.savePlaylistCommandButton);
		
	},
	savePlaylistSelect: function(inSender, inEvent) {
		if(debug) this.log("savePlaylistSelect: "+inEvent.value);
		
		this.savePlaylistType = inEvent.value;
		
		switch(inEvent.value) {
			case "New playlist":
				this.$.playlistNamePopup.openAtCenter();
				break;
			case "Update '"+this.selectedPlaylist.caption+"'": 
				this.popupMessage = "If you are currently listening to music or have done so recently on this frontend your updates will not be saved.  You must close out of the MythTV frontend completely before your changes can be saved.  Do you want to save now?";
				if(this.selectedPlaylist.type == "2 - Host") {
					this.$.playlistConfirmPopup.openAtCenter();
				} else {
					this.savePlaylist();
				}
				break;
			case "Delete":
				this.popupMessage = "Are you sure you want to delete the playlist '"+this.selectedPlaylist.playlist_name+"'?";
				this.$.playlistConfirmPopup.openAtCenter();
				break;
		}
	
	},
	beforePlaylistConfirmOpen: function() {
		if(debug) this.log("beforePlaylistConfirmOpen");
		
		this.$.confirmMessagePopupText.setContent(this.popupMessage);
		
	},
	closeConfirmPopup: function() {
		if(debug) this.log("closeConfirmPopup");
		
		this.$.playlistConfirmPopup.close();
	},
	playlistNameOpen: function() {
		if(debug) this.log("playlistNameOpen");
		
		this.$.playlistNameInput.forceFocusEnableKeyboard();
	},
	savePlaylist: function() {
		if(debug) this.log("savePlaylist");
		
		this.$.playlistConfirmPopup.close();
		this.$.playlistNamePopup.close();
		
		var songArray = [];
		var arrayIndex = 0, totalLength = 0;
		
		if(this.selectedPlaylist.type == "2 - Host") {
			for(i = 0; i < this.selectPlaylists.length; i++){
			
				s = this.selectPlaylists[i];
				
				if(s.inPlaylist) {
					s.index = this.selectPlaylists.indexOf(s);
					s.song_id = parseInt(s.playlist_id)*(-1);
					s.type = "playlist";
					
					songArray[arrayIndex] = s.song_id;
					totalLength += parseInt(s.length);
					arrayIndex++;
					
				}
				
			}
		}
		
		this.fullResultList.sort(sort_by("playlistOrder"));
		
		for(i = 0; i < this.fullResultList.length; i++){
			
			s = this.fullResultList[i];
			
			if(s.inPlaylist) {
				s.index = this.fullResultList.indexOf(s);
				s.type = "song";
				
				if(debug) this.log("matching song "+s.name+" "+s.index);
				
				songArray[arrayIndex] = s.song_id;
				totalLength += parseInt(s.length);
				arrayIndex++;
			}
			
		}
		
		this.songArrayString = songArray.toString();
		this.newSongcount = arrayIndex;
		this.newLength = totalLength;
	
		if(debug) this.log("New array list is "+this.songArrayString+" with length "+this.newLength);
		
		var query = "";
		
		switch(this.savePlaylistType) {
			case "New playlist":
				query += 'INSERT INTO `music_playlists` SET `playlist_name` = "'+this.$.playlistNameInput.getValue()+'", `playlist_songs` = "'+songArray.toString();
				query += '", `length` = "'+totalLength+'", `songcount` = "'+arrayIndex;
				query += '" ;';
				break;
			case "Update '"+this.selectedPlaylist.caption+"'":
				query += 'UPDATE `music_playlists` SET `playlist_songs` = "'+songArray.toString();
				query += '", `length` = "'+totalLength+'", `songcount` = "'+arrayIndex;
				query += '" WHERE `playlist_id` = "'+this.selectedPlaylist.playlist_id+'" LIMIT 1 ;';
				break;
			case "Delete":
				query += 'DELETE FROM `music_playlists` ';
				query += ' WHERE `playlist_id` = "'+this.selectedPlaylist.playlist_id+'" LIMIT 1 ;';
				break;
		}
		
		if(debug) this.log("query is "+query);
			
		if(WebMyth.useScript) {
			
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQL";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.savePlaylistService.setUrl(requestUrl);
			this.$.savePlaylistService.call();
		
		} else {
		
			this.doMysqlPluginExecute("mysqlMusicSavePlaylist", query);
		
		}
		
	},
	savePlaylistResponse: function(inSender, inResponse) {
		if(debug) this.log("savePlaylistResponse: "+inResponse);
		
		if(this.savePlaylistType == "Delete") {
			this.doBannerMessage("Deleted playlist");
		} else {
			this.doBannerMessage("Saved playlist");
		}
		
		this.$.musicRadioGroup.setValue("musicSongs");
		this.musicMode = "musicSongs";
		
		this.getPlaylists();
		
	},
	savePlaylistFailure: function(inSender, inResponse) {
		if(debug) this.log("savePlaylistFailure");
		
		if(this.savePlaylistType == "Delete") {
			this.doBannerMessage("Error deleting playlist");
		} else {
			this.doBannerMessage("Error saving playlist");
		}
		
	},
	artistsInput: function() {
		if(debug) this.log("artistsInput: "+this.$.artistsSearchInput.getValue());
		
		this.$.artistsSearchClear.hide();
		this.$.artistsSearchSpinner.show();
		
		enyo.job("artistsSearch", enyo.bind(this, "artistsSearch"),200);
	},
	artistsSearch: function(inSender) {
		if(debug) this.log("artistsSearch: "+this.$.artistsSearchInput.getValue());
		
		this.$.artistsSearchClear.show();
		this.$.artistsSearchSpinner.hide();
		
		this.finishedGettingMusic();
		
		this.$.artistsSearchInputWrapper.show();
		this.$.artistsVirtualList.resized();
	},
	resetArtistsSearch: function(inSender) {
		if(debug) this.log("resetArtistsSearch");
		
		this.$.artistsSearchInput.setValue("");
		this.$.artistsSearchClear.hide();
		
		if(this.viewMode == "tablet") {
			this.$.artistsSearchInputWrapper.show();
			this.$.artistsVirtualList.resized();
		} else {
			//this.$.artistsSearchInputWrapper.hide();
			this.$.artistsVirtualList.resized();
		}
		
		this.finishedGettingMusic();
	},
	artistSelect: function(inSender, inEvent) {
		if(debug) this.log("artistSelect index "+inEvent.rowIndex);
		
		var oldArtistIndex = this.selectedArtistIndex;
		
		this.selectedArtistIndex = inEvent.rowIndex;
		this.selectedArtist = this.artistsList[inEvent.rowIndex].value;
		
		this.$.artistsVirtualList.refresh();
		//this.$.artistsVirtualList.updateRow(oldArtistIndex);
		//this.$.artistsVirtualList.updateRow(this.selectedTitleIndex);
		
		if(this.viewMode == "phone") this.gotoMiddle();
		
		//this.selectedAlbum = "";
		this.selectedAlbumIndex = -1;
		
		this.finishedSelectingArtist();
	},
	albumsInput: function() {
		if(debug) this.log("albumsInput: "+this.$.albumsSearchInput.getValue());
		
		this.$.albumsSearchClear.hide();
		this.$.albumsSearchSpinner.show();
		
		enyo.job("albumsSearch", enyo.bind(this, "albumsSearch"),200);
	},
	albumsSearch: function(inSender) {
		if(debug) this.log("albumsSearch: "+this.$.albumsSearchInput.getValue());
		
		this.$.albumsSearchClear.show();
		this.$.albumsSearchSpinner.hide();
		
		this.finishedSelectingArtist();
		
		this.$.albumsSearchInputWrapper.show();
		this.$.albumsVirtualList.resized();
	},
	resetAlbumsSearch: function(inSender) {
		if(debug) this.log("resetAlbumsSearch");
		
		this.$.albumsSearchInput.setValue("");
		this.$.albumsSearchClear.hide();
		
		if(this.viewMode == "tablet") {
			this.$.albumsSearchInputWrapper.show();
			this.$.albumsVirtualList.resized();
		} else {
			//this.$.albumsSearchInputWrapper.hide();
			this.$.albumsVirtualList.resized();
		}
		
		this.finishedSelectingArtist();
	},
	albumSelect: function(inSender, inEvent) {
		if(debug) this.log("albumSelect index "+inEvent.rowIndex);
		
		var oldAlbumIndex = this.selectedAlbumIndex;
		
		this.selectedAlbumIndex = inEvent.rowIndex;
		this.selectedAlbum = this.albumsList[inEvent.rowIndex].value;
		
		if(debug) this.log("selectedAlbum JSON: "+enyo.json.stringify(this.albumsList[inEvent.rowIndex]));
		
		this.$.albumsVirtualList.refresh();
		//this.$.albumsVirtualList.updateRow(oldAlbumIndex);
		//this.$.albumsVirtualList.updateRow(this.selectedAlbumIndex);
		
		if(this.viewMode == "phone") this.gotoRight();
		
		this.finishedSelectingAlbum();
		
	},
	songsInput: function() {
		if(debug) this.log("songsInput: "+this.$.songsSearchInput.getValue());
		
		this.$.songsSearchClear.hide();
		this.$.songsSearchSpinner.show();
		
		enyo.job("songsSearch", enyo.bind(this, "songsSearch"),200);
	},
	songsSearch: function(inSender) {
		if(debug) this.log("songsSearch: "+this.$.songsSearchInput.getValue());
		
		this.$.songsSearchClear.show();
		this.$.songsSearchSpinner.hide();
		
		this.finishedSelectingAlbum();
		
		this.$.songsSearchInputWrapper.show();
		this.$.songsVirtualList.resized();
	},
	resetSongsSearch: function(inSender) {
		if(debug) this.log("resetSongsSearch");
		
		this.$.songsSearchInput.setValue("");
		this.$.songsSearchClear.hide();
		
		if(this.viewMode == "tablet") {
			this.$.songsSearchInputWrapper.show();
			this.$.songsVirtualList.resized();
		} else {
			//this.$.songsSearchInputWrapper.hide();
			this.$.songsVirtualList.resized();
		}
		
		this.finishedSelectingAlbum();
	},
	songSelect: function(inSender, inEvent) {
		if(debug) this.log("songSelect index: "+inEvent.rowIndex);
		
		//this.localStopClick();
		
		var oldSongIndex = parseInt(this.selectedSongIndex);
		
		this.selectedSongIndex = inEvent.rowIndex;
		this.selectedSong = this.resultList[inEvent.rowIndex]; 
		var row = this.selectedSong;
		
		//if(debug) this.log("songSelect: "+enyo.json.stringify(this.selectedSong));
		
		//this.$.songsSoundWrapper.show();
		//this.$.songsVirtualList.resized();
		
		if(this.musicMode == "musicPlaylists") {
			this.$.playCommandButton.show();
			//this.$.demoCommandButton.show();
			this.$.webCommandButton.hide();
			this.$.moreCommandButton.show();
			
			//this.$.moreCommandSpacer2.hide();
		} else {
			this.$.playCommandButton.show();
			//this.$.demoCommandButton.show();
			this.$.webCommandButton.show();
			this.$.moreCommandButton.hide();
			
			//this.$.moreCommandSpacer2.show();
		}
		
		var songUrl = "";
			
		if((WebMyth.prefsCookie.mythwebXml)&&(true)) {	
			//doesn't work for music?
		
			//songUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetMusic?MythXMLKey=";
			//songUrl += WebMyth.prefsCookie.MythXML_key;
			//songUrl += "&Id=";
			//songUrl += row.song_id;
			
			songUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":6544/Myth/GetMusic?Id=";
			songUrl += row.song_id;
				
		} else {
			
			songUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":6544/Myth/GetMusic?Id=";
			songUrl += row.song_id;
			
		}
		
		this.selectedSong.songUrl = songUrl;
		
		//this.$.songsSound.setSrc(songUrl);
		//this.$.songsVideo.setSrc(songUrl);
		this.$.songsVideo.setSrc("none");
		
		if(this.musicMode == "musicPlaylists") {
		
			this.resultList[inEvent.rowIndex].inPlaylist = !this.resultList[inEvent.rowIndex].inPlaylist;
			
			if(this.resultList[inEvent.rowIndex].inPlaylist) {
				this.resultList[inEvent.rowIndex].playlistOrder = 500000;
			} else {
				this.resultList[inEvent.rowIndex].playlistOrder = 9000000;
			}
			
		} else {
			
			var albumArtUrl = "";
				
			if(WebMyth.prefsCookie.mythwebXml) {
			
				//album art is not supported by mythweb XML module 
				
				albumArtUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetAlbumArt?MythXMLKey=";
				albumArtUrl += WebMyth.prefsCookie.MythXML_key;
				albumArtUrl += "&Id=";
				albumArtUrl += row.albumart_id;
				
				//albumArtUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":6544/Myth/GetAlbumArt?Id=";
				//albumArtUrl += row.albumart_id;
					
			} else {
				
				albumArtUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":6544/Myth/GetAlbumArt?Id=";
				albumArtUrl += row.albumart_id;
				
			}
			
			//popup
			/*
			if(row.albumart_id == "None") {
				this.$.detailsAlbumArtItem.hide();
			} else {
				this.$.detailsAlbumArt.setSrc(albumArtUrl);
				this.$.detailsAlbumArtItem.show();
			}
			
			this.$.detailsTitleText.setContent(row.name);
			this.$.detailsArtistText.setContent(row.artist_name);
			this.$.detailsAlbumText.setContent(row.album_name);
			
			//this.$.musicDetailsPopup.openAtCenter();
			*/
			
		}
		
		
		this.$.songsVirtualList.updateRow(oldSongIndex);
		this.$.songsVirtualList.updateRow(this.selectedSongIndex);
		//this.$.songsVirtualList.refresh();
		
		//setTimeout(enyo.bind(this,"updateSongRow",this.selectedSongIndex),50);
		//setTimeout(enyo.bind(this,"updateSongRow",this.selectedSongIndex),100);
		//setTimeout(enyo.bind(this,"updateSongRow",this.selectedSongIndex),150);
		//setTimeout(enyo.bind(this,"updateSongRow",this.selectedSongIndex),200);
		//setTimeout(enyo.bind(this,"updateSongRow",this.selectedSongIndex),250);
		//setTimeout(enyo.bind(this,"updateSongRow",this.selectedSongIndex),300);
		
		return true;
		
	},
	updateSongRow: function(inIndex) {
		if(debug) this.log("updateSongRow: "+inIndex);
		
		this.$.songsVirtualList.updateRow(inIndex);
		
	},
	resetSongSelect: function() {
		if(debug) this.log("resetSongSelect");
		
		setTimeout(enyo.bind(this,"localStopClick"),5);
		
		this.$.songsSoundWrapper.hide();
		this.$.songsVirtualList.resized();
		
		if(this.musicMode == "musicPlaylists") {
			this.$.playCommandButton.hide();
			//this.$.demoCommandButton.hide();
			this.$.webCommandButton.hide();
			this.$.moreCommandButton.hide();
			
			//this.$.moreCommandSpacer1.show();
			//this.$.moreCommandSpacer2.show();
		} else {
			this.$.playCommandButton.hide();
			//this.$.demoCommandButton.hide();
			this.$.webCommandButton.hide();
			this.$.moreCommandButton.hide();
			
			//this.$.moreCommandSpacer1.hide();
			//this.$.moreCommandSpacer2.show();
		}
		
		this.selectedSongIndex = -1;
		
		//this.$.songsVirtualList.refresh();
	},
	demoClick: function() {
		if(debug) this.log("demoClick");
		
		this.$.songsVideo.setSrc(this.selectedSong.songUrl);
		this.$.songsVideo.node.play();
	},
	localStopClick: function() {
		if(debug) this.log("localStopClick");
		/*
		try {
			this.$.songsVideo.node.stop();
		} catch(e) {
			this.log(e);
			try {
				this.$.songsVideo.node.pause();
			} catch(e) {
				this.log(e);
			}
		}
		*/
	},
	playClick: function(inSender, inEvent) {
		if(debug) this.log("playClick");
		
		this.$.playPopupMenu.openAroundControl(this.$.playCommandButton);
	},
	playSelect: function(inSender, inEvent) {
		if(inEvent) {
			if(debug) this.log("playSelect: "+inEvent.value);
			
			var row = this.selectedSong;
			
			var songUrl = "";
				
			if((WebMyth.prefsCookie.mythwebXml)&&(true)) {	
				//doesn't work for music?
			
				//songUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetMusic?MythXMLKey=";
				//songUrl += WebMyth.prefsCookie.MythXML_key;
				//songUrl += "&Id=";
				//songUrl += row.song_id;
				
				songUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":6544/Myth/GetMusic?Id=";
				songUrl += row.song_id;
					
			} else {
				
				songUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":6544/Myth/GetMusic?Id=";
				songUrl += row.song_id;
				
			}
			
			if(inEvent.value == "Stream") {
			
				if(window.PalmSystem) {
					this.$.streamSongService.call({id: "com.palm.app.streamingmusicplayer", target: songUrl, params: {target: songUrl}});
				} else {
					window.open(songUrl);
				}
				
			} else {
					
				var u = row.filename.split("/");
				var songFilename = u[u.length - 1];
				
				var songDirectory = "/media/internal/music/"+row.artist_name+"/"+row.album_name+"/";
				
				this.doDownloadFile(songUrl, songFilename, songDirectory, "com.palm.app.musicplayer");
				this.doDownloadFile(songUrl, songFilename, songDirectory);
			
			}
			
			//this.$.musicDetailsPopup.close();
		}
	},
	webClick: function(inSender, inEvent) {
		if(debug) this.log("webClick");
		
		this.$.webPopupMenu.openAroundControl(this.$.webCommandButton);
	},
	webSelect: function(inSender, inEvent) {
		if(inEvent) {
			if(debug) this.log("webSelect: "+inEvent.value);
			
			switch(inEvent.value) {
				case "Wikipedia":
					if(this.webType == $L("Artist")) this.doOpenWeb("Wikipedia", this.selectedSong.artist_name);
					else if(this.webType == $L("Album")) this.doOpenWeb("Wikipedia", this.selectedSong.album_name);
					else if(this.webType == $L("Song")) this.doOpenWeb("Wikipedia", this.selectedSong.name);
					break;
				case "Google":
					if(this.webType == $L("Artist")) this.doOpenWeb("Google", this.selectedSong.artist_name);
					else if(this.webType == $L("Album")) this.doOpenWeb("Google", this.selectedSong.album_name);
					else if(this.webType == $L("Song")) this.doOpenWeb("Google", this.selectedSong.name);
					break;
				default:
					this.webType = inEvent.value;
					break;
			}
		}
	},
	moreClick: function(inSender, inEvent) {
		if(debug) this.log("moreClick");
		
		this.$.morePopupMenu.openAroundControl(this.$.moreCommandButton);
	},
	moreSelect: function(inSender, inEvent) {
		if(inEvent) {
			if(debug) this.log("moreSelect: "+inEvent.value);
			
			switch(inEvent.value) {
				case "Select all": 
					
					for(var i = 0; i < this.resultList.length; i++) {
						this.resultList[i].inPlaylist = true;
						if(this.resultList[i].playlistOrder == 9000000) this.resultList[i].playlistOrder = 500000;
					}
					
					this.$.songsVirtualList.punt();
					
					break;
				case "Deselect all": 
					
					for(var i = 0; i < this.resultList.length; i++) {
						this.resultList[i].inPlaylist = false;
						this.resultList[i].playlistOrder = 9000000;
					}
					
					this.$.songsVirtualList.punt();
					
					break;
			}
			
		}
	},
	musicDetailsPopupClick: function(inSender) {
		if(debug) this.log("musicDetailsPopupClick: "+inSender.getName());
		
		this.$.musicDetailsPopup.close();
	},
	musicDetailsWebClick: function(inSender) {
		if(debug) this.log("musicDetailsWebClick: "+inSender.getName());
		
		switch(inSender.getName()) {
			case "detailsTitleText":
				this.doOpenWeb("Google", this.selectedSong.name);
				break;
			case "detailsArtistText":
				this.doOpenWeb("Google", this.selectedSong.artist_name);
				break;
			case "detailsAlbumText":
				this.doOpenWeb("Google", this.selectedSong.album_name);
				break;
		}
		
		this.$.musicDetailsPopup.close();
	},
	showSlidingPane: function() {
		if(debug)	this.log("showSlidingPane");
		
		this.$.musicPane.selectViewByName("slidingPane");
	},
	selectPlaylistsDrawerChanged: function() {
		if(debug) this.log("selectPlaylistsDrawerChanged");
		
		try {
			this.$.songsVirtualList.resized();
		} catch(e) {
			if(debug) this.log(e);
		}
	},
	selectPlaylistSelect: function(inSender, inEvent) {
		if(debug) this.log("selectPlaylistSelect "+inEvent.rowIndex);
		
		this.selectPlaylists[inEvent.rowIndex].inPlaylist = !this.selectPlaylists[inEvent.rowIndex].inPlaylist;
		
		this.$.playlistsVirtualRepeater.render();
		
	},
	
	
	
	//Music functions
	getMusic: function() {
		if(debug) this.log("getMusic");
		
		this.rawResultList.length = 0;
		this.fullResultList.length = 0;
		
		this.getSomeMusic();
		
	},
	getSomeMusic: function() {
		
		//this.$.scrim.show();
		this.$.loadingPopup.openAtCenter();
		this.$.spinnerLarge.show();
			
		var query = "SELECT music_songs.song_id, music_songs.name, music_songs.filename, music_songs.year, music_songs.track, music_songs.length, "; 
		query += " music_songs.artist_id, music_songs.album_id, ";
		query += " music_artists.artist_name, ";
		query += " music_albums.album_name, music_albums.compilation, ";
		query += " music_albumart.albumart_id ";
		query += " FROM music_songs ";
		query += " LEFT OUTER JOIN music_artists ON music_songs.artist_id = music_artists.artist_id ";
		query += " LEFT OUTER JOIN music_albums ON music_songs.album_id = music_albums.album_id ";
		query += " LEFT OUTER JOIN music_albumart ON music_songs.directory_id = music_albumart.directory_id ";
		query += " GROUP BY song_id ";
		query += " LIMIT "+this.fullResultList.length+",2000 ";
		query += " ; ";
		
		
		if(debug) this.log("music query is :"+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQLwithResponse";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.getMusicService.setUrl(requestUrl);
			this.$.getMusicService.call();
		
		} else {
			
			this.doMysqlPluginCommand("mysqlMusicGetMusic", query);
			
		}
		
	},
	musicResponse: function(inSender, inResponse) {
		if(debug) this.log("musicResponse");
		//if(debug) this.log("musicResponse: "+enyo.json.stringify(inResponse));
		
		if(inResponse == " ]\n") {
			//no matching searches
		} else {
			var rawMusic = inResponse;
			var cleanedMusic = cleanMusic(rawMusic);
			
			this.rawResultList = this.rawResultList.concat(rawMusic);
			this.fullResultList = this.fullResultList.concat(cleanedMusic);
		}
		
		if(debug) this.log("this.fullResultList.length: "+this.fullResultList.length);
		
		if(this.fullResultList.length < WebMyth.prefsCookie.music_songs) {
			this.$.loadingPopupSubtitle.setContent("(Loaded "+this.fullResultList.length+" of "+WebMyth.prefsCookie.music_songs+" songs)");
			this.getSomeMusic();
		} else {
			this.getPlaylists();
		}
		
	},
	musicFailure: function(inSender, inResponse) {
		this.error("musicFailure");
		
		this.bannerMessage("ERROR: Failed to get music from backend at '"+WebMyth.prefsCookie.webserverName+"'");
		
		this.getPlaylists();
	},
	getPlaylists: function() {
		if(debug) this.log("getPlaylists");
			
		var query = "SELECT * ";
		query += " FROM music_playlists ;";
		
		if(debug) this.log("playlist query is :"+query);
		
		if(WebMyth.useScript) {
		
			var requestUrl = "http://"+WebMyth.prefsCookie.webserverName+"/"+WebMyth.prefsCookie.webmythPythonFile;
			requestUrl += "?op=executeSQLwithResponse";				
			requestUrl += "&query64=";		
			requestUrl += Base64.encode(query);
			
			if(debug) this.log("requestUrl: "+requestUrl);
		
			this.$.getPlaylistService.setUrl(requestUrl);
			this.$.getPlaylistService.call();
		
		} else {
			
			this.doMysqlPluginCommand("mysqlMusicGetPlaylists", query);
			
		}
	},
	getPlaylistResponse: function(inSender, inResponse) {
		if(debug) this.log("getPlaylistResponse");
		//if(debug) this.log("getPlaylistResponse: "+enyo.json.stringify(inResponse));
		
		this.editPlaylists.length = 0;
		this.displayEditPlaylists.length = 0;
		
		if(inResponse == " ]\n") {
			//no matching searches
		} else {
			this.editPlaylists = cleanMusicPlaylists(inResponse);
			
			//if(debug) this.log("this.editPlaylists: "+enyo.json.stringify(this.editPlaylists));
			
			for(var i = 0; i < this.editPlaylists.length; i++) {
				this.displayEditPlaylists.push(this.editPlaylists[i].caption);
			}
			
			if(debug) this.log("this.displayEditPlaylists: "+enyo.json.stringify(this.displayEditPlaylists));
			
			this.selectPlaylists.length = 0;
			
			var newList = this.editPlaylists.concat([]);
			
			for(var i = 0; i < newList.length; i++) {
				
				var s = newList[i];
				
				if(s.type == "3 - Named"){
					this.selectPlaylists.push(s);
				}
				
			}
			
			//if(debug) this.log("this.selectPlaylists: "+enyo.json.stringify(this.selectPlaylists));
			
			this.$.playlistsVirtualRepeater.render();
		}
		
		this.$.editPlaylistSelector.setItems(this.displayEditPlaylists);
		this.selectedPlaylist = this.editPlaylists[0];
		this.$.editPlaylistSelector.setValue(this.selectedPlaylist.caption);
		
		this.resetSongsSearch();
		this.finishedGettingMusic();
		
	},
	getPlaylistFailure: function(inSender, inResponse) {
		this.error("getPlaylistFailure");
		
		this.bannerMessage("ERROR: Failed to get music from backend at '"+WebMyth.prefsCookie.webserverName+"'");
		
		this.finishedGettingMusic();
	},
	finishedGettingMusic: function() {
		if(debug) this.log("finishedGettingMusic");
		
		if(this.$.musicRadioGroup.getValue() == "musicSongs") {
			this.$.editPlaylistsWrapper.hide();
			
			this.$.selectPlaylistsWrapper.hide();
			this.$.songsVirtualList.resized();
			
		} else if(this.selectedPlaylist.type == "2 - Host") {
			this.$.editPlaylistsWrapper.show();
			
			this.$.selectPlaylistsWrapper.show();
			this.$.playlistsVirtualRepeater.render();
			this.$.songsVirtualList.resized();
			
		} else {
			this.$.editPlaylistsWrapper.show();
			
			this.$.selectPlaylistsWrapper.hide();
			this.$.songsVirtualList.resized();
		}
		
		this.resize(this.viewMode);
		
		this.artistsList.length = 0;
		
		this.artistsList = cleanListGroup(this.filterArtists(this.fullResultList),"artist_name", "artist_name");
		this.artistsList.sort(sort_by("label"));
		this.artistsList.splice(0,0,{label: "All", value: "", count: this.fullResultList.length});
		
		//if(debug) this.log("artistsList: "+enyo.json.stringify(this.artistsList));
		
		this.$.artistsVirtualList.punt();
		
		this.finishedSelectingArtist();
		//this.resetAlbumsSearch();
	},
	finishedSelectingArtist: function() {
		if(debug) this.log("finishedSelectingArtist with selectedArtist: "+this.selectedArtist);
	
		this.albumsList.length = 0;
		this.middleResultList.length = 0;
		
		this.middleResultList = trimList(this.fullResultList,"artist_name",this.selectedArtist);
		
		this.albumsList = cleanListGroup(this.filterAlbums(this.middleResultList),"album_name", "albumart_id");
		this.albumsList.sort(sort_by("label"));
		this.albumsList.splice(0,0,{label: "All", value: "", extraField: "None", count: this.middleResultList.length});
		
		if(this.selectedArtist == "") {
			this.$.middleHeaderSubtitle.setContent("All Artists");
		} else {
			this.$.middleHeaderSubtitle.setContent("Artist: "+this.selectedArtist);
		}
		
		//this.$.middleHeaderCount.setContent(this.albumsList.length);
		
		//if(debug) this.log("albumsList: "+enyo.json.stringify(this.albumsList));
		
		this.$.albumsVirtualList.punt();
		
		this.finishedSelectingAlbum();
		//this.resetSongSelect();
	},
	finishedSelectingAlbum: function() {
		if(debug) this.log("finishedSelectingAlbum with selectedAlbum: "+this.selectedAlbum);
		
		this.resultList.length = 0;
		this.resultList = this.filterSongs(trimList(this.middleResultList,"album_name",this.selectedAlbum));
		
		if(this.musicMode == "musicPlaylists") {
			this.resultList.sort(sort_by("playlistOrder"));
		} else {
			this.resultList.sort(double_sort_by("track", "name"));
		}
		
		
		this.resetSongSelect();
		this.$.songsVirtualList.punt();
		
		if((this.selectedAlbum == "")&&(this.selectedArtist == "")) {
			this.$.rightHeaderSubtitle.setContent("All Albums");
		} else if(this.selectedAlbum == "") {
			this.$.rightHeaderSubtitle.setContent("All Albums ["+this.selectedArtist+"]");
		} else {
			this.$.rightHeaderSubtitle.setContent("Album: "+this.selectedAlbum);
		}
		
		this.$.loadingPopup.hide();
		enyo.scrim.hide();
		
	},
	filterArtists: function(inList) {
		if(debug) this.log("filterArtists with list of length: "+inList.length);
		
		var finalList = [];
		var s = {};
		var filterString = this.$.artistsSearchInput.getValue().toUpperCase();
		
		for(var i = 0; i < inList.length; i++) {
			s = inList[i];
		
			if(s.artist_name.toUpperCase().indexOf(filterString) >= 0) {
				finalList.push(s);
			} 
		}	
		
		return finalList;
	},
	setupArtistItem: function(inSender, inIndex) {
		var row = this.artistsList[inIndex];
		
		if(row) {
		
			this.setupArtistDivider(inIndex);
			
			this.$.artistName.setContent(row.label);
			this.$.artistCount.setContent("("+row.count+")");
						
			if((row.value == this.selectedArtist)&&(this.viewMode == "tablet")) {
				this.$.artistItem.addClass("selected");
			} else {
				this.$.artistItem.removeClass("selected");
			}
			
			if(inIndex == 0) this.$.artistItem.setStyle("border-top: none; border-bottom: none;");
			
			return true;
		}
		
	},
	setupArtistDivider: function(inIndex) {
		//if(debug) this.log("setupArtistDivider at index: "+inIndex);
		
		// use group divider at group transition, otherwise use item border for divider
		var group = this.getArtistGroupName(inIndex);
		this.$.artistDivider.setCaption(group);
		this.$.artistDivider.canGenerate = Boolean(group);
		this.$.artistItem.applyStyle("border-top", Boolean(group) ? "none" : "1px solid silver;");
		this.$.artistItem.applyStyle("border-bottom", "none;");
    },
	getArtistGroupName: function(inIndex) {
		//if(debug) this.log("getArtistGroupName at index: "+inIndex);
		
		var r0 = this.artistsList[inIndex-1];
		var r1 = this.artistsList[inIndex];
		
		var a = r0 && r0.label.substring(0,1);
		var b = r1.label.substring(0,1);
		
		if(!enyo.g11n.Char.isLetter(a)) a = "#";
		if(!enyo.g11n.Char.isLetter(b)) b = "#";
		
		if(inIndex == 0) {
			return "All Artists";
		} else if(inIndex == 1) {
			return b;
		} else {
			return a != b ? b : null;
		}
	},
	filterAlbums: function(inList) {
		if(debug) this.log("filterAlbums with list of length: "+inList.length);
		
		var finalList = [];
		var s = {};
		var filterString = this.$.albumsSearchInput.getValue().toUpperCase();
		
		for(var i = 0; i < inList.length; i++) {
			s = inList[i];
		
			if(s.album_name.toUpperCase().indexOf(filterString) >= 0) {
				finalList.push(s);
			} 
		}	
		
		return finalList;
	},
	setupAlbumItem: function(inSender, inIndex) {
		var row = this.albumsList[inIndex];
		
		if(row) {
		
			this.setupAlbumDivider(inIndex);
			
			var albumArtUrl = "";
				
			if(WebMyth.prefsCookie.mythwebXml) {
			
				//album art is not supported by mythweb XML module 
				
				albumArtUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetAlbumArt?MythXMLKey=";
				albumArtUrl += WebMyth.prefsCookie.MythXML_key;
				albumArtUrl += "&Id=";
				albumArtUrl += row.extraField;
				
				//albumArtUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":6544/Myth/GetAlbumArt?Id=";
				//albumArtUrl += row.extraField;
					
			} else {
				
				albumArtUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":6544/Myth/GetAlbumArt?Id=";
				albumArtUrl += row.extraField;
				
			}
			
			if((row.extraField == "None")||(row.extraField == "")) {
				this.$.albumArt.hide();
				this.$.albumItem.removeClass("hasAlbumArt");
			} else {
				this.$.albumArt.setSrc(albumArtUrl);
				this.$.albumArt.show();
				this.$.albumItem.addClass("hasAlbumArt");
			}
			
			this.$.albumName.setContent(row.label);
			this.$.albumCount.setContent("("+row.count+")");
						
			if((row.value == this.selectedAlbum)&&(this.viewMode == "tablet")) {
				this.$.albumItem.addClass("selected");
			} else {
				this.$.albumItem.removeClass("selected");
			}
			
			if(inIndex == 0) this.$.artistItem.setStyle("border-top: none;");
			
			return true;
		}
		
	},
	setupAlbumDivider: function(inIndex) {
		//if(debug) this.log("setupAlbumDivider at index: "+inIndex);
		
		// use group divider at group transition, otherwise use item border for divider
		var group = this.getAlbumGroupName(inIndex);
		this.$.albumDivider.setCaption(group);
		this.$.albumDivider.canGenerate = Boolean(group);
		this.$.albumItem.applyStyle("border-top", Boolean(group) ? "none" : "1px solid silver;");
		this.$.albumItem.applyStyle("border-bottom", "none;");
    },
	getAlbumGroupName: function(inIndex) {
		//if(debug) this.log("v at index: "+inIndex);
		
		var r0 = this.albumsList[inIndex-1];
		var r1 = this.albumsList[inIndex];
		
		var a = r0 && r0.label.substring(0,1);
		var b = r1.label.substring(0,1);
		
		if(!enyo.g11n.Char.isLetter(a)) a = "#";
		if(!enyo.g11n.Char.isLetter(b)) b = "#";
		
		if(inIndex == 0) {
			return "All Albums";
		} else if(inIndex == 1) {
			return b;
		} else {
			return a != b ? b : null;
		}
	},
	filterSongs: function(inList) {
		if(debug) this.log("filterSongs with list of length: "+inList.length);
		
		var finalList = [];
		var s = {};
		var filterString = this.$.songsSearchInput.getValue().toUpperCase();
		
		for(var i = 0; i < inList.length; i++) {
			s = inList[i];
		
			if(s.name.toUpperCase().indexOf(filterString) >= 0) {
				finalList.push(s);
			} else if(s.artist_name.toUpperCase().indexOf(filterString) >= 0) {
				finalList.push(s);
			} else if(s.album_name.toUpperCase().indexOf(filterString) >= 0) {
				finalList.push(s);
			} 
		}	
		
		return finalList;
	},
	setupSongItem: function(inSender, inIndex) {
		//if(debug) this.log("setupSongItem inIndex: "+inIndex+" and selectedSongIndex: "+this.selectedSongIndex);
		var row = this.resultList[inIndex];
		
		if(row) {
		
			//this.setupSongDivider(inIndex);
			
			if((row.inPlaylist)&&(this.musicMode == "musicPlaylists")) {
				this.$.songChecked.show();
			} else {
				this.$.songChecked.hide();
			}
			
			var albumArtUrl = "";
				
			if(WebMyth.prefsCookie.mythwebXml) {
			
				//album art is not supported by mythweb XML module 
				
				albumArtUrl += "http://"+WebMyth.prefsCookie.webserverName+"/mythweb/mythxml/GetAlbumArt?MythXMLKey=";
				albumArtUrl += WebMyth.prefsCookie.MythXML_key;
				albumArtUrl += "&Id=";
				albumArtUrl += row.albumart_id;
				
				//albumArtUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":6544/Myth/GetAlbumArt?Id=";
				//albumArtUrl += row.albumart_id;
					
			} else {
				
				albumArtUrl += "http://"+WebMyth.prefsCookie.masterBackendIp+":6544/Myth/GetAlbumArt?Id=";
				albumArtUrl += row.albumart_id;
				
			}
			
			if((row.albumart_id == "None")||(row.albumart_id == "")) {
				this.$.songAlbumArt.hide();
				this.$.songItem.removeClass("hasAlbumArt");
			} else {
				this.$.songAlbumArt.setSrc(albumArtUrl);
				this.$.songAlbumArt.show();
				this.$.songItem.addClass("hasAlbumArt");
			}
			
			this.$.songName.setContent(row.name);
			this.$.songArtist.setContent(row.artist_name);
			this.$.songAlbum.setContent(row.album_name);
			this.$.songTrack.setContent("#"+row.track);
						
			if(inIndex == this.selectedSongIndex) {
				//this.$.songItem.addClass("selected");
				this.$.songItem.setStyle("background-color: rgba(255,255,255,0.15)");
				//if(debug) this.log("marking song as selected: "+inIndex);
			} else {
				//this.$.songItem.removeClass("selected");
				this.$.songItem.setStyle("background-color: rgba(0,0,0,0)");
				//if(debug) this.log("marking song as NOT selected: "+inIndex);
			}
			
			if(inIndex == 0) {
				this.$.songItem.addClass("enyo-first");
			} else {
				this.$.songItem.removeClass("enyo-first");
			}
			
			if(inIndex == (this.resultList.length - 1)) {
				this.$.songItem.addClass("enyo-last");
			} else {
				this.$.songItem.removeClass("enyo-last");
			}
			
			return true;
		}
		
	},
	setupSongDivider: function(inIndex) {
		//if(debug) this.log("setupSongDivider at index: "+inIndex);
		
		// use group divider at group transition, otherwise use item border for divider
		var group = this.getSongGroupName(inIndex);
		this.$.songDivider.setCaption(group);
		this.$.songDivider.canGenerate = Boolean(group);
		this.$.songDivider.applyStyle("border-top", Boolean(group) ? "none" : "1px solid silver;");
		this.$.songDivider.applyStyle("border-bottom", "none;");
    },
	getSongGroupName: function(inIndex) {
		//if(debug) this.log("v at index: "+inIndex);
		
		var r0 = this.resultList[inIndex-1];
		var r1 = this.resultList[inIndex];
		
		var a = r0 && r0.name.substring(0,1);
		var b = r1.name.substring(0,1);
		
		return a != b ? b : null;
	},
	getPlaylistItem: function(inSender, inIndex) {
		//if(debug) this.log("getPlaylistItem "+inIndex+" "+enyo.json.stringify(this.selectPlaylists[inIndex]));
		var row = this.selectPlaylists[inIndex];
		
		if(row) {
		
			if(inIndex == 0) this.$.playlistItem.setStyle("border-top: none;");
			
			this.$.playlistName.setContent(row.playlist_name);
			
			if(row.inPlaylist) {
				this.$.playlistChecked.show();
			} else {
				this.$.playlistChecked.hide();
			}
			
			return true;
		
		}
		
	},
	
});








