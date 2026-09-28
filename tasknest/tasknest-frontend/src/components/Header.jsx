import { Search, Plus } from "lucide-react";

function Header({
                    search,
                    setSearch,
                    openTaskModal
                }) {

    return (
        <header className="header">

            <div>
                <h1>Workspace</h1>
                <p>Organize your work and stay on schedule.</p>
            </div>

            <div className="header-actions">

                <div className="search-box">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                </div>

                <button
                    className="primary-button"
                    onClick={openTaskModal}
                >
                    <Plus size={18} />
                    New Task
                </button>

            </div>

        </header>
    );
}

export default Header;