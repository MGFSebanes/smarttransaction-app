import React, {Component} from "react"; 
import puplogo from '../images/pup.png';
import { Table, Layout, Button, Space, Popconfirm,Switch, Form, Modal, Input, Upload, Typography } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Homepage.css';
import { ConsoleSqlOutlined } from "@ant-design/icons";



const App = () => (

      <>
      <Typography.Title style={{marginTop:'10px'}} level={4}>Blog Post</Typography.Title>
      <SavedNews />
        <br/>
        <SavedSlide />
        <br/>
        <SavedBlogPost/>
      </>
        
          
      

);

function SavedNews(){
  const [gridData, setGridData] = useState ([]);
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false);
  const [modalTaskId, setModalTaskId] = useState(null);
  const [Evisible, EsetVisible] = useState(false);
  
  
  const [form] = Form.useForm();

  /// status switch
  function onChange(checked,e) {
   // console.log(checked ? 1 : 0);
   // console.log(e ? 1 : 0)
    
    const argument1 = checked.ID
    const argument2 = checked.News
    const argument3 = (e? 1: 0)

    console.log(argument1, argument2, argument3)
    axios.put('http://localhost:56630/api/SavedNews' , {ID: argument1, News: argument2, Status: argument3})
    .then((result) => {
      loadData();
    })
    
  
    
  }
  
  //// ADD
  const showModal = () => {
    setVisible(true)
  }

  const handleSubmit = (e) => {
    const argument1  = e.News

    axios.post('http://localhost:56630/api/SavedNews', {News: argument1, Status: "1"})
    .then((result) =>
    {
      form.resetFields()
      setVisible(false)
      loadData();
    })
    //console.log({News: argument1, Status: "1"})
    //form.resetFields()
    //setVisible(false)
  }
  
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  };
  
  //// Show 
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(false);
    const response = await axios.get(
      "http://localhost:56630/api/SavedNews"
    );
    setGridData(response.data);
    setLoading(false);
  };

  const modifiedData = gridData.map(({ body, ...item}) => ({
    ...item,
    key: item.ID,
    
  }));

  //// Delete
  const handleDelete = (ID, e) => {
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.ID !== ID);
    setGridData(filteredData);
    axios.delete(`http://localhost:56630/api/SavedNews/${ID}`)
    
  }

  //// Edit

  const handleEditCancel = () => {
    EsetVisible(false)
    form.resetFields()
  };

  const showEditModal = (record) => {
    EsetVisible(true)
    
    setModalTaskId({...record})
    form.setFieldsValue({
      
      News: record.News,
     
      
    });
  }

  const handleEditSubmit = (e) => {
    const argument1 = modalTaskId.ID
    const argument2  = e.News
    const argument3 = modalTaskId.Status
    
    
    axios.put('http://localhost:56630/api/SavedNews' , {ID: argument1, News: argument2, Status: argument3})
    .then((result) => {
      form.resetFields()
      EsetVisible(false)
      loadData();
    })
    
  }
  ////
  const columns = [

    {
      title: "Saved news",
      dataIndex: 'News',
      align: 'center',
      key:'News',
      render: (text) => <a>{text}</a>,
                  
    },
    
    {
      title: "Status",
      dataIndex: 'Status',
      align: 'center',
      key:'Status',
      render: (e, record) =>(<Switch defaultChecked={e ==="1" ? true : false} 
                  checkedChildren="Active" unCheckedChildren="Inactive" onChange={(e) => onChange(record, e)} />)
                  
        
      
      
    },

    {
      title: "Action",
      dataIndex: "action",
      align:'center',
      key:'action',
      render: (_, record) => {
        return <Space>
                  <Button type="primary" onClick={() => showEditModal(record)}>Edit</Button>
                  
                  <Popconfirm title="Are you Sure you want to delete?" onConfirm={(e) => handleDelete(record.ID, e)}>
                      <Button danger type="primary">Delete</Button>
                  </Popconfirm>
              </Space>
            

      }
    }

  ];

  

  return(
    <div>
      
      <Table
        columns={columns}
        dataSource={modifiedData}
        loading={loading}
        pagination={{pageSize: 5,}}
        bordered
        title={() => 
          <>
          <Button type="primary"style={{float:"right",display:"flex", marginBottom:10}}onClick={showModal}>
              Add New
          </Button>
          <Modal title="Homepage Content Management" open={visible} onOk={form.submit} onCancel={handleCancel} okText="Save">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Create News">
            <Form.Item
                  name="News"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Something !',
                    },
                  ]}
                  
                >
                  <Input.TextArea />
                  
            </Form.Item>
          </Form.Item>

          
          
        </Form>
      </Modal>
      <Modal title="Homepage Content Management" open={Evisible} onOk={form.submit} onCancel={handleEditCancel} okText="Save">
                    <Form form={form} onFinish={handleEditSubmit} layout="vertical">
                      <Form.Item label="Edit News">
                        <Form.Item
                              name="News"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input Something !',
                                },
                              ]}
                              
                            >
                              <Input.TextArea />
                              
                        </Form.Item>
                      </Form.Item>

                      
                      
                    </Form>
                  </Modal>
          </>
          
        
        }
      
    />
   
  </div>
  )
}

//////////////////////////////////////////////////

function SavedSlide(){
  const [gridData, setGridData] = useState ([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  
  
  //// Show 
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(false);
    const response = await axios.get(
      "http://localhost:56630/api/SavedSlide"
    );
    setGridData(response.data);
    setLoading(false);
  };

  const modifiedData = gridData.map(({ body, ...item}) => ({
    ...item,
    key: item.ID,
    
  }));


  
  //// ADD ////
  const showModal = () => {
    setVisible(true)
  }

  //// ADD image//
  const handleSubmit= (record) => {
    

    //setImage(e.target)
    const argument1  = record.photo

    for(let i=0; i < argument1.length; i++){
    console.log(argument1[i].name)
    axios.post('http://localhost:56630/api/SavedSlide', {Photo: argument1[i].name, Status: "1"})
    .then((result) =>
    {
      form.resetFields()
      setVisible(false)
      loadData();
    })
    }
     

  }
  
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  };



  /// status switch
  function onChange(checked,e) {
    // console.log(checked ? 1 : 0);
    // console.log(e ? 1 : 0)
     
     const argument1 = checked.ID
     const argument2 = checked.Photo
     const argument3 = (e? 1: 0)
 
     console.log(argument1, argument2, argument3)
     axios.put('http://localhost:56630/api/SavedSlide' , {ID: argument1, Photo: argument2, Status: argument3})
     .then((result) => {
       loadData();
     })

    }

  //// Delete
  const handleDelete = (ID, e) => {
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.ID !== ID);
    setGridData(filteredData);
    axios.delete(`http://localhost:56630/api/SavedSlide/${ID}`)
    
  }   
   
     
   

  const columns = [

    {
      title: "Slide ",
      dataIndex: 'Photo',
      key:'Photo',
      align:'center',
      render: (record) => <img src={"http://localhost:56630/Photos/" + record} width="300px" height="100px"></img>
                  
    },
    
    {
      title: "Status",
      dataIndex: 'Status',
      align: 'center',
      key:'Status',
      render: (e, record) =>(<Switch defaultChecked={e ==="1" ? true : false} 
                  checkedChildren="Active" unCheckedChildren="Inactive" onChange={(e) => onChange(record, e)} />)
                  
        
      
      
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

  ];

  return(
    <div>
      
      <Table
        columns={columns}
        dataSource={modifiedData}
        loading={loading}
        pagination={{pageSize: 5,}}
        bordered
        title={() => 
          <>
          <Button type="primary"style={{float:"right",display:"flex", marginBottom:10}}onClick={showModal}>
              Add New
          </Button>
          <Modal title="Homepage Content Management" open={visible} onOk={form.submit} onCancel={handleCancel} okText="Save">
        <Form form={form} onFinish={handleSubmit} layout="vertical" >
          <Form.Item label="Slide" >
            <Form.Item valuePropName="fileList" getValueFromEvent={(event) => {return event?.fileList;}}
                  name="photo"
                  rules={[
                    {
                      required: true,
                      message: 'Please input files !',
                    },
                  ]}
                  
                >
                  <Upload.Dragger multiple={true} action={"http://localhost:56630/api/SavedSlide/SaveFile"} listType="picture" accept=".png, .jpg"
                  beforeUpload={(file) => {
                    //setImage(file)
                    const formData = new FormData()
                    formData.append("image", file)
                    axios.post("http://localhost:56630/api/SavedSlide/SaveFile", formData)
                    .then((res) => {
                     console.log(res)
                    })
   
                    return false;
                  }}> 
                    Drag files here OR 
                    <br/>
                    <Button>Click Upload</Button>
                  </Upload.Dragger>

                  
            </Form.Item>
          </Form.Item>

          
          
        </Form>
      </Modal>
      
          </>
          
        
        }
      
    />
   
  </div>
  )
}  


function SavedBlogPost(){

  const [gridData, setGridData] = useState ([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  
  
  //// Show 
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(false);
    const response = await axios.get(
      "http://localhost:56630/api/SavedBlogPost"
    );
    setGridData(response.data);
    setLoading(false);
  };

  const modifiedData = gridData.map(({ body, ...item}) => ({
    ...item,
    key: item.ID,
    
  }));


  
  //// ADD ////
  const showModal = () => {
    setVisible(true)
  }

  //// ADD image//
  const handleSubmit= (record) => {
    

    //setImage(e.target)
    const argument1  = record.photo
    const argument2 = record.Post

    for(let i=0; i < argument1.length; i++){
    console.log(argument1[i].name)
    axios.post('http://localhost:56630/api/SavedBlogPost', {Photo: argument1[i].name, About: argument2,Status: "1"})
    .then((result) =>
    {
      form.resetFields()
      setVisible(false)
      loadData();
    })
    }
     

  }
  
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  };



  /// status switch
  function onChange(checked,e) {
    // console.log(checked ? 1 : 0);
    // console.log(e ? 1 : 0)
     
     const argument1 = checked.ID
     const argument2 = checked.Photo
     const argument3 = checked.About
     const argument4 = (e? 1: 0)
 
     console.log(argument1, argument2, argument3)
     axios.put('http://localhost:56630/api/SavedBlogPost' , {ID: argument1, Photo: argument2, About: argument3, Status: argument4})
     .then((result) => {
       loadData();
     })

    }

  //// Delete
  const handleDelete = (ID, e) => {
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.ID !== ID);
    setGridData(filteredData);
    axios.delete(`http://localhost:56630/api/SavedBlogPost/${ID}`)
    
  }   
   
     
   

  const columns = [

    {
      title: "Slide ",
      dataIndex: 'Photo',
      key:'Photo',
      align:'center',
      render: (record) => <img src={"http://localhost:56630/Photos/" + record} width="300px" height="100px"></img>
                  
    },

    {
      title: "About ",
      dataIndex: 'About',
      key:'About',
      align:'center',
      render: (text) => <a>{text}</a>,
                  
    },
    
    {
      title: "Status",
      dataIndex: 'Status',
      align: 'center',
      key:'Status',
      render: (e, record) =>(<Switch defaultChecked={e ==="1" ? true : false} 
                  checkedChildren="Active" unCheckedChildren="Inactive" onChange={(e) => onChange(record, e)} />)
                  
        
      
      
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

  ];


  return(
    <div>
      
      <Table
        columns={columns}
        dataSource={modifiedData}
        loading={loading}
        pagination={{pageSize: 5,}}
        bordered
        title={() => 
          <>
          <Button type="primary"style={{float:"right",display:"flex", marginBottom:10}}onClick={showModal}>
              Add New
          </Button>
          <Modal title="Homepage Content Management" open={visible} onOk={form.submit} onCancel={handleCancel} okText="Save">
        <Form form={form} onFinish={handleSubmit} layout="vertical" >
          <Form.Item label="Blog Post" >
            <Form.Item valuePropName="fileList" getValueFromEvent={(event) => {return event?.fileList;}}
                  name="photo"
                  rules={[
                    {
                      required: true,
                      message: 'Please input files !',
                    },
                  ]}
                  
                >
                  <Upload.Dragger maxCount={1} multiple={false} action={"http://localhost:56630/api/SaveBlogPost/SaveFile"} listType="picture" accept=".png, .jpg"
                  beforeUpload={(file) => {
                    //setImage(file)
                    const formData = new FormData()
                    formData.append("image", file)
                    axios.post("http://localhost:56630/api/SavedBlogPost/SaveFile", formData)
                    .then((res) => {
                     console.log(res)
                    })
   
                    return false;
                  }}> 
                    Drag files here OR 
                    <br/>
                    <Button>Click Upload</Button>
                  </Upload.Dragger>

                  
            </Form.Item>

            <Form.Item
                              name="Post"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input Something !',
                                },
                              ]}
                              
                            >
                              <Input.TextArea />
                              
                        </Form.Item>
          </Form.Item>

          
          
        </Form>
      </Modal>
      
          </>
          
        
        }
      
    />
   
  </div>
  )

}



export default App;



//https://www.youtube.com/watch?v=6b8fg2XVkJE&list=PLXIf5ibIbJuwCUVWUmotnFfmmVXeasMR_&index=1