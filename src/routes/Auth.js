import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export default function Auth(){
    /* input에서 받아오는 value를 저장하는 변수 */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    /* newAccount의 boolean값을 이용해서 로그인과 회원가입 구별 */
    const [newAccount, setNewAccount] = useState(true);
    /* error를 UI에 표시 */
    const [error, setError] = useState("");


    /* Click Event */
    function onChange(e){
        /* 비구조화 할당,코딩앙마Youtube */
        const {name, value} = e.target;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }


    /* Submit Event */
    async function onSubmit(e){
        let data;
        let auth = getAuth();
        e.preventDefault();
        try{
            if(newAccount){
                //create account
                data = await createUserWithEmailAndPassword(auth, email, password);
                console.log(data);
            }else {
                //login
                data = await signInWithEmailAndPassword(auth, email, password);
            }
        }catch(error){
            setError(error.message);
        }
    }



    function toggleAccount(){
        setNewAccount((current)=>!current);
    }
    console.log(newAccount);



    return(
        <div>
            <h1> {newAccount ? 'create account !' : 'log in !'} </h1>
            <form onSubmit={onSubmit}>🙅🏻‍♂️
                <input onChange={onChange} value={email} name='email' type='email' placeholder='email' required/>
                <input onChange={onChange} value={password} name='password' type='password' placeholder='password' required/>
                <input type='submit' value={newAccount ? 'create Account' : 'log in'} />
                {error}
            </form>
            <span onClick={toggleAccount}> {newAccount ? "sign in" : "create account"} </span>
            <button>Continue with Google</button>
            <button>Continue with Github</button>

        </div>
    );
}