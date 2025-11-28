import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './ContactForm.css'

const VALID_LABELS = ['', 'familia', 'trabajo', 'amigos', 'otro']

const ContactForm = ({ contact, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    etiqueta: '',
    notas: ''
  })

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (contact) {
      setFormData({
        nombre: contact.nombre || '',
        correo: contact.correo || '',
        telefono: contact.telefono || '',
        etiqueta: contact.etiqueta || '',
        notas: contact.notas || ''
      })
    }
  }, [contact])

  const validateNombre = (value) => {
    if (!value || value.trim().length === 0) {
      return 'El nombre es obligatorio'
    }
    if (value.length > 80) {
      return 'El nombre no puede exceder 80 caracteres'
    }
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    if (!nameRegex.test(value)) {
      return 'El nombre solo puede contener letras, espacios y acentos'
    }
    return null
  }

  const validateCorreo = (value) => {
    if (!value || value.trim().length === 0) {
      return 'El correo es obligatorio'
    }
    if (value.length > 120) {
      return 'El correo no puede exceder 120 caracteres'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'El formato del correo no es válido'
    }
    return null
  }

  const validateTelefono = (value) => {
    if (!value || value.trim().length === 0) {
      return 'El teléfono es obligatorio'
    }
    // Limpiar espacios y guiones
    const cleanPhone = value.replace(/[\s-]/g, '')
    // Contar solo dígitos
    const digitCount = (cleanPhone.match(/\d/g) || []).length
    
    if (digitCount < 7 || digitCount > 15) {
      return 'El teléfono debe tener entre 7 y 15 dígitos'
    }
    const phoneRegex = /^\+?\d+$/
    if (!phoneRegex.test(cleanPhone)) {
      return 'El teléfono solo puede contener dígitos y un "+" opcional al inicio'
    }
    return null
  }

  const validateEtiqueta = (value) => {
    if (value && !VALID_LABELS.includes(value)) {
      return 'La etiqueta debe ser: familia, trabajo, amigos u otro'
    }
    return null
  }

  const validateNotas = (value) => {
    if (value && value.length > 500) {
      return 'Las notas no pueden exceder 500 caracteres'
    }
    if (value && /<[^>]*>/.test(value)) {
      return 'No se permite HTML en las notas'
    }
    return null
  }

  const validateForm = () => {
    const newErrors = {}
    
    const nombreError = validateNombre(formData.nombre)
    if (nombreError) newErrors.nombre = nombreError

    const correoError = validateCorreo(formData.correo)
    if (correoError) newErrors.correo = correoError

    const telefonoError = validateTelefono(formData.telefono)
    if (telefonoError) newErrors.telefono = telefonoError

    const etiquetaError = validateEtiqueta(formData.etiqueta)
    if (etiquetaError) newErrors.etiqueta = etiquetaError

    const notasError = validateNotas(formData.notas)
    if (notasError) newErrors.notas = notasError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form si es creación
      if (!isEditing) {
        setFormData({
          nombre: '',
          correo: '',
          telefono: '',
          etiqueta: '',
          notas: ''
        })
      }
    } catch (err) {
      // El error se maneja en el componente padre
      console.error('Error submitting form:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="contact-form-container">
      <h2>{isEditing ? '✏️ Editar Contacto' : '➕ Nuevo Contacto'}</h2>
      
      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        <div className="form-group">
          <label htmlFor="nombre">
            Nombre <span className="required">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? 'input-error' : ''}
            maxLength="80"
            placeholder="Ej: Juan Pérez"
            disabled={submitting}
          />
          {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          <small className="help-text">Letras, espacios y acentos (1-80 caracteres)</small>
        </div>

        <div className="form-group">
          <label htmlFor="correo">
            Correo Electrónico <span className="required">*</span>
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className={errors.correo ? 'input-error' : ''}
            maxLength="120"
            placeholder="Ej: juan@ejemplo.com"
            disabled={submitting}
          />
          {errors.correo && <span className="error-message">{errors.correo}</span>}
          <small className="help-text">Formato estándar de correo (máx. 120 caracteres)</small>
        </div>

        <div className="form-group">
          <label htmlFor="telefono">
            Teléfono <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className={errors.telefono ? 'input-error' : ''}
            placeholder="Ej: +52 123 456 7890"
            disabled={submitting}
          />
          {errors.telefono && <span className="error-message">{errors.telefono}</span>}
          <small className="help-text">7-15 dígitos, puede incluir "+" al inicio</small>
        </div>

        <div className="form-group">
          <label htmlFor="etiqueta">Etiqueta</label>
          <select
            id="etiqueta"
            name="etiqueta"
            value={formData.etiqueta}
            onChange={handleChange}
            className={errors.etiqueta ? 'input-error' : ''}
            disabled={submitting}
          >
            <option value="">Sin etiqueta</option>
            <option value="familia">👨‍👩‍👧 Familia</option>
            <option value="trabajo">💼 Trabajo</option>
            <option value="amigos">👥 Amigos</option>
            <option value="otro">📌 Otro</option>
          </select>
          {errors.etiqueta && <span className="error-message">{errors.etiqueta}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="notas">Notas</label>
          <textarea
            id="notas"
            name="notas"
            value={formData.notas}
            onChange={handleChange}
            className={errors.notas ? 'input-error' : ''}
            maxLength="500"
            rows="4"
            placeholder="Información adicional del contacto..."
            disabled={submitting}
          />
          {errors.notas && <span className="error-message">{errors.notas}</span>}
          <small className="help-text">
            Texto plano, sin HTML (máx. 500 caracteres) - {formData.notas.length}/500
          </small>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Guardando...' : (isEditing ? '💾 Actualizar' : '➕ Crear')}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

ContactForm.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    correo: PropTypes.string,
    telefono: PropTypes.string,
    etiqueta: PropTypes.string,
    notas: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEditing: PropTypes.bool
}

export default ContactForm
