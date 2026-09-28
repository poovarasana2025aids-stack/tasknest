import {
    Check,
    Trash2,
    ArrowRight
} from "lucide-react";

function TaskCard({
                      task,
                      lists,
                      toggleTask,
                      moveTask,
                      deleteTask
                  }) {

    return (
        <article
            className={
                task.completed
                    ? "task-card task-completed"
                    : "task-card"
            }
        >

            <button
                className={
                    task.completed
                        ? "task-check checked"
                        : "task-check"
                }
                onClick={() => toggleTask(task)}
            >
                {task.completed && <Check size={16} />}
            </button>

            <div className="task-main">

                <div className="task-title-row">

                    <h3>{task.title}</h3>

                    <span
                        className={`priority ${task.priority.toLowerCase()}`}
                    >
            {task.priority}
          </span>

                </div>

                <div className="task-details">

          <span>
            Due {task.dueDate}
          </span>

                    {task.taskListId && (
                        <span>
              {
                  lists.find(
                      list => list.id === task.taskListId
                  )?.name || "Unassigned"
              }
            </span>
                    )}

                </div>

            </div>

            <div className="task-controls">

                <select
                    value=""
                    onChange={e => {
                        if (e.target.value) {
                            moveTask(task.id, Number(e.target.value));
                        }
                    }}
                >
                    <option value="">
                        <ArrowRight size={12} />
                        Move
                    </option>

                    {lists
                        .filter(list => list.id !== task.taskListId)
                        .map(list => (
                            <option
                                key={list.id}
                                value={list.id}
                            >
                                {list.name}
                            </option>
                        ))}
                </select>

                <button
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                    title="Delete task"
                >
                    <Trash2 size={17} />
                </button>

            </div>

        </article>
    );
}

export default TaskCard;