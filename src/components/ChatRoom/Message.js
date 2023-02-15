import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns/esm";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

function formatDate(seconds) {
    let formatDate = '';
    if(seconds){
        formatDate=formatRelative(new Date(seconds * 1000), new Date())
        formatDate=formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
    }
    return formatDate
}

export default function Message({text, displayName, photoURL, createAt, idUser}){
    const {user: {uid}} = useContext(AuthContext)
    return(
        <div className={idUser===uid?"wrapper_styled_me":"wrapper_styled"}>
            <div>
                <Avatar size="small" src={photoURL}>{photoURL? '':displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="author">{idUser===uid?"Tôi":displayName}</Typography.Text>
                <Typography.Text className="date">{formatDate(createAt?.seconds)}</Typography.Text>
            </div>
            <div>
                <Typography.Text className="content">{text}</Typography.Text>
            </div>
        </div>
    )

}