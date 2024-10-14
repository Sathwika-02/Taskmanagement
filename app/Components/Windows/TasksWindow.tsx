import { createContext,useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useContextApp } from "../Pages/ContextApp";
import { Project, Task } from "../Data/AllProjects";
import ListAltIcon from "@mui/icons-material/ListAlt"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircleIcon from "@mui/icons-material/Circle";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import { FieldErrors, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import {v4 as uuidv4 } from "uuid";
import { allIconsArray } from "../Data/AllIcons";
import TasksDropDown from "../DopDowns/TasksDropDown";
import ProjectsDropDown from "../DopDowns/ProjectsDropDown";
export type SelectionOption="priority"|"project";

export type Priority={
    id:number,
    name:string,
    icon:React.ReactNode,
    isSelected:boolean,
}
type SortingDropDownPosition={
    left:number,
    top:number,
    width?:number;
}
export type ProjectWithSelection=Project &{isSelected:boolean};
export type TaskFormType = {
    clickedSelection: SelectionOption | null;
    setClickedSelection: (option: SelectionOption | null) => void;
    openTasksDropDown: boolean;
    setOpenTasksDropDown: (value: boolean) => void;
    tasksDropDownPositions: SortingDropDownPosition;
    setTasksDropDownPositions: (value: SortingDropDownPosition) => void;
    priority: Priority | null;
    setPriority: (priority: Priority | null) => void;
    project: Project | null;
    setProject: (project: Project | null) => void;
    priorityListObject: {
      priorityList: Priority[];
      setPriorityList: React.Dispatch<React.SetStateAction<Priority[]>>;
    };
    updatedAllProjectsObject: {
      updatedAllProjects: ProjectWithSelection[];
      setUpdatedAllProjects: React.Dispatch<React.SetStateAction<ProjectWithSelection[]>>;
    };
    selectionErrorsObject: {
      selectionErrors: { id: number; label: string; message: string; show: boolean }[];
      setSelectionErrors: React.Dispatch<
        React.SetStateAction<
          { id: number; label: string; message: string; show: boolean }[]
        >
      >;
    };
  };
  
  // Create the default context value with empty functions or default values.
  export const TaskFormState: TaskFormType = {
    clickedSelection: null,
    setClickedSelection: () => {},
    openTasksDropDown: false,
    setOpenTasksDropDown: () => {},
    tasksDropDownPositions: { left: 0, top: 0, width: 0 },
    setTasksDropDownPositions: () => {},
    priority: null,
    setPriority: () => {},
    project: null,
    setProject: () => {},
    priorityListObject: { priorityList: [], setPriorityList: () => {} },
    updatedAllProjectsObject: { updatedAllProjects: [], setUpdatedAllProjects: () => {} },
    selectionErrorsObject: {
      selectionErrors: [],
      setSelectionErrors: () => {}
    },
  };
  
  // Create the context with a default value, no type argument is needed here.
  export const TaskFormContext = createContext(TaskFormState);
  
  // Hook to use the context
  export function useTaskFormContext() {
    return useContext(TaskFormContext);
  }
const schema=z.object({
    taskName:z
    .string()
    .min(1,{message:"Task name is required"})
    .max(30,{message:"Task name must be 30 characters or less"}),
});
type FormData=z.infer<typeof schema>;


export function TasksWindow(){
    const{
        handleSubmit,
        register,
        formState:{errors},
        reset,
        setFocus,
        setValue,
        setError
    }=useForm<FormData>({
        resolver:zodResolver(schema),
    })
    const[clickedSelection,setClickedSelection]=useState<SelectionOption|null>(null);
    const[openTasksDropDown,setOpenTasksDropDown]=useState(false);
    const[tasksDropDownPositions,setTasksDropDownPositions]=useState<SortingDropDownPosition>({
        left:0,
        top:0,
        width:0,
    })
    const[priority,setPriority]=useState<Priority|null>(null);
    const[project,setProject]=useState<Project|null>(null);
    const[priorityList,setPriorityList]=useState<Priority[]>([
        {
            id:1,
            name:"Low",
            icon:<CircleIcon className="text-[14px] text-green-500"/>,
            isSelected:false,
        },
        {
            id:2,
            name:"Medium",
            icon:<CircleIcon className="text-[14px] text-yellow-500"/>,
            isSelected:false,
        },
        {
            id:3,
            name:"High",
            icon:<CircleIcon className="text-[14px] text-red-500"/>,
            isSelected:false,
        }

    ]);
    const{
        allProjectsObject:{allProjects,setAllProjects},
        openTasksWindowObject:{openTasksWindow,setOpenTasksWindow},
        selectedTaskObject:{selectedTask},
        selectedIconObject:{selectedIcon,setSelectedIcon},
        chosenProjectObject:{chosenProject,setChosenProject},
        allTasksObject:{allTasks,setallTasks},
        projectClickedObject:{projectClicked}
    }=useContextApp();
    const[updateAllProjects,setUpdateAllProjects]=useState<ProjectWithSelection[]>([]);
    useEffect(()=>{
        const tempAllProjects:ProjectWithSelection[]=allProjects.map((project)=>({
            ...project,
            isSelected:false,
        }))
        setUpdateAllProjects(tempAllProjects);
    },[allProjects]);

    // useLayoutEffect(()=>{
    //     reset();
    //     setPriority(null);
    //     setProject(null);
    //     setTimeout(()=>{
    //         setFocus("taskName")
    //     },0)
    //     setSelectionErrors((prevstate)=>
    //     prevstate.map((error)=>({...error,show:false}))
    // )
    // },[openTasksWindow])
    useLayoutEffect(()=>{
        if(!selectedTask){
            if(projectClicked){
                setProject(projectClicked);
                setUpdateAllProjects((prevproj)=>
                prevproj.map((proj)=>({
                    ...proj,
                    isSelected:proj.id ===projectClicked.id?true:false,
                }))
                )
            }
            else{
                setPriority(null);
            }
            reset();
            setPriority(null);
            // setProject(null);
        }
        else{
            setValue("taskName",selectedTask.title);
            const getPriority=priorityList.find(
                (priority)=>priority.name === selectedTask.priority
            )
            if(getPriority){
                setPriority(getPriority);
            }
            const getProject=updateAllProjects.find(
                (proj)=>
                    proj.title.toLowerCase() === selectedTask.projectName.toLowerCase()
            )
            if(getProject){
                setProject(getProject)
            }
            const findIconInAllIconsArray=allIconsArray.find(
                (icon)=>icon.name === selectedTask.icon
            )
            if(findIconInAllIconsArray){
                setSelectedIcon(findIconInAllIconsArray);
            }
        }
        setTimeout(() => {
             setFocus("taskName")
        }, 0);
        setSelectionErrors((prevstate) => prevstate.map((error) => ({ ...error, show: false })));
    },[selectedTask])
    const [selectionErrors,setSelectionErrors]=useState([
        {
            id:1,
            label:"priority",
            message:"Please select the priority",
            show:false,
        },
        {
            id:2,
            label:"project",
            message:"Please select a project",
            show:false,
        }
    ]);
    const [isLoading,setIsLoading]=useState(false);

    // const onSubmit:SubmitHandler<FormData>=(data)=>{
    //     console.log("on submit is called",data)
    //     console.log("project",project)
    //     if(project){
    //         const findProject=updateAllProjects.find(
    //             (proj)=>proj.id===project.id
    //         )
    //         const findTask=findProject?.tasks.find(
    //             (task)=>task.title.toLowerCase() ===data.taskName.toLowerCase()
    //         )
    //         if(findTask){
    //             setError("taskName",{
    //                 type:"manual",
    //                 message:"task already exists"
    //             })
    //             setFocus("taskName");
    //             return;
    //         }
    //     }
    //     const newErrors=selectionErrors.map((error)=>{
    //         if(error.label ==="priority" && !priority){
    //             return{...error,show:true}
    //         }
    //         if(error.label ==="project" && !project){
    //             return {...error,show:true};
    //         }
    //         return {...error,show:false};
    //     })
    //     if(newErrors.every((error)=>error.show===false)){
    //         console.log("success")
    //         tasksFuntion(data);
    //     }
    //     setSelectionErrors(newErrors);
    // }
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("on submit is called", data);
        console.log("project", project);
    
        if (project) {
            const findProject = updateAllProjects.find((proj) => proj.id === project.id);
            const findTask = findProject?.tasks.find(
                (task) => task.title.toLowerCase() === data.taskName.toLowerCase()
            );
    
            // Check if the found task exists and it's not the task being edited
            if (findTask && (!selectedTask || findTask.id !== selectedTask.id)) {
                setError("taskName", {
                    type: "manual",
                    message: "Task already exists",
                });
                setFocus("taskName");
                return;
            }
        }
    
        const newErrors = selectionErrors.map((error) => {
            if (error.label === "priority" && !priority) {
                return { ...error, show: true };
            }
            if (error.label === "project" && !project) {
                return { ...error, show: true };
            }
            return { ...error, show: false };
        });
    
        if (newErrors.every((error) => !error.show)) {
            console.log("success");
            tasksFuntion(data);
        }
        setSelectionErrors(newErrors);
    };    
    async function tasksFuntion(data: FormData) {
        console.log("task function data", data); // Debugging line
        try {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Before adding new task"); // Debugging line
            // addNewTask(data); // Ensure this function is called
            if (selectedTask) {
                // Edit existing task
                editTask(data);
            } else {
                // Create new task
                addNewTask(data);
            }
            

            // const updateTask:Task={
            //     ...selectedTask,
            //     title:data.taskName,
            //     icon:selectedIcon?.name || "LibraryBooksIcon",
            //     status:selectedTask.status,
            //     projectName:project?.title || "",
            //     priority:priority?.name || "Low",
            //     updatedAt:new Date().toISOString();
            // }
            // const updatedProjects=allProjects.map((proj)=>{
            //     if(proj.title === updateTask.projectName){
            //         const tasksExists=proj.tasks.some(
            //             (task)=>task.id===updateTask.id
            //         );
            //         if(tasksExists){
            //             return{
            //                 ...proj,
            //                 tasks:proj.tasks.map((task)=>
            //                 task.id === updateTask.id?updateTask:task
            //                 ),
            //             };
            //         }
            //         else{
            //             return {...proj,tasks:[...proj.tasks,updateTask]};
            //         }
            //     }
            //     else{
            //         return{
            //             ...proj,
            //             tasks:proj.tasks.filter((task)=>task.id !==updateTask.id);
            //         }
            //     }
            // })
            // const updateAllTasks=updatedProjects.flatMap((proj)=>proj.tasks);
            // setallTasks(updateAllTasks);
            // if(chosenProject && project){
            //     let updateTasksOfChosenProject:Task[]=[];
            //     if(chosenProject.id ===project.id){
            //         updateTasksOfChosenProject=chosenProject.tasks.map((task)=>{
            //             if(task.id ===updateTask.id){
            //                 return updateTask;
            //             }
            //             return task;
            //         })
            //     }
            //     else{
            //         updateTasksOfChosenProject=chosenProject.tasks.filter(
            //              (task)=>task.id !=updateTask.id
            //         )
            //     }
            //     const updatedChosenProject:Project={
            //         ...chosenProject,
            //         tasks:updateTasksOfChosenProject
            //     }
            //     setChosenProject(updatedChosenProject);
            // }
            // setAllProjects(updatedProjects);
            // editTask();

        } catch (error) {
            console.error("Error in tasksFuntion:", error); // Log any error
        } finally {
            setIsLoading(false); // Ensure loading is set to false
            setOpenTasksWindow(false); // Close the task window
        }
    }
    function editTask(data: FormData) {
        if (!selectedTask) return; // No task to edit

        const updatedTask: Task = {
            ...selectedTask,
            title: data.taskName,
            icon: selectedIcon?.name || "LibraryBooksIcon",
            status: selectedTask.status,
            projectName: project?.title || "",
            priority: priority ? (priority.name as "Low" | "Medium" | "High") : "Low",
            updatedAt: new Date().toISOString(),
        };

        const updatedProjects = allProjects.map((proj) => {
            if (proj.id === project?.id) {
                return {
                    ...proj,
                    tasks: proj.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
                };
            }
            return proj;
        });

        setAllProjects(updatedProjects);
        setallTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    }

    
    function addNewTask(data: FormData) {
        console.log("Adding new Task with data:", data); // Debugging line
    
    
        const newTask: Task = {
            id: uuidv4(),
            title: data.taskName,
            icon: selectedIcon ? selectedIcon.name : "MenuBook",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            priority: priority ? (priority.name as "Low" | "Medium" | "High") : "Low",
            projectName: project?.title || "",
            status: "In Progress",
        };
    
        console.log("new task created:", newTask); // Debugging line
        // Check here if newTask is created successfully
    
        const updatedProjects = allProjects.map((proj) => ({
            ...proj,
            tasks: proj.id === project?.id ? [...proj.tasks, newTask] : proj.tasks,
        }));
    
        console.log("Updated projects:", updatedProjects); // Log updated projects
        setAllProjects(updatedProjects); // Update the state
    
        if (chosenProject && chosenProject.id === project?.id) {
            const copyChosenProject: Project = {
                ...chosenProject,
                tasks: [...chosenProject.tasks, newTask],
            };
            setChosenProject(copyChosenProject); // Update the chosen project
        }
        
       setallTasks([...allTasks,newTask]);
       setAllProjects(updatedProjects);
        console.log("Current allTasks after addition:", allTasks);
        console.log("all projects",allProjects); // Log the all tasks state
    }    

    
    // async function tasksFuntion(data:FormData){
    //     console.log("task function data",data);
    //     try{
    //         setIsLoading(true);
    //         await new Promise((resolve)=>setTimeout(resolve,1000));
    //         addNewTask(data);
    //     }
    //     catch(error){

    //     }
    //     finally{
    //         setIsLoading(true);
    //         setOpenTasksWindow(false);
    //     }
    // }
    // function addNewTask(data:FormData){
    //     console.log("adding new task////",data);
    //     const{
    //         chosenProjectObject:{chosenProject,setChosenProject},
    //         allTasksObject:{allTasks,setallTasks},
    //         selectedIconObject:{selectedIcon,setSelectedIcon},
            
            
    //     }=useContextApp();
    //     // const[allTasks,setallTasks]=useState<Task[]>([]);
    //     console.log("adding new Task",data);
        
    //     const newTask:Task={
    //         id:uuidv4(),
    //         title:data.taskName,
    //         icon:selectedIcon?selectedIcon?.name:"MenuBook",
    //         createdAt:new Date().toISOString(),
    //         updatedAt:new Date().toISOString(),
    //     //    priority: priority ? priority.name : "Low",
    //     priority: priority ? (priority.name as "Low" | "Medium" | "High") : "Low",
    //         projectName:project?.title || "",
    //         status:"In Progress",

    //     };
    //     console.log("new task",newTask);
    //     console.log("all projects",allProjects);
    //     const updateAllProjects=allProjects.map((proj)=>({
    //         ...proj,
    //         tasks:proj.id ===project?.id ?[...proj.tasks,newTask]:[...proj.tasks],
    //     }))
    //     setAllProjects(updateAllProjects)
    //     if(chosenProject && chosenProject.id ===project?.id){
    //            const copyChosenProject:Project={
    //             ...chosenProject,
    //             tasks:[...chosenProject.tasks,newTask]
    //            };
    //            setChosenProject(copyChosenProject)
    //     }
    //     setallTasks([...allTasks,newTask])
    //     console.log("Tasks",allTasks);
    // }
    return(
        <TaskFormContext.Provider
        value={{clickedSelection,setClickedSelection,openTasksDropDown,setOpenTasksDropDown,tasksDropDownPositions,setTasksDropDownPositions,priority,setPriority,project,setProject,
            priorityListObject:{
            priorityList,
            setPriorityList,
        },
        updatedAllProjectsObject:{
            updatedAllProjects:updateAllProjects,
            setUpdatedAllProjects:setUpdateAllProjects,
        },
        selectionErrorsObject:{
            selectionErrors,setSelectionErrors
        },
    }}
        >
            <div className={`w-[48%] max-sm:2-[82%] max-[600px]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50 bg-white rounded-lg shadow-md ${openTasksWindow?"":"hidden"}`}>
          <TasksDropDown/>
          <Header/>
          <form className="flex flex-col gap-2 pt-8 px-7 mt-3" onSubmit={handleSubmit(onSubmit)}>
            <TaskInput register={register} errors={errors}/>
            <div className="flex justify-between gap-3 mt-5">
<PrioritySelection/>
<ProjectsSelection/>

            </div>
            <Footer isLoading={isLoading}/>
          </form>
            </div>

        </TaskFormContext.Provider>
    )

    

function Header(){
    const{
        openTasksWindowObject:{setOpenTasksWindow},
        selectedTaskObject:{selectedTask,setSelectedTask},
    }=useContextApp();
    return(
        <div className="flex justify-between items-center pt-7 px-7">
        <div className="flex items-center gap-2">
            <div className="p-[7px] bg-orange-200 rounded-lg flex items-center justify-center">
              <ListAltIcon
              sx={{fontSize:"21px"}}
              className="text-orange-600"
              onClick={()=>setOpenTasksWindow(false)}
              />
            </div>
            <span className="font-semibold text-lg">
                {selectedTask?"Edit Task":"Add New Task"}
            </span>
              <CloseOutlinedIcon
              sx={{fontSize:"18px"}}
              className="text-slate-300 cursor-pointer"
              onClick={()=>{
                setOpenTasksWindow(false);
                setSelectedTask(null);
              }}
              />
        </div>
        </div>
    )

}
function TaskInput({
    register,errors,
}:{
    register:UseFormRegister<FormData>;
    errors:FieldErrors<FormData>;
}){
    const{
        // selectedIconObject:{selectedIcon},
        openIconWindowObject:{setOpenIconWindow},
    }=useContextApp();
    return(
        <div className="flex flex-col gap-2">
          <span className="text-[14px] font-medium text-slate-600">
          TaskName
          </span>
          <div className="flex gap-3 justify-between">
            <div className="w-full">
                <input
                {...register("taskName")}
                placeholder="Enter Task Name"
                className="p-[10px] text-[13px] w-full rounded-md border outline-none"
                />
                {
                    errors.taskName && (
                        <p className="text-[11px] mt-2 text-red-500">
                              {errors.taskName.message}
                        </p>
                    )
                }
            </div>
            <div 
            onClick={()=>setOpenIconWindow(true)}
            className="w-12 h-10 text-white flex items-center jsutify-center "
            >

            </div>

          </div>
        </div>
    )
}

// function PrioritySelection(){
//     const{
//         setClickedSelection,
//         setOpenTasksDropDown,
//         openTasksDropDown,
//         setTasksDropDownPositions,
//         priority,
//         clickedSelection,
//         selectionErrorsObject:{selectionErrors,setSelectionErrors},
//     }=useTaskFormContext();
//     const prioritySelectionRef=useRef<HTMLDivElement>(null);

//     function handleClickedSelection(){
//         if(prioritySelectionRef.current){
//             const rect=prioritySelectionRef.current.getBoundingClientRect();
//             const {left,top,width}=rect;
//             setTasksDropDownPositions({left:left,top:top,width:width});
//             setOpenTasksDropDown(true);
//             setClickedSelection("priority");
//             setSelectionErrors((prevstate)=>
//             prevstate.map((error)=>({
//                 ...error,
//                 show:error.label ==="priority" && false,
//             }))
//             )
//         }
//         return(
//             <div ref={prioritySelectionRef}
//             onClick={handleClickedSelection}
//             className="flex flex-col w-full relative cursor-pointer"
//             >
//                 <span className="text-[14px] font-medium text-slate-600">
//                     Task Priority
//                 </span>

//                 <div className="flex justify-between items-center border h-[42px] px-2 rounded-md">
//                    <span className="w-full text-[13px] text-slate-400">
//                     {
//                         priority?(
//                             <div className="flex gap-1 items-center">
//                                     <div>{priority.icon}</div>
//                                     <span className="mt-[3px]">{priority.name}</span>
//                             </div>
//                         ):(
//                             <span>Select Priority</span>
//                         )
//                     }
//                    </span>
//                    {
//                     selectionErrors[0].show && (
//                         <span className="text-red-500 text-[11px]">
//                             {selectionErrors[0].message}
//                         </span>
//                     )
//                    }
//                    <KeyboardArrowDownIcon className="absoulte top-[40px] right-3 text-slate-400"/>
//                 </div>

//             </div>
//         )
//     }
// }
function PrioritySelection() {
    const {
      setClickedSelection,
      setOpenTasksDropDown,
      setTasksDropDownPositions,
      priority,
      selectionErrorsObject: { selectionErrors, setSelectionErrors },
    } = useTaskFormContext();
  
    const prioritySelectionRef = useRef<HTMLDivElement>(null);
  
    function handleClickedSelection() {
      if (prioritySelectionRef.current) {
        const rect = prioritySelectionRef.current.getBoundingClientRect();
        const { left, top, width } = rect;
        setTasksDropDownPositions({ left: left, top: top, width: width });
        setOpenTasksDropDown(true);
        setClickedSelection("priority");
        setSelectionErrors((prevstate) =>
          prevstate.map((error) => ({
            ...error,
            show: error.label === "priority" ? false : error.show,
          }))
        );
      }
    }
  
    return (
      <div
        ref={prioritySelectionRef}
        onClick={handleClickedSelection}
        className="flex flex-col w-full relative cursor-pointer"
      >
        <span className="text-[14px] font-medium text-slate-600">
          Task Priority
        </span>
  
        <div className="flex justify-between items-center border h-[42px] px-2 rounded-md">
          <span className="w-full text-[13px] text-slate-400">
            {priority ? (
              <div className="flex gap-1 items-center">
                <div>{priority.icon}</div>
                <span className="mt-[3px]">{priority.name}</span>
              </div>
            ) : (
              <span>Select Priority</span>
            )}
          </span>
          {selectionErrors[0].show && (
            <span className="text-red-500 text-[11px]">
              {selectionErrors[0].message}
            </span>
          )}
          <KeyboardArrowDownIcon className="absolute top-[40px] right-3 text-slate-400" />
        </div>
      </div>
    );
  }
  function ProjectsSelection(){
    const {
        setClickedSelection,
        setOpenTasksDropDown,
        setTasksDropDownPositions,
        project,
        selectionErrorsObject: { selectionErrors, setSelectionErrors },
    } = useTaskFormContext();

    // const { allProjects } = useContextApp().allProjectsObject; // Assuming you have allProjects in your context
    const projectSelectionRef = useRef<HTMLDivElement>(null);

    function handleClickedSelection() {
        if (projectSelectionRef.current) {
            const rect = projectSelectionRef.current.getBoundingClientRect();
            const { left, top, width } = rect;
            setTasksDropDownPositions({ left, top, width });
            setOpenTasksDropDown(true);
            setClickedSelection("project");
            setSelectionErrors((prevstate) =>
                prevstate.map((error) => ({
                    ...error,
                    show: error.label === "project" ? false : error.show,
                }))
            );
        }
    }

    return (
        <div
            ref={projectSelectionRef}
            onClick={handleClickedSelection}
            className="flex flex-col w-full relative cursor-pointer"
        >
            <span className="text-[14px] font-medium text-slate-600">
                Task Project
            </span>

            <div className="flex justify-between items-center border h-[42px] px-2 rounded-md">
                <span className="w-full text-[13px] text-slate-400">
                    {project ? project.title : "Select Project"}
                </span>
                {selectionErrors[1].show && (
                    <span className="text-red-500 text-[11px]">
                        {selectionErrors[1].message}
                    </span>
                )}
                <KeyboardArrowDownIcon className="absolute top-[40px] right-3 text-slate-400" />
            </div>

            {/** Render the project dropdown when openTasksDropDown is true **/}
            {/** You can create a separate dropdown component or handle it inline **/}
            <ProjectsDropDown/>
        </div>
    )
  }
  
function Footer({isLoading}:{isLoading:boolean}){
const{
    openTasksWindowObject:{setOpenTasksWindow},
    selectedIconObject:{setSelectedIcon},
    selectedTaskObject:{selectedTask,setSelectedTask}

}=useContextApp();
return(
    <div className="w-[102%] p-[12px] mt-8 mb-4 flex gap-3 justify-end items-center">
    <button
    onClick={()=>{
        setOpenTasksWindow(false);
        setSelectedTask(null);
        setSelectedIcon(null);
    }}
    type="button"
    className="border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md hover:border-slate-300 transition-all"
    >
Cancel
    </button>
    <button type="submit"
    onClick={()=>onSubmit}
    className="bg-orange-600 hover:bg-orange-700 text-white text-[13px] p-2 px-4 rounded-md transition-all"
    >
        {
            isLoading?"Saving ...":selectedTask?"Edit Task":"Add Task"}
        

    </button>
    </div>
)
}
}
