import React from "react";
import { SingleProjectCard } from "./SingleProjectCard";
import { useContextApp } from "../../ContextApp";
import { ProjectsEmptyScreen } from "@/app/Components/EmptyScreens/ProjectEmptyScreen";
export function AllProjectsSection(){
    const {allProjectsObject:{allProjects},}=useContextApp();
    return(   
             <ul className="h-[78%] overflow-auto flex gap-4 flex-wrap mt-6">
{/* <SingleProjectCard/>
<SingleProjectCard/>
<SingleProjectCard/>
<SingleProjectCard/>
<SingleProjectCard/> */}
{
    allProjects.length===0?<ProjectsEmptyScreen/>:allProjects.map((project)=>(
        <SingleProjectCard key={project.id} project={project}/>
    ))
}
{/* {
    allProjects.map((project)=>(
        <SingleProjectCard key={project.id} project={project}/>
    ))
} */}

        </ul>
        
       
        
    )
}