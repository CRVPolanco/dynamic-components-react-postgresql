const Maintenance_card_clients = ({ handleSelect }) => {

  return (
    <article className='DialogCard' onClick={() => handleSelect('Maintenance_dialog_clients')}>
      <h3>Clients</h3>
    </article>
  )
}

export default Maintenance_card_clients;
