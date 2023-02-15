import React, { useContext } from "react";
import { Collapse, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";

import { AppContext } from "../../Context/AppProvider";

const { Panel } = Collapse;

export default function RoomList() {
  const {rooms, setIsAddRoomVisible, setSelectedRoomId} = useContext(AppContext)

  return (
    <Collapse defaultActiveKey={[1]} className="room_list">
      <Panel header="Danh sách các phòng" key="1">
        {rooms.map((room) => (
          <Typography key={room.id} onClick={()=>setSelectedRoomId(room.id)}>
            <Link>{room.name}</Link>
          </Typography>
        ))}
        <Button type="text" icon={<PlusCircleOutlined />} className="add_room" onClick={()=>setIsAddRoomVisible(true)}>
          Thêm phòng
        </Button>
      </Panel>
    </Collapse>
  );
}
