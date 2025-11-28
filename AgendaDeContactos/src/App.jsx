import { useState, useEffect } from 'react'
import './App.css'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import Modal from './components/Modal'

const API_URL = 'http://127.0.0.1:8000/api/v1/contacts'

function App() {
  const [contacts, setContacts] = useState([])
  const [editingContact, setEditingContact] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // Cargar contactos al inicio
  useEffect(() => {
    fetchContacts()
  }, [])

  // Limpiar mensajes después de 5 segundos
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('')
        setSuccess('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, success])

  const fetchContacts = async () => {
    setLoading(true)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error('Error al cargar los contactos')
      }
      const data = await response.json()
      setContacts(data)
      setError('')
    } catch (err) {
      setError('No se pudieron cargar los contactos. Verifica que el servidor esté activo.')
      console.error('Error fetching contacts:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (contactData) => {
    setLoading(true)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Error al crear el contacto')
      }

      await fetchContacts()
      setShowForm(false)
      setSuccess('Contacto creado exitosamente')
      setError('')
    } catch (err) {
      setError(err.message || 'Error al crear el contacto')
      console.error('Error creating contact:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (id, contactData) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Error al actualizar el contacto')
      }

      await fetchContacts()
      setEditingContact(null)
      setSuccess('Contacto actualizado exitosamente')
      setError('')
    } catch (err) {
      setError(err.message || 'Error al actualizar el contacto')
      console.error('Error updating contact:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Error al eliminar el contacto')
      }

      await fetchContacts()
      setSuccess('Contacto eliminado exitosamente')
      setError('')
    } catch (err) {
      setError(err.message || 'Error al eliminar el contacto')
      console.error('Error deleting contact:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (contact) => {
    setEditingContact(contact)
    setShowForm(false)
  }

  const handleCancelEdit = () => {
    setEditingContact(null)
  }

  const handleCancelCreate = () => {
    setShowForm(false)
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>📇 Agenda de Contactos</h1>
        <p className="subtitle">CRUD con Validación Segura</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span className="alert-icon">✓</span>
            <span>{success}</span>
          </div>
        )}

        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}

        <div className="actions-bar">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
            disabled={showForm || editingContact}
          >
            ➕ Nuevo Contacto
          </button>
          <button
            className="btn btn-secondary"
            onClick={fetchContacts}
            disabled={loading}
          >
            🔄 Actualizar Lista
          </button>
        </div>

        {showForm && (
          <Modal onClose={handleCancelCreate}>
            <ContactForm
              onSubmit={handleCreate}
              onCancel={handleCancelCreate}
            />
          </Modal>
        )}

        {editingContact && (
          <Modal onClose={handleCancelEdit}>
            <ContactForm
              contact={editingContact}
              onSubmit={(data) => handleUpdate(editingContact.id, data)}
              onCancel={handleCancelEdit}
              isEditing
            />
          </Modal>
        )}

        <ContactList
          contacts={contacts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <footer className="app-footer">
        <p>Total de contactos: {contacts.length}</p>
      </footer>
    </div>
  )
}

export default App
