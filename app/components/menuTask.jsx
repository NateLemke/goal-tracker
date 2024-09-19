import React from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { useTaskContext } from "../context/taskContext";

export default function MenuTask({showAdd, toggleDeleteModal, toggleEditModal, toggleAddModal, taskID,
taskDesc, taskProgress, subTaskID, subTaskDesc, subTaskProgress}) {

    const {setTaskID, setTaskDesc, setTaskProgress, 
        setSubTaskID, setSubTaskDesc, setSubTaskProgress} = useTaskContext();

    const addFunc = () => {
        setTaskID(taskID);
        toggleAddModal();
    }

    const editFunc = () => {
        setTaskID(taskID);
        if(taskProgress) {
            setTaskDesc(taskDesc);
            setTaskProgress(taskProgress);
        }
        if(subTaskID) {
            setSubTaskID(subTaskID);
            setSubTaskDesc(subTaskDesc);
            setSubTaskProgress(subTaskProgress);
        }
        toggleEditModal();
    }

    const deleteFunc = () => {
        setTaskID(taskID);
        if(subTaskID) {
            setSubTaskID(subTaskID);
        }
        toggleDeleteModal();
    }

    return(
        <div id="menuContainer" className="flex sm:flex-row flex-col items-center justify-center mr-2">
            <MdDelete id="deleteButton" className="text-red-600 text-3xl hover:scale-110 
            hover:opacity-50 cursor-pointer p-1" onClick={deleteFunc}/>
            <FaRegEdit id="editButton" className="text-yellow-500 text-3xl hover:scale-110 
            hover:opacity-50 cursor-pointer p-1" onClick={editFunc}/>
            {showAdd && <IoMdAddCircleOutline  id="addButton" className="text-green-500 text-3xl hover:scale-110 
            hover:opacity-50 cursor-pointer p-1" onClick={addFunc}/>}
        </div>
    )
}