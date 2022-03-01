import { getMouseEventOptions } from '@testing-library/user-event/dist/utils'
import './styles.css'

export function TextInput({searchValue, handleChange}){
  return(
    <input 
    className='text-input'
    onChange={handleChange}
    value={searchValue}
    type='search'
    placeholder="Type your search"
    />
  )
}
