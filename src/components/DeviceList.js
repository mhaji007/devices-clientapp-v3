import React, { useEffect, useState } from 'react';
import {
  Delete as DeleteIcon,
  ModeEdit as ModeEditIcon,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  Pagination,
  Typography,
} from '@mui/material';
import { deviceTypes } from '../constants';

const itemsPerPage = 5;

function DeviceList({ items, onEditDevice, onDeleteDevice }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [items, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event, page) => {
    page = page - 1;
    console.log(page);
    const newOffset = (page * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${page}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const renderDevice = (device) => (
    <>
      <ListItem component={Card}>
        <CardContent style={{ padding: '0.5rem' }}>
          <Box style={{ position: 'absolute', right: '0.5rem' }}>
            <IconButton
              aria-label="delete"
              onClick={() => onDeleteDevice(device)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="edit" onClick={() => onEditDevice(device)}>
              <ModeEditIcon />
            </IconButton>
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight="fontWeightBold"
              gutterBottom
            >
              {device.system_name}
            </Typography>
            <Typography variant="body1" gutterBottom color="primary">
              {deviceTypes[device.type]}
            </Typography>
            <Typography variant="body1">{device.hdd_capacity} GB</Typography>
          </Box>
        </CardContent>
      </ListItem>
      <Divider />
    </>
  );

  return (
    <Box>
      {currentItems && (
        <List>
          {currentItems.map((item) => (
            <React.Fragment key={item.id}>{renderDevice(item)}</React.Fragment>
          ))}
        </List>
      )}

      <Pagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        onChange={handlePageClick}
      />
    </Box>
  );
}

export default DeviceList;
