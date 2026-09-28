import { useEffect, useMemo, useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Stats from "./components/Stats";
import TaskCard from "./components/TaskCard";
import TaskModal from "./components/TaskModal";
import ListModal from "./components/ListModal";

import "./App.css";

const API = "http://localhost:8080";

function App() {

  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);

  const [activeView, setActiveView] = useState("dashboard");
  const [selectedList, setSelectedList] = useState(null);

  const [search, setSearch] = useState("");

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  async function loadData() {

    try {

      setLoading(true);

      const [
        tasksRes,
        listsRes,
        todayRes,
        overdueRes
      ] = await Promise.all([
        fetch(`${API}/tasks`),
        fetch(`${API}/task-lists`),
        fetch(`${API}/tasks/today`),
        fetch(`${API}/tasks/overdue`)
      ]);

      if (
          !tasksRes.ok ||
          !listsRes.ok ||
          !todayRes.ok ||
          !overdueRes.ok
      ) {
        throw new Error("Backend request failed");
      }

      setTasks(await tasksRes.json());
      setLists(await listsRes.json());
      setTodayTasks(await todayRes.json());
      setOverdueTasks(await overdueRes.json());

    } catch (error) {

      showNotification(
          "Unable to connect to the Spring Boot backend.",
          "error"
      );

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function showNotification(message, type = "success") {

    setNotification({
      message,
      type
    });

    setTimeout(() => {
      setNotification(null);
    }, 3500);
  }

  async function createTask(data) {

    try {

      const response = await fetch(
          `${API}/tasks?taskListId=${data.listId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: data.title,
              dueDate: data.dueDate,
              priority: data.priority,
              completed: false
            })
          }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
            result.message || "Could not create task"
        );
      }

      setShowTaskModal(false);

      showNotification(
          "Task created successfully."
      );

      await loadData();

    } catch (error) {

      showNotification(
          error.message,
          "error"
      );
    }
  }

  async function createList(name) {

    try {

      const response = await fetch(
          `${API}/task-lists?userId=1&name=${encodeURIComponent(name)}`,
          {
            method: "POST"
          }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
            result.message || "Could not create list"
        );
      }

      setShowListModal(false);

      showNotification(
          "Task list created successfully."
      );

      await loadData();

    } catch (error) {

      showNotification(
          error.message,
          "error"
      );
    }
  }

  async function toggleTask(task) {

    try {

      const response = await fetch(
          `${API}/tasks/${task.id}/complete?completed=${!task.completed}`,
          {
            method: "PUT"
          }
      );

      if (!response.ok) {
        throw new Error("Could not update task");
      }

      showNotification(
          task.completed
              ? "Task marked as active."
              : "Task completed."
      );

      await loadData();

    } catch (error) {

      showNotification(
          error.message,
          "error"
      );
    }
  }

  async function moveTask(taskId, newListId) {

    try {

      const response = await fetch(
          `${API}/tasks/${taskId}/move?newTaskListId=${newListId}`,
          {
            method: "PUT"
          }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
            result.message || "Could not move task"
        );
      }

      showNotification(
          "Task moved successfully."
      );

      await loadData();

    } catch (error) {

      showNotification(
          error.message,
          "error"
      );
    }
  }

  async function deleteTask(taskId) {

    const confirmed =
        window.confirm(
            "Are you sure you want to delete this task?"
        );

    if (!confirmed) return;

    try {

      const response = await fetch(
          `${API}/tasks/${taskId}`,
          {
            method: "DELETE"
          }
      );

      if (!response.ok && response.status !== 204) {
        throw new Error("Could not delete task");
      }

      showNotification(
          "Task deleted."
      );

      await loadData();

    } catch (error) {

      showNotification(
          error.message,
          "error"
      );
    }
  }

  const completed =
      tasks.filter(task => task.completed);

  const active =
      tasks.filter(task => !task.completed);

  const visibleTasks = useMemo(() => {

    let result = [...tasks];

    if (activeView === "today") {
      result = [...todayTasks];
    }

    if (activeView === "overdue") {
      result = [...overdueTasks];
    }

    if (activeView === "list" && selectedList) {

      result = result.filter(
          task =>
              Number(task.taskListId) ===
              Number(selectedList.id)
      );
    }

    if (search.trim()) {

      const query =
          search.toLowerCase();

      result = result.filter(task =>
          task.title
              .toLowerCase()
              .includes(query)
      );
    }

    return result;

  }, [
    tasks,
    todayTasks,
    overdueTasks,
    activeView,
    selectedList,
    search
  ]);

  function pageTitle() {

    if (activeView === "today")
      return "Today's Tasks";

    if (activeView === "overdue")
      return "Overdue Tasks";

    if (activeView === "list")
      return selectedList?.name || "Task List";

    if (activeView === "all")
      return "All Tasks";

    return "My Workspace";
  }

  return (
      <div className="app-shell">

        <Sidebar
            lists={lists}
            selectedList={selectedList}
            activeView={activeView}
            setActiveView={setActiveView}
            setSelectedList={setSelectedList}
            openListModal={() =>
                setShowListModal(true)
            }
        />

        <main className="main-content">

          <Header
              search={search}
              setSearch={setSearch}
              openTaskModal={() =>
                  setShowTaskModal(true)
              }
          />

          {notification && (

              <div
                  className={
                    notification.type === "error"
                        ? "notification error"
                        : "notification"
                  }
              >
                {notification.message}
              </div>

          )}

          <div className="page-container">

            {activeView === "dashboard" && (

                <Stats
                    total={tasks.length}
                    active={active.length}
                    completed={completed.length}
                    overdue={overdueTasks.length}
                    lists={lists.length}
                />

            )}

            <section className="tasks-section">

              <div className="section-header">

                <div>

                <span className="eyebrow">
                  {activeView === "dashboard"
                      ? "OVERVIEW"
                      : "TASK MANAGEMENT"}
                </span>

                  <h2>{pageTitle()}</h2>

                  <p>
                    {visibleTasks.length}{" "}
                    {visibleTasks.length === 1
                        ? "task"
                        : "tasks"}
                  </p>

                </div>

                <button
                    className="primary-button"
                    onClick={() =>
                        setShowTaskModal(true)
                    }
                >
                  + New Task
                </button>

              </div>

              {loading ? (

                  <div className="loading">
                    <div className="loader" />
                    Loading your workspace...
                  </div>

              ) : visibleTasks.length === 0 ? (

                  <div className="empty">

                    <div className="empty-circle">
                      ✓
                    </div>

                    <h3>No tasks here</h3>

                    <p>
                      Create a task to start organizing
                      your work.
                    </p>

                    <button
                        className="primary-button"
                        onClick={() =>
                            setShowTaskModal(true)
                        }
                    >
                      Create your first task
                    </button>

                  </div>

              ) : (

                  <div className="task-container">

                    {visibleTasks.map(task => (

                        <TaskCard
                            key={task.id}
                            task={task}
                            lists={lists}
                            toggleTask={toggleTask}
                            moveTask={moveTask}
                            deleteTask={deleteTask}
                        />

                    ))}

                  </div>

              )}

            </section>

          </div>

        </main>

        {showTaskModal && (

            <TaskModal
                lists={lists}
                close={() =>
                    setShowTaskModal(false)
                }
                createTask={createTask}
            />

        )}

        {showListModal && (

            <ListModal
                close={() =>
                    setShowListModal(false)
                }
                createList={createList}
            />

        )}

      </div>
  );
}

export default App;