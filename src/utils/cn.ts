import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
/* 
cn(): usefull to merge calsses conditionaly

ex - this vill apply bg-red-200 when isActive varaible is true
cd("p-4 m-4" , 
    { "bg-red-200": isActive
    }
)
*/
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
