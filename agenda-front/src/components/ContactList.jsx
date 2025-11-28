import PropTypes from 'prop-types'
import ContactCard from './ContactCard'
import './ContactList.css'

const ContactList = ({ contacts, onEdit, onDelete }) => {
  if (contacts.length === 0) {
    return (
      <div className="contact-list-empty">
        <div className="empty-state">
          <h3>No hay contactos</h3>
          <p>Comienza agregando tu primer contacto</p>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-list">
      <h2 className="list-title">Mis Contactos ({contacts.length})</h2>
      <div className="contact-grid">
        {contacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      correo: PropTypes.string.isRequired,
      telefono: PropTypes.string.isRequired,
      etiqueta: PropTypes.string,
      notas: PropTypes.string
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ContactList
