# Agenda de Contactos - Proyecto Integrador

Este repositorio contiene el código fuente del proyecto integrador, dividido en Backend (API) y Frontend (Cliente Web).

## Estructura

- `agenda-back/`: Backend desarrollado en Python con FastAPI.
- `agenda-front/`: Frontend desarrollado en React con Vite.

## Instalación y Ejecución

### 1. Backend

Requisitos: Python 3.10+

```bash
cd agenda-back/backend

# Crear entorno virtual (opcional pero recomendado)
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Iniciar servidor
uvicorn app.main:app --reload
```

El servidor correrá en `http://127.0.0.1:8000`.

### 2. Frontend

Requisitos: Node.js 18+

```bash
cd agenda-front

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación web estará disponible en la URL que indique la terminal (usualmente `http://localhost:5173`).
