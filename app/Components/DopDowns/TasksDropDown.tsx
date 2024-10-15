// import { useEffect, useRef } from "react";
// import { useTaskFormContext } from "../Windows/TasksWindow";
// import PriorityListComponent from "./TasksDropDown/PriorityListComponent";
// import ProjectsListComponent from "./TasksDropDown/ProjectsListComponent";

// export default function TasksDropDown(){
//     const {
//         clickedSelection,
//         tasksDropDownPositions,
//         setOpenTasksDropDown,
//         openTasksDropDown,
//     } = useTaskFormContext();
   
//     const menuRef = useRef<HTMLDivElement>(null);

//     // Close dropdown if clicked outside
//     useEffect(() => {
//         function handleClickOutside(event: MouseEvent) {
//             if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//                 setOpenTasksDropDown(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [menuRef, setOpenTasksDropDown]);

//     // Update dropdown positions
//     const updatedLeftPos = tasksDropDownPositions.left || "auto";
//     const updatedRightPos = tasksDropDownPositions.width || "auto";
//     const dropDownToggle = openTasksDropDown ? "block" : "hidden";
   
//     return(
// <div ref={menuRef}
// style={{
//     left:clickedSelection==="priority"?updatedLeftPos:"auto",
//     right:clickedSelection ==="priority"?"auto":updatedRightPos,
//     top:tasksDropDownPositions.top-49,
//     width:tasksDropDownPositions.width,
// }}
// className={`${dropDownToggle} bg-white absolute p-3 z-[90] border
// border-slate-50 select-none shadow-md rounded-lg flex flex-col gap-2`}
// >
//     {clickedSelection ==="priority"?(
//         <PriorityListComponent/>
//     ):
//     (
//         <ProjectsListComponent/>
//     )}

// </div>
//     )
// }

import { useEffect, useRef } from "react";
import { useTaskFormContext } from "../Windows/TasksWindow"; // Adjust the import path as necessary
import PriorityListComponent from "./TasksDropDown/PriorityListComponent";
import ProjectsListComponent from "./TasksDropDown/ProjectsListComponent";

export default function TasksDropDown() {
    const {
        clickedSelection,
        tasksDropDownPositions,
        setOpenTasksDropDown,
        openTasksDropDown,
    } = useTaskFormContext();

    const menuRef = useRef<HTMLDivElement>(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenTasksDropDown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef, setOpenTasksDropDown]);

    // Update dropdown positions
 
    const updatedLeftPos = tasksDropDownPositions.left || 0; // Default to 0 if undefined
    const updatedTopPos = tasksDropDownPositions.top || 0; // Default to 0 if undefined
    const dropDownToggle = openTasksDropDown ? "block" : "hidden";

    return (
        <div
            ref={menuRef}
            style={{
                right: clickedSelection === "priority" ? `${updatedLeftPos-75}px` : "auto",
                left: clickedSelection !== "priority" ? `${updatedLeftPos-405}px` : "auto", // Update right for non-priority
                top: `${updatedTopPos -50}px`, // Adjust the top position
                width: `${tasksDropDownPositions.width}px`,
            }}
            className={`${dropDownToggle} bg-white absolute p-3 z-[90] border border-slate-50 select-none shadow-md rounded-lg flex flex-col gap-2`}
        >
            {clickedSelection === "priority" ? (
                <PriorityListComponent />
            ) : (
                <ProjectsListComponent />
            )}
        </div>
    );
}
