'use client'

import Image from 'next/image'
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    var xhr = null;
    const form = document.getElementById("myForm");
    const getXmlHttpRequestObject = function () {
      if (!xhr) {
        // Create a new XMLHttpRequest object 
        xhr = new XMLHttpRequest();
      }
      return xhr;
    };
    function dataCallback() {
      // Check response is ready or not
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("User data received!");
        getDate();
        const dataDiv = document.getElementById('result-container');
        // Set current data text
        dataDiv.innerHTML = xhr.responseText;
      }
    }
    function getUsers() {
      console.log("Get users...");
      xhr = getXmlHttpRequestObject();
      xhr.onreadystatechange = dataCallback;
      // asynchronous requests
      xhr.open("GET", "http://localhost:6969/users", true);
      // Send the request over the network
      xhr.send(null);
    }
    function getDate() {
      const date = new Date().toString();
      document.getElementById('time-container').textContent
        = date;
    }
    (function () {
      getDate();
    })();

    const userBtn = document.querySelector("#userBtn")
    userBtn.addEventListener("click", getUsers())
    ///data posting logic

    function sendDataCallback() {
      // Check response is ready or not
      if (xhr.readyState == 4 && xhr.status == 201) {
        console.log("Data creation response received!");
        getDate();
        const dataDiv = document.getElementById('sent-data-container');
        // Set current data text
        dataDiv.innerHTML = xhr.responseText;
        console.log(JSON.parse(xhr.responseText));
      }
    }

    // sending form data
    function sendData(data) {
      const dataToSend = data;
      if (!dataToSend) {
        console.log("Data is empty.");
        return;
      }
      console.log("Sending data: " + dataToSend);
      xhr = getXmlHttpRequestObject();
      xhr.onreadystatechange = sendDataCallback;
      // asynchronous requests
      xhr.open("POST", "http://localhost:6969/users", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Send the request over the network
      xhr.send(JSON.stringify({ "data": dataToSend }));
    }
    //selecting all inputs 
    form.addEventListener("submit", async function () {
      const allInputs = document.querySelectorAll('form input');
      const dataToSend = [];
      // Storing input values from the form
      Array.from(allInputs).forEach(input => input.value.length > 0 && dataToSend.push(input.value))
      // passing data to model
      try {
        const response = await sendData(dataToSend)
        console.log(response);

      }
      catch (e) {
        console.log('error ocuured')
      }
    })

  })
  useEffect(() => {
    const inputFields = document.getElementById("inputFields");
    const addButton = document.getElementById("addButton");


    let counter = 1;


    addButton.addEventListener("click", function () {
      const label = document.createElement("label");
      const labelText = document.createTextNode(`Symptom ${counter}:`);
      label.appendChild(labelText);

      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("name", `symptom${counter}`);

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "deleteButton";
      deleteButton.innerHTML = "Delete";
      //  document.querySelector(".deleteButton")
      deleteButton.addEventListener("click", function () {
        inputFields.removeChild(label);
        inputFields.removeChild(input);
        inputFields.removeChild(deleteButton);
      });

      inputFields.insertBefore(label, addButton);
      inputFields.insertBefore(input, addButton);
      inputFields.insertBefore(deleteButton, addButton);

      counter++;
    });
  })
  return (
    <div className="container">
      <h1>Disease Prediction</h1>
      <form action="" id="myForm" onSubmit={(e) => {
        e.preventDefault()
        console.log('submitted', e)
      }}>
        <div id="inputFields">
          <h2>Click here to enter your symptoms</h2>
          {/* <>
            <label>Symptom 1:</label>
            <input type="text" name="symptom1" />
            <button className="deleteButton">Delete</button>
          </> */}

          <button id="addButton" type="button">Add Symptom</button>
          <button type="submit">Predict</button>
        </div>
      </form>
      <div>This is simple test to get data from a backend</div>
      <div><span>Last update: </span><span id="time-container"></span></div>
      <button id='userBtn'>Get user data</button>
      <div id="result-container"></div>
      <div id="sent-data-container"></div>
    </div>


  )
}
