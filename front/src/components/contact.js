
import "antd/dist/antd.css";
import "../App.css";
import {Button, Table, Modal, Input} from "antd";
import { useEffect, useState } from "react";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import axios from "axios";
function Contact () {

useEffect(()=>{
  axios.get('http://localhost:8080/api/contacts/').then(res=>{
  console.log(res);
  setDataSourse(res.data);
})
},[])
  const [isEditing, setIsEditing] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [dataSourse, setDataSourse] = useState 
    ([
        {
            id:1,
            familywho: "father",
            familyphone: "89110011",
          
        },
        {
            id:2,
            familywho: "sis",
            familyphone: "89110012"
        },
        {
            id:3,
            familywho: "bro",
            familyphone: "89110013"
        },
        {
            id:4,
            familywho: "mom",
            familyphone: "89110014"
        }
      ]);
  const columns = [
        {
        key: "1",
        title: "ID",
        dataIndex:"id"
        },
        {
        key: "3",
        title: "familywho",
        dataIndex:"familywho"
        },
        {
        key: "4",
        title: "familyphone",
        dataIndex:"familyphone",
        },
        {
        key: "5",
        title: "Actions",
        render:(record)=> 
        {
          return<>
          <EditOutlined
           onClick={() => {
            onEditContact(record);
          }}
          style={{color: "#1890FF", marginLeft: 10}}
          />
          <DeleteOutlined 
            onClick={() => {
              onDeleteContact(record);
            }}
            style={{color: "red", marginLeft: 10}}/>
          </>
        }
        }
    ];

    const onAddContact=()=> {
      const randomNumber = parseInt(Math.random()*1000);
      const newContact = {
        id: randomNumber,
        phone: "89110001" + randomNumber,
        familywho: "mom" + randomNumber,
        familyphone: "89110014" + randomNumber
      };
      setDataSourse((pre) => {
        return [...pre, newContact];
      });
    };

    const onDeleteContact=(record)=> {
      Modal.confirm ({
        title: "Устгах уу",
        okText: "Тийм",
        cancelText: "Үгүй",
        onOk:()=> {
          setDataSourse(pre=> {
            return pre.filter((contact)=> contact.id !==record.id);
          });
        }
      });
    };

    const onEditContact=(record)=> {
      setIsEditing(true);
      setEditingContact ({...record})
    };

    const resetEditing=()=> {
      setIsEditing(false);
      setEditingContact(null);
    };
   

    return (
        <div className="App">
            <header style={{justifyContent: "flex-end"}}>
                <Table className="ant-table-thead" size="large" columns={columns} dataSource={dataSourse}></Table>
                <Button type="primary" shape="round" onClick={onAddContact}>ДУГААР НЭМЭХ </Button>
                <Modal 
                title= "Edit Contact" 
                visible={isEditing}
                onCancel={()=> {
                  setIsEditing(false);
                }}
                onOk={() => {
                  setDataSourse(pre=>{
                    return pre.map(contact=>{
                      if(contact.id === editingContact.id){
                        return editingContact;
                      }else {
                        return contact;
                      }
                    });
                  });
                  resetEditing()
                }}
                >
                  {/* <Input value={editingContact?.phone}/> */}
                  <Input 
                  value={editingContact?.familywho}
                  placeholder="Таны хэн болох"
                  onChange={(e) => {
                    setEditingContact((pre) => {
                    return{...pre, familywho: e.target.value};
                  });
                }}
                />
                  <Input 
                   value={editingContact?.familyphone}
                   placeholder="Утасны дугаар"
                   onChange={(e) => {
                     setEditingContact((pre) => {
                     return{...pre, familyphone: e.target.value};
                   });
                 }}
                  />
                </Modal>
            </header>
        </div>
    )
}
export default Contact;



