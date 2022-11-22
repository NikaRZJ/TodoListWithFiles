import { useEffect, useState } from 'react';
import { storage } from '../../utils/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import './TaskAddForm.css';

const TaskAddForm = (props) => {
    /** Создание состояний для свойств добавляемого элемента */

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [fileUrls, setFileUrls] = useState([]);
    const [progresspercent, setProgresspercent] = useState(0);
    const [submitButtonStatus, setSubmitButtonStatus] = useState(false);

    /**
     * Отслеживание изменений состояния загрузки файла, если состояние равно 100 то кнопка добавления элемента разблокируется */
    useEffect(() => {
        if (progresspercent == 100) { // eslint-disable-line
            setSubmitButtonStatus(false)
        }
    }, [progresspercent])

    /**
     * Функция меняет значения состояний при вводе в input-поля
     * @constructor
     * @param {event} e - событие
     */
    const onValueChange = (e) => {
        const value = e.target.value;
        switch (e.target.name) {
            case 'title':
                setTitle(value)
                break;
            case 'description':
                setDescription(value);
                break;
            case 'dateEnd':
                setDateEnd(value);
                break;
            default:
                break;
        }
    }

    /**
     * Фукнция загружает файлы на сервер firebase и изменяет значения состояний 
     * (добавляет ссылки в массив, включает-выключает кнопку добавления элемента, при загрузке файла меняет состояние загрузки файла)
     * @constructor
     * @param {event} e - событие
     */
    const downloadFiles = (e) => {
        let files = e.target.files;
        let newFileUrls = [...fileUrls];
        if (files) {
            for (let i = 0; i < files.length; i++) {
                setSubmitButtonStatus(true);
                const storageRef = ref(storage, `files/${files[i].name}`);
                const uploadTask = uploadBytesResumable(storageRef, files[i]);

                uploadTask.on("state_changed",
                    (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        setProgresspercent(progress);
                    },
                    (error) => {
                        alert(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                            newFileUrls.push(downloadUrl);
                            setSubmitButtonStatus(false);
                        });
                    },
                )
            }
            setFileUrls(newFileUrls);
        }
    }
    /**
     * Функция срабатывает на событие submit которое генерируется при нажатии на кнопку добавления элемента
     * и добавляет все данные введенные в форму в state компонента App
     * @constructor
     * @param {event} e - событие
     */
    const onSubmit = (e) => {
        e.preventDefault();
        if (title.length > 2) {
            props.onAdd(title, description, dateEnd, fileUrls);
            setTitle('');
            setDescription('');
            setDateEnd('');
            setFileUrls([]);
            setProgresspercent(0);
            setSubmitButtonStatus(false);
            e.target[3].value = e.target[3].defaultValue;
        }
    }

    return (
        <div className="app-add-form">
            <h3>Добавить новое дело</h3>
            <form
                className="add-form d-flex"
                onSubmit={onSubmit}
            >
                <input type="text"
                    value={title}
                    className="form-control new-post-label"
                    placeholder="Заголовок"
                    onChange={onValueChange}
                    name="title"
                />
                <input type="text"
                    value={description}
                    className="form-control new-post-label"
                    placeholder="Описание"
                    onChange={onValueChange}
                    name="description"
                />
                <input type="date"
                    value={dateEnd}
                    className="form-control new-post-label"
                    onChange={onValueChange}
                    name="dateEnd"
                />
                <input type='file'
                    name="fileUrls"
                    onInput={downloadFiles}
                    multiple="multiple"
                />
                <button
                    type="submit"
                    className="btn btn-outline-light"
                    disabled={submitButtonStatus}
                >
                    Добавить
                </button>
            </form>
        </div>
    )
}

export default TaskAddForm;