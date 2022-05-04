import { FC, useEffect } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import pink from '@mui/material/colors/pink';
import { LoadingButton } from '@mui/lab';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';

import { UserInfo } from '../Users';
import { FormInputFile } from '../HookForms/FormInputFile';
import { ImagePreview } from '../Images/ImagePreview';
import { Modal } from './Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<any>;
  isLoading?: boolean;
  title: string;
  resolver?: Resolver<any, any>;
};

export const UploadFileModal: FC<Props> = ({
  open,
  onClose,
  onSubmit,
  isLoading = false,
  title,
  resolver,
}) => {
  const defaultValues = { file: undefined };

  const methods = useForm<any>({
    defaultValues,
    resolver,
    mode: 'onChange',
  });

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (errors?.file) {
      toast.error(`🦄 ${errors.file.message}!`);
    }
    resetField('file');
  }, [errors?.file, resetField]);

  useEffect(() => {
    if (open) resetField('file');
  }, [open, resetField]);

  return (
    <Modal
      formId="uploadFileForm"
      isLoading={isLoading}
      buttonText="Upload"
      title={title}
      onClose={onClose}
      open={open}
    >
      <Box sx={styles.formContainer}>
        {watch('file') && watch('file').length > 0 && (
          <Box sx={{ maxHeight: '320px', maxWidth: '320px' }}>
            <ImagePreview url={URL.createObjectURL(watch('file')[0])} />
          </Box>
        )}

        <form id="uploadFileForm" onSubmit={handleSubmit(onSubmit)}>
          <FormInputFile
            uploadButton={
              <IconButton color="primary" component="span" size="large">
                <PhotoCameraOutlinedIcon />
              </IconButton>
            }
            control={control}
            name="file"
          />
        </form>
      </Box>
    </Modal>
  );
};

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    mt: 2,
  },
};
