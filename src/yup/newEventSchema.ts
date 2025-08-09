import * as Yup from 'yup';

export const newEventSchema = Yup.object({
  title: Yup.string()
    .required('Event title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),
  category: Yup.string().required('Please select a category'),
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Time is required'),
  duration: Yup.string().max(50, 'Duration must not exceed 50 characters'),
  location: Yup.string()
    .required('Location is required')
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must not exceed 100 characters'),
  address: Yup.string().max(200, 'Address must not exceed 200 characters'),
  maxAttendees: Yup.string()
    .required('Max attendees is required')
    .matches(/^\d+$/, 'Must be a valid number')
    .test('min-value', 'At least 1 attendee required', value => {
      const num = parseInt(value || '0', 10);
      return num >= 1;
    })
    .test('max-value', 'Cannot exceed 1000 attendees', value => {
      const num = parseInt(value || '0', 10);
      return num <= 1000;
    }),
  price: Yup.string().when('isFree', {
    is: false,
    then: schema =>
      schema
        .required('Price is required for paid events')
        .matches(/^\d+(\.\d{1,2})?$/, 'Must be a valid price'),
    otherwise: schema => schema,
  }),
  isFree: Yup.boolean(),
  isPublic: Yup.boolean(),
  tags: Yup.string().max(200, 'Tags must not exceed 200 characters'),
  requirements: Yup.string().max(
    300,
    'Requirements must not exceed 300 characters',
  ),
});

export const newEventInitialValues = {
  title: '',
  description: '',
  category: '',
  date: '',
  time: '',
  duration: '',
  location: '',
  address: '',
  maxAttendees: '',
  price: '',
  isFree: true,
  isPublic: true,
  tags: '',
  requirements: '',
};
