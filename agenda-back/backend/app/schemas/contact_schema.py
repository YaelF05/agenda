from pydantic import BaseModel, EmailStr, field_validator, ConfigDict
from typing import Optional
from app.validation import validators
from app.core.security import sanitize_input

class ContactBase(BaseModel):
    nombre: str
    correo: EmailStr
    telefono: str
    etiqueta: Optional[str] = ""
    notas: Optional[str] = ""

    @field_validator("nombre")
    @classmethod
    def check_name(cls, v):
        v = sanitize_input(v)
        return validators.validate_name(v)

    @field_validator("telefono")
    @classmethod
    def check_phone(cls, v):
        v = sanitize_input(v)
        return validators.validate_phone(v)

    @field_validator("etiqueta")
    @classmethod
    def check_label(cls, v):
        v = sanitize_input(v)
        return validators.validate_label(v)

    @field_validator("notas")
    @classmethod
    def check_notes(cls, v):
        v = sanitize_input(v)
        return validators.validate_notes(v)

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    nombre: Optional[str] = None
    correo: Optional[EmailStr] = None
    telefono: Optional[str] = None
    etiqueta: Optional[str] = None
    notas: Optional[str] = None

    @field_validator("nombre")
    @classmethod
    def check_name(cls, v):
        if v is None: return v
        v = sanitize_input(v)
        return validators.validate_name(v)

    @field_validator("telefono")
    @classmethod
    def check_phone(cls, v):
        if v is None: return v
        v = sanitize_input(v)
        return validators.validate_phone(v)

    @field_validator("etiqueta")
    @classmethod
    def check_label(cls, v):
        if v is None: return v
        v = sanitize_input(v)
        return validators.validate_label(v)

    @field_validator("notas")
    @classmethod
    def check_notes(cls, v):
        if v is None: return v
        v = sanitize_input(v)
        return validators.validate_notes(v)

class ContactResponse(ContactBase):
    id: int
    
    model_config = ConfigDict(from_attributes=True)
