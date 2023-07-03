import { Button, Space, Card, Avatar, Table, Image,  DatePicker, Input, Popconfirm, Tag, Modal, Form, TimePicker, Checkbox, Select  } from "antd";
import React from "react";
import './Studentprofile.css';
import anonymous from '../images/anonymous.png'
import { SearchOutlined, CalendarOutlined, ClockCircleOutlined} from '@ant-design/icons';
import { useRef, useState, useEffect} from 'react';
import Highlighter from 'react-highlight-words';
import office1 from '../images/office1.png'
import puplogo from '../images/pup.png'
import moment from "moment";
import axios from "axios";
import emailjs from '@emailjs/browser';

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
							<div className="ContentTitle" style={{marginTop:'7px'}}>My Profile
		


		<Card className="Cardinfo" >
		<div class="column red">
		<Avatar size={150} style={{ color: 'white', borderColor:"#e2e6ea", backgroundColor:"#e2e6ea"}}
		/// image //*
			src={<Image src={"http://localhost:56630/Photos/" + datas.ProfilePic}   /> } /> 
			
		</div>
			<div class="row">
			
				<div class="column green">
				<h3 class="user-name m-t-0 m-b-0">{datas.FirstName} {datas.LastName}</h3>
				<small class="text-muted">{datas.Role === "Director's Office"? "Campus Director":"Faculty"}</small>
				<div class="staff-id">Employee ID : <a href="#">{datas.IDNumber}</a></div>
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
		
		const stdid = JSON.parse(localStorage.getItem('user-info'))
		
		
		
		let result  = await fetch("http://localhost:56630/api/Transactions/Faculty",{
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": 'application/json'
			},
			body: JSON.stringify({Office: stdid[0].Role})
			})
			result = await result.json();
			
			if(result === "Invalid User"){
			
			console.log(result)
			}
			else{
				setGridData(result)
				
			}
    		
	
	  
	}
	
	const modifiedData = gridData.map(({ body, ...item}) => ({
		...item,
		key: item.ID,
		SDate: moment(item.Date).format("MMMM DD, YYYY"),
		ServicesType: (item.personelName !== null? item.personelName : item.Services),
		Schedule: (item.DateSchedule !== null? moment(item.DateSchedule).format("MMMM DD, YYYY") : moment(item.Date).format("MMMM DD, YYYY"))
	  }));
	
///// view ////

	  

	  const handleCancel = () => {
		setIsdocumentopen(false)
	  }

	  const handleChange = (value) => {
		console.log(`selected ${value}`);
	  };

	/// Appoitment
	const AhandleCancel = () => {
		setIsappointment(false)
	  }
	//// Action
	const Declined = (Record, e) => {
		data.map(datas => { 
			const Name = (datas.LastName + "," + " " + datas.FirstName + " " + datas.MiddleName)
		e.stopPropagation();
		axios.put('http://localhost:56630/api/Transactions/UpdateTransactionStatus' , {ID: Record.ID, Status:"Declined"})
		.then((result) => {
		  console.log(result)
		  loadData();
		})
		const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("Your appointment request has been Declined")})
		emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
		.then((result) => {
		  console.log(Emaildata)
		  console.log(result.text);
		  }, (error) => {
			  console.log(error.text);
		  })
	})
	}

	const Process = (Record, e) => {
		
		e.stopPropagation();
		data.map(datas => { 
			const Name = (datas.LastName + "," + " " + datas.FirstName + " " + datas.MiddleName)
		axios.put('http://localhost:56630/api/Transactions/UpdateTransactionStatus' , {ID: Record.ID, Status:"On - Process"})
		.then((result) => {
		  console.log(result)
		  loadData();
		})
		const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("This is to acknowlege your request for the service" + " " + Record.Services + " " + "has now on - Process" + " " + "For inquires, Please contact the concerned office." )})
		emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
		.then((result) => {
		  console.log(Emaildata)
		  console.log(result.text);
		  }, (error) => {
			  console.log(error.text);
		  })
		})
		
	}

	const Done = (Record, e) => {
		data.map(datas => { 
			const Name = (datas.LastName + "," + " " + datas.FirstName + " " + datas.MiddleName)
		e.stopPropagation();
		axios.put('http://localhost:56630/api/Transactions/UpdateTransactionStatus' , {ID: Record.ID, Status:"Completed"})
		.then((result) => {
		  console.log(result)
		  loadData();
		})
		const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("This is to acknowlege your request for the service" + " " + Record.Services + " " + "has now Completed" + " " + "For inquires, Please contact the concerned office." )})
		emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
		.then((result) => {
		  console.log(Emaildata)
		  console.log(result.text);
		  }, (error) => {
			  console.log(error.text);
		  })
	})
	}

	const Accept = (Record, e) => {
		data.map(datas => { 
			const Name = (datas.LastName + "," + " " + datas.FirstName + " " + datas.MiddleName)
		e.stopPropagation();
		axios.put('http://localhost:56630/api/Transactions/UpdateTransactionStatus' , {ID: Record.ID, Status:"Accepted"})
		.then((result) => {
		  console.log(result)
		  loadData();
		})
		const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("Your appointment request has been Approved")})
		emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
		.then((result) => {
		  console.log(Emaildata)
		  console.log(result.text);
		  }, (error) => {
			  console.log(error.text);
		  })
	})
	}

	const AppointDone = (Record, e) => {
		
		e.stopPropagation();
		axios.put('http://localhost:56630/api/Transactions/UpdateTransactionStatus' , {ID: Record.ID, Status:"Completed"})
		.then((result) => {
		  console.log(result)
		  loadData();
		})
	}





	/////

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
			{text: 'On-process', value:'On - Process'},
			{text: 'Accept', value:'Accepted'},
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
			
	  
		},
		{
		title: "Action",
		dataIndex: "Action",
		align:'center',
		key:'Action',
		render: (_, record, ) => {
			return (
						record.ServiceType === "Document"?
						<>
						<Space>
						<Popconfirm title="Are you Sure you want to change Status?" onConfirm={(e) =>Process(record, e)} onCancel={(e) =>e.stopPropagation()}>
							<Button type="primary" onClick={(e) => e.stopPropagation()} disabled={record.Status === "Pending"? false : true}>Process</Button>
						</Popconfirm>

						<Popconfirm title="Are you Sure you want to change Status?" onConfirm={(e) =>Done(record, e)} onCancel={(e) =>e.stopPropagation()}>
						<Button type="primary" onClick={(e) => e.stopPropagation()} disabled={record.Status === "Pending"? true : false || record.Status === "Completed"? true : false } >Done</Button>
						</Popconfirm>

						</Space>
						
						</>:
						<>
						<Space >
						<Popconfirm title="Are you Sure you want to Accept?" onConfirm={(e) =>Accept(record, e)} onCancel={(e) =>e.stopPropagation()}>
							<Button type="primary" onClick={(e) => e.stopPropagation()} style={{display:  record.Status === "Accepted" || record.Status === "Completed"? 'none' : 'block'}}
							disabled={record.Status === "Declined"? true : false}>Accept</Button>
						</Popconfirm>

						<Popconfirm title="Are you Sure you want to decline?" onConfirm={(e) =>Declined(record, e)} onCancel={(e) =>e.stopPropagation()}>
							<Button danger type="primary" onClick={(e) => e.stopPropagation()} style={{display:  record.Status === "Accepted" || record.Status === "Completed"? 'none' : 'block'}}
							disabled={record.Status === "Declined"? true : false}>Decline</Button>
						</Popconfirm>
						</Space >
						<Space >
						<Popconfirm title="Are you Sure you want to change Status??" onConfirm={(e) =>AppointDone(record, e)} onCancel={(e) =>e.stopPropagation()}>
							<Button type="primary" onClick={(e) => e.stopPropagation()} style={{display: record.Status === "Pending" || record.Status === "Declined"? 'none' : 'block'}}
							disabled={record.Status === "Completed"? true : false}>Done</Button>
						</Popconfirm>

						<Popconfirm title="Are you Sure you want to change Status??"  onCancel={(e) =>e.stopPropagation()}>
							<Button danger type="primary" onClick={(e) => e.stopPropagation()} style={{display: record.Status === "Pending" || record.Status === "Declined"? 'none' : 'block'  }}
							disabled={record.Status === "Completed"? true : false}>Cancel</Button>
						</Popconfirm>
						</Space>
						</>
			)
            

      }
		}

	];
	return <Table columns={columns} 
	
	
	dataSource={modifiedData}
	
	pagination={{
		pageSizeOptions: ["5", "10", "15"],
		showSizeChanger: true,
		locale: { items_per_page: "" },
		defaultPageSize: 5
		
	  }}
	bordered 
	
	
	
			
			
	/>;
  };


export default Home;