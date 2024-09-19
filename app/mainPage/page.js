"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dashboard from "../components/dashboard";
import { useAuth } from "../context/AuthContext";
import { useTaskContext } from "../context/taskContext";
import { db } from "@/firebase";
import {doc, addDoc, getDocs, getDoc, deleteDoc,setDoc, collection} from "firebase/firestore"
import GoalPane from "../components/goalPane";
import TaskPane from "../components/taskPane";
import ModalAddGoal from "../components/modals/modalAddGoal";
import ModalDeleteGoal from "../components/modals/modalDeleteGoal";
import ModalEditGoal from "../components/modals/modalEditGoal";
import GoalEntry from "../components/goalEntry";
import ModalAddTask from "../components/modals/modalAddTask";
import TaskEntry from "../components/taskEntry";
import SubTaskEntry from "../components/subTaskEntry";
import ModalAddSubTask from "../components/modals/modalAddSubTask";
import ModalEditTask from "../components/modals/modalEditTask";
import ModalEditSubTask from "../components/modals/modalEditSubTask";
import ModalDeleteSubTask from "../components/modals/modalDeleteSubTask";
import ModalDeleteTask from "../components/modals/modalDeleteTask";

export default function MainPage() {

  const {currentUser} = useAuth()
  const {taskID, setTaskID,
    subTaskID, setSubTaskID,
    taskDesc, setTaskDesc,
    subTaskDesc, setSubTaskDesc,
    taskProgress, setTaskProgress,
    subTaskProgress, setSubTaskProgress,
    goalID, setGoalID} = useTaskContext()

  const[isLoading, setIsLoading] = useState(false);
  const [keyMap, setKeyMap] = useState(null);

  const [goalTitle, setGoalTitle] = useState("<- Add a New Goal Here");

  const [showGoals, setShowGoals] = useState(true);
  const [addGoalModal, setAddGoalModal] = useState(false);
  const [showDeleteGoalModal, setShowDeleteGoalModal] = useState(false);
  const [showEditGoalModal, setShowEditGoalModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddSubTaskModal, setShowAddSubTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showEditSubTaskModal, setShowEditSubTaskModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [showDeleteSubTaskModal, setShowDeleteSubTaskModal] = useState(false);
  
  const [goalElements, setGoalElements] = useState([]);
  const [taskElements, setTaskElements] = useState([]);

  function toggleMenu() {
    setShowGoals((cur) => !cur);
  }

  const toggleAddGoal = () => {
    setAddGoalModal((cur) => !cur);
  }

  const toggleDeleteGoalModal = () => {
    if(goalID === "") {return}
    setShowDeleteGoalModal((cur) => !cur);
  }

  const toggleEditGoalModal = () => {
    if(goalID === "") {return}
    setShowEditGoalModal((cur) => !cur);
  }

  const toggleAddTaskModal = () => {
    if(goalID === "") {return}
    setShowAddTaskModal((cur) => !cur);
  }

  const toggleEditTaskModal = () => {
    setShowEditTaskModal((cur) => !cur);
  }

  const toggleEditSubTaskModal = () => {
    setShowEditSubTaskModal((cur) => !cur);
  }

  const toggleDeleteTaskModal = () => {
    setShowDeleteTaskModal((cur) => !cur);
  }

  const toggleDeleteSubTaskModal = () => {
    setShowDeleteSubTaskModal((cur) => !cur);
  }

  const toggleAddSubTaskModal = () => {
    setShowAddSubTaskModal((cur) => !cur);
  }
  
  const setCurrentGoal = (id, title) => {
      setGoalID(id);
      setGoalTitle(title);
  }

  const removeEntry = (id) => {
    setKeyMap((oldMap) => {
      oldMap.delete(id);
      return oldMap;
    })
  }

  const addNewGoal = async (goalName) => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await addDoc(collection(userRef,"goals"),{title: goalName},{merge: true});
      updateGoalList()
    } catch (error) {
      console.error(error);
    }
  }

  const deleteGoal = async () => {
    try {
        for (const [key] of keyMap) {
          await deleteTask(goalID, key);
        }
        const userRef = (doc(db,"users", currentUser.uid));
        await deleteDoc(doc(userRef, "goals", goalID));
        setGoalTitle("<-  Select a Goal Here");
        setGoalID("");
        setTaskElements([]);
        updateGoalList()
    } catch(error) {
      console.error(error);
    }
  }

  const editGoal = async (name) => {
    try {
        const userRef = (doc(db,"users", currentUser.uid));
        await setDoc(doc(userRef, "goals", goalID), {title: name});
        setGoalTitle(name);
        updateGoalList()
    } catch(error) {
      console.error(error);
    }
  }

  const updateGoalList = async () => {
    const res = await fetchGoals()
    setGoalElements(res); 
  }

  const updateTaskList = async (id) => {
    setIsLoading(true);
    const res = await fetchTasks(id)
    setIsLoading(false);
    setTaskElements(res); 
  }

  const addNewTask = async (description, progress) => {
    try {
      const goalRef = doc(db, "users", currentUser.uid, "goals", goalID);
      await addDoc(collection(goalRef,"tasks"),
      {
        description: description,
        completed: false,
        requiredProgress: progress,
        currentProgress: 0
      }
    );

    updateTaskList(goalID);

    } catch (error) {
      console.error(error);
    }
  }

  const addNewSubTask = async (taskID, description, progress) => {
    try {
      const taskRef = doc(db, "users", currentUser.uid, "goals", goalID, "tasks", taskID);
      await addDoc(collection(taskRef,"subtasks"),
      {
        description: description,
        completed: false,
        requiredProgress: progress,
        currentProgress: 0
      }
    );
    } catch (error) {
      console.error(error);
    }
    updateTaskList(goalID);
  }

  const updateTaskCompleted = async (goal, taskID, taskCompleted) => {
    try {
      const taskRef = doc(db, "users", currentUser.uid, "goals", goal, "tasks", taskID);
      await setDoc(taskRef,{completed:taskCompleted},{merge:true});
    } catch (error) {
      console.error(error);
    }
  }

  const updateSubTaskCompleted = async (goal, taskID, subTaskID, taskCompleted) => {
    try {
      const subTaskRef = doc(db, "users", currentUser.uid, "goals", goal, "tasks", taskID,
        "subtasks", subTaskID);
      await setDoc(subTaskRef,{completed:taskCompleted},{merge:true});
    } catch (error) {
      console.error(error);
    }
  }

  const updateTaskProgress = async (goal, taskID, taskProgress) => {
    try {
      const taskRef = doc(db, "users", currentUser.uid, "goals", goal, "tasks", taskID);
      await setDoc(taskRef,{currentProgress:taskProgress},{merge:true});
    } catch (error) {
      console.error(error);
    }
  }

  const updateSubTaskProgress = async (goal, taskID, subTaskID, taskProgress) => {
    try {
      const subTaskRef = doc(db, "users", currentUser.uid, "goals", goal, "tasks", taskID,
        "subtasks", subTaskID);
      await setDoc(subTaskRef,{currentProgress:taskProgress},{merge:true});
    } catch (error) {
      console.error(error);
    }
  }

  const editTask = async (goal, taskID, desc, progress) => {
    try {
      const taskRef = doc(db, "users", currentUser.uid, "goals", goal, "tasks", taskID);
      await setDoc(taskRef,{requiredProgress:progress,description: desc},
        {merge:true});
    } catch (error) {
      console.error(error);
    }
    updateTaskList(goalID);
  }

  const editSubTask = async (goal, taskID, subTaskID, desc, progress) => {
    try {
      console.log(taskProgress);
      const subTaskRef = doc(db, "users", currentUser.uid, "goals", goal, "tasks", taskID,
        "subtasks", subTaskID);
      await setDoc(subTaskRef,{requiredProgress:progress, description: desc},{merge:true});
    } catch (error) {
      console.error(error);
    }
    updateTaskList(goalID);
  }

  const deleteTask = async (goalID, taskID) => {
    try {
        const taskRef = (doc(db,"users", currentUser.uid,"goals", goalID, "tasks", taskID));

        const childrenArray = keyMap.get(taskID);
        for(const subKey of childrenArray) {
          const subTaskRef = (doc(taskRef, "subtasks", subKey));
          await deleteDoc(subTaskRef);
        }
        await deleteDoc(taskRef);
        removeEntry(taskID);
        updateTaskList(goalID)
    } catch(error) {
      console.error(error);
    }
  }

  const deleteSubTask = async (goalID, taskID, subTaskID) => {
    try {
        const taskRef = (doc(db,"users", currentUser.uid,"goals", goalID, "tasks", taskID,));
        await deleteDoc(doc(taskRef, "subtasks", subTaskID));
        updateTaskList(goalID)
    } catch(error) {
      console.error(error);
    }
  }

  const fetchGoals = async () => {
    let newGoalElements = []
    let keyNum = 0;
    const userRef = doc(db, "users", currentUser.uid);
    const querySnapshot = await getDocs(collection(userRef,"goals"));

    querySnapshot.forEach((doc) => {
      newGoalElements.push(<GoalEntry key = {keyNum} id={doc.id} title={doc.data().title} 
      setGoalFunc={setCurrentGoal}/>)
      keyNum++;
    });
    return newGoalElements;
  }

  const fetchTasks = async (id) => {
    let tempTask = [];
    let newTaskElements = [];
    let newKeyMap = new Map();
    let keyNum = 0;
    const goalRef = doc(db, "users", currentUser.uid, "goals", id);
    const querySnapshot = await getDocs(collection(goalRef,"tasks"));


    querySnapshot.forEach(async (taskDoc) => {
      tempTask.push({taskID:taskDoc.id, taskData:taskDoc.data()});
    });

    for (let task of tempTask.values()) {
      const taskID = task.taskID;
      const taskData = task.taskData;

      newKeyMap.set(taskID,[]);

      newTaskElements.push(<TaskEntry key = {keyNum} goalID={goalID} taskID={taskID} completed={taskData.completed} 
      curProgress={taskData.currentProgress} reqProgress={taskData.requiredProgress}
      description={taskData.description} toggleAddSubTaskModal = {toggleAddSubTaskModal}
      toggleEditTaskModal = {toggleEditTaskModal} toggleDeleteTaskModal={toggleDeleteTaskModal}
      updateCompleted = {updateTaskCompleted} updateProgress = {updateTaskProgress}/>)
      keyNum++;

      const taskRef = doc(db, "users", currentUser.uid, "goals", id, "tasks", taskID);
      const subTasksSnapshot = await getDocs(collection(taskRef,"subtasks"));

      subTasksSnapshot.forEach((subDoc) => {
        const subTaskData = subDoc.data();

        newKeyMap.get(taskID).push(subDoc.id);

        newTaskElements.push(<SubTaskEntry key = {keyNum} goalID={goalID} subTaskID={subDoc.id} 
        completed={subTaskData.completed} curProgress={subTaskData.currentProgress} 
        reqProgress={subTaskData.requiredProgress}  taskID = {taskID} updateProgress = {updateSubTaskProgress}
        description={subTaskData.description} updateCompleted = {updateSubTaskCompleted}
        toggleEditSubTaskModal={toggleEditSubTaskModal} toggleDeleteSubTaskModal={toggleDeleteSubTaskModal}/>)
        keyNum++;
      });
    };

    setKeyMap(newKeyMap);
    return newTaskElements;
  }
  
  useEffect(() =>{
    if(goalID != ""){updateTaskList(goalID);}
  },[goalID])

  useEffect(() => {
    updateGoalList()
  }
    ,[]);

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Dashboard/>
      <div id="goalsContainer" className="flex flex-grow max-h-full w-full overflow-hidden">
        <GoalPane goalsShowing = {showGoals} setShowing = {toggleMenu} 
        funcAddGoalModal = {toggleAddGoal} goalElements={goalElements}/>
        <TaskPane goalsShowing = {showGoals} setShowing = {toggleMenu} title = {goalTitle}
        toggleDeleteGoalModal = {toggleDeleteGoalModal} toggleEditGoalModal={toggleEditGoalModal}
        toggleAddTaskModal = {toggleAddTaskModal}taskElements = {taskElements} isLoading = {isLoading}/>
      </div>
      {addGoalModal && <ModalAddGoal closeFunc = {toggleAddGoal} addGoalFunc = {addNewGoal}/>}
      {showDeleteGoalModal && <ModalDeleteGoal closeFunc = {toggleDeleteGoalModal} 
      deleteGoalFunc = {deleteGoal}/>}
      {showEditGoalModal && <ModalEditGoal closeFunc = {toggleEditGoalModal} 
      editGoalFunc = {editGoal} currentTitle={goalTitle}/>}
      {showAddTaskModal && <ModalAddTask closeFunc = {toggleAddTaskModal} 
      addTaskFunc = {addNewTask}/>}
      {showAddSubTaskModal && <ModalAddSubTask closeFunc = {toggleAddSubTaskModal} 
      addSubTaskFunc = {addNewSubTask}/>}
      {showEditTaskModal && <ModalEditTask closeFunc = {toggleEditTaskModal} 
      editTaskFunc = {editTask}/>}
      {showEditSubTaskModal && <ModalEditSubTask closeFunc = {toggleEditSubTaskModal} 
      editSubTaskFunc = {editSubTask}/>}
      {showDeleteTaskModal && <ModalDeleteTask closeFunc = {toggleDeleteTaskModal} 
      deleteTaskFunc = {deleteTask}/>}
      {showDeleteSubTaskModal && <ModalDeleteSubTask closeFunc = {toggleDeleteSubTaskModal} 
      deleteSubTaskFunc = {deleteSubTask}/>}
    </main>
  );
}