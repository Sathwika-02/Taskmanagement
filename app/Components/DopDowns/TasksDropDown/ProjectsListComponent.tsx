// // import { useRef } from "react";
// // import { useTaskFormContext } from "../../Windows/TasksWindow";

// import { getIconComponent } from "../../functions/IconActions";
// import { useContextApp } from "../../Pages/ContextApp";
// import { ProjectWithSelection, useTaskFormContext } from "../../Windows/TasksWindow";

// // function ProjectsSelection(){
// //     const{
// //         setClickedSelection,
// //         setOpenTasksDropDown,
// //         setTasksDropDownPositions,
// //         project,
// //     }=useTaskFormContext();
// //     const projectsSelectionRef=useRef<HTMLDivElement>(null);
// //     function handleClickedSelection(){
// //         if(projectsSelectionRef.current){
// //             const rect=projectsSelectionRef.current.getBoundingClientRect();
// //             const{left,top,width}=rect;
// //             setTasksDropDownPositions({left:left,top:top,width:width});
// //         }
// //         setClickedSelection("project");
// //         setOpenTasksDropDown(true);
// //     }
// //     return(
// //         <div ref={projectsSelectionRef}
// //         onClick={handleClickedSelection}
// //         className="flex flex-col gap-2 w-full relative cursor-pointer"
// //         >

// //         </div>
// //     )
// // }
// // export default ProjectsSelection;

// export default function ProjectsListComponent(){
//     const{
//         updatedAllProjectsObject:{updatedAllProjects,setUpdatedAllProjects},
//     }=useTaskFormContext();
//     return(
//         <div className="flex flex-col gap-3">
//             {
//                 updatedAllProjects.map((singleProject,index)=>(
//                     <SingleProject
//                     key={index}
//                     singleProject={singleProject}
//                     index={index}
//                     />
//                 ))
//             }
//         </div>

//     )
//     function SingleProject({
//         singleProject,
//         index
//     }:{
//         singleProject:ProjectWithSelection;
//         index:number;
//     }){
        
//         const {setProject,setOpenTasksDropDown}=useTaskFormContext();
//         function updateTheProjectstate(index:number){
//             setProject(singleProject);
//             setUpdatedAllProjects((prevprojet)=>
//                 prevprojet.map((project,i)=>({
//                     ...project,
//                     isSelected:index===i,
//                 }))
//             )
//             setOpenTasksDropDown(false);

//         }
//         return(
//             <div onClick={()=>updateTheProjectstate(index)}
//             className={`${
//                 singleProject.isSelected && "bg-orange-50 border border-orange-200"
//             } flex items-center gap-2 p-[7px] rounded-md cursor-pointer`}
//             >
//                 <div className={`flex gap-2 items-center`}>
//                <div>
//                 {getIconComponent(singleProject.icon,"text-orange-600","22px")}{" "}
//                 </div>
//                 <span className="mt-[3px] hover:text-orange-600 text-slate-500">
// {singleProject.title}
//                 </span>
// </div>
//             </div>
//         )
//     }
// }

import React from "react";
import { useTaskFormContext } from "@/app/Components/Windows/TasksWindow";
import { useContextApp } from "../../Pages/ContextApp";
export default function ProjectsListComponent() {
    const {
        project,
        setProject,
        setOpenTasksDropDown,
    } = useTaskFormContext();

    const { allProjects } = useContextApp().allProjectsObject; // Ensure this path is correct

    return (
        <div className="flex flex-col gap-2">
            {allProjects.map((proj) => (
                <div
                    key={proj.id}
                    onClick={() => {
                        setProject(proj); // Set the selected project
                        setOpenTasksDropDown(false); // Close the dropdown
                    }}
                    className={`p-2 hover:bg-gray-100 cursor-pointer ${
                        project?.id === proj.id ? "bg-gray-200" : ""
                    }`}
                >
                    {proj.title}
                </div>
            ))}
        </div>
    );
}
