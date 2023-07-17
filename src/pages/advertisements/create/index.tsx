import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createAdvertisement } from 'apiSdk/advertisements';
import { Error } from 'components/error';
import { advertisementValidationSchema } from 'validationSchema/advertisements';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ContentInterface } from 'interfaces/content';
import { UserInterface } from 'interfaces/user';
import { getContents } from 'apiSdk/contents';
import { getUsers } from 'apiSdk/users';
import { AdvertisementInterface } from 'interfaces/advertisement';

function AdvertisementCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AdvertisementInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAdvertisement(values);
      resetForm();
      router.push('/advertisements');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AdvertisementInterface>({
    initialValues: {
      content_id: (router.query.content_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: advertisementValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Advertisement
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<ContentInterface>
            formik={formik}
            name={'content_id'}
            label={'Select Content'}
            placeholder={'Select Content'}
            fetcher={getContents}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.video}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'advertisement',
    operation: AccessOperationEnum.CREATE,
  }),
)(AdvertisementCreatePage);
