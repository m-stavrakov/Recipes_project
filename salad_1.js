const checkItem = document.querySelectorAll('.check');
const test = document.querySelectorAll('.ingredients_list-items');

checkItem.forEach(unchecked => {
  unchecked.addEventListener('click', function() {
    // this.classList.add('checked');

    if (unchecked.classList.contains('checked')){
        unchecked.classList.remove('checked');
    }else {
        
    }
  });
});