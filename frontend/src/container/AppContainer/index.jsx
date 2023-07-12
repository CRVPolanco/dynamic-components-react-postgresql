import { useState, useEffect } from 'react';
import '../../styles/AppContainer.css';

export const AppContainer = () => {

  const [cardDialogList, setCardDialogList] = useState([]);

  const [cardComponents, setCardComponents] = useState([]);
  const [dialogComponent, setDialogComponent] = useState([]);

  const [selectedDialog, setSelectedDialog] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(!open);
  const handleSelectDialog = (selected) => setSelectedDialog([selected]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://192.168.1.113:3000/api/global/catalog-dialogs', {
        method: 'GET',
      });
      const data = await response.json();
      const { cards } = data;

      setCardDialogList([...cards]);
    }
    getData();
  }, []);

  useEffect(() => {
    const chargeCards = async () => {
      if(!cardDialogList.length) return;
      const componentPromises = cardDialogList.map((component) =>
        import(`../../maintenance/cards/${component}.jsx`).then(module => module.default)
      );
      const components = await Promise.all(componentPromises);

      setCardComponents(components);
    }
    chargeCards();
  }, [cardDialogList]);

  useEffect(() => {
    const chargeDialog = async () => {

      if(selectedDialog === null) return;

      const componentPromise = await import(`../../maintenance/dialogs/${selectedDialog}.jsx`)
        .then(module => module.default);

      setDialogComponent([componentPromise]);
    }
    chargeDialog();
  }, [selectedDialog]);

  return (
    <section className="AppContainer">
      <nav className="AppContainer--opts">
        <div className="opts--left">
          <ul>
            <li><button>New table</button></li>
            <li><button>Edit table</button></li>
            <li><button>Delete table</button></li>
          </ul>
        </div>
        <div className="opts--right">
          <button onClick={handleOpenDialog}>X</button>
        </div>
      </nav>
      <main className="AppContainer--main">
        <section className='main__dialog-list'>
          <div className='list__dialog-container'>
            {cardComponents.map((CardComponent, index) => (
                <CardComponent
                  handleSelect={handleSelectDialog}
                  key={`card-component--${index+1}`}
                />
              )
            )}
          </div>
        </section>
        <section className="main__dialog-data">
          { selectedDialog && !!dialogComponent.length && dialogComponent.map((DialogComponent, index) => (
            <DialogComponent key={`dialog-component--${index}`} />
          )) }
        </section>
      </main>
    </section>
  )
}
