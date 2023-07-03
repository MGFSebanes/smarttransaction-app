import './Profile.css';
import {BellOutlined, MessageOutlined, CaretDownOutlined, MenuOutlined, UserOutlined,MailOutlined,UnorderedListOutlined,FileTextOutlined,
  UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined, VideoCameraOutlined, DiffOutlined, SnippetsOutlined} from "@ant-design/icons";
import { Button, Space, theme, message  } from 'antd';
import "antd/dist/reset.css";
import { Route, Routes, useNavigate, BrowserRouter, Link, Outlet } from "react-router-dom";
import { Avatar, Image } from 'antd';
import { Layout } from 'antd';
import { Drawer, Menu, Dropdown  } from "antd";
import { useState, useEffect } from 'react';
import puplogo from '../images/pup.png';
import images from '../images/image.png'
import Studentprofile from './Studentprofile';
import anonymous from '../images/anonymous.png'
import Directorsoffice from './Directorsoffice';
import Administrativeoffice from './Administrativeoffice';
import Acadoffice from './Acadoffice';
import Studaffair from './Studaffair';
import Recordsoffice from './Recordsoffice';
import Qualityass from './Qualityass';
import Cashdisburs from './Cashdisburs';
import React from 'react';
import axios from 'axios';







const { Header, Footer, Sider, Content } = Layout;




const App = () => {
  
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}
      style={{overflow: 'auto', height: '100vh', position: 'sticky', left: 0, top: 0, bottom: 0, background:"#2c3E50"}} width={"280px"}>
        <div className="demo-logo-vertical" style={{backgroundColor:"#800000"}} >
        <Button type="text" icon={collapsed ? <MenuUnfoldOutlined style={{top:'20px'}}/> : 
            <>
          <MenuFoldOutlined style={{marginLeft:"20px", marginRight:"10px"}}/>
          <img alt="" src={images} width="190" height="50" />
        
            </>}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: 'white',
              marginLeft: '8px'
            }}
          />
            
           
          
        
        </div>
        <Menuitems>
            
        </Menuitems>
        
        
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: 'sticky',top: 0, zIndex: 1,
            backgroundColor:'#800000',
            color:'white',
            
          }}
        >
          <PUPLogo />
          <PUP/>
          <Profilebtn />
          <Messagechat />
          <Notifbell />
          
        </Header>
        <Content
          style={{
            marginLeft: 24,
            minHeight: 280,
            
          }}
        >
         <BodyContent />


        </Content>
      </Layout>
    </Layout>
  );
};


    
    const items = [
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer">
             My Profile
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer">
            Edit Profile
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer">
            Log out
          </a>
        ),
      },
    
    ]

      const Profilebtn = () => {
        const [data, setData] = useState([]);

        useEffect(() => {
          const data = localStorage.getItem('user-info')
          setData(JSON.parse(data))
        },[])

        return(

            
          <>
              {
              data.map(datas => {
                return(
                  <>
                  <Dropdown
         
                    menu={{items,}} placement="bottomRight" trigger={['click']}>
                    
                    <Button type="text" className="Profileavatar" ><Avatar size={45}  style={{ borderColor:"#e2e6ea", marginRight:10, backgroundColor:'#e2e6ea'}}
                      /// image src={<Image preview={false}  width={45} height={45} src={anonymous } /> } />
                      src={<Image src={"http://localhost:56630/Photos/" + datas.ProfilePic}  preview={false}  width={45} height={45} /> } /> 
                      {datas.FirstName}
                       <CaretDownOutlined  style={{fontSize: '70%',  verticalAlign: 'middle',}}/></Button>
                    
                  </Dropdown>
                  
                  
                  </>
                )})}
            </>
          
        )  
      
    }
            
          
        
      
      
      const Messagechat = () => (
      
          <Button type="text" className="profileavatar" ><MessageOutlined style={{display: 'inline-flex',justifyContent: 'center',alignItems: 'center', fontSize: '25px' }}/></Button>
      
      
      );
      
      const Notifbell = () => (
      
        <Button type="text" className="profileavatar" ><BellOutlined style={{display: 'inline-flex',justifyContent: 'center',alignItems: 'center', fontSize: '25px' }}/></Button>
      
      
      );

      const PUPLogo = () => (
         <>
         
            <img alt="" src={puplogo} width="60" height="60" style={{marginTop:'2px'}} className="logo"/>
      
         </>
          
      );  
      
      const PUP = () => (
        <h3 className='PUP'>Smart Transaction</h3>
      );
      
  
      const Menuburger = () => {
        const [open, setOpen] = useState(false);
        const showDrawer = () => {
          setOpen(true);
        };
        const onClose = () => {
          setOpen(false);
        };

        
        return (
          <>
            
            <MenuOutlined className='burgericon'
            style={{  fontSize: 30, padding: ("12px"), float:"left", marginLeft: "30px"}} 
            onClick={showDrawer}

            Open
          />
              
            <Drawer placement="left" onClose={onClose} open={open} closable={false}
            bodyStyle={{backgroundColor:"#2c3E50", paddingLeft: 0,paddingRight:0, paddingTop:60 }}>
              <Menuitems />
            </Drawer>
          </>
        );
      };

      function Menuitems() {
        const navigate = useNavigate();
        const [data, setData] = useState([]);
        const current = new Date ();
        const date = `${current.getDate()}`;
        const year = `${current.getFullYear()}`
        const month = `${current.getMonth()+1}`
        const datecreated = `${year}-${month<10?`0${month}`:`${month}`}-${date}`

        let time = new Date().toLocaleTimeString();

        useEffect(() => {
          const data = localStorage.getItem('user-info')
          setData(JSON.parse(data))
        },[])
        
        return(
            
              <Menu
              style={{color: 'white', fontSize:17, background:"#2c3E50" }}
                mode="inline"
                
                onClick={({key}) =>{
                  if(key == '/'){
                    {
                      data.map(datas => {
                        const Name = (datas.LastName + "," + " " + datas.FirstName + " " + datas.MiddleName)
                        const ControlNos = (datas.ControlNo === null? "not set" : datas.ControlNo)
                        axios.post('http://localhost:56630/api/UserLog', {ControlNo: ControlNos, LogState: "Log Out", Name: Name, Time: time, Date: datecreated})
                        .then((result) =>
                        {
                          console.log(result)
                        })
                      })}
                    localStorage.removeItem('user-info')
                    navigate("/")
                  }else{
                    navigate(key);
                  }
          
                }}
                defaultSelectedKeys={[window.location.pathname]}
                items ={[
                  {
                    label: "Profile" ,
                    key: "StudentProfile",
                    icon: <UserOutlined style={{fontSize: '80%'}}/>
                    
                  },
                  {
                    label: "Request Document",
                    key: "Request",
                    icon: <DiffOutlined style={{fontSize: '80%'}}/>
                  },
                  {
                    label: "Request Appointment",
                    key: "Appointment",
                    icon: <SnippetsOutlined style={{fontSize: '80%'}}/>
                  },
                  
                  {
                    label: "Log out",
                    key: "/",
                    icon: <UploadOutlined style={{fontSize: '80%', rotate: "90deg"}} />
                  },
                  
                ]}
                
              
              ></Menu>
              
          
    
        )
    }      

    function BodyContent(){
      return(
        <div>

            <div>
              
              <Routes>
                <Route path="/" element={<Studentprofile />}></Route>
                <Route path="/Profile/Studentprofile" element={<Studentprofile />}></Route>

                
                
              </Routes>
          </div>
          <Outlet />
        </div>
        
    
      );
    }


export default App;