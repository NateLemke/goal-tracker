import React from "react";
import { IoMenu } from "react-icons/io5";
import Menu from "./menu";

export default function TaskPane({goalsShowing, setShowing, title, toggleDeleteGoalModal,
    toggleEditGoalModal, toggleAddTaskModal, taskElements, isLoading
}) {
    return (
        <div id="taskPaneContainer" className={`flex flex-col h-full bg-gray-700
        items-center border-t-2 border-gray-900 duration-300
        ${goalsShowing ? "sm:w-2/3 w-0" : "w-screen"}`}>
            <div id="taskHeader" className="flex w-full justify-between items-center min-h-8 
            bg-gray-500 border-b-2 border-gray-900">
                <IoMenu id="menuButton" className="text-3xl text-gray-200 hover:scale-110 
                hover:opacity-50 cursor-pointer" onClick={setShowing}/>
                <h2 id="goalTitle" className={`sm:text-xl text-sm text-gray-200 duration-75 px-2
                ${goalsShowing ? "max-sm:opacity-0 max-sm:delay-0 max-sm:invisible" : 
                "max-sm:delay-300 max-sm:opacity-100 max-sm:visible"}`}>
                    {title}
                </h2>
                <Menu showAdd={true} toggleDeleteModal={toggleDeleteGoalModal}
                toggleEditModal={toggleEditGoalModal} toggleAddModal={toggleAddTaskModal}/>
            </div>
            <div id="goalsContainer" className="w-full h-full flex flex-col overflow-scroll no-scrollbar
            items-center">
                {isLoading && <div className="w-10 h-10 mt-3 rounded-full animate-spin border-4
                border-b-slate-200 border-slate-500"/>}
                {!isLoading && taskElements}
            </div>
        </div>
    )
}