from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.db.database import Base, get_db
import pytest

# Setup test DB
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def run_around_tests():
    # Before test
    Base.metadata.create_all(bind=engine)
    yield
    # After test
    Base.metadata.drop_all(bind=engine)

def test_create_contact():
    response = client.post(
        "/api/v1/contacts/",
        json={
            "nombre": "Test User",
            "correo": "test@example.com",
            "telefono": "1234567890",
            "etiqueta": "trabajo",
            "notas": "Test notes"
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["nombre"] == "Test User"
    assert "id" in data

def test_create_contact_invalid():
    response = client.post(
        "/api/v1/contacts/",
        json={
            "nombre": "Test1234", # Invalid name
            "correo": "test@example.com",
            "telefono": "1234567890"
        },
    )
    assert response.status_code == 422

def test_read_contacts():
    client.post(
        "/api/v1/contacts/",
        json={"nombre": "User One", "correo": "one@example.com", "telefono": "1111111"}
    )
    client.post(
        "/api/v1/contacts/",
        json={"nombre": "User Two", "correo": "two@example.com", "telefono": "2222222"}
    )
    
    response = client.get("/api/v1/contacts/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2

def test_update_contact():
    # Create
    res = client.post(
        "/api/v1/contacts/",
        json={"nombre": "Old Name", "correo": "old@example.com", "telefono": "1111111"}
    )
    contact_id = res.json()["id"]
    
    # Update
    response = client.put(
        f"/api/v1/contacts/{contact_id}",
        json={"nombre": "New Name"}
    )
    assert response.status_code == 200
    assert response.json()["nombre"] == "New Name"
    assert response.json()["correo"] == "old@example.com" # Should remain

def test_delete_contact():
    # Create
    res = client.post(
        "/api/v1/contacts/",
        json={"nombre": "To Delete", "correo": "del@example.com", "telefono": "1111111"}
    )
    contact_id = res.json()["id"]
    
    # Delete
    response = client.delete(f"/api/v1/contacts/{contact_id}")
    assert response.status_code == 200
    
    # Verify deleted
    response = client.get(f"/api/v1/contacts/{contact_id}")
    assert response.status_code == 404
