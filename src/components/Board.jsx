import { useState, useEffect } from "react";  
// import React from 'react';
import axios from "axios";  // 항시 디팬더시 추가할려면 import 했는지 확인!

const Board = () => {
    
    const baseUrl = "http://localhost:8080/api";
   
    /*  useState() 안에 무엇을 넣느냐에 따라서
        input값이 기본으로  1.[]객체로 생성이 됨    2. "" 빈값으로 생성이 됨  3. null 널값으로 생성이 됨  */
    const [boards, setBoards] = useState([]);

    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    /*  useEffect({}, [])에서 [] 의미 ---> 리액트 열렸을 때 App.jsx 한번만 실행하게하는 hook.
        hook이란?? ---> 함수형 컴포넌트에서 여러 state나 생명주기에서 사용하는 기술들을 use로 시작하는 hook으로 대신 사용할 수 있게 한다.   */
    useEffect(() => {
        getBoards();
    }, []);

    async function getBoards() {
        await axios // 다 받을 때까지 기다리는 것
        .get(baseUrl + "/board/list")
        .then((res) => {        // then 성공했을때
            console.log(res.data);
            setBoards(res.data);
        })
        .catch((err) => { // catch 실패했을때
            console.log(err);
        });
    }

    function createBoard(e) {
        e.preventDefault();  // 화면 새로고침 방지

        const createBoard = async () => {
        await axios
            .post(baseUrl + "/board/", {
            title: input1,
            content: input2
            })
            .then((response) => {
            console.log(response.data)
            setInput1("");
            setInput2("");
            getBoards();
            })
            .catch((error) => {
            console.log(error);
            })
        }
        createBoard();
        console.log("게시판이 추가됨");
    }

    function deleteBoard(id) {
        const deleteBoard = async () => {
        await axios
            .delete(baseUrl + "/board/" + id, {})
            .then((response) => {     // then 성공했을때
            console.log(response.data);
            setBoards(
                boards.filter((board) => board.id !== id)
            )
            })
            .catch((error) => {   // catch 실패했을때
            console.log("error : " + error);
            })
        }
        deleteBoard();
        console.log("게시판이 삭제됨");
    }

    // 데이터를 입력할 공간
    function changeText1(e) {
        e.preventDefault();       // 화면 새로고침 깜빡이 방지
        setInput1(e.target.value);
        console.log("input에 어떤값이 들어가지? " + input1);
    }
    // 데이터를 입력할 공간
    function changeText2(e) {
        e.preventDefault();       // 화면 새로고침 깜빡이 방지
        setInput2(e.target.value);
        console.log("input2에 어떤값이 들어가지? " + input2);
    }

    return (
    <>
        <button type="button" class="btn btn-primary"> Add Tag </button> &nbsp;
      
        <button type="button" class="btn btn-warning"> Link Tag </button> &nbsp;

        <h1>게시판 작성</h1>
        <form onSubmit={createBoard}>
            <p><label>게시판 제목 : <input type="text" required={true} value={input1} onChange={changeText1} /></label></p>
            <p><label>게시판 내용 : <input type="text" required={true} value={input2} onChange={changeText2} /></label></p>
          
            <input type="submit" value="글 생성하기"/>
        </form>

        <h1>게시판 리스트</h1>
        <table className="table table-striped table-bordered text-center">
          <thead>
              <tr>
                <th>id</th>
                <th>titme</th>
                <th>content</th>
                <th>createdAt</th>
                <th>modifiedAt</th>
              </tr>
          </thead>
          <tbody>
          {boards.map((board) => {  // 이때 map은 자료구조의 map이 아니라 mapping을 뜻하는것
              return (
              <tr key={board.id}>
                <td>{board.id}</td>
                <td>{board.title}</td>
                <td>{board.content}</td>
                <td>{board.createdAt}</td>
                <td>{board.modifiedAt}</td>
                <label onClick={() => deleteBoard(board.id)}>&nbsp;❌</label>
              </tr>
              );
          })}
        </tbody>
      </table>
    </>
    );
};

export default Board;