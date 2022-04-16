import axios from 'axios';
import { useEffect, useState } from 'react'
import FilteredPersons from './components/FilteredPersons';
import PersonForm from './components/PersonForm';
import Phonebook from './components/PhoneBook';
import personService from './services/persons';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredName, setFilteredName] = useState('');
  const [ifFiltered, setFiltered] = useState(false);
  const [message, setMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');

  const getPersons = () => {
    personService
      .getAll()
      .then(data => {
        setPersons(data);
      });
  }

  useEffect(() => {
    getPersons();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const persArr = Object.keys(persons).map(k => persons[k].name.toLowerCase());
    const exists = persArr.includes(newName.toLowerCase());
    if (exists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const objToUpdate = persons.filter(element => element.name.toLowerCase() === newName.toLowerCase());
        const newObj = {
          name: objToUpdate[0].name,
          number: newNumber
        }
        personService
          .update(objToUpdate[0].id, newObj)
          .then(data => {
            personService.getAll().then(personData => setPersons(personData));
          });

      }
      return;
    }

    const newObj = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newObj)
      .then(data => {
        setNotificationType('add');
        setMessage(`Added ${newName}`);
        setPersons(persons.concat(data));
        setTimeout(() => {
          setMessage('');
          setNotificationType('');
        }, 3000);
      });
  }

  const handleInputchange = event => {
    setNewName(event.target.value);
  }

  const handleNumberchange = event => {
    setNewNumber(event.target.value);
  }

  const handleFilteredName = event => {
    if (filteredName !== '') {
      setFiltered(true);
    } else {
      setFiltered(false);
    }
    setFilteredName(event.target.value);
  }

  const handleDelete = event => {
    if (window.confirm(`Delete ${persons[event.target.id - 1].name} ?`)) {
      personService
        .deleteObj(event.target.id)
        .then(data => {
          setPersons(persons.filter(element => element.id != event.target.id));
        })
        .catch(error => {
          setNotificationType('error');
          setMessage(`Information of ${persons[event.target.id - 1].name} has already been removed from server`);
          setTimeout(() => {
            setMessage('');
            setNotificationType('');
          }, 3000);
        });
    }
  }

  const showFiltered = ifFiltered ? persons.filter(person => person.name.toLowerCase().includes(filteredName)) : persons;

  return (
    <div>
      <Phonebook filteredName={filteredName} handleFilteredName={handleFilteredName} message={message} notificationType={notificationType} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} handleInputchange={handleInputchange} handleNumberchange={handleNumberchange} />
      <h2>Numbers</h2>
      <FilteredPersons showFiltered={showFiltered} onDelete={handleDelete} />
    </div>
  )
}

export default App