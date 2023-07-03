import React, {Component} from "react"; 
import puplogo from '../images/pup.png';
import { Table, Layout, Button, Space, Popconfirm,Switch, Form, Modal, Input, Upload, Typography, Select, DatePicker, message, Tag} from 'antd';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Homepage.css';
import { PlusCircleOutlined, FileExcelOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import { CSVLink } from "react-csv";
import { Route, Routes, useNavigate, BrowserRouter } from "react-router-dom";
import { StepPanel } from "./StepPanel";
import Password from "antd/es/input/Password";

const App = () => (

      <>
      <Typography.Title style={{marginTop:'10px'}} level={4}>Users</Typography.Title>
        <Users/>
      </>
        
          
      

);

function Users(){
    const [gridData, setGridData] = useState ([]);
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('');
  	const [searchedColumn, setSearchedColumn] = useState('');
  	const searchInput = useRef(null);
    const [isStudent, setisStudent] = useState(false);
    const [isvisitor, setisVisitor] = useState(false)
    const [form] = Form.useForm();
////////////////////////////////
const onChange3 = ({ fileList: newFileList }) => {
  setFileList(newFileList);
 
  
  
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
const [fileList, setFileList] = useState([
  {
    uid: '-1',
    url: 'http://localhost:56630/Photos/profile_pic.png',
  },
]);



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

if (LastName === undefined && FirstName === undefined  && MiddleName === undefined && gmail === undefined  && CellphoneNumber === undefined && Region === undefined && Province === undefined && City === undefined && Barangay === undefined){
  console.log(true)
  const photo = (fileList[0].url === "http://localhost:56630/Photos/profile_pic.png"? "profile_pic.png": fileList[0].name)
      console.log(photo)
      const formData1 = new FormData()
                formData1.append("image", Images)
                axios.post("http://localhost:56630/api/SavedBlogPost/SaveFile", formData1)
                .then((res) => {
                 console.log(res)
                })
                axios.post('http://localhost:56630/api/Registration/DefaultVisitor', {ControlNo:ControlNo, Email:Email, Password:Password, Role: "Visitor", ProfilePic:photo, DateCreated:datecreated , Status:"Active"})
                .then((result) =>
                {
                  form.resetFields()
                  setisVisitor(false)
                  loadData();
                  message.open({
                    type: 'success',
                    content: 'Success !',
            
                  });
                })          
}
else{
  console.log(false)
  const photo = (fileList[0].url === "http://localhost:56630/Photos/profile_pic.png"? "profile_pic.png": fileList[0].name)
      console.log(photo)
      const formData1 = new FormData()
                formData1.append("image", Images)
                axios.post("http://localhost:56630/api/SavedBlogPost/SaveFile", formData1)
                .then((res) => {
                 console.log(res)
                })
                axios.post('http://localhost:56630/api/Registration/Visitor', {ControlNo: ControlNo, Email: Email, Password : Password, Role: "Visitor", ProfilePic: photo, DateCreated: datecreated, LastName: LastName, FirstName: FirstName, MiddleName: MiddleName, Gmail: gmail, ContactNumber: CellphoneNumber, Region: Region, Province: Province, Cities: City, Barangay: Barangay  })
                .then((result) =>
                {
                  form.resetFields()
                  setisVisitor(false)
                  loadData();
                  message.open({
                    type: 'success',
                    content: 'Success !',
            
                  });
                }) 
}

// POST the data to backend and show Notification





}
//// Delete
const handleDelete = (ID, e) => {
  axios.put('http://localhost:56630/api/Registration/Status' , {ID: ID, Status:"Inactive"})
    .then((result) => {
      
      loadData();
    })
  
  
  
} 

/////

const getSrcFromFile = (file) => {
return new Promise((resolve) => {
  const reader = new FileReader();
  reader.readAsDataURL(file.originFileObj);
  reader.onload = () => resolve(reader.result);
});
};



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

    /////////////////////////////
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
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(false);
    const response = await axios.get(
      "http://localhost:56630/api/Registration"
    );
    //setGridData(response.data);
    setLoading(false);
    const dataSource = [...response.data];
    //const filteredData = dataSource.filter((item) => item.Role !== "Admin");
    setGridData(dataSource.filter((item) => item.Role !== "Admin"))
  };

  const modifiedData = gridData.map(({ body, ...item}) => ({
    ...item,
    key: item.ID,
    Names: (item.LastName + ", " + item.FirstName + " " + item.MiddleName),
    faculty: (item.Role !== "Student" && item.Role !== "Visitor"? "Faculty":item.Role),
    rfidcard: (item.ControlNo === null ? "not set" : item.ControlNo),
    Courses: (item.Role !== "Student" && item.Role !== "Visitor"? "Faculty" : (item.Role !== "Student"? "Visitor": item.Course)),
    
    
  }));


 


  const headers =[
    { label: "Control No", key:'ControlNo'},
    { label: "Email", key:'Email'},
    { label: "Password", key:'Password'},
    { label: "Role", key:'Role'},
    { label: "ID Number", key:'IDNumber'},
    { label: "Last Name", key:'LastName'},
    { label: "First Name", key:'FirstName'},
    { label: "Middle Name", key:'MiddleName'},
    { label: "Gender", key:'Sex'},
    { label: "Birth Date", key:'BirthDate'},
    { label: "Civil Status", key:'CivilStatus'},
    { label: "Email", key:'Gmail'},
    { label: "Contact Number", key:'ContactNumber'},
    { label: "Course", key:'Course'},
    { label: "Year and Section", key:'YearSection'},
    { label: "Father's Name", key:'FathersName'},
    { label: "Mother's Name", key:'MothersName'},
    { label: "Region", key:'Region'},
    { label: "Province", key:'Province'},
    { label: "City", key:'Cities'},
    { label: "Barangay", key:'Barangay'},
    { label: "Profile Pic", key:'ProfilePic'},
    { label: "Date Created", key:'DateCreated'},
    { label: "Status", key:'Status'},



    

  ];

  const csvReport = {
    filename: 'Users.csv',
    headers: headers,
    data: modifiedData
  }

///////////////

const addVisitor = () => {
  setisVisitor(true)
 }

 const handleCancel = () => {
  setisVisitor(false)
  form.resetFields()
  
};
  



//////////////////////////
  const columns = [

    {
      title: "Control No",
      dataIndex: 'rfidcard',
      align: 'center',
      key:'ControlNo',
      ...getColumnSearchProps('rfidcard'),
      render: (text) => <a>{text}</a>,
                  
    },
    {
      title: "Name",
      dataIndex: 'Name',
      align: 'center',
      key:'Name',
      ...getColumnSearchProps('Names'),
      render: (_, record) => (record.LastName !== "."?<a>{record.LastName} , {record.FirstName} {record.MiddleName}</a> : "not set" )
      
                    
    },
    {
      title: "Role",
      dataIndex: 'Role',
      align: 'center',
      key:'Role',
      filters:[
        {text: 'Student', value:"Student"},
        {text: 'Faculty', value:"Faculty"},
        {text: 'Visitor', value:"Visitor"}
  
      ],
      onFilter:(value, {faculty}) => {
        return faculty === value
      },
      render: (text) => <a>{text}</a>
                    
    },
    {
      title: "Course",
      dataIndex: 'Courses',
      align: 'center',
      key:'Courses',
      filters:[
        {text: 'BSCPE', value:"BSCPE"},
        {text: 'BSIT', value:"BSIT"},
        {text: 'BSHM', value:"BSHM"},
        {text: 'BSOA', value:"BSOA"},
        {text: 'Faculty', value:"Faculty"},
        {text: 'Visitor', value:"Visitor"}
  
      ],
      onFilter:(value, {Courses}) => {
        return Courses === value
      },
      render: (text) => <a>{text}</a>
                    
    },
    {
      title: "Status",
      dataIndex: 'Status',
      align: 'center',
      key:'Status',
      filters:[
        {text: 'Active', value:"Active"},
        {text: 'Inactive', value:"Inactive"},
  
      ],
      onFilter:(value, {Status}) => {
        return Status === value
      },
      render:(_, {Status}) =>(

        <Tag color={Status === "Inactive"? 'volcano' : 'blue' } key={Status}>
            {Status.toUpperCase()}
            </Tag>
      )
                  
    },
    {
      title: "Action",
      dataIndex: "action",
      align:'center',
      key:'action',
      render: (_, record) => {
        return <Space>
                  <Button type="primary" >Edit</Button>
                  
                  <Popconfirm title="Are you Sure you want to delete?" onConfirm={(e) => handleDelete(record.ID, e)}>
                      <Button danger type="primary">Delete</Button>
                  </Popconfirm>
              </Space>
            

      }
    }
  ]

  return(
    <div>
      
      <Table
        columns={columns}
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
              <Button type="primary"style={{display:"flex", }} onClick={addVisitor}>
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
                       




            <Modal open={isvisitor}  header = {null} onCancel={handleCancel} width={940} onOk={form.submit} okText="Submit">

              
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
              <Form form={form} layout='vertical' onFinish={onFinish}>
                <Form.Item label="Control Number:" >
                    <Form.Item
                         style={{marginTop:'-10px'}}
                          name="ControlNumber"
                          rules={[
                            {
                              required: true,
                              message: "'Control Number' is required"
                              
                            },
                          ]}
                          
                        >
                      <Input style={{width:200,}}/>
                          
                    </Form.Item >
                  </Form.Item>
              </Form>
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
                          name="LastName">
                      <Input style={{width:200,}}/>
                          
                    </Form.Item >
                  </Form.Item>
              </Form>
          <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item label="First Name:">
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="FirstName">
                  <Input style={{width:200}}/>
                      
            </Form.Item >
          </Form.Item>
          </Form>
          <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item label="Middle Name:">
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="MiddleName">
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
                      name="CellphoneNumber">
                  <Input type='number' style={{width:200}}/>
                      
            </Form.Item >
          </Form.Item>
          </Form>
          <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item label="Email">
                <Form.Item
                      style={{marginTop:'-10px'}}
                      name="gmail">
                  <Input style={{width:200}}/>
                      
            </Form.Item >
          </Form.Item>
          </Form>
          <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item label="Region">
                    <Form.Item
                          style={{marginTop:'-10px'}}
                          name="Region">
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
                          name="Province">
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
                          name="City">
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
                          name="Barangay">
                      <Input style={{width:200}}/>
                          
                </Form.Item >
              </Form.Item>
              </Form>
          </Space>
        </div>
        
      </div>
              
            </Modal>



            </>

        }
        />
  
  </div>
  )

}

/////////////////////////////////////////////////////////////////// visitor



export default App;