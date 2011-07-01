/* 

kind: "IndexedVirtualList"

A hacked together attempt to have a VirtualList know its current row index and then open to that row at a later time.  
It doesn't work perfectly so use at your own discretion.  

The main differences from the regular VirtualList:
 - use this.$.indexedVirtualList.setListOffset(n) to set what row should be the top of the list (list indexing starts at 0)
 - after setting the listOffset the best way to display the list is with the punt() function
 - onSetupRow is replaced by onSetupIndexedRow and works similarly except it includes the listOffset already calaculated
 - use getTotalOffset() to (approximately) find the current top row item.  it includes the preset list offset if there was one so it can then be used as the new setListOffset(number)
 - you will likely need to adjust topRowsOffset and bottomRowsOffset based on the height of each row and the size of box containing the list
 - when you listen from an onclick event you will have to provide the offset value to get the real object clicked:
		rowClick: function(inSender, inEvent) {
			var actualRowIndex = inEvent.rowIndex + this.$.indexedVirtualList.getListOffset();
		}


*/

enyo.kind({ name: "IndexedVirtualList",
	kind: enyo.VirtualList,
	published: {
		listOffset: 0,
		previousIndex: 0,
		listPosition: 0,
		
		pageSize: 1,			//the default value of 10 makes it too hard to find the current offset, but this may degrade performance?
		
		topRowsOffset: 10,		//tweak these for different row heights/list box size
		bottomRowsOffset: 5,
	},
	events: {
		onSetupIndexedRow: "",
		onSetupRow: "",
	},
	
	doSetupRow: function(inSender, inIndex) {
		this.log("doSetupRow: "+inIndex);
		
		if(inIndex < this.previousIndex) {
			//user is scrolling up
			this.previousIndex = inIndex;
			
			this.listPosition = inIndex + this.topRowsOffset;
			
			this.log("user is scrolling up - listPositon: "+this.listPosition+" and listOffset: "+this.listOffset);
			
		} else if(inIndex > this.previousIndex) {
			//user is scrolling down
			this.previousIndex = inIndex;
			
			this.listPosition = inIndex - this.bottomRowsOffset;
			
			this.log("user is scrolling down - listPositon: "+this.listPosition+" and listOffset: "+this.listOffset);
		}
		
		return this.doSetupIndexedRow(inIndex+this.listOffset);
	},
	getTotalOffset: function() {
		return Math.max(0,this.listOffset+this.listPosition);
	},
	
});