// "use client"
// import React from "react";
// import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
// import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
// import ListAltIcon from "@mui/icons-material/ListAlt";
// import Link from "next/link";
// import Image from "next/image";
// import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import SortRoundedIcon from "@mui/icons-material/SortRounded"
// import { Description } from "@mui/icons-material";
// // import { useAuth } from "@clerk/nextjs";
// export default function Page(){
//     return(
//         <div className="poppins">
//         <Navbar/>
//         <CTASection/>
//         <Features/>
//         </div>
//     )
// }
// function Features(){
//     const features=[
//         {
//             id:4,
//             name:"Seamless Project and Task Management",
//             icon:<ListAltRoundedIcon  className="text-orange-600 text-[32px]"/>,
//             description:`Create,edit, and delete projects with ease.Use sorting,filtering and tabs to keep your workspace organized.`
       
//         },
//         {
//             id:5,
//             name:"Dynamic Interface with Responsive Design",
//             icon:<DevicesRoundedIcon className="text-orange-600 text-[32px]"/>,
//             description:`Navigate through a responsive dashboard and task pages that adapt to any screen
//             size.Open and close sidebars,dropdowns,and menus intuitively,enhancing your producivity.`
//         },
//         {
//             id:6,
//             name:"Advanced Task sorting and Progress Tracking",
//             icon:<SortRoundedIcon className="text-orange-600 text-[32px]"/>,
//             description:`Track ongoing and completed tasks,switch between tabs and sort tasks or projects based on status,priority or date to stay on top of your workload.`
//         }
//     ]
//     return(
//         <section className="py-12 bg-slate-50 mt-12 px-9">
//           <div className="mx-auto px-4">
//      <h2 className="text-2xl font-bold text-center">Key features

//      </h2>
//      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
// {
//     features.map((feature,index)=>(
//         <div key={index}
//         className="p-6 bg-white rounded-lg shadow-sm flex flex-col items-center"
//         >
//             <div className="w-20 h-20 rounded-full items-center justify-center flex bg-orange-100">
// {feature.icon}
//             </div>
//             <h3 className="text-lg font-semibold text-orange-600 mt-6 text-center">
//             {feature.name}
//             </h3>
//             <p className="text-slate-600 text-[13px] mt-2 text-center w-[80%]">
// {feature.description}
//             </p>

//         </div>
//     ))
// }
//      </div>
//           </div>
//         </section>
//     )
// }
// function Navbar(){
//     return(
//         <nav className="flex m-7 p-2 max-sm:mt-9 mx-8 items-center justify-between max-sm:flex-col">
//          <Logo/>
//          <Buttons/>
//         </nav>
//     )
// }
// function Logo(){
//     return(
//         <div className="flex gap-2 items-center">
//             <TaskAltIcon sx={{fontSize:34}} className="text-orange-600"/>
//             <div className="flex gap-1 text-[22px]">
//         <span className={`font-bold text-orange-600`}>
//             Project
//         </span>
//         <span className="text-slate-600">Master</span>
//             </div> 
//         </div>
//     )
// }
// function Buttons(){
//     // const {userId}=useAuth();
//     return(
//         <div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
        
//         <Link href="/dashboard">
//           <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition">
//             Dashboard
//           </button>
//         </Link>
      
//         </div>
//     )

    
//     // const {userId}=useAuth();
//     // return(
//     //     <div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
//     //         {!userId?(
//     //             <>
//     //             <Link href="/sign-in">
//     //             </Link>
//     //             </>
//     //            )
            

//     //     </div>
    
// }
// function CTASection(){
//     return(
//         <div className="flex flex-col mx-16 items-center mt-[120px] gap-6">
//             <h2 className="font-bold text-2xl text-center">
// Manage Your Projects and Tasks 
// <span className={`text-orange-600`}> Effortlessly!</span>
//             </h2>
//             <p className="text-center text-[15px] w-[510px] max-sm:w-full text-slate-500">
//         Take full control of your projects today-start adding tasks,sorting your priorities,and tracking progress with ease. Stay organized and boost your producitviy effortlessly!
//             </p>

//             <button
//             className={`block bg-orange-600 rounded-md px-9 py-3 text-sm font-medium text-white hover:bg-orange-600`}
//             type="button"
//             >
//                 {`Let's get started!`}

//             </button>
//             <Image
//             src="/app.png"
//             alt="dashboard"
//             width={900}
//             height={400}
//             className="shadow-xl mt-9 aspect-auto sm:w-auto w-[398px] rounded-lg max-w-full"
//             />

//         </div>
//     )
// }

"use client"; 
import Sidebar from "./Components/Sidebar";
// import AllTasks from "./Pages/AllTasks/Components/AllTasks"
import AllProjects from "./Components/Pages/Projects/Components/AllProjects";
import { useContextApp } from "./Components/Pages/ContextApp";
import { AllTaskhead } from "./Components/Pages/Tasks/AllTaskhead";
import { ProjectWindow } from "./Components/Windows/ProjectWindow";
import MoreDropDown from "./Components/DopDowns/MoreDropDown";
import { ConfirmationWindow } from "./Components/Windows/ConfirmationWindow";
import { Toaster } from "react-hot-toast";
import { SortingDropDown } from "./Components/DopDowns/SortingDropDown";
import ProjectsDropDown from "./Components/DopDowns/ProjectsDropDown";
import TasksDropDown from "./Components/DopDowns/TasksDropDown";
import { TasksWindow } from "./Components/Windows/TasksWindow";
// const {openSideBarObject:{openSideBar,setOpenSideBar},}=useContextApp();
// const {sideBarMenuObject:{sideBarMenu,setSideBarMenu},}=useContextApp();
export default function Home() {
  const {
    openSideBarObject:{openSideBar},
    sideBarMenuObject:{sideBarMenu},}=useContextApp();
    const{
      openProjectWindowObject:{openProjectWindow},
      openConfirmationWindowObject:{openConfirmationWindow}
    }=useContextApp();
    console.log(useContextApp);
    const componentMap:Record<number,React.ReactNode>={
      1:<AllProjects/>,
      2:<AllTaskhead/>,
    }
    const componentKey=sideBarMenu.findIndex((item)=>item.isSelected);
    const SelectedComponent=componentMap[componentKey+1]|| null;
  return (
    <div className="flex w-full h-screen poppins">
      <TasksDropDown/>
      <ProjectsDropDown/>
      <ConfirmationWindow/>
      <MoreDropDown/>
      {/* <IconsWindow/> */}
      <Toaster/>
      <ProjectWindow/>
      <TasksWindow/>
      <SortingDropDown/>
      
      
       

       {(openSideBar  || openProjectWindow || openConfirmationWindow) && 
        (
          <div className={`w-full h-full ${openProjectWindow || openConfirmationWindow ?"z-[70]":"z-[50]"} z-50 bg-slate-800 fixed opacity-30`}></div>
        )
      }
      <Sidebar/>
      {SelectedComponent && SelectedComponent}
    
      
    </div>
  );
}