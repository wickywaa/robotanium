import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
        
import React, { useEffect } from 'react';
import { Type, TypeFlags } from 'typescript';
import { types } from 'util';


  // eslint-disable-next-line no-empty-pattern
  export const Filters = <T, k extends keyof T>(obj: T, keys: k[], Change:({}:T)=>void ) => {

    useEffect(()=>{
      const newclass = new class<T>  {}
    })
    
    return (
      <div>
        {
          keys.map((filter, key)=>{

            // eslint-disable-next-line no-lone-blocks
            { if (typeof obj[filter] === 'boolean')
              return(
                <div>
                <label>{`${filter.toString()}`}</label>
                <InputSwitch checked={obj[filter]} onChange={(e) => Change({...obj, filter:e.checked})} />
                </div>
              )  

              if(typeof obj[filter] === 'string') {
                 return (<InputText  
                  placeholder={`${filter.toString()}`}
                  key={key} 
                  onChange={(e) => Change({...obj, filter:e.target.value})}
                  value={obj[filter]}
                  />
                 )
              }
          
          }

          })
        }
      </div>
    )
  };