import { Button, Space, Card, Row, Col, Divider, Avatar, Table, Image,  DatePicker, Input, Tag, Modal, Form, 
    TimePicker, Checkbox, Select, Typography, Statistic } from "antd";
import React from "react";
import './Studentprofile.css';
import anonymous from '../images/anonymous.png'
import { Loading3QuartersOutlined, UserOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { json } from "react-router-dom";
import axios from 'axios';
import puplogo from '../images/pup.png'
import moment from "moment";
import { Pie} from '@ant-design/plots'


const { Text, Link } = Typography;

function Home () {
	
	return (
		<>
        <Typography.Title style={{marginTop:'10px'}} level={4}>Dashboard</Typography.Title>
		<div className="ContentTitle" style={{ display:'flex', marginTop:'-100px'}}>
            <div style={{display:"flex"}}>
                <Space direction="horizontal" >
                    <Card style={{backgroundColor: "#9254de", width:'250px'}}>
                        <Space direction="horizontal">
                            <UserOutlined style={{
                            borderRadius: 20,
                            fontSize: 30,
                            padding: 20,
                        }} />
                            <Statistic style={{marginLeft:'50px'}} title="Faculty" value={10}/>
                        </Space>
                    </Card>
                    <Card style={{backgroundColor: "#f759ab", width:'250px'}}>
                        <Space direction="horizontal">
                            <UserOutlined style={{
                            borderRadius: 20,
                            fontSize: 30,
                            padding: 20,
                        }} />
                            <Statistic style={{marginLeft:'50px'}} title="Students" value={100}/>
                        </Space>
                    </Card>
                    <Card style={{backgroundColor: "#ffc53d", width:'250px'}}>
                        <Space direction="horizontal">
                            <UserOutlined style={{
                            borderRadius: 20,
                            fontSize: 30,
                            padding: 20,
                        }} />
                            <Statistic style={{marginLeft:'50px'}} title="Visitors" value={20}/>
                        </Space>
                    </Card>
                </Space>
            </div>
            
            <div style={{marginTop:'100px', float:"left", marginLeft:'20px'}}>
            
            <Card style={{height:'300px', width:'350px', display:"flex"}}>
            <Typography.Title level={4}>Updates</Typography.Title>
            <Space style={{marginTop:'20px'}}>
                <Avatar size={35}  style={{ borderColor:"#e2e6ea", backgroundColor:'#e2e6ea'}}
                image src={<Image preview={false}  width={35} height={35} src={anonymous } /> } />
                 <Text strong >New user registered</Text>
                 <Typography style={{marginLeft:'32px'}}>6 minutes ago</Typography>
            </Space>
            <Space style={{marginTop:'20px'}}>
                <Avatar size={35}  style={{ borderColor:"#e2e6ea", backgroundColor:'#e2e6ea'}}
                image src={<Image preview={false}  width={35} height={35} src={anonymous } /> } />
                 <Text strong >John Doe Login</Text>
                 <Typography style={{marginLeft:'60px'}}>6 minutes ago</Typography>
            </Space>
            <Space style={{marginTop:'20px'}}>
                <Avatar size={35}  style={{ borderColor:"#e2e6ea", backgroundColor:'#e2e6ea'}}
                image src={<Image preview={false}  width={35} height={35} src={anonymous } /> } />
                 <Text strong >John Doe Logout</Text>
                 <Typography style={{marginLeft:'52px'}}>6 minutes ago</Typography>
            </Space>
            <Space style={{marginTop:'20px'}}>
                <Avatar size={35}  style={{ borderColor:"#e2e6ea", backgroundColor:'#e2e6ea'}}
                image src={<Image preview={false}  width={35} height={35} src={anonymous } /> } />
                 <Text strong >New user registered</Text>
                 <Typography style={{marginLeft:'32px'}}>6 minutes ago</Typography>
            </Space>
            </Card>
           
            </div>
            
        </div>
        <div style={{display:"flex", marginTop:'-80px'}}>
                <Card style={{height:'370px', width:'765px', display:"flex"}}>
                <Typography.Title level={4}>Recent Transaction</Typography.Title>
                <Space>
                <Typography.Title style={{marginLeft:'60px', marginRight:'90px'}} level={5}>ID</Typography.Title>
                <Typography.Title style={{marginRight:'90px'}} level={5}>Office</Typography.Title>
                <Typography.Title style={{marginRight:'90px'}} level={5}>Services</Typography.Title>
                <Typography.Title style={{marginRight:'90px'}} level={5}>Date</Typography.Title>
                <Typography.Title style={{marginRight:'50px'}} level={5}>Status</Typography.Title>
                </Space>
                <Space style={{marginTop:'20px'}}>
                <Text strong  style={{marginLeft:'25px'}}>PUPPQ000001</Text>
                <Text strong raphy style={{marginLeft:'25px'}}>Director’s office</Text>
                <Text strong  style={{marginLeft:'55px'}}>Appointment</Text>
                <Text strong  style={{marginLeft:'60px'}}>May 27, 2023</Text>
                <Tag color="processing" style={{fontSize:'17px', marginLeft:'40px'}}>Accepted</Tag>
                </Space>
                <Space style={{marginTop:'20px'}}>
                <Text strong  style={{marginLeft:'24px'}}>PUPPQ000002</Text>
                <Text strong raphy style={{marginLeft:'25px'}}>Director’s office</Text>
                <Text strong  style={{marginLeft:'55px'}}>Appointment</Text>
                <Text strong  style={{marginLeft:'60px'}}>May 27, 2023</Text>
                <Tag color="error" style={{fontSize:'17px', marginLeft:'40px'}}>Declined</Tag>
                </Space>
                <Space style={{marginTop:'20px'}}>
                <Text strong  style={{marginLeft:'24px'}}>PUPPQ000003</Text>
                <Text strong raphy style={{marginLeft:'25px'}}>Director’s office</Text>
                <Text strong  style={{marginLeft:'55px'}}>Appointment</Text>
                <Text strong  style={{marginLeft:'60px'}}>May 27, 2023</Text>
                <Tag color="success" style={{fontSize:'17px', marginLeft:'40px'}}>Pending</Tag>
                </Space>
                <Space style={{marginTop:'20px'}}>
                <Text strong  style={{marginLeft:'24px'}}>PUPPQ000004</Text>
                <Text strong raphy style={{marginLeft:'25px'}}>Director’s office</Text>
                <Text strong  style={{marginLeft:'55px'}}>Appointment</Text>
                <Text strong  style={{marginLeft:'60px'}}>May 27, 2023</Text>
                <Tag color="error" style={{fontSize:'17px', marginLeft:'40px'}}>Declined</Tag>
                </Space>
                <Space style={{marginTop:'20px'}}>
                <Text strong  style={{marginLeft:'24px'}}>PUPPQ000005</Text>
                <Text strong raphy style={{marginLeft:'25px'}}>Director’s office</Text>
                <Text strong  style={{marginLeft:'55px'}}>Appointment</Text>
                <Text strong  style={{marginLeft:'60px'}}>May 27, 2023</Text>
                <Tag color="processing" style={{fontSize:'17px', marginLeft:'40px'}}>Accepted</Tag>
                </Space>
                

                </Card>
                <div style={{marginTop:'100px', float:"left", marginLeft:'20px'}}>
            
            <Card style={{height:'270px', width:'350px', display:"flex"}}>
            <Typography.Title level={4}>Users by device</Typography.Title>
            <DemoPie />
            
            </Card>
            </div>
        </div>
        
       
        
		
        </>

    )
};
  

const DemoPie = () => {
    const data = [
      {
        type: 'Kiosk',
        value: 50,
      },
      {
        type: 'Dekstop',
        value: 25,
      },
      {
        type: 'Mobile',
        value: 18,
      },
      
    ];
    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.9,
      label: {
        type: 'inner',
        offset: '-30%',
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      interactions: [
        {
          type: 'element-active',
        },
      ],
    };
    return <Pie style={{height:'250px', width:'330px', marginTop:'-25px'}}{...config} />;
  };




export default Home;

