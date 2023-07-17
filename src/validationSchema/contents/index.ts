import * as yup from 'yup';

export const contentValidationSchema = yup.object().shape({
  video: yup.string(),
  picture: yup.string(),
  user_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
