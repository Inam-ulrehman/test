import { useLoadScript } from '@react-google-maps/api'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import { useRef } from 'react'
import styled from 'styled-components'
import FormInput from '@/app/components/singlecomponents/FormInput'
import { Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getStateAddress, getStateValues } from '@/features/users/usersSlice'

// This is outcome from address

const libraries = ['places']

const GooglePlacesHook = () => {
  // Load your script first
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // library is must
    libraries,
  })

  if (!isLoaded) {
    return (
      <div>
        {/* name input */}
        <FormInput label={'Loading Map...'} name={'name'} />
      </div>
    )
  }
  return (
    <>
      <div className='places-container'>
        <PlacesAutocomplete />
      </div>
    </>
  )
}
// We have this approach because this component must load after isLoaded useLoadScript
const PlacesAutocomplete = ({ state, setState }) => {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state)
  const inputWithRef = useRef()
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      componentRestrictions: { country: ['ca'] },
    },
    debounce: 300,
  })

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    // getGeocode({ address }).then((results) => {
    //   const { lat, lng } = getLatLng(results[0])
    //   console.log('📍 Coordinates: ', { lat, lng })
    // })
    const results = await getGeocode({ address })
    const { lat, lng } = getLatLng(results[0])
    const location = {
      type: 'Point',
      coordinates: [lng, lat],
    }

    // This code below is only get useful values and put in state it has nothing to do with functionality.
    // state code=======Start
    const addressDetails = results[0]
    const { address_components } = addressDetails
    const length = address_components.length
    const startLength = address_components.length - 5
    // We Slice because last 5 values are important also some times array is not returning same values.
    const lastAddress = address_components.slice(startLength, length)

    const stateValues = {
      house: address_components[0]?.long_name,
      street: address_components[1]?.long_name,
      city: lastAddress[0]?.long_name,
      region: lastAddress[1]?.long_name,
      province: lastAddress[2]?.long_name,
      country: lastAddress[3]?.long_name,
      postalCode: lastAddress[4]?.long_name,
      location: location,
    }

    dispatch(getStateAddress(stateValues))
  }
  // state code=======End
  return (
    <Wrapper>
      <label className='form-label' htmlFor='address'>
        Search your address
      </label>
      <Input
        ref={inputWithRef}
        type='text'
        value={value?.target?.input}
        onChange={(e) => setValue(e.target.value)}
        className='form-input'
        placeholder='search here'
        disabled={!ready}
        size='large'
      />
      {status === 'OK' && (
        <ul style={{ width: `${inputWithRef.current.clientWidth}px` }}>
          {data.map((item, index) => {
            return (
              <li key={index} onClick={() => handleSelect(item.description)}>
                {item.description}
              </li>
            )
          })}
        </ul>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  input {
    position: relative;
    border: 1px solid var(--gray-5);
  }

  ul {
    position: absolute;
    background-color: var(--white);
    margin: 0;
    box-shadow: var(--shadow-2);
    z-index: 10;
    li {
      padding: 5px 10px;

      :hover {
        cursor: pointer;
        background-color: var(--gray-3);
      }
    }
  }
`

export default GooglePlacesHook
