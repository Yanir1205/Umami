import React from 'react';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { Autocomplete } from 'react-select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export const MealForm = props => {
  const {
    values: { title, description, imgUrl },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
  } = props;
console.log(props);

  // onChange = (newValue, actionMeta) => {
  //   console.group('Value Changed');
  //   console.log(newValue);
  //   console.log(`action: ${actionMeta.action}`);
  //   console.groupEnd();
  // };

  const onChange = ev => {
    ev.persist();
    handleChange(ev);
    setFieldTouched(ev.target.name, true, false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name='title' helperText={touched.title ? errors.title : ''} error={Boolean(errors.title)} label='Title' value={title} onChange={onChange} fullWidth />
      {/* <div>{Boolean(errors.name) ? errors.name : ''}</div> */}
      <TextField name='description' helperText={touched.description ? errors.description : ''} error={Boolean(errors.description)} label='Description' fullWidth value={description} onChange={onChange} />
      {/* <div>{Boolean(errors.email) ? errors.email : ''}</div> */}
      <TextField name='imgUrl' helperText={touched.imgUrl ? errors.imgUrl : ''} error={Boolean(errors.imgUrl)} label='Image Url' fullWidth type='text' value={imgUrl} onChange={onChange} />
      {/* <CreatableSelect isMulti onChange={this.handleChange} options={colourOptions}/> */}
      {/* <Field required name="eventDate" component={DatePicker} label="Event date" format="dd/MM/yyyy"  /> */}
      <Button type='submit' fullWidth color='primary' disabled={!isValid}>
        Submit
      </Button>
    </form>
  );
};
