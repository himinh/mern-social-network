import { Box, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormInputText } from 'components/Common';
import { passwordSchema } from 'validations';
import { PasswordData } from 'interface';
import { styles } from './styles';
import { useEffect } from 'react';
import { storage } from 'utils';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPassword } from 'RQhooks';

const defaultValues: PasswordData = {
  password: '',
};

export const ResetPassword = () => {
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(passwordSchema),
  });

  const { mutateAsync } = useResetPassword();
  const { reset_token } = useParams();

  // const token = storage.getToken();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PasswordData> = async ({ password }) => {
    if (!!reset_token) {
      await mutateAsync({ password, reset_token });
      navigate('/', { replace: true });
    }
  };

  // useEffect(() => {
  //   if (!!token) navigate('/', { replace: true });
  // }, [token, navigate]);

  return (
    <Box sx={{ background: '#36393f', borderRadius: 2, p: 4, color: 'white' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Typography variant="h5" fontWeight="600" component="h3" align="center">
            Reset Password
          </Typography>
        </Box>

        <Box mb={3}>
          <FormInputText
            label="Password"
            name="password"
            autoFocus={true}
            type="password"
            control={control}
          />
        </Box>

        <Button variant="contained" fullWidth type="submit" sx={styles.button}>
          Reset
        </Button>
      </form>
    </Box>
  );
};
