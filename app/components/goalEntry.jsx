import React from "react";

export default function GoalEntry({id, title, setGoalFunc}) {
    return(
        <div className={`flex w-full min-h-10 bg-slate-500 hover:bg-slate-700 justify-center 
        items-center cursor-pointer border border-slate-700`} 
        onClick={()=>{setGoalFunc(id, title)}}>
            <h2 className={`text-xl`}>
                {title}</h2>
        </div>
    )
}