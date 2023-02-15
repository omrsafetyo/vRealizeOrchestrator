/**
 *
 * @module omrsafetyo.utilities.queue
 *
 * @version 1.0.0
 *
 * @param {string} lockId What to lock.  This can really be any string, I'm using a guid assigned to a resource.
 * @param {string} lockOwner This is the lock owner, typically the workflow token id
 *
 * @outputType boolean
 *
 */
 function waitAndLock(lockId, lockOwner) {
	var MAX_LOOPS = 10; // locks should be relatively short-lived.  If they are taking longer than anticipated, interrupt
	var SLEEP_MS = 10 * 1000; // 10 seconds
	var lock = false;
	var notified = false;
	
	for (i=0;i < MAX_LOOPS;i++){
		lock = LockingSystem.lock(lockId, lockOwner);
		if (lock) {
			System.debug("omrsafetyo.utilities.queue.waitAndLock(): Lock obtained for " + lockId + ", owner " + lockOwner);
			break;
		} else if (notified == false) {
			System.debug('omrsafetyo.utilities.queue.waitAndLock(): Lock exists - sleeping.');
			notified = true;
		}
		System.sleep(SLEEP_MS)
	}
	
	if ( lock ) {
	   return lock;
	}
	else {
	    // Find a lock with the same lock Id.  It won't necessarily be the same owner
	    // as this could be run from multiple workflows
		System.debug("omrsafetyo.utilities.queue.waitAndLock(): Reached maximum wait timeout - forcefully obtaining lock")
		var allLocks = LockingSystem.retrieveAll()
		for each (oneLock in allLocks) {
			oneLockArr = oneLock.split(",")
			if ( oneLockArr[0] == lockId ) {
				System.debug("omrsafetyo.utilities.queue.waitAndLock(): Found lock " + oneLock + ", unlocking")
				LockingSystem.unlock(oneLockArr[0],oneLockArr[1]);
				
				lock = LockingSystem.lock(lockId, lockOwner);
				return lock;
			}
		}
	}
}
