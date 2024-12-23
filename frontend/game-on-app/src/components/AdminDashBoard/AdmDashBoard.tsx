import React, { useEffect } from 'react';
import '../../styles/MainDashBoard/DashBoard.css';
import HorizantalNavBar from './HoriantalNavBar.tsx';
import Aside from './Aside.tsx';
import { eventsApi, customersApi } from '../../apis/endpoints.ts';

type Event = {
    eventType: String,
    eventStartTime: Date,
    eventEndTime: Date
};

export default function AdminDashboard() {

    const [eventData, seteventData] = React.useState<Event[]>([]);

    useEffect(() => {
        async function getEventData() {
            try {
                const userId: any = localStorage.getItem('userId');
                const eventsResponse = await fetch('http://localhost:3002/owners/events', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ownerid': userId,
                        'Authorization' :`Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!eventsResponse.ok)
                    throw new Error("Failed to fetch events");

                const data: Event[] = await eventsResponse.json();
                seteventData(data);

            } catch (Error) {
                console.log("Error in fetching Events " + Error);
            }
        }
        getEventData();
    }, []);

    const reRenderUi = (newEvent: { eventType: string; eventStartTime: Date; eventEndTime: Date }) => {
        seteventData((prev) => [...prev, newEvent]); // Add new event to the state
    };

    return (
        <div className="Dashboard">
            <HorizantalNavBar />

            <div className='content'>
                <Aside />
                <div className='MainContent'>
                    {eventData.length > 0 ? (
                        eventData.map((event) => (
                            <div className='event' key={event.eventStartTime.toString()}>
                                <img src='..\\src\\assets\\images\\editicon.png' alt="Edit Icon" />
                                <h1>{event.eventType}</h1>
                                <p>{event.eventStartTime.toLocaleString().substring(0, 10)}</p>
                                <p>{event.eventEndTime.toLocaleString().substring(0, 10)}</p>
                            </div>
                        ))
                    ) : (
                        <div className="placeholder">
                            <p>No events available</p>
                            <img src="..\\src\\assets\\images\\placeholder.png" alt="No Events" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
