/**
 *
 * @module omrsafetyo.utilities.queue
 *
 * @version 0.0.0
 *
 * @param {ConfigurationElement} queue The queue
 * @param {Any} item Item to be added - can be any type you're adding to the queue
 *
 * @outputType boolean
 *
 */
 function addQueueItem(queue, item) {
	//var queue = System.getModule("omrsafetyo.utilities.queue").getQueue(queueName);
	queue.reload();
	queueName = queue.name;
	var queueCount = System.getModule("omrsafetyo.utilities.queue").getQueueLength(queue);
	
	try {
		if (queueCount == 0 ) {
			items = [];
		}
		else {
			var queueAttr = queue.getAttributeWithKey('queue');
			var items = queueAttr.value;
		}
		
		var newLength = items.unshift(item)
		
		var updated = System.getModule("omrsafetyo.utilities.queue").setQueueValue(queue,items);
		return true;
	} catch(e) {
		System.debug('omrsafetyo.utilities.queue.addQueueItem(): ' + e);
		return false;
	}
}
