from sqlalchemy import Column, Integer, String, Text
from app.db.database import Base

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(80), nullable=False)
    correo = Column(String(120), nullable=False, index=True)
    telefono = Column(String(20), nullable=False) # Se guarda como string, validación asegura dígitos
    etiqueta = Column(String(20), nullable=True) # familia, trabajo, amigos, otro
    notas = Column(Text(500), nullable=True)
