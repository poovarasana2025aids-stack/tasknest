import {
    CheckCircle2,
    Circle,
    AlertTriangle,
    List
} from "lucide-react";

function Stats({
                   total,
                   active,
                   completed,
                   overdue,
                   lists
               }) {

    const completion =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    const cards = [
        {
            title: "Total Tasks",
            value: total,
            icon: List
        },
        {
            title: "In Progress",
            value: active,
            icon: Circle
        },
        {
            title: "Completed",
            value: completed,
            icon: CheckCircle2
        },
        {
            title: "Overdue",
            value: overdue,
            icon: AlertTriangle
        }
    ];

    return (
        <>
            <div className="stats-grid">

                {cards.map(card => {

                    const Icon = card.icon;

                    return (
                        <div className="stat-card" key={card.title}>

                            <div className="stat-top">

                                <span>{card.title}</span>

                                <div className="stat-icon">
                                    <Icon size={19} />
                                </div>

                            </div>

                            <strong>{card.value}</strong>

                        </div>
                    );
                })}

            </div>

            <div className="progress-card">

                <div>

                    <div className="progress-title">
                        <strong>Overall Progress</strong>
                        <span>{completion}%</span>
                    </div>

                    <div className="progress-track">
                        <div
                            className="progress-bar"
                            style={{ width: `${completion}%` }}
                        />
                    </div>

                </div>

                <div className="progress-info">
                    {lists} task lists
                </div>

            </div>
        </>
    );
}

export default Stats;