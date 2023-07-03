import './Homepage.css';
import { Layout, Space, Carousel, Image, Button, Icon, Tooltip, Row, Card, Modal, Checkbox, Form, Input, message, Alert,   } from 'antd';
import { useState, useEffect } from 'react';
import "antd/dist/reset.css";
import puplogo from '../images/pup.png';
import slider from '../images/slider.jpg'
import slider_img1 from '../images/slider_img1.jpg'
import slider_img2 from '../images/slider_img2.jpg'
import slider_img3 from '../images/slider_img3.jpg'
import slider_img4 from '../images/slider_img4.jpg'
import post1 from '../images/post1.jpg'
import post2 from '../images/post2.jpg'
import post4 from '../images/post4.jpg'
import post5 from '../images/post5.jpg'
import post6 from '../images/post6.jpg'
import {FacebookFilled, YoutubeFilled, UserOutlined, RightCircleOutlined, LeftCircleOutlined, LockOutlined, } from '@ant-design/icons';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Profile from './Profile'
import moment from "moment/moment";
import emailjs from '@emailjs/browser';


const { Header, Footer, Content } = Layout;
const headerStyle = {
  textAlign: 'left',
  color: '#fff',
  height: 60,
  backgroundColor: '#800000',
  padding:'2px',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  
};
const contentStyle = {
  backgroundColor: 'white',
  overflow: 'hidden',
  minHeight:'83.9vh'

  
};
const footerStyle = {
  
  height: 60,

  
};
////////////// Rfid login
function App () {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const current = new Date ();
    const date = `${current.getDate()}`;
    const year = `${current.getFullYear()}`
    const month = `${current.getMonth()+1}`
    const datecreated = `${year}-${month<10?`0${month}`:`${month}`}-${date}`

  let time = new Date().toLocaleTimeString();
  
  async function handleSubmit  (value) {
    
    console.log(value)
    let result  = await fetch("http://localhost:56630/api/Registration/RFIDLogin",{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": 'application/json'
      },
      body: JSON.stringify(value)
    })
    result = await result.json();
    localStorage.setItem("user-info",JSON.stringify(result))

    if (result === "Invalid User"){
      navigate("/")
      localStorage.removeItem('user-info')
      form.resetFields()
      message.open({
        type: 'error',
        content: 'Log In Error',

      });
    }
    if (result[0].Role === "Student" && result[0].LastName === "." && result[0].Status === "Active"){
      form.resetFields()
      navigate("/Newprofile")
      const ControlNos = (result[0].ControlNo === null? "not set" : result[0].ControlNo)
      const Name = (result[0].LastName + "," + " " + result[0].FirstName + " " + result[0].MiddleName)
      const LogState = ("Log In")
      const Date = (datecreated)
      axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: LogState, Name: Name, Time: time, Date: Date})
    .then((result) =>
    {
      console.log(result)
    })
    const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("We notice a recent log in to your Account" + " " + Date + " " + time)})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      message.open({
        type: 'success',
        content: 'Log In Succesfully',

      });
    }
    
    if (result[0].Role === "Student" && result[0].LastName !== "." && result[0].Status === "Active"){
      form.resetFields()
      navigate("/Profile")
      const ControlNos = (result[0].ControlNo === null? "not set" : result[0].ControlNo)
      const Name = (result[0].LastName + "," + " " + result[0].FirstName + " " + result[0].MiddleName)
      const LogState = ("Log In")
      const Date = (datecreated)
      axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: LogState, Name: Name, Time: time, Date: Date})
    .then((result) =>
    {
      console.log(result)
    })
    const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("We notice a recent log in to your Account" + " " + Date + " " + time)})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      message.open({
        type: 'success',
        content: 'Log In Succesfully',

      });
    }

    if (result[0].Role === "Visitor" && result[0].LastName === null && result[0].Status === "Active"){
      form.resetFields()
      navigate("/Newvisitor")
      const ControlNos = (result[0].ControlNo === null? "not set" : result[0].ControlNo)
      const Name = (result[0].LastName + "," + " " + result[0].FirstName + " " + result[0].MiddleName)
      const LogState = ("Log In")
      const Date = (datecreated)
      axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: LogState, Name: Name, Time: time, Date: Date})
    .then((result) =>
    {
      console.log(result)
    })
    const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("We notice a recent log in to your Account" + " " + Date + " " + time)})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      message.open({
        type: 'success',
        content: 'Log In Succesfully',

      });
    }

    if (result[0].Role === "Visitor" && result[0].LastName !== null && result[0].Status === "Active"){
      form.resetFields()
      navigate("/Visitor")
      const ControlNos = (result[0].ControlNo === null? "not set" : result[0].ControlNo)
      const Name = (result[0].LastName + "," + " " + result[0].FirstName + " " + result[0].MiddleName)
      const LogState = ("Log In")
      const Date = (datecreated)
      axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: LogState, Name: Name, Time: time, Date: Date})
    .then((result) =>
    {
      console.log(result)
    })
    const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("We notice a recent log in to your Account" + " " + Date + " " + time)})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      message.open({
        type: 'success',
        content: 'Log In Succesfully',

      });
    }
    if (result[0].Role !== "Director's Office" && result[0].Role !== "Admin" && result[0].Role !== "Student" && result[0].Role !== "Visitor" && result[0].Status === "Active"){
      form.resetFields()
      navigate("/AcadProfile")
      const ControlNos = (result[0].ControlNo === null? "not set" : result[0].ControlNo)
      const Name = (result[0].LastName + "," + " " + result[0].FirstName + " " + result[0].MiddleName)
      const LogState = ("Log In")
      const Date = (datecreated)
      axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: LogState, Name: Name, Time: time, Date: Date})
    .then((result) =>
    {
      console.log(result)
    })
    const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("We notice a recent log in to your Account" + " " + Date + " " + time)})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      message.open({
        type: 'success',
        content: 'Log In Succesfully',

      });
    }

    if (result[0].Role === "Director's Office" && result[0].LastName !== "." && result[0].Status === "Active"){
      form.resetFields()
      navigate("/AcadProfile")
      const ControlNos = (result[0].ControlNo === null? "not set" : result[0].ControlNo)
      const Name = (result[0].LastName + "," + " " + result[0].FirstName + " " + result[0].MiddleName)
      const LogState = ("Log In")
      const Date = (datecreated)
      axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: LogState, Name: Name, Time: time, Date: Date})
    .then((result) =>
    {
      console.log(result)
    })
    const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("We notice a recent log in to your Account" + " " + Date + " " + time)})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      message.open({
        type: 'success',
        content: 'Log In Succesfully',

      });
    }

    if (result[0].Role === "Admin" && result[0].Status === "Active"){
      form.resetFields()
      navigate("/Admin")
      const ControlNos = (result[0].ControlNo === null? "not set" : result[0].ControlNo)
      const Name = (result[0].LastName + "," + " " + result[0].FirstName + " " + result[0].MiddleName)
      const LogState = ("Log In")
      const Date = (datecreated)
      axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: LogState, Name: Name, Time: time, Date: Date})
    .then((result) =>
    {
      console.log(result)
    })
    const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("We notice a recent log in to your Account" + " " + Date + " " + time)})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      message.open({
        type: 'success',
        content: 'Log In Succesfully',

      });
    }

    if (result[0].Status !== "Active"){
      form.resetFields()
      localStorage.removeItem('user-info')
      message.open({
        type: 'error',
        content: 'Email or Password are Incorrect',

      });
    }

    
  }
    
    

  

  return(
    <Layout>
      <Header style={headerStyle} className="headerStyle">
        <img alt="" src={puplogo} width="57" height="57"  className="logo" style={{marginLeft:'250px'}}/>
          <h1 className='h1'>Smart Transaction</h1>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
        
            <Form.Item
                  name="ControlNo"
                  trigger="onPressEnter"
                  type = "number"
                  noStyle
                  
                  
                  
                >
                  <Input.Password placeholder='Borderless' bordered={false} autoFocus={true} style={{width:"0", fontSize:1,}}/>
                  </Form.Item>
                  
                  </Form>
          </Header>
          
      <Content style={contentStyle}>
          <Slidenews/>
          <Slidepic />
          
          
      </Content>
      <Footer style={footerStyle}>
        <div style={{textAlign:'center'}}>
        Smart Transaction ©2023
        </div>
        
       
 
      </Footer>
      
    </Layout>

)};


const Slidenews = () => {
  const [news, seData] = useState([]);

  useEffect(function () {
    axios
      .get("http://localhost:56630/api/SavedNews/1")
      .then((response) => seData(response.data))
      .then((error) => console.log(error));

  },[]);

  const modifiedData = news.map(({ body, ...item}) => ({
    ...item,
    key: item.ID,
    
  }));
  

  return (
    <div className='slidecontainer'>
      <div className='ticker'>
        <div className='newstitle'><h5>Latest News</h5></div>
        <div className='news'>
          <marquee>
            <ul>

              
                {news.map((nnews) => (
                    
                    <li key={nnews.ID} value={nnews.ID} > 
                    
                    <a href='#'>
                    <img alt="" src={puplogo} width="27" height="27" style={{marginRight:'15px'}}/>
                    {nnews.News}
                    </a>
                  </li>

                ))}
                
              

            </ul>
          </marquee>
        </div>
        <div className='socialcontainer'>
        
              <li>
                <a href='https://www.facebook.com/puppq'>
                <Tooltip placement="top" title={'Facebook'}>
                <Button type="text" className="newsavatar" ><FacebookFilled style={{display: 'inline-flex',justifyContent: 'center',alignItems: 'center', fontSize: '25px' }}/></Button>
                </Tooltip>
                </a>
              </li>
              <li>
                <a href='https://www.youtube.com/channel/UCfKNPAITnj6dj2AFHpSmdZg'>
                <Tooltip placement="top" title={'Youtube'}>
                <Button type="text" className="newsavatar1" ><YoutubeFilled style={{display: 'inline-flex',justifyContent: 'center',alignItems: 'center', fontSize: '25px' }}/></Button>
                </Tooltip>
                </a>
              </li>
              <li>
                
                
                <Modalsign />
                
                
              </li>
        </div>
      </div>
    </div>
    
  )
};




const Slidepic = () => {
  const [photo, seData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(function () {
    axios
      .get("http://localhost:56630/api/SavedSlide/1")
      .then((response) => seData(response.data))
      .then((error) => console.log(error));

  },[]);

  useEffect(function () {
    axios
      .get("http://localhost:56630/api/SavedBlogPost/1")
      .then((response) => setData(response.data))
      .then((error) => console.log(error));

  },[]);

  return (
        <div style={{marginBottom:'24px',marginLeft:'24px',marginTop:'24px',marginRight:'24px', minHeight:'500px'}}> 
            
            <div className='slidepicture' style={{width:'100%', width:'900px', float:'left', marginLeft:'24px', }}>
            <Carousel  autoplay draggable={true} arrows={true} prevArrow={<LeftCircleOutlined/>} nextArrow={<RightCircleOutlined/>}  >

            {photo.map((pphoto) => (
              
                    
                <div>
                  <li key={pphoto.ID} value={pphoto.ID}></li>
                  <Image preview={false}  width={'100%'} height={'500px'} src={"http://localhost:56630/Photos/" + pphoto.Photo } /> 
              </div>

                ))}
              
              
            </Carousel>
            
            </div>
            <div className='latestpost' style={{width:'100%', maxWidth:'450px', display:'inline-block', backgroundColor:'white' }}>
              <h1 className='hh1'>Latest Post</h1>
            <Carousel vertical autoplay dots={false} draggable={true} slidesToShow={4}   >
            <div>
          <card>
            <a href='#' style={{textDecoration:'none', color:'black'}}>
              <div className="part2"><Image preview={false}  width={'120px'} height={'100px'} src={post1 } /> 
            
              <h4>PUP - Parañaque City Campus is now accepting all kinds of donation for the victims of typhoon Rolly and...</h4> 
              </div>
            </a>
          </card>
        </div>

        <div>
          <card>
            <a href='#' style={{textDecoration:'none', color:'black'}}>
              <div className="part2"><Image preview={false}  width={'120px'} height={'100px'} src={post2 } /> 
            
              <h4>To all PUP Parañaque Alumni from 2017-2019, In line with the Alumni Relations Office and PUP...</h4> 
              </div>
            </a>
          </card>
        </div>

        <div>
          <card>
            <a href='#' style={{textDecoration:'none', color:'black'}}>
              <div className="part2"><Image preview={false}  width={'120px'} height={'100px'} src={post4} /> 
            
              <h4>To allow students and faculty members to recover from the impact of Typhoon Ulysses, PUP will be...</h4> 
              </div>
            </a>
          </card>
        </div>

        <div>
          <card>
            <a href='#' style={{textDecoration:'none', color:'black'}}>
              <div className="part2"><Image preview={false}  width={'120px'} height={'100px'} src={post5} /> 
            
              <h4>Bilang bahagi ng pagdiriwang ng  PUP ng Kapaskuhan ngayong taon na may temang “Pasko...</h4> 
              </div>
            </a>
          </card>
        </div>

        <div>
          <card>
            <a href='#' style={{textDecoration:'none', color:'black'}}>
              <div className="part2"><Image preview={false}  width={'120px'} height={'100px'} src={post6} /> 
            
              <h4>President's Lister Cash Incentive: Please be informed that the P1,000.00 cash incentive for...</h4> 
              </div>
            </a>
          </card>
        </div>


              
              
              
            </Carousel>
            </div>
        </div>
  )
};




const Modalsign = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    
  };
  const [isMainModel, setMainModel] = useState(false); // First Model
  const [isSubModel, setSubModel] = useState(false); // Second Model
  const [data, setData] = useState([]);

  const onSubModel = (e, stateSub = true, stateMain = false) => {
    setMainModel(stateMain);
    setSubModel(stateSub);
    form.resetFields()
  };
  const handleCancel = () => {
    setMainModel(false)
    form.resetFields()
  };

  const handleRCancel = () => {
    setSubModel(false)
    form.resetFields()
  };

  useEffect(() => {
    const data = localStorage.getItem('user-info')
    setData(JSON.parse(data))
  },[])
  
  async function handleRegister (record) {
    
    const current = new Date ();
    const date = `${current.getDate()}`;
    const year = `${current.getFullYear()}`
    const month = `${current.getMonth()+1}`
    const datecreated = `${year}-${month<10?`0${month}`:`${month}`}-${date}`
    

  
    const Email  = record.Email
    const Password = record.password
    let item = {Email}
    let items = {Email, Password, Role:"Student", ProfilePic:"profile_pic.png", DateCreated: datecreated, LastName: ".", Status:"Active"}
    console.log()

    let result  = await fetch("http://localhost:56630/api/Registration/Email",{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": 'application/json'
      },
      body: JSON.stringify(item)
    })
    result = await result.json();
    localStorage.setItem("user-info",JSON.stringify(result))
    

    if (result === "Already Used"){
      form.resetFields()
      localStorage.removeItem('user-info')
      message.open({
        type: 'error',
        content: 'Email Already Used'

      });

    
    }
    else
    {
      axios.post('http://localhost:56630/api/Registration', items)
    .then((result) =>
    {
      form.resetFields()
      setSubModel(false)
      localStorage.removeItem('user-info')
      message.open({
        type: 'success',
        content: 'Registered Success'
        

      });
      navigate("/")
      
    })
  
    }
  }

  /////////
    
  async function handleOk (record) {
    const current = new Date ();
    const date = `${current.getDate()}`;
    const year = `${current.getFullYear()}`
    const month = `${current.getMonth()+1}`
    const datecreated = `${year}-${month<10?`0${month}`:`${month}`}-${date}`
    const now = moment();
    
  
    const Email  = record.Email
    const Password = record.password
    let item = {Email, Password}
    console.log(item)

    let time = new Date().toLocaleTimeString();

    let result  = await fetch("http://localhost:56630/api/Registration/LogIn",{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": 'application/json'
      },
      body: JSON.stringify(item)
    })
    result = await result.json();
    localStorage.setItem("user-info",JSON.stringify(result))
    
     
    if (result === "Invalid User"){
      form.resetFields()
      localStorage.removeItem('user-info')
      message.open({
        type: 'error',
        content: 'Email or Password are Incorrect',

      });
    }

    if (result[0].Role === "Student" && result[0].LastName === "." && result[0].Status === "Active"){
      form.resetFields()
      navigate("/Newprofile")
      const ControlNos = (result[0].ControlNo === null? "not set" : result[0].ControlNo)
      const Name = (result[0].LastName + "," + " " + result[0].FirstName + " " + result[0].MiddleName)
      const LogState = ("Log In")
      const Date = (datecreated)
      axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: LogState, Name: Name, Time: time, Date: Date})
    .then((result) =>
    {
      console.log(result)
    })
    const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("We notice a recent log in to your Account" + " " + Date + " " + time)})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      message.open({
        type: 'success',
        content: 'Log In Succesfully',

      });
    }
    
    if (result[0].Role === "Student" && result[0].LastName !== "." && result[0].Status === "Active"){
      form.resetFields()
      navigate("/Profile")
      const ControlNos = (result[0].ControlNo === null? "not set" : result[0].ControlNo)
      const Name = (result[0].LastName + "," + " " + result[0].FirstName + " " + result[0].MiddleName)
      const LogState = ("Log In")
      const Date = (datecreated)
      axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: LogState, Name: Name, Time: time, Date: Date})
    .then((result) =>
    {
      console.log(result)
    })
    const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("We notice a recent log in to your Account" + " " + Date + " " + time)})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      message.open({
        type: 'success',
        content: 'Log In Succesfully',

      });
    }

    if (result[0].Role === "Director's Office" && result[0].LastName !== "." && result[0].Status === "Active"){
      form.resetFields()
      navigate("/AcadProfile")
      const ControlNos = (result[0].ControlNo === null? "not set" : result[0].ControlNo)
      const Name = (result[0].LastName + "," + " " + result[0].FirstName + " " + result[0].MiddleName)
      const LogState = ("Log In")
      const Date = (datecreated)
      axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: LogState, Name: Name, Time: time, Date: Date})
    .then((result) =>
    {
      console.log(result)
    })
    const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("We notice a recent log in to your Account" + " " + Date + " " + time)})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      message.open({
        type: 'success',
        content: 'Log In Succesfully',

      });
    }

    if (result[0].Role === "Admin" && result[0].Status === "Active"){
      form.resetFields()
      navigate("/Admin")
      const ControlNos = (result[0].ControlNo === null? "not set" : result[0].ControlNo )
      const Name = (result[0].LastName + "," + " " + result[0].FirstName + " " + result[0].MiddleName)
      const LogState = ("Log In")
      const Date = (datecreated)
      axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: LogState, Name: Name, Time: time, Date: Date})
    .then((result) =>
    {
      console.log(result)
    })
    const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("We notice a recent log in to your Account" + " " + Date + " " + time)})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      message.open({
        type: 'success',
        content: 'Log In Succesfully',

      });
    }
    if (result[0].Role === "Visitor" && result[0].LastName === null && result[0].Status === "Active"){
      form.resetFields()
      navigate("/Newvisitor")
      const ControlNos = (result[0].ControlNo === null? "not set" : result[0].ControlNo )
      const Name = (result[0].LastName + "," + " " + result[0].FirstName + " " + result[0].MiddleName)
      const LogState = ("Log In")
      const Date = (datecreated)
      axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: LogState, Name: Name, Time: time, Date: Date})
    .then((result) =>
    {
      console.log(result)
    })
    const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("We notice a recent log in to your Account" + " " + Date + " " + time)})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      message.open({
        type: 'success',
        content: 'Log In Succesfully',

      });
    }

    if (result[0].Role === "Visitor" && result[0].LastName !== null && result[0].Status === "Active"){
      form.resetFields()
      navigate("/Visitor")
      const ControlNos = (result[0].ControlNo === null? "not set" : result[0].ControlNo)
      const Name = (result[0].LastName + "," + " " + result[0].FirstName + " " + result[0].MiddleName)
      const LogState = ("Log In")
      const Date = (datecreated)
      axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: LogState, Name: Name, Time: time, Date: Date})
    .then((result) =>
    {
      console.log(result)
    })
    const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("We notice a recent log in to your Account" + " " + Date + " " + time)})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      message.open({
        type: 'success',
        content: 'Log In Succesfully',

      });
    }
    if (result[0].Role !== "Director's Office" && result[0].Role !== "Admin" && result[0].Role !== "Student" && result[0].Role !== "Visitor" && result[0].Status === "Active"){
      form.resetFields()
      navigate("/AcadProfile")
      const ControlNos = (result[0].ControlNo === null? "not set" : result[0].ControlNo)
      const Name = (result[0].LastName + "," + " " + result[0].FirstName + " " + result[0].MiddleName)
      const LogState = ("Log In")
      const Date = (datecreated)
      axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: LogState, Name: Name, Time: time, Date: Date})
    .then((result) =>
    {
      console.log(result)
    })
    const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("We notice a recent log in to your Account" + " " + Date + " " + time)})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      message.open({
        type: 'success',
        content: 'Log In Succesfully',

      });
    }

    if (result[0].Status !== "Active"){
      form.resetFields()
      localStorage.removeItem('user-info')
      message.open({
        type: 'error',
        content: 'Email or Password are Incorrect',

      });
    }
    }

    

  



  return (
    <>
    <Tooltip placement="top" title={'Sign In'}>
      <Button type="text" className="newsavatar2" onClick={() => setMainModel(true)}><UserOutlined 
        style={{display: 'inline-flex',justifyContent: 'center',alignItems: 'center', fontSize: '25px'}} />
        
      </Button>
      </Tooltip >
      <Modal
        open={isMainModel}
        onOk={form.submit}
        onCancel={handleCancel}
        
        
        footer={null}
        width={400}
        
      >
        <p style={{fontWeight: '600', fontSize: '30px'}}>Sign In</p>

        <Form
        form={form}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={handleOk}
    >
      <br />
      

      <Form.Item 
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
          {type:"email", message:"please enter a valid email "},
        ]}
        
      >
        <Input prefix={<UserOutlined className="site-form-item-icon"  />} placeholder="Email" style={{fontSize:'18px'}} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
    
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password" style={{fontSize:'18px'}}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox> 
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <br />
        <div className='login-form-or-register-now'>
        Or  <a className='login-form-register-now' onClick={onSubModel} >register now!</a>
        </div>
        
      </Form.Item>
    </Form>
  
      </Modal>

      
      <Modal
        open={isSubModel}
        onOk={form.submit}
        onCancel={handleRCancel}
        footer={null}
        width={400}
        
      >

      <p style={{fontWeight: '600', fontSize: '30px'}}>Sign Up</p>

        <Form
        form={form}
      name="normal_signup"
      className="Sign-up-form"
      initialValues={{
        remember: true,
      }}
      onFinish={handleRegister}
    >
      <br />
      

      <Form.Item
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
          {type:"email", message:"please enter a valid email"},
        ]}
      
        
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" style={{fontSize:'18px'}}/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
          {min: 8, message: "password must be at least 8 characters"}
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password" style={{fontSize:'18px'}}
        />
      </Form.Item>
      <Form.Item
        name="SCpassword"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },

          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}

        
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password" style={{fontSize:'18px'}}

          
        />
        
        </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="Signup-form-button">
          Sign Up
        </Button>
        <br />
        
      </Form.Item>
    </Form>
  
      </Modal>
      
      
    </>
  );
};

export default App;