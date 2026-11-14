import hmac
import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

from . import models, schemas
from .database import Base, engine, get_db
from .seed import seed

load_dotenv()

ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "")
CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",") if o.strip()]


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(engine)
    seed()  # fills empty tables only
    yield


app = FastAPI(title="Shravani Portfolio API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


def require_admin(x_admin_token: str = Header(default="")) -> None:
    if not ADMIN_TOKEN or not hmac.compare_digest(x_admin_token, ADMIN_TOKEN):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or missing admin token")


# ---------- public ----------

@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/portfolio", response_model=schemas.PortfolioOut)
def portfolio(db: Session = Depends(get_db)):
    profile = db.scalar(select(models.Profile).limit(1))
    if not profile:
        raise HTTPException(404, "Profile not seeded. Run: python -m app.seed")
    return schemas.PortfolioOut(
        site=schemas.SiteOut.model_validate(profile),
        about=schemas.AboutOut.model_validate(profile),
        skills=db.scalars(select(models.Skill).order_by(models.Skill.position, models.Skill.id)).all(),
        projects=db.scalars(select(models.Project).order_by(models.Project.position, models.Project.id)).all(),
        certificates=db.scalars(select(models.Certificate).order_by(models.Certificate.position, models.Certificate.id)).all(),
    )


@app.get("/api/projects", response_model=list[schemas.ProjectOut])
def list_projects(db: Session = Depends(get_db)):
    return db.scalars(select(models.Project).order_by(models.Project.position, models.Project.id)).all()


@app.get("/api/certificates", response_model=list[schemas.CertificateOut])
def list_certificates(db: Session = Depends(get_db)):
    return db.scalars(select(models.Certificate).order_by(models.Certificate.position, models.Certificate.id)).all()


@app.post("/api/contact", status_code=201)
def send_contact(payload: schemas.ContactIn, db: Session = Depends(get_db)):
    db.add(models.ContactMessage(name=payload.name.strip(), email=payload.email, message=payload.message.strip()))
    db.commit()
    return {"ok": True}


# ---------- admin (send header  X-Admin-Token: <ADMIN_TOKEN>) ----------

@app.get("/api/admin/messages", response_model=list[schemas.ContactOut], dependencies=[Depends(require_admin)])
def list_messages(db: Session = Depends(get_db)):
    return db.scalars(select(models.ContactMessage).order_by(models.ContactMessage.created_at.desc())).all()


@app.post("/api/admin/projects", response_model=schemas.ProjectOut, status_code=201, dependencies=[Depends(require_admin)])
def create_project(payload: schemas.ProjectIn, db: Session = Depends(get_db)):
    obj = models.Project(**payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@app.put("/api/admin/projects/{pid}", response_model=schemas.ProjectOut, dependencies=[Depends(require_admin)])
def update_project(pid: int, payload: schemas.ProjectIn, db: Session = Depends(get_db)):
    obj = db.get(models.Project, pid)
    if not obj:
        raise HTTPException(404, "Project not found")
    for k, v in payload.model_dump().items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj


@app.delete("/api/admin/projects/{pid}", status_code=204, dependencies=[Depends(require_admin)])
def delete_project(pid: int, db: Session = Depends(get_db)):
    obj = db.get(models.Project, pid)
    if not obj:
        raise HTTPException(404, "Project not found")
    db.delete(obj)
    db.commit()


@app.post("/api/admin/certificates", response_model=schemas.CertificateOut, status_code=201, dependencies=[Depends(require_admin)])
def create_certificate(payload: schemas.CertificateIn, db: Session = Depends(get_db)):
    obj = models.Certificate(**payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@app.put("/api/admin/certificates/{cid}", response_model=schemas.CertificateOut, dependencies=[Depends(require_admin)])
def update_certificate(cid: int, payload: schemas.CertificateIn, db: Session = Depends(get_db)):
    obj = db.get(models.Certificate, cid)
    if not obj:
        raise HTTPException(404, "Certificate not found")
    for k, v in payload.model_dump().items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj


@app.delete("/api/admin/certificates/{cid}", status_code=204, dependencies=[Depends(require_admin)])
def delete_certificate(cid: int, db: Session = Depends(get_db)):
    obj = db.get(models.Certificate, cid)
    if not obj:
        raise HTTPException(404, "Certificate not found")
    db.delete(obj)
    db.commit()


@app.put("/api/admin/profile", response_model=schemas.SiteOut, dependencies=[Depends(require_admin)])
def update_profile(payload: dict, db: Session = Depends(get_db)):
    """Partial update. Allowed keys: email, linkedin, github, portrait, about_photo, bio, interests, approach, goals."""
    allowed = {"email", "linkedin", "github", "portrait", "about_photo", "bio", "interests", "approach", "goals"}
    profile = db.scalar(select(models.Profile).limit(1))
    if not profile:
        raise HTTPException(404, "Profile not seeded")
    for k, v in payload.items():
        if k in allowed and isinstance(v, str):
            setattr(profile, k, v)
    db.commit()
    db.refresh(profile)
    return profile
