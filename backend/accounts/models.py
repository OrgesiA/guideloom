from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        MENTOR = "MENTOR", "Mentor"
        INTERN = "INTERN", "Intern"

    name = models.CharField(max_length=200, blank=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.INTERN)
    created_at = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = ["email", "name"]

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.username or self.email
