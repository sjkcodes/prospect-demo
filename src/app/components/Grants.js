"use client"
import React, { useState } from 'react';

const Grant = ({ title, text, value, growth }) => (
  <div className="border m-4 p-4 rounded shadow-lg w-96">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <p>{text}</p>
    {/* Display value in dollars */}
    <p className="text-sm mt-2">Value: ${value.toLocaleString()}</p>
    {/* Display growth as a multiplier */}
    <p className="text-sm">Projected Growth: {growth}x</p>
  </div>
);

const NewGrantModal = ({ isOpen, onClose }) => {
  const [newGrantText, setNewGrantText] = useState(""); 
  const [newGrantTitle, setNewGrantTitle] = useState("");
  const [grantValue, setGrantValue] = useState(50); // Default grant value
  const [grantGrowth, setGrantGrowth] = useState(5); // Default grant growth

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/createGrant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newGrantTitle,
        text: newGrantText,
        value: grantValue,
        growth: grantGrowth,
      }),
    });
    // Resetting state after form submission
    setNewGrantTitle("");
    setNewGrantText("");
    setGrantValue(50);
    setGrantGrowth(5);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black relative border-white border rounded-lg w-96 p-4">
        <button className="text-white absolute top-2 right-2" onClick={onClose}>x</button>
        <h3 className="text-xl font-bold text-white mb-4">Create New Grant</h3>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-2">
              Title:<span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              className="w-full p-2 border text-black rounded" 
              value={newGrantTitle}
              onChange={(e) => setNewGrantTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-2">Notes:</label>
            <textarea 
              rows="5" 
              className="w-full text-black p-2 border rounded" 
              value={newGrantText}
              onChange={(e) => setNewGrantText(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-2">Value: ${grantValue}</label>
            <input 
              type="range" 
              className="w-full" 
              value={grantValue}
              onChange={(e) => setGrantValue(Number(e.target.value))}
              min="0" 
              max="100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-2">Projected Growth: {grantGrowth}x</label>
            <input 
              type="range" 
              className="w-full" 
              value={grantGrowth}
              onChange={(e) => setGrantGrowth(Number(e.target.value))}
              min="0" 
              max="10"
            />
          </div>
          <button type="submit" className="bg-white text-black rounded p-2" disabled={!newGrantTitle}>Add Grant</button>
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
        <Grant key={index} title={item.title} text={item.text} value={item.value} growth={item.growth}/>
      ))}
    </div>
  );
};