import { TableSearchContext } from "@/components/context/table.search.context";
import Access from "@/components/share/access";
import { ALL_PERMISSIONS } from "@/config/permissions";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchUser } from "@/redux/slice/UserSlice";
import { IUser } from "@/types/backend";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, TableColumnsType } from "antd";
import { useContext, useEffect, useState } from "react";

interface DataType {
  key: string;
  email: string;
  fistName: string;
  lastName: string;
  role: string;
}

const ManageUserPage = () => {
  const PAGE_SIZE = 5;

  const { getColumnSearchProps } = useContext(TableSearchContext)!;

  const isFetching = useAppSelector((state) => state.user.isFetching);
  const meta = useAppSelector((state) => state.user.meta);
  const users = useAppSelector((state) => state.user.result);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const query = `pageSize=${PAGE_SIZE}&current=${currentPage}`;
    dispatch(fetchUser({ query }));
  }, [currentPage]);

  const dataSource = users.map((item: IUser) => {
    return {
      ...item.info,
      role: item?.role?.name,
    };
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
      ...getColumnSearchProps("fistName"),
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      ...getColumnSearchProps("role"),
    },
    {
      title: "Actions",
      width: 50,
      render: () => (
        <Space>
          <Access permission={ALL_PERMISSIONS.USERS.UPDATE} hideChildren>
            <EditOutlined
              style={{
                fontSize: 20,
                color: "#ffa500",
                cursor: "pointer",
              }}
              type=""
              // onClick={() => {
              //     setOpenModal(true);
              //     setDataInit(entity);
              // }}
            />
          </Access>

          <Access permission={ALL_PERMISSIONS.USERS.DELETE} hideChildren>
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa user"}
              description={"Bạn có chắc chắn muốn xóa user này ?"}
              //onConfirm={() => handleDeleteUser(entity._id)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer", margin: "0 10px" }}>
                <DeleteOutlined
                  style={{
                    fontSize: 20,
                    color: "#ff4d4f",
                  }}
                />
              </span>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <span>Manager Users</span>
        <Access permission={ALL_PERMISSIONS.USERS.CREATE}>
          <Button>Create User</Button>
        </Access>
      </div>
      <Access permission={ALL_PERMISSIONS.USERS.GET_PAGINATE}>
        <Table<DataType>
          pagination={{
            defaultPageSize: PAGE_SIZE,
            current: meta.current,
            total: meta.total,
            onChange: (event) => {
              setCurrentPage(event);
            },
          }}
          loading={isFetching}
          bordered
          dataSource={dataSource as any}
          columns={columns}
        />
      </Access>
    </>
  );
};

export default ManageUserPage;
