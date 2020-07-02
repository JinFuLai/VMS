import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form,Tag,Avatar } from 'antd';
const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
          children
        )}
    </td>
  );
};

const EditableTable = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = record => record.key === editingKey;

  console.log(props.dataSource, "传值")
 
  const edit = record => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: '用户账号',
      dataIndex: 'username',
      key: 'username',
      editable: true,
    },
    {
      title: '用户头像',
      dataIndex: 'photo',
      key: 'photo',
      render: photo => <Avatar src={photo} />,
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      editable: true,
    },
    {
      title: '用户性别',
      dataIndex: 'gender',
      key: 'gender',
      editable: true,
    },
    {
      title: '所在权限组',
      dataIndex: 'permissionGroups',
      key: 'permissionGroups',
      editable: true,
      render: permissionGroups => (
        <span>
          {permissionGroups != null ? permissionGroups.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          )) : ''}
        </span>
      ),
    },
    {
      title: '拥有权限数',
      dataIndex: 'number',
      key: 'number',
      editable: true,
    },
    {
      title: '注册时间',
      dataIndex: 'createdDate',
      key: 'createdDate',
      editable: true,
    },
    // {
    //   title: 'name',
    //   dataIndex: 'username',
    //   width: '25%',
    //   editable: true,
    // },
    // {
    //   title: 'age',
    //   dataIndex: 'age',
    //   width: '15%',
    //   editable: true,
    // },
    // {
    //   title: 'address',
    //   dataIndex: 'address',
    //   width: '40%',
    //   editable: true,
    // },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div>
            <div

              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </div>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </div>
        ) : (
            <div disabled={editingKey !== ''} onClick={() => edit(record)}>
              编辑
          </div>
          );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={props.dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default EditableTable;
