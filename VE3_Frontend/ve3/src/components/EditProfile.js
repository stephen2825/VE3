import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit'; // Ensure you have this installed

const EditProfile = () => {
  const { userId } = useParams(); // Extract the userId from the URL params

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userZipCode, setUserZipCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const response = await axios.get(`http://localhost:8083/userProfile/${userId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        const { userEmail, userName, donorPhone, userAddress, userZipCode } = response.data;

        setUserEmail(userEmail);
        setUserName(userName);
        setDonorPhone(donorPhone);
        setUserAddress(userAddress);
        setUserZipCode(userZipCode);

      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to load user data. Please try again.');
      }
    };

    fetchUserData();
  }, [userId]); 

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (userPassword !== userPasswordConfirm) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (userPassword && userPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    const updatedData = {
      userEmail,
      userName,
      donorPhone,
      userPassword,  
      userAddress,
      userZipCode,
    };

    setIsLoading(true);

    try {
      
      const response = await axios.put(`http://localhost:8083/userProfile/${userId}`, updatedData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      console.log('Profile updated successfully:', response.data);

      setIsLoading(false);
      setIsUpdated(true);
      setErrorMessage('');
      navigate('/'); 

    } catch (error) {
      console.error('Error updating user profile:', error);
      setIsLoading(false);
      setErrorMessage('Profile update failed. Please try again.');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol lg='6'>
          <MDBCard className='my-5 rounded-3'>
            <MDBCardBody className='px-5'>
              <h3 className="mb-4">Edit Profile</h3>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              {isUpdated && <p className="text-success">Profile updated successfully!</p>}
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Email'
                  type='email'
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Name'
                  type='text'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Phone'
                  type='text'
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  type='password'
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Confirm Password'
                  type='password'
                  value={userPasswordConfirm}
                  onChange={(e) => setUserPasswordConfirm(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Address'
                  type='text'
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Zip Code'
                  type='text'
                  value={userZipCode}
                  onChange={(e) => setUserZipCode(e.target.value)}
                  required
                />
                <MDBBtn color='success' className='mb-4' size='lg' type="submit">
                  {isLoading ? 'Updating...' : 'Update Profile'}
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default EditProfile;
