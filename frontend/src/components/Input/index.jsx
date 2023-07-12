const Input = ({ value, setValue, placeholder }) => {

  const handleChange = (data) => setValue(data);

  return (
    <div className="Input__container">
      <input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
      />
      <span onClick={() => handleChange('')}>X</span>
    </div>
  )
}

export default Input;
