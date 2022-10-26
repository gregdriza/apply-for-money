import Input from '@mui/material/Input';

export const FormInput = ({name, onChange, value}) => {
  return(<div>
    <Input style={{width: '50%'}} placeholder={name} required={true} onChange={onChange} value={value} />
  </div>)
};
