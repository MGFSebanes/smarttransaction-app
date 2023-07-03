import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import puplogo from '../images/pup.png'
import './Student.css';
import { Drawer, Menu, Dropdown  } from "antd";
import {BellOutlined, MessageOutlined, CaretDownOutlined, MenuOutlined, UserOutlined,MailOutlined,UnorderedListOutlined,FileTextOutlined,UploadOutlined} from "@ant-design/icons";
import { Button, Space  } from 'antd';
import "antd/dist/reset.css";
import { Route, Routes, useNavigate, BrowserRouter } from "react-router-dom";
import { Avatar } from 'antd';
import Studentprofile from './Studentprofile';
import { ReactDOM } from "react";



function Home(){

    return(
        <div  className="HeadHeader" style={{display: "flex", flexDirection:"column", flex:1, height:'100vh'}}>
          <MainHeader />
          <div className="SIDEMenu" style={{display: "flex", flexDirection:"row", flex:1, }}>
            <SideMenu />        
          </div>
          
          <span className="Footers">
            <Footer />
          </span>
        </div>
      )
    }

function Footer(){
      return(
        <div style={{backgroundColor:"lightgray", color: 'black', display:'flex', justifyContent:'center', alignItems:'center',}}></div>
    
      )
    }

function MainHeader() {
      const [openMenu, setOpenMenu] = useState(false);
    return(
      <div style={{}}>
        <div 
          style={{
            height: 60,
            paddingLeft:"10px", 
            
            
          }}
          className="menuIcon"
          
        >
          <MenuOutlined 
            style={{  fontSize: 30, padding: ("12px"), float:"left", marginLeft: "30px"}} 
            onClick={() => {
              setOpenMenu(true);
            }}
          
          />
          <span style={{paddingLeft:"30px"}}>Smart Transaction</span>
        </div>
      
        <span className="headerMenu">
          <AppMenu1 />
          
        </span>
        <Drawer 
          placement="left"
          open ={openMenu}
          onClose={() => {
            setOpenMenu(false);
          }}
          closable={false} 
          bodyStyle={{backgroundColor:"#2c3E50", paddingLeft: 0,paddingRight:0, paddingTop:60 }}
        >
          <AppMenu isInline/>
          
          
          
        </Drawer>

        
        
      </div>  
    );
}    
function AppMenu({isInline=false}) {
    return(
        
          <Menu
          style={{color: 'white', fontSize:20, border:"none", width:375 }}
            mode={isInline?"inline":"horizontal"}
            
            items ={[
              {
                label: "Profile" ,
                key: "Profile",
                icon: <UserOutlined style={{fontSize: '80%'}}/>
                
              },
              {
                label: "Inbox",
                key: "Inbox",
                icon: <MailOutlined style={{fontSize: '80%'}}/>
              },
              {
                label: "Offices",
                key: "Offices",
                icon: <UnorderedListOutlined style={{fontSize: '80%'}}/>,
                children: [
                { label:"Director’s office", key:"directoffice"},
                { label:"Administrative ofice", key:"adminsoofice"},
                { label:"Academic Head Office ", key:"acadoffice"},
                { label:"Student Affairs and Services office ", key:"studoffice"},
                { label:"Records and Admission office", key:"recordoffice"},
                { label:"Quality Assurance office", key:"qualityoffice"},
                { label:"Cash Disbursement Office", key:"cashoffice"},
                
                ]
              },
              {
                label: "Documents",
                key: "Documents",
                icon: <FileTextOutlined style={{fontSize: '80%'}}/>,
                children: [
                  { label:"Download", key:"Download"},
                  { label:"Receipt", key:"Receipt"}
                ]
              },
              {
                label: "Log out",
                key: "Logout",
                icon: <UploadOutlined style={{fontSize: '80%', rotate: "90deg"}}/>
              },
            ]}
            
          
          ></Menu>
          
      

    )
}

function AppMenu1({isInline=false}) {
  const [openMenu, setOpenMenu] = useState(false);
  return(
      

    //<div className="header"
    //>
      //<img alt="" src={puplogo} width="57" height="57" className="logo d-inline-block align-top"
      //  />
     //<div className="header1"
    //>
    //  Smart Transaction     
    //</div> 
    //  <div  > 
    //    <Dropbtn />
    //  </div>
    //</div>
    <div className="header">
      <div className="container">
        <div className="left">
        <img alt="" src={puplogo} width="57" height="57" className="logo "
        />
        </div>
        <div className="center">
          Smart Transaction
        </div>
        <div className="right">
          
        </div>
      </div>
          <Notifbell />
          <Messagechat />
          <Dropbtn />
    </div>  

  )
}


function SideMenu() {
  const navigate = useNavigate();
  return(
      <div style={{display:"flex", flexDirection:"row", border:"none"}}>
        <Menu
        style={{color: 'white', fontSize:20, border:"none" , Width:"375", }}
          mode="inline"
          onClick={({key}) =>{
            if(key == "signout"){
              //Todo, Sign out
            }else{
              navigate(key);
            }
    
          }}
          defaultSelectedKeys={[window.location.pathname]}
          items ={[
            {
              label: "Profile",
              key: "/",
              icon: <UserOutlined style={{fontSize: '80%',}}/>
              
            },
            {
              label: "Inbox",
              key: "Studentprofile",
              icon: <MailOutlined style={{fontSize: '80%'}}/>
            },
            {
              label: "Offices",
              key: "Offices",
              icon: <UnorderedListOutlined style={{fontSize: '80%',}}/>,
              children: [
              { label:"Director’s office", key:"directoffice"},
              { label:"Administrative ofice", key:"adminsoofice"},
              { label:"Academic Head Office ", key:"acadoffice"},
              { label:"Student Affairs and Services office ", key:"studoffice"},
              { label:"Records and Admission office", key:"recordoffice"},
              { label:"Quality Assurance office", key:"qualityoffice"},
              { label:"Cash Disbursement Office", key:"cashoffice"},
              
              ]
            },
            {
              label: "Documents",
              key: "Documents",
              icon: <FileTextOutlined style={{fontSize: '80%'}}/>,
              children: [
                { label:"Download", key:"Download"},
                { label:"Receipt", key:"Receipt"}
              ]
            },
            {
              label: "Log out",
              key: "Logout",
              icon: <UploadOutlined style={{fontSize: '80%', rotate: "90deg",  }}/>
            },
          ]}
          
        ></Menu>
        
        < Content />
      </div>
  )
}


function Content(){
  return(
    <div>
      
       <Routes>
          <Route path="/" element={<div>Profile</div>}></Route>
          <Route path="/Studentprofile" element={<Studentprofile />}></Route>
          <Route path="/Offices" element={<div>Offices</div>}></Route>
          <Route path="/Documents" element={<div>Documents</div>}></Route>
          
          
       </Routes>
    </div>

  );
}


  
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
];
const Dropbtn = () => (

      
      <Dropdown
        
        menu={{
          items,
        }}
        placement="bottomRight"
        trigger={['click']}
      >
        
        <Button type="text" className="profileavatar" ><Avatar size={45} style={{margin: '0 5px', }} 
        icon={<UserOutlined style={{display: 'inline-flex',justifyContent: 'center',alignItems: 'center',}}/>} /> 
        John <CaretDownOutlined  style={{fontSize: '70%',  verticalAlign: 'middle',}}/></Button>
        
      </Dropdown>
      
    
  
);

const Messagechat = () => (

    <Button type="text" className="profileavatar" ><MessageOutlined style={{display: 'inline-flex',justifyContent: 'center',alignItems: 'center', fontSize: '25px' }}/></Button>


);

const Notifbell = () => (

  <Button type="text" className="profileavatar" ><BellOutlined style={{display: 'inline-flex',justifyContent: 'center',alignItems: 'center', fontSize: '25px' }}/></Button>


);

export default Home;