import axios from 'axios'
import { useState, useEffect } from 'react'
import { notification, Table, Divider, Space, Card, Spin } from 'antd'
import 'antd/dist/antd.css'

const UserList = () => {
  const [listOfUSer, setListOfUser] = useState([])
  const [loading, setLoading] = useState(false)

  const parseDataListOfUser = (response) => {
    let dataSource = []
    response.status === 200 &&
      response.data.forEach((item, index) => {
        let dataSourceObj = {
          id: item.id !== null ? item.id : index,
          key: index,
          name: item.name,
          username: item.username,
          email: item.email,
          phone: item.phone,
          website: item.website,
          adress:
            item.address.suite +
            item.address.city +
            item.address.street +
            item.address.zipcode,
          company: item.company.name,
        }
        dataSource.push(dataSourceObj)
      })
    return dataSource
  }

  const getData = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users',
      })
      if (response.status === 200) {
        setListOfUser(() => parseDataListOfUser(response))
        setLoading(false)
      } else {
        notification['error']({
          message: `Error while getting list of Data`,
          duration: 5,
        })
      }
    } catch (error) {
      notification['error']({
        message: `Error while getting list of Data`,
        duration: 5,
      })
    }
  }
  useEffect(() => {
    getData()
  }, [])
  let columnsData = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      width: '15%',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '15%',
    },
    {
      title: 'website',
      dataIndex: 'website',
      key: 'website',
      width: '15%',
    },
    {
      title: 'adress',
      dataIndex: 'adress',
      key: 'adress',
      width: '35%',
    },
    {
      title: 'company',
      dataIndex: 'company',
      key: 'company',
      width: '20%',
    },
  ]
  return (
    <>
      <Divider orientation='left'> Users </Divider>

      <br />
      <br />
      <div className={'row float-right'}>
        <Space>
          <Table
            columns={columnsData}
            size='small'
            rowKey={(record) => record.key}
            dataSource={listOfUSer}
            //onChange={onChange}
            loading={{
              indicator: (
                <div>
                  <Spin tip='Loading...' />
                </div>
              ),
              spinning: loading,
            }}
          />
        </Space>
      </div>
    </>
  )
}
export default UserList
