import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useContextApp } from "../../ContextApp";

export default function ProjectsHeader(){
return(
    <div className="flex justify-between">
        <SearchBar/>
        <AddProjectButton/>

    </div>
)
}
function SearchBar(){
    return(
    
        <div className="flex items-center">
            <div className="border-b-2 border-orange-600 h-[39px] w-11 justify-center flex items-center">
           <SearchIcon className="text-slate-400 outline-none" sx={{fontSize:"26px"}}/>
            
        </div>
       
       <div className="border-b-2 border-slate-200">
         <input placeholder="Search a Task..." className="p-2 bg-transparent text-[14px] outline-none"/>
       </div>
       </div>
       
       
    )
}
function AddProjectButton(){
    const{
        openProjectWindowObject:{openProjectWindow,setOpenProjectWindow},}=useContextApp();
    return(
        <button className="bg-orange-600 text-white px-2 pr-3 text-[14px] rounded-md flex gap-1 items-center">
            <AddIcon sx={{fontSize:"22px"}} className="mt-[2px]"/>
            <span onClick={()=>setOpenProjectWindow(!openProjectWindow)}>New Project</span>

        </button>
    )
}