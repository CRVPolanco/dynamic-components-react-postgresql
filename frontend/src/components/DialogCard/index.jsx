const DialogCard = ({ handleSelect }) => {

  return (
    <article onClick={() => handleSelect('MaintenanceDialog_users')} className='DialogCard'>
      <h3>Table Name</h3>
    </article>
  );
}

export default DialogCard;
