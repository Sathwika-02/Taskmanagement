import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useContextApp } from "../../ContextApp";
import MenuIcon from "@mui/icons-material/Menu"
import { useTaskFormContext } from "@/app/Components/Windows/TasksWindow";
export function HeaderTask(){
    return(
        <div className="flex justify-between">
       
        <SearchBar/>
        <AddProjectButton/>
        

    </div>
)
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
    const {openSideBarObject:{setOpenSideBar,openSideBar},
    openTasksWindowObject:{openTasksWindow,setOpenTasksWindow},
}=useContextApp();
    const {
    } = useTaskFormContext();
    return(
        // <div className="flex gap-3 items-center">
        // <button className="bg-orange-600 text-white px-2 pr-3 text-[14px] rounded-md flex gap-1 items-center">
        //     <AddIcon sx={{fontSize:"22px"}} className="mt-[2px]"/>
        //     <span>New Task</span>
        // </button>
        // <button onClick={()=>setOpenSideBar(!openSideBar)} className="text-slate-400 h-9 cursor-pointer hidden max-[940px]:block border background-blue">Open</button>
        // </div>
         <div className="flex gap-3"
         onClick={()=>{
            console.log("new taskis clicked")
           setOpenTasksWindow(!openTasksWindow)
         }}
         >
              <button className="bg-orange-600 text-white px-2 pr-3 text-[14px] rounded-md flex gap-1 items-center">
            <AddIcon sx={{fontSize:"22px"}} className="mt-[2px]"/>
            <span>New Task</span>
          
        </button>
       <MenuIcon onClick={()=>setOpenSideBar(!openSideBar)} className="cursor-pointer text-slate-400  h-9 max-[940px]:block"/>
         </div>
      
       
           



    )
}
}