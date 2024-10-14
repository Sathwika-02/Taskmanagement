import React from "react";
import { HeaderTask } from "./Components/HeaderTask";
import { HeaderTaskSubhead } from "./Components/HeaderTaskSubHead";
import { TaskList } from "./Components/TaskList";
export function AllTaskhead(){
    return(
        <div className="bg-slate-50 w-full p-10">
            <HeaderTask/>
            <HeaderTaskSubhead/>
            <TaskList/>
        </div>
    )
}