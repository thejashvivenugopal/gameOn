import React, { useEffect } from 'react'
import '../../styles/MainDashBoard/DashBoard.css'
import ShowForm from './ShowForm';
import HorizantalNavBar from './HoriantalNavBar.tsx';
import Aside from './Aside';
import FormExpand from './FromExpand';
import { eventsApi } from '../../apis/endpoints.ts';
import LangButtons from '../languageButtons/LangButtons.tsx';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


type Event = {

    eventType: string;
    eventHashId: string;
    eventStartTime: number;
    eventEndTime: number;
    amountPerHour: number;
    eventImageURL: string;


    owner: {
        accountNumber: string;
        bankCode: string;
        zelleId: string;
        user: {
            firstName: string;
            lastName: string;
            emailId: string;
            mobileNumber: string;
            login: boolean;
            loginCounts: number;
            createdDate: Date;
            modifiedDate: Date;
            createdBy: string;
            modifiedBy: string;
        };
        __v: number;
    };
    location: {
        zipCode: string;
        country: string;
        city: string;
        state: string;
        addressLineOne: string;
        addressLineTwo: string;
        locationLink: string;
        createdDate: Date;
        modifiedDate: Date;
        createdBy: string;
        modifiedBy: string;
        __v: number;
    };
    createdDate: Date;
    modifiedDate: Date;
    createdBy: string;
    modifiedBy: string;
    __v: number;

};




export default function MainDashboard() {
    console.log("owner dash");

    const [isVisible, setVisibleState] = React.useState(false);
    const [eventData, seteventData] = React.useState<Event[]>([]);

    const [isFormVisible, setFormVisible] = React.useState(false);

    const [eventDetails, setEventDetails] = React.useState<any | null>(null);

    const expandForm = (event: React.MouseEvent<HTMLDivElement>, selectedEvent: any) => {
        event.stopPropagation();
        setEventDetails(selectedEvent);
        setFormVisible(true); // Show the modal form when the card is clicked
    };

    const closeForm = () => {
        setFormVisible(false); // Close the modal when the close button is clicked
    };



    useEffect(() => {
        // Fetch event data for the logged-in owner
        async function getEventData() {
            try {
                const userId: any = localStorage.getItem('userHashId');
                const eventsResponse = await fetch('http://localhost:3002/owners/events', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ownerid': userId,
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!eventsResponse.ok)
                    throw new Error("Failed to fetch events");

                const data: Event[] = await eventsResponse.json();
                seteventData(data);

            }
            catch (Error) {
                console.log("Error in fetching Events " + Error);
            }
        }
        getEventData();

    }, []);


    function createForm() {
        setVisibleState(!isVisible);
    }

    /*function reRenderUi(newEvent:{eventType: String , eventStartTime: String, eventEndTime: String}) =>
    {
        seteventData((prev) => [...prev, newEvent]);

    }*/
    const reRenderUi = (newEvent: {
        eventType: string;
        eventHashId: string;
        eventStartTime: number;
        eventEndTime: number;
        amountPerHour: number;
        eventImageURL: string;


        owner: {
            accountNumber: string;
            bankCode: string;
            zelleId: string;
            user: {
                firstName: string;
                lastName: string;
                emailId: string;
                mobileNumber: string;
                login: boolean;
                loginCounts: number;
                createdDate: Date;
                modifiedDate: Date;
                createdBy: string;
                modifiedBy: string;
            };
            __v: number;
        };
        location: {
            zipCode: string;
            country: string;
            city: string;
            state: string;
            addressLineOne: string;
            addressLineTwo: string;
            locationLink: string;
            createdDate: Date;
            modifiedDate: Date;
            createdBy: string;
            modifiedBy: string;
            __v: number;
        };
        createdDate: Date;
        modifiedDate: Date;
        createdBy: string;
        modifiedBy: string;
        __v: number;
    }) => {

        seteventData((prev) => [...prev, newEvent]); // Add new event to the state
    };

    const { t } = useTranslation('ownerAside')

    return (
        <>
            <div className="Dashboard">

                {/* Horizontal Navigation Bar */}
                <HorizantalNavBar />


                <div className='content'>
                    {/* Sidebar */}
                    <Aside />
                    <div className='MainContent'>

                        <button onClick={createForm} className="createButton">
                            + {t('owner.button.create')}
                        </button>
                        {isVisible && <ShowForm onEventAdded={reRenderUi} />}

                        {eventData.length > 0 ? (
                            eventData.map((event) => (

                                <div className='event' onClick={(e) => expandForm(e, event)}>
                                    <img src={event.eventImageURL} alt="Event Location" style={{ width: '200px', height: '110px' }} />
                                    <h1>
                                        {event.eventType}
                                    </h1>

                                    <p className='location'>
                                        <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '8px', color: 'red' }} />
                                        < a href={event.location.locationLink}>GET DIRECTIONS</a>
                                    </p>

                                </div>


                            ))
                        ) :
                            (<div className="placeholder">
                                <p>No events available</p>
                                <img src="..\src\assets\images\placeholder.png" alt="No Events" />
                            </div>


                            )}

                        {isFormVisible && <FormExpand eventDetails={eventDetails} onClose={closeForm} />}


                    </div>
                </div>
            </div>
        </>
    )
}
