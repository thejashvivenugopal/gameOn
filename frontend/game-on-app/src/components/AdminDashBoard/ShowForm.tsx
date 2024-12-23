import React, { useState } from "react";
import '../../styles/MainDashBoard/DashBoard.css'

type eventAddedFormat = {


    onEventAdded: (newEvent: {
        eventType: string; eventStartTime: Date; eventEndTime: Date; amountPerHour: number; location: {
            zipCode: string,
            country: string,
            city: string,
            state: string,
            addressLineOne: string,
            addressLineTwo: string
        }
    }) => void

};

interface eventsAdd {
    eventType: string,
    eventStartTime: Date,
    eventEndTime: Date,
    amountPerHour: number,
    location: {
        zipCode: string,
        country: string,
        city: string,
        state: string,
        addressLineOne: string,
        addressLineTwo: string
    }
}


function ShowForm({ onEventAdded }: eventAddedFormat) {
    const [eventDetails, setEventDetails] = useState<eventsAdd>({
        eventType: "",
        eventStartTime: new Date(),
        eventEndTime: new Date(),
        amountPerHour: 100,
        location: {
            zipCode: "12345",
            country: "USA",
            city: "New York",
            state: "NY",
            addressLineOne: "123 Main St",
            addressLineTwo: "Suite 456"
        }
    });

    const [eventType, seteventType] = useState<string>('');
    const [eventStartTime, seteventStartTime] = useState<Date>(new Date());
    const [eventEndTime, seteventEndTime] = useState<Date>(new Date());





    /*const handleSubmit = () => {
         setEventDetails()
        // const newEvent = { eventType, eventStartTime, eventEndTime };
         onEventAdded(newEvent); // Call the parent function
     };*/

    const addEvent = async (event: React.FormEvent) => {
        event.preventDefault();
        try {

            eventDetails.eventEndTime = eventEndTime;
            eventDetails.eventStartTime = eventStartTime;
            eventDetails.eventType = eventType;

            const response = await fetch("http://localhost:9009/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ownerid": "6743a38159bbb54416482bf8",
                    'Authorization' :`Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(eventDetails),
            });

            if (response.ok) {
                const newAddedEvent = await response.json();
                setEventDetails(newAddedEvent);
                onEventAdded(newAddedEvent);
            }
        }
        catch (Error) {
            console.log("COULD NOT ADD NEW EVENT INTO DATABSE");

        }

    };

    return (
        <div className='form-overlay'>

            <form onSubmit={addEvent} className='form-content'>
                <label htmlFor="eventname">Event Name : </label>
                <input type='text' id='eventname' onChange={(e) => seteventType(e.target.value)} />
                <label htmlFor='eventStartTime'>Event Start  time : </label>
                <input type='date' id='eventDate' onChange={(e) => seteventStartTime(new Date(e.target.value))} />
                <label htmlFor='eventendtitme'>Event  end Time : </label>
                <input type='date' id='eventtime' onChange={(e) => seteventEndTime(new Date(e.target.value))} />
                <label htmlFor='eventcategry'>CATEGORY : </label>
                <select className="dropdown-select" >
                    <option value="" disabled>
                        Select an option
                    </option>
                    <option value="CRICKET">Option 1</option>
                    <option value="FOOTBALL">Option 2</option>
                    <option value="HOCKEY">Option 3</option>
                </select>
                <label htmlFor="eventcountry">Country : </label>
                <input type='text' id='eventcountry' onChange={(e) => seteventType(e.target.value)} />
                <label htmlFor="eventstate">State : </label>
                <input type='text' id='eventstate' onChange={(e) => seteventType(e.target.value)} />
                <label htmlFor="zipcode">ZipCode : </label>
                <input type='text' id='zipcode' onChange={(e) => seteventType(e.target.value)} />
                <label htmlFor="eventlocationone">Event Location : </label>
                <input type='text' id='eventlocationone' onChange={(e) => seteventType(e.target.value)} />

                <label htmlFor="eventlocationone">Event Location : </label>
                <input type='text' id='eventlocationone' onChange={(e) => seteventType(e.target.value)} />

                <input type="submit" />

            </form>

        </div>

    )

}

export default ShowForm;