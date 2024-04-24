import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DetailsForm(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: props.name,
    email: props.email,
    phone: props.phone,
    password: props.password,
    repassword: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(
      {
        name: `${props.name}`,
        email: `${props.email}`,
        phone: `${props.phone}`,
        password: `${props.password}`,
        repassword: '',
      }
    )
  }, [props.name, props.email, props.phone, props.password])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
    setErrors(errors => ({
      ...errors,
      [name]: undefined
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (formData.name.length < 3) {
      validationErrors.name = 'Name must have at least 3 characters';
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      validationErrors.phone = 'Phone number should consist of 10 digits';
    }

    if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long';
    }

    if (formData.password !== formData.repassword) {
      validationErrors.repassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log(formData);
    const formDataToSend = new FormData();
        formDataToSend.append('name',  formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('password', formData.password);

    try{
      const response= await axios.post("http://localhost:4000/plateform/create-user",formDataToSend, {
        withCredentials: true,
        headers:{
          'Content-Type':'multipart/form-data',
        },
      });
      const data=await response.data;
      console.log("Data",data);
      console.log('Form submitted:', formData);
      navigate("/")
    }
    catch(error){ 
      console.log(error);
      alert("Could not create user");
    }
  };

  return (
    <div className={props.className}>
      <h2>{props.header}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="repassword" value={formData.repassword} onChange={handleChange} required />
          {errors.repassword && <p className="error">{errors.repassword}</p>}
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default DetailsForm;
