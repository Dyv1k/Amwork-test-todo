import { FC, useEffect, useState, ReactNode, Fragment, useRef } from "react";

import TodoListItem from "./components/TodoListItem";

import { useFetching } from "./hooks/useFetch";
import { SERVER_URL, ListItemExtendsType } from "./config";

import plus_img from './images/plus.svg'

import './TodoList.scss'
import { useObserver } from "./hooks/useObserver";

const TodoList: FC = () => {

    const [todoList, setTodoList] = useState<ListItemExtendsType[] | []>([])
    const [todoListCount, setTodoListCount] = useState<number>(0)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [fetchParams, setFetchParams] = useState(1) //JSONPlaceholder "_page" option
    const [isLoading, setIsLoading] = useState(false);

    const lastTodoItem = useRef<HTMLElement>(null)

    const fetchPosts = useFetching(
        [`page=${fetchParams}`], 
        SERVER_URL, 
        setIsLoading, 
        [todoList, setTodoList],
        setTotalCount,
    )

    useObserver({
        ref: lastTodoItem, 
        canLoad: fetchParams < (totalCount / 10), 
        isLoading: isLoading, 
        callback: ()=>{
            setFetchParams( fetchParams + 1)
        }
    })

    const setItems = (): ReactNode => {
        return todoList.map((item, index) => {
            return (
                <Fragment key={item.id}>
                    {index !== todoList.length-1 ? (
                        <TodoListItem props={item} />
                    ):(
                        <>
                            <span ref={lastTodoItem}></span>
                            <TodoListItem props={item} />
                        </>
                    )}
                </Fragment>
            )
        })
    }

    useEffect(() => {
        fetchPosts()
    }, [fetchParams]);

    useEffect(()=>{
        if (todoList.length) {
            console.log('todoList', todoList)
            setTodoListCount(todoList.length)
        }
    }, [todoList])

    return (
        <div className={!isLoading? "todo" : "todo todo_loading"}>
            <div className="todo__header">
                <h1 className="title">Today</h1>
                <div className="todo__header__wrapper">
                    <img className="todo__header__img" src={plus_img} alt={"todo plus"} />
                    <div className="todo__header__count">{todoListCount}</div>
                </div>
            </div>
            <ul className="todo__list">
                {setItems()}
            </ul>
        </div>
    )
}

export default TodoList