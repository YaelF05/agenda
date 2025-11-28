import pytest
from pydantic import ValidationError
from app.schemas.contact_schema import ContactBase

def test_contact_email_validation():
    # Casos válidos (>=3)
    valid_emails = [
        "test@example.com",
        "user.name@domain.co",
        "user+tag@example.org",
        "123@domain.com"
    ]
    for email in valid_emails:
        contact = ContactBase(nombre="Test", correo=email, telefono="1234567890")
        assert contact.correo == email

    # Casos inválidos (>=3)
    invalid_emails = [
        "plainaddress",     # Sin @
        "@example.com",     # Sin usuario
        "user@",            # Sin dominio
        "user@.com",        # Dominio inválido
        "user@domain",      # Sin TLD (aunque a veces es válido, pydantic suele requerirlo)
        "user name@domain.com" # Espacios
    ]
    for email in invalid_emails:
        with pytest.raises(ValidationError):
            ContactBase(nombre="Test", correo=email, telefono="1234567890")
