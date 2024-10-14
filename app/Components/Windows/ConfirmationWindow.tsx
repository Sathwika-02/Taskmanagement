import { useEffect, useState } from "react";
import { useContextApp } from "../Pages/ContextApp";
import toast from "react-hot-toast";
import { deleteProject } from "../functions/projectsActions";
import { deleteTask } from "../functions/tasksFunction";

export function ConfirmationWindow(){
    const [isLoading,setIsLoading]=useState(false);
    const{
        openConfirmationWindowObject:{
            openConfirmationWindow,setOpenConfirmationWindow
        },
        selectedProjectObject:{selectedProject,setSelectedProject},
        allProjectsObject:{allProjects,setAllProjects},
        chosenProjectObject:{chosenProject,setChosenProject},
        allTasksObject:{setallTasks},
        selectedTaskObject:{selectedTask,setSelectedTask},
    }
    =useContextApp();
    const [header,setHeader]=useState("");
    const [message,setMessage]=useState("");
    function closeConfirmationWindow(){
        setOpenConfirmationWindow(false);
        setSelectedProject(null);
        setSelectedTask(null);
        setIsLoading(false);
    }
    async function deleteFunction(){
        try{
            setIsLoading(true);
            await new Promise((resolve)=>setTimeout(resolve,1000));
            if(selectedProject){
            deleteProject(
                selectedProject,
                setSelectedProject,
                allProjects,
                setAllProjects,
                setOpenConfirmationWindow
            );
        }
        else if(selectedTask){
            console.log("selectd task",selectedTask);
            deleteTask({
                taskToDelete:selectedTask,
                allProjects,
                chosenProject,
                setallTasks,
                setChosenProject,
                setAllProjects,
            })
        }

            setIsLoading(false);
        }
        catch(error){
            console.log(error);
            toast.error("something went wrong");
        }
        finally {
            setIsLoading(false);
            setOpenConfirmationWindow(false);
            
            // Here, you might want to call setChosenProject only if selectedTask is null
            if (selectedTask === null) {
                setChosenProject(null); // Only call if there is a valid condition to reset
            }
            
            setSelectedProject(null); // Always reset selected project
            setSelectedTask(null); // Always reset selected task
            
            // Notify the user about the successful deletion
            toast.success(`${selectedProject ? "Project" : "Task"} deleted successfully`);
        }
    }
   
    useEffect(()=>{
        if(selectedProject){
            setHeader("Project");
            setMessage(` Are you sure you want to remove this project?This action cannot be 
                 undone,and will remove all tasks associated with it`)
        }
        else if(selectedTask){
            setHeader("Task");
            setMessage(`Are you sure you want to remove this task? This action cannot be undone`)
        }
    },[openConfirmationWindow,selectedProject,selectedTask])
    return(
        <div className={`w-[38%] bg-white max-sm:w-[91%] max-lg:w-[80%] p-6 fixed shadow-md z-[90] rounded-lg flex items-center top-[30%] left-1/2 -translate-x-1/2 ${openConfirmationWindow?"block":"hidden"}`}>
            <div className="rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-5">Delete {header}</h2>
              <p className={`text-gray-600 mb-4 text-sm`}>
               {message}
              </p>
              <div className="flex justify-end gap-2 mt-10 text-[13px]">
                <button onClick={closeConfirmationWindow}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                >
                    Cancel

                </button>

                <button
                onClick={deleteFunction} 
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white">
                    {isLoading?"Deleting...":"Delete"}
              
                </button>
              </div>
            </div>

        </div>
    )

}