import { Button, Space, Card, Row, Col, Divider, Avatar, Table, Image,  DatePicker, Input, Modal, Checkbox, Select, 
    TimePicker, Form, message, Typography, Tag, Pagination, Alert  } from "antd";
  import React from "react";
  import './Studentprofile.css';
  import anonymous from '../images/anonymous.png'
  import { SearchOutlined, CheckCircleTwoTone, CloseCircleTwoTone, CheckCircleOutlined} from '@ant-design/icons';
  import { useRef, useState, useEffect } from 'react';
  import Highlighter from 'react-highlight-words';
  import office from '../images/office.jpg'
  import puplogo from '../images/pup.png'
  import axios from 'axios';
  import moment from "moment/moment";
  import {useNavigate} from 'react-router-dom'
  
  
  const { RangePicker } = DatePicker;
  const { Text, Link } = Typography;
  
  const Home = () => {
    const [gridData, setGridData] = useState ([]);
    const [data2, setData1] = useState([]);
    const [loading1, setLoading1] = useState(false);

    //// Show 
	useEffect(() => {
		const data = localStorage.getItem('user-info')
		setData1(JSON.parse(data))
		
		
	  },[])

	useEffect(() => {
		loadData();
	  }, []);

	  
	
	  const loadData = async () => {
		setLoading1(false);
		const stdid = JSON.parse(localStorage.getItem('user-info'))
		
		
		
		let result  = await fetch("http://localhost:56630/api/Transactions/UserTransaction",{
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": 'application/json'
			},
			body: JSON.stringify({AccountNumber: stdid[0].ID})
			})
			result = await result.json();
			if(result === "Invalid User"){
			
			setLoading1(false);
			}
			else{
        const filteredData = result.filter((item) => item.ServiceType === "Appointment");
				setGridData(filteredData)
				setLoading1(false)
			}
			
	
	  
	}

  const modifiedData = gridData.map(({ body, ...item}) => ({
		...item,
		key: item.ID,
		SDate: moment(item.Date).format("MMMM DD, YYYY"),
    AppointmentDetails : (item.Services === null? item.personelName : item.Services)
		
		
	  }));
    const columns = [
    {
      title: "Appointment Code",
      dataIndex: 'DocuNumber',
      key:'DocuNumber',
      align: 'center',
      
      },
      {
      title: "Appointment",
      dataIndex: 'Office',
      key:'Office',
      align: 'center',
      render:(e,{AppointmentDetails}) =>(
        <>
        <a>{AppointmentDetails}</a>
        <br/>
        <a>{e}</a>
        </>
      )
   
      
      },
      {
      title: "Schedule",
      dataIndex: 'Time',
      key:'Time',
      align: 'center',
      render:(e,{SDate}) =>(
        <>
        <a>{e}</a>
        <br/>
        <a>{SDate}</a>
        </>
      )
      
      },
      {
      title: "Status",
      dataIndex: "Status",
      key:'Status',
      align: 'center',
      filters:[
        {text: 'Pending', value:"Pending"},
        {text: 'Accepted', value:'Accepted'},
        {text: 'Diclined', value:'Diclined'},
        {text: 'Done', value:'Done'},
  
      ],
      onFilter:(value, {Status}) => {
        return Status === value
      },
      render: (_, { Status }) => (
        <Tag color={Status === "Diclined"? 'volcano' : 'blue'} key={Status}>
        {Status.toUpperCase()}
        </Tag>
    ),
      
      },
      {
      title: "Action",
      dataIndex: 'Action',
      key:'Action',
      align: 'center',
      },
      
     
  
    ];
    const navigate = useNavigate()
    const ShowAppointment = () => {
        navigate("/Profile/RequestAppointment")
    }
    
    return (
      <>
      <Typography.Title style={{marginTop:'10px'}} level={4}>Your Appointment</Typography.Title>
      
      <Alert style={{marginRight:'24px', color:'#fff', backgroundColor:'#17a2b8', borderColor:'#148ea1', marginBottom:'20px' }}
      message={<Typography.Title style={{color:'#fff', fontSize:'20px'}} level={6}>Reminder</Typography.Title>}
      description= { <>
                     <p>Click the button  to answer the Health Declaration Form.</p>
                     <p>You may answer the Health Declaration Form once your appointment request has been approved and a day before your scheduled appointment.</p>
                     <p>Click the button  to generate Gate Pass.</p>
                     <p>You may generate a Gate Pass after answering the Health Declaration Form. You will not be allowed to enter the PUP premises if you do not have a Gate Pass.</p>
                     </>
                     }
      type="info"
      showIcon
      closable
      
    />
    <Card className="Cardinfo4"
    title="Your Appointments"
    extra={<Button type="primary" onClick={ShowAppointment} >Request Appointment</Button>}
    
    bordered={false}
    style={{
      marginRight:'24px',
      
    }}
  >

  <Table columns={columns} 
  dataSource={modifiedData}
	bordered 
	
	
	
	/>
  </Card>
      
    
      
      </>
    )
  }
      
      

      
         
      
       
    
         
       
     
  
  
  
  
  
 
  
    
  
  
  
  
  
  
  
  export default Home;
  
