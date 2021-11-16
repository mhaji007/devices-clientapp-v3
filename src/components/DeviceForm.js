import React, { useEffect } from 'react';
import { deviceTypes } from '../constants';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';

function DeviceForm({ onSubmit, onClose, device = null }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(device);
  }, [device]);

  const _handleSubmit = (values) => {
    const { systemName, type, hddCapacity } = values;
    onSubmit({
      id: device ? device.id : '',
      system_name: systemName,
      type: type,
      hdd_capacity: hddCapacity,
    });
  };

  const handleClose = () => {
    onClose();
  };

  const renderDeviceTypeOptions = () =>
    Object.keys(deviceTypes).map((deviceTypeKey) => (
      <MenuItem key={deviceTypeKey} value={deviceTypeKey}>
        {deviceTypes[deviceTypeKey]}
      </MenuItem>
    ));
  return (
    <form onSubmit={handleSubmit(_handleSubmit)}>
      <Box style={{ display: 'flex', flexDirection: 'column' }}>
        <FormControl margin="normal">
          <TextField
            fullWidth
            id="system-name-text"
            label="System Name"
            size="small"
            defaultValue={device ? device.system_name : ''}
            {...register('systemName', {
              required: 'Syetem name is required.',
            })}
            error={Boolean(errors.systemName)}
            helperText={errors.systemName?.message}
          />
        </FormControl>

        <FormControl margin="normal">
          <InputLabel
            size="small"
            id="type-select-label"
            error={Boolean(errors.type)}
          >
            Type
          </InputLabel>
          <Select
            fullWidth
            labelId="type-select-label"
            id="type-select"
            label="Type"
            size="small"
            defaultValue={device ? device.type : ''}
            {...register('type', { required: 'Type is required.' })}
            error={Boolean(errors.type)}
          >
            {renderDeviceTypeOptions()}
          </Select>
          {errors.type?.message && (
            <FormHelperText error={Boolean(errors.type)}>
              {errors.type.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl margin="normal">
          <TextField
            fullWidth
            id="system-name-text"
            label="HDD Capacity (GB)"
            size="small"
            defaultValue={device ? device.hdd_capacity : ''}
            {...register('hddCapacity', {
              validate: {
                positive: (value) =>
                  parseInt(value) > 0 || 'Must be a positive number.',
              },
            })}
            error={Boolean(errors.hddCapacity)}
            helperText={errors.hddCapacity?.message}
          />
        </FormControl>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonGroup>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Button variant="outlined" onClick={handleClose} type="reset">
            Close
          </Button>
        </ButtonGroup>
      </Box>
    </form>
  );
}

export default DeviceForm;
