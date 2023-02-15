/**
 *
 * @module omrsafetyo.utilities.queue
 *
 * @version 0.0.0
 *
 * @param {ConfigurationElement} queue 
 *
 * @outputType void
 *
 */
 function purgeQueue(queue) {
	System.log("Purging queue: " + queue.name);
	
	var items = [];
	var updated = System.getModule("omrsafetyo.utilities.queue").setQueueValue(queue,items);
	
	var queueCount = System.getModule("omrsafetyo.utilities.queue").getQueueLength(queue);
	if (queueCount == 0) {
		System.log("Queue successfully purged.")
	}
	else {
		System.log("Queue not purged, items remaining: " + queueCount);
	}
}
