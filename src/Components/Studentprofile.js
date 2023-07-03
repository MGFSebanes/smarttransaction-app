import { Button, Space, Card, Row, Col, Divider, Avatar, Table, Image,  DatePicker, Input, Tag, Modal, Form, TimePicker, Checkbox, Select } from "antd";
import React from "react";
import './Studentprofile.css';
import anonymous from '../images/anonymous.png'
import {  SearchOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { json } from "react-router-dom";
import axios from 'axios';
import puplogo from '../images/pup.png'
import moment from "moment";

const { RangePicker } = DatePicker;
const Home = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const data = localStorage.getItem('user-info')
		setData(JSON.parse(data))
	},[])
	return (
		<>
			{
				data.map(datas => {
					return(
						<>
							<div className="ContentTitle" style={{marginTop:'7px'}}>User Profile
		<Button type="primary" className="btnpayment"> Payment</Button>


		<Card className="Cardinfo" >
		<div class="column red">
		<Avatar size={150} style={{ color: 'white', borderColor:"#e2e6ea", backgroundColor:"#e2e6ea"}}
		/// image //*
			src={<Image src={"http://localhost:56630/Photos/" + datas.ProfilePic}   /> } /> 
			
		</div>
			<div class="row">
			
				<div class="column green">
				<h3 class="user-name m-t-0 m-b-0">{datas.FirstName} {datas.LastName}</h3>
				<small class="text-muted">Student</small>
				<div class="staff-id">Student ID : <a href="#">{datas.IDNumber}</a></div>
				<div class="staff-id">Card ID : <a href="#">{datas.ControlNo}</a></div>													
				<div class="staff-msg">
				<a href="edit-profile.html"><Button type="primary" className="btnedit"> Edit Profile</Button></a>
				<a href="chat.html" ><Button type="primary" className="btnsendmsg">Send Message</Button></a>
				</div>
			</div>
			
				<div class="column blue">
				<li>
					<span class="title">Status:</span>
					<span class="text"><a href="#">Active</a></span>
					</li>
					<li>
					<span class="title">Phone:</span>
					<span class="text"><a href="#">{datas.ContactNumber}</a></span>
					</li>
					<li>
					<span class="title">Email:</span>
					<span class="text"><a href="#">{datas.Gmail}</a></span>
					</li>
					<li>
					</li>
					<li>
					<span class="title">Address:</span>
					<span class="text"><a href="#">{datas.Cities}</a></span>
					
				</li>
			</div>
			</div>

		</Card>
		
		<div className="datatable">
		<App />
		

		</div>
		
		</div>



						
						</>
					)
				})
			}
			</>
		
		
	)
};
  

  const App = () => {
	const [gridData, setGridData] = useState ([]);
	const [data, setData] = useState([]);
	const [searchText, setSearchText] = useState('');
  	const [searchedColumn, setSearchedColumn] = useState('');
  	const searchInput = useRef(null);
	const [isDocumentopen, setIsdocumentopen] = useState(false);
	const [form] = Form.useForm();
	const [isappointment, setIsappointment] = useState(false);
	const [loading, setLoading] = useState(false);
  	const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
	
	



	//// Show 
	useEffect(() => {
		const data = localStorage.getItem('user-info')
		setData(JSON.parse(data))
		
		
	  },[])

	useEffect(() => {
		loadData();
	  }, []);

	  
	
	  const loadData = async () => {
		setLoading(false);
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
			
			setLoading(false);
			}
			else{
				setGridData(result)
				setLoading(false)
			}
			
	
	  
	}
	
	const modifiedData = gridData.map(({ body, ...item}) => ({
		...item,
		key: item.ID,
		SDate: moment(item.Date).format("MMMM DD, YYYY")
		
		
	  }));
	




	const columns = [
	{
		title: "Date",
		dataIndex: 'Date',
		key:'Date',
		align: 'center',
		...getColumnSearchProps('SDate'),
		render: (text) => <a>{moment(text).format("MMMM DD, YYYY")}</a>,
		
		
	  },
	  {
		title: "Reference Number",
		dataIndex: 'DocuNumber',
		key:'DocuNumber',
		align: 'center',
		sorter: (a, b) => {return a.DocuNumber > b.DocuNumber},
		...getColumnSearchProps('DocuNumber'),
		
		
	  },
	  {
		title: "Service Requested",
		dataIndex: 'ServiceType',
		key:'ServiceType',
		align: 'center',
		filters:[
			{text: 'Document', value:"Document"},
			{text: 'Appointment', value:'Appointment'}

		],
		onFilter:(value, {ServiceType}) => {
			return ServiceType === value
		},
		render: (text) => <a>{text}</a>,
		
	  },
	  {
		title: "Office",
		dataIndex: 'Office',
		key:'Office',
		align: 'center',
		render: (text) => <a>{text}</a>,
		
	  },
	  
	  
	  
	
	  {
		title: "Status",
		dataIndex: 'Status',
		key:'Status',
		align: 'center',
		filters:[
			{text: 'Pending', value:'Pending'},
			{text: 'Complete', value:"Completed"},
			{text: 'On-process', value:'On - Process'},
			{text: 'Accept', value:'Accepted'},
			{text: 'Declined', value:'Declined'},
			{text: 'Done', value:'Done'},

		],
		onFilter:(value, {Status}) => {
			return Status === value
		},
		render:(_, {Status}) =>(

			<Tag color={Status === "Declined"? 'volcano' : 'blue' } key={Status}>
					{Status.toUpperCase()}
				  </Tag>
		)
			
	  
		}

	];
	return <Table columns={columns} 
	
	
	dataSource={modifiedData}
	loading={loading}
	pagination={{pageSize: 5,}}
	bordered 
	
	
	
	/>;
  };




export default Home;

