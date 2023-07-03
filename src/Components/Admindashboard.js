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
		setLoading(true);
		const stdid = JSON.parse(localStorage.getItem('user-info'))
		
		
		
		let result  = await fetch("http://localhost:56630/api/Transactions/UserTransaction",{
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": 'application/json'
			},
			body: JSON.stringify({studNo: stdid[0].IDNumber})
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
	
///// view ////

	  const showModal = (record) => {
		if(record.Services === "Document"){
			setIsdocumentopen(true)
			form.setFieldsValue({
      
				
				Deploma: record.Deploma ==="true"? true : false,
				Transcript: record.Transrecord ==="true"? true : false,
				CertofGrad: record.Certgrad ==="true"? true : false,
				HonDismiss: record.Hondismiss ==="true"? true : false,
				CertofUnits: record.Certunits ==="true"? true : false,
				CertNoID: record.CertID ==="true"? true : false,
				CopyGrade: record.Copygrade ==="true"? true : false,
				CertGWA: record.CertGWA ==="true"? true : false,
				CertNSTP: record.CertNSTP ==="true"? true : false,
				CertSubjDescript : record.CertSubDesc ==="true"? true : false,
				CertofEnroll: record.CertEnroll ==="true"? true : false,
				CertofReg: record.CertReg ==="true"? true : false,
				CertofGoodMoral: record.CertGood ==="true"? true : false,
				Reason: record.Reason,
				AcadYear: record.AY,
				First: record.Semester ==="First"? true : false,
				Second: record.Semester ==="Second"? true : false,
				Summer: record.Semester ==="Summer"? true : false,
				Name: record.Name,
				studno: record.studNo,
				progyear: record.ProgramYrSec,
				Email: record.Email,
				Date: moment(record.Date).format("MMM DD, YYYY")
			


			   
				
			  })
		}
		else{
			setIsappointment(true)
			form.setFieldsValue({
				Name: record.Name,
				studno: record.studNo,
				progyear: record.ProgramYrSec,
				Email: record.Email,
				AcadYear: record.AY,
				Reason: record.Reason,
				Date1: moment(record.Date).format("MMM DD, YYYY"),
				Times: record.ReqTime,
				Date3: moment(record.ReqDate).format("MMM DD, YYYY")

			})
			
		}
	  }

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


	const columns = [
	  {
		title: "ID",
		dataIndex: 'DocuNumber',
		key:'DocuNumber',
		align: 'center',
		sorter: (a, b) => {return a.DocuNumber > b.DocuNumber},
		...getColumnSearchProps('DocuNumber'),
		render: (e, record) => <Button type="link" onClick={() => showModal(record)} >{e}</Button>,
		
	  },
	  {
		title: "Office",
		dataIndex: 'Office',
		key:'Office',
		align: 'center',
		render: (text) => <a>{text}</a>,
		
	  },
	  
	  {
		title: "Services",
		dataIndex: 'Services',
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
		dataIndex: 'Date',
		key:'Date',
		align: 'center',
		...getColumnSearchProps('SDate'),
		render: (text) => <a>{moment(text).format("MMMM DD, YYYY")}</a>,
		
		
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
			
	  
		}

	];
	return <Table columns={columns} 
	
	
	dataSource={modifiedData}
	loading={loading}
	pagination={{pageSize: 5,}}
	bordered 
	onRow={(record, rowIndex) => {
		return{
		//onClick={() => showModal(record)}
		onClick: event => { 
			showModal(record)
		 }
	}}}
	
	title={() => 
		
			<>
				<Modal width={840} open={isDocumentopen} onOk={handleCancel} onCancel={handleCancel}  style={{top: 40,}}>
							<div>
							<img alt="" src={puplogo} width="77" height="77" style={{float:'left', marginRight:'5px'}} className="Modallogo"></img>
						
							
					</div>
					<div className="modalboxtitle">
							<div className="rep">Republic of the Philippines</div>
							<div className="rep1">POLYTECHNIC UNIVERSITY OF THE PHILIPPINES </div>
							<div className="rep2">office of the President for Branches and Satelite Campuses</div>
							<div className="rep3">PARAÑAQUE CITY CAMPUS</div>
							</div>
					<p className="req">REQUEST FORM</p>

					<div class="row">
							
							<div class="column green1">
							
							<Form form={form} onFinish={handleCancel} >
								<Form.Item label="Name">
									<Form.Item name="Name">
										<Input bordered={false} disabled style={{marginBottom: '0px', marginLeft:'-15px'}}/>
									</Form.Item>
								</Form.Item>
								<Form.Item label="Student No" style={{marginBottom: '0px', marginTop: '-60px'}}>
									<Form.Item name="studno">
										<Input bordered={false} disabled style={{marginBottom: '0px', marginLeft:'-15px'}}/>
									</Form.Item>
								</Form.Item>
								<Form.Item label="Program Year-Section" style={{marginBottom: '0px', marginTop: '-35px'}}>
									<Form.Item name="progyear">
										<Input bordered={false} disabled style={{marginBottom: '0px', marginLeft:'-15px'}}/>
									</Form.Item>
								</Form.Item>
								<Form.Item label="Email" style={{marginBottom: '0px', marginTop: '-35px'}}>
									<Form.Item name="Email">
										<Input bordered={false} disabled style={{marginBottom: '0px', marginLeft:'-15px'}}/>
									</Form.Item>
								</Form.Item>
							</Form>
							
						</div>
						
							<div class="column blue1">
								
							
							<Form form={form} onFinish={handleCancel} >
								<Form.Item label="Date" style={{marginBottom: '0px'}}>
									<Form.Item name="Date">
										<Input bordered={false} disabled style={{marginBottom: '0px', marginLeft:'-15px'}}/>
									</Form.Item>
								</Form.Item>
								<Form.Item label="Academic Year:" style={{marginTop:'-25px'}}>
									<Form.Item name="AcadYear">
									<Input disabled placeholder="Enter Academic year" style={{width:'150px', marginBottom: '0px',}}/>
									</Form.Item>
								</Form.Item>
							</Form>
							
							<Form form={form} onFinish={handleCancel} >
								<Form.Item label="Semester" style={{ marginBottom: '0px',marginTop:"-50px"}}>
						
									<Space style={{ display: "flex" }} >
										<Form.Item name="First" valuePropName="checked" style={{ marginBottom: '0px', }} >
											<Checkbox disabled style={{ marginBottom: '0px', }}/>
										</Form.Item>
											<Form.Item style={{ marginBottom: '0px', }}>First</Form.Item>
											
										<Form.Item name="Second" valuePropName="checked" style={{ marginBottom: '0px', }} >
											<Checkbox disabled style={{ marginBottom: '0px', }}/>
										</Form.Item>
											<Form.Item style={{ marginBottom: '0px', }}>Second</Form.Item>
											
										<Form.Item name="Summer" valuePropName="checked" style={{ marginBottom: '0px', }} >
											<Checkbox disabled style={{ marginBottom: '0px', }}/>
											</Form.Item>
										<Form.Item style={{ marginBottom: '0px', }}>Summer</Form.Item>
									</Space>								
								
								</Form.Item>				
							</Form>
									
						</div>
						</div>
						<br/>
						<p>Documents:</p>
						
						<div class="row">
						
						<div class="column green1">
							<Form form={form} onFinish={handleCancel} >
								<Space style={{ display: "flex" }} >
									<Form.Item name="Deploma" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-20px'}} >
										<Checkbox disabled style={{ marginBottom: '0px', marginLeft:'62px'}}/>
									</Form.Item>
									<Form.Item style={{ marginBottom: '0px', marginTop:'-20px'}}>Deploma</Form.Item>
								</Space>

								<Space style={{ display: "flex" }} >
									<Form.Item name="Transcript" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
										<Checkbox disabled style={{ marginBottom: '0px', marginLeft:'62px'}}/>
									</Form.Item>
									<Form.Item style={{ marginBottom: '0px', marginTop:'-9px'}}>Transcript of Records</Form.Item>
								</Space>

								<Space style={{ display: "flex" }} >
									<Form.Item name="CertofGrad" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
										<Checkbox disabled style={{ marginBottom: '0px', marginLeft:'62px'}}/>
									</Form.Item>
									<Form.Item style={{ marginBottom: '0px', marginTop:'-9px'}}>Certificate of Graduation</Form.Item>
								</Space>
								
								<Space style={{ display: "flex" }} >
									<Form.Item name="HonDismiss" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
										<Checkbox disabled style={{ marginBottom: '0px', marginLeft:'62px'}}/>
									</Form.Item>
									<Form.Item style={{ marginBottom: '0px', marginTop:'-9px'}}>Honorable Dismissal</Form.Item>
								</Space>
								
								<Space style={{ display: "flex" }} >
									<Form.Item name="CertofUnits" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
										<Checkbox disabled style={{ marginBottom: '0px', marginLeft:'62px'}}/>
									</Form.Item>
									<Form.Item style={{ marginBottom: '0px', marginTop:'-9px'}}>Certificate of units Earned</Form.Item>
								</Space>

								<Space style={{ display: "flex" }} >
									<Form.Item name="CertNoID" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
										<Checkbox disabled style={{ marginBottom: '0px', marginLeft:'62px'}}/>
									</Form.Item>
									<Form.Item style={{ marginBottom: '0px', marginTop:'-9px'}}>Certificate of No ID</Form.Item>
								</Space>
								
								<Space style={{ display: "flex" }} >
									<Form.Item name="CopyGrade" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
										<Checkbox disabled style={{ marginBottom: '0px', marginLeft:'62px'}}/>
									</Form.Item>
									<Form.Item style={{ marginBottom: '0px', marginTop:'-9px'}}>Copy of Grades</Form.Item>
								</Space>

							</Form>

							
						</div>
						
						<div class="column blue1">
							<Form form={form} onFinish={handleCancel} >

								<Space style={{ display: "flex" }} >
									<Form.Item name="CertGWA" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-20px'}} >
										<Checkbox disabled style={{ marginBottom: '0px',}}/>
									</Form.Item>
									<Form.Item style={{ marginBottom: '0px', marginTop:'-20px'}}>Certificate of General weighted Average (GWA)</Form.Item>
								</Space>
							
								<Space style={{ display: "flex" }} >
									<Form.Item name="CertNSTP" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
										<Checkbox disabled style={{ marginBottom: '0px',}}/>
									</Form.Item>
									<Form.Item style={{ marginBottom: '0px', marginTop:'-9px'}}>Certificate of NSTP Serial Number</Form.Item>
								</Space>

								<Space style={{ display: "flex" }} >
									<Form.Item name="CertSubjDescript" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
										<Checkbox disabled style={{ marginBottom: '0px', }}/>
									</Form.Item>
									<Form.Item style={{ marginBottom: '0px', marginTop:'-9px'}}>Certificate of Subject Description</Form.Item>
								</Space>
														
								<Space style={{ display: "flex" }} >
									<Form.Item name="CertofEnroll" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
										<Checkbox disabled style={{ marginBottom: '0px', }}/>
									</Form.Item>
									<Form.Item style={{ marginBottom: '0px', marginTop:'-9px'}}>Certificate of Enrollment / No Tuition Fee</Form.Item>
								</Space>
								
								<Space style={{ display: "flex" }} >
									<Form.Item name="CertofReg" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
										<Checkbox disabled style={{ marginBottom: '0px', }} />
									</Form.Item>
									<Form.Item style={{ marginBottom: '0px', marginTop:'-9px'}}>Certificate of Registration</Form.Item>
								</Space>		
								
								<Space style={{ display: "flex" }} >
								<Form.Item name="CertofGoodMoral" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
										<Checkbox disabled style={{ marginBottom: '0px', }} />
									</Form.Item>
									<Form.Item style={{ marginBottom: '0px', marginTop:'-9px'}}>Certificate of Good Moral</Form.Item>
								</Space>

							</Form>
								
							
							<br />
							<Select defaultValue="Others" style={{width: 120, marginTop:"-30px"}}
								onChange={handleChange}
								options={[
									{
									
									},
									{
								
									},
									{
								
									},
									{
									
									},
								]}
								/>
							
							
							
						</div>
						</div>
						<br/>
						<Form form={form} onFinish={handleCancel} >
					<Form.Item label="Reason:">
						<Form.Item name="Reason">
							<Input.TextArea disabled  style={{width:'238px', height:'20px',}}/>
						</Form.Item>
					</Form.Item>

					
					
					</Form>
				</Modal>
				


				<Modal width={650} open={isappointment} onOk={AhandleCancel} onCancel={AhandleCancel} okText="Submit" style={{top: 40,}}>
            <div>
                <img alt="" src={puplogo} width="77" height="77" style={{float:'left', marginRight:'5px'}} className="Modallogo"></img>
            
                
          </div>
          <div className="modalboxtitle">
                <div className="rep">Republic of the Philippines</div>
                <div className="rep1">POLYTECHNIC UNIVERSITY OF THE PHILIPPINES </div>
                <div className="rep2">office of the President for Branches and Satelite Campuses</div>
                <div className="rep3">PARAÑAQUE CITY CAMPUS</div>
                </div>
          <p className="req5">REQUEST FORM</p>

          <div class="row">
  
                <div class="column green1">
                	<Form form={form} onFinish={AhandleCancel} >
						<Form.Item label="Name">
							<Form.Item name="Name">
								<Input bordered={false} disabled style={{marginBottom: '0px', marginLeft:'-15px'}}/>
							</Form.Item>
						</Form.Item>
						<Form.Item label="Student No" style={{marginBottom: '0px', marginTop: '-60px'}}>
							<Form.Item name="studno">
								<Input bordered={false} disabled style={{marginBottom: '0px', marginLeft:'-15px'}}/>
							</Form.Item>
						</Form.Item>
						<Form.Item label="Program Year-Section" style={{marginBottom: '0px', marginTop: '-35px'}}>
							<Form.Item name="progyear">
								<Input bordered={false} disabled style={{marginBottom: '0px', marginLeft:'-15px'}}/>
							</Form.Item>
						</Form.Item>
						<Form.Item label="Email" style={{marginBottom: '0px', marginTop: '-35px'}}>
							<Form.Item name="Email">
								<Input bordered={false} disabled style={{marginBottom: '0px', marginLeft:'-15px'}}/>
							</Form.Item>
						</Form.Item>
					</Form>
                
            </div>
            
                <div class="column blue1">
				<Form form={form} onFinish={handleCancel} >
								<Form.Item label="Date" style={{marginBottom: '0px'}}>
									<Form.Item name="Date1">
										<Input bordered={false} disabled style={{marginBottom: '0px', marginLeft:'-15px'}}/>
									</Form.Item>
								</Form.Item>
								<Form.Item label="Academic Year:" style={{marginTop:'-25px'}}>
									<Form.Item name="AcadYear">
									<Input disabled style={{width:'150px', marginBottom: '0px',}}/>
									</Form.Item>
								</Form.Item>
							</Form>
                
            </div>
            </div>
            <br/>
            <br/>
            
            <p>Appointment:</p>

            
  
              
               
                <Form form={form} onFinish={AhandleCancel} layout="horizontal" >
                  <Space style={{ display: "flex", marginLeft:'95px' }} >
                   <Form.Item label="Date" style={{marginBottom:'0px'}}>
                      <Form.Item name="Date3">
                        <Input suffix={<CalendarOutlined/> } disabled  style={{width:"140px", marginBottom:'0px'}}/>
                      </Form.Item>
                    </Form.Item>

                    <Form.Item label="Time" style={{marginBottom:'0px'}}>
                      <Form.Item name="Times">
					  <Input disabled suffix={<ClockCircleOutlined/> } style={{width:"130px", marginBottom:'0px'}}/>
                      </Form.Item>
                    </Form.Item>
                
                
                  </Space>
                </Form>
                <Form form={form} onFinish={AhandleCancel} style={{marginLeft:"95px"}}>
                  <Form.Item label="Reason">
                    <Form.Item name="Reason">
                          <Input.TextArea disabled style={{width:'320px', height:'20px',}}/>
                          
                    </Form.Item>
                  </Form.Item>

          
          
                </Form>
                <br/>
                <br/>
            
            

        </Modal>
			
			</>
	}
	/>;
  };




export default Home;

