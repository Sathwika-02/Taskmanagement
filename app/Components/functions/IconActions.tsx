// import { DensitySmall } from "@mui/icons-material";

// export const getIconComponent=(
//     iconName:string,
//     textColor?:string,
//     fontSize?:string
// ):JSX.Element=>{
//     const defaultFontSize="27px";
//     const defaultTextcolor="text-orange-600";
//     const iconProps={
//         sx:{fontSize:fontSize || defaultFontSize},
//         className:`${defaultTextcolor} ${textColor || ""}`.trim()
//     };
//     switch(iconName){
//         case "DensitySmall":
//             return <DensitySmall {...iconProps}/>
//     }

// }
import { DensitySmall, AccountBalance, AccountBalanceWallet } from "@mui/icons-material";

export const getIconComponent = (
    iconName: string,
    textColor?: string,
    fontSize?: string
): JSX.Element => {
    const defaultFontSize = "27px";
    const defaultTextcolor = "text-orange-600";
    const iconProps = {
        sx: { fontSize: fontSize || defaultFontSize },
        className: `${defaultTextcolor} ${textColor || ""}`.trim()
    };

    // Use a switch case to handle different icon names
    switch (iconName) {
        case "DensitySmall":
            return <DensitySmall {...iconProps} />;
        case "AccountBalance":
            return <AccountBalance {...iconProps} />;
        case "AccountBalanceWallet":
            return <AccountBalanceWallet {...iconProps} />;
        // Add more cases for other icons as needed

        default:
            // Return a default icon or a placeholder if iconName doesn't match
            return <div {...iconProps}>Icon Not Found</div>; // Replace with your default or placeholder
    }
};
