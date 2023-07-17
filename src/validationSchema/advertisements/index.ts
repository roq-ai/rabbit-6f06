import * as yup from 'yup';

export const advertisementValidationSchema = yup.object().shape({
  content_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
