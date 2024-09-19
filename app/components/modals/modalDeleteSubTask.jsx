"use client"
import React, { useState } from "react";
import { useTaskContext } from "../../context/taskContext";

export default function ModalDeleteSubTask({closeFunc, deleteSubTaskFunc}) {

    const {goalID, taskID, subTaskID} = useTaskContext();
    
    const deleteFunc = () => {
        deleteSubTaskFunc(goalID, taskID, subTaskID);
        closeFunc();
    }

    return(
        <div id="modalOuter" className="w-full h-full bg-black bg-opacity-70 flex
        justify-center items-center absolute">
            <div id="modalInner" className="flex justify-center items-center border-gray-800 border-8
            flex-col rounded-md min-w-60 bg-gray-700">
                <div id="titleDiv" className="bg-gray-800 px-5 mx-5 mb-6 rounded-md -translate-y-2">
                    <h1>Delete SubTask</h1>
                </div>
                <h2 className="text-xl mx-4">Are you sure you want to delete this SubTask?</h2>
                <div id="buttonDiv" className="mt-4 mr-5 mb-1 flex flex-row w-full justify-end">
                    <button id="cancelButton" onClick={closeFunc}
                    className="px-2 py-1 border-red-700 border-2 text-red-700 m-1 rounded-full
                    hover:bg-red-700 hover:text-white duration-150">
                        <h2 className="text-sm">No, Cancel</h2>
                    </button>
                    <button id="createButton" onClick={deleteFunc}
                    className="px-2 py-1 border-green-700 border-2 text-green-700 m-1 rounded-full
                    hover:bg-green-700 hover:text-white duration-150">
                        <h2 className="text-sm">Yes, Delete</h2>
                    </button>
                </div>
            </div>
        </div>
    );
}