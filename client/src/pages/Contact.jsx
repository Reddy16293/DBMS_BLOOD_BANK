import React from 'react';

const Contact = () => {
  return (
    <div className='flex  flex-col justify-center items-center h-screen bg-gray-700'>
      <div className='bg-gray-500 w-full max-w-lg p-10 rounded-lg shadow-lg'>
        <div className='text-center mb-6'>
          <h1 className='font-bold text-white text-3xl mb-2'>Contact Us</h1>
          <p className='text-white'>We're open for any suggestion or just to have a chat</p>
        </div>
        <div className='flex text-center gap-x-4 justify-center'>
          <div className='text-white '>
            <h2 className='font-bold mb-2 '>ADDRESS:</h2>
            <p>198 West 21th Street,<br /> Suite 721,<br /> New York</p>
          </div>
          <div className='text-white'>
            <h2 className='font-bold mb-2'>EMAIL:</h2>
            <p>info@yoursite.com</p>
          </div>
          <div className='text-white'>
            <h2 className='font-bold mb-2'>PHONE:</h2>
            <p>+1 234 567 8900</p>
          </div>
        </div>
        <div className='flex  flex-col  m-3 p-3 w-full h-1/2 border border-black  justify-center items-center'>
            <form onSubmit={event=>{event.preventDefault();
                console.log('Form Submitted')
                alert('Message Sent')
              }}
             className='flex flex-col justify-center'>
                <input className='px-3 m-2 border border-black bg-blue-100 py-1.2 ' type='text' placeholder='Name' ></input>
                <input className='px-3 m-2 py-1.2 border border-black bg-blue-100 ' type='text' placeholder='Email' ></input>
                <input className='px-3 m-2 py-1.2  border border-black bg-blue-100' type='text' placeholder='Subject' ></input>
                <input className='px-3 m-2 py-1.2 border border-black bg-blue-100' type='text-area' placeholder='Create a mesaage here' ></input>
                <button className='bg-blue-500 text-white py-2 px-4 rounded'>Send Mesaage</button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
