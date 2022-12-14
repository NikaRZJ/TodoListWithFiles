import { useState } from 'react';
import uuid from 'react-uuid';
import * as dayjs from 'dayjs';

import './App.css';
import TaskAddForm from './components/TaskAddForm/TaskAddForm';
import TaskHeader from './components/TaskHeader/TaskHeader';
import TaskList from './components/TaskList/TaskList';

function App() {
    /** Создание состояния для данных */
    const [data, setData] = useState([
        { title: 'Сделать Тестовое', description: 'Тестовое задание для WomanUp', dateEnd: dayjs(new Date(2022, 11, 22)), fileUrls: [], id: uuid(), done: false },
        { title: 'Сходить на собеседование', description: 'Адрес: Октябрьская 34', dateEnd: dayjs(new Date(2022, 11, 18)), fileUrls: [], id: uuid(), done: true }
    ])
    /** 
     * Функция меняет состояние (в данном случае) done на противоположное 
     * @construcor
     * @param {string} id - id элемента
     * @param {boolean} prop - свойсвто которое нужно поменять*/
    const onToggleProp = (id, prop) => {
        setData(data.map(item => {
            if (item.id === id) {
                return { ...item, [prop]: !item[prop] }
            }
            return item;
        }))
    }

    /**
     * Фукция меняет значение свойства state на то, которое было прописано в input.
     * @constructor
     * @param {string} id - id элемента
     * @param {string} prop - свойство которое нужно поменять
     * @param {string} value - значение которое нужно записать в свойство
     */
    const onChangeValue = (id, prop, value) => {
        if (!isNaN(Date.parse(value))) {
            setData(data.map(item => { // eslint-disable-line
                if (item.id === id) {
                    return { ...item, [prop]: dayjs(value) }
                }
                return item;
            }))
        } else {
            setData(data.map(item => { // eslint-disable-line
                if (item.id === id) {
                    return { ...item, [prop]: value }
                }
                return item;
            }))
        }
    }
    /**
     * Функция удаляет элемент по его id
     * @constructor
     * @param {string} id - id элемента
     */
    const deleteItem = (id) => {
        const newArr = data.filter(item => item.id !== id);
        setData(newArr);
    }

    /**
     * Функция добавляет элемент в список задач
     * @constructor
     * @param {string} title - название задачи
     * @param {string} description - описание задачи
     * @param {Date} dateEnd - дата окончания задачи
     * @param {string[]} fileUrl - маccив ссылок на прикрепленные файлы
     */

    const addItem = (title, description, dateEnd, fileUrl) => {
        const newObj = {
            title,
            description,
            dateEnd: dayjs(dateEnd),
            fileUrls: fileUrl,
            id: uuid(),
            done: false
        }

        console.log(newObj.dateEnd);
        const newArr = [...data, newObj];
        setData(newArr);
    }

    return (
        <div className="App">
            <TaskHeader />
            <TaskList data={data} onToggleProp={onToggleProp} onDelete={deleteItem} onChangeValue={onChangeValue} />
            <TaskAddForm onAdd={addItem} />
        </div>
    );
}

export default App;
