import { RefObject } from "react"


export type ListItemType = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export type ListItemExtendsType = ListItemType & {
    description: string,
    startDate: Date,
    endDate: Date,
    tags: [string, string],
}

export type observerType = {
    ref: RefObject<Element>,
    canLoad: boolean,
    isLoading: boolean,
    callback: () => void
}

export const SERVER_URL = 'https://jsonplaceholder.typicode.com/todos'
export const SEPARATOR_TITLE = 90;
export const SEPARATOR_DESCRIPTION = 32;