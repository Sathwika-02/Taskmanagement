import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete"
import { useContextApp } from "../Pages/ContextApp";
function MoreDropDown(){
   const{
    openDropDownObject:{openDropDown,setOpenDropDown},
  dropDownPositionsObject:{dropDownPositions},
  openConfirmationWindowObject:{setOpenConfirmationWindow},
  openProjectWindowObject:{setOpenProjectWindow},
}=useContextApp();
   
    const [dropDownOptions]=useState([
        {id:1,name:"Edit",icon:<EditOutlinedIcon/>},
        {id:2,name:"Delete",icon:<DeleteIcon/>},
    ]);
    useEffect(() => {
       // Check if this is true
    }, [openDropDown]);
    
    const menuRef=React.useRef<HTMLDivElement>(null);
    function clickedItemHandler(id:number){
        if(id===1){
           setOpenProjectWindow(true);
        }
        if(id===2){
            setOpenConfirmationWindow(true);
           
        }
        setOpenDropDown(false);
    }
    useEffect(()=>{
        function handleclickOutside(event:MouseEvent){
            if(menuRef.current && !menuRef.current.contains(event.target as Node)){
    setOpenDropDown(false);
            }
        }
        if(openDropDown){
            document.addEventListener("mousedown",handleclickOutside);
            // document.body.style.overflow="hidden"
        }
        else{
            document.removeEventListener("mousedown",handleclickOutside);
            // document.body.style.overflow="";
        }
        return()=>{
            document.removeEventListener("mousedown",handleclickOutside);
            // document.body.style.overflow="";
        }
    },[openDropDown,setOpenDropDown]);
    return(
        <div
        ref={menuRef}
        style={{ top: dropDownPositions.top, left: dropDownPositions.left }}
        className={`bg-white fixed z-[100] top-14 left-24 px-5 border-slate-50 py-6 w-[130px] select-none shadow-md rounded-lg flex flex-col gap-7 ${
            openDropDown===true ? "block" : "hidden"
        }`} >
  {dropDownOptions.map((dropdownOption) => (
            <div
                key={dropdownOption.id}
                onClick={()=>clickedItemHandler(dropdownOption.id)}
                className={`flex gap-1 items-center text-slate-400 cursor-pointer hover:text-orange-600 ${
                    dropdownOption.id === 2 && "hover:text-red-600"
                }`}
            >
                {dropdownOption.icon}
                <span className="text-[14px]">{dropdownOption.name}</span>
            </div>
        ))}

        </div>
    )
}
export default MoreDropDown;