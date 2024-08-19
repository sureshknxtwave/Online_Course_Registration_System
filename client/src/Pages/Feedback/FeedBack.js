import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './FeedBack.css'

export const FeedBack = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const rating = formData.get('from_rating');

    emailjs
      .sendForm('service_cfz72df', 'template_q0o0fwi', form.current, {
        publicKey: 'vwPJsJUmbXwyjK9Za',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          // Clear form input fields
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <div className="feedback-container ">

    <form ref={form} onSubmit={sendEmail} >
      <div>Contact US</div>
      <div>
        <label className="sign-up-label text-white  fade-in" >Name:</label>
        <input className="sign-up-input fade-in" type="text" name="from_name" required />
      </div>
      <div>
        <label className="sign-up-label text-white fade-in">Email:</label>
        <input className="sign-up-input fade-in" type="email" name="from_email" required />
      </div>
      <div>
        <label className="sign-up-label text-white fade-in">Rating:</label>
        <select className="sign-up-input fade-in" name="from_rating" required>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>
        <label className="sign-up-label text-white fade-in">Comment:</label>
        <textarea className="sign-up-input fade-in" name="message"></textarea>
      </div>
      <input className="signup-btn fade-in" type="submit" value="Send" />
    </form>
    </div>
  );
};





