import { Fragment } from "react";
import { Topbar } from "../../components/Topbar";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';
import { useScreenViewPort } from "../../components/hooks/useScreenViewPort";
import { SCREEN_VIEWPORT } from './../../constants/ViewPort';
import { Input } from "../../components/Input";
import { FormGroup } from "../../globalStyles";
import { FaSearch } from 'react-icons/fa'

const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Tarea 1',
        start: new Date(),
        end: new Date()
    }
];

const CALENDAR_VIEW_MODE = {
    DAY: 'day',
    WEEK: 'week'
};

const Schedule = ({title}) => {

    const [calendarDefaultView, setCalendarDefaultView] = useState(null);
    const [loading, setLoading] = useState(true);
    const {screenViewport} = useScreenViewPort();


    useEffect( () => { 
        const bootstrap = async () => {
            await setLoading(true);
            if(screenViewport) {
                await setCalendarDefaultView (
                    screenViewport === SCREEN_VIEWPORT.DESKTOP 
                    ? CALENDAR_VIEW_MODE.WEEK 
                    : CALENDAR_VIEW_MODE.DAY 
                );
                await setLoading(false);
            }
        }
        bootstrap();
    }, [screenViewport])

    return (
        <Fragment>
            <Topbar title={title}/>
            <FormGroup>
                <Input type="text" placeholder="search..." icon={FaSearch} />
            </FormGroup>
            {
                !loading && 
                    <Calendar 
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{height: '70hv'}}
                    defaultView={calendarDefaultView}
                    views={['month', 'week', 'day']}
                />
            }
            
        </Fragment>
    )
    
}

export default Schedule;