/**
 *
 * @module omrsafetyo.utilities.queue
 *
 * @version 1.0.0
 *
 * @param {string} queueName Name of queue to unlock
 *
 * @outputType boolean
 *
 */
 function unlockQueue(queueName) {
	var queue = System.getModule("omrsafetyo.utilities.queue").getQueue(queueName);
	var queueIdAttr = queue.getAttributeWithKey('queueId');
	var lockId = queueIdAttr.value;
	var unlocked = true;
	var allLocks = LockingSystem.retrieveAll()
	for each (oneLock in allLocks) {
		oneLockArr = oneLock.split(",")
		if ( oneLockArr[0] == lockId ) {
			System.debug("omrsafetyo.utilities.queue.unlockQueue(): Found lock " + oneLock + ", unlocking")
			try {
				LockingSystem.unlock(oneLockArr[0],oneLockArr[1]);
			} catch (e) {
				System.warn("omrsafetyo.utilities.queue.unlockQueue(): Error encountered unlocking: " + e)
				unlocked = false;
			}
		}
	}
	
	return unlocked;
}
