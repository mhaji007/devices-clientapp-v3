import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { API_BASE_URL } from '../constants/config';
import { Button, ButtonGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';

function DeleteDevice({ deviceId, onDone }) {
  const [device, setDevice] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_BASE_URL}/devices/${deviceId}`);
      setDevice(data);
    })();
  }, [deviceId]);

  const handleDeviceDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}/devices/${deviceId}`
      );
      if (!data) {
        throw new Error('Error deleting device');
      }
      onDone(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout>
      <Typography variant="h6">Delete Device</Typography>
      {device && (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1">
            Are you sure you want to delete{' '}
            <strong>{device.system_name}</strong> device?
          </Typography>

          <ButtonGroup>
            <Button
              variant="contained"
              onClick={handleDeviceDelete}
              color="error"
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={() => onDone()}>
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      )}
    </Layout>
  );
}

export default DeleteDevice;
