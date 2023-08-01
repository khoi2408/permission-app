import { Button, Checkbox, IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
import ConfirmDialog from 'src/components/confirm-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';

type rowProps = {
  data: any;
  tableHead: any[];
  index: number;
  name: string;
  handleClick: VoidFunction;
  selected?: boolean | number;
  onSelectRow?: () => void;
  handleEditRow: () => void;
};

export default function UserGroupRow({
  data,
  tableHead,
  index,
  name,
  handleClick,
  selected,
  onSelectRow,
  handleEditRow,
}: rowProps) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const newRow = tableHead.map((title, index) => title.id);
  const popover = usePopover();
  const confirm = useBoolean();
  // ==============================================================================================================
  const renderRow = (item: string, key: number) => {
    if (item === 'Name') {
      return (
        <TableCell key={key} align="left">
          {data[item]}
        </TableCell>
      );
    }
    if (item === 'Email') {
      return (
        <TableCell key={key} align="left">
          {data[item]}
        </TableCell>
      );
    }
    if (item === 'Type') {
      return (
        <TableCell key={key} align="center">
          {data[item]}
        </TableCell>
      );
    }
    if (item === 'Active') {
      return (
        <TableCell key={key} align="center">
          <Checkbox checked={data[item]} />
        </TableCell>
      );
    }
    if (item === '') {
      return (
        <TableCell key={key} align="right">
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      );
    }

    return (
      <TableCell key={key} align="center">
        {data[item]}
      </TableCell>
    );
  };

  return (
    <>
      <TableRow
        hover
        selected={selected !== -1}
        onClick={(e: any) => {
          if (e?.target?.type === 'checkbox') return;
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          handleClick && handleClick();
        }}
        sx={{
          cursor: 'pointer',
          '& .MuiSvgIcon-root': {
            width: '20px',
          },

          '& td': {
            borderRight: '0 !important',
          },
        }}
      >
        <TableCell sx={{ padding: '0px !important', textAlign: 'center' }}>
          <Checkbox checked={selected !== -1} onChange={onSelectRow} value={data?.Id} />
        </TableCell>
        {/* eslint-disable-next-line @typescript-eslint/no-shadow  */}
        {newRow.map((item: any, index) => renderRow(item, index))}
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleEditRow()
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              console.log('delete');
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
