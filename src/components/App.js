import React, { useEffect, useState } from 'react';
import styles from 'components/App.module.css';
import AppRouter from 'components/Router';
import { auth } from 'fbase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [init, setInit] = useState(false); //init의 state값에 따라 AppRouter 표시 유무 결정
  const [isLoggedIn, setIsLoggedIn] = useState(false); //login 상태 확인

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){ //user가 있다면 (로그인을 했다면)
        setIsLoggedIn(true);
      }else{ //user가 없다면 (로그아웃을 했다면)
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing ..."}
      <footer> &copy; {new Date().getFullYear()} Switter </footer>
    </>
  );
}
