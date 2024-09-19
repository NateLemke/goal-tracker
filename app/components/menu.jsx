import React from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

export default function Menu({showAdd, toggleDeleteModal, toggleEditModal, toggleAddModal}) {
    return(
        <div id="menuContainer" className="flex flex-row items-center justify-center mr-2">
            <MdDelete id="deleteButton" className="text-red-600 text-3xl hover:scale-110 
            hover:opacity-50 cursor-pointer p-1" onClick={toggleDeleteModal}/>
            <FaRegEdit id="editButton" className="text-yellow-500 text-3xl hover:scale-110 
            hover:opacity-50 cursor-pointer p-1" onClick={toggleEditModal}/>
            {showAdd && <IoMdAddCircleOutline  id="addButton" className="text-green-500 text-3xl hover:scale-110 
            hover:opacity-50 cursor-pointer p-1" onClick={toggleAddModal}/>}
        </div>
    )
}