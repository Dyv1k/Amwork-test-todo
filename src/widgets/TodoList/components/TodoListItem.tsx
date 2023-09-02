import { FC } from "react";

import { SERVER_URL, ListItemExtendsType, SEPARATOR_DESCRIPTION, SEPARATOR_TITLE } from "../config";
import { formatDate } from "../../../interface/formatDate"; 
import { splitString } from "../../../interface/splitString";

import photo from '../images/photo.svg'

import './TodoListItem.scss'


const TodoListItem: FC<{props: ListItemExtendsType}> = ({props}) => {

    const {userId, id, title, completed, description, startDate, endDate, tags} = props

    return (
        <a 
            className="todo__list-item" 
            href={`${SERVER_URL}/${id}`} 
            target="_blank" 
            rel="noopener noreferrer"
        >
            <div className="todo__list-item__header">
                <input 
                    className="todo__list-item__checkbox" 
                    type="checkbox" 
                    name="completed"
                    readOnly
                    checked={completed} 
                />
                <h2 className="title">{splitString(title, SEPARATOR_TITLE)}</h2>
            </div>
            <div className="todo__list-item__date">
                <div className="todo__list-item__date-item">{formatDate(startDate)}</div>
                <div className="todo__list-item__date-item">{formatDate(endDate)}</div>
            </div>
            <div className="todo__list-item__description">{splitString(description, SEPARATOR_DESCRIPTION)}</div>
            <div className="todo__list-item__footer">
                <div className="todo__list-item__tags">
                    {tags.map((tag, index)=>(
                        <div key={index} className="todo__list-item__tags-item">{tag}</div>
                    ))}
                </div>
                <img className="todo__list-item__photo" src={photo} alt={`${title} photo`}/>
            </div>
        </a>
    )
}

export default TodoListItem