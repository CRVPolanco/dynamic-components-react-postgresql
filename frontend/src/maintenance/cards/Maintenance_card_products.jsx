const Maintenance_card_products = ({ handleSelect }) => {

  return (
    <article className='DialogCard' onClick={() => handleSelect('Maintenance_dialog_products')}>
      <h3>Products</h3>
    </article>
  )
}

export default Maintenance_card_products;
