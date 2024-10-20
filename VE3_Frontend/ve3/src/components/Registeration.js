import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = ({ setIsRegistered }) => { 
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userZipCode, setUserZipCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      userEmail,
      userName,
      donorPhone,
      userPassword,
      userAddress,
      userZipCode,
    };

    try {
      const response = await axios.post('http://localhost:8083/userRegister', userData);
      console.log('Registration successful:', response.data);

      // Reset form fields
      setUserEmail('');
      setUserName('');
      setDonorPhone('');
      setUserPassword('');
      setUserAddress('');
      setUserZipCode('');
      setErrorMessage('');

      // Set registration status to true
      setIsRegistered(true); 

      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('There was an error registering the user!', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol lg='6'>
          <MDBCard className='my-5 rounded-3'>
            <MDBCardBody className='px-5'>
              <h3 className="mb-4">Registration</h3>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='Email' type='email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='Name' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='Phone' type='text' value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='Password' type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='Address' type='text' value={userAddress} onChange={(e) => setUserAddress(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='Zip Code' type='text' value={userZipCode} onChange={(e) => setUserZipCode(e.target.value)} required />
                <MDBBtn color='success' className='mb-4' size='lg' type="submit">Register</MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Registration;
