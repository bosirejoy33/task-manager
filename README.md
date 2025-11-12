 Modular Task Manager

A lightweight, object-oriented **Task Manager Web App** built entirely with **vanilla JavaScript**, **ES Modules**, and **localStorage** persistence.

This project demonstrates **modular architecture**, **OOP design with classes**, and **DOM manipulation** without using any external libraries or frameworks.

---

Features

 Add, edit, and delete tasks  
 Mark tasks as completed or active (via checkbox or button)  
 Timed tasks with due dates and overdue highlighting  
 Search and filter tasks (All / Active / Completed)  
 Persist tasks across browser sessions with `localStorage`  
 Inline editing (double-click task title to rename)  
 Accessible (ARIA labels, keyboard interactions)  
Modular, object-oriented architecture using ES Modules  

---

modular-task-manager/
|
│
├── index.html # Main HTML interface
├── styles.css # Application styling
│
└── src/
├── app.js # Main controller (event handlers, rendering)
├── store.js # Load/save task data to localStorage
├── Task.js # Task & TimedTask classes (core data models)
├── view.js # Rendering and UI updates
└── utils.js # Utility functions (UUID, HTML escaping)

github repo link : https://github.com/bosirejoy33/task-manager.git

\ docker tags https://hub.docker.com/r/bosirejoy33/task-manager/tags

\ live site : https://bosirejoy33.github.io/task-manager/

