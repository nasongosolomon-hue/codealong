// --- SHARED BUSINESS LOGIC HELPERS ---
function assignId(obj) {
  obj.currentId += 1;
  return obj.currentId;
}

// --- TO-DO LIST BUSINESS LOGIC ---
function ToDoList() {
  this.tasks = {};
  this.currentId = 0;
}

ToDoList.prototype.addTask = function(task) {
  task.id = assignId(this);
  this.tasks[task.id] = task;
};

ToDoList.prototype.deleteTask = function(id) {
  if (this.tasks[id] === undefined) return false;
  delete this.tasks[id];
  return true;
};

function Task(description, priority) {
  this.description = description;
  this.priority = priority;
  this.isDone = false;
}

// --- ADDRESS BOOK BUSINESS LOGIC ---
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = assignId(this);
  this.contacts[contact.id] = contact;
};

function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

// --- UI LOGIC ---
let toDoList = new ToDoList();
let addressBook = new AddressBook();

// Helper to update the To-Do UI
function displayTasks(listToDisplay) {
  let taskListDiv = document.querySelector("#tasks-list");
  let htmlString = "";
  Object.keys(listToDisplay.tasks).forEach(function(key) {
    const task = listToDisplay.tasks[key];
    htmlString += `<li class="task-item" id="${task.id}">
                    <span>[${task.priority}] ${task.description}</span>
                    <button class="delete-btn" onclick="handleDeleteTask(${task.id})">Delete</button>
                  </li>`;
  });
  taskListDiv.innerHTML = htmlString;
}

function handleDeleteTask(id) {
  toDoList.deleteTask(id);
  displayTasks(toDoList);
}

// Helper to update the Address Book UI
function displayContacts(bookToDisplay) {
  let contactsDiv = document.querySelector("#contacts-list");
  let htmlString = "";
  Object.keys(bookToDisplay.contacts).forEach(function(key) {
    const contact = bookToDisplay.contacts[key];
    htmlString += `<li class="contact-item">${contact.firstName} ${contact.lastName} - ${contact.phoneNumber}</li>`;
  });
  contactsDiv.innerHTML = htmlString;
}

// MAIN EVENT LISTENER
window.addEventListener("load", function() {
  
  // Logic for index.html (To-Do Page)
  const taskForm = document.querySelector("#new-task");
  if (taskForm) {
    taskForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const desc = document.querySelector("#new-task-desc").value;
      const priority = document.querySelector("#new-task-priority").value;
      let newTask = new Task(desc, priority);
      toDoList.addTask(newTask);
      displayTasks(toDoList);
      taskForm.reset();
    });
  }

  // Logic for address-book.html (Address Book Page)
  const contactForm = document.querySelector("#new-contact");
  if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const first = document.querySelector("#first-name").value;
      const last = document.querySelector("#last-name").value;
      const phone = document.querySelector("#phone-number").value;
      let newContact = new Contact(first, last, phone);
      addressBook.addContact(newContact);
      displayContacts(addressBook);
      contactForm.reset();
    });
  }
});
  document.querySelector("#taskInput").value = "";
});
