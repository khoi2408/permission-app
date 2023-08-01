import {
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from '@mui/material';
import { useCallback, useState } from 'react';
import ConfirmDialog from 'src/components/confirm-dialog';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedAction,
  useTable,
  emptyRows,
} from 'src/components/table';
import UserGroupDialog from './UserGroupDialog';
import UserGroupRow from './UserGroupRow';
import UserGroupToolbar from './UserGroupToolbar';

const TABLE_HEAD = [
  { id: 'Name', label: 'Name', minWidth: 200, align: 'left' },
  { id: 'Email', label: 'Email', minWidth: 200, align: 'left' },
  { id: 'Type', label: 'Type', align: 'center' },
  { id: 'Active', label: 'Active', align: 'center' },
  { id: '', width: 60 },
];

const userGroupList = [
  {
    id: '1003128423',
    Name: 'Lê Văn A',
    Email: 'levana@gmail.com',
    Type: 'User',
    Active: true,
  },
  {
    id: '2003128424',
    Name: 'Nguười dùng',
    Email: '',
    Type: 'Group',
    Active: true,
  },
];

export default function UserGroupList() {
  const { dense } = useTable();
  // ==================================================== PAGINATION =============================================
  type paginationType = {
    pageSize: number;
    pageIndex: number;
  };
  const [pagination, setPagination] = useState<paginationType>(() => ({
    pageIndex: 0,
    pageSize: 5,
  }));

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPagination((prev) => ({ ...prev, pageIndex: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination({ pageIndex: 0, pageSize: Number(event.target.value) });
  };
  // eslint-disable-next-line no-unsafe-optional-chaining
  let indexProject = pagination?.pageIndex * pagination?.pageSize;

  // ==================================================== CHECKBOX==============================================
  const [selectedList, setSelectedList] = useState<string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds: any | undefined = userGroupList?.map((n: any) => n.id);
      setSelectedList(newSelecteds);
      return;
    }
    setSelectedList([]);
  };

  const handleSelected = (selectedID: any) => {
    const findIndex = selectedList.indexOf(selectedID);
    if (findIndex === -1) {
      setSelectedList([...selectedList, selectedID]);
    } else {
      setSelectedList((prev: any) => {
        const newList = [...prev];
        newList.splice(findIndex, 1);
        return newList;
      });
    }
  };

  const checkIsSelected = (selectedID: string) => selectedList.indexOf(selectedID);
  // ==================================================== MODAL =============================================
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const [updateData, setUpdateData] = useState<any | undefined>(undefined);
  const handleCloseDialog = useCallback(() => {
    setUpdateData(undefined);
  }, []);
  const handleEditRow = (data: any) => {
    setUpdateData(data);
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ padding: '0 !important', mb: 3 }}>
        <UserGroupToolbar selectedList={selectedList}/>
        <Scrollbar sx={{ position: 'relative', padding: '0px 10px' }}>
          <TableContainer
            sx={{
              display: 'flex',
              maxHeight: '430px',
              overflowY: 'overlay',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
            }}
          >
            <TableSelectedAction
              rowCount={userGroupList?.length}
              numSelected={selectedList?.length}
              onSelectAllRows={handleSelectAllClick}
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary">
                    <Iconify icon="eva:trash-2-outline" onClick={handleOpenConfirm} />
                  </IconButton>
                </Tooltip>
              }
            />
            <Table size={dense ? 'small' : 'medium'} stickyHeader aria-label="sticky table">
              {/* table_head */}
              <TableHeadCustom
                headLabel={TABLE_HEAD}
                onSelectAllClick={handleSelectAllClick}
                rowCount={userGroupList.length}
                numSelected={selectedList.length}
              />
              {/* body table */}
              <TableBody>
                {userGroupList &&
                  // eslint-disable-next-line no-return-assign
                  userGroupList.map((user: any) => (
                    <UserGroupRow
                      key={user.id}
                      name={user.Name}
                      data={user}
                      tableHead={TABLE_HEAD}
                      index={(indexProject += 1)}
                      handleClick={() => {}}
                      // checkbox
                      selected={checkIsSelected(user?.id)}
                      onSelectRow={() => handleSelected(user?.id)}
                      // handle
                      handleEditRow={() => handleEditRow(user)}
                      //   handleChange={handleChange}
                      //   removeUserGroup={() => removeUserGroup(user?.id)}
                    />
                  ))}
                <TableEmptyRows
                  emptyRows={emptyRows(
                    Number(pagination.pageIndex),
                    Number(pagination.pageSize),
                    5
                  )}
                />
                <TableNoData isNotFound={userGroupList?.length === 0 || userGroupList === null} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Container>
      <UserGroupDialog dataUserGroup={updateData} onClose={handleCloseDialog} type={updateData?.Type} />
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selectedList.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
