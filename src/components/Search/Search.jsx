import { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

function Search({ onSearchHandler }) {
  const [value, setValue] = useState('')

  function changeValue(newValue = '') {
    setValue(newValue)
  }

  function formSubmit() {
    onSearchHandler(value)
    changeValue()
  }

  return (
    <InputGroup className="mb-3">
      <FormControl
        required
        placeholder="City..."
        aria-label="City..."
        aria-describedby="basic-addon2"
        onChange={(e) => changeValue(e.target.value)}
        value={value}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={formSubmit}>
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  )
}

export default Search
