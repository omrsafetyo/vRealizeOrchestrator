/**
 *
 * @module omrsafetyo.utilities.queue
 *
 * @version 0.0.0
 *
 * @outputType ConfigurationElementCategory
 *
 */
 function getQueueingSystem() {
	var category = Server.getConfigurationElementCategoryWithPath('QueueingSystem');
	return category;
	
}
