import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getAllContacts,
  updateContact,
  logout,
  createContact,
  searchContact
} from "../actions";
import Modal from './Modal'

const Dashboard = ({
  getAllContacts,
  userContacts,
  updateContact,
  createContact,
  searchContact,
  logout,
  history,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [viewContact, setviewContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  useEffect(() => {
    setContacts(userContacts);
  }, [userContacts]);

  const handleUpdate = (event, name) => {
    event.preventDefault();
    const obj = {
      name,
      phone,
      email,
      address,
    };
    updateContact(name, obj);
    history.push("/");
    setEdit(false);
  };

  const handleContactClick = (contact) => {
    setviewContact(contact);
    setEdit(false);
    setName(contact.name);
    setPhone(contact.phone);
    setEmail(contact.email);
    setAddress(contact.address);
  };
  const handleSearch = (value) => {
    setviewContact({
      name: "",
      phone: "",
      email: "",
      address: ""
    });
    searchContact(value);   
  };

  const Logout = () => {
    logout();
    history.push("/");
  };
  return (
    <div className="container">
      <div className="auth-handler">
        <i className="fas fa-sign-out-alt" onClick={Logout}></i>
        <i className="fas fa-folder-plus" onClick={() => setShow(!show)}></i>
      </div>
      <div className="home-intro">
        <div className="contacts">
          {contacts.length > 0 ? (
            contacts.map((contact, index) => {
              return (
                <div
                  className="note-list"
                  key={index}
                  onClick={() => handleContactClick(contact)}>
                  <h4>{contact.name}</h4>
                  <p>{contact.phone}</p>
                </div>
              );
            })
          ) : (
            <div>You have no available contacts</div>
          )}
        </div>
        <div className="add-note">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="search contact list"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="single-note">
        <Modal
          show={show}
          handleClose={setShow}
          createContact={createContact}
          history={history}
        />
        <div className="single-note-header">
          <div></div>
          {viewContact!.name && (
            <div>
              <i
                className={edit ? "fas fa-close" : "fas fa-edit"}
                onClick={() => setEdit(!edit)}></i>
            </div>
          )}
        </div>
        {edit === true ? (
          <div className="single-note-wrapper">
            <div>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                defaultValue={viewContact.name}
              />
            </div>
            <div>
              <input
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                defaultValue={viewContact.phone}
              />
            </div>
            <div>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={viewContact.email}
              />
            </div>
            <div>
              <textarea
                onChange={(e) => setAddress(e.target.value)}
                defaultValue={viewContact.address}
                cols={30}
                rows={10}></textarea>
            </div>
            <div>
              <button onClick={(e) => handleUpdate(e, viewContact.name)}>
                update
              </button>
            </div>
          </div>
        ) : (
          <div className={viewContact.name && "single-note-wrapper"}>
            <h4>{viewContact.name}</h4>
            <p> {viewContact.phone && `Phone: ${viewContact.phone}`}</p>
            <p> {viewContact.email && `Email: ${viewContact.email}`}</p>
            {viewContact.address && (
              <div>
                <h3>Address:</h3>
                <address>{viewContact.address}</address>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  const userContacts = state.contacts.contacts || [];
  return { userContacts };
};

export default connect(mapStateToProps, {
  getAllContacts,
  updateContact,
  createContact,
  searchContact,
  logout,
})(Dashboard);
