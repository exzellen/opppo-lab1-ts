document.body.innerHTML = 
  '<textarea id="text" cols="30" rows="10"></textarea>'+
  '<input id="btn" type="button" value="Создать объекты" style="height: 50px;">'+
  '<textarea id="out" cols="30" rows="10" readonly></textarea>';

let textareas = document.getElementsByTagName('textarea');
Array.from(textareas).forEach(textarea => {
  textarea.style.width = '90%';
  textarea.style.display = 'block';
});

let input = document.getElementById('text');
text.value =
  `ADD Airplane 60 1 'Artyom' 20 12\n` +
  `ADD Train 800 2 'a b' 20 12\n` +
  `ADD Truck 900 2 'Igor Gofman' 20 12\n` +
  `PRINT\n` +
  `REM speed >= 800\n` +
  `PRINT\n`

export default input;