import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

import Layout from './Layout';
import { API_BASE_URL } from '../constants/config';
import { deviceTypes } from '../constants';
import AddDevice from './AddDevice';
import EditDevice from './EditDevice';
import DeleteDevice from './DeleteDevice';
import DeviceList from './DeviceList';
import {
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Grid,
  TextField,
  Button,
  Modal,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from '@mui/icons-material';

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const multiSelectOptions = Object.keys(deviceTypes).map((deviceKey) => ({
  label: deviceTypes[deviceKey],
  value: deviceKey,
}));

function Home() {
  const [allDevices, setAllDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [selectedDeviceTypes, setSelectedDeviceTypes] =
    useState(multiSelectOptions);
  const [selectedSortBy, setSelectedSortBy] = useState('SYSTEM_NAME');

  const [addDeviceModalIsOpen, setAddDeviceModalIsOpen] = useState(false);
  const [editDeviceModalIsOpen, setEditDeviceModalIsOpen] = useState(false);
  const [deleteDeviceModalIsOpen, setDeleteDeviceModalIsOpen] = useState(false);
  const [editDeviceId, setEditDeviceId] = useState(null);

  function openAddDeviceModal() {
    setAddDeviceModalIsOpen(true);
  }

  function closeAddDeviceModal(device) {
    setAddDeviceModalIsOpen(false);
    if (device) {
      getAllDevices();
    }
  }

  function openEditDeviceModal(device) {
    setEditDeviceId(device.id);
    setEditDeviceModalIsOpen(true);
  }

  function closeEditDeviceModal(device) {
    setEditDeviceModalIsOpen(false);
    setEditDeviceId(null);
    if (device) {
      getAllDevices();
    }
  }

  function openDeleteDeviceModal(device) {
    setEditDeviceId(device.id);
    setDeleteDeviceModalIsOpen(true);
  }

  function closeDeleteDeviceModal(device) {
    setDeleteDeviceModalIsOpen(false);
    setEditDeviceId(null);
    if (device) {
      getAllDevices();
    }
  }

  useEffect(() => {
    getAllDevices();
  }, []);
  useEffect(() => {
    setFilteredDevices(allDevices);
  }, [allDevices]);

  const doSorDevicestBySystemName = useCallback(() => {
    const newDevices = filteredDevices.slice().sort((a, b) => {
      return a.system_name.localeCompare(b.system_name);
    });
    if (JSON.stringify(newDevices) !== JSON.stringify(filteredDevices)) {
      setFilteredDevices(newDevices);
    }
  }, [filteredDevices]);

  const doSortDevicesByHddCapacity = useCallback(() => {
    const newDevices = filteredDevices.slice().sort((a, b) => {
      return parseInt(a.hdd_capacity) - parseInt(b.hdd_capacity);
    });
    if (JSON.stringify(newDevices) !== JSON.stringify(filteredDevices)) {
      setFilteredDevices(newDevices);
    }
  }, [filteredDevices]);

  useEffect(() => {
    if (selectedSortBy === 'SYSTEM_NAME') {
      doSorDevicestBySystemName();
    } else if (selectedSortBy === 'HDD_CAPACITY') {
      doSortDevicesByHddCapacity();
    }
  }, [
    selectedSortBy,
    allDevices,
    doSorDevicestBySystemName,
    doSortDevicesByHddCapacity,
  ]);

  const getAllDevices = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/devices`);
    setAllDevices(data);
  };

  const handleDeviceTypeChange = (e, selectedTypes) => {
    console.log(selectedTypes);
    setSelectedDeviceTypes(selectedTypes);

    const selectedTypesValues = selectedTypes.map((type) => type.value);

    const newDevices = allDevices.filter(
      (device) => selectedTypesValues.indexOf(device.type) >= 0
    );
    setFilteredDevices(newDevices);
  };
  const handleSortByChange = (e) => {
    const sortBy = e.target.value;
    setSelectedSortBy(sortBy);
  };

  return (
    <Layout>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Autocomplete
            fullWidth
            multiple
            size="small"
            id="device-types"
            onChange={handleDeviceTypeChange}
            options={multiSelectOptions}
            value={selectedDeviceTypes}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Device Types"
              />
            )}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              size="small"
              value={selectedSortBy}
              onChange={handleSortByChange}
              label="Sort By"
            >
              <MenuItem value={'SYSTEM_NAME'}>System Name</MenuItem>
              <MenuItem value={'HDD_CAPACITY'}>HDD Capacity</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={12}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={openAddDeviceModal}
          >
            Add Device
          </Button>
        </Grid>
      </Grid>
      {filteredDevices.length ? (
        <DeviceList
          currentPageCount={2}
          items={filteredDevices}
          onEditDevice={openEditDeviceModal}
          onDeleteDevice={openDeleteDeviceModal}
        />
      ) : (
        <Card margin="normal">
          <CardContent>
            <Typography variant="body1">No Devices</Typography>
          </CardContent>
        </Card>
      )}
      <Modal
        open={addDeviceModalIsOpen}
        onClose={() => closeAddDeviceModal(null)}
      >
        <Container style={modalStyles}>
          <Card>
            <CardContent>
              <AddDevice onDone={closeAddDeviceModal} />
            </CardContent>
          </Card>
        </Container>
      </Modal>

      <Modal
        open={editDeviceModalIsOpen}
        onClose={() => closeEditDeviceModal(null)}
      >
        <Container style={modalStyles}>
          <Card fullWidth>
            <CardContent>
              <EditDevice
                deviceId={editDeviceId}
                onDone={closeEditDeviceModal}
              />
            </CardContent>
          </Card>
        </Container>
      </Modal>

      <Modal
        open={deleteDeviceModalIsOpen}
        onClose={() => closeDeleteDeviceModal(null)}
      >
        <Container style={modalStyles}>
          <Card fullWidth>
            <CardContent>
              <DeleteDevice
                deviceId={editDeviceId}
                onDone={closeDeleteDeviceModal}
              />
            </CardContent>
          </Card>
        </Container>
      </Modal>
    </Layout>
  );
}

export default Home;
