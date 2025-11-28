from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db import crud, database
from app.schemas import contact_schema

router = APIRouter()

@router.post("", response_model=contact_schema.ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact(contact: contact_schema.ContactCreate, db: Session = Depends(database.get_db)):
    return crud.create_contact(db=db, contact=contact)

@router.get("", response_model=List[contact_schema.ContactResponse])
def read_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    contacts = crud.get_contacts(db, skip=skip, limit=limit)
    return contacts

@router.get("/{contact_id}", response_model=contact_schema.ContactResponse)
def read_contact(contact_id: int, db: Session = Depends(database.get_db)):
    db_contact = crud.get_contact(db, contact_id=contact_id)
    if db_contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return db_contact

@router.put("/{contact_id}", response_model=contact_schema.ContactResponse)
def update_contact(contact_id: int, contact: contact_schema.ContactUpdate, db: Session = Depends(database.get_db)):
    db_contact = crud.update_contact(db, contact_id=contact_id, contact_update=contact)
    if db_contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return db_contact

@router.delete("/{contact_id}", response_model=contact_schema.ContactResponse)
def delete_contact(contact_id: int, db: Session = Depends(database.get_db)):
    db_contact = crud.delete_contact(db, contact_id=contact_id)
    if db_contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return db_contact
