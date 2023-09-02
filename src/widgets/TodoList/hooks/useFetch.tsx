import { useState } from "react";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { ListItemType, ListItemExtendsType } from "../config";

export const useFetching = (
    params: string[],
    url: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    useStateList: [
        [] | ListItemExtendsType[],
        React.Dispatch<React.SetStateAction<ListItemExtendsType[] | []>>
    ],
    setTotalPages: React.Dispatch<React.SetStateAction<number>>
) => {

    const [error, setError] = useState<string>('');

    const [stateList, setStateList] = useStateList

    const changeResponseList = <T extends ListItemType[]>(list: T): ListItemExtendsType[] => {
        const uniqueDates = new Set();

        return list.map((item)=>{

            let startDate = faker.date.future();
            let endDate = faker.date.future();

            while (uniqueDates.has(startDate.toString())) {
                startDate = faker.date.future();
            }
            while (uniqueDates.has(endDate.toString())) {
                endDate = faker.date.future();
            }
            
            return {
                ...item,
                description: faker.lorem.sentence({min: 60, max: 100}),
                startDate,
                endDate,
                tags: ['Entity title', 'Front-end'],
            }
        })
    }

    const fetching = async () => {
        setIsLoading(true)

        const returnData = axios.get(`${url}?_${params.join('&_')}`)
            .then(response => {
                const returnList = changeResponseList(response.data)
                setTotalPages(response.headers['x-total-count'])
                setStateList([...stateList, ...returnList])
            })
            .catch(error => {
                setError(error.message);
                return []
            })
            .finally(()=>{
                setIsLoading(false);
            });
        
        return returnData
    }

    return fetching
}