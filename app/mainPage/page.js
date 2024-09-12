"use client";
import Image from "next/image";
import { useState } from "react";
import Dashboard from "../components/dashboard";
import { useAuth } from "../context/AuthContext";
import GoalPane from "../components/goalPane";
import TaskPane from "../components/taskPane";
import ModalAddGoal from "../components/modalAddGoal";

export default function MainPage() {

  const {currentUser} = useAuth()

  const [goalName, setGoalName] = useState("Goal Title");

  const [showGoals, setShowGoals] = useState(false);
  const [addGoalModal, setAddGoalModal] = useState(false);

  function toggleMenu() {
    setShowGoals((cur) => !cur);
  }

  const toggleAddGoal = () => {
    setAddGoalModal((cur) => !cur);
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Dashboard/>
      <div id="goalsContainer" className="flex flex-grow w-full">
        <GoalPane goalsShowing = {showGoals} setShowing = {toggleMenu} funcAddGoalModal = {toggleAddGoal}/>
        <TaskPane goalsShowing = {showGoals} setShowing = {toggleMenu} title = {goalName}/>
      </div>
      {addGoalModal && <ModalAddGoal closeFunc = {toggleAddGoal} addGoalFunc = {setGoalName}/>}
    </main>
  );
}