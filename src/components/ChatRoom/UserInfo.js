import React, { useContext } from "react";
import { Row, Button, Avatar } from "antd";
import '../../style/UserInfo.scss'
import {auth} from "../../firebase/config"
import { AuthContext } from "../../Context/AuthProvider";


export default function UserInfo() {
  const {user: {
    displayName,
    photoURL,
  }} = useContext(AuthContext)
  // useEffect(()=>{
  //   db.collection('users').onSnapshot((snapshot)=>{
  //     const data = snapshot.docs.map(doc=>({
  //       ...doc.data(),
  //       id: doc.id
  //     }))
  //   })
  // })
  return (
    <div className="user_info">
      <header>
        <Row>
        <Avatar src={photoURL}>{photoURL? '':displayName?.charAt(0)?.toUpperCase()}</Avatar>
        <p>{displayName}</p>
        </Row>
      </header>
      <Button ghost onClick={()=>auth.signOut()}>Đăng xuất</Button>
    </div>
  );
}
