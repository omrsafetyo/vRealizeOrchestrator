/**
 *
 * @module omrsafetyo.utilities.queue
 *
 * @version 0.0.0
 *
 * @param {ConfigurationElement} queue This is the ConfigurationElement for this queue
 * @param {Array/Any} items 
 *
 * @outputType boolean
 *
 */
 function setQueueValue(queue, items) {
	var retVal = false;
	try {
		System.debug("omrsafetyo.utilities.queue.setQueueValue(): Updating 'queue'");
		System.debug(items)
		var locked = System.getModule("omrsafetyo.utilities.queue").lockQueue(queue.name);
		queue.setAttributeWithKey('queue', items);
		queue.reload();
		retVal = true;
	}catch (e) {
		System.warn(e);
		retVal = false;
	} finally {
		var unlocked = System.getModule("omrsafetyo.utilities.queue").unlockQueue(queue.name);
		System.debug("omrsafetyo.utilities.queue.setQueueValue(): Released lock for " + queue.name);
		return retVal;
	}
}
