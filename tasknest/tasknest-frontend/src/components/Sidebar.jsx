import {
    LayoutDashboard,
    ListTodo,
    CalendarDays,
    AlertCircle,
    Plus
} from "lucide-react";

function Sidebar({
                     lists,
                     selectedList,
                     activeView,
                     setActiveView,
                     setSelectedList,
                     openListModal
                 }) {

    return (
        <aside className="sidebar">

            <div className="brand">
                <div className="brand-logo">
                    TN
                </div>

                <div>
                    <h2>TaskNest</h2>
                    <span>Productivity Hub</span>
                </div>
            </div>

            <nav className="navigation">

                <button
                    className={activeView === "dashboard" ? "nav-item active" : "nav-item"}
                    onClick={() => {
                        setActiveView("dashboard");
                        setSelectedList(null);
                    }}
                >
                    <LayoutDashboard size={19} />
                    Dashboard
                </button>

                <button
                    className={activeView === "all" ? "nav-item active" : "nav-item"}
                    onClick={() => {
                        setActiveView("all");
                        setSelectedList(null);
                    }}
                >
                    <ListTodo size={19} />
                    All Tasks
                </button>

                <button
                    className={activeView === "today" ? "nav-item active" : "nav-item"}
                    onClick={() => {
                        setActiveView("today");
                        setSelectedList(null);
                    }}
                >
                    <CalendarDays size={19} />
                    Today
                </button>

                <button
                    className={activeView === "overdue" ? "nav-item active" : "nav-item"}
                    onClick={() => {
                        setActiveView("overdue");
                        setSelectedList(null);
                    }}
                >
                    <AlertCircle size={19} />
                    Overdue
                </button>

            </nav>

            <div className="sidebar-section">

                <div className="section-heading">
                    <span>MY LISTS</span>

                    <button
                        className="icon-button"
                        onClick={openListModal}
                    >
                        <Plus size={17} />
                    </button>
                </div>

                {lists.map(list => (

                    <button
                        key={list.id}
                        className={
                            selectedList?.id === list.id
                                ? "list-nav active"
                                : "list-nav"
                        }
                        onClick={() => {
                            setSelectedList(list);
                            setActiveView("list");
                        }}
                    >
                        <span className="list-dot" />
                        {list.name}
                    </button>

                ))}

            </div>

            <div className="sidebar-footer">
                <span>TaskNest</span>
                <small>Personal productivity</small>
            </div>

        </aside>
    );
}

export default Sidebar;