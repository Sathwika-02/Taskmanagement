import React from "react";
import ProjectsHeader from "./ProjectsHeader";
import ProjectsSubHeader from "./ProjectsSubHeader";
import { AllProjectsSection } from "./AllProjectsSection";
import { StatsRightSideBar } from "./StatsRightSideBar";
export default function AllTasks(){
    return(  
        <div className="bg-slate-50 w-full  flex-grow overflow-auto min-h-screen flex">
            <AllTasksArea/>
            <StatsRightSideBar/>
          
        </div>
    )
}
function AllTasksArea(){
    return(
        <div className="w-[78%] p-10 flex flex-col gap-3 border">
       <ProjectsHeader/>
       <ProjectsSubHeader/>
       <AllProjectsSection/>
        </div>
    )
}