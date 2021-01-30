import { Input } from 'antd'
import { useState } from 'react'

function Search({ onSearchHandler }) {
  const [value, setValue] = useState('')

  function searchHandler(value) {
    onSearchHandler(value)
    setValue('')
  }

  return (
    <Input.Search
      className="search-body"
      placeholder="Введите город"
      enterButton="Поиск"
      size="large"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={(value) => searchHandler(value)}
    />
  )
}

export default Search
