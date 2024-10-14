import React, { useRef } from "react";
import KeyBoardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useContextApp } from "../../ContextApp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"


export default function ProjectsSubHeader(){
//     const{
//         openSortingDropDownObject:{setOpenSortingDropDown},
//         sortingDropDownPositionsObject:{setSortingDropDownPositions},
//     }=useContextApp();
//     const sortingLinkRef=useRef<HTMLDivElement>(null);
//     function clickedSortingLink(){
//         if(sortingLinkRef.current){
//             const rect=sortingLinkRef.current.getBoundingClientRect();
//             const {top,left,width}=rect;
//             setSortingDropDownPositions({
//                 top:top+window.scrollY+30,
//                 left:left+window.scrollX,
//                 width:width,
//             })
//         }
//         setOpenSortingDropDown(true);
//     }
// return(
//     <div className="flex text-[15px] max-sm:text-[14px] font-semibold gap-3 max-sm:gap-1">
//     <span className="text-slate-300">Sort By</span>
//     <div
//     ref={sortingLinkRef}
//     onClick={clickedSortingLink}
//     className="flex gap-1 items-center cursor-pointer text-slate-800 hover:text-orange-600"
//     >
//         <span className="">
//            Recent Project
//         </span>
//         <KeyBoardArrowDownIcon sx={{fontSize:"19px"}}/>

//     </div>
//     </div>
return(
    <div className="mt-20 flex justify-between font-bold items-center border">
        <MyTaskText/>
        <SortByButton/>
    </div>
)


function MyTaskText(){
    return <p className="text-[26px] font-bold">My Tasks</p>
}
function SortByButton(){
    const{
        openSortingDropDownObject:{openSortingDropDown,setOpenSortingDropDown},
        sortingDropDownPositionsObject:{setSortingDropDownPositions},
        sortingOptionsObject:{sortingOptions},
    }=useContextApp();
    const sortingLinkRef=useRef<HTMLDivElement>(null);
    function clickedSortingLink(){
        if(sortingLinkRef.current){
            const rect=sortingLinkRef.current.getBoundingClientRect();
            const {top,left,width}=rect;
            setSortingDropDownPositions({
                top:top+window.scrollY+30,
                left:left+window.scrollX,
                width:width,
            })
        }
        setOpenSortingDropDown(true);
    }
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

return(
    <div className="flex text-[15px] max-sm:text-[14px] font-semibold gap-3 max-sm:gap-1">
    <span className="text-slate-300">Sort By</span>
    <div
    ref={sortingLinkRef}
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
}