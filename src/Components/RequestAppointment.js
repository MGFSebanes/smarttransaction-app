import { Button, Space, Card, Row, Col, Divider, Avatar, Table, Image,  DatePicker, Input, Modal, Checkbox, Select, 
    TimePicker, Form, message, Typography, Tag, Pagination, Alert, Radio } from "antd";
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
  import dayjs from 'dayjs';
  import emailjs from '@emailjs/browser';
  
  const { RangePicker } = DatePicker;
  const { Text, Link } = Typography;
  
  const Home = () => {
    const { Option } = Select;
    const [appointmentType, SetappointmentType] = useState("")
    const [show, setshow] = useState ("")
    const [data, setData] = useState([]);
    const [officetype, Setofficetype] = useState ("none")
    const [tabledata, setTableData] = useState ([])
    const [MeetDate, setMeetDate] = useState ([])
    const [AvailDate, setAvailDate] = useState ([])
    const navigate = useNavigate()
    
    const disabledDate = (current) => {
      // Can not select days before today and today
      return current && current < dayjs().startOf('day');
    };

    function onChange5(date, dateString){
      console.log( dateString)
      setMeetDate(dateString)
      
    }

    function onChange1(date, dateString){
      console.log( dateString)
      setAvailDate(dateString)
      
    }

    useEffect(() => {
      const data = localStorage.getItem('user-info')
      setData(JSON.parse(data))
    },[])
    const Offices = [
      { displayOffice: "Avail PUP Services (ex. Pay Fees, Claim Documents, etc.)" },
      { displayOffice: "Meet/Transact with specific PUP Official/Personel"},
      


    ];

    const data1 = [
      {
        key: '1',
        Services: 'Diploma',
        Office: 'Administrative Office',
        ServiceCategory: 'Complex'
        
      },
      {
        key: '2',
        Services: 'Copy of Grades',
        Office: 'Administrative Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '3',
        Services: 'Certificate of No ID',
        Office: 'Administrative Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '4',
        Services: 'Certificate of Good Moral',
        Office: 'Administrative Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '5',
        Services: 'Honorable Dismissal',
        Office: 'Administrative Office',
        ServiceCategory: 'Simple'
      },

      {
        key: '6',
        Services: 'Transcript of Records',
        Office: 'Academic Head Office',
        ServiceCategory: 'Complex'
      },
      {
        key: '7',
        Services: 'Certificate of General weighted Average (GWA)',
        Office: 'Academic Head Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '8',
        Services: 'Certificate of NSTP Serial Number',
        Office: 'Academic Head Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '9',
        Services: 'Certificate of Registration',
        Office: 'Academic Head Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '10',
        Services: 'Certificate of Good Moral',
        Office: 'Academic Head Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '11',
        Services: 'Diploma',
        Office: 'Student Affairs and Admission Office',
        ServiceCategory: 'Complex'
      },
      {
        key: '12',
        Services: 'Transcript of Records',
        Office: 'Student Affairs and Admission Office',
        ServiceCategory: 'Complex'
      },
      {
        key: '13',
        Services: 'Certificate of Graduation',
        Office: 'Student Affairs and Admission Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '14',
        Services: 'Honorable Dismissal',
        Office: 'Student Affairs and Admission Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '15',
        Services: 'Certificate of units Earned',
        Office: 'Student Affairs and Admission Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '16',
        Services: 'Diploma',
        Office: 'Cash Disbursement Office',
        ServiceCategory: 'Complex'
      },
      {
        key: '17',
        Services: 'Certificate of Graduation',
        Office: 'Cash Disbursement Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '18',
        Services: 'Certificate of No ID',
        Office: 'Cash Disbursement Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '19',
        Services: 'Copy of Grades',
        Office: 'Cash Disbursement Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '20',
        Services: 'Certificate of Good Moral',
        Office: 'Cash Disbursement Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '21',
        Services: 'Certificate of Enrollment / No Tuition Fee',
        Office: 'Quality Assurance Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '22',
        Services: 'Certificate of Registration',
        Office: 'Quality Assurance Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '23',
        Services: 'Certificate of Good Moral',
        Office: 'Quality Assurance Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '24',
        Services: 'Transcript of Records',
        Office: 'Quality Assurance Office',
        ServiceCategory: 'Complex'
      },
      {
        key: '25',
        Services: 'Certificate of Graduation',
        Office: 'Quality Assurance Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '26',
        Services: 'Diploma',
        Office: 'Records and Admission Office',
        ServiceCategory: 'Complex'
      },
      {
        key: '27',
        Services: 'Transcript of Records',
        Office:'Records and Admission Office',
        ServiceCategory: 'Conplex'
      },
      {
        key: '28',
        Services: 'Certificate of Graduation',
        Office:'Records and Admission Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '29',
        Services: 'Certificate of Dismissal',
        Office:'Records and Admission Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '30',
        Services: 'Certificate of Units Earned',
        Office:'Records and Admission Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '31',
        Services: 'Certificate of No ID',
        Office:'Records and Admission Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '32',
        Services: 'Copy of Grades',
        Office:'Records and Admission Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '33',
        Services: 'Certificate of General Weighted Average (GWA)',
        Office:'Records and Admission Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '34',
        Services: 'Certificate of NSTP Serial Number',
        Office:'Records and Admission Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '35',
        Services: 'Certificate of Subject Description',
        Office:'Records and Admission Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '36',
        Services: 'Certificate of Enrollment / No Tuition Fee',
        Office:'Records and Admission Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '37',
        Services: 'Certificate of Registration',
        Office:'Records and Admission Office',
        ServiceCategory: 'Simple'
      },
      {
        key: '38',
        Services: 'Certificate of Good Moral',
        Office:'Records and Admission Office',
        ServiceCategory: 'Simple'
      },
      
    
    ];

    const Office = [
      { office: "Administrative Office", displayOffice: "Administrative Office" },
      { office:"Academic Head Office" , displayOffice: "Academic Head Office"},
      { office:"Student Affairs and Admission Office" , displayOffice: "Student Affairs and Admission Office"},
      { office:"Records and Admission Office" , displayOffice: "Records and Admission Office"},
      { office:"Quality Assurance Office" , displayOffice: "Quality Assurance Office"},
      { office:"Cash Disbursement Office" , displayOffice: "Cash Disbursement Office"},


    ];

    function onChange2(value) {
      console.log(value)
      SetappointmentType(value)
      
    }
    function onChange3(value) {
      console.log(value)
      Setofficetype(value)

      
    }

    function onChange4(value) {
      console.log(value)
      Setofficetype(value)
      const SelectedOffice = (Office.filter(data => data.displayOffice === value));
      //console.log(SelectedOffice)
      const dataSource = [...data1];
      const filteredData = dataSource.filter((item) => item.Office === SelectedOffice[0].office)
      console.log(filteredData)
      setTableData(filteredData)

      
    }
    function onBlur() {
      console.log("blur");
    }

    function onFocus() {
      console.log("focus");
    }

    function onSearch(val) {
      console.log("search:", val);
    }

    const back = () => {
      setshow("block")
      form.resetFields()
      form1.resetFields()
      setTableData([])
      Setofficetype("none")
    }

    const Proceed = () => {
      if (appointmentType === ""){
        console.log(appointmentType)
      }
      else{
        console.log(appointmentType)
        setshow("none")
      }
      
    }
///////////////// Avail
    const onFinish = (e) => {
      const current = new Date ();
      const date = `${current.getDate()}`;
      const year = `${current.getFullYear()}`
      const month = `${current.getMonth()+1}`
      const datecreated = `${year}-${month<10?`0${month}`:`${month}`}-${date}`
      const Prefix = (year + "-")
      const Status = ("Pending")
      const ServiceType = ("Appointment")
      data.map(datas => { 
        const Name = (datas.LastName + "," + " " + datas.FirstName + " " + datas.MiddleName)
        const ID = (datas.ID)
        const ContactNumber = (datas.ContactNumber) 
        
        console.log({Prefix: Prefix, AccountNumber: ID, Name: Name, ContactNumber: ContactNumber, Office: e.Office,
          Services: e.TypeofService, ServiceType: ServiceType, Date: datecreated, DateSchedule: AvailDate, Time: e.Time, Status: Status})
        let items = {Prefix: Prefix, AccountNumber: ID, Name: Name, ContactNumber: ContactNumber, Office: e.Office,
          Services: e.TypeofService, ServiceType:ServiceType, Date: datecreated, DateSchedule: AvailDate, Time: e.Time, Status: Status}
        axios.post('http://localhost:56630/api/Transactions/Appointment', items)
        .then((result) =>
        {
          navigate("/Profile/Appointment")
          message.open({
            type: 'success',
            content: 'Success!',
    
          });

        })
        const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("Your appointment request has been Receive")})
        emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
        .then((result) => {
          console.log(Emaildata)
          console.log(result.text);
          }, (error) => {
              console.log(error.text);
          })
      })
      //console.log(e)
      //navigate("/Profile/Appointment")
    }

/////////////////////////////////////////////////// meet
    const onFinish1 = (e) => {
      const current = new Date ();
      const date = `${current.getDate()}`;
      const year = `${current.getFullYear()}`
      const month = `${current.getMonth()+1}`
      const datecreated = `${year}-${month<10?`0${month}`:`${month}`}-${date}`
      const Prefix = (year + "-")
      const Status = ("Pending")
      const ServiceType = ("Appointment")
      data.map(datas => { 
        const Name = (datas.LastName + "," + " " + datas.FirstName + " " + datas.MiddleName)
        const ID = (datas.ID)
        const ContactNumber = (datas.ContactNumber) 
        
        console.log({Prefix: Prefix, AccountNumber: ID, Name: Name, ContactNumber: ContactNumber, Office: e.Office, ServiceType: ServiceType,
          personelName: e.NameofPersonel, Date: datecreated, DateSchedule: MeetDate, Time: e.Time, Status: Status, Reason: e.Purposeofvisit})
          let items = {Prefix: Prefix, AccountNumber: ID, Name: Name, ContactNumber: ContactNumber, Office: e.Office, ServiceType: ServiceType,
            personelName: e.NameofPersonel, Date: datecreated, DateSchedule: MeetDate, Time: e.Time, Status: Status, Reason: e.Purposeofvisit}
        
          axios.post('http://localhost:56630/api/Transactions/AppointmentMeet', items)
        .then((result) =>
        {
          navigate("/Profile/Appointment")
          message.open({
            type: 'success',
            content: 'Success!',
    
          });
          const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("Your appointment request has been Receive")})
          emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
          .then((result) => {
            console.log(Emaildata)
            console.log(result.text);
            }, (error) => {
                console.log(error.text);
            })

        })

        
      })
      //console.log(e)
      //navigate("/Profile/Appointment")
    }
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
 //////////////////////////////////////   
    return (
      <>
      <Typography.Title style={{marginTop:'10px'}} level={4}>Your Appointment</Typography.Title>
      
    <div style={{display:"flex"}}>
      <Card className="Cardinfo4"
      title="PUP Data Privacy Notice"
      
      
      bordered={false}
      style={{
        float: 'left',
        maxWidth:'420px',
        height:'300px'
        
      }}
    >
      <>
      <p style={{color:'black'}}>PUP respects and values your rights as a data subject under the Data Privacy Act (DPA). 
      PUP is committed to protecting the personal data you provide in accordance with the requirements under the DPA and its IRR. 
      In this regard, PUP implements reasonable and appropriate security measures to maintain the confidentiality, 
      integrity and availability of your personal data. For more detailed Privacy Statement, you may visit <a href='https://www.pup.edu.ph/privacy/'>https://www.pup.edu.ph/privacy/</a></p>
      
      </>
      

    </Card>

    <Card className="Cardinfo4"
      title="Select Appointment Type"
      
      
      bordered={false}
      style={{
        marginRight:'24px',
        marginLeft: '10px',
        float: 'right',
        height:'200px',
        width:'980px',
        display:show
        
      }}
    >
      <Select 
                        showSearch
                        style={{ width:'100%',marginTop:"10px", marginBottom:"20px", }}
                        placeholder="Select Appointment Type"
                        optionFilterProp="children"
                        onChange={onChange2}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                          option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {Offices.map((p) => (
                          <Option key={p.displayOffice} value={p.displayOffice}>{p.displayOffice}</Option>
                        ))}
                      </Select>
      
        <Button type="primary" style={{display:'flex', float:'right', }} onClick={Proceed}>Proceed </Button>
    </Card>

    <Card className="Cardinfo4"
      title="Appointment Information - Avail PUP Services (ex. Pay Fees, Claim Documents, etc.)"
      
      
      bordered={false}
      style={{
        marginRight:'24px',
        marginLeft: '10px',
        float: 'right',
        width:'980px',
        display:show === "none" && appointmentType === "Avail PUP Services (ex. Pay Fees, Claim Documents, etc.)"? "block" : "none"
        
      }}>

{
				data.map(datas => {
					return(
            <>
            <Space >
            <Form form={form1} onFinish={onFinish} layout='vertical' >
              <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Client Information</Typography.Title>}
                style={{marginTop:'-24px'}}  
              >
              </Form.Item>
            </Form>

            </Space>
            
            <Form form={form1} onFinish={onFinish}  layout='vertical'
            style={{marginTop:'-90px', marginLeft:'200px'}}
            >
              <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Last Name</Typography.Title>}>
                    <Form.Item
                          style={{marginTop:'-10px'}}
                          >
                      <Input placeholder={datas.LastName.toUpperCase()} disabled/>
                          
                </Form.Item >
                </Form.Item>

                <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>First Name</Typography.Title>}
                  style={{marginTop:'-30px'}}
                >
                    <Form.Item
                          style={{marginTop:'-10px'}}
                          >
                      <Input placeholder={datas.FirstName.toUpperCase()} disabled/>
                          
                </Form.Item >
                </Form.Item>

                <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Middle Name</Typography.Title>}
                  style={{marginTop:'-30px'}}
                >
                    <Form.Item
                          style={{marginTop:'-10px'}}
                           >
                      <Input style={{width:"40%"}} placeholder={datas.MiddleName.toUpperCase()} disabled/>
                          
                </Form.Item >
                </Form.Item>
                <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Extension Name</Typography.Title>}
                  style={{marginTop:'-105px',  marginLeft:'300px'}}
                >
                    <Form.Item
                          style={{marginTop:'-10px'}}
                          >
                      <Input style={{width:"100%"}} placeholder="Extension Name" disabled/>
                          
                </Form.Item >
                </Form.Item>


                <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Contact Number</Typography.Title>}
                  style={{marginTop:'-30px'}}
                >
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="Contactnumber"
                      rules={[
                        {
                          required: true,
                          message: ""
                        },
                      ]}
                      
                    >
                  <Input type='number' />
                      
            </Form.Item >
          </Form.Item>
          
              </Form>
              <Divider style={{marginTop:'-20px', marginBottom:'10px'}}/>

              <Space >
            <Form form={form1} onFinish={onFinish} layout='vertical' >
              <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Appointment Information</Typography.Title>}
              >
              </Form.Item>
            </Form>

            </Space>
            <Form form={form1} onFinish={onFinish}  layout='vertical'
            style={{marginTop:'-90px', marginLeft:'200px'}}
            >
              <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>College / Office</Typography.Title>}>
                    <Form.Item
                          style={{marginTop:'-20px'}}
                          name="Office"
                          rules={[
                            {
                              required: true,
                              message: ""
                            },
                          ]}
                          >
                      <Select 
                        showSearch
                        style={{ width:'100%',marginTop:"10px", }}
                        placeholder="Select Appointment Type"
                        optionFilterProp="children"
                        onChange={onChange4}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                          option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {Office.map((p) => (
                          <Option key={p.displayOffice} value={p.displayOffice}>{p.displayOffice}</Option>
                        ))}
                      </Select>
                          
                </Form.Item >
                </Form.Item>

                <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Type of Service</Typography.Title>}
                  style={{marginTop:'-30px'}}
                >
                    <Form.Item
                          style={{marginTop:'-20px'}}
                          name="TypeofService"
                          rules={[
                            {
                              required: true,
                              message: ""
                            },
                          ]}
                          >
                      <Select 
                        showSearch
                        style={{ width:'100%',marginTop:"10px", }}
                        
                        optionFilterProp="children"
                        
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                          option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {tabledata.map((p) => (
                          <Option key={p.Services} value={p.Services}>{p.Services}</Option>
                        ))}
                      </Select>
                          
                </Form.Item >
                </Form.Item>

                
          <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Date</Typography.Title>}
                  style={{marginTop:'-30px'}}
                >
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="Date"
                      rules={[
                        {
                          required: true,
                          message: ""
                        },
                      ]}
                      
                    >
                  <DatePicker format="MM-DD-YYYY" style={{width:'100%'}} disabledDate={disabledDate}
                  onChange={onChange1}
                  />
                      
            </Form.Item >
          </Form.Item>

          <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Time</Typography.Title>}
                  style={{marginTop:'-30px', display:officetype === "none"? 'none': "block"}}
                >
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="Time"
                      rules={[
                        {
                          required: true,
                          message: ""
                        },
                      ]}
                      
                    >
                  <Radio.Group >
                    <Radio value={"07:00 AM - 08:00 AM"}>07:00 AM - 08:00 AM</Radio>
                    <Radio style={{marginLeft:'170px'}} value={"08:00 AM - 09:00 AM"}>08:00 AM - 09:00 AM</Radio>
                    <br />
                    <Radio value={"09:00 AM - 10:00 AM"}>09:00 AM - 10:00 AM</Radio>
                    <Radio style={{marginLeft:'170px',marginTop:'10px'}} value={"10:00 AM - 11:00 AM"}>10:00 AM - 11:00 AM</Radio>
                    <br />
                    <Radio value={"11:00 AM - 12:00 PM"}>11:00 AM - 12:00 PM</Radio>
                    <Radio style={{marginLeft:'170px',marginTop:'10px'}} value={"12:00 PM - 01:00 PM"}>12:00 PM - 01:00 PM</Radio>
                    <br/>
                    <Radio value={"01:00 PM - 02:00 PM"}>01:00 PM - 02:00 PM</Radio>
                    <Radio style={{marginLeft:'170px',marginTop:'10px'}} value={"02:00 PM - 03:00 PM"}>02:00 PM - 03:00 PM</Radio>
                    <br/>
                    <Radio value={"03:00 PM - 04:00 PM"}>03:00 PM - 04:00 PM</Radio>
                    <Radio style={{marginLeft:'170px',marginTop:'10px'}} value={"04:00 PM - 05:00 PM"}>04:00 PM - 05:00 PM</Radio>
                    <br/>
                    <Radio value={"05:00 PM - 06:00 PM"}>05:00 PM - 06:00 PM</Radio>
                    <Radio style={{marginLeft:'170px',marginTop:'10px'}} value={"06:00 PM - 07:00 PM"}>06:00 PM - 07:00 PM</Radio>
                    <br/>
                    <Radio style={{marginTop:'10px'}} value={"07:00 PM - 08:00 PM"}>07:00 PM - 08:00 PM</Radio>
                    
                    
                    
                  </Radio.Group>
                      
            </Form.Item >
            
          </Form.Item>
          <Form.Item style={{marginTop:'-30px'}}>
          <Alert style={{marginBottom:"30px",color:'#fff', backgroundColor:'#17a2b8', borderColor:'#148ea1',}}
              message={<Typography.Title style={{color:'#fff', fontSize:'20px'}} level={6}>Reminder</Typography.Title>}
              description= { <>
                     <p>Your appointment request will be forwarded to the concerned office after you click the "Submit" button.</p>
                     <p style={{marginTop:"-15px"}}>Confirmation (approved/disapproved) of the request will be sent to your registered email.</p>
                     <p style={{marginTop:"-15px"}}>You may also constantly monitor the status of the request thru this System.</p>
                     <p style={{marginTop:"-15px"}}>You are required to answer the Health Declaration Form a day before your scheduled appointment.</p>
                     <p style={{marginTop:"-15px"}}>Instruction on how to answer the Health Declaration Form will be available once your appointment request has been approved.</p>
                     </>
                     }
                type="info"
                showIcon
                closable
                
              />

          </Form.Item>
          
         
                    
                  
                  
              <Form.Item style={{marginTop:'-50px'}}>
                          
                <Divider style={{ marginBottom:'10px'}}/>
                <Button type="primary"  onClick={back}>back </Button>
                <Button type="primary" htmlType="submit" style={{ float:"right"}} >Submit </Button>
                </Form.Item>
                
              </Form>
             
              
              
            </>
          )})}
        
      </Card>
      
    




















      <Card className="Cardinfo4"
      title="Appointment Information - Meet/Transact with specific PUP Official/Personel"
      
      
      bordered={false}
      style={{
        marginRight:'24px',
        marginLeft: '10px',
        float: 'right',
        width:'980px',
        display:show === "none" && appointmentType === "Meet/Transact with specific PUP Official/Personel"? "block" : "none",
        
        
      }}>
        
        {
				data.map(datas => {
					return(
            <>
            <Space >
            <Form form={form} onFinish={onFinish1} layout='vertical' >
              <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Client Information</Typography.Title>}
                style={{marginTop:'-24px'}}  
              >
              </Form.Item>
            </Form>

            </Space>
            
            <Form form={form} onFinish={onFinish1}  layout='vertical'
            style={{marginTop:'-90px', marginLeft:'200px'}}
            >
              <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Last Name</Typography.Title>}>
                    <Form.Item
                          style={{marginTop:'-10px'}}
                          >
                      <Input placeholder={datas.LastName.toUpperCase()} disabled/>
                          
                </Form.Item >
                </Form.Item>

                <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>First Name</Typography.Title>}
                  style={{marginTop:'-30px'}}
                >
                    <Form.Item
                          style={{marginTop:'-10px'}}
                          >
                      <Input placeholder={datas.FirstName.toUpperCase()} disabled/>
                          
                </Form.Item >
                </Form.Item>

                <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Middle Name</Typography.Title>}
                  style={{marginTop:'-30px'}}
                >
                    <Form.Item
                          style={{marginTop:'-10px'}}
                           >
                      <Input style={{width:"40%"}} placeholder={datas.MiddleName.toUpperCase()} disabled/>
                          
                </Form.Item >
                </Form.Item>
                <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Extension Name</Typography.Title>}
                  style={{marginTop:'-105px',  marginLeft:'300px'}}
                >
                    <Form.Item
                          style={{marginTop:'-10px'}}
                          >
                      <Input style={{width:"100%"}} placeholder="Extension Name" disabled/>
                          
                </Form.Item >
                </Form.Item>


                <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Contact Number</Typography.Title>}
                  style={{marginTop:'-30px'}}
                >
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="Contactnumber"
                      rules={[
                        {
                          required: true,
                          message: ""
                        },
                      ]}
                      
                    >
                  <Input type='number' />
                      
            </Form.Item >
          </Form.Item>
          
              </Form>
              <Divider style={{marginTop:'-20px', marginBottom:'10px'}}/>

              <Space >
            <Form form={form} onFinish={onFinish1} layout='vertical' >
              <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Appointment Information</Typography.Title>}
              >
              </Form.Item>
            </Form>

            </Space>
            <Form form={form} onFinish={onFinish1}  layout='vertical'
            style={{marginTop:'-90px', marginLeft:'200px'}}
            >
              <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>College / Office</Typography.Title>}>
                    <Form.Item
                          style={{marginTop:'-20px'}}
                          name="Office"
                          rules={[
                            {
                              required: true,
                              message: ""
                            },
                          ]}
                          >
                      <Select 
                        showSearch
                        style={{ width:'100%',marginTop:"10px", }}
                        placeholder="Select Appointment Type"
                        optionFilterProp="children"
                        onChange={onChange3}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                          option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {Office.map((p) => (
                          <Option key={p.displayOffice} value={p.displayOffice}>{p.displayOffice}</Option>
                        ))}
                      </Select>
                          
                </Form.Item >
                </Form.Item>

                <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Name of Official / Personel</Typography.Title>}
                  style={{marginTop:'-30px'}}
                >
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="NameofPersonel"
                      rules={[
                        {
                          required: true,
                          message: ""
                        },
                      ]}
                      
                    >
                  <Input placeholder="Full Name" />
                      
            </Form.Item >
          </Form.Item>
          <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Date</Typography.Title>}
                  style={{marginTop:'-30px'}}
                >
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="Date"
                      rules={[
                        {
                          required: true,
                          message: ""
                        },
                      ]}
                      
                    >
                  <DatePicker format="MM-DD-YYYY" style={{width:'100%'}} disabledDate={disabledDate}
                  onChange={onChange5}
                  />
                      
            </Form.Item >
          </Form.Item>

          <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Time</Typography.Title>}
                  style={{marginTop:'-30px', display:officetype === "none"? 'none': "block"}}
                >
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="Time"
                      rules={[
                        {
                          required: true,
                          message: ""
                        },
                      ]}
                      
                    >
                  <Radio.Group >
                    <Radio value={"07:00 AM - 08:00 AM"}>07:00 AM - 08:00 AM</Radio>
                    <Radio style={{marginLeft:'170px'}} value={"08:00 AM - 09:00 AM"}>08:00 AM - 09:00 AM</Radio>
                    <br />
                    <Radio value={"09:00 AM - 10:00 AM"}>09:00 AM - 10:00 AM</Radio>
                    <Radio style={{marginLeft:'170px',marginTop:'10px'}} value={"10:00 AM - 11:00 AM"}>10:00 AM - 11:00 AM</Radio>
                    <br />
                    <Radio value={"11:00 AM - 12:00 PM"}>11:00 AM - 12:00 PM</Radio>
                    <Radio style={{marginLeft:'170px',marginTop:'10px'}} value={"12:00 PM - 01:00 PM"}>12:00 PM - 01:00 PM</Radio>
                    <br/>
                    <Radio value={"01:00 PM - 02:00 PM"}>01:00 PM - 02:00 PM</Radio>
                    <Radio style={{marginLeft:'170px',marginTop:'10px'}} value={"02:00 PM - 03:00 PM"}>02:00 PM - 03:00 PM</Radio>
                    <br/>
                    <Radio value={"03:00 PM - 04:00 PM"}>03:00 PM - 04:00 PM</Radio>
                    <Radio style={{marginLeft:'170px',marginTop:'10px'}} value={"04:00 PM - 05:00 PM"}>04:00 PM - 05:00 PM</Radio>
                    <br/>
                    <Radio value={"05:00 PM - 06:00 PM"}>05:00 PM - 06:00 PM</Radio>
                    <Radio style={{marginLeft:'170px',marginTop:'10px'}} value={"06:00 PM - 07:00 PM"}>06:00 PM - 07:00 PM</Radio>
                    <br/>
                    <Radio style={{marginTop:'10px'}} value={"07:00 PM - 08:00 PM"}>07:00 PM - 08:00 PM</Radio>
                    
                    
                    
                  </Radio.Group>
                      
            </Form.Item >
          </Form.Item>
          <Form.Item label={<Typography.Title style={{fontSize:'14px'}} level={6}>Purpose of Visit</Typography.Title>}
              style={{marginTop:'-30px',}}          
          >
                    <Form.Item
                        style={{marginTop:'-10px',}}
                          name="Purposeofvisit"
                          rules={[
                            {
                              required: true,
                              message:""
                            },
                          ]}
                          
                        >
                          <Input.TextArea  />
                          
                          
                    </Form.Item>
                    <Alert style={{marginBottom:"30px",color:'#fff', backgroundColor:'#17a2b8', borderColor:'#148ea1',}}
              message={<Typography.Title style={{color:'#fff', fontSize:'20px'}} level={6}>Reminder</Typography.Title>}
              description= { <>
                     <p>Your appointment request will be forwarded to the concerned office after you click the "Submit" button.</p>
                     <p style={{marginTop:"-15px"}}>Confirmation (approved/disapproved) of the request will be sent to your registered email.</p>
                     <p style={{marginTop:"-15px"}}>You may also constantly monitor the status of the request thru this System.</p>
                     <p style={{marginTop:"-15px"}}>You are required to answer the Health Declaration Form a day before your scheduled appointment.</p>
                     <p style={{marginTop:"-15px"}}>Instruction on how to answer the Health Declaration Form will be available once your appointment request has been approved.</p>
                     </>
                     }
                type="info"
                showIcon
                closable
                
              />
                  </Form.Item>
                  
              <Form.Item style={{marginTop:'-50px'}}>
                          
                <Divider style={{ marginBottom:'10px'}}/>
                <Button type="primary"  onClick={back}>back </Button>
                <Button type="primary" htmlType="submit" style={{ float:"right"}} >Submit </Button>
                </Form.Item>
                
              </Form>
             
              
              
            </>
          )})}
          

            
            
        
      </Card>
    
  </div>
      
      </>
    )
  }
      
      

  /*
  <Form.Item>
              <Divider style={{marginTop:'-20px', marginBottom:'10px'}}/>
              <Button type="primary" htmlType="submit" style={{display:'flex', }} >Submit </Button>
              </Form.Item>
  

  */
         
      
       
    
         
       
     
  
  
  
  
  
 
  
    
  
  
  
  
  
  
  
  export default Home;
  
