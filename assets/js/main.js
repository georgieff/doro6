window.onload = () => {
  let blocked = false;
  const button = document.getElementById('doro-opener');
  button.classList.remove('-hidden');

  const openDoor = () => {
    if (blocked) return false;
    button.classList.add('-loading');
    blocked = true;

    axios.post('/api/doro6', {
      firstName: 'Fred',
      lastName: 'Flintstone',
      })
      .then((response) => {
        if (response.data.error) {
          button.classList.add('-error');
        }
      })
      .catch((error) => {
      }).then(() => {
        blocked = false;
        button.classList.remove('-loading');
      });
    };

  button.addEventListener('click', openDoor);
};
