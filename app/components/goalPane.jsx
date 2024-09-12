import React from "react";
import { IoClose } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function GoalPane({goalsShowing, setShowing, funcAddGoalModal}) {
    return (
        <div id="goalPaneContainer" className={`flex flex-col h-full bg-gray-700
        items-center border-r-2 border-t-2 border-gray-900 duration-300 
        ${goalsShowing ? "w-1/3" : "w-0"}`}>
            <div id="goalsHeader" className="flex w-full justify-between items-center h-8 
            bg-gray-500">
                <h2 onClick = {funcAddGoalModal} className={`flex text-sm text-green-600 cursor-pointer hover:scale-110 
                hover:opacity-50 pl-2 mt-1 duration-75 ${goalsShowing ? "opacity-100 delay-100 visible" : "opacity-0 delay-0 invisible"}`}>
                    Add New Goal <IoMdAddCircleOutline className="text-2xl pb-1"/>
                </h2>
                <span className={`text-3xl text-red-600 hover:scale-110 hover:opacity-50
                cursor-pointer ${goalsShowing ? "opacity-100 delay-100 visible" : "opacity-0 delay-0 invisible"}`} 
                onClick={setShowing}><IoClose/></span>
            </div>
        </div>
    )
}