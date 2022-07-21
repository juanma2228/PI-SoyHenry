export default function validate(input) {

  let errors = {};

  const regExOnlyLet = /^[a-zñA-ZÑ\s]{2,255}$/;
  const regExOnlyNum = /^[0-9]{1,5}$/;


  if (!input.name) {
    errors.name = 'Name is required';
  } else if (!regExOnlyLet.test(input.name)) {
    errors.name = 'Name is invalid';
  } else if (input.name.startsWith(' ')) {
    errors.name = 'Name is invalid';
  } else if (input.name.endsWith(' ')) {
    errors.name = 'Name is invalid';
  }
  if (!input.duration) {
    errors.duration = 'Duration is required';
  } else if (!regExOnlyNum.test(input.duration)) {
    errors.duration = 'Duration is invalid';
  }
  if (!input.difficulty) {
    errors.difficulty = 'Difficulty is required';
  }
  if (!input.season) {
    errors.season = 'Season is required';
  } 
  if (!input.countryID) {
    errors.countryID = 'Country is required';
  }
  
  return errors;
};
