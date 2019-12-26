/**
 * @developer Kumar Nishant
 * @email nishant.mitra94@gmail.com
 */
import { ShipmentUpdateListenerInterface, ShipmentSearchIndex } from "./challenge";

// Interface to define task json
interface Task {
    id: string,
    shipmentData: string
}

class ShipmentUpdate extends ShipmentSearchIndex implements ShipmentUpdateListenerInterface {

    activeTasks: Array<Task> = [];
    pendingTasks: Array<Task> = [];


    constructor() {
        super()
        this.taskScheduler()
    }
    

    async receiveUpdate(id: string, shipmentData: any) {
        if (this.activeTasks.filter(obj => obj.id === id).length > 0) {
            this.pendingTasks.push({ id: id, shipmentData: shipmentData })
            console.log('Task with same id is already running. Queued for execution', 'ID : ', id)
        } else {
            this.activeTasks.push({ id: id, shipmentData: shipmentData })
        }

    }

    // Task Scheduler polling every 50ms
    taskScheduler() {
        console.log('Polling every 50ms')
        let interval = setInterval(() => {
            if (this.activeTasks.length) {
                this.updateShipment(this.activeTasks[0].id, this.activeTasks[0].shipmentData)
                console.log('Task execution started', 'ID : ', this.activeTasks.shift())
            } else if (this.pendingTasks.length){
                this.activeTasks.push(this.pendingTasks.shift())
            } else {
                console.log('Idle. No tasks scheduled')
                clearInterval(interval)
            }
        }, 50)
    }
}


// Testing
let solutionObj = new ShipmentUpdate();
for(let i=0; i<10; i++){
    solutionObj.receiveUpdate("ID"+ (Math.floor(Math.random() * 11)+1) , Math.random().toString())
}