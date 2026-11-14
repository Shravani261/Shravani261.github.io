from datetime import datetime, timezone

from sqlalchemy import JSON, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


def _now() -> datetime:
    return datetime.now(timezone.utc)


class Profile(Base):
    """Single-row table: site-wide settings and the About copy."""

    __tablename__ = "profile"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), default="")
    linkedin: Mapped[str] = mapped_column(String(500), default="")
    github: Mapped[str] = mapped_column(String(500), default="")
    portrait: Mapped[str] = mapped_column(String(500), default="")
    about_photo: Mapped[str] = mapped_column(String(500), default="")
    bio: Mapped[str] = mapped_column(Text, default="")
    interests: Mapped[str] = mapped_column(Text, default="")
    approach: Mapped[str] = mapped_column(Text, default="")
    goals: Mapped[str] = mapped_column(Text, default="")


class Skill(Base):
    __tablename__ = "skills"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True)
    icon: Mapped[str] = mapped_column(String(20))
    bg: Mapped[str] = mapped_column(String(20), default="#e5e7eb")
    position: Mapped[int] = mapped_column(Integer, default=0)


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    icon: Mapped[str] = mapped_column(String(20), default="📈")
    description: Mapped[str] = mapped_column(Text, default="")
    tech: Mapped[list] = mapped_column(JSON, default=list)
    url: Mapped[str] = mapped_column(String(500), default="")
    code: Mapped[str] = mapped_column(String(500), default="")
    position: Mapped[int] = mapped_column(Integer, default=0)


class Certificate(Base):
    __tablename__ = "certificates"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    provider: Mapped[str] = mapped_column(String(200), default="")
    title: Mapped[str] = mapped_column(String(300))
    icon: Mapped[str] = mapped_column(String(20), default="🏆")
    date: Mapped[str] = mapped_column(String(50), default="")
    url: Mapped[str] = mapped_column(String(500), default="")
    position: Mapped[int] = mapped_column(Integer, default=0)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(200))
    email: Mapped[str] = mapped_column(String(255))
    message: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)
