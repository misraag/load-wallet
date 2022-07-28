import { collection, getDocs, query, where} from 'firebase/firestore';

import { useEffect, useState} from "react";
import {db} from "../firebase"

async function getData(){
  const querySnapshot = await getDocs(collection(db,"UserInfo"));
  // const querySnap = await userRef.where('wallid', '==', accountAddress).get()
  var temp = [];

  querySnapshot.forEach(doc =>{
      temp.push(doc.data());
  });

  console.log(temp); 

}

export default function ConnectButton() {
  
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState([])
  const [accountAddress, setAccountAddress] = useState("");
  // var accountAddress = "";
  
  
   async function getAccount() {
  
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
           
    });
    const key = accounts[0];        
    
    console.log(key)
    
    return key;
  }


  

  const connectButtonOnClick = () => {
    console.log(window);
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      getAccount().then((response) => {
        
          console.log(response)
        setAccountAddress(response)
        // accountAddress = response 
        console.log("THIS IS")
        console.log(accountAddress)  

        console.log("JUST ABOVE ACC ADD")
        console.log(accountAddress)
        // getData(accountAddress);
        
        callForData(accountAddress);
        console.log("YOU CLICKED")
        if(accountAddress){
            console.log("YES")
        }else{
          console.log("NO")
        }
        
        

      });
    } else {
      console.log("error");
      
    }
  };


    async function callForData(accountAddress){
    
    let list

      console.log("YOU REACHED FOR DATA")
      console.log(accountAddress)
      
      
      const querysnap =  query(collection(db,"UserInfo"), where('wallid', "==", accountAddress));
    console.log("HELLO")
    console.log(accountAddress);
    const userRef = await getDocs(querysnap);

    let tem = []
    userRef.forEach(doc => {
    
      console.log("PUSHING DATA IN TEM")
      tem.push(doc.data())
    })
    console.log(tem)
    // setUserData(tem) 
    const userData = tem;
      

    if(tem.length == 0){
      console.log("TEM IS EMPTY")
    }
    else{
      console.log(userData[0].photoUrl);
    }
    
  }
    // setLoading(false)

  


  // if(loading || userData.length == 0){
    
  //   return(<div>
  //     Getting Data
  //   </div>)
  // }
  // console.log(userData[0].photoUrl)
  if(accountAddress.length==0){
    console.log("ACCOUNT EMPTY")
  }
  else{
    console.log("ACCOUNT FULL")
  }


  // if (accountAddress) {
  //   // getData(accountAddress);
  //   return (
  //     <>
  //       <div component="h1" variant="h5" className="MyProfile">
  //         My Profile
         
  //         <br/>
  //         <br/>
  //         <div className="card">
  //           <img src= {userData[0].photoUrl} className="profile"/>
  //           <h1>{userData[0]["firstName"] +" "+userData[0]["lastName"]}</h1>
  //           <p className="title">Crypto Identification</p>
  //           <p>{userData[0]["city"] + ", " + userData[0]["province"]}</p>
  //           <div className="infoField">
  //             <strong> Gender: </strong> Male
  //           </div>
  //           <div className="infoField">
  //             <strong> Wallet: </strong> {userData[0]["wallid"]}
  //           </div>
  //           <div className="infoField">
  //             <strong> Date of Birth: </strong> {userData[0]["dob"]}
  //           </div>
  //           <div className="infoField">
  //             <strong> Address: </strong> {userData[0]["mailingAddress"]}
  //           </div>
            
  //           <div className="infoField">
  //             <strong> Phone Number: </strong> {userData[0]["phoneNumber"]}
  //           </div>
  //           <div className="infoField">
  //             <strong> Email: </strong> {userData[0]["email"]}
  //           </div>
  //           <br/>
            
  //         </div>

  //       </div>
        
  //       <br/>

        
            
            
  // //     </>
  //   )
  //  }else{
  //   console.log("ABHI NAHI")
  //  }
  
  


  return (
    <div className=" py-6 flex flex-col mx-auto sm:py-12">
    <button onClick={connectButtonOnClick} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto">Connect Wallet</button>
    </div>
  )
}


