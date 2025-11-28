import re
from typing import Optional

# Patrones Regex
NAME_REGEX = r"^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$"
# 7 a 15 dígitos efectivos. Opcional '+' al inicio.
PHONE_REGEX = r"^\+?\d{7,15}$"

VALID_LABELS = {"familia", "trabajo", "amigos", "otro", ""}

def validate_name(name: str) -> str:
    if not (1 <= len(name) <= 80):
        raise ValueError("El nombre debe tener entre 1 y 80 caracteres.")
    if not re.match(NAME_REGEX, name):
        raise ValueError("El nombre solo puede contener letras, espacios y acentos.")
    return name

def validate_phone(phone: str) -> str:
    # Eliminar espacios o guiones para validar solo dígitos y estructura
    clean_phone = phone.strip().replace(" ", "").replace("-", "")
    
    # Validar estructura: opcional '+' al inicio, seguido solo de dígitos
    if not re.match(r"^\+?\d+$", clean_phone):
         raise ValueError("El teléfono solo puede contener dígitos y un '+' opcional al inicio.")

    # Contar dígitos efectivos
    digit_count = sum(c.isdigit() for c in clean_phone)
    if not (7 <= digit_count <= 15):
        raise ValueError("El teléfono debe tener entre 7 y 15 dígitos.")
    
    return clean_phone

def validate_label(label: Optional[str]) -> Optional[str]:
    if label is None:
        return ""
    if label not in VALID_LABELS:
        raise ValueError(f"La etiqueta debe ser una de: {', '.join(VALID_LABELS)}")
    return label

def validate_notes(notes: Optional[str]) -> Optional[str]:
    if notes is None:
        return ""
    if len(notes) > 500:
        raise ValueError("Las notas no pueden exceder los 500 caracteres.")
    # Verificación básica de HTML
    if "<" in notes and ">" in notes:
         raise ValueError("No se permite HTML en las notas.")
    return notes
