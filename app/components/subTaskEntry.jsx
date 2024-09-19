import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import MenuTask from "./menuTask";

export default function SubTaskEntry({completed, curProgress, reqProgress, description, 
    goalID, taskID, subTaskID, updateCompleted, updateProgress, toggleEditSubTaskModal,
    toggleDeleteSubTaskModal}) {

    const [taskCompleted, setTaskCompleted] = useState(completed);
    const [taskProgress, setTaskProgress] = useState(curProgress);

    const toggleCompleted = () => {
        setTaskCompleted((cur) => !cur);
    }

    const reduceProgress = () => {
        if(taskProgress > 0 && !taskCompleted) {
            setTaskProgress((cur) => cur - 1);
        }
    }

    const increaseProgress = () => {
        if(taskProgress < reqProgress && !taskCompleted) {
            setTaskProgress((cur) => cur + 1);
        }
    }

    useEffect(() => {
        if(updateCompleted) {
            updateCompleted(goalID,taskID,subTaskID,taskCompleted);
        }
    },[taskCompleted])

    useEffect(() => {
        if(updateProgress) {
            updateProgress(goalID,taskID,subTaskID,taskProgress);
        }
    },[taskProgress])

    return (
        <div className="sm:w-3/4 w-11/12 h-fit my-1 flex flex-row items-center bg-slate-500
        rounded-3xl select-none sm:ml-40 ml-5 p-2">
            <div className="min-w-6 min-h-6 m-2 rounded-full bg-slate-600 hover:scale-125 cursor-pointer
            flex justify-center items-center" onClick={toggleCompleted}>
                {taskCompleted && <FaCheck className="text-green-500 text-xl sm:text-2xl"/>}
            </div>
            {(reqProgress > 1) && 
            <div className="flex flex-row justify-center items-center sm:mr-1 relative">
                <div className="w-5 h-5 rounded-full flex justify-center items-center
                bg-slate-600 hover:scale-110 cursor-pointer transform translate-x-1.5"
                onClick={reduceProgress}>
                    <h3 className={`text-lg ${taskCompleted ? "text-slate-300": ""}`}>-</h3>
                </div>
                <div className="border-2 border-slate-600 rounded-lg ">
                    <h2 className={`sm:text-xl text-sm px-2 py-1 ${taskCompleted ? "line-through text-slate-300": ""}`}>
                        {`${taskProgress}/${reqProgress}`}
                    </h2>
                </div>
                <div className="w-5 h-5 rounded-full flex justify-center items-center
                bg-slate-600 hover:scale-110 cursor-pointer transform -translate-x-1.5"
                onClick={increaseProgress}>
                    <h3 className={`text-lg ${taskCompleted ? "text-slate-300": ""}`}>+</h3>
                </div>
            </div>
            }
            <div>
                <h2 className={`sm:text-lg text-sm 
                    ${taskCompleted ? "line-through text-slate-300": ""}`}>
                    {description}
                </h2>
            </div>
            <div className="ml-auto mr-1">
                <MenuTask showAdd={false} taskID={taskID} subTaskID={subTaskID}
                subTaskDesc = {description} subTaskProgress = {reqProgress} toggleEditModal={toggleEditSubTaskModal}
                toggleDeleteModal={toggleDeleteSubTaskModal}/>
            </div>
        </div>
    );
}