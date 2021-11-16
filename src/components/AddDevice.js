import React from 'react';
import axios from 'axios';
import DeviceForm from './DeviceForm';
import { API_BASE_URL } from '../constants/config';
import Layout from './Layout';
import { Typography } from '@mui/material';

function AddDevice({ onDone }) {
  const handleDeviceAdd = async (device) => {
    delete device.id;

    try {
      const { data } = await axios.post(`${API_BASE_URL}/devices`, device);
      if (!data) {
        throw new Error('Error adding device');
      }
    } catch (error) {}
  };
  return (
    <Layout>
      <Typography variant="h6">Edit Device</Typography>

      <DeviceForm
        onSubmit={async (device) => {
          await handleDeviceAdd(device);
          onDone(device);
        }}
        onClose={onDone}
      />
    </Layout>
  );
}

export default AddDevice;
