/**
 *
 * @module omrsafetyo.utilities.queue
 *
 * @version 0.0.0
 *
 * @param {ConfigurationElement} queue 
 *
 * @outputType Array/void
 *
 */
 function listQueueContents(queue) {
	System.log("Listing actions for " + queue.name);
	
	var queueCount = System.getModule("omrsafetyo.utilities.queue").getQueueLength(queue);
	System.log("Current queue count: " + queueCount);
	var itemPosition = 0;
	var contents = [];
	
	if (queueCount > 0) {
		System.log("Listing queue contents.");
		var queueItems = System.getModule("omrsafetyo.utilities.queue").getQueueItems(queue);
		
		for each (item in queueItems) {		
		    System.log("Item number: " + itemPosition);
			System.log(JSON.stringify(item));
			//var itemKeys = item.keys();		
			//for each (key in itemKeys) {
			//	System.log("Key: " + key);
			//	System.log("Value: " + item.get(key).toString());
			//}
			contents.push(JSON.stringify(item));
			itemPosition++;
		}
		
		return contents;
	}
	else {
		System.log("Queue is empty, exiting.")
	}
}
