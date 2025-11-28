import pytest
from app.validation import validators

def test_validate_name():
    # Casos válidos (>=3)
    assert validators.validate_name("Juan Perez") == "Juan Perez"
    assert validators.validate_name("José María") == "José María"
    assert validators.validate_name("Ana") == "Ana"
    assert validators.validate_name("María de los Ángeles") == "María de los Ángeles"

    # Casos inválidos (>=3)
    with pytest.raises(ValueError):
        validators.validate_name("") # Vacío
    with pytest.raises(ValueError):
        validators.validate_name("a" * 81) # Muy largo
    with pytest.raises(ValueError):
        validators.validate_name("Juan123") # Números
    with pytest.raises(ValueError):
        validators.validate_name("Juan@") # Caracteres especiales

def test_validate_phone():
    # Casos válidos (>=3)
    assert validators.validate_phone("1234567") == "1234567"
    assert validators.validate_phone("+1234567890") == "+1234567890"
    assert validators.validate_phone(" 123-456-7890 ") == "1234567890"
    assert validators.validate_phone("5512345678") == "5512345678"

    # Casos inválidos (>=3)
    with pytest.raises(ValueError):
        validators.validate_phone("123") # Muy corto (<7)
    with pytest.raises(ValueError):
        validators.validate_phone("1234567890123456") # Muy largo (>15)
    with pytest.raises(ValueError):
        validators.validate_phone("abc") # No dígitos
    with pytest.raises(ValueError):
        validators.validate_phone("12345+678") # + en medio

def test_validate_label():
    assert validators.validate_label("familia") == "familia"
    assert validators.validate_label("") == ""
    assert validators.validate_label(None) == ""
    
    with pytest.raises(ValueError):
        validators.validate_label("invalid")

def test_validate_notes():
    assert validators.validate_notes("Some notes") == "Some notes"
    assert validators.validate_notes(None) == ""
    
    with pytest.raises(ValueError):
        validators.validate_notes("a" * 501) # Too long
    with pytest.raises(ValueError):
        validators.validate_notes("<b>HTML</b>") # HTML not allowed
