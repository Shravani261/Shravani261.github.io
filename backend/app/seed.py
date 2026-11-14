"""Seeds the database with the content from the original portfolio.

Run:  python -m app.seed          (only fills empty tables)
      python -m app.seed --reset  (wipes content tables, then re-seeds)
"""
import sys

from sqlalchemy import select

from .database import Base, SessionLocal, engine
from .models import Certificate, ContactMessage, Profile, Project, Skill

SKILLS = [
    ("Python", "🐍", "#dbeafe"),
    ("SQL", "SQL", "#e5e7eb"),
    ("Power BI", "📊", "#fde9a9"),
    ("Data Visualization", "📈", "#e0dcff"),
    ("Microsoft Excel", "X", "#c9efd6"),
]

PROJECTS = [
    dict(title="Bank Transaction Classification", icon="📈",
         description="Classifies raw bank transactions into spending categories using text features and a supervised model.",
         tech=["Python", "scikit-learn", "Pandas"], url="", code=""),
    dict(title="Video Game Sales Dashboard", icon="🎮",
         description="Interactive dashboard exploring global game sales by platform, genre and publisher.",
         tech=["SQL", "Power BI"], url="", code=""),
    dict(title="Movie Recommendation System", icon="▶️",
         description="Recommends movies from viewing patterns and content similarity.",
         tech=["Python", "NumPy", "Pandas"], url="", code=""),
]

CERTS = [
    dict(provider="IBM", title="Machine Learning for Data Science", icon="🔷", date="", url=""),
    dict(provider="Anthropic", title="AI Fluency Framework", icon="✳️", date="", url=""),
    dict(provider="", title="Champions at Work", icon="🏆", date="", url=""),
]

PROFILE = dict(
    email="your-email@example.com",  # PLACEHOLDER - change me
    linkedin="",
    github="",
    portrait="",       # e.g. "/portrait.png" (file in frontend/public) or a URL
    about_photo="",
    bio="I’m a data analyst who enjoys turning messy data into clear answers. I like finding the pattern behind a number and explaining it in plain language.",
    interests="Data cleaning, SQL analytics, dashboards, machine learning basics.",
    approach="Start with the question, check the data’s quality, build the simplest analysis that answers it, then present it visually.",
    goals="Grow as an analyst, ship projects that help teams decide faster, and keep learning.",
)


def seed(reset: bool = False) -> None:
    Base.metadata.create_all(engine)
    with SessionLocal() as db:
        if reset:
            for model in (Skill, Project, Certificate, Profile):
                db.query(model).delete()
            db.commit()

        if not db.scalar(select(Profile).limit(1)):
            db.add(Profile(**PROFILE))
        if not db.scalar(select(Skill).limit(1)):
            db.add_all(Skill(name=n, icon=i, bg=b, position=k) for k, (n, i, b) in enumerate(SKILLS))
        if not db.scalar(select(Project).limit(1)):
            db.add_all(Project(position=k, **p) for k, p in enumerate(PROJECTS))
        if not db.scalar(select(Certificate).limit(1)):
            db.add_all(Certificate(position=k, **c) for k, c in enumerate(CERTS))
        db.commit()
    print("Database seeded.")


if __name__ == "__main__":
    seed(reset="--reset" in sys.argv)
