const Maintenance_card_users = ({ handleSelect }) => {

  return (
    <article className='DialogCard' onClick={() => handleSelect('Maintenance_dialog_users')}>
      <h3>Users</h3>
    </article>
  )
}

export default Maintenance_card_users;
