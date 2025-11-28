# Configuración de CORS para el Backend

## ⚠️ IMPORTANTE: Habilitar CORS

Para que el frontend pueda comunicarse con el backend, debes habilitar CORS en el archivo `main.py` del backend.

## Pasos a seguir:

1. Abre el archivo `agenda-back-main/backend/app/main.py`

2. Agrega el import del middleware CORS al inicio del archivo:

```python
from fastapi.middleware.cors import CORSMiddleware
```

3. Después de crear la instancia de FastAPI `app = FastAPI(...)`, agrega el siguiente código:

```python
# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Origen del frontend en desarrollo
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Permite todos los headers
)
```

## Archivo completo de ejemplo:

```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware  # <- AGREGAR ESTO
from app.api import contacts_api
from app.core.config import settings
from app.db import models, database

# Create database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# AGREGAR ESTA SECCIÓN COMPLETA
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global exception handler to hide internal errors (requirement 6)
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Log the error internally here if logging was set up
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error"},
    )

app.include_router(contacts_api.router, prefix=f"{settings.API_V1_STR}/contacts", tags=["contacts"])

@app.get("/")
def root():
    return {"message": "Welcome to Agenda Backend API"}
```

## Notas de Seguridad:

- En **desarrollo**, está bien usar `allow_origins=["http://localhost:5173"]`
- En **producción**, debes especificar solo el dominio exacto de tu frontend
- Nunca uses `allow_origins=["*"]` en producción
- Si usas un puerto diferente para el frontend, actualiza la URL en `allow_origins`

## Verificar que funciona:

1. Reinicia el servidor del backend después de hacer estos cambios
2. Abre el frontend en `http://localhost:5173`
3. Abre las herramientas de desarrollo (F12) y ve a la pestaña "Console"
4. Si ves errores de CORS, verifica que hayas seguido todos los pasos correctamente
