# 📇 Agenda de Contactos - CRUD con Validación Segura

Aplicación web completa para gestión de contactos con validación segura de datos, desarrollada con FastAPI (Backend) y React + Vite (Frontend).

## 🎯 Características

### Funcionalidades
- ✅ **CRUD Completo**: Crear, Leer, Actualizar y Eliminar contactos
- 🔒 **Validación Segura**: Validación en cliente y servidor
- 🛡️ **Protección XSS**: Escape de caracteres especiales al mostrar datos
- ⚡ **Interfaz Reactiva**: Actualización en tiempo real
- 🎨 **Diseño Moderno**: Interfaz intuitiva y responsive
- ✉️ **Confirmación de Eliminación**: Previene eliminaciones accidentales

### Campos del Contacto
- **Nombre** (obligatorio): Letras, espacios y acentos (1-80 caracteres)
- **Correo** (obligatorio): Formato email estándar (máx. 120 caracteres)
- **Teléfono** (obligatorio): 7-15 dígitos, puede incluir "+" al inicio
- **Etiqueta** (opcional): Familia, Trabajo, Amigos u Otro
- **Notas** (opcional): Texto plano sin HTML (máx. 500 caracteres)

## 🚀 Instalación y Ejecución

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

## 📝 Configuración de CORS (Backend)

**IMPORTANTE**: Para que el frontend pueda comunicarse con el backend, necesitas habilitar CORS.

Agrega las siguientes líneas en `agenda-back-main/backend/app/main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

# Después de crear la app, agrega:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Origen del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🔐 Seguridad Implementada

### Backend
1. **Validación de Entradas**: 
   - Regex ancladas para cada campo
   - Longitudes mínimas y máximas
   - Lista blanca para etiquetas
   - Sanitización con `html.escape()`

2. **Consultas Parametrizadas**: 
   - Uso de ORM SQLAlchemy
   - Prevención de SQL Injection

3. **Manejo de Errores**: 
   - Mensajes genéricos al usuario
   - Detalles técnicos solo en logs

### Frontend
1. **Validación en Tiempo Real**: 
   - Validación campo por campo
   - Mensajes de error claros

2. **Escape de HTML**: 
   - `dangerouslySetInnerHTML` con escape previo
   - Prevención de XSS

3. **Sanitización**: 
   - No permite HTML en campos de texto
   - Validación de formato de email y teléfono

## 🧪 Pruebas

### Ejecutar tests del backend
```bash
cd agenda-back-main/backend
pytest tests/
```

### Casos de prueba incluidos
- Validación de campos
- Operaciones CRUD
- Manejo de errores
- Entradas inválidas

## 📁 Estructura del Proyecto

```
.
├── agenda-back-main/backend/
│   ├── app/
│   │   ├── api/           # Endpoints de la API
│   │   ├── core/          # Configuración y seguridad
│   │   ├── db/            # Modelos y CRUD
│   │   ├── schemas/       # Validación con Pydantic
│   │   └── validation/    # Validadores personalizados
│   └── tests/             # Tests unitarios
│
└── AgendaDeContactos/
    ├── src/
    │   ├── components/    # Componentes React
    │   │   ├── ContactCard.jsx
    │   │   ├── ContactForm.jsx
    │   │   ├── ContactList.jsx
    │   │   └── Modal.jsx
    │   ├── App.jsx        # Componente principal
    │   └── main.jsx       # Punto de entrada
    └── package.json
```

## 🎨 Características de la Interfaz

- **Diseño Responsive**: Adaptable a móviles, tablets y desktop
- **Modal para Formularios**: Experiencia de usuario mejorada
- **Alertas Visuales**: Feedback inmediato de las operaciones
- **Tarjetas de Contacto**: Visualización clara con iconos
- **Etiquetas con Colores**: Categorización visual intuitiva
- **Confirmación de Eliminación**: Previene errores

## 🛠️ Tecnologías Utilizadas

### Backend
- FastAPI
- SQLAlchemy
- Pydantic
- SQLite
- pytest

### Frontend
- React 19
- Vite
- CSS3 (sin frameworks)
- Fetch API

## 📋 Reglas de Validación

| Campo | Reglas |
|-------|--------|
| Nombre | Letras, espacios, acentos; 1-80 caracteres |
| Correo | Formato email estándar; máx. 120 caracteres |
| Teléfono | 7-15 dígitos; "+" opcional al inicio |
| Etiqueta | familia, trabajo, amigos, otro o vacío |
| Notas | Texto plano; máx. 500 caracteres; sin HTML |

## 🐛 Solución de Problemas

### Error de CORS
Si ves errores de CORS en la consola del navegador:
1. Asegúrate de haber agregado el middleware CORS en el backend
2. Verifica que el puerto del frontend coincida (5173)
3. Reinicia el servidor del backend

### Backend no responde
1. Verifica que el servidor esté corriendo en el puerto 8000
2. Revisa que la base de datos se haya creado correctamente
3. Verifica los logs del servidor

### Frontend no carga contactos
1. Abre las herramientas de desarrollo (F12)
2. Verifica la consola para errores
3. Asegúrate de que el backend esté activo
4. Verifica la URL de la API en `App.jsx`

## 📞 Contacto y Soporte

Para reportar problemas o sugerencias, por favor revisa:
1. Los mensajes de error en la consola del navegador
2. Los logs del servidor backend
3. La documentación de la API en `/docs`

## 📄 Licencia

Este proyecto es parte de un ejercicio académico sobre desarrollo seguro de aplicaciones web.
