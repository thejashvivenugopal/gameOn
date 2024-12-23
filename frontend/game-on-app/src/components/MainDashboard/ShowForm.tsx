import React, { useState } from "react";
import '../../styles/MainDashBoard/DashBoard.css'
import '../../styles/MainDashBoard/button.css'

type eventAddedFormat = {


    onEventAdded: (newEvent: {
        eventType: string;
        eventHashId: string;
        eventStartTime: number;
        eventEndTime: number;
        amountPerHour: number;
        eventImageURL:string;


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
        
    }) => void

};

interface eventsAdd {
    eventName: string,
    eventType: string,
    eventStartTime: Number | undefined,
    eventEndTime: Number | undefined,
    amountPerHour: Number,
    eventImageURL:string,
    location: {
        zipCode: string,
        country: string,
        city: string,
        state: string,
        addressLineOne: string,
        addressLineTwo: string,
        locationLink:string

    }
}


function ShowForm({ onEventAdded }: eventAddedFormat) {
    const [eventDetails, setEventDetails] = useState<eventsAdd>({
        eventName : "",
        eventType: "",
        eventStartTime: 0,
        eventEndTime: 0,
        amountPerHour: 100,
        eventImageURL:"",
        location: {
            zipCode: "12345",
            country: "USA",
            city: "New York",
            state: "NY",
            addressLineOne: "123 Main St",
            addressLineTwo: "Suite 456",
            locationLink:""

        }
    });

    const [eventName, seteventName] = useState<string>('');
    const [eventStartTime, seteventStartTime] = useState<Number>(0);
    const [eventEndTime, seteventEndTime] = useState<Number>(0);
    const [eventType, seteventType] = useState<string>('');
    const [amountPerHour, setamountPerHour]= useState<Number>(100);
    const [imageURL, setImageURL] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');
    const [Country, setCountry] = useState<string>('');
    const [state, setState] = useState<string>('');

    const [city, setcity] = useState<string>('');
    const [addressLineOne, setaddressLineOne] = useState<string>('');
    const [addressLineTwo, setaddressLineTwo] = useState<string>('');
    const [locationLink, setLocationLink] = useState<string>('');


    const [isFormVisible, setIsFormVisible] = useState(true); 

  const handleClose = () => {// Hide the form when "Close" is clicked

    setIsFormVisible(false);
  };













    /*const handleSubmit = () => {
         setEventDetails()
        // const newEvent = { eventType, eventStartTime, eventEndTime };
         onEventAdded(newEvent); // Call the parent function
     };*/

    const addEvent = async (event: React.FormEvent) => {

        console.log("added event");
        event.preventDefault();
        try {

            eventDetails.eventName = eventName;
            eventDetails.eventImageURL = imageURL;
            eventDetails.amountPerHour = amountPerHour;


            eventDetails.eventEndTime = eventEndTime;
            eventDetails.eventStartTime = eventStartTime;
            eventDetails.eventType = eventType;
            eventDetails.location.country = Country;
            eventDetails.location.state = state;
            eventDetails.location.city = city;
            eventDetails.location.zipCode = zipCode;
            eventDetails.location.addressLineOne = addressLineOne;
            eventDetails.location.addressLineTwo = addressLineTwo;
            eventDetails.location.locationLink = locationLink;

            const userId: any = localStorage.getItem('userHashId');

            console.log("added event 1");


            const response = await fetch("http://localhost:3002/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ownerid": userId,
                    'Authorization' :`Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(eventDetails),
            });

            if (response.ok) {
                console.log("added event 2");

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
        isFormVisible && (

            <div className='form-overlay'>

            <form onSubmit={addEvent} className='form-content'>
            <button className="top-right-button1" onClick={handleClose}>X</button>

                <label htmlFor="eventname">Event Name : </label>
                <input type='text' id='eventname' onChange={(e) => seteventName((e.target.value))}/>
                {/* onChange={(e) => seteventType(e.target.value)} */}


                <label htmlFor='eventStartTime'>Event Start  time : </label>
                <input type='number' id='eventDate' onChange={(e) => seteventStartTime(Number(e.target.value))} />
                <label htmlFor='eventendtitme'>Event  end Time : </label>
                <input type='number' id='eventtime' onChange={(e) => seteventEndTime(Number(e.target.value))} />
                <label htmlFor='eventcategry'>CATEGORY : </label>
                <select className="dropdown-select" onChange={(e) => seteventType((e.target.value))}>
                    <option value="" disabled>
                        Select an option
                    </option>
                    <option value="CRICKET" id="CRICKET" >CRICKET</option>
                    <option value="FOOTBALL" id="FOOTBALL" >FOOTBALL</option>
                    <option value="HOCKEY" id="HOCKEY" >HOCKEY</option>
                </select>

                <label htmlFor="eventImage">IMAGE URL : </label>
                <input type='text' id='eventImageURL' onChange={(e) => setImageURL((e.target.value))}  />


                <label htmlFor="eventAmount">AMOUNT PER HOUR  : </label>
                <input type='number' id='eventAmount' onChange={(e) => setamountPerHour((Number(e.target.value)))}  />




                <label htmlFor="eventcountry">Country : </label>
                <input type='text' id='eventcountry' onChange={(e) => setCountry((e.target.value))} />
                <label htmlFor="eventstate">State : </label>
                <input type='text' id='eventstate' onChange={(e) => setState((e.target.value))} />

                <label htmlFor="eventCity">CITY : </label>
                <input type='text' id='eventCITY' onChange={(e) => setcity((e.target.value))} />
                <label htmlFor="zipcode">ZipCode : </label>
                <input type='text' id='zipcode' onChange={(e) => setZipCode((e.target.value))} />
                <label htmlFor="eventlocationone">Event Location 1 : </label>
                <input type='text' id='eventlocationone' onChange={(e) => setaddressLineOne((e.target.value))} />

                <label htmlFor="eventlocationone">Event Location 2: </label>
                <input type='text' id='eventlocationone' onChange={(e) => setaddressLineTwo((e.target.value))} />


                <label htmlFor="eventlocationone">Event Location URL: </label>
                <input type='text' id='eventlocationURL' onChange={(e) => setLocationLink((e.target.value))} />




                <input type="submit" />

            </form>

        </div>

        )

    )

}

export default ShowForm;