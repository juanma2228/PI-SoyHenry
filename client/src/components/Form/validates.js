export default function validate(input) {

  let errors = {};

  const regExOnlyLet = /^[a-zñA-ZÑ\s]*$/;
  const regExOnlyNum = /^[0-9]+$/;


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
  } /* else if (!regExOnlyNum.test(input.difficulty)) {
    errors.difficulty = 'Difficulty is invalid';
  } */
  if (!input.countryID) {
    errors.countryID = 'Country is required';
  } /* else if (!regExOnlyLet.test(input.season)) {
    errors.season = 'Season is invalid';
  } */

  return errors;
};
