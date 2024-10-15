"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useContextApp } from "../Pages/ContextApp";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import {
    useForm,
    SubmitHandler,
    UseFormRegister,
    FieldErrors,
} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import { getIconComponent } from "../functions/IconActions";
import { addNewProject, editProject } from "../functions/projectsActions";
import toast from "react-hot-toast";
import { allIconsArray } from "../Data/AllIcons";
import { Project } from "../Data/AllProjects";
export type ProjectFormData = {
    projectName: string;
};
 const schema=z.object({
    projectName:z.string()
    .min(1,{message:"Project Name is required"})
    .max(30,{message:"Project Name must be 30 characters or less"})
 })
//  type FormData=z.infer<typeof schema>;

export function ProjectWindow(){
   
    const{
        openProjectWindowObject:{openProjectWindow,setOpenProjectWindow},
    }=useContextApp();
    
    const {
        allProjectsObject:{allProjects,setAllProjects},}=useContextApp();
        const{
            selectedIconObject:{selectedIcon,setSelectedIcon},
            selectedProjectObject:{selectedProject,setSelectedProject},
            chosenProjectObject:{chosenProject,setChosenProject},
        }=useContextApp();
        const [isLoading,setIsLoading]=useState(false);
       
    const{
        register,
        handleSubmit,
        setValue,
        formState:{errors},
        setError,
        setFocus,
        reset
    }=useForm<ProjectFormData>({
        resolver:zodResolver(schema),
    })
    const onSubmit:SubmitHandler<ProjectFormData>=(data:ProjectFormData)=>{
        console.log(data);
       
        const existingProject=allProjects.find(
            (project)=>{
                console.log("project",project);
                return project.title.toLowerCase()===data.projectName.toLowerCase();
            }
        )
        if(existingProject && !selectedProject){
           setError("projectName",{
            type:"manual",
            message:"Project Already exists"
           });
           setFocus("projectName");
           return;
        }
        else{
           ProjectsFunction(data);
        }
        console.log("Form submitted with data",data);
        handleClose();

    }
    async function ProjectsFunction(data:ProjectFormData){
        console.log("Form data",data);
        try{
             setIsLoading(true);
             await new Promise((resolve)=>setTimeout(resolve,1000));
             if(!selectedProject){ 
             addNewProject(
                data,
                allProjects,
                setAllProjects,
                setOpenProjectWindow,
                selectedIcon,
                reset
             );
            }
            else{
                editProject(selectedProject,
                    setSelectedProject,
                    data,
                    selectedIcon,
                    allProjects,
                    setAllProjects,
                    setOpenProjectWindow
                )
            }
        }
        catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
        finally{
            setIsLoading(false);
            if(selectedProject && chosenProject){
                if(chosenProject.id ===selectedProject.id){
                    const updateChosenProject:Project={
                        ...chosenProject,
                        title:data.projectName,
                    };
                    setChosenProject(updateChosenProject);
                }
            }
            toast.success(`Project ${selectedProject?"edited":"added"} successfully`)
            // toast.success("Project added successfully")
        }
    }
    const handleClose=()=>{
        console.log("closing window and resetting form");
        setOpenProjectWindow(false);
        reset();
    }
    useLayoutEffect(()=>{
        if(openProjectWindow){
            if(!selectedProject){
                reset();
            }
            else{
                setValue("projectName",selectedProject.title);
                const findIconInAllIconsArray=allIconsArray.find(
                    (icon)=>icon.name===selectedProject.icon
                );
                if(findIconInAllIconsArray){
                    setSelectedIcon(findIconInAllIconsArray);
                }
            }
            // console.log("window opened,resetting form");
            // reset();
        }
    },[openProjectWindow,reset])
    console.log("project window rendered",openProjectWindow)
    return(
    <div className={`${
        openProjectWindow?"block":"hidden"
    } w-[48%] max-sm:w-[82%] max-[600px]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2
    absolute flex flex-col gap-3 border border-slate-50 bg-white rounded-lg shadow-md 
    `}>

<Header handleClose={handleClose}/>
<form onSubmit={handleSubmit(onSubmit)}
className="flex flex-col gap-2 pt-8 px-7 mt-3"
>
    <ProjectInput register={register} errors={errors}/>
    <Footer handleClose={handleClose}/>
</form>
    </div>
    )
    function Header({handleClose}:{handleClose:()=>void}){
        const{
            openProjectWindowObject:{setOpenProjectWindow},
        }=useContextApp();
        const{
            selectedIconObject:{setSelectedIcon},
            selectedProjectObject:{selectedProject,setSelectedProject}
        }=useContextApp();
        return(
            <div className="flex justify-between items-center pt-7 px-7">
                <div className="flex items-center gap-2">
                    <div className="p-[7px] bg-orange-200 rounded-lg flex items-centr justify-center">
                        <BorderAllIcon sx={{fontSize:"21px"}}
                        className="text-orange-600"
                        onClick={()=>setOpenProjectWindow(false)}
                        />

                    </div>
                    <span className="font-semibold text-lg">{selectedProject?"Edit Project" :"New Project"}</span>

                </div>
                <CloseOutlinedIcon
                sx={{fontSize:"18px"}}
                className="text-slate-300 cursor-pointer"
                onClick={()=>{
                    handleClose();
                    setSelectedProject(null);
                    setSelectedIcon(null);
                }}
                />

            </div>

        )
    }
    function ProjectInput({
        register,
        errors
    }:{
        register:UseFormRegister<ProjectFormData>;
        errors:FieldErrors<ProjectFormData>
    }){
        const {
            openProjectWindowObject:{openProjectWindow},
        }=useContextApp();
        const{
            selectedIconObject:{selectedIcon},
        }=useContextApp();
        const {
            openIconWindowObject:{ setOpenIconWindow},
            }=useContextApp();
        
        useEffect(()=>{
            if(openProjectWindow){
                const inputElement=document.querySelector<HTMLInputElement>(
                    'input[name="projectName"]'
                );
                if(inputElement){
                    inputElement.focus();
                }
            }
        },[openProjectWindow])

        return(
            <div className="flex flex-col gap-2">
           <span className="text-[14px] font-medium text-slate-600">Project Name</span>
           <div className="flex gap-3 justify-between">
           <div className="w-full">
             <input 
             {...register("projectName")}
             placeholder="Enter Project Name..."
             className="p-[10px] text-[13px] w-full rounded-md border outline-none"/>
             {errors.projectName && (
                <p className="text-[11px] mt-2 text-red-500">{errors.projectName.message}</p>
             )}
             
           </div>

           <div onClick={()=>{
            setOpenIconWindow(true);
            console.log("projec icon is opend")
           }}
           className="w-12 h-10 text-white flex items-center justify-center bg-orange-600 rounded-lg cursor-pointer">
            {
                selectedIcon ?(
                    getIconComponent(selectedIcon?.name,"text-white")
                ):(
<LibraryBooksIcon/>
                
            )}
            

           </div>
           </div>
            </div>
        )
    }
    function Footer({handleClose}:{handleClose:()=>void}){
        // const{
        //     openProjectWindowObject:{openProjectWindow,setOpenProjectWindow},
        // }=useContextApp();
        const{
            selectedIconObject:{setSelectedIcon},
            selectedProjectObject:{selectedProject,setSelectedProject},
        }=useContextApp();
        return(
            <div className="w-[102%] p-[12px] mt-8 mb-4 flex gap-3 justify-end items-center">
                <button
                onClick={()=>{handleClose();
                    setSelectedIcon(null);
                    setSelectedProject(null);
                }}
                className="border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md hover:border-slate-300 transition-all"
                >Cancel</button>

                <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white text-[13px] p-2 px-4 rounded-md transition-all">
                    {
                        isLoading?"Saving...":selectedProject?"Edit Project":"Add Project"
                    }
                </button>

            </div>
        )
    }
}
