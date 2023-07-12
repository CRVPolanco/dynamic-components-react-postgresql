const Button = ({ title, clickEvent }) => {

  return (
    <div className="Button__container">
      <button onClick={clickEvent}>{title}</button>
    </div>
  )
}

export default Button;
