"use client";
import React, { createContext,useContext,useEffect,useState } from "react";
import { allIconsArray } from "../Data/AllIcons";
import { Project, projectsData, Task } from "../Data/AllProjects";
type SideBarMenuItem={
 id:number,
 name:string,
 isSelected:boolean,
}
export interface IconData{
    id:number;
    name:string;
    icon:React.ReactNode;
    isSelected:boolean;
}
type SortingOption={
    category:string;
    options:{
        label:string;
        value:string;
        selected:boolean;
    }[];
};
type SortingDropDownPosition={
    left:number,
    top:number,
    width?:number;
}
type TabOption={
    id:number,
    name:string,
    isSelected:boolean,
}
type AppType={
    openSideBarObject:{
        openSideBar:boolean;
        setOpenSideBar:React.Dispatch<React.SetStateAction<boolean>>;
    }
    sideBarMenuObject:{
        sideBarMenu:SideBarMenuItem[];
        setSideBarMenu:React.Dispatch<React.SetStateAction<SideBarMenuItem[]>>;
    },
    openProjectWindowObject:{
        openProjectWindow:boolean,
        setOpenProjectWindow:React.Dispatch<React.SetStateAction<boolean>>;
    },
    allIconsDataObject:{
        allIconsData:IconData[],
        setAllIconsData:React.Dispatch<React.SetStateAction<IconData[]>>;
    },
    openIconWindowObject: {
        openIconWindow: boolean;
        setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
      };
      selectedIconObject: {
        selectedIcon: IconData | null;
        setSelectedIcon: React.Dispatch<React.SetStateAction<IconData | null>>;
      },
      allProjectsObject:{
        allProjects:Project[],
        setAllProjects:React.Dispatch<React.SetStateAction<Project[]>>},
        openDropDownObject:{
            openDropDown:boolean;
            setOpenDropDown:React.Dispatch<React.SetStateAction<boolean>>;
        },
        dropDownPositionsObject:{
            dropDownPositions: {
                top: number;
                left: number;
            };
            setDropDownPositions: React.Dispatch<
                React.SetStateAction<{ top: number; left: number }>
            >;
        },
        selectedProjectObject:{
            selectedProject:Project|null,
            setSelectedProject:React.Dispatch<React.SetStateAction<Project|null>>},
        openConfirmationWindowObject:{
            openConfirmationWindow:boolean,
            setOpenConfirmationWindow:React.Dispatch<React.SetStateAction<boolean>>;
        },
        sortingOptionsObject:{
            sortingOptions:SortingOption[],
            setSortingOptions:React.Dispatch<React.SetStateAction<SortingOption[]>>;
        },
        openSortingDropDownObject:{
            openSortingDropDown:boolean;
            setOpenSortingDropDown:React.Dispatch<React.SetStateAction<boolean>>;
        },
        sortingDropDownPositionsObject:{
            sortingDropDownPositions:SortingDropDownPosition,
            setSortingDropDownPositions:React.Dispatch<React.SetStateAction<SortingDropDownPosition>>,
        },
        chosenProjectObject:{
            chosenProject:Project|null;
            setChosenProject:React.Dispatch<React.SetStateAction<Project|null>>,
        },
        tabOptionsObject:{
            tabOptions:TabOption[],
            setTabOptions:React.Dispatch<React.SetStateAction<TabOption[]>>;
        },
        openProjectsDropDownObject:{
            openProjectsDropDown:boolean,
            setOpenProjectsDropDown:React.Dispatch<React.SetStateAction<boolean>>;
        },
        projectsDropDownPositionObject:{
            projectsDropDownPosition:SortingDropDownPosition;
            setProjectsDropDownPosition:React.Dispatch<React.SetStateAction<SortingDropDownPosition>>,
        },
        openTasksWindowObject:{
            openTasksWindow:boolean,
            setOpenTasksWindow:React.Dispatch<React.SetStateAction<boolean>>;
        },
        allTasksObject:{
            allTasks:Task[],
            setallTasks:React.Dispatch<React.SetStateAction<Task[]>>;
        },
        selectedTaskObject:{
            selectedTask:Task|null,
            setSelectedTask:React.Dispatch<React.SetStateAction<Task|null>>;
        },
        projectClickedObject:{
            projectClicked:Project|null,
            setProjectClicked:React.Dispatch<React.SetStateAction<Project|null>>;
        },
}

const defaultState:AppType={
    openSideBarObject: { openSideBar: false, setOpenSideBar: () => { } },
    sideBarMenuObject: { sideBarMenu: [], setSideBarMenu: () => { } },
    openProjectWindowObject: {
        openProjectWindow: false,
        setOpenProjectWindow: () => { },
    },
    allIconsDataObject: {
        allIconsData: [],
        setAllIconsData: ()=>{}
        
    },
    openIconWindowObject: {
        openIconWindow: false,
        setOpenIconWindow: () => {},
      },
      selectedIconObject: { selectedIcon: null, setSelectedIcon: () => {} },
      allProjectsObject:{allProjects:[],setAllProjects:()=>{}},
      openDropDownObject:{openDropDown:false,setOpenDropDown:()=>{}},
      dropDownPositionsObject: {
        dropDownPositions: { top: 0, left: 0 },
        setDropDownPositions: () => {},
    },
    selectedProjectObject:{
        selectedProject:null,
        setSelectedProject:()=>{},
    },
    openConfirmationWindowObject:{
        openConfirmationWindow:false,
        setOpenConfirmationWindow:()=>{},
        
    },
    sortingOptionsObject:{
        sortingOptions:[],
        setSortingOptions:()=>{},
    },
    openSortingDropDownObject:{
        openSortingDropDown:false,
        setOpenSortingDropDown:()=>{},
    },
    sortingDropDownPositionsObject:{
        sortingDropDownPositions:{top:0,left:0,width:0},
        setSortingDropDownPositions:()=>{},
    },
    chosenProjectObject:{
        chosenProject:null,
        setChosenProject:()=>{},
    },
    tabOptionsObject:{
        tabOptions:[],
        setTabOptions:()=>{},
    },
    openProjectsDropDownObject:{
        openProjectsDropDown:false,
        setOpenProjectsDropDown:()=>{},
    },
    projectsDropDownPositionObject:{
        projectsDropDownPosition:{top:0,left:0},
        setProjectsDropDownPosition:()=>{},
    },
    openTasksWindowObject:{
        openTasksWindow:false,
        setOpenTasksWindow:()=>{},
    },
    allTasksObject:{
        allTasks:[],
        setallTasks:()=>{},
    },
    selectedTaskObject:{
        selectedTask:null,
        setSelectedTask:()=>{},
    },
    projectClickedObject:{
        projectClicked:null,
        setProjectClicked:()=>{},

    }

};
const ContextApp=createContext<AppType>(defaultState);

export default function ContextAppProvider({
    children,
    
}:{
    children:React.ReactNode;
}){
    const [openSideBar,setOpenSideBar]=useState(false);
    const [isMobileview,setIsMobileView]=useState(false);
    const [sideBarMenu,setSideBarMenu]=useState<SideBarMenuItem[]>([
        {
            id:1,
            name:"All Projects",
            isSelected:true,
        },
        {
            id:2,
            name:"All Tasks",
            isSelected:false,
        },
        {
            id:3,
            name:"Logout",
            isSelected:false,
        }
    ]);
    const [allIconsData,setAllIconsData]=useState<IconData[]>(allIconsArray);
    const [openProjectWindow,setOpenProjectWindow]=useState(false);
    const [openIconWindow, setOpenIconWindow] = useState(false); // Added state

  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);
  const [allProjects,setAllProjects]=useState<Project[]>([]);
  const[openDropDown,setOpenDropDown]=useState(false);
  const [dropDownPositions,setDropDownPositions]=useState({
   top:0,left:0
  })
  const [selectedProject,setSelectedProject]=useState<Project|null>(null);
  const[openConfirmationWindow,setOpenConfirmationWindow]=useState<boolean>(false);

  const [sortingOptions,setSortingOptions]=useState([
    {
        category:"Order",
        options:[
            {label:"A-Z",value:"asc",selected:true},
            {label:"Z-A",value:"desc",selected:false},
        ]
    },
    {
        category:"Date",
        options:[
            {label:"Newest",value:"newest",selected:false},
            {label:"Oldest",value:"oldest",selected:false},
        ]
    }
  ])

  const [openSortingDropDown,setOpenSortingDropDown]=useState(false);
  const[sortingDropDownPositions,setSortingDropDownPositions]=useState({
    top:0,
    left:0
  });
  const [chosenProject,setChosenProject]=useState<Project|null>(null);
  const [tabOptions,setTabOptions]=useState<TabOption[]>([
    {id:1,name:"On Going Tasks",isSelected:true},
    {id:2,name:"Completed Tasks",isSelected:false},
  ]);

  const [openProjectsDropDown,setOpenProjectsDropDown]=useState(false);
  const [projectsDropDownPosition,setProjectsDropDownPosition]=useState({
    top:0,
    left:0
  })
  const[openTasksWindow,setOpenTasksWindow]=useState(false);
  const[allTasks,setallTasks]=useState<Task[]>([]);
  const[selectedTask,setSelectedTask]=useState<Task|null>(null);
  const[projectClicked,setProjectClicked]=useState<Project|null>(null);
    useEffect(()=>{
        setOpenSideBar(false);
    },[sideBarMenu])
    useEffect(()=>{
        function handleResize(){
            setIsMobileView(window.innerWidth<=940);
        }
        handleResize();
        window.addEventListener("resize",handleResize);
        return()=>{
            window.removeEventListener("resize",handleResize)
        }
    },[])
    useEffect(()=>{
        const fetchData=async()=>{
 try{
    await new Promise((resolve)=>setTimeout(resolve,1000));
    const extractAllTasks=projectsData.flatMap(
        (project)=>project.tasks
    )
    setAllProjects(projectsData);
    setallTasks(extractAllTasks);
 }catch(error){
    console.log(error);
 }
        }
        fetchData();
    },[]);
      useEffect(()=>{
        if(!isMobileview){
            setOpenSideBar(false)
        }
      },[isMobileview])

    return(
        
        <ContextApp.Provider value={{
            openSideBarObject: { openSideBar, setOpenSideBar },
            sideBarMenuObject: { sideBarMenu, setSideBarMenu },
            openProjectWindowObject:{openProjectWindow,setOpenProjectWindow},
            allIconsDataObject:{allIconsData,setAllIconsData},
            openIconWindowObject:{openIconWindow,setOpenIconWindow},
            selectedIconObject:{selectedIcon,setSelectedIcon},
           allProjectsObject:{allProjects,setAllProjects},
           openDropDownObject:{openDropDown,setOpenDropDown},
           dropDownPositionsObject:{
            dropDownPositions,
            setDropDownPositions,
        },
        selectedProjectObject:{selectedProject,setSelectedProject },
        openConfirmationWindowObject:{openConfirmationWindow,setOpenConfirmationWindow},
        sortingOptionsObject:{sortingOptions,setSortingOptions},
        sortingDropDownPositionsObject:{sortingDropDownPositions,setSortingDropDownPositions},
        openSortingDropDownObject:{openSortingDropDown,setOpenSortingDropDown},
        chosenProjectObject:{chosenProject,setChosenProject},
        tabOptionsObject:{tabOptions,setTabOptions},
        openProjectsDropDownObject:{openProjectsDropDown,setOpenProjectsDropDown},
        projectsDropDownPositionObject:{projectsDropDownPosition,setProjectsDropDownPosition},
        openTasksWindowObject:{openTasksWindow,setOpenTasksWindow},
        allTasksObject:{allTasks,setallTasks},
        selectedTaskObject:{selectedTask,setSelectedTask},
        projectClickedObject:{projectClicked,setProjectClicked}

          }}>
            {children}
        </ContextApp.Provider>
    )
}
export function useContextApp(){
    return useContext(ContextApp);
}