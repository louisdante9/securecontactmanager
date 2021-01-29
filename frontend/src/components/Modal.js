import { useState, useEffect } from "react";


const Modal = ({ handleClose, show, createContact, history }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if (name.trim() && phone.trim() && email.trim()&& address.trim()) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [name, phone, email, address]);
  const handleCreate = (event) => {
    event.preventDefault();
    const obj = {
      name,
      phone, 
      email,
      address,
    };
    createContact(obj);
    history.push("/");
  };
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div>
          <input
            type="text"
            placeholder="Enter Name "
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Enter address of contact"
            cols="30"
            rows="10"
            onChange={(e) => setAddress(e.target.value)}></textarea>
        </div>
        <div className="cta btn">
          <button onClick={handleCreate} disabled={btnDisabled}>
            Add Contact
          </button>
          <button type="button" onClick={() => handleClose(!show)}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
