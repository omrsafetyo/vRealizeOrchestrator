/**
 *
 * @module omrsafetyo.utilities.queue
 *
 * @version 0.0.0
 *
 * @param {ConfigurationElement} queue 
 * @param {string} itemId 
 *
 * @outputType void
 *
 */
 function removeQueueItem(queue, itemId) {
	System.log("Removing item: " + itemId);
	
	var queueItems = System.getModule("omrsafetyo.utilities.queue").getQueueItems(queue); //queueItems is array of "Properties"
	var itemCounter = 0;
	var itemPosition = 0;
	
	for each (item in queueItems) { //item is "Properties" type
		if ( item.get("itemId") == itemId) {
			itemPosition = itemCounter;
		}
		else {
			itemCounter++;
		}
	}
	
	var updatedItems = queueItems.slice(itemPosition,itemPosition);
	var sendback = System.getModule("omrsafetyo.utilities.queue").setQueueValue(Queue,updatedItems);
	
	if (sendback == true) {
		System.log("Item successfully removed.");
	}
	else {
		throw("error, item not removed");
	}
}
