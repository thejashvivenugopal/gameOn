import React from "react";
import '../../styles/MainDashBoard/DashBoard.css'
import { toast } from "react-toastify";
import '../../styles/MainDashBoard/button.css'


const FormExpand = ({ eventDetails, onClose }: { eventDetails: any, onClose: () => void }) => {
    console.log(eventDetails.eventHashId);
    const handleGenerateSlots = async (event: React.FormEvent) => {


        event.preventDefault();
    
       
    
        try {
          const response = await fetch('http://localhost:3002/slots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
              'Authorization' :`Bearer ${localStorage.getItem('token')}`,
              'id' : eventDetails.eventHashId
    
            },
          });
    
          const data: any = await response.json();
    
          if (response.ok) {
            toast.success('SLOTS GENERATED SUCCESS');
          } else {
            toast.error(data.message || 'Failed. Please try again.');
          }
        } catch (error) {
          toast.error('An error occurred. Please try again later.');
          console.error('Error during API call:', error);
        }
      };
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Event</h2>
                <form>
                    <label>Event Type</label>
                    <input type="text" value={eventDetails.eventType} readOnly />
                    <label>Event Start Time</label>
                    <input type="text" value={new Date(eventDetails.eventStartTime).toLocaleString()} readOnly />
                    <label>Event End Time</label>
                    <input type="text" value={new Date(eventDetails.eventEndTime).toLocaleString()} readOnly />
                    <button onClick={handleGenerateSlots} className="slotsgenerate"> GENERATE SLOTS  </button>
                </form>
                <button className="top-right-button" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default FormExpand;