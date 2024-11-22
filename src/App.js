import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]); // Liste des tâches
  const [newTask, setNewTask] = useState(""); // Nouvelle tâche
  const [editIndex, setEditIndex] = useState(null); // Index de la tâche en cours d'édition

  // Fonction pour ajouter une tâche
  const addTask = () => {
    if (newTask.trim() === "") return; // Empêcher l'ajout d'une tâche vide

    if (editIndex !== null) {
      // Si une tâche est en édition
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? newTask : task
      );
      setTasks(updatedTasks);
      setEditIndex(null); // Sortir du mode édition
    } else {
      // Ajouter une nouvelle tâche
      setTasks([...tasks, newTask]);
    }

    setNewTask(""); // Réinitialiser le champ de saisie
  };

  // Fonction pour supprimer une tâche
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Filtrer la tâche à supprimer
    setTasks(updatedTasks);
  };

  // Fonction pour entrer en mode édition
  const editTask = (index) => {
    setNewTask(tasks[index]); // Préremplir le champ avec la tâche à éditer
    setEditIndex(index); // Définir l'index de la tâche en cours d'édition
  };

  return (
    <div className="App">
      <h1>Tâche</h1>
      <div className="main">
        <div className="inputtache">
          <input
            className="input"
            type="text"
            placeholder="Ajouter une tâche"
            value={newTask} // Lier l'input à l'état `newTask`
            onChange={(e) => setNewTask(e.target.value)} // Mettre à jour `newTask` à chaque frappe
          />

          <button onClick={addTask}>
            {editIndex !== null ? "Mettre à jour" : "Ajouter"}
          </button>
        </div>

        <div className="a faire">
          <h4>Liste des taches à faire</h4>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="listedestaches">
              <input type="checkbox" />
              {task}
              <div className="btn">
                <button className="edit" onClick={() => editTask(index)}>
                  Éditer
                </button>
                <button className="delete" onClick={() => deleteTask(index)}>
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
