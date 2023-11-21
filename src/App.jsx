import { useState, useEffect } from "react";  
import "./App.css";
import Student from "./components/Test";  // components 폴더에 있는 Test.jsx 파일을 import
import Board from "./components/Board";   // components 폴더에 있는 Board.jsx 파일을 import

function App() {   // ==   const App = () => {
 
  return (
    <>
      <Student name="jheoejsk" email="jfkjo@test.com" phone="1110101010" />
      <Board name="jheoejsk" email="jfkjo@test.com" phone="1110101010" />
    </>
  );
}

export default App
