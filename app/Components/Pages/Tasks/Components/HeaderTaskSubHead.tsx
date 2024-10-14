import { Splitscreen } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useContextApp } from "../../ContextApp";
import { Task } from "@/app/Components/Data/AllProjects";
import { useRef } from "react";
import KeyBoardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

export function HeaderTaskSubhead(){
    const {
        chosenProjectObject:{chosenProject},
        allProjectsObject:{allProjects},
        projectsDropDownPositionObject:{setProjectsDropDownPosition},
        openProjectsDropDownObject:{openProjectsDropDown,setOpenProjectsDropDown}
    }=useContextApp();
    function allTasksInAllProjects(){
        return allProjects.reduce((acc,project)=>acc+project.tasks.length,0);
    }
    function calculateCompltedTasks(tasks:Task[]){
        return tasks.filter((task)=>task.status==="Completed").length;
    }
    const totalTasks=chosenProject?chosenProject.tasks.length:allTasksInAllProjects();
    const completedTasks=chosenProject?calculateCompltedTasks(chosenProject.tasks):
    allProjects.reduce((acc,project)=>acc+calculateCompltedTasks(project.tasks),0);
    const compltetionPerce=totalTasks>0?(completedTasks/totalTasks)*100:0;
    const projectTitleRef=useRef<HTMLDivElement>(null);
    function openTheProjectDropDown(){
        console.log("opening project dropdown")
        if(projectTitleRef.current){
            const rect=projectTitleRef.current.getBoundingClientRect();
            const {top,left,width}=rect;
            setProjectsDropDownPosition({left,top,width})
        }
        setOpenProjectsDropDown(!openProjectsDropDown);
    }
    
    return(
       <div className="flex items-center gap-3 ">
        <div className="w-[41px] mt-1 flex justify-center items-center ">
            <Splitscreen sx={{fontSize:"21px"}} className="text-orange-600"/>

        </div>
        <ul className="flex flex-col gap-[7px] mt-10 cursor-pointer">
            <li className="text-[17px] font-semibold flex gap-2 items-center">
                <div 
                ref={projectTitleRef}
                onClick={openTheProjectDropDown}
                className="text-slate-700 flex gap-2 items-center">
                    <span className="text-lg">{chosenProject?.title || "All Projects"}</span>
                    <span className="bg-slate-700 text-white text-[14px] p-[2px]">
                        {totalTasks}
                    </span>

                </div>
              <KeyboardArrowDownIcon className="text-slate-600 text-lg"/>
            </li>

            <div className="flex gap-1 items-center">
                <li className="text-[12px] h-[4px] w-[280px] ng-slate-200">
                    <div className="w-[1/2] h-[100%] bg-orange-600 rounded-r-xl"
                    style={{width:`${compltetionPerce}%`}}
                    ></div>
                </li>
                <p className="text-[12px] text-slate-400 ml-3">{compltetionPerce.toFixed(0)}%</p>
            </div>

        </ul>
       
       </div>
    )
//    function SortByButton(){
//         const{
//             sortingDropDownPositionsObject:{setSortingDropDownPositions},
//             openSortingDropDownObject:{openSortingDropDown,setOpenSortingDropDown},
//             sortingOptionsObject:{sortingOptions},
//         }=useContextApp();
//         const sortRef=useRef<HTMLDivElement>(null);
//         let sortingLabel="";
//         const flatten=sortingOptions.
//         flatMap((option)=>option.options)
//         .find((option)=>option.selected);
    
//         if(flatten){
//             if(flatten.label==="A-Z" || flatten.label ==="Z-A"){
//                 sortingLabel=`Order ${flatten.label}`;
//             }
//             else{
//                 sortingLabel=`${flatten.label} Projects`
//             }
//         }
        
//         function clickedSortingLink(){
//             if(sortRef.current){
//                 const rect=sortRef.current.getBoundingClientRect();
//                 const {top,left,width}=rect;
//                 setSortingDropDownPositions({
//                     top:top+30,
//                     left:left,
//                     width:width,
//                 })
//             }
//             setOpenSortingDropDown(true);
//         }
//         return(
//             <div className="flex text-[15px] max-sm:text-[14px] font-semibold gap-3 max-sm:gap-1">
//     <span className="text-slate-300">Sort By</span>
//     <div
//     ref={sortRef}
//     onClick={clickedSortingLink}
//     className="flex gap-1 items-center cursor-pointer text-slate-800 hover:text-orange-600"
//     >
//         <span className="">
//            {sortingLabel}
//         </span>
//         {
//             openSortingDropDown?(
//                 <KeyboardArrowUpIcon sx={{fontSize:"19px"}}/>
//             ):(
//                 <KeyBoardArrowDownIcon sx={{fontSize:"19px"}}/>
//             )
//         }
        

//     </div>
//     </div>
    //     )
    // }
}
export function SortByButton(){
    const{
        sortingDropDownPositionsObject:{setSortingDropDownPositions},
        openSortingDropDownObject:{openSortingDropDown,setOpenSortingDropDown},
        sortingOptionsObject:{sortingOptions},
    }=useContextApp();
    const sortRef=useRef<HTMLDivElement>(null);
    let sortingLabel="";
    const flatten=sortingOptions.
    flatMap((option)=>option.options)
    .find((option)=>option.selected);

    if(flatten){
        if(flatten.label==="A-Z" || flatten.label ==="Z-A"){
            sortingLabel=`Order ${flatten.label}`;
        }
        else{
            sortingLabel=`${flatten.label} Projects`
        }
    }
    
    function clickedSortingLink(){
        if(sortRef.current){
            const rect=sortRef.current.getBoundingClientRect();
            const {top,left,width}=rect;
            setSortingDropDownPositions({
                top:top+30,
                left:left,
                width:width,
            })
        }
        setOpenSortingDropDown(true);
    }
    return(
        <div className="flex text-[15px] max-sm:text-[14px] font-semibold gap-3 max-sm:gap-1">
<span className="text-slate-300">Sort By</span>
<div
ref={sortRef}
onClick={clickedSortingLink}
className="flex gap-1 items-center cursor-pointer text-slate-800 hover:text-orange-600"
>
    <span className="">
       {sortingLabel}
    </span>
    {
        openSortingDropDown?(
            <KeyboardArrowUpIcon sx={{fontSize:"19px"}}/>
        ):(
            <KeyBoardArrowDownIcon sx={{fontSize:"19px"}}/>
        )
    }
    

</div>
</div>
    )
}