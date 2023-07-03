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
      <Typography.Title style={{marginTop:'10px'}} level={4}>Users Activity Log</Typography.Title>
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
        "http://localhost:56630/api/UserLog"
        );
        setGridData(response.data);
        setLoading(false);
        console.log(response.data)
	
	  
	}
	
	const modifiedData = gridData.map(({ body, ...item}) => ({
		...item,
		key: item.ID,
		SDate: moment(item.Date).format("MMMM DD, YYYY")
		
		
	  }));
	



	  
    ///////////////////// Csv
    const headers =[
        { label: "Control Number", key:'ControlNo'},
        { label: "Log State", key:'LogState'},
        { label: "Name", key:'Name'},
        { label: "Date", key:'Date'},
        { label: "Time", key:'Time'},
        
    
    
        
    
      ];
    
      const csvReport = {
        filename: 'UserLog.csv',
        headers: headers,
        data: modifiedData
      }
    ////////////////////

	const columns = [
	  {
		title: "Control Number",
		dataIndex: 'ControlNo',
		key:'ControlNo',
		align: 'center',
		render: (e, record) => <Button type="link" >{e}</Button>,
		
	  },
	  {
		title: "Log State",
		dataIndex: 'LogState',
		key:'LogState',
		align: 'center',
		render: (text) => <a>{text}</a>,
		
	  },
	  
	  {
		title: "Name",
		dataIndex: 'Name',
		key:'Name',
		align: 'center',
		render: (text) => <a>{text}</a>,
		
	  },
      {
		title: "Date",
		dataIndex: 'SDate',
		key:'Date',
		align: 'center',
		render: (text) => <a>{text}</a>,
		
	  },

      {
		title: "Time",
		dataIndex: 'Time',
		key:'Time',
		align: 'center',
		render: (text) => <a>{text}</a>,
		
	  },
	  
	  
			
	  
		

	];
	return <Table 
    columns={columns} 
	
	
	dataSource={modifiedData}
	loading={loading}
	bordered 
  pagination={{
    pageSizeOptions: ["5", "10", "15"],
    showSizeChanger: true,
    locale: { items_per_page: "" },
    defaultPageSize: 5
    
  }}
	
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