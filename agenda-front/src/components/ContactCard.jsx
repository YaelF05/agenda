import PropTypes from 'prop-types'
import './ContactCard.css'



const ContactCard = ({ contact, onEdit, onDelete }) => {
  const getEtiquetaIcon = (etiqueta) => {
    const icons = {
      familia: '👨‍👩‍👧‍👦',
      trabajo: '💼',
      amigos: '🎉',
      otro: '🔖'
    }
    return icons[etiqueta] || ''
  }

  const getEtiquetaClass = (etiqueta) => {
    return etiqueta ? `tag tag-${etiqueta}` : 'tag tag-default'
  }

  const handleDelete = () => {
    onDelete(contact.id)
  }

  const handleEdit = () => {
    onEdit(contact)
  }

  return (
    <div className="contact-card">
      <div className="card-header">
        <h3 className="contact-name">{contact.nombre}</h3>
        {contact.etiqueta && (
          <span className={getEtiquetaClass(contact.etiqueta)}>
            {getEtiquetaIcon(contact.etiqueta)} {contact.etiqueta}
          </span>
        )}
      </div>

      <div className="card-body">
        <div className="contact-info">
          <div className="info-item">
            <a href={`mailto:${contact.correo}`} className="info-value">
              {contact.correo}
            </a>
          </div>

          <div className="info-item">
            <a href={`tel:${contact.telefono}`} className="info-value">
              {contact.telefono}
            </a>
          </div>

          {contact.notas && (
            <div className="info-item notes">
              <p className="info-value">{contact.notas}</p>
            </div>
          )}
        </div>
      </div>

      <div className="card-footer">
        <button
          className="btn btn-edit"
          onClick={handleEdit}
          title="Editar contacto"
        >
          Editar
        </button>
        <button
          className="btn btn-delete"
          onClick={handleDelete}
          title="Eliminar contacto"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

ContactCard.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    correo: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    etiqueta: PropTypes.string,
    notas: PropTypes.string
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ContactCard
