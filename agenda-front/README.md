# Agenda de Contactos con Validación Segura

Aplicación web completa para gestión de contactos con validación segura de datos, desarrollada con FastAPI (Backend) y React + Vite (Frontend).

## Instalación y Ejecución

### Prerequisitos
- Python 3.8 o superior
- Node.js 20.19.0 o superior
- npm 8.0.0 o superior

### 1. Backend (FastAPI)

```bash
# Navegar al directorio del backend
cd agenda-back-main/backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Linux/Mac:
source venv/bin/activate
# En Windows:
venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar el servidor
uvicorn app.main:app --reload
```

El backend estará disponible en: `http://127.0.0.1:8000`
- Documentación API (Swagger): `http://127.0.0.1:8000/docs`

### 2. Frontend (React + Vite)

```bash
# Navegar al directorio del frontend
cd AgendaDeContactos

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`
