/**
 *
 * @module omrsafetyo.utilities.queue
 *
 * @version 1.0.0
 *
 * @param {ConfigurationElement} queue This is the ConfigurationElement for this queue
 *
 * @outputType Any
 *
 */
 function popQueueItem(queue) {
	//var queue = System.getModule("omrsafetyo.utilities.queue").getQueue(queue)
	//queue.reload();
	var queueCount = System.getModule("omrsafetyo.utilities.queue").getQueueLength(queue);
	
	if (queueCount == 0 ) {
		System.debug("omrsafetyo.utilities.queue.popQueueItem(): There are no items in the queue")
		return false;
	}
	
	try {
		var items = System.getModule("omrsafetyo.utilities.queue").getQueueItems(queue);
	
		if ( ! items || ! items.length || items.length == 0 ) {
			System.debug("omrsafetyo.utilities.queue.popQueueItem(): No items in queue'");
			return null;
		}
		
		var myItem = items.pop()
		
		var updated = System.getModule("omrsafetyo.utilities.queue").setQueueValue(queue,items);
		return myItem;
	} catch(e) {
		System.debug('omrsafetyo.utilities.queue.popQueueItem(): ' + e);
		return null;
	}
}
