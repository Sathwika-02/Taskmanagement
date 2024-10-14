// "use client"; 
// import Sidebar from "../Components/Sidebar";
// // import AllTasks from "./Pages/AllTasks/Components/AllTasks"
// import AllProjects from "../Components/Pages/Projects/Components/AllProjects";
// import { useContextApp } from "../Components/Pages/ContextApp";
// import { AllTaskhead } from "../Components/Pages/Tasks/AllTaskhead";
// import { AllProjectsSection } from "../Components/Pages/Projects/Components/AllProjectsSection";
// import { ProjectWindow } from "../Components/Windows/ProjectWindow";
// import IconsWindow from "../Components/Windows/IconWindow";
// import MoreDropDown from "../Components/DopDowns/MoreDropDown";
// import { ConfirmationNumber } from "@mui/icons-material";
// import { ConfirmationWindow } from "../Components/Windows/ConfirmationWindow";
// import { Toaster } from "react-hot-toast";
// import { SortingDropDown } from "../Components/DopDowns/SortingDropDown";
// import ProjectsDropDown from "../Components/DopDowns/ProjectsDropDown";
// import TasksDropDown from "../Components/DopDowns/TasksDropDown";
// import { TasksWindow } from "../Components/Windows/TasksWindow";
// // const {openSideBarObject:{openSideBar,setOpenSideBar},}=useContextApp();
// // const {sideBarMenuObject:{sideBarMenu,setSideBarMenu},}=useContextApp();
// export default function Home() {
//   const {
//     openSideBarObject:{openSideBar,setOpenSideBar},
//     sideBarMenuObject:{sideBarMenu,setSideBarMenu},}=useContextApp();
//     const{
//       openProjectWindowObject:{openProjectWindow,setOpenProjectWindow},
//       openConfirmationWindowObject:{openConfirmationWindow,setOpenConfirmationWindow}
//     }=useContextApp();
//     console.log(useContextApp);
//     const componentMap:Record<number,React.ReactNode>={
//       1:<AllProjects/>,
//       2:<AllTaskhead/>,
//     }
//     const componentKey=sideBarMenu.findIndex((item)=>item.isSelected);
//     const SelectedComponent=componentMap[componentKey+1]|| null;
//   return (
//     <div className="flex w-full h-screen poppins">
//       <TasksDropDown/>
//       <ProjectsDropDown/>
//       <ConfirmationWindow/>
//       <MoreDropDown/>
//       {/* <IconsWindow/> */}
//       <Toaster/>
//       <ProjectWindow/>
//       <TasksWindow/>
//       <SortingDropDown/>
      
      
       

//        {(openSideBar  || openProjectWindow || openConfirmationWindow) && 
//         (
//           <div className={`w-full h-full ${openProjectWindow || openConfirmationWindow ?"z-[70]":"z-[50]"} z-50 bg-slate-800 fixed opacity-30`}></div>
//         )
//       }
//       <Sidebar/>
//       {SelectedComponent && SelectedComponent}
    
      
//     </div>
//   );
// }