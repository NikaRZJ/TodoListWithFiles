import dayjs from 'dayjs';
import './TaskListItem.css';

const TaskListItem = (props) => {
    /** Деструктуризация пропсов */
    const { title, description, dateEnd, fileUrls, onToggleProp, done, onDelete, onChangeValue } = props;
    /** Переменная содержащая имена классов для элемента списка */
    let classNames = "list-group-item d-flex justify-content-between align-items-start";

    /**
     * Если пропс done == true то добавляется класс success
     */
    if (done) {
        classNames += ' done list-group-item-success';
    }

    const minMax = require('dayjs/plugin/minMax');

    dayjs.extend(minMax);

    /**
     * Если сегодняшняя дата больше даты окончания задачи и день сегодняшней даты неравен дню даты окончания
     * то к элементу добавляется класс danger и выключается кнопка подтверждения выполения задачи
     */
    if (dayjs.min(dayjs(), dateEnd) === dateEnd && dayjs().$D !== dateEnd.$D) {
        classNames += ' list-group-item-danger';
        document.getElementById('check').disabled = true;
    }

    /**
     * Генерация массива верстки для ссылок на прикрепленные файлы
     */
    const arrFileUrls = fileUrls.map(item => {
        let fileName = [],
            j = 0,
            fileNameInd = item.indexOf("files%2F") + 8;
        for (let i = fileNameInd; i < item.length; i++) {
            if (item[i] === '?') {
                break;
            } else {
                fileName[j] = item[i];
                j++;
            }
        }
        fileName = fileName.join('').split('%20').join(' ');

        return (
            <div><a href={item} style={{ 'fontSize': '15px' }}>{fileName}</a></div>
        )
    })

    return (
        <li className={classNames}>
            <div className="ms-2">
                <input type='text' name='title' defaultValue={title} style={{ 'fontWeight': 'bold' }} onChange={onChangeValue} />
                <textarea type='text' name='description' defaultValue={description} onChange={onChangeValue} />
            </div>

            <div>{arrFileUrls}</div>

            <div className="d-flex justify-content-center align-items-center">
                <input
                    type='date'
                    name='dateEnd'
                    defaultValue={`${dateEnd.$y}-${dateEnd.$M < 10 ? `0${dateEnd.$M}` : `${dateEnd.$M}`}-${dateEnd.$D}`}
                    onChange={onChangeValue}
                />
                <button
                    type="button"
                    className="btn-trash btn-sm"
                    onClick={onDelete}
                >
                    <i className="fas fa-trash"></i>
                </button>
                <button
                    className='btn-sm'
                    type='button'
                    onClick={onToggleProp}
                    data-toggle='done'
                    id='check'
                >
                    <i className="fas fa-check" ></i>
                </button>

            </div>
        </li >
    )
}

export default TaskListItem;