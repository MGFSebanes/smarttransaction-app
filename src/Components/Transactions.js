import React, {Component} from "react"; 
import puplogo from '../images/pup.png';
import { Table, Layout, Button, Space, Popconfirm,Switch, Form, Modal, Input, Upload, Typography, Checkbox, Select, Tag  } from 'antd';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Homepage.css';
import { PlusCircleOutlined, FileExcelOutlined, SearchOutlined, CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import { CSVLink } from "react-csv";
import moment from "moment";

const App = () => (

      <>
      <Typography.Title style={{marginTop:'10px'}} level={4}>Transaction</Typography.Title>
        <Transaction/>
      </>
        
          
      

);

const Transaction = () => {
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
        const response = await axios.get(
        "http://localhost:56630/api/Transactions"
        );
        setGridData(response.data);
        setLoading(false);
			
	
	  
	}
	
	const modifiedData = gridData.map(({ body, ...item}) => ({
		...item,
		key: item.ID,
		SDate: moment(item.Date).format("MMMM DD, YYYY"),
		ServicesType: (item.personelName !== null? item.personelName : item.Services),
		Schedule: (item.DateSchedule !== null? moment(item.DateSchedule).format("MMMM DD, YYYY") : moment(item.Date).format("MMMM DD, YYYY"))
	  }));
	

    ///////////////////// Csv
    const headers =[
        { label: "Document Number", key:'DocuNumber'},
        { label: "Name", key:'Name'},
        { label: "Contact Number", key:"ContactNumber"},
		{ label: "Office", key:"Office"},
		{ label: "Personel Name", key:"personelName"},
		{ label: "Services", key:"Services"},
		{ label: "Service Category", key:"ServiceCategory"},
		{ label: "Date", key:"Date"},
		{ label: "Date Schedule", key:"DateSchedule"},
		{ label: "Time", key:"Time"},
		{ label: "Reason", key:"Reason"},
		{ label: "Status", key:"Status"},

    
    
        
    
      ];
    
      const csvReport = {
        filename: 'Transactions.csv',
        headers: headers,
        data: modifiedData
      }
    ////////////////////

	const columns = [
			{
			  title: "Reference Number",
			  dataIndex: 'DocuNumber',
			  key:'DocuNumber',
			  align: 'center',
			  sorter: (a, b) => {return a.DocuNumber > b.DocuNumber},
			  ...getColumnSearchProps('DocuNumber'),
			  
			  
			},
			{
				title: "Name",
				dataIndex: 'Name',
				key:'Name',
				align: 'center',
				render: (text) => <a>{text}</a>,
				
			  },
			{
			  title: "Services",
			  dataIndex: 'ServicesType',
			  key:'ServicesType',
			  align: 'center',
			  render: (text) => <a>{text}</a>,
			  
			},
	  
			{
			  title: "Service Type",
			  dataIndex: 'ServiceType',
			  key:'Services',
			  align: 'center',
			  filters:[
				  {text: 'Document', value:"Document"},
				  {text: 'Appointment', value:'Appointment'}
	  
			  ],
			  onFilter:(value, {Services}) => {
				  return Services === value
			  },
			  render: (text) => <a>{text}</a>,
			  
			},
			
			{
			  title: "Date",
			  dataIndex: 'Schedule',
			  key:'Schedule',
			  align: 'center',
			  ...getColumnSearchProps('Schedule'),
			  render:(e,{Time}) =>(
				  <>
				  <a>{Time}</a>
				  <br/>
				  <a>{e}</a>
				  </>
				)
			  
			  
			},
			{
			  title: "Status",
			  dataIndex: 'Status',
			  key:'Status',
			  align: 'center',
			  filters:[
				  {text: 'Pending', value:'Pending'},
				  {text: 'Complete', value:"Completed"},
				  {text: 'On-process', value:'On-Process'},
				  {text: 'Accepted', value:'Accepted'},
				  {text: 'Declined', value:'Declined'},
	  
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
	pagination={{
		pageSizeOptions: ["5", "10", "15"],
		showSizeChanger: true,
		locale: { items_per_page: "" },
		defaultPageSize: 5
		
	  }}
	bordered 
	style={{marginRight:'24px'}}
	title={() => 
		
			<>
            <Space>
              <Button type="primary"style={{display:"flex", }} >
              <PlusCircleOutlined style={{marginTop:'3px'}}/>
                Add New
              </Button>
              <Button type="primary"style={{display:"flex", backgroundColor:'#005e14' }}>
              <FileExcelOutlined style={{marginTop:'3px'}}/>
                Import
              </Button>
              <CSVLink {...csvReport} style={{ textDecoration: 'none', color: "white", backgroundColor:'#005e14', height: '32px', display:'flex', borderRadius:'6px',
              paddingLeft:'14px', paddingTop:'4px', width:'95px',
            }}>
              <FileExcelOutlined style={{marginTop:'5px', marginRight:'10px'}}/>
                Export
              </CSVLink>
              
            </Space>
				
			
			</>
	}
	/>;
}


export default App;