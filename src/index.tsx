import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializeApp } from "firebase/app";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5qGo1lB2IZ5XsmHVhxqHJIcblFK28vGA",
  authDomain: "react-app-452e4.firebaseapp.com",
  projectId: "react-app-452e4",
  storageBucket: "react-app-452e4.appspot.com",
  messagingSenderId: "9537290639",
  appId: "1:9537290639:web:bd9d85b45f9cd976264bfa"
};

// Initialize Firebase
 initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
