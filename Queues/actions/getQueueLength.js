/**
 *
 * @module omrsafetyo.utilities.queue
 *
 * @version 0.0.0
 *
 * @param {ConfigurationElement} queue 
 *
 * @outputType boolean
 *
 */
 function getQueueLength(queue) {
	var items = System.getModule("omrsafetyo.utilities.queue").getQueueItems(queue);
	
	if (items && items.length) {
		return items.length;
	}
	else {
		return 0;
	}
}
