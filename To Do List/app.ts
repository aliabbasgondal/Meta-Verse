
import inquirer from "inquirer";
//import DatePrompt from "inquirer-date-prompt";
import { Choice } from "@inquirer/checkbox";
import { exit, uptime } from "process";


interface task{
    id:number,
    title:string,
    description:string,
    assignedTo:string,
    startDate:Date,
    EndDate:Date,
    completed:string
}
var tasklists:task[]=[];
var tID=0;
async function addTask() {
    let addTask = await inquirer.prompt([
        {
            name: "tTitle",
            type: "input",
            message: "Please Enter Task Title"
        },
        {
            name: "tDesc",
            type: "input",
            message: "Please Enter Task Description"
        },
        {
            name: "tAssignedTo",
            type: "list",
            message: "Please select the person to assigned to:",
            choices: ["Ali", "Zain", "Mohammad"]
        },
        {
            type: 'date',
            name: 'tStartDate',
            message: 'Please select task starte date and time: ',
            format: ['Y', '/', 'MM', '/', 'DD', ' ', 'HH', ':', 'mm', ':', 'ss']
            //default:new Date('2022-09-28 11:59:59')
        },
        {
            name: "tEndDate",
            type: "date",
            message: "Please select task end date and time:",
            format: ['Y', '/', 'MM', '/', 'DD', ' ', 'HH', ':', 'mm', ':', 'ss']
            //default:new Date('2022-09-28 11:59:59')
        }
    ]);
    let temlist:task={
        id: tID + 1,
        title: addTask.tTitle,
        description: addTask.tDesc,
        assignedTo: addTask.tAssignedTo,
        startDate: addTask.tStartDate,
        EndDate: addTask.tEndDate,
        completed: 'No'
    }
    tID++;
    tasklists.push(temlist);
    await viewTask();
}
async function updateTask() {
    if( tasklists.length != 0)
    {
       
    let upTask = await inquirer.prompt([
        
        {
            type: 'input',
            name: 'tasks',
            message: 'Please input Task ID: '
        },
        {
            name: "tTitle",
            type: "input",
            message: "Please Update Task Title"
        },
        {
            name: "tDesc",
            type: "input",
            message: "Please Update Task Description"
        },
        {
            name: "tAssignedTo",
            type: "list",
            message: "Please Update the person to assigned to:",
            choices: ["Ali", "Zain", "Mohammad"]
        },
        {
            type: 'date',
            name: 'tStartDate',
            message: 'Please Update task starte date and time: ',
            format: ['Y', '/', 'MM', '/', 'DD', ' ', 'HH', ':', 'mm', ':', 'ss']
            //default:new Date('2022-09-28 11:59:59')
        },
        {
            name: "tEndDate",
            type: "date",
            message: "Please Update task end date and time:",
            format: ['Y', '/', 'MM', '/', 'DD', ' ', 'HH', ':', 'mm', ':', 'ss']
            //default:new Date('2022-09-28 11:59:59')
        },
        {
            name: "tcompleteStatus",
            type: "list",
            message: "Task Compeleted Yes/No:",
            choices:['Yes','No']
            //default:new Date('2022-09-28 11:59:59')
        }
    
    ]);
    
   
    let temlist:task={
        id: upTask.tasks,
        title: upTask.tTitle,
        description: upTask.tDesc,
        assignedTo: upTask.tAssignedTo,
        startDate: upTask.tStartDate,
        EndDate: upTask.tEndDate,
        completed: upTask.tcompleteStatus
    }
    tasklists.splice(upTask.tasks-1,1,temlist);
    await viewTask();
    
    
}
}
async function viewTask() {
    console.log(`------------------------------------------------------------------------------------\n`);
    console.log(`|                                                                                  |\n`);
    console.log(`| Task ID | Task | Description | Assigned To | Start Date | End Date | Completed   |\n`);
    console.log(`|                                                                                  |\n`);
    console.log(`------------------------------------------------------------------------------------\n`);
    tasklists.forEach(task => {
       
        console.log(`| ${task.id} | ${task.title} | ${task.description} | ${task.assignedTo} | ${task.startDate} | ${task.EndDate} | ${task.completed}   |\n`);
        console.log(`------------------------------------------------------------------------------------\n`);
        
    });
    await selectOps();
}
async function deleteTask() {
    let upTask = await inquirer.prompt([
        
        {
            type: 'input',
            name: 'tasks',
            message: 'Please input Task ID: '
        }
    ]);
    tasklists.splice(upTask.tasks-1,1);
    await viewTask();

}
async function deleteAllTask() {
    
    tasklists.length=0;
    await viewTask();

}

async function selectOps() {
    let opsSelct = await inquirer.prompt([
        {
            name: "selection",
            type: "list",
            message: "Please Select Operations: ",
            choices:['Add Task', 'View Tasks', 'Edit Task', 'Delete Task', 'Delete All', 'Exit']
        }
    ]);
    switch(opsSelct.selection){
        case('Add Task'):
        await addTask();
        break;
        case('View Tasks'):
        await viewTask();
        break;
        case('Edit Task'):
        await updateTask();
        break;
        case('Delete Task'):
        await deleteTask();
        break;
        case('Delete All'):
        await deleteAllTask();
        break;
        case('Exit'):
        exit;
        break;



        
    }

}
await selectOps();




