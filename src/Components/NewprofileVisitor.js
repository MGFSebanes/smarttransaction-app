import './Profile.css';
import {BellOutlined, MessageOutlined, CaretDownOutlined, MenuOutlined, UserOutlined,MailOutlined,UnorderedListOutlined,FileTextOutlined,UploadOutlined, ConsoleSqlOutlined} from "@ant-design/icons";
import { Button, Space, message, Steps, theme, Modal, Form, Input, DatePicker, Select, Popconfirm  } from 'antd';
import "antd/dist/reset.css";
import { Route, Routes, useNavigate, BrowserRouter } from "react-router-dom";
import { Avatar, Image, Upload  } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Layout } from 'antd';
import { Drawer, Menu, Dropdown  } from "antd";
import { useState, useEffect } from 'react';
import puplogo from '../images/pup.png'
import Studentprofile from './Studentprofile';
import user1 from '../images/user1.png'
import Directorsoffice from './Directorsoffice';
import { StepPanel } from "./StepPanel";
import axios from 'axios';
import { ImgCropProps } from 'antd-img-crop';
import { createRoot } from 'react-dom/client';


const { Header, Footer, Sider, Content } = Layout;



const App = () => (
  

    <Layout>
      <Header className='Header' style={{padding:2,backgroundColor:'#800000', color:'white', position: 'sticky',top: 0, zIndex: 1,}}>
      <Menuburger />
      <PUPLogo />
      <PUP />
      <Profilebtn />
      <Messagechat />
      <Notifbell />

    
      </Header>
        
      <Layout>
        <Sider className='SideMenu' style={{backgroundColor:"#2c3E50",position: 'fixed',}} width={"375px"}>
          <Menuitems />
        </Sider>

        <Content className='Content' style={{ paddingTop:'7px',overflow: 'initial'}} >
          
          <RegistrationModal />
        </Content>
      </Layout>
      
    </Layout>


    );


    
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

      const Profilebtn = () => (
            
            
            <Dropdown
              
              menu={{
                items,
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              
              <Button type="text" className="Profileavatar" ><Avatar size={45}  style={{ borderColor:"#e2e6ea", marginRight:10, backgroundColor:'#e2e6ea'}}
                /// image 
                src={<Image preview={{ visible: false,   }}  /> } /> 
                 <CaretDownOutlined  style={{fontSize: '70%',  verticalAlign: 'middle',}}/></Button>
              
            </Dropdown>
            
          
        
      );
      
      const Messagechat = () => (
      
          <Button type="text" className="profileavatar" ><MessageOutlined style={{display: 'inline-flex',justifyContent: 'center',alignItems: 'center', fontSize: '25px' }}/></Button>
      
      
      );
      
      const Notifbell = () => (
      
        <Button type="text" className="profileavatar" ><BellOutlined style={{display: 'inline-flex',justifyContent: 'center',alignItems: 'center', fontSize: '25px' }}/></Button>
      
      
      );

      const PUPLogo = () => (
          <img alt="" src={puplogo} width="57" height="57"  className="logo" style={{marginLeft:'250px'}}
        />
      
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
        
        return(
            
              <Menu
              style={{color: 'white', fontSize:20, border:"none", width:375, }}
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
                    label: "Profile" ,
                    key: "Studentprofile",
                    icon: <UserOutlined style={{fontSize: '80%'}}/>
                    
                  },
                  {
                    label: "Inbox",
                    key: "Message",
                    icon: <MailOutlined style={{fontSize: '80%'}}/>
                  },
                  {
                    label: "Offices",
                    key: "Offices",
                    icon: <UnorderedListOutlined style={{fontSize: '80%'}}/>,
                    children: [
                    { label:"Director’s office", key:"Directorsoffice"},
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

    function BodyContent(){
      return(
        <div>
          
           <Routes>
              <Route path="" element={<Studentprofile />}></Route>
              <Route path="/Studentprofile" element={<Studentprofile />}></Route>
              <Route path="/Message" element={<div>Message</div>}></Route>
              <Route path="/Offices" element={<div>Offices</div>}></Route>
              <Route path="/Documents" element={<div>Documents</div>}></Route>
              <Route path="/Directorsoffice" element={<Directorsoffice />}></Route>
              
              
           </Routes>
        </div>
    
      );
    }


    const RegistrationModal = () => {
        const [isModalOpen, setIsModalOpen] = useState(true);
        const navigate = useNavigate();
        const [form] = Form.useForm();
        const handelelogout = () => {
          localStorage.removeItem('user-info')
          navigate("/")
        }
        const onChange3 = ({ fileList: newFileList }) => {
          setFileList(newFileList);
         
          
          
        };
        const getSrcFromFile = (file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
          };
        
        const onPreview = async (file) => {
          const src = file.url || (await getSrcFromFile(file));
          const imgWindow = window.open(src);
        
          if (imgWindow) {
            const image = new Image();
            image.src = src;
            imgWindow.document.write(image.outerHTML);
          } else {
            window.location.href = src;
          }
        };
        
        
        
        const [Images, setImage] = useState ([]);
        const [data, setData] = useState([]);
        const { Option } = Select;
        const [regions, setRegion] = useState([]);
        const [regionsid, setregionid] = useState([]);
        const [province, setprovince] = useState([]);
        const [provinceid, setprovinceid] = useState([]);
        const [cities, setcities] = useState([]);
        const [Profile_pic, Setprofile_pic] = useState ([])
        

        
        const [fileList, setFileList] = useState([
          {
            uid: '-1',
            //url: "http://localhost:56630/Photos/338729706_1322661321931517_4209117032469780_n.jpg" ,
            url: `http://localhost:56630/Photos/${(JSON.parse(localStorage.getItem('user-info'))[0].ProfilePic)}`
            
          },
        ],
        //console.log(JSON.parse(localStorage.getItem('user-info'))[0].ProfilePic)
        );
        
        
        
        function onChange5(value) {
          const id = (province.filter(data => data.name === value)[0].id);
          setcities(provinceid.data.filter(data => data.province_code === id))
          
          
        }
        function onChange4(value) {
          const id = (regions.filter(data => data.name === value)[0].id);
          setprovince(regionsid.data.filter(data => data.region_code === id))
          
        }
        
        function onChange(value) {
          console.log(`selected ${value}`);
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
        
        
        
        
        
        
        useEffect(() => {
          const data = localStorage.getItem('user-info')
          setData(JSON.parse(data))
          //console.log(JSON.parse(data)[0].ProfilePic)
          //Setprofile_pic({...JSON.parse(data)[0].ProfilePic})
          
          
        },[])

        
        const onFinish = (fieldsValue,) => {
        
        const Barangay = fieldsValue.Barangay
        const CellphoneNumber = fieldsValue.CellphoneNumber
        const City = fieldsValue.City
        const Email = fieldsValue.Email
        const gmail = fieldsValue.gmail
        const Password = fieldsValue.Password
        const FirstName = fieldsValue.FirstName
        const LastName = fieldsValue.LastName
        const MiddleName = fieldsValue.MiddleName
        
        const Province = fieldsValue.Province
        const Region = fieldsValue.Region
        const ControlNo = fieldsValue.ControlNumber
        const current = new Date ();
        const date = `${current.getDate()}`;
        const year = `${current.getFullYear()}`
        const month = `${current.getMonth()+1}`
        const datecreated = `${year}-${month<10?`0${month}`:`${month}`}-${date}`
        
        const photo = (fileList[0].url === "http://localhost:56630/Photos/profile_pic.png"? "profile_pic.png": fileList[0].name)
          console.log(photo)
          const formData1 = new FormData()
                    formData1.append("image", Images)
                    axios.post("http://localhost:56630/api/SavedBlogPost/SaveFile", formData1)
                    .then((res) => {
                     console.log(res)
                    })
                    {
                      data.map(datas => {
                        console.log(datas.ID)
                        const argument1 = datas.ID
          
                        axios.put('http://localhost:56630/api/Registration/VisitorNewprofile' , {ID: argument1, LastName: LastName, FirstName: FirstName, MiddleName: MiddleName,
                        Gmail: gmail, ContactNumber: CellphoneNumber,Region: Region, Province: Province, Cities: City, Barangay: Barangay, Email: Email, Password: Password, ProfilePic: photo
                      
                      })
                        .then((result) => {
                          localStorage.removeItem('user-info')
                          navigate("/")
                          message.open({
                            type: 'success',
                            content: 'Success',
                    
                          });
                          
                        })
                      })
                    }
        
        // POST the data to backend and show Notification
      }  
      useEffect (() => {

        const getregion = async ()=>{
          const res = await fetch("https://ph-locations-api.buonzz.com/v1/regions");
          const getcon = await res.json();
          setRegion(await getcon.data);
        
          //console.log(await getcon.data)
        }
        getregion();
        },[])
        
        useEffect (() => {
        const getprovince = async ()=>{
          const res = await fetch("https://ph-locations-api.buonzz.com/v1/provinces");
          const getcon = await res.json();
          setregionid(await getcon);
        
          //console.log(await getcon.data)
        }
        getprovince();
        },[])
        
        useEffect (() => {
        const getcities = async ()=>{
          const res = await fetch("https://ph-locations-api.buonzz.com/v1/cities");
          const getcon = await res.json();
          setprovinceid(await getcon);
        
          //console.log(await getcon.data)
        }
        getcities();
        },[])      
        
        return (
          <>
            
            <Modal open={isModalOpen}
                
                header = {null}
                onCancel={handelelogout}
                
                okText ="Submit"
                onOk={form.submit}
                width={940}>

              
              <div style={{display:'flex', float:'right', marginTop:'330px'}}>
                
                  
                
              </div>

              <div style={{paddingLeft:'10px', display:'flex'}}>
        
        
        <div style={{marginTop:'45px'}}>
        <h5 style={{color:'black', marginLeft:'35px',}}>Personal Details</h5>
        <Form form={form} onFinish={onFinish}  >
          <Form.Item valuePropName="fileList" getValueFromEvent={(event) => {return event?.fileList;}}
             name="photo">
            < >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange3}
              onPreview={onPreview}
              beforeUpload={(file) => {
                setImage(file)
                return false;
              }}> 
              
              
            
              {fileList.length < 1 && '+ Upload'}
            </Upload>
            
          </>
          </Form.Item>
          </Form>
        </div>

        <div style={{ float:'left', marginLeft:'20px', marginTop:'25px'}} >
        <Space
            
            style={{ display: "flex", marginTop:'20px'}} >
          <Form form={form} layout='vertical' onFinish={onFinish} >
          <Form.Item label="Email:">
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="Email"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      
                    >
                  <Input style={{width:200}}/>
                      
            </Form.Item >
          </Form.Item>
          </Form>
          <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item label="Password:">
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="Password"
                      rules={[
                        {
                          required: true,
                          
                        },
                      ]}
                      
                    >
                  <Input.Password style={{width:200}}/>
                      
            </Form.Item >
          </Form.Item>
          </Form>
          </Space>
        <Space
            
            style={{ display: "flex" , marginTop:'-30px'}} >
              <Form form={form} layout='vertical' onFinish={onFinish}>
                <Form.Item label="Last Name:" >
                    <Form.Item
                         style={{marginTop:'-10px'}}
                          name="LastName"
                          rules={[
                            {
                              required: true,
                              message: "'Last Name' is required"
                              
                            },
                          ]}>
                      <Input style={{width:200,}}/>
                          
                    </Form.Item >
                  </Form.Item>
              </Form>
          <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item label="First Name:">
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="FirstName"
                      rules={[
                        {
                          required: true,
                          message: "'First Name' is required"
                          
                        },
                      ]}>
                  <Input style={{width:200}}/>
                      
            </Form.Item >
          </Form.Item>
          </Form>
          <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item label="Middle Name:">
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="MiddleName"
                      rules={[
                        {
                          required: true,
                          message: "'Middle Name' is required"
                          
                        },
                      ]}>
                  <Input style={{width:200}}/>
                      
            </Form.Item >
          </Form.Item>
          </Form>
          </Space>
          <Space
            
            style={{ display: "flex", marginTop:'-30px', }} >
              <Form form={form} layout='vertical' onFinish={onFinish}>
            <Form.Item label="Cellphone Number">
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="CellphoneNumber"
                      rules={[
                        {
                          required: true,
                          message: "'Cellphone Number' is required"
                          
                        },
                      ]}>
                  <Input type='number' style={{width:200}}/>
                      
            </Form.Item >
          </Form.Item>
          </Form>
          <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item label="Email">
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="gmail"
                      rules={[
                        {
                          required: true,
                          message: "'Email' is required"
                          
                        },
                      ]}>
                  <Input style={{width:200}}/>
                      
            </Form.Item >
          </Form.Item>
          </Form>
          <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item label="Region">
                    <Form.Item
                          style={{marginTop:'-10px'}}
                          name="Region"
                          rules={[
                            {
                              required: true,
                              message: "'Region' is required"
                              
                            },
                          ]}>
                        <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a Region"
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
                        {regions.map((p) => (
                          <Option key={p.id} value={p.name}>{p.name}</Option>
                        ))}
                      </Select>
                          
                </Form.Item >
              </Form.Item>
          </Form>
          
          
          </Space>

          <Space
            
            style={{ display: "flex", marginTop:'-30px',}} >
              <Form form={form} layout='vertical' onFinish={onFinish}>
              <Form.Item label="Province">
                    <Form.Item
                          style={{marginTop:'-10px'}}
                          name="Province"
                          rules={[
                            {
                              required: true,
                              message: "'Province' is required"
                              
                            },
                          ]}>
                      <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a Province"
                        optionFilterProp="children"
                        onChange={onChange5}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                          option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {province.map((p) => (
                          <Option key={p.name} value={p.name}>{p.name}</Option>
                        ))}
                      </Select>
                          
                </Form.Item >
              </Form.Item>
              
              </Form>
              <Form form={form} layout='vertical' onFinish={onFinish}>
                <Form.Item label="City">
                    <Form.Item
                          style={{marginTop:'-10px'}}
                          name="City"
                          rules={[
                            {
                              required: true,
                              message: "'City' is required"
                              
                            },
                          ]}>
                      <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a City"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                          option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {cities.map((p) => (
                          <Option key={p.name} value={p.name}>{p.name}</Option>
                        ))}
                      </Select>
                          
                </Form.Item >
              </Form.Item>             
              </Form>
              <Form form={form} layout='vertical' onFinish={onFinish}>
                <Form.Item label="Barangay">
                    <Form.Item
                          style={{marginTop:'-10px'}}
                          name="Barangay"
                          rules={[
                            {
                              required: true,
                              message: "'Barangay' is required"
                              
                            },
                          ]}>
                      <Input style={{width:200}}/>
                          
                </Form.Item >
              </Form.Item>
              </Form>
          </Space>
        </div>
        
      </div>
              
            
            </Modal>
          </>
        );
      };

     
        
      
      
      


              
            
            
          
          
export default App;



