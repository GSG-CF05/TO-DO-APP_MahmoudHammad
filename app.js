const htmlElements = {
  task : document.querySelector('.task'),
  addBtn : document.querySelector('.plus'),
  tasksContainer : document.querySelector('.tasks-content'),
  unorderdList : document.querySelector('.list')
}


const tasksArr = [];

//this function is responsible for adding tasks to the local storage and call createElements function to render elements on the webpage
htmlElements.addBtn.addEventListener('click', addTasks)

function addTasks() {
  tasksArr.push({task : htmlElements.task.value});
  localStorage.setItem('tasks', JSON.stringify(tasksArr));
  const local = JSON.parse(localStorage.getItem('tasks'));
  if(local) {
    createElements(local[local.length - 1]['task'])
  };
  htmlElements.task.value = '';
  
};

// this function to render elements on the web page
function createElements(text) {
  const createElem = {
    li : document.createElement('li'),
    para : document.createElement('p'),
    container : document.createElement('div'),
    deleteIcon : document.createElement('i'),
    completedIcon : document.createElement('i'),
    editBtn : document.createElement('button')
  };
  createElem.para.textContent = text;
  createElem.para.classList = 'para'
  createElem.container.setAttribute('class', 'icons');
  createElem.deleteIcon.setAttribute('class', 'fas fa-trash-alt')
  createElem.completedIcon.setAttribute('class', 'fas fa-check-circle');
  
  createElem.editBtn.textContent = 'Edit';
  createElem.editBtn.classList = 'edit-btn';
  createElem.container.appendChild(createElem.deleteIcon);
  createElem.container.appendChild(createElem.completedIcon);
  createElem.container.appendChild(createElem.editBtn);
  createElem.li.appendChild(createElem.para);
  createElem.li.appendChild(createElem.container);
  htmlElements.unorderdList.appendChild(createElem.li);
};

const local = JSON.parse(localStorage.getItem('tasks'));

if(local) {
  window.addEventListener('load', (event) => {
    local.forEach(element => {
      createElements(Object.values(element))
    });
  });
}



document.addEventListener('click', (item) => {
  
  if(item.target.className === 'edit-btn'){
    const local = JSON.parse(localStorage.getItem('tasks'));
    
    console.log(local)
    htmlElements.task.focus();
    item.target.parentNode.parentNode.firstElementChild.textContent = htmlElements.task.value;
    const modifiedText = [...document.querySelectorAll('.para')].map((e) => {
      return {task :e.textContent}
    });
    localStorage.setItem('tasks', JSON.stringify(modifiedText));
    console.log(modifiedText)
    htmlElements.task.value = '';
  }

})