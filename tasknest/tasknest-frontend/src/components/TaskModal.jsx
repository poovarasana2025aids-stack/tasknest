import { X } from "lucide-react";
import { useState } from "react";

function TaskModal({
                       lists,
                       close,
                       createTask
                   }) {

    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [listId, setListId] = useState(
        lists.length ? String(lists[0].id) : ""
    );

    function submit(e) {

        e.preventDefault();

        createTask({
            title,
            dueDate,
            priority,
            listId
        });
    }

    return (
        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <div>
                        <h2>Create New Task</h2>
                        <p>Add a task to your workspace.</p>
                    </div>

                    <button
                        className="modal-close"
                        onClick={close}
                    >
                        <X size={20} />
                    </button>

                </div>

                <form onSubmit={submit}>

                    <label>Task title</label>

                    <input
                        autoFocus
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="e.g. Complete Java assignment"
                        required
                    />

                    <div className="form-row">

                        <div>
                            <label>Task list</label>

                            <select
                                value={listId}
                                onChange={e => setListId(e.target.value)}
                                required
                            >

                                {lists.map(list => (
                                    <option
                                        key={list.id}
                                        value={list.id}
                                    >
                                        {list.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                        <div>
                            <label>Priority</label>

                            <select
                                value={priority}
                                onChange={e => setPriority(e.target.value)}
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>

                        </div>

                    </div>

                    <label>Due date</label>

                    <input
                        type="date"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                        required
                    />

                    <div className="modal-actions">

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={close}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            Create Task
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default TaskModal;