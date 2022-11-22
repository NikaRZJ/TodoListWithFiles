import TaskListItem from "../TaskListItem/TaskListItem";
import './TaskList.css';

const TaskList = ({ data, onToggleProp, onChangeValue, onDelete }) => {
    /**
     * Генерация списка элементов и передача пропсов
     */
    const elements = data.map(item => {
        const { id, ...itemProps } = item;
        return (
            <TaskListItem
                key={id}
                {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                onChangeValue={(e) => onChangeValue(id, e.currentTarget.name, e.currentTarget.value)}
            />
        )
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default TaskList;