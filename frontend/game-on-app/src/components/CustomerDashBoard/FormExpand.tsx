// import React from "react";
// import '../../styles/CustomerDashBoard/CustDashBoard.css'
// import CustomerDashBoard from './CustDashBoard.tsx';

// type slots = {


//   slotDate: Date;
//   slotTime: number;
//   event: {
//     eventType: string;
//     eventHashId: string;
//     eventStartTime: number;
//     eventEndTime: number;
//     amountPerHour: number;
//     owner: {
//       accountNumber: string;
//       bankCode: string;
//       zelleId: string;
//       user: {
//         firstName: string;
//         lastName: string;
//         emailId: string;
//         mobileNumber: string;
//         login: boolean;
//         loginCounts: number;
//         createdDate: Date;
//         modifiedDate: Date;
//         createdBy: string;
//         modifiedBy: string;
//       };
//       __v: number;
//     };
//     location: {
//       zipCode: string;
//       country: string;
//       city: string;
//       state: string;
//       addressLineOne: string;
//       addressLineTwo: string;
//       createdDate: Date;
//       modifiedDate: Date;
//       createdBy: string;
//       modifiedBy: string;
//       __v: number;
//     };
//     createdDate: Date;
//     modifiedDate: Date;
//     createdBy: string;
//     modifiedBy: string;
//     __v: number;
//   };
//   available: boolean;
//   __v: number;
// };




// type FormExpandProps = {

//   eventDetails: slots[];

//   onClose: () => void;
// }



// const FormExpand = ({ eventDetails, onClose }: FormExpandProps) => {



//   const [selectedTimings, setSelectedTimings] = React.useState<number[]>([]);
//   const [uniqueDates, setUniqueDates] = React.useState<string[]>([]);
//   const [selectedDate, setSelectedDate] = React.useState<string>("");
//   const [reRender, setReRender] = React.useState<boolean>(false);


//   const handleSlotClick = (time: number) => {

//     if (selectedTimings.includes(time)) {
//       setSelectedTimings(prev => prev.filter(t => t !== time));
//     } else {
//       setSelectedTimings(prev => [...prev, time]);
//     }
//   };
//   console.log('HI ENTERED FORM EXPAND ');
//   console.log(eventDetails);

//   eventDetails.map((event, index) => (

//     console.log(event.slotTime)

//   ))

//   React.useEffect(() => {
//     const dates = [...new Set(eventDetails.map((event) => event.slotDate.toLocaleString()))];
//     setUniqueDates(dates);
//     console.log("dates " + uniqueDates)


//     if (dates.length > 0) {
//       setSelectedDate(dates[0]);
//     }
//   }, [eventDetails]);


//   React.useEffect(() => {
//     console.log("Selected Date Updated:", selectedDate);
//   }, [selectedDate]);


//   const filteredSlots = eventDetails.filter(
//     (event) => event.slotDate.toLocaleString() === selectedDate
//   );


//   React.useEffect(() => {
//     if (reRender) {
//       console.log("ReRender is now true");

//     }
//   }, [reRender]);

//   console.log(selectedDate);

//   console.log("ssssss " + filteredSlots.length);

//   filteredSlots.forEach((slot) => {
//     console.log(slot);
//   });



//   const handleLedgerCreation = async () => {

//     if (selectedTimings.length === 0) {
//       alert("Please select at least one slot before proceeding.");
//       return;
//     }

//     console.log(eventDetails[0].event);
//     console.log(eventDetails[0].event.eventHashId);


//     const userId: any = localStorage.getItem('userHashId');

//     const ledgerData = {


//       startTime: selectedTimings,
//       eventBookedDate: selectedDate,
//       amount: 200,
//       noOfHours: 1,
//       debit: false,
//       public: true,
//       noOfPlayers: 22
//     }


//     console.log(eventDetails.length);
//     try {
//       const response = await fetch("http://localhost:3002/ledgers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "customerId": userId,
//           "eventId": eventDetails[0].event.eventHashId,
//           'Authorization' :`Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(ledgerData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create ledger");
//       }

//       const result = await response.json();
//       console.log("Ledger created:", result);
//       alert("ADDED TO CART SUCCESFULLY !");


//       onClose();
//       window.location.reload();

//       // console.log("seeting to true");
//       // setReRender(true);



//     } catch (error) {
//       console.error("Error creating ledger:", error);
//       alert("Failed to create ledger. Please try again.");
//     }
//   };

//   return (

//     <>
//       {reRender ? (

//         <CustomerDashBoard />
//       ) : (

//         <div className="modal-overlay" onClick={onClose}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h2>Edit Event</h2>
//             <form>
//               <label>Event Type</label>
//               <input type="text" value={eventDetails[0].event.eventType} readOnly />

//               <label>Event Date</label>
//               <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
//                 {uniqueDates.map((date, index) => (
//                   <option key={index} value={date}>
//                     {date}
//                   </option>
//                 ))}
//               </select>

//               <label>Event Start Time</label>
//               <input type="text" value={eventDetails[0].slotTime + "00 HRS"} readOnly />

//               <label>Event Country</label>
//               <input type="text" value={eventDetails[0].event.location.country} readOnly />

//               <label>Event State</label>
//               <input type="text" value={eventDetails[0].event.location.state} readOnly />

//               <label>Event Location 1</label>
//               <input type="text" value={eventDetails[0].event.location.addressLineOne} readOnly />

//               <label>Event Location 2</label>
//               <input type="text" value={eventDetails[0].event.location.addressLineTwo} readOnly />

//               <label>Amount per Hour</label>
//               <input type="text" value={eventDetails[0].event.amountPerHour} readOnly />

//               <div className="modal-slot-container">
//                 {filteredSlots.map((slot, index) => (
//                   <button
//                     key={index}
//                     type="button"
//                     onClick={() => handleSlotClick(slot.slotTime)}
//                     className={selectedTimings.includes(slot.slotTime) ? "clicked" : ""}
//                   >
//                     {slot.slotTime + ":00 "}
//                   </button>
//                 ))}
//               </div>

//               <button type="button" className="booknow" onClick={handleLedgerCreation}>
//                 BOOK NOW
//               </button>
//             </form>
//             <button className="close-btn" onClick={onClose}>
//               X
//             </button>
//           </div>
//         </div>
//       )}
//     </>


//   )
// };

// export default FormExpand;

import React from "react";
import '../../styles/CustomerDashBoard/CustDashBoard.css'
import CustomerDashBoard from './CustDashBoard.tsx';

type slots = {


  slotDate: Date;
  slotTime: number;
  event: {
    eventType: string;
    eventHashId: string;
    eventStartTime: number;
    eventEndTime: number;
    amountPerHour: number;
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




type FormExpandProps = {

  eventDetails: slots[];

  onClose: () => void;
  isBooking?: boolean; // Optional prop to determine context (Customer Dashboard or Bookings)

}



const FormExpand = ({ eventDetails, onClose, isBooking }: FormExpandProps) => {


  const [amountPerHour, setamountPerHour] = React.useState<number>(100);
  const [selectedTimings, setSelectedTimings] = React.useState<number[]>([]);
  const [uniqueDates, setUniqueDates] = React.useState<string[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<string>("");
  const [reRender, setReRender] = React.useState<boolean>(false);

  var totalamount =0;

  

  const handleSlotClick = (time: number) => {

    if (selectedTimings.includes(time)) {
      setSelectedTimings(prev => prev.filter(t => t !== time));
    } else {
      setSelectedTimings(prev => [...prev, time]);
    }
  };

  console.log('HI ENTERED FORM EXPAND ');
  console.log(eventDetails);

  eventDetails.map((event, index) => (

    console.log(event.slotTime)

  ))

  React.useEffect(() => {
    const dates = [...new Set(eventDetails.map((event) => event.slotDate.toLocaleString()))];

    setUniqueDates(dates);
    console.log("dates " + uniqueDates)


    if (dates.length > 0) {
      setSelectedDate(dates[0]);
    }
  }, [eventDetails]);


  React.useEffect(() => {
    console.log("Selected Date Updated:", selectedDate);
  }, [selectedDate]);


  const filteredSlots = eventDetails.filter(
    (event) => event.slotDate.toLocaleString() === selectedDate
  );
  totalamount = amountPerHour* filteredSlots.length;


  React.useEffect(() => {
    if (reRender) {
      console.log("ReRender is now true");

    }
  }, [reRender]);

  console.log(selectedDate);

  console.log("ssssss " + filteredSlots.length);

  filteredSlots.forEach((slot) => {
    console.log(slot);
  });



  const handleLedgerCreation = async () => {



    if (selectedTimings.length === 0) {
      alert("Please select at least one slot before proceeding.");
      return;
    }

    console.log(eventDetails[0].event);
    console.log(eventDetails[0].event.eventHashId);


    const userId: any = localStorage.getItem('userHashId');

    const ledgerData = {


      startTime: selectedTimings,
      eventBookedDate: selectedDate,
      amount: amountPerHour,
      noOfHours: 1,
      debit: false,
      public: true,
      noOfPlayers: 22
    }


    console.log(eventDetails.length);
    try {

      if (!isBooking) {

        const response = await fetch("http://localhost:3002/ledgers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "customerId": userId,
            "eventId": eventDetails[0].event.eventHashId,
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(ledgerData),
        });

        if (!response.ok) {
          throw new Error("Failed to create ledger");
        }

        const result = await response.json();
        console.log("Ledger created:", result);
        alert("ADDED TO CART SUCCESFULLY !");


        onClose();
        window.location.reload();

        // console.log("seeting to true");
        // setReRender(true);


      }
      else {
        const userId: any = localStorage.getItem('userHashId');
        console.log(userId);
      }


    } catch (error) {
      console.error("Error creating ledger:", error);
      alert("Failed to create ledger. Please try again.");
    }
  };

  return (

    <>
      {reRender ? (

        <CustomerDashBoard />
      ) : (

        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Event</h2>
            <form>
              <label>Event Type</label>
              <input type="text" value={eventDetails[0].event.eventType} readOnly />

              <label>Event Date</label>
              <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                {uniqueDates.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>

              <label>Event Start Time</label>
              <input type="text" value={eventDetails[0].slotTime + "00 HRS"} readOnly />

              <label>Event Country</label>
              <input type="text" value={eventDetails[0].event.location.country} readOnly />

              <label>Event State</label>
              <input type="text" value={eventDetails[0].event.location.state} readOnly />

              <label>Event Location 1</label>
              <input type="text" value={eventDetails[0].event.location.addressLineOne} readOnly />

              <label>Event Location 2</label>
              <input type="text" value={eventDetails[0].event.location.addressLineTwo} readOnly />

              <label>Amount per Hour</label>
              <input type="text" value={eventDetails[0].event.amountPerHour} readOnly />

              <div className="modal-slot-container">
                {filteredSlots.map((slot, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSlotClick(slot.slotTime)}
                    className={selectedTimings.includes(slot.slotTime) ? "clicked" : ""}
                  >
                    {slot.slotTime + ":00 "}
                  </button>
                ))}
              </div>

              <button type="button" className="booknow" onClick={handleLedgerCreation}>
                {isBooking ? 'Join Now' : 'Book Now'}
              </button>
            </form>
            <button className="close-btn" onClick={onClose}>
              X
            </button>
          </div>
        </div>
      )}
    </>


  )
};

export default FormExpand;