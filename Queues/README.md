# vRealizeOrchestrator


##Synopsis
This is a little project I had for VRO to increase the resiliency of decoupled operations.
I had several pieces of a workflow that were initially part of a workflow, and the workflow would wait for a pre-condition to be met, and then it would execute a particular logic.  This resulted in the parent becoming quite long-running.  Additionally, these operations could not be retried easily outside of the context of the parent workflow.  I decided to build a queueing system.  Essentially you could pop items into the queue, and have a scheduled workflow periodically check the queue to see if there are items to be processed, do a series of checks, try to do the process in question, and then either discard or re-queue the queue item, depending on the exit conditions.

Included are two sample workflows that process queues, a parent workflow where the list of queues and the workflow id of the corresponding queue processor are stored in a dictionary, as well as a queue maintenance workflow (allows you to clear a queue, etc.).

The way the queues work is they are stored in the VRO Configurations Assets. A Configuration is created per queue, each containing two variables: queueId (guid string), and  queue (Properties() array):
```
{
  "queueId" : "00000000-0000-0000-0000-000000000000",
  "queue" : []
}
```
The name of the queue is determined by the Configuration name.

The structure of the Properties() objects in the queue is entirely up to your process, and you can store whatever information you need to pass along to the processing function.

The various actions included do operations against these queues. 
