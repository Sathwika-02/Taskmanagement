import React, {  useRef } from "react";
import { useContextApp } from "../Pages/ContextApp";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import { Project } from "../Data/AllProjects";
import { getIconComponent } from "../functions/IconActions";
function ProjectsDropDown(){
    const{
        allProjectsObject:{allProjects},
        projectsDropDownPositionObject:{projectsDropDownPosition},
        openProjectsDropDownObject:{openProjectsDropDown}
    }=useContextApp();
    const dropdownRef=useRef<HTMLDivElement>(null);
    // useEffect(()=>{
    // function handleClickOutside(event:MouseEvent){
    //     if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
    //         setOpenProjectsDropDown(false);
    //     }
    // }
    // function handleResize(){
    //     setOpenProjectsDropDown(false);
    // }
    // if(openProjectsDropDown){
    //     document.addEventListener("mousedown",handleClickOutside);
    //     window.addEventListener("resize",handleResize);
    // }
    // else{
    //     document.removeEventListener("mousedown",handleClickOutside);
    //     window.removeEventListener("resize",handleResize);
    // }
    // return()=>{
    //     document.removeEventListener("mousedown",handleClickOutside);
    //     window.removeEventListener("resize",handleResize);
    // }
    // },[openProjectsDropDown])
    return(
        <div ref={dropdownRef}
        style={{top:projectsDropDownPosition.top+36,
            left:projectsDropDownPosition.left,
        }}
        className={`bg-white absolute p-3 top-12 left-44 z-[90] border w-[210px] border-slate-50 select-none shadow-md rounded-lg flex flex-col gap-2 ${openProjectsDropDown?"block":"hidden"}`}
        >
<AllProjectsItem/>
<hr className="w-[80%] text-slate-400 mx-auto my-1 opacity-55"/>
<>
{
    allProjects.map((singleProject)=>(
        <SingleProject key={singleProject.id} singleProject={singleProject}/>
    ))
}
</>
        </div>
    )
}
export default ProjectsDropDown;
function AllProjectsItem(){
    const{
        chosenProjectObject:{setChosenProject},
        openProjectsDropDownObject:{setOpenProjectsDropDown},
    }=useContextApp();
    return(
        <div 
        onClick={()=>{
         setChosenProject(null);
         setOpenProjectsDropDown(false)
        }}
        className={`flex items-center justify-between gap-7 p-2 rounded-lg text-slate-600 cursor-pointer`}>
            <div>
                <DensitySmallIcon className="text-orange-600 text-[22px]"/>
            </div>
            <span className="text-[13px] mt-1 hover:text-orange-600 cursor-pointer">
                All Projects
            </span>

        </div>
    )
}
function SingleProject({singleProject}:{singleProject:Project}){
    const{
        chosenProjectObject:{chosenProject,setChosenProject},
        allProjectsObject:{allProjects},
        openProjectsDropDownObject:{setOpenProjectsDropDown},
    }=useContextApp();
    function handleTheProjectclicked(projectId:string){
        console.log("handle project clicked",projectId);
        const findProject=allProjects.find((project)=>project.id===projectId);
        console.log("finding project",findProject);
        if(findProject){
            setChosenProject(findProject);
        }
        setOpenProjectsDropDown(false);
    }
    return(
        <div 
        onClick={()=>handleTheProjectclicked(singleProject.id)}
        className={`  ${chosenProject?.id ===singleProject.id && "border border-orange-600 bg-orange-50" }flex items-center justify-between gap-7 p-2 rounded-lg text-slate-600 cursor-pointer`}>
       <div className="flex gap-2 items-center">
         <div>
            {""}
            {getIconComponent(singleProject.icon,"text-orange-600","22px")}{" "}
         </div>
         <span className="text-[13px] mt-1 hover:text-orange-600 cursor-pointer">
         {singleProject.title}
         </span>
       </div>
        </div>
    )
}