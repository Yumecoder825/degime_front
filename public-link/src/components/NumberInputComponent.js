import React, { useState } from 'react';
import { TERipple } from 'tw-elements-react';
import AuthCode from 'react-auth-code-input';
import axios from 'axios';
import { myConfig } from '../utilities/config';
import { toast } from 'react-toastify';


const NumberInputComponent = ({email, isForgotten, isSuccessful}) => {
  const [result, setResult] = useState();
  const handleOnChange = (res) => {
    setResult(res);
  };
  const handleSubmit = async ()=>{
    try {
      const response = await axios.post(
        `${myConfig.apiUrl}/account/${isForgotten ? "validate_code" : "register/validate"}`,
        {email:email, vcode:result}
      );
      toast.success("Successfully verified!");
      isSuccessful(true);
      localStorage.setItem('token', response.data.token);
      console.log(response.data);
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  }
  return (
    <div>
      <div className='verifyInput w-full gap-x-3 p-3'>
        <AuthCode allowedCharacters="numeric" onChange={handleOnChange}/>
      </div>
      <div className='flex justify-center mt-10 mb-5' >
        <TERipple>
          <button type="button" className='px-5 py-2 rounded-full bg-green-500 cursor-pointer text-white' onClick={handleSubmit}>確 認</button>
        </TERipple>
      </div>
    </div>
  );
};

export default NumberInputComponent;