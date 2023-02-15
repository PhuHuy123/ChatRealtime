import React, { useContext, useMemo, useState } from "react";
import { Button, Avatar, Tooltip, Form, Input, Alert } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/sevives";
import { AuthContext } from "../../Context/AuthProvider";
import useFirestore from "../../hooks/useFirestore";

export default function ChatWindow() {
  const { selectedRoom, members, setIsInviteMember } = useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });
    form.resetFields(["message"]);
  };

  const messageCondition = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    };
  }, [selectedRoom.id]);

  const messages = useFirestore("messages", messageCondition);

  // const selectedMessages = useMemo(
  //   () => rooms.find((room) => room.id === selectedRoomId) || {},
  //   []
  // );
  return (
    <div className="chat_window">
      {selectedRoom.id ? (
        <>
          <header>
            <div className="h_left">
              <p>{selectedRoom?.name}</p>
              <span>{selectedRoom?.description}</span>
            </div>
            <div className="h_right">
              <Button
                icon={<UserAddOutlined />}
                onClick={() => setIsInviteMember(true)}
              >
                Mời
              </Button>
              <Avatar.Group maxCount={2} size="small">
                {members &&
                  members.map((member) => (
                    <Tooltip title={member?.displayName} key={member?.id}>
                      <Avatar src={member?.photoURL}>
                        {member?.photoURL
                          ? ""
                          : member?.displayName?.charAt(0)?.toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  ))}
              </Avatar.Group>
            </div>
          </header>
          <div className="window_content">
            <div className="message">
              {messages &&
                messages.map((mes) => (
                  <Message
                    key={mes.id}
                    text={mes.text}
                    displayName={mes.displayName}
                    photoURL={mes.photoURL}
                    createAt={mes.createdAt}
                    idUser={mes.uid}
                  />
                ))}
            </div>
            <Form className="form" form={form}>
              <Form.Item name="message">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleSubmit}
                  placeholder="Nhập tin nhắn..."
                  bordered={false}
                  autoComplete="off"
                />
              </Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Gửi
              </Button>
            </Form>
          </div>
        </>
      ) : (
        <Alert
          message="Hãy chọn phòng chat"
          type="info"
          showIcon
          closable
          style={{ margin: 5 }}
        />
      )}
    </div>
  );
}
