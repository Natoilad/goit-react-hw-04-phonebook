import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { ContactForm } from '../ContactForm/ContactForm';
import css from './App.module.css';
const CONTATCTS = 'contatcts';
const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const localContact = localStorage.getItem(CONTATCTS);
    if (localContact !== null) {
      const tempDate = JSON.parse(localContact);
      this.setState({ contacts: tempDate });
    } else {
      this.setState({ contacts: initialContacts });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(CONTATCTS, JSON.stringify(this.state.contacts));
    }
  }
  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };
  addContact = (nameContact, number) => {
    if (
      this.state.contacts.some(
        value =>
          value.name.toLocaleLowerCase() === nameContact.toLocaleLowerCase()
      )
    ) {
      alert(`${nameContact} is alredy in contacts`);
    } else {
      this.setState(prevstate => {
        const arr = [...prevstate.contacts];
        arr.push({ id: nanoid(), name: nameContact, number: number });
        return { contacts: arr };
      });
    }
  };
  filterContact = e => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };
  delContact = id => {
    const { contacts } = this.state;
    const filtred = contacts.filter(item => item.id !== id);
    this.setState({ contacts: filtred });
  };

  render() {
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter handleChange={this.handleChange} filter={this.state.filter} />
        <ContactList
          delContact={this.delContact}
          listContact={this.filterContact()}
        />
      </div>
    );
  }
}
