import {createContext, useContext, useState} from 'react';
import { STATUS_FILTER } from '../constants/TaskFilterStatus';

const initialState= STATUS_FILTER.ALL; //all

const FilterStatusContext = createContext(initialState);

export const FilterStatusProvider = ({children}) => {

    const [currentTasksFilter, setCurrentTasksFilter] = useState(initialState);

    return (
        <FilterStatusContext.Provider value={{currentTasksFilter, setCurrentTasksFilter}}>
            {children}
        </FilterStatusContext.Provider>
    );
};

export const useFilterStatus = () => useContext(FilterStatusContext);