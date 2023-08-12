// Save input values to local storage
const saveButtons = document.querySelectorAll('button[id^="saveButton"], button[id^="mealSaveButton"], button[id^="exerciseSaveButton"], button[id^="timeSaveButton"]');
saveButtons.forEach(button => {
  button.addEventListener('click', () => {
    const inputId = button.previousElementSibling.id;
    const inputValue = button.previousElementSibling.value;
    localStorage.setItem(inputId, inputValue);
  });
});

// Load saved input values from local storage
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
  const savedValue = localStorage.getItem(input.id);
  if (savedValue) {
    input.value = savedValue;
  }
});