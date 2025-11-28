# 🚀 Inicio Rápido - Agenda de Contactos

## Pasos para ejecutar la aplicación:

### 1️⃣ Configurar CORS en el Backend

**PRIMERO Y MÁS IMPORTANTE**: Antes de ejecutar cualquier cosa, debes habilitar CORS en el backend.

Abre el archivo `agenda-back-main/backend/app/main.py` y agrega estas líneas:

```python
# Al inicio del archivo, agregar:
from fastapi.middleware.cors import CORSMiddleware

# Después de app = FastAPI(...), agregar:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Consulta el archivo `CORS_SETUP.md` para más detalles.**

### 2️⃣ Iniciar el Backend

```bash
# Terminal 1 - Backend
cd agenda-back-main/backend

# Crear y activar entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate  # Windows

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor
uvicorn app.main:app --reload
```

✅ El backend estará en: http://127.0.0.1:8000

### 3️⃣ Iniciar el Frontend

```bash
# Terminal 2 - Frontend
cd AgendaDeContactos

# Instalar dependencias (solo la primera vez)
npm install

# Ejecutar aplicación
npm run dev
```

✅ El frontend estará en: http://localhost:5173

### 4️⃣ Usar la Aplicación

1. Abre tu navegador en `http://localhost:5173`
2. Haz clic en "➕ Nuevo Contacto" para agregar contactos
3. Prueba todas las funcionalidades CRUD

## 📋 Checklist de Verificación

- [ ] Backend corriendo en puerto 8000
- [ ] Frontend corriendo en puerto 5173
- [ ] CORS configurado en el backend
- [ ] No hay errores en la consola del navegador (F12)
- [ ] Puedes crear, ver, editar y eliminar contactos

## 🐛 Problemas Comunes

### "CORS error" en el navegador
➡️ Asegúrate de haber configurado CORS en el backend (Paso 1)

### "Error al cargar los contactos"
➡️ Verifica que el backend esté corriendo en el puerto 8000

### Frontend no abre automáticamente
➡️ Abre manualmente `http://localhost:5173` en tu navegador

## 📚 Documentación Completa

- **README.md** - Documentación completa del proyecto
- **CORS_SETUP.md** - Instrucciones detalladas de CORS

## 🎉 ¡Listo!

Si todo está configurado correctamente, deberías ver la interfaz de la Agenda de Contactos y poder realizar todas las operaciones CRUD.
