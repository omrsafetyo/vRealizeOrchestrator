/**
 *
 * @module omrsafetyo.utilities.queue
 *
 * @version 0.0.0
 *
 * @param {ConfigurationElement} queue 
 *
 * @outputType Any
 *
 */
 function getQueueItems(queue) {
	//var queue = System.getModule("omrsafetyo.utilities.queue").getQueue(queueName);
	//queue.reload();
	queueName = queue.name;
	try {
		try {
			var queueAttr = queue.getAttributeWithKey('queue');
			var items = queueAttr.value;
		} catch (e) {
			System.warn(e)
		}
		if ( items == [] || ! items.length ) {
			System.debug("omrsafetyo.utilities.queue.getQueueItems(): No items in queue");
			return [];
		}
		return items;
	} catch(e) {
		return [];
	}
}
