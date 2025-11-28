import html

def sanitize_input(text: str) -> str:
    """
    Sanitizes input text to prevent XSS and other injection attacks.
    Although FastAPI/Pydantic/SQLAlchemy handle most of this, 
    explicit sanitization for text fields is a requested requirement.
    """
    if not text:
        return text
    return html.escape(text)
