import { Button, Space, Card, Row, Col, Divider, Avatar, Table, Image,  DatePicker, Input, Modal, Checkbox, Select, 
  TimePicker, Form, message, Typography, Tag, Pagination   } from "antd";
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
import emailjs from '@emailjs/browser';

const { RangePicker } = DatePicker;
const { Text, Link } = Typography;

const Home = () => {
  const [gridData, setGridData] = useState ([]);
	const [data2, setData1] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [searchText1, setSearchText1] = useState('');
  const [searchedColumn1, setSearchedColumn1] = useState('');
  const searchInput1 = useRef(null);
  const handleSearch1 = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText1(selectedKeys[0]);
    setSearchedColumn1(dataIndex);
  };
  const handleReset1 = (clearFilters) => {
    clearFilters();
    setSearchText1('');
  };
  const getColumnSearchProps1 = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput1}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch1(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch1(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset1(clearFilters)}
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
              setSearchText1(selectedKeys[0]);
              setSearchedColumn1(dataIndex);
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
        setTimeout(() => searchInput1.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn1 === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText1]}
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
		setData1(JSON.parse(data))
		
		
	  },[])

	useEffect(() => {
		loadData();
	  }, []);

	  
	
	  const loadData = async () => {
		setLoading1(false);
		const stdid = JSON.parse(localStorage.getItem('user-info'))
		
		
		
		let result  = await fetch("http://localhost:56630/api/Transactions/UserTransaction",{
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": 'application/json'
			},
			body: JSON.stringify({AccountNumber: stdid[0].ID})
			})
			result = await result.json();
			if(result === "Invalid User"){
			
			setLoading1(false);
			}
			else{
        const filteredData = result.filter((item) => item.ServiceType === "Document");
				setGridData(filteredData)
				setLoading1(false)
			}
			
	
	  
	}
	
	const modifiedData = gridData.map(({ body, ...item}) => ({
		...item,
		key: item.ID,
		SDate: moment(item.Date).format("MMMM DD, YYYY")
		
		
	  }));

    ////
  const columns1 = [
    {
      title: "Date",
      dataIndex: 'SDate',
      key:'SDate',
      align: 'center',
      
      },
      {
      title: "Reference Number",
      dataIndex: 'DocuNumber',
      key:'DocuNumber',
      align: 'center',
      ...getColumnSearchProps1('DocuNumber'),
      
      
      },
      {
      title: "Service Requested",
      dataIndex: 'Services',
      key:'Services',
      align: 'center',
      ...getColumnSearchProps1('Services'),
      
      },
      {
      title: "Service Category",
      dataIndex: 'ServiceCategory',
      key:'ServiceCategory',
      align: 'center',
      filters:[
        {text: 'Simple', value:"Simple"},
        {text: 'Complex', value:'Complex'},
        {text: 'Technical', value:'Technical'}
  
      ],
      onFilter:(value, {ServiceCategory}) => {
        return ServiceCategory === value
      },
      render: (text) => <a>{text}</a>,
      
      },
      {
      title: "Office",
      dataIndex: 'Office',
      key:'Office',
      align: 'center',
      ...getColumnSearchProps1('Office'),
      
      
      },
           
      {
      title: "Status",
      dataIndex: 'Status',
      key:'Status',
      align: 'center',
      filters:[
        {text: 'Pending', value:"Pending"},
        {text: 'Completed', value:'Completed'},
  
      ],
      onFilter:(value, {Status}) => {
        return Status === value
      },
      render:(_, {Status}) =>(

        <Tag color={Status === "Pending"? 'green' : 'blue'} key={Status}>
            {Status.toUpperCase()}
            </Tag>
      )
      
        
      
      }
  
    ];
    

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [tabledata, setTableData] = useState ([])
    const [searchText, setSearchText] = useState('');
  	const [searchedColumn, setSearchedColumn] = useState('');
    const [AlreadyselectedKey, SetAlreadySelectedKey] = useState ([])
    const [SelectedRow, SetSelectedRow] = useState ([])
  	const searchInput = useRef(null);
    //
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
    //

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleSubmit = () => {
      const current = new Date ();
      const date = `${current.getDate()}`;
      const year = `${current.getFullYear()}`
      const month = `${current.getMonth()+1}`
      const datecreated = `${year}-${month<10?`0${month}`:`${month}`}-${date}`
      for(let i=0; i < AlreadyselectedKey.length; i++){
      const SelectedServices = (data1.filter(data => data.key === AlreadyselectedKey[i]));
      console.log(SelectedServices)

      const Services = (SelectedServices[0].Services)
      const Prefix = (year + "-")
      const Office = (SelectedServices[0].Office)
      const ServiceCategory = (SelectedServices[0].ServiceCategory)
      const Status = ("Pending")
      const ServiceType = ("Document")              
      
      data.map(datas => { 
        const Name = (datas.LastName + "," + " " + datas.FirstName + " " + datas.MiddleName)
        const ID = (datas.ID)
        const ContactNumber = (datas.ContactNumber)

        console.log({Prefix: Prefix, AccountNumber: ID, Name: Name, ContactNumber: ContactNumber, Office: Office, Services: Services, ServiceCategory: ServiceCategory, ServiceType:ServiceType, Date:datecreated, Status: Status})
        let items = {Prefix: Prefix, AccountNumber: ID, Name: Name, ContactNumber: ContactNumber, Office: Office, Services: Services, ServiceCategory: ServiceCategory, ServiceType:ServiceType, Date:datecreated, Status: Status}
        axios.post('http://localhost:56630/api/Transactions', items)
        .then((result) =>
        {
          form.resetFields()
          setIsModalOpen(false)
          setTableData([])
          loadData()
          message.open({
            type: 'success',
            content: 'Success!',

    
          });

        })
        const Emaildata = ({user_name: (Name), user_email:("paranaquepup7@gmail.com"), message:("This is to acknowlege your request for the service" + " " + Services + " " + "For inquires, Please contact the concerned office." )})
      emailjs.send('service_70tlukb', 'template_sy71knr', Emaildata, 'd3RINU2KyWQzDfYk-')
      .then((result) => {
        console.log(Emaildata)
        console.log(result.text);
        }, (error) => {
            console.log(error.text);
        })
      })
      
      }
    };
    const handleCancel = (e) => {
      form.resetFields()
      setIsModalOpen(false)
      setTableData([])
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
    const { Option } = Select;
    
    const Offices = [
      { office: "Administrative Office", displayOffice: "Administrative Office - Mrs. Myla Hernandez" },
      { office:"Academic Head Office" , displayOffice: "Academic Head Office - Prof. Catherine Llave"},
      { office:"Student Affairs and Admission Office" , displayOffice: "Student Affairs and Admission Office - Prof. Mila Joy Martinez"},
      { office:"Records and Admission Office" , displayOffice: "Records and Admission Office - Prof. Ribert Enierga"},
      { office:"Quality Assurance Office" , displayOffice: "Quality Assurance Office - Prof. Archie Arevalo"},
      { office:"Cash Disbursement Office" , displayOffice: "Cash Disbursement Office - Prof. Paul John Capote"},


    ];
    function onChange2(value) {
      SetSelectedRow([])
      const SelectedOffice = (Offices.filter(data => data.displayOffice === value));
      //console.log(SelectedOffice)
      const dataSource = [...data1];
      const filteredData = dataSource.filter((item) => item.Office === SelectedOffice[0].office)
      //console.log(filteredData)
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

    
    const columns = [
      Table.SELECTION_COLUMN,
      {
        title: 'Services',
        dataIndex: 'Services',
        key: 'Services',
        ...getColumnSearchProps('Services'),
        width: "45%",
      },
      {
        title: 'Office',
        dataIndex: 'Office',
        key: 'Offices',
        width: "45%",
      },
      
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
   
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    
  };
  
  const [form] = Form.useForm();
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
    <Typography.Title style={{marginTop:'10px'}} level={4}>Service Request Registration</Typography.Title>
    <Card
    title="List of registered services"
    extra={<Button type="primary"  onClick={showModal}>Add Service Request</Button>}
    bordered={false}
    style={{
      marginRight:'24px',
    }}
  >
    <Card className="Cardinfo1" style={{ height:75,}}>
    <p style={{color:"black", marginTop:"-15px", marginLeft:"-10px"}}>Note!</p>
    <p style={{color:"black", marginTop:"-10px", marginLeft:"-10px"}}>For official acknowledgement of your request, please email the concerned office after registration.</p>
    
  </Card>

  <Table columns={columns1} 
  dataSource={modifiedData}
	bordered 
  pagination={{
    pageSizeOptions: ["5", "10", "15"],
    showSizeChanger: true,
    locale: { items_per_page: "" },
    defaultPageSize: 5
    
  }}
	
	
	
	/>
  </Card>

  <Modal width={840} open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel} okText="Submit" style={{top: 5,}}
        title="Add Service Request"

        >
        <br/>
        <Text strong>Offices</Text>
        <br/>
        <Form form={form} onFinish={handleSubmit}>
        <Form.Item
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
                        style={{ width: 790, marginTop:"10px", marginBottom:"20px"}}
                        placeholder="Select Office"
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
                          <Option key={p.office} value={p.displayOffice}>{p.displayOffice}</Option>
                        ))}
                      </Select>
                      </Form.Item>
                      </Form>

                      <Card className="Cardinfo3" title={<p style={{marginTop:"-5px"}}>List of available services</p>}
                       headStyle={{backgroundColor:"#1677ff", color:"white", height:"50px",}}
                       
                      >
                      <Typography style={{marginTop:"-15px"}}>Select your desired service(s)</Typography>
                      <Table columns={columns} dataSource={tabledata}
                      pagination={{
                        pageSizeOptions: ["5", "10", "15"],
                        showSizeChanger: true,
                        locale: { items_per_page: "" },
                        defaultPageSize: 5
                        
                      }}
                      style={{marginTop:"20px"}}
                      bordered  
                      rowSelection={{
                      onChange:(e)=>{
                        SetAlreadySelectedKey(e)
                        SetSelectedRow(e)
                        
                        
                      },
                      hideSelectAll:true,
                      selectedRowKeys:SelectedRow
                      
                      
                      
                    
                    }}
                      />
                      
                      </Card>
                      
          
         
            
        </Modal>
    
    </>
  )
}
	
    

    
       
    
     
  
       


  







export default Home;

