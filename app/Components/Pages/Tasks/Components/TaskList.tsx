import { Checkbox } from "@mui/material"
import ListIcon from "@mui/icons-material/List"
import CachedIcon from "@mui/icons-material/Cached"
import CircleIcon from "@mui/icons-material/Circle"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import  DeleteOutlineOutlinedIcon  from "@mui/icons-material/DeleteOutlineOutlined"
import { useContextApp } from "../../ContextApp"
import {  useMemo } from "react"
import { Task } from "@/app/Components/Data/AllProjects"
import { TasksEmptyScreen } from "@/app/Components/EmptyScreens/TasksEmptyScreen"
import { SortByButton } from "./HeaderTaskSubHead"

export function TaskList(){
    const{
        chosenProjectObject:{chosenProject},
        allProjectsObject:{allProjects},
        tabOptionsObject:{tabOptions,setTabOptions},
        allTasksObject:{allTasks},
        openConfirmationWindowObject:{setOpenConfirmationWindow},
        

    }=useContextApp();
    // const [allTasks,setallTasks]=useState<Task[]>([]);
    // useEffect(()=>{
    //     const extractAllTasks=allProjects.flatMap((project)=>project.tasks);
    //     setallTasks(extractAllTasks);
          
    // },[allProjects])
    const filteredTaksks=useMemo(()=>{
        console.log("Chosen Project:", chosenProject); // Log chosenProject to ensure it's set
        console.log("Tab Options:", tabOptions); // Log tabOptions to ensure tab is switching correctly
        let tasks=allTasks;
       
        if(chosenProject){
            tasks=tasks.filter((task)=>task.projectName===chosenProject.title);
        }
        if(tabOptions[1].isSelected){
            tasks=tasks.filter((task)=>task.status==="Completed")
        }
        else{
            tasks=tasks.filter((task)=>task.status==="In Progress")
        }
        return tasks;
        
    },[allProjects,allTasks,chosenProject,tabOptions])

    // const handleDeleteTask = (taskToDelete: Task) => {
    //     deleteTask({
    //         taskToDelete,
    //         allProjects,
    //         chosenProject,
    //         setallTasks,
    //         setChosenProject,
    //         setAllProjects,
    //     });
    // };

    // const filteredTaksks = useMemo(() => {
    //     let tasks = allTasks;
    //     if (chosenProject) {
    //         tasks = tasks.filter((task) => task.projectName === chosenProject.title);
    //     }
    //     return tasks;
    // }, [allProjects, allTasks, chosenProject]);

    // if (filteredTasks.length === 0) {
    //     return <TasksEmptyScreen />;
    // }

    if(chosenProject?.tasks.length ===0){
        return <TasksEmptyScreen/>
    }
    return(
        <div className="ml-12 mt-11 flex-col gap-4 ">
            <Tabs/>
            <div className="flex flex-col gap-4">
               {
                filteredTaksks.map((singleTask,index)=>(
                    <SingleTask key={index} task={singleTask}/>
                ))
               }
            </div>

        </div>
    )
    function Tabs(){
       
        function countOnGoingTasks(){
            if(chosenProject){
                return chosenProject.tasks.reduce((accTask,task)=>{
                    return accTask+(task.status==="In Progress"?1:0)
                },0)
            }
            return allProjects.reduce((accProjects,project)=>{
                return(
                    accProjects+
                    project.tasks.reduce((accTasks,task)=>{
                        return accTasks+(task.status==="In Progress"?1:0);
                    },0)
                )
            },0)
        }
        function completedTasks(){
            if(chosenProject){
                return chosenProject.tasks.length-countOnGoingTasks();
            }
            const totalTasksInAllProjects=allProjects.reduce((acc,project)=>{
                return acc+project.tasks.length;
            },0);
            return totalTasksInAllProjects-countOnGoingTasks();
        }
        function switchTabs(index:number){
         setTabOptions((prevstate)=>
            prevstate.map((tab,i)=>({
                ...tab,
                isSelected:index===i,
            }))
        );
        }
return(
    <div className="flex justify-between">
    <div className="flex items-center = gap-6 ml-3 mt-8 mb-5">
        {/* <div className="flex gap-2 text-orange-400 font-semibold">
            <span>OnGoing Tasks</span>
            <span className="bg-orange-600 text-white px-2 rounded-md">7</span>
        </div>
        <div className="text-slate-400 flex gap-2 items-center">
            <span>Completed Tasks</span>
            <span className="bg-slate-200 px-2 rounded-md">8</span>
        </div> */}
        {
            tabOptions.map((singleTabOption,index)=>(
                <div key={index}
                onClick={()=>switchTabs(index)}
                className={`flex gap-2 cursor-pointer ${
                    singleTabOption.isSelected?"text-orange-600 font-semibold":"text-slate-300"
                }`}
                >
                    <span>{singleTabOption.name}</span>
                    <span className={`${singleTabOption.isSelected?"bg-orange-600":"bg-slate-300"} text-white px-2 rounded-md max-[420px]:hidden`}>
                  {singleTabOption.id===1?countOnGoingTasks():completedTasks()}
                    </span>

                </div>
            ))
        }
        <div>
       <SortByButton/>
       </div>
    </div>
    </div>
)

    }
//     function SingleTask({task}:{task:Task}){
//         const{
//             selectedTaskObject:{setSelectedTask},
//             openTasksWindowObject:{setOpenTasksWindow}
//         }=useContextApp();
//         console.log("task",task);
//         return(
//             <div className="flex gap-2 items-center">
// <Checkbox/>
// <div className="w-full bg-white rounded-lg border border-slate-100 flex gap-3 items-center justify-between p-5 py-6">
//     <div className="flex gap-3 items-center">
//         <div>
//             <div className="bg-orange-200 rounded-lg p-2 flex items-center justify-between">
//                 <ListIcon className="text-orange-600"/>
//             </div>
//         </div>

//         <div
//         onClick={()=>{
//             setSelectedTask(task);
//             setOpenTasksWindow(true);
//         }}
//          className="flex flex-col">
//             <span className="font-bold hover:text-orange-600 cursor-pointer">{task.title}</span>
//             <div className="flex">
//                 <span className="text-slate-400 text-[13px] p-[2px]"> {`Project: ${task.projectName}`}</span>
//             </div>

//         </div>
//     </div>

//     <div className="flex gap-36 font-bold items-center">
//         <div className="flex gap-2 items-center">
//             <CachedIcon className="text-[24px] text-slate-400"/>
//             <span className="text-[14px] text-slate-400">{task.status}</span>
//         </div>
//     </div>

//     <div className="flex gap-2 items-center">
//         <CircleIcon className="text-[10px] text-green-600"/>
//         <span className="text-[14px] text-slate-400">{task.priority}</span>
//     </div>

//     {/*Action Buttons*/}
//     <div className="flex gap-2 items-center">
//        <div
//        onClick={()=>{
//         setSelectedTask(task);
//         setOpenTasksWindow(true);

//        }}
//         className="rounded-lg p-2 flex items-center justify-center cursor-pointer bg-orange-200 hover:bg-orange-300 transition-all">
//        <EditOutlinedIcon sx={{fontSize:"17px"}} className="text-orange-600"/>
//     </div>

//     <div className="rounded-lg p-2 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300">
//         <DeleteOutlineOutlinedIcon sx={{fontSize:"17px"}} className="text-slate-600"/>
//     </div>
// </div>
//     </div>
//     </div>
//         )
//     }
function SingleTask({ task }: { task: Task}) {
    const {
        selectedTaskObject: { setSelectedTask },
        openTasksWindowObject: { setOpenTasksWindow }
    } = useContextApp();

    return (
        <div className="flex gap-2 items-center">
            <Checkbox />
            <div className="w-full bg-white rounded-lg border border-slate-100 flex gap-3 items-center justify-between p-5 py-6">
                <div className="flex gap-3 items-center">
                    <div>
                        <div className="bg-orange-200 rounded-lg p-2 flex items-center justify-between">
                            <ListIcon className="text-orange-600" />
                        </div>
                    </div>

                    <div
                        onClick={() => {
                            setSelectedTask(task);
                            setOpenTasksWindow(true);
                        }}
                        className="flex flex-col">
                        <span className="font-bold hover:text-orange-600 cursor-pointer">{task.title}</span>
                        <div className="flex">
                            <span className="text-slate-400 text-[13px] p-[2px]"> {`Project: ${task.projectName}`}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-36 font-bold items-center">
                    <div className="flex gap-2 items-center">
                        <CachedIcon className="text-[24px] text-slate-400" />
                        <span className="text-[14px] text-slate-400">{task.status}</span>
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <CircleIcon className="text-[10px] text-green-600" />
                    <span className="text-[14px] text-slate-400">{task.priority}</span>
                </div>

                {/*Action Buttons*/}
                <div className="flex gap-2 items-center">
                    <div
                        onClick={() => {
                            setSelectedTask(task);
                            setOpenTasksWindow(true);
                        }}
                        className="rounded-lg p-2 flex items-center justify-center cursor-pointer bg-orange-200 hover:bg-orange-300 transition-all">
                        <EditOutlinedIcon sx={{ fontSize: "17px" }} className="text-orange-600" />
                    </div>

                    <div
                         onClick={() => {
                            setSelectedTask(task);  // Set the task to be deleted
                            setOpenConfirmationWindow(true);  // Open the confirmation window
                        }}// Call the delete function
                        className="rounded-lg p-2 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300">
                        <DeleteOutlineOutlinedIcon sx={{ fontSize: "17px" }} className="text-slate-600" />
                    </div>
                </div>
            </div>
        </div>
    );
}

}