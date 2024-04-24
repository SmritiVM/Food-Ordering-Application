import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditProfile from './EditProfile';
import OrderHistory from './OrderHistory';

import '../styles/Account.css';

function Account(){
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('editProfile');
  const name = "Smriti";

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const logout = async(e) => {
    e.preventDefault();
    try{
      const response= await axios.get("http://localhost:4000/plateform/logout",{withCredentials:true});
    }
    catch(err){
      alert("Error Logging out, Try again after some time");
      console.log("Error Loggging out:",err);
    }
    navigate("/login");
  }
  return (
    <div className="account-page">
      <div className='header'><h1>Hello, {name}!</h1></div>
      <div className='account-details'>
        <div className="sidebar">
          <button
            className={activeTab === 'editProfile' ? 'active' : ''}
            onClick={() => handleTabChange('editProfile')}>
            Edit Profile
          </button>
          <button
            className={activeTab === 'orderHistory' ? 'active' : ''}
            onClick={() => handleTabChange('orderHistory')}>
            Order History
          </button>
          <button onClick = {logout}>
            Logout
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'editProfile' && (
            <EditProfile/>
          )}
          {activeTab === 'orderHistory' && (
            <OrderHistory/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
