import { useTaskFormContext } from "../../Windows/TasksWindow";
import { Priority } from "../../Windows/TasksWindow";
export default function PriorityListComponent(){
  const{
    priorityListObject:{priorityList,setPriorityList},
  }=useTaskFormContext();
  return(
    <div className="flex flex-col gap-2">
          {
            priorityList.map((singlePriority,index)=>(
                <SinglePriority
                key={index}
                singlePriority={singlePriority}
                index={index}
                />
            ))
          }
    </div>
  )
  function SinglePriority({
    singlePriority,
    index,
  }:{
    singlePriority:Priority;
    index:number;
  }){
    const{setPriority,setOpenTasksDropDown}=useTaskFormContext();
     function updateThePriority(index:number){
        setPriority(singlePriority);
        setPriorityList((prevstate)=>
            prevstate.map((isPriority,i)=>({
                ...isPriority,
                isSelected:index===i,
            }))
        )
        setOpenTasksDropDown(false);
     }
     return(
        <div onClick={()=>updateThePriority(index)}
        className={`${
            singlePriority.isSelected && "bg-orange-50 border border-orange-200"
        } flex items-center gap-2 p-[7px] rounded-md cursor-pointer`}
        >
            <div>{singlePriority.icon}</div>
            <p className="text-slate-500 hover:text-orange-600 text-[14px]">
              {singlePriority.name}
            </p>
   
        </div>
     )
}
}