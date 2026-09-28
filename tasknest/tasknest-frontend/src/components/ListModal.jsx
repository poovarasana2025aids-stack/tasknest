import { X } from "lucide-react";
import { useState } from "react";

function ListModal({
                       close,
                       createList
                   }) {

    const [name, setName] = useState("");

    function submit(e) {

        e.preventDefault();

        if (!name.trim()) return;

        createList(name);
    }

    return (
        <div className="modal-overlay">

            <div className="modal small-modal">

                <div className="modal-header">

                    <div>
                        <h2>New Task List</h2>
                        <p>Create a workspace category.</p>
                    </div>

                    <button
                        className="modal-close"
                        onClick={close}
                    >
                        <X size={20} />
                    </button>

                </div>

                <form onSubmit={submit}>

                    <label>List name</label>

                    <input
                        autoFocus
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Academics"
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
                            Create List
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default ListModal;