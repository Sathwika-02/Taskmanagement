import { AccountBalance, AccountBalanceWallet } from "@mui/icons-material";
import { IconData } from "../Pages/ContextApp";
import { useContextApp } from "../Pages/ContextApp";
export const allIconsArray:IconData[]=[
{
    id:1,
    icon:<AccountBalance className="text-[23px]"/>,
    name:"Account Balance",
    isSelected:true
},
{
    id:2,
    icon:<AccountBalanceWallet/>,
    name:"AccountBalanceWallet",
    isSelected:false,
}
]
export default function AllIcons(){
    const{
        allIconsDataObject:{allIconsData,setAllIconsData},
        selectedIconObject:{setSelectedIcon},
        openIconWindowObject:{setOpenIconWindow},
    }=useContextApp();

    
   function handleTheIconSelection(singleIcon:IconData){
    setAllIconsData((previcon)=>
    previcon.map((icon)=>{
        if(icon.name ===singleIcon.name){
            setSelectedIcon(singleIcon);

            return {...icon,isSelected:true};
        }
        return {...icon,isSelected:false};
    }))
    setOpenIconWindow(false);
   }
   return(
    <div className="flex flex-wrap gap-2 text-orange-600 p-3">
        {
            allIconsData.map((singleIcon,index)=>(
                <div key={index}
                onClick={()=>handleTheIconSelection(singleIcon)}
                className={`w-9 h-9 shadow-sm border border-slate-50 flex items-center justify-center rounded-lg hover:bg-orange-600 hover:text-white
                    ${
                        singleIcon.isSelected?"bg-orange-600 text-white":"bg-white text-orange-600"
                    }
                    `}
                >
                    {singleIcon.icon}

                </div>
            ))
        }
    </div>
   )
   
}