import { Project, Task } from "../Data/AllProjects";

interface DeleteTaskProps{
    taskToDelete:Task,
    allProjects:Project[],
    chosenProject:Project|null;
    setallTasks:(tasks:Task[])=>void;
    setChosenProject:(project:Project)=>void;
    setAllProjects:(projects:Project[])=>void;

    
}
export const deleteTask=({
    taskToDelete,
    allProjects,
    chosenProject,
    setallTasks,
    setChosenProject,
    setAllProjects,
}:DeleteTaskProps):void=>{
 const updatedProjects=allProjects.map((proj:Project)=>({
    ...proj,
    tasks:proj.tasks.filter((task:Task)=>task.id !==taskToDelete.id),
 }))
 const updateAllTasks = updatedProjects.flatMap((proj: Project) => proj.tasks);
 setallTasks(updateAllTasks);

 // Update the chosen project if it contains the deleted task
 if (chosenProject && chosenProject.tasks.some((task: Task) => task.id === taskToDelete.id)) {
   const updatedChosenProject: Project = {
     ...chosenProject,
     tasks: chosenProject.tasks.filter((task: Task) => task.id !== taskToDelete.id), // Remove task from chosen project
   };
   setChosenProject(updatedChosenProject);
 }

 // Update the global projects list
 setAllProjects(updatedProjects);
}