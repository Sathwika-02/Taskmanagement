"use client";
import React, {  useEffect, useRef } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt"
import BorderAllIcon from "@mui/icons-material/BorderAll"
import SplitscreenIcon from "@mui/icons-material/Splitscreen"
import LogoutIcon from "@mui/icons-material/Logout"
import { SvgIconProps } from "@mui/material/SvgIcon";
import { useContextApp } from "./Pages/ContextApp";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

// const { openSideBarObject: { openSideBar,setOpenSideBar }, sideBarMenuObject: { sideBarMenu ,setSideBarMenu} } = useContextApp();
function Sidebar(){
 const sideBarMenuRef=useRef<HTMLDivElement>(null);
 const {openSideBarObject:{openSideBar,setOpenSideBar},}=useContextApp();
 useEffect(()=>{
    function handleclickoutside(event:MouseEvent){
        if(sideBarMenuRef.current && !sideBarMenuRef.current.contains(event.target as Node)){
            setOpenSideBar(false)
        }
    }
    if(openSideBar){
        document.addEventListener("mousedown",handleclickoutside);
    }
    else{
        document.removeEventListener("mousedown",handleclickoutside);
    }
    return ()=>{
        document.removeEventListener("mousedown",handleclickoutside)
    }
 },[openSideBar,setOpenSideBar])
   return( 
    <div ref={sideBarMenuRef} className={`${
        openSideBar?"w-[280px] fixed shadow-xl":"w-[97px] max-[940px]:hidden"
    } h-screen py-10 bg-white flex flex-col items-center justify-between z-[90] transition-all`}>
<Logo/>
<Menu/>
<Profile/>
    </div>
   )
}
function Profile(){
  const { openSideBarObject: { openSideBar } } = useContextApp();
  const {user}=useUser();
  if(!user){
    return <div className="bg-orange-600 w-9 h-9 rounded-md"></div>
  }
  <Image
  alt=""
  className="rounded-md"
  src={user.imageUrl}
  width={33}
  height={33}
  />
  
   
   return(
<div className="flex items-center gap-2">

     <div className="w-7 h-7 bg-orange-600 rounded-md"></div>
     {openSideBar && (
        <ul>
            <li className="font-bold text-[14px]">{user.lastName}{user.firstName}</li>
            <li className="text-slate-400 text-[11px]">{user.primaryEmailAddress?.emailAddress}</li>
        </ul>
     )}
    </div>
   )
}

// function Logo(){
//     return(
//         <div>
//             <TaskAltIcon className="text-orange-600 font-bold" sx={{fontSize:"41px"}}/>
//         </div>
//     )
// }
function Logo(){
    const {openSideBarObject:{openSideBar},}=useContextApp()
    return(
        <div className="flex items-center gap-2 justify-center">
            <TaskAltIcon className="text-orange-600 fonct-bold" sx={{fontSize:"41px"}}/>

           {openSideBar && (
            <div className="text-xl flex items-center gap-1">
                <span className="font-bold">Project</span>
                <span className="text-slate-600"></span>
            </div>

           )}
        </div>
    )
}
function Menu(){
    const {openSideBarObject:{openSideBar},}=useContextApp();
const {sideBarMenuObject:{sideBarMenu,setSideBarMenu},}=useContextApp();
// const sideBarMenu = [
//     { id: 1, name: "All Tasks", isSelected: false },
//     { id: 2, name: "Split Screen", isSelected: false },
//     { id: 3, name: "Logout", isSelected: false },
//   ];
  
    const iconMap:Record<string,React.ComponentType<SvgIconProps>>={
        "1":BorderAllIcon,
        "2":SplitscreenIcon,
        "3":LogoutIcon
    };
    function handleClickedItem(id: number) {
        const updatedMenu = sideBarMenu.map((item) => ({
          ...item,
          isSelected: item.id === id, // Only the clicked item is selected
        }));
        setSideBarMenu(updatedMenu);
      }
    // return(
    //     <div className="flex flex-col gap-6">
    //     {sideBarMenu.map((menuItem)=>{
    //     const IconComponent=iconMap[menuItem.id.toString()];
    //     console.log("Icon comp",IconComponent);
    //     return(
    //         <div onClick={()=>{
    //             if(menuItem.id===1 || menuItem.id ===2){
    //                 handleClickedItem(menuItem.id);
    //             }
    //         }} key={menuItem.id}
    //         className="flex items-center gap-2 cursor-pointer"
    //         >
    //             <IconComponent sx={{fontSize:"25px"}}
    //             className={`${
    //                 menuItem.isSelected?"text-orange-600":"text-slate-300"
    //             }`} />

    //             {
    //                 openSideBar && (
    //                     <span className={`${menuItem.isSelected? "text-orange-600" :"text-slate-300"}`}>
    //                         {menuItem.name}

    //                     </span>
    //                 )
    //             }
    //         </div>
    //     )
    //  })}
    //     </div>
    //     // <div className="flex flex-col gap-6 items-center">
    //     //  <BorderAllIcon sx={{fontSize:"27px"}} className="text-orange-600 cursor-pointer"/>
    //     //  {openSideBar && <span className="text-slate-400">All Tasks</span>}
    //     //  <SplitscreenIcon sx={{fontSize:"25px"}} className="text-slate-300 cursor-pointer"/>
    //     //  {openSideBar && <span className="text-slate-400">All Tasks</span>}
    //     //  <LogoutIcon sx={{fontSize:"25px"}} className="text-slate-300 cursor-pointer"/>
    //     //  {openSideBar && <span className="text-slate-400">Logout</span>}
    //     // </div>
    // )

    return (
        <div className="flex flex-col gap-6">
          {sideBarMenu.map((menuItem) => {
            const IconComponent = iconMap[menuItem.id.toString()];
            return (
              <div
                onClick={() => handleClickedItem(menuItem.id)}
                key={menuItem.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <IconComponent
                  sx={{ fontSize: "25px" }}
                  className={`${
                    menuItem.isSelected ? "text-orange-600" : "text-slate-300"
                  }`}
                />
                {openSideBar && (
                  <span
                    className={`${
                      menuItem.isSelected ? "text-orange-600" : "text-slate-300"
                    }`}
                  >
                    {menuItem.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      );
}
export default Sidebar;

// "use client";
// import React from "react";
// import styled from "styled-components";
// import { useGlobalState } from "@/app/context/globalProvider";
// import Image from "next/image";

// import menu from "@/app/utils/menu"
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import Button from "./Button/Button";
// import { arrowLeft, bars, logout } from "@/app/utils/Icons";
// import { UserButton, useClerk, useUser } from "@clerk/nextjs";

// function SideBar() {
//   const { theme, collapsed, collapseMenu } = useGlobalState();
//   const { signOut } = useClerk();

//   const { user } = useUser();

//   const { firstName, lastName, imageUrl } = user || {
//     firstName: "",
//     lastName: "",
//     imageUrl: "",
//   };

//   const router = useRouter();
//   const pathname = usePathname();

//   const handleClick = (link: string) => {
//     router.push(link);
//   };

//   return (
//     <SidebarStyled theme={theme} collapsed={collapsed}>
//       <button className="toggle-nav" onClick={collapseMenu}>
//         {collapsed ? bars : arrowLeft}
//       </button>
//       <div className="profile">
//         <div className="profile-overlay"></div>
//         <div className="image">
//           <Image width={70} height={70} src={imageUrl} alt="profile" />
//         </div>
//         <div className="user-btn absolute z-20 top-0 w-full h-full">
//           <UserButton />
//         </div>
//         <h1 className="capitalize">
//           {firstName} {lastName}
//         </h1>
//       </div>
//       <ul className="nav-items">
//         {menu.map((item) => {
//           const link = item.link;
//           return (
//             <li
//               key={item.id}
//               className={`nav-item ${pathname === link ? "active" : ""}`}
//               onClick={() => {
//                 handleClick(link);
//               }}
//             >
//               {item.icon}
//               <Link href={link}>{item.title}</Link>
//             </li>
//           );
//         })}
//       </ul>
//       <div className="sign-out relative m-6">
//         <Button
//           name={"Sign Out"}
//           type={"submit"}
//           padding={"0.4rem 0.8rem"}
//           borderRad={"0.8rem"}
//           fw={"500"}
//           fs={"1.2rem"}
//           icon={logout}
//           click={() => {
//             signOut(() => router.push("/signin"));
//           }}
//         />
//       </div>
//     </SidebarStyled>
//   );
// }

// const SidebarStyled = styled.nav<{ collapsed: boolean }>`
//   position: relative;
//   width: ${(props) => props.theme.sidebarWidth};
//   background-color: ${(props) => props.theme.colorBg2};
//   border: 2px solid ${(props) => props.theme.borderColor2};
//   border-radius: 1rem;

//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;

//   color: ${(props) => props.theme.colorGrey3};

//   @media screen and (max-width: 768px) {
//     position: fixed;
//     height: calc(100vh - 2rem);
//     z-index: 100;

//     transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
//     transform: ${(props) =>
//       props.collapsed ? "translateX(-107%)" : "translateX(0)"};

//     .toggle-nav {
//       display: block !important;
//     }
//   }

//   .toggle-nav {
//     display: none;
//     padding: 0.8rem 0.9rem;
//     position: absolute;
//     right: -69px;
//     top: 1.8rem;

//     border-top-right-radius: 1rem;
//     border-bottom-right-radius: 1rem;

//     background-color: ${(props) => props.theme.colorBg2};
//     border-right: 2px solid ${(props) => props.theme.borderColor2};
//     border-top: 2px solid ${(props) => props.theme.borderColor2};
//     border-bottom: 2px solid ${(props) => props.theme.borderColor2};
//   }

//   .user-btn {
//     .cl-rootBox {
//       width: 100%;
//       height: 100%;

//       .cl-userButtonBox {
//         width: 100%;
//         height: 100%;

//         .cl-userButtonTrigger {
//           width: 100%;
//           height: 100%;
//           opacity: 0;
//         }
//       }
//     }
//   }

//   .profile {
//     margin: 1.5rem;
//     padding: 1rem 0.8rem;
//     position: relative;

//     border-radius: 1rem;
//     cursor: pointer;

//     font-weight: 500;
//     color: ${(props) => props.theme.colorGrey0};

//     display: flex;
//     align-items: center;

//     .profile-overlay {
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       backdrop-filter: blur(10px);
//       z-index: 0;
//       background: ${(props) => props.theme.colorBg3};
//       transition: all 0.55s linear;
//       border-radius: 1rem;
//       border: 2px solid ${(props) => props.theme.borderColor2};

//       opacity: 0.2;
//     }

//     h1 {
//       font-size: 1.2rem;
//       display: flex;
//       flex-direction: column;

//       line-height: 1.4rem;
//     }

//     .image,
//     h1 {
//       position: relative;
//       z-index: 1;
//     }

//     .image {
//       flex-shrink: 0;
//       display: inline-block;
//       overflow: hidden;
//       transition: all 0.5s ease;
//       border-radius: 100%;

//       width: 70px;
//       height: 70px;

//       img {
//         border-radius: 100%;
//         transition: all 0.5s ease;
//       }
//     }

//     > h1 {
//       margin-left: 0.8rem;
//       font-size: clamp(1.2rem, 4vw, 1.4rem);
//       line-height: 100%;
//     }

//     &:hover {
//       .profile-overlay {
//         opacity: 1;
//         border: 2px solid ${(props) => props.theme.borderColor2};
//       }

//       img {
//         transform: scale(1.1);
//       }
//     }
//   }

//   .nav-item {
//     position: relative;
//     padding: 0.8rem 1rem 0.9rem 2.1rem;
//     margin: 0.3rem 0;

//     display: grid;
//     grid-template-columns: 40px 1fr;
//     cursor: pointer;
//     align-items: center;

//     &::after {
//       position: absolute;
//       content: "";
//       left: 0;
//       top: 0;
//       width: 0;
//       height: 100%;
//       background-color: ${(props) => props.theme.activeNavLinkHover};
//       z-index: 1;
//       transition: all 0.3s ease-in-out;
//     }

//     &::before {
//       position: absolute;
//       content: "";
//       right: 0;
//       top: 0;
//       width: 0%;
//       height: 100%;
//       background-color: ${(props) => props.theme.colorGreenDark};

//       border-bottom-left-radius: 5px;
//       border-top-left-radius: 5px;
//     }

//     a {
//       font-weight: 500;
//       transition: all 0.3s ease-in-out;
//       z-index: 2;
//       line-height: 0;
//     }

//     i {
//       display: flex;
//       align-items: center;
//       color: ${(props) => props.theme.colorIcons};
//     }

//     &:hover {
//       &::after {
//         width: 100%;
//       }
//     }
//   }

//   .active {
//     background-color: ${(props) => props.theme.activeNavLink};

//     i,
//     a {
//       color: ${(props) => props.theme.colorIcons2};
//     }
//   }

//   .active::before {
//     width: 0.3rem;
//   }

//   > button {
//     margin: 1.5rem;
//   }
// `;

// export default SideBar;