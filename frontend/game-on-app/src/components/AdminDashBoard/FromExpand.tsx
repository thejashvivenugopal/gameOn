import React from "react";

const FormExpand = ({ eventDetails, onClose }: { eventDetails: any, onClose: () => void }) => {
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
                    <button type="submit">UPDATE</button>
                </form>
                <button className="close-btn" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default FormExpand;