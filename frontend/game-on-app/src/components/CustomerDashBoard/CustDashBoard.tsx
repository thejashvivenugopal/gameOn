import React, { useEffect } from 'react'
import '../../styles/MainDashBoard/DashBoard.css'
import ShowForm from './ShowForm';
import HorizantalNavBar from './HoriantalNavBar';
import Aside from './Aside';
import FormExpand from './FormExpand.tsx';
import { eventsApi } from '../../apis/endpoints.ts';
import LangButtons from '../languageButtons/LangButtons.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.tsx';
import { fetchSlots } from '../../redux/slices/customerDashBoardSlice.tsx';


type NestedEvents = {
    slots: Slots[];
}[];

type Slots = {
    slotDate: Date;
    slotTime: number;
    event: {
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
    available: boolean;
    __v: number;
};


export default function MainDashboard() {
    const eventData = useSelector((state: RootState) => state.slots.SlotsData);
    const dispatch = useDispatch<AppDispatch>();
    const [isVisible, setVisibleState] = React.useState(false);
    // const [eventData, seteventData] = React.useState<NestedEvents[]>([]);

    const [isFormVisible, setFormVisible] = React.useState(false);

    const [eventDetails, setEventDetails] = React.useState<Slots[] | null>([]);

    const expandForm = (event: React.MouseEvent<HTMLDivElement>, selectedEvent: Slots[]) => {

        console.log(selectedEvent);

        event.stopPropagation();
        setEventDetails(selectedEvent);
        setFormVisible(true);
        console.log(eventDetails);
        console.log(isFormVisible);
    };


    const closeForm = () => {
        setFormVisible(false);
    };



    useEffect(() => {
        dispatch(fetchSlots());
    }, []);


    function createForm() {
        setVisibleState(!isVisible);
    }

    return (
        <>

            <div className="Dashboard">


                <HorizantalNavBar />


                <div className='content'>

                    <Aside />
                    <div className='MainContent'>



                        {eventData.length > 0 ? (
                            eventData.map((event: any, index) => (


                                <div className='event' key={index}>
                                    <img src={event[index].event.eventImageURL} alt="Event Location" style={{ width: '200px', height: '110px' }} onClick={() => {
                                        console.log("==================================");

                                        event.forEach((slo: any) => {
                                            console.log(typeof (slo));
                                            console.log((typeof (slo.slotTime)));
                                            console.log(slo.event.eventImageURL);

                                        });
                                        console.log(event[0]);
                                        console.log(event[1]);



                                        console.log("==================================");
                                    }} />

                                    <h1>
                                        {event[index].event.eventType}
                                    </h1>





                                    <p className='location'>
                                        <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '8px', color: 'red' }} />
                                        < a href={event[index].event.location.locationLink}>GET DIRECTIONS</a>


                                    </p>

                                    {/* <p>
                                {event[0].slots[0].event.location.addressLineOne}
                                </p>
                                <p>
                                    <img src="../../assets/images/kaushikwebproject.jpg" alt="Image" />

                                </p> */}

                                    <button className='booknowcust' onClick={(e: any) => expandForm(e, event)}>
                                        BOOK NOW
                                    </button>

                                </div>


                            ))
                        ) :
                            (<div className="placeholder">
                                <p>No events available</p>
                                <img src="..\src\assets\images\placeholder.png" alt="No Events" />
                            </div>


                            )}


                        {isFormVisible && eventDetails && <FormExpand eventDetails={eventDetails} onClose={closeForm} />}


                    </div>
                </div>
            </div>
        </>

    )
}