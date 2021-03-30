'use strict';

// write your code here

const phonesUrl = 'https://mate-academy.github.io/phone-catalogue-static/api';

const options = {
  method: 'GET',
};

const listOfPhones = document.createElement('ul');

const getPhones = () => {
  return new Promise((resolve, reject) => {
    fetch(`${phonesUrl}/phones.json`, options)
      .then(response => {
        return response.json();
      })
      .then(result => {
        resolve(result);
      });

    setTimeout(() => {
      reject(new Error());
    }, 5000);
  });
};

const createListOfPhones = (data) => {
  listOfPhones.insertAdjacentHTML('afterbegin', `
     ${data.map(phone => phone.name).map(item => `<li>${item}</li>`).join(' ')}
   `);

  document.body.append(listOfPhones);

  return data;
};

const getPhonesDetails = (list) => {
  const fetchedList = list.map(phone => phone.id)
    .map(id => fetch(`${phonesUrl}/phones/${id}.json`));

  return Promise.all(fetchedList);
};

getPhones()
  .then(createListOfPhones)
  .then(getPhonesDetails)
  .catch(error => {
    alert(error);
  });
