import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { createEvent } from '../Services/AdminApiService';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');  
  const [location, setLocation] = useState('');   
  const [description, setDescription] = useState('');  
  const [image, setImage] = useState('');         
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    
    const eventDateTime = `${eventDate}T${eventTime}`;

    const event = {
      name: eventName,
      datetime: eventDateTime,  // Send combined date and time
      location,
      description,
      image,
    };

    try {
      const response = await createEvent(event);
      setMessage('Event created successfully!');
      setError('');
    } catch (error) {
      setError('Failed to create event.');
      setMessage('');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol lg="6">
          <MDBCard className="my-5 rounded-3">
            <MDBCardBody className="px-5">
              <h3 className="mb-4">Create Event</h3>
              {message && <p className="text-success">{message}</p>}
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={handleCreate}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Event Name"
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Event Date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Event Time"
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <MDBTextArea
                  wrapperClass="mb-4"
                  label="Description"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Image URL"
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <MDBBtn color="success" className="mb-4" size="lg" type="submit">
                  Create
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default CreateEvent;
