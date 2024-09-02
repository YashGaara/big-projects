let todoList = [
    // {
    //     item: 'good morning',
    //     duedate:'3/4/2024'
    // }, 
    // {
    //     item:'hello',
    //     duedate:'3/4/2024'
    // }
    ];
displayItems();

function addTodo() {
    let inputElement = document.querySelector('#todo-input');
    let dateElement = document.querySelector('#todo-date');
    let todoItem = inputElement.value;
    let tododate = dateElement.value;
    todoList.push({item: todoItem, duedate:tododate});
    inputElement.value = '';
    dateElement.value = '';
    displayItems();
}

function displayItems() {
    let containerElement = document.querySelector('.todo-container');
    let newHtml = '';
    for (let i = 0; i < todoList.length; i++) {
        // let item =todoList[i].item;
        // let duedate =todoList[i].duedate;
        let {item,duedate} = todoList[i];
        newHtml += `
        <span>${item}</span>
        <span>${duedate}</span>
        <button class="btn-delete" onclick="todoList.splice(${i}, 1);
        displayItems();">Delete</button>
    `;
    }
    containerElement.innerHTML = newHtml;
}