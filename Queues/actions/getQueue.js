/**
 *
 * @module omrsafetyo.utilities.queue
 *
 * @version 0.0.0
 *
 * @param {string} queueName Name of the queue to be created
 *
 * @outputType ConfigurationElement
 *
 */
 function getQueue(queueName) {
	function createUUID() {
	   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	      return v.toString(16);
	   });
	}
	
	function createQueue(name) {
		var locked = System.getModule("omrsafetyo.utilities.queue").waitAndLock(name, workflow.id);
		try {
			element = Server.createConfigurationElement('QueueingSystem', name);
		    // generate a queueId
		    element.setAttributeWithKey('queueId', createUUID());
		    element.setAttributeWithKey('queue', []);
		
			System.debug("omrsafetyo.utilities.queue.getQueue(): Created configuration element '" + name + "'");
			System.sleep(3000);
			element.reload();
		} catch (e) {
			System.debug('omrsafetyo.utilities.queue.getQueue(): ' + e);
		} finally {
			System.debug("omrsafetyo.utilities.queue.getQueue(): Releasing lock " + name);
			LockingSystem.unlock(name, workflow.id);
		}
		return element;
	}
	
	function getQueueFromQueueSystem(name) {
		var category = Server.getConfigurationElementCategoryWithPath('QueueingSystem');
		System.debug("omrsafetyo.utilities.queue.getQueue(): Queueing system exists - getting elements.")
		//get _all_ the elements
		var elements = category.allConfigurationElements;
		System.debug("omrsafetyo.utilities.queue.getQueue(): Elements: " + elements)
		//retrieve element
		for (var i in elements) {
			System.debug("omrsafetyo.utilities.queue.getQueue(): Checking element " + i)
			try {
			    if (elements[i].name == queueName) {
			        var element = elements[i]
					System.debug("omrsafetyo.utilities.queue.getQueue(): Found configuration element '"+element.name+"'");
					break;
			    }
			}
			catch (e) {
				System.warn("omrsafetyo.utilities.queue.getQueue(): Encountered error parsing elements: " + e)
			}
		}
		return element;
	}
	
	var category = System.getModule("omrsafetyo.utilities.queue").getQueueingSystem();
	
	
	if (! category) {
	    // category doesn't exist, so neither does the queue - create it now
		System.debug("omrsafetyo.utilities.queue.getQueue(): Queueing system missing - creating.")
	    element = createQueue(queueName);
		category = System.getModule("omrsafetyo.utilities.queue").getQueueingSystem();
	}
	else {
		var element = getQueueFromQueueSystem(category, queueName);
	}
	
	if ( ! element ) {
		System.debug("omrsafetyo.utilities.queue.getQueue(): Creating '"+queueName+"'");
		element = createQueue(queueName);
	}
	
	if ( ! element ) {
	    element = getQueueFromQueueSystem(category, queueName);
	}
	
	System.debug("omrsafetyo.utilities.queue.getQueue(): Queue: "+element.name);
	return element;
}
