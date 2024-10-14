"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { useContextApp } from "../Pages/ContextApp";
import { sortProjects } from "../functions/sortingFunctions";
import { Task } from "../Data/AllProjects";
export function SortingDropDown(){
    const{
        sortingOptionsObject:{sortingOptions,setSortingOptions},
        openSortingDropDownObject:{openSortingDropDown,setOpenSortingDropDown},
        sortingDropDownPositionsObject:{sortingDropDownPositions},
        allProjectsObject:{allProjects,setAllProjects},
        sideBarMenuObject:{sideBarMenu},
        allTasksObject:{allTasks,setallTasks},
    }=useContextApp();
    const dropDownRef=useRef<HTMLDivElement>(null);
    useEffect(()=>{
        function handleClickOutside(event:MouseEvent){
            if(dropDownRef.current && !dropDownRef.current.contains(event.target as Node)){
                setOpenSortingDropDown(false);
            }
        }
        function handleResize(){
            setOpenSortingDropDown(false);
        }
        if(openSortingDropDown){
                 document.addEventListener("mousedown",handleClickOutside);
                 window.addEventListener("resize",handleResize);
        }
        else{
            document.removeEventListener("mousedown",handleClickOutside);
            window.removeEventListener("resize",handleResize);
        }
        return()=>{
            document.removeEventListener("mousedown",handleClickOutside);
            window.removeEventListener("resize",handleResize)
        }
    },[openSortingDropDown,setOpenSortingDropDown])
const sortAllProjects=useCallback(()=>{
    const currentSortingOption=sortingOptions.
    flatMap((category)=>category.options)
    .find((option)=>option.selected)
    if(!currentSortingOption) return allProjects;
      const selectedOption=currentSortingOption;
      return sortProjects(allProjects,selectedOption?.value);
},[allProjects,sortingOptions])

useEffect(()=>{
    const sortedProjects=sortAllProjects();
    if(JSON.stringify(sortedProjects)!==JSON.stringify(allProjects)){
        setAllProjects(sortedProjects)
    }
},[allProjects,sortingOptions,sortAllProjects])
    function handleOptionSelected(catgoryIndex:number,optionIndex:number){
        const updateSortingOptipns=sortingOptions.map((category,cIndex)=>({
            ...category,
            options:category.options.map((option,oIndex)=>({
                ...option,
                selected:cIndex===catgoryIndex && oIndex ===optionIndex,
            })),
        }));

           const selectedOption=updateSortingOptipns.
           flatMap((option)=>option.options)
        .find((option)=>option.selected);

        if(sideBarMenu[0].isSelected){
            const allSortedProjects=sortProjects(
                allProjects,
                selectedOption?.value
            );
            setAllProjects(allSortedProjects);
        }
        else if(sideBarMenu[1].isSelected){
            const sortedTasks=sortAllTasks(allTasks,selectedOption?.value);
            setallTasks(sortedTasks);
        }
        console.log(selectedOption);
        setSortingOptions(updateSortingOptipns);
        setOpenSortingDropDown(false);
        console.log("updated values",updateSortingOptipns);
    }
    useEffect(()=>{
        const currentSortingOption=sortingOptions.
        flatMap((category)=>category.options)
        .find((option)=>option.selected);
        const selectedOption=currentSortingOption;
        const sortedTasks=sortAllTasks(allTasks,selectedOption?.value);
        if(JSON.stringify(sortedTasks)!==JSON.stringify(allTasks)){
            setallTasks(sortedTasks);
        }
    },[allTasks])

    function sortAllTasks(
        allTasks:Task[],
        SelectionOptionValue:string|undefined
    ){
        const sortedTasks=[...allTasks];
        switch(SelectionOptionValue){
            case "asc":
                sortedTasks.sort((a,b)=>a.title.localeCompare(b.title));
                break;
            case "desc":
                sortedTasks.sort((a,b)=>b.title.localeCompare(a.title));
                break;
            case "newest":
                sortedTasks.sort(
                    (a,b)=>
                        new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()
                );
                break;
            case "oldest":
                sortedTasks.sort(
                    (a,b)=>
                        new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime()
                );
                break;
            default:
                return allTasks;
        }
        return sortedTasks;



    }

        return(
            
            <div 
            ref={dropDownRef}
            style={{
                top:`${sortingDropDownPositions.top}px`,
                left:`${sortingDropDownPositions.left}px`,
                width:`${sortingDropDownPositions.width}px`
            }}
            className={`bg-white text-sm top-[226px] right-60 z-[60] px-5 border-slate-50 fixed py-6 w-[160px] select-none shadow-md rounded-lg flex flex-col ${openSortingDropDown?"block":"hidden"}`}>
                {
                    sortingOptions.map((category,categoryIndex)=>(
                    <div key={categoryIndex} className="flex flex-col gap-1 text-slate-700 cursor-pointer">
                        <span className={`text-[13px] font-bold ${category.category=== "Date"?"mt-5":""}`}>
                            {category.category}
                        </span>
                        <div className="flex flex-col gap-2 ml-2 mt-[5px]">
                           {category.options.map((option,optionIndex)=>(
                            <div key={optionIndex}>
                               <span 
                               onClick={()=>handleOptionSelected(categoryIndex,optionIndex)}
                               className={`${
                                option.selected?"text-orange-600":"text-slate-500"
                               } cursor-pointer hover:text-orange-600`}>
                                 {option.label}
                               </span>
                            </div>
                           ))}
                        </div>

                    </div>
                    ))
                }

            </div>
        )
    
}