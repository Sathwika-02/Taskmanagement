import {v4 as uuidv4 } from "uuid";
export type Task={
    id:string,
    title:string;
    icon:string;
    projectName:string;
    status:"In Progress"|"Completed";
    priority:"Low"|"Medium"|"High";
    createdAt:string;
    updatedAt:string;
}
export type Project={
    id:string,
    clerkUserId:string;
    title:string;
    createdAt:string,
    updatedAt:string,
    icon:string,
    tasks:Task[];
};
export const projectsData:Project[]=[
    {
    id:uuidv4(),
    clerkUserId:"123",
    title:"Project",
    createdAt:"2024-08-01",
    updatedAt:"2024-08-02",
    icon:"LocalLibrary",
    tasks:[
        {
            id:uuidv4(),
            title:"createUI design of the task1",
            icon:"Movie",
            projectName:"Project",
            status:"In Progress",
            priority:"Low",
            createdAt:"2024-08-01",
            updatedAt:"2024-08-02"
        },
        {
            id:uuidv4(),
            title:"createUI design of the task2",
            icon:"Movie",
            projectName:"Project",
            status:"Completed",
            priority:"Low",
            createdAt:"2024-08-01",
            updatedAt:"2024-08-02"
        },
        {
            id:uuidv4(),
            title:"createUI design of the task3",
            icon:"Movie",
            projectName:"Project",
            status:"Completed",
            priority:"Low",
            createdAt:"2024-08-01",
            updatedAt:"2024-08-02"
        },
        {
            id:uuidv4(),
            title:"createUI design of the task4",
            icon:"Movie",
            projectName:"Project",
            status:"Completed",
            priority:"Low",
            createdAt:"2024-08-01",
            updatedAt:"2024-08-02"
        },
        {
            id:uuidv4(),
            title:"createUI design of the task5",
            icon:"Movie",
            projectName:"Project",
            status:"Completed",
            priority:"Low",
            createdAt:"2024-08-01",
            updatedAt:"2024-08-02"
        }
    ]

},
{
    id:uuidv4(),
    clerkUserId:"123",
    title:"Project Title1",
    createdAt:"2024-08-01",
    updatedAt:"2024-08-02",
    icon:"AccountBalance",
    tasks:[
        {
            id:uuidv4(),
            title:"createUI design of the task",
            icon:"Movie",
            projectName:"Project Title1",
            status:"In Progress",
            priority:"Low",
            createdAt:"2024-08-01",
            updatedAt:"2024-08-02"
        },
        {
            id:uuidv4(),
            title:"createUI design of the task2",
            icon:"Movie",
            projectName:"Project Title1",
            status:"In Progress",
            priority:"Low",
            createdAt:"2024-08-01",
            updatedAt:"2024-08-02"
        },
        {
            id:uuidv4(),
            title:"createUI design of the task2",
            icon:"Movie",
            projectName:"Project Title1",
            status:"Completed",
            priority:"Low",
            createdAt:"2024-08-01",
            updatedAt:"2024-08-02"
        }
    ]
},
{
    id:uuidv4(),
    clerkUserId:"123",
    title:"Project Title2",
    createdAt:"2024-08-01",
    updatedAt:"2024-08-02",
    icon:"AccountBalance",
    tasks:[
        {
            id:uuidv4(),
            title:"createUI design of the task2",
            icon:"Movie",
            projectName:"Project Title2",
            status:"In Progress",
            priority:"Low",
            createdAt:"2024-10-13",
            updatedAt:"2024-10-13"
        }
    ]
}
]