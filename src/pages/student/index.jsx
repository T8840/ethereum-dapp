import React, { useState } from 'react';
import { Form, Input, InputNumber, Table, Button, Select, Drawer, DatePicker, Col, Row, Space } from 'antd';
const { Option } = Select;

const originData = [];
for (let i = 0; i < 6; i++) {
    originData.push({
        key: i.toString(),
        name: `李明 ${i}`,
        age: 16,
        gender: `男`,
        score: `8${i}`,
        address: `北京市小区第${i}号`,
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
const Student = () => {
    const [form] = Form.useForm();
    const [data] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    const isEditing = (record) => record.key === editingKey;

    const cancel = () => {
        setEditingKey('');
    };
   
    const columns = [
        {
            title: '名字',
            dataIndex: 'name',
            width: '15%',
            editable: true,
        },
        
        {
            title: '分数',
            dataIndex: 'score',
            width: '10%',
            editable: true,
        }, 
        {
            title: '录入日期',
            dataIndex: 'date',
            width: '10%',
            editable: true,
        }
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <>
            
            <Drawer
                title='新学生录入'
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onClose} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="fullName"
                                label="姓名"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter user name',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="address"
                                label="地址"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter employee public address',
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        width: '100%',
                                    }}

                                    placeholder="Please enter employee public address"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="gender"
                                label="性别"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a gender',
                                    },
                                ]}
                            >
                                <Select placeholder="Please select a gender">
                                    <Option value="male">男</Option>
                                    <Option value="female">女</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="score"
                                label="分数"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input score!',
                                    },
                                ]}
                            >
                                <InputNumber
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                  
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="date"
                                label="日期"
                                rules={[
                                    {
                                        required: true,
                                        message: 'please selectthe date',
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Drawer>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </>
    );
};
export default Student;