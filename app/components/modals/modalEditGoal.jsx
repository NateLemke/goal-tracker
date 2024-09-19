"use client"
import React, { useState } from "react";

export default function ModalEditGoal({closeFunc, editGoalFunc, currentTitle}) {
    const [name, setName] = useState(currentTitle);

    const editFunc = () => {
        editGoalFunc(name);
        closeFunc();
    }

    return(
        <div id="modalOuter" className="w-full h-full bg-black bg-opacity-70 flex
        justify-center items-center absolute">
            <div id="modalInner" className="flex justify-center items-center border-gray-800 border-8
            flex-col rounded-md min-w-60 bg-gray-700">
                <div id="titleDiv" className="bg-gray-800 px-5 mx-5 mb-6 rounded-md -translate-y-2">
                    <h1>Edit Goal</h1>
                </div>
                <label for="nameInput">Goal Title:</label>
                <input id="nameInput" type="text" placeholder="Goal Name" 
                onChange={(e) => setName(e.target.value)} value={name}
                className="w-3/4 rounded-md text-black pl-2 border-none focus:ring-0"/>
                <div id="buttonDiv" className="mt-4 mr-5 mb-1 flex flex-row w-full justify-end">
                    <button id="cancelButton" onClick={closeFunc}
                    className="px-2 py-1 border-red-700 border-2 text-red-700 m-1 rounded-full
                    hover:bg-red-700 hover:text-white duration-150">
                        <h2 className="text-sm">Cancel</h2>
                    </button>
                    <button id="createButton" onClick={editFunc}
                    className="px-2 py-1 border-green-700 border-2 text-green-700 m-1 rounded-full
                    hover:bg-green-700 hover:text-white duration-150">
                        <h2 className="text-sm">Edit</h2>
                    </button>
                </div>
            </div>
        </div>
    );
}