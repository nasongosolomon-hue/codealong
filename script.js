// java script
// BUSINESS LOGIC

function Contact(firstName, lastName, phoneNumber, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.address = address;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

function AddressBook() {
  this.contacts = [];
}

AddressBook.prototype.addContact = function(contact) {
  this.contacts.push(contact);
};

function Place(location, landmarks, season, notes) {
  this.location = location;
  this.landmarks = landmarks;
  this.season = season;
  this.notes = notes;
}

Place.prototype.placeDetails = function() {
  return this.location + " - " + this.landmarks;
};

function PlacesList() {
  this.places = [];
}

PlacesList.prototype.addPlace = function(place) {
  this.places.push(place);
};

function Task(description) {
  this.description = description;
  this.done = false;
}

Task.prototype.markDone = function() {
  this.done = true;
};

function ToDoList() {
  this.tasks = [];
}

ToDoList.prototype.addTask = function(task) {
  this.tasks.push(task);
};

ToDoList.prototype.removeTask = function(description) {
  this.tasks = this.tasks.filter(function(task) {
    return task.description !== description;
  });
};

// UI LOGIC

const addressBook = new AddressBook();
const placesList = new PlacesList();
const toDoList = new ToDoList();

// CONTACTS

document.querySelector("#addContactBtn").addEventListener("click", function() {

  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const phone = document.querySelector("#phone").value;
  const address = document.querySelector("#address").value;

  const contact = new Contact(firstName, lastName, phone, address);

  addressBook.addContact(contact);

  const li = document.createElement("li");
  li.innerText = contact.fullName() + " | " + contact.phoneNumber;

  document.querySelector("#contactList").append(li);

  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#phone").value = "";
  document.querySelector("#address").value = "";
});