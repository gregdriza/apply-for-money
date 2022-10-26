import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormInput } from './inputs';
import * as api from './api.js';

export default function Form({ status, setStatus }) {
 const { control, handleSubmit, formState: { errors } } = useForm({
  defaultValues: {
    nameFirst: '',
    nameLast: '',
    addressLine1: '',
    addressLine2: '',
    addressCity: '',
    addressState: '',
    addressPostalCode: '',
    addressCountryCode: '',
    documentSsn: '',
    emailAddress: '',
    birthDate: '',
  }
 });

 const evaluateUser = (data) => {
    const resp = api.evaluateUser({...data}).then(resp => {
    const { summary, supplied, details } = resp

    setStatus((stat) => ({
      status: summary || {},
      manualReviewData: [...stat.manualReviewData, supplied],
      errors: details || {}
    }))
  })
};

 return (
   <div style={{width: '100%'}}>
     <form onSubmit={handleSubmit((data) => evaluateUser(data))}>
      <Controller
        name='nameFirst'
        control={control}
        render={({field}) => <FormInput {...field} name='First Name' />
        } 
      /> 
      <Controller
        name='nameLast'
        control={control}
        render={({field}) => <FormInput {...field} name='Last Name' />
        } 
      /> 
      <Controller
        name='addressLine1'
        control={control}
        render={({field}) => <FormInput {...field} name='Address Line 1'/>
        } 
      />
      <Controller
        name='addressLine2'
        control={control}
        render={({field}) => <FormInput {...field}  name='Address Line 2'/>
        } 
      />
      <Controller
        name='addressCity'
        control={control}
        render={({field}) => <FormInput {...field} name='City'/>
        } 
      />
      <Controller
        name='addressState'
        control={control}
        render={({field}) => <FormInput {...field} name='State'/>
        } 
      />
      <Controller
        name='addressPostalCode'
        control={control}
        render={({field}) => <FormInput {...field} name='Zip Code'/>
        } 
      />
      <Controller
        name='addressCountryCode'
        control={control}
        render={({field}) => <FormInput {...field} name='Country'/>
        } 
      />  
      <Controller
        name='documentSsn'
        control={control}
        render={({field}) => <FormInput {...field} name='Social Security Number'/>
        } 
      />
      <Controller
        name='emailAddress'
        control={control}
        render={({field}) => <FormInput {...field} name='Email Address'/>
        } 
      />   
      <Controller
        name='birthDate'
        control={control}
        render={({field}) => <FormInput {...field} name='Birth Date - YYYY-MM-DD'/>
        } 
      />    
      <input type="submit" />
    </form>
   </div>
 );
}
