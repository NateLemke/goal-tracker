"use client";
import { useContext, useState, createContext } from "react";

const TaskContext = createContext();

export function useTaskContext() {
    return useContext(TaskContext);
}

export function TaskProvider({children}) {
    const [taskID, setTaskID] = useState("");
    const [subTaskID, setSubTaskID] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [subTaskDesc, setSubTaskDesc] = useState("");
    const [taskProgress, setTaskProgress] = useState("");
    const [subTaskProgress, setSubTaskProgress] = useState("");
    const [goalID, setGoalID] = useState("");
    

    const value = {
        taskID, setTaskID,
        subTaskID, setSubTaskID,
        taskDesc, setTaskDesc,
        subTaskDesc, setSubTaskDesc,
        taskProgress, setTaskProgress,
        subTaskProgress, setSubTaskProgress,
        goalID, setGoalID
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}