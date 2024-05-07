"use client"
import React, { useState } from 'react';
import { DatePicker } from "react-date-picker"
import "react-calendar/dist/Calendar.css"
import "react-date-picker/dist/DatePicker.css"


const VESTING_SCHEDULES = [
  "4-year vest, 1-year cliff",
  "2-year vest"
]

const Grant = ({ title, price, growth, vestingSchedule, quantity, vestingStartDate }) => {
  const shortenedDateString = new Date(vestingStartDate).toDateString().split(' ').slice(1, 4).join(' ');
  return (
  <div className="border m-4 p-4 rounded shadow-lg w-96">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    {/* Display price in dollars */}
    <p className="text-sm mt-2">Current Price Per Share: ${price.toLocaleString()}</p>
    <p className="text-sm mt-2">Quantity: {quantity.toLocaleString()}</p>
    <p className="text-sm mt-2">Vesting Schedule: {vestingSchedule}</p>
    <p className="text-sm mt-2">Vesting Start Date: {shortenedDateString}</p>

    {/* Display growth as a multiplier */}
    <p className="text-sm">Projected Growth: {growth}x</p>
  </div>)
}

const NewGrantModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(50); 
  const [growth, setGrowth] = useState(5); 
  const [vestingSchedule, setVestingSchedule] = useState(VESTING_SCHEDULES[0]);
  const [quantity, setQuantity] = useState(100); 
  const [vestingStartDate, setVestingStartDate] = useState(new Date());

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/grant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title, price, growth, vestingSchedule, quantity, vestingStartDate
      }),
    });
    setTitle("");
    setPrice(50);
    setGrowth(5);
    setVestingSchedule(VESTING_SCHEDULES[0]);  // Reset to default vesting schedule
    setVestingStartDate(new Date())
    setQuantity(100)
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-600 text-white relative border border-gray-700 rounded-lg w-96 p-4">
        <button className="absolute top-2 right-2 text-white" onClick={onClose}>x</button>
        <h3 className="text-xl font-bold mb-4">Create New Grant</h3>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Title:<span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Vesting Schedule:</label>
            <select
              className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
              value={vestingSchedule}
              onChange={(e) => setVestingSchedule(e.target.value)}
            >
              {VESTING_SCHEDULES.map((schedule, index) => (
                <option key={index} value={schedule}>{schedule}</option>
              ))}
            </select>
          </div>
          <label className="block text-sm font-semibold mb-2">Vesting Start Date:</label>
          <DatePicker
            value={vestingStartDate}
            onChange={setVestingStartDate}
          />
          <div className="mb-4 mt-4">
            <label className="block text-sm font-semibold mb-2">Price Per Share: ${price}</label>
            <input 
              type="range" 
              className="w-full cursor-pointer"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              min="0" 
              max="100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Projected Growth: {growth}x</label>
            <input 
              type="range" 
              className="w-full cursor-pointer"
              value={growth}
              onChange={(e) => setGrowth(Number(e.target.value))}
              min="0" 
              max="10"
            />
          </div>
          <button type="submit" className="bg-gray-900 text-white rounded p-2" disabled={!title}>Add Grant</button>
        </form>
      </div>
    </div>
  );
};



export const Grants = ({ data }) => {
  const [isNewGrantModalOpen, setIsNewGrantModalOpen] = useState(false);

  const onClick = () => {
    setIsNewGrantModalOpen(!isNewGrantModalOpen);
  };

  return (
    <div className="flex flex-col items-center">
      <NewGrantModal isOpen={isNewGrantModalOpen} onClose={onClick} />
      <div className="flex items-center mb-4 w-full justify-center">
        <h1 className="text-2xl font-semibold mr-10">Grants</h1>
        <button className="bg-white rounded-full text-black text-3xl focus:outline-none focus:ring-2 focus:ring-blue-200 w-16" onClick={onClick}>
          +
        </button>
      </div>
      {data.map((item, index) => (
        <Grant key={index} title={item.title} text={item.text} price={item.price} growth={item.growth} quantity={item.quantity} vestingSchedule={item.vestingSchedule} vestingStartDate={item.vestingStartDate}/>
      ))}
    </div>
  );
};