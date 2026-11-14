from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ORM(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class SiteOut(ORM):
    email: str
    linkedin: str
    github: str
    portrait: str
    about_photo: str


class AboutOut(ORM):
    bio: str
    interests: str
    approach: str
    goals: str


class SkillOut(ORM):
    id: int
    name: str
    icon: str
    bg: str


class ProjectIn(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    icon: str = "📈"
    description: str = ""
    tech: list[str] = []
    url: str = ""
    code: str = ""
    position: int = 0


class ProjectOut(ORM):
    id: int
    title: str
    icon: str
    description: str
    tech: list[str]
    url: str
    code: str


class CertificateIn(BaseModel):
    provider: str = ""
    title: str = Field(min_length=1, max_length=300)
    icon: str = "🏆"
    date: str = ""
    url: str = ""
    position: int = 0


class CertificateOut(ORM):
    id: int
    provider: str
    title: str
    icon: str
    date: str
    url: str


class PortfolioOut(BaseModel):
    """Everything the page needs, in one request."""

    site: SiteOut
    about: AboutOut
    skills: list[SkillOut]
    projects: list[ProjectOut]
    certificates: list[CertificateOut]


class ContactIn(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)


class ContactOut(ORM):
    id: int
    name: str
    email: str
    message: str
    created_at: datetime
