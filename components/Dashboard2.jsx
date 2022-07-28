import React, {useState, useEffect} from 'react'
import Web3 from "web3";
import { collection, getDocs, query, where} from 'firebase/firestore';


import {db} from "../firebase"

const Dashboard = ()=>{
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState([])
    const [walletAddress, setWalletAddress] = useState("");

    async function loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        console.log("here")  
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
      window.web3 = new Web3(window.web3.currentProvider);
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      const key = accounts[0]; 
      callForData(key);
    }
  


    const callForData = async(key)=>{
        console.log(key)
        // const querysnap =  query(collection(db,"UserInfo"), where('wallid', "==", accountAddress));
        // const querysnap =  query(collection(db,"UserInfo"), where('wallid', "==", '0xc50fac8f10a633c14fe831f563705f2907c6967d'));
        const querysnap =  query(collection(db,"UserInfo"), where('wallid', "==", key));
        console.log(querysnap)
        const userRef = await getDocs(querysnap);
        console.log("userRef", userRef)
        const userDocs = userRef.docs
        console.log("userDocs", userDocs)
        let tem = []
        userRef.forEach(doc => {
          tem.push(doc.data())
        })
        // setUserData(tem) 
        const userData1 = tem;
        console.log(userData1)
        setUserData(userData1)
    }
    if (userData.length > 0) {
      return (
      <>
      <img src={userData[0]["photoUrl"]}/>
            <h1>{userData[0]["firstName"] +" "+userData[0]["lastName"]}</h1>
            <p className="title">Crypto Identification</p>
            <p>{userData[0]["city"] + ", " + userData[0]["province"]}</p>
            <div className="infoField">
              <strong> Gender: </strong> Male
            </div>
            <div className="infoField">
              <strong> Date of Birth: </strong> {userData[0]["dob"]}
            </div>
            <div className="infoField">
              <strong> Address: </strong> {userData[0]["mailingAddress"]}
            </div>
            
            <div className="infoField">
              <strong> Phone Number: </strong> {userData[0]["phoneNumber"]}
            </div>
            <br/>

            
          

      </>        


      );
    }
    
    return (
        <div className=" py-6 flex flex-col mx-auto sm:py-12">
        <button onClick={loadWeb3} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto">Connect Wallet</button>
        </div>
      )
}

export default Dashboard