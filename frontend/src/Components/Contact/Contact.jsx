import React, { useState } from "react";
import axios from 'axios';
import './Contact.css';

function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/plateform/submit-query', formData);
            alert('Query submitted successfully.');
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting query:', error);
            alert('Error submitting query. Please try again later.');
        }
    };

    return (
        <section className="contact-section">
            <div className="contact-content">
                <h2>Contact Us</h2>
                <p>Have questions or feedback? Feel free to reach out!</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                    <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </section>
    );
}

export default ContactSection;
