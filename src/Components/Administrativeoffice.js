import { Button, Space, Card, Row, Col, Divider, Avatar, Table, Image,  DatePicker, Input, Modal, Checkbox, Select, TimePicker, Form, message   } from "antd";
import React from "react";
import './Studentprofile.css';
import anonymous from '../images/anonymous.png'
import { SearchOutlined, CheckCircleTwoTone, CloseCircleTwoTone, CheckCircleOutlined} from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import office1 from '../images/office1.png'
import puplogo from '../images/pup.png'
import axios from "axios";
import moment from "moment";
import office from '../images/office.jpg'

const { RangePicker } = DatePicker;


const Home = () => (
	
    <div className="ContentTitle" >Administrative office
     <Button type="primary" className="btnpayment">Payment</Button>
   
   
     <Card className="Cardinfo" >
     <div class="column red">
     <Avatar size={150} style={{ color: 'white', borderColor:"#e2e6ea", backgroundColor:"#e2e6ea"}}
     /// image //*
        src={<Image src={anonymous}   /> } /> 
       
     </div>
       <div class="row">
       
           <div class="column green">
           <h3 class="user-name m-t-0 m-b-0">Mrs. Myla Hernandez</h3>
           <small class="text-muted">Administrative</small>
           													
           <div class="staff-msg">
            
            <ModalAppointment />
            <ModalTransaction />

          
           </div>
       </div>
       
           <div class="column blue">
           <li>
               <span class="title">Status:</span>
               <span class="text"><a href="#">Active</a></span>
               </li>
               <li>
               <span class="title">Phone:</span>
               <span class="text"><a href="#">09110000111</a></span>
               </li>
               <li>
               <span class="title">Email:</span>
               <span class="text"><a href="#">Sample@example.com</a></span>
               </li>
               <li>
               </li>
               <li>
               <span class="title">Address:</span>
               <span class="text"><a href="#">Las Piñas City</a></span>
               
           </li>
       </div>
       </div>
       
   
     </Card>

     <Card className="Cardinfo" height={"200px"}>
     
     <div class="row">
     
         <div class="column green1">
         <h1 className="officetitle">Administrative Office</h1>
         <h3 className="officeitem">The Administrative office is a small, boxy room, presumably used as an office for whoever Zero is 
          during their time in this place. The walls are made of wood, and there are various objects around the room, 
          including a suit of armor and a weird machine on the ground. Some of these objects have letters written in 
          red paint on them.</h3>
     </div>
     
         <div class="column blue1">
         <Image width={'500px'} height={'200px'}  src={office}/>
     </div>
     </div>
     
 
   </Card>
       
    
     
    </div>
       
     
   );

//////////////////////
   
   const handleChange = (value) => {
    console.log(`selected ${value}`);
  };





  
  

  const ModalAppointment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [time, setTime] = useState([]);
    const [ADate, setDate] = useState([]);
    const showModal = () => {
      setIsModalOpen(true);
    };
    
    const handleSubmit = (event) => {
      
      
      const Services = ("Appointment")
      const Prefix = ("PUPPQ")
      const Office = ("Administrative Office")
      const Status = ("Pending")
      const ReqDate = (ADate)
      const ReqTime = (time)
      const Reason = (event.Reason)
      const AY = (event.AcadYear)
      
      data.map(datas => {
        const Name = (datas.LastName + "," + datas.FirstName + " " + datas.MiddleName)
        const studNo = (datas.IDNumber)
        const ProgramYrSec = (datas.Course + " " + datas.YearSection)
        const Email = (datas.Gmail)
        const Date = (dates)

        axios.post('http://localhost:56630/api/Transactions/Appointment', {Prefix,Office,Status,Name,studNo,ProgramYrSec,Email,Date,Services,AY,Reason,ReqDate,ReqTime})
        .then((result) =>
        {
          form.resetFields()
          setIsModalOpen(false)
          message.open({
            type: 'success',
            content: 'Success!',
    
          });
        })

      })
      
    }
    const handleCancel = () => {
      setIsModalOpen(false);
      form.resetFields()
    };
    

    useEffect(() => {
      const data = localStorage.getItem('user-info')
      setData(JSON.parse(data))
    },[])

    const current = new Date ();
    const date = `${current.getDate()}`;
    const year = `${current.getFullYear()}`
    const month = `${current.getMonth()+1}`
    const dates = `${month<10?`0${month}`:`${month}`}-${date}-${year}`


    function onChange(time, timeString){
      console.log( timeString)
      setTime(timeString)
      
    }
    function onChange1(date, dateString){
      console.log( dateString)
      setDate(dateString)
      
    }



    return (
      <>
			{
				data.map(datas => {
					return(
						<>
      
        <Button type="primary" className="btnappointment" onClick={showModal}>
          Appointment
        </Button>
        <Modal width={650} open={isModalOpen} onOk={form.submit} onCancel={handleCancel} okText="Submit" style={{top: 40,}}>
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
                <div className="rep">Name: {datas.LastName}, {datas.FirstName} {datas.MiddleName}</div>
                <div className="rep1">Student No: {datas.IDNumber}</div>
                <div className="rep2">Program Year-Section: {datas.Course} {datas.YearSection}</div>
                <div className="rep3">Email: {datas.Gmail}</div>
                
            </div>
            
                <div class="column blue1">
                    <div className="rep">Date: {moment(dates).format("MMMM DD, YYYY")}</div>
                    <Form form={form} onFinish={handleSubmit} >
                  <Form.Item label="Academic Year:">
                    <Form.Item
                          name="AcadYear"
                          rules={[
                            {
                              required: true,
                              message:""
                            },
                          ]}
                          
                        >
                      <Input placeholder="Enter Academic year" style={{width:'150px', marginBottom: '0px',}}/>
                    </Form.Item>
                    </Form.Item>
                    </Form>
                
            </div>
            </div>
            <br/>
            <br/>
            
            <p>Appointment:</p>

            
  
              
               
                <Form form={form} onFinish={handleSubmit} layout="horizontal" >
                  <Space style={{ display: "flex", marginLeft:'95px' }} >
                   <Form.Item label="Date:" style={{marginBottom:'0px'}}>
                      <Form.Item
                            name="Date"
                            rules={[
                              {
                                required: true,
                                message:""
                              },
                            ]}
                            
                          >
                        <DatePicker format="MM-DD-YYYY" style={{marginBottom:'0px'}}
                          onChange={onChange1}
                        />
                      </Form.Item>
                    </Form.Item>

                    <Form.Item label="Time:" style={{marginBottom:'0px'}}>
                      <Form.Item
                            name="Times"
                            rules={[
                              {
                                required: true,
                                message:""
                              },
                            ]}
                            
                          >
                        <TimePicker use12Hours format="hh:mm a"  style={{marginBottom:'0px'}}
                          onChange={onChange}
                        />
                      </Form.Item>
                    </Form.Item>
                
                
                  </Space>
                </Form>
                <Form form={form} onFinish={handleSubmit} style={{marginLeft:"95px"}}>
                  <Form.Item label="Reason:">
                    <Form.Item
                          name="Reason"
                          rules={[
                            {
                              required: true,
                              message:""
                            },
                          ]}
                          
                        >
                          <Input.TextArea placeholder="Enter your Reason" style={{width:'320px', height:'20px',}}/>
                          
                    </Form.Item>
                  </Form.Item>

          
          
                </Form>
                <br/>
                <br/>
            
            

        </Modal>
        </>
					)
				})
			}
      </>
    );
  };


























  const ModalTransaction = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [first, setfirst] = useState(false)
    const [checkList, setCheckList] = useState(['First', 'Second', 'Summer']);
    const [isSelected, setIsSelected] = useState();
    const [data, setData] = useState([]);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleSubmit = (event) => {
      const CertGWA = (event.CertGWA ==true? true:false)
      const Deploma = (event.Deploma ==true? true:false)
      const Transrecord = (event.Transcript ==true? true:false)
      const Certgrad = (event.CertofGrad ==true? true:false)
      const Hondismiss = (event.HonDismiss ==true? true:false)
      const Certunits = (event.CertofUnits ==true? true:false)
      const CertID = (event.CertNoID ==true? true:false)
      const Copygrade = (event.CopyGrade ==true? true:false)
      const CertNSTP = (event.CertNSTP ==true? true:false)
      const CertSubDesc = (event.CertSubjDescript ==true? true:false)
      const CertEnroll = (event.CertofEnroll ==true? true:false)
      const CertReg = (event.CertofReg ==true? true:false)
      const CertGood = (event.CertofGoodMoral ==true? true:false)
      const Semester = (isSelected)
      const AY = (event.AcadYear)
      const Reason = (event.Reason)
      const Services = ("Document")
      const Prefix = ("PUPPQ")
      const Office = ("Administrative Office")
      const Status = ("Pending")
      
      data.map(datas => {
        const Name = (datas.LastName + "," + datas.FirstName + " " + datas.MiddleName)
        const studNo = (datas.IDNumber)
        const ProgramYrSec = (datas.Course + " " + datas.YearSection)
        const Email = (datas.Gmail)
        const Date = (dates)
        
        

        console.log({Name,studNo,ProgramYrSec,Email,Date,Services,AY,Reason,Semester,CertGWA,Deploma,Transrecord,Certgrad,Hondismiss,Certunits,CertID,Copygrade,CertNSTP,CertSubDesc,CertEnroll,CertReg,CertGood})
        
        
        //
        axios.post('http://localhost:56630/api/Transactions', {Prefix,Office,Status,Name,studNo,ProgramYrSec,Email,Date,Services,AY,Reason,Semester,CertGWA,Deploma,Transrecord,Certgrad,Hondismiss,Certunits,CertID,Copygrade,CertNSTP,CertSubDesc,CertEnroll,CertReg,CertGood})
        .then((result) =>
        {
          form.resetFields()
          setIsModalOpen(false)
          message.open({
            type: 'success',
            content: 'Success!',
    
          });
        })
    

       
      })
      //setIsModalOpen(false);
      //console.log(event)
      //form.resetFields()
      
      
      
      //console.log({Semester,CertGWA,Deploma,Transrecord,Certgrad,Hondismiss,Certunits,CertID,Copygrade,CertNSTP,CertSubDesc,CertEnroll,CertReg,CertGood})
      
      
      
      
    };
    const handleCancel = (e) => {
      setIsModalOpen(false);
      form.resetFields()
      
    };

    useEffect(() => {
      const data = localStorage.getItem('user-info')
      setData(JSON.parse(data))
    },[])

    const current = new Date ();
    const date = `${current.getDate()}`;
    const year = `${current.getFullYear()}`
    const month = `${current.getMonth()+1}`
    const dates = `${month<10?`0${month}`:`${month}`}-${date}-${year}`
    

    const onChange = (e) => {
        if (e.target.checked) {
            !isSelected && setIsSelected(e.target.name);
        } else {
            setIsSelected(null);
        }
        
    };
    
  
    return (
      <>
			{
				data.map(datas => {
					return(
						<>
      
        <Button type="primary" className="btntransaction" onClick={showModal}>
            Transaction
        </Button>
        <Modal width={840} open={isModalOpen} onOk={form.submit} onCancel={handleCancel} okText="Submit" style={{top: 40,}}>
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
                <div className="rep">Name: {datas.LastName}, {datas.FirstName} {datas.MiddleName}</div>
                <div className="rep1">Student No: {datas.IDNumber}</div>
                <div className="rep2">Program Year-Section: {datas.Course} {datas.YearSection}</div>
                <div className="rep3">Email: {datas.Gmail}</div>
                
            </div>
            
                <div class="column blue1">
                    <div className="rep">Date: {moment(dates).format("MMMM DD, YYYY")}</div>
                
                <Form form={form} onFinish={handleSubmit} >
                  <Form.Item label="Academic Year:">
                    <Form.Item
                          name="AcadYear"
                          rules={[
                            {
                              required: true,
                              message:""
                            },
                          ]}
                          
                        >
                      <Input placeholder="Enter Academic year" style={{width:'150px', marginBottom: '0px',}}/>
                    </Form.Item>
                  </Form.Item>
                </Form>

                
                <Form form={form} onFinish={handleSubmit} >
                  <Form.Item label="Semester" style={{ marginBottom: '0px',marginTop:"-50px"}}>

                          {checkList.map((item) => (
                                <Checkbox disabled={isSelected ? isSelected !== item : false} name={item} key={item} onChange={onChange}>
                                    {item}
                                </Checkbox>
                            ))} 
                
                  </Form.Item>
                
                
                </Form>
                
                
            </div>
            </div>

            <p>Documents:</p>

            <div class="row">
               
  
                <div class="column green1">
                <Form form={form} onFinish={handleSubmit} >
                  
                  <Form.Item name="Deploma" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-20px'}} >
                      <Checkbox style={{ marginBottom: '0px', marginLeft:'62px'}}>Diploma</Checkbox>
                  </Form.Item>

                  <Form.Item name="Transcript" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
                      <Checkbox style={{ marginBottom: '0px', marginLeft:'62px'}}>Transcript of Records</Checkbox>
                  </Form.Item>

                  <Form.Item name="CertofGrad" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
                      <Checkbox style={{ marginBottom: '0px', marginLeft:'62px'}}>Certificate of Graduation</Checkbox>
                  </Form.Item>

                  <Form.Item name="HonDismiss" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
                      <Checkbox style={{ marginBottom: '0px', marginLeft:'62px'}}>Honorable Dismissal</Checkbox>
                  </Form.Item>

                  <Form.Item name="CertofUnits" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
                      <Checkbox style={{ marginBottom: '0px', marginLeft:'62px'}}>Certificate of units Earned</Checkbox>
                  </Form.Item>

                  <Form.Item name="CertNoID" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
                      <Checkbox style={{ marginBottom: '0px', marginLeft:'62px'}}>Certificate of No ID</Checkbox>
                  </Form.Item>

                  <Form.Item name="CopyGrade" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
                      <Checkbox style={{ marginBottom: '0px', marginLeft:'62px'}}>Copy of Grades</Checkbox>
                  </Form.Item>

                </Form>

                
            </div>
            
                <div class="column blue1">
                <Form form={form} onFinish={handleSubmit} >
                  
                  <Form.Item name="CertGWA" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-20px'}} >
                      <Checkbox style={{ marginBottom: '0px',}}>Certificate of General weighted Average (GWA)</Checkbox>
                  </Form.Item>

                  <Form.Item name="CertNSTP" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
                      <Checkbox style={{ marginBottom: '0px',}}>Certificate of NSTP Serial Number</Checkbox>
                  </Form.Item>

                  <Form.Item name="CertSubjDescript" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
                      <Checkbox style={{ marginBottom: '0px', }}>Certificate of Subject Description</Checkbox>
                  </Form.Item>

                  <Form.Item name="CertofEnroll" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
                      <Checkbox style={{ marginBottom: '0px', }}>Certificate of Enrollment / No Tuition Fee</Checkbox>
                  </Form.Item>

                  <Form.Item name="CertofReg" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
                      <Checkbox style={{ marginBottom: '0px', }}>Certificate of Registration</Checkbox>
                  </Form.Item>

                  <Form.Item name="CertofGoodMoral" valuePropName="checked" style={{ marginBottom: '0px', marginTop:'-10px'}} >
                      <Checkbox style={{ marginBottom: '0px', }}>Certificate of Good Moral</Checkbox>
                  </Form.Item>

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
            <Form form={form} onFinish={handleSubmit} >
          <Form.Item label="Reason:">
            <Form.Item
                  name="Reason"
                  rules={[
                    {
                      required: true,
                      message:""
                    },
                  ]}
                  
                >
                  <Input.TextArea placeholder="Enter your Reason" style={{width:'238px', height:'20px',}}/>
                  
            </Form.Item>
          </Form.Item>

          
          
        </Form>
            
        </Modal>

        </>
					)
				})
			}
      
			</>
      
    );
  };







export default Home;