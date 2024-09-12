import React from "react";
import { IoMenu } from "react-icons/io5";
import Menu from "./menu";

export default function TaskPane({goalsShowing, setShowing, title}) {
    return (
        <div id="taskPaneContainer" className={`flex flex-col h-full bg-gray-700
        items-center border-t-2 border-gray-900 duration-300
        ${goalsShowing ? "w-2/3" : "w-screen"}`}>
            <div id="taskHeader" className="flex w-full justify-between items-center h-8 bg-gray-500">
                <IoMenu id="menuButton" className="text-3xl text-gray-200 hover:scale-110 
                hover:opacity-50 cursor-pointer" onClick={setShowing}/>
                <h2 id="goalTitle" className="text-xl text-gray-200">{title}</h2>
                <Menu showAdd={false}/>
            </div>
        </div>
    )
}