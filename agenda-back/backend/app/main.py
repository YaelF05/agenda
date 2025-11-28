from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from app.api import contacts_api
from app.core.config import settings
from app.db import models, database

# Crear tablas de base de datos
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configuración de CORS
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permitir todos los orígenes para desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Manejador de excepciones global para ocultar errores internos
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": "Error Interno del Servidor"},
    )

app.include_router(contacts_api.router, prefix=f"{settings.API_V1_STR}/contacts", tags=["contacts"])

@app.get("/")
def root():
    return {"message": "Proyecto integrador - Plan de seguridad - CRUD con Validación Segura"}
