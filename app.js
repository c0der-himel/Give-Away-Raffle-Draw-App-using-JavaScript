window.onload = function () {
  const inputName = document.getElementById('input-name');
  const nameList = document.getElementById('name-list');
  const winner = document.getElementById('winner');
  const raffleDrawNames = document.getElementById('raffle-draw-names');
  const firstPosition = document.getElementById('first-position');
  const secondPosition = document.getElementById('second-position');
  const thirdPosition = document.getElementById('third-position');

  const participantsName = [];

  inputName.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      let newNames = event.target.value.split(',');
      if (newNames[0] !== '') {
        newNames.forEach((name) => {
          participantsName.push(name);
          let item = createListItem(name);
          nameList.appendChild(item);
          event.target.value = '';
        });
      }
    }
  });

  raffleDrawNames.addEventListener('click', function () {
    if (participantsName.length === 0) {
      alert('There is no entry');
    } else {
      let shuffleNames = shuffle(participantsName);
      for (let i = 0; i < shuffleNames.length; i++) {
        (function (i, count) {
          setTimeout(() => {
            let rand = Math.floor(Math.random() * shuffleNames.length);
            winner.innerHTML = shuffleNames[rand];

            if (count === shuffleNames.length - 1) {
              if (!firstPosition.innerHTML) {
                firstPosition.innerHTML = shuffleNames[rand];
                let index = participantsName.indexOf(shuffleNames[rand]);
                participantsName.splice(index, 1);
              } else if (!secondPosition.innerHTML) {
                secondPosition.innerHTML = shuffleNames[rand];
                let index = participantsName.indexOf(shuffleNames[rand]);
                participantsName.splice(index, 1);
              } else if (!thirdPosition.innerHTML) {
                thirdPosition.innerHTML = shuffleNames[rand];
                let index = participantsName.indexOf(shuffleNames[rand]);
                participantsName.splice(index, 1);
              } else {
                alert('Raffle Draw is Already Completed');
                raffleDrawNames.setAttribute('disabled', '');
              }
            }
          }, i);
        })(i * 100, i);
      }
    }
  });
};

function createListItem(name) {
  let li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = name;

  return li;
}

function shuffle(arr) {
  let shuffledArray = [...arr];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    let temp = shuffledArray[rand];
    shuffledArray[rand] = shuffledArray[i];
    shuffledArray[i] = temp;
  }

  return shuffledArray;
}
