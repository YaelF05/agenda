# Agenda Backend API

Backend en FastAPI para gestión de contactos.

## Estructura del Proyecto

```
/backend
    /app
        /api            # Endpoints de la API
        /core           # Configuración y seguridad
        /db             # Modelos y conexión a BD
        /schemas        # Esquemas Pydantic
        /validation     # Lógica de validación
        main.py         # Punto de entrada
    /tests              # Tests unitarios e integración
    requirements.txt    # Dependencias
```

## Instalación

1. Crear un entorno virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

2. Instalar dependencias:
   ```bash
   pip install -r backend/requirements.txt
   ```

## Ejecución

Entra a la carpeta `backend`:

```bash
cd backend
uvicorn app.main:app --reload
```

La API estará disponible en `http://127.0.0.1:8000`.
La documentación interactiva (Swagger UI) en `http://127.0.0.1:8000/docs`.

## Pruebas

Para correr los tests:

```bash
pytest backend/tests
```
