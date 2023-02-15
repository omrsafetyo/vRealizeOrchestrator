/**
 *
 * @module omrsafetyo.utilities.queue
 *
 * @version 0.0.0
 *
 * @param {string} queueName Name of queue to lock
 *
 * @outputType boolean
 *
 */
 function lockQueue(queueName) {
	var queue = System.getModule("omrsafetyo.utilities.queue").getQueue(queueName);
	var queueIdAttr = queue.getAttributeWithKey('queueId');
	var lockId = queueIdAttr.value;
	var locked = System.getModule("omrsafetyo.utilities.queue").waitAndLock(lockId, workflow.id);
	
	return locked;
}
