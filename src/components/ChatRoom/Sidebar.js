import React from "react";
import {Row, Col} from "antd"
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";

export default function Sidebar(){
    return(
        <div style={{backgroundColor: "#7e1b57", height: "100%"}}>
            <Row>
                <Col span={24}>
                    <UserInfo/>
                </Col>
                <Col span={24}>
                    <RoomList/>
                </Col>
            </Row>
        </div>
    )

}