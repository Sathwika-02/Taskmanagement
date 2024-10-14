import React, { useMemo } from "react";
import { CircularProgressbar,buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Project } from "@/app/Components/Data/AllProjects";
import { Splitscreen } from "@mui/icons-material"
import { useContextApp } from "../../ContextApp";


export function StatsRightSideBar(){
    const{
        allProjectsObject:{allProjects},}=useContextApp();
        const {completedProjects,completedTasks,completionPercentage}=
        useMemo(()=>{
            const completedProjects:Project[]=[];
            // let totalTasks=0;
            let completedTasks=0;
            allProjects.forEach((project)=>{
                // const projectcomplted=project.tasks.every(
                //     (task)=>task.status==="Completed"
                // );
                // if(projectcomplted) completedProjects.push(project);
                // project.tasks.forEach((task)=>{
                //     totalTasks++;
                //     if(task.status==="Completed") completedTasks++;
                // })
                if (project.tasks.length > 0) {
                    const projectCompleted = project.tasks.every(
                        (task) => task.status === "Completed"
                    );
                    if (projectCompleted) completedProjects.push(project);
                }
                project.tasks.forEach((task) => {
                    // totalTasks++;
                    if (task.status === "Completed") completedTasks++;
                });
        
            })
            const percentage=
            completedProjects.length>0?Math.round((completedProjects.length/allProjects.length)*100):0;
            return{
                completedProjects:completedProjects,
                completedTasks,
                completionPercentage:percentage,
            }
        },[allProjects])
    
    return(
        <div className="w-[22%] flex justify-end items-center">
            
             <div className="h-[92%] w-[94%] bg-white rounded-l-3xl p-3 flex flex-col">
                <Header/>
                <div className="flex flex-col gap-11 items-center justify-center mt-6">
                    <CircleChart percentage={completionPercentage}/>
                    <ProjectsCompletedLabels completedProjects={completedProjects} completedTasks={completedTasks}/>
                </div>
                <ProjectList  completedProjects={completedProjects}/>
             </div>
        </div>
    )
    function Header(){
        return(
            <div className="text-[22px] font-bold text-center mt-7">
                Projects Completed
            </div>
        )
    }
    function CircleChart({percentage}:{percentage:number}){
        return(
            // <div className="flex justify-center items-center border">
            //     <div className="w-40 h-40 bg-slate-100 mt-5 rounded-full flex items-center justify-center">
            //         <div className="w-[86%] flex justify-center items-center h-[86%] bg-white rounded-full">
            //             <span className="text-xl font-semibold text-orange-600">90%</span>
            //         </div>
            //     </div>
            // </div>
            <div className="w-40 h-40 mt-7 mb-1">
         <CircularProgressbar
         value={percentage}
         text={`${percentage}%`}
         styles={buildStyles({
            textSize:"16px",
            pathColor:`rgba(234,88,12,2)`,
            textColor:"#f97316",
            trailColor:"#f1f5f9",
            backgroundColor:"#3e98c7",
         })}
         />
            </div>
        )

    }
    function ProjectsCompletedLabels({
        completedProjects,
        completedTasks
    }:{
        completedProjects:Project[];
        completedTasks:number;
    }){
      return(
        <div className="flex justify-center flex-col gap-1 items-center">
            <p className="font-bold text-[17px]">{completedProjects.length} Completed</p>
            <p className="text-[13px] text-slate-400">{completedTasks}Tasks Done</p>
        </div>
      )
    }
    function ProjectList({
        completedProjects,
    }:{
        completedProjects:Project[];
    }){
 return(
    <ul className="flex flex-col gap-3 mt-16 mx-4 overflow-auto">
    {/* <SingleTask/>
    <hr className="w-[80%] x-auto text-slate-100 opacity-50"></hr>
    <SingleTask/>
    <hr className="w-[80%] x-auto text-slate-100 opacity-50"></hr>
    <SingleTask/> */}
 <div className="h-[100%] flex items-center justify-center py-20 w-full">
  {completedProjects.length === 0 ? (
                <div className="h-[100%] flex items-center justify-center py-20 w-full">
                    <div className="p-1 gap-5 flex flex-col justify-center opacity-40 pb-8 items-center">
                        <div className="w-16 h-16 flex items-center justify-center">
                            <NotAcheivedPRojectsIcon />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-slate-700 text-[12px] mb-1 text-center">
                                No Projects accomplished yet...
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                // Display the list of completed projects when available
                completedProjects.map((project, index) => (
                    <div key={project.id}>
                        <SingleTask project={project} />
                        {index < completedProjects.length - 1 && (
                            <hr className="w-[80%] mx-auto text-slate-100 opacity-50" />
                        )}
                    </div>
                ))
            )}
    </div>
    </ul>
 )
    }
    function SingleTask({project}:{project:Project}){
        return(
           <li className="p-3 flex gap-3 items-center">
        <div className="w-8 h-8 bg-orange-600 rounded-md justify-center items-center flex text-slate-400">
            <Splitscreen sx={{fontSize:"19px"}} />
        </div>
        <ul>
            <li className="text-[14px] font-semibold">{truncateString(project.title,40)}</li>
            <li className="text-[14px] text-slate-400">{project.tasks.length} Tasks</li>
        </ul>
           </li>
        )
    }
    function truncateString(str:string,maxLength:number):string{
        if(str.length>maxLength){
            return str.slice(0,maxLength)+"...";
        }
        return str;
    }
    function NotAcheivedPRojectsIcon(){
        return(
            <svg fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1072.588 960c0 167.266 96.226 245.308 189.29 320.64 116.555 94.532 247.793 200.922 261.346 526.419H396.07c13.553-325.497 144.79-431.887 261.345-526.419 93.064-75.332 189.29-153.374 189.29-320.64s-96.226-245.308-189.29-320.64C540.86 544.828 409.623 438.438 396.07 112.941h1127.153c-13.553 325.497-144.791 431.887-261.346 526.419-93.064 75.332-189.29 153.374-189.29 320.64m260.443-232.998c135.529-109.891 304.263-246.663 304.263-670.531V0H282v56.47c0 423.869 168.734 560.64 304.264 670.532 88.771 72.057 147.5 119.605 147.5 232.998 0 113.393-58.729 160.941-147.5 232.998C450.734 1302.889 282 1439.66 282 1863.529V1920h1355.294v-56.47c0-423.869-168.734-560.64-304.263-670.532-88.772-72.057-147.502-119.605-147.502-232.998 0-113.393 58.73-160.941 147.502-232.998M933.84 1274.665l-169.638 137.676c-74.315 60.197-138.353 112.037-172.687 225.317h736.264c-34.334-113.28-98.372-165.12-172.687-225.317l-169.638-137.676c-15.021-12.197-36.593-12.197-51.614 0" fill-rule="evenodd"></path> </g></svg>
           
        )
    }
}