// "use client";
// import { connectToDB } from "@utils/database";
// import { useEffect, useState } from "react";

// export default function TaskList() {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTask = async () => {
//       await connectToDB();
//       fetch("/api/tasks")
//         .then((res) => res.json())
//         .then(setTasks);
//     };
//     fetchTask();
//   }, []);

//   return (
//     <ul>
//       {tasks.map((task) => (
//         <li key={task._id}>{task.title}</li>
//       ))}
//     </ul>
//   );
// }

"use client";
// file: components/TaskList.js
import { useState } from "react";

export default function TaskList({ tasks, onTaskUpdated }) {
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const handleDelete = async (id) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    onTaskUpdated();
  };

  const handleToggleComplete = async (task) => {
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task._id, completed: !task.completed }),
    });
    onTaskUpdated();
  };

  const handleEdit = (task) => {
    setEditingTask(task._id);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
  };

  const handleUpdate = async (id) => {
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title: updatedTitle,
        description: updatedDescription,
      }),
    });
    setEditingTask(null);
    onTaskUpdated();
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex items-center justify-between p-2 border"
        >
          {editingTask === task._id ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="border p-1"
              />
              <input
                type="text"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="border p-1"
              />
              <button
                onClick={() => handleUpdate(task._id)}
                className="bg-green-500 text-white px-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditingTask(null)}
                className="bg-gray-500 text-white px-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <span className={task.completed ? "line-through" : ""}>
                {task.title}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleComplete(task)}
                  className="bg-blue-500 text-white px-2"
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => handleEdit(task)}
                  className="bg-yellow-500 text-white px-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 text-white px-2"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
