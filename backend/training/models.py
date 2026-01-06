from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class TrainingProgram(models.Model):
    title = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()
    mentor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="programs")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:  # pragma: no cover
        return self.title


class Task(models.Model):
    class Difficulty(models.TextChoices):
        EASY = "EASY", "Easy"
        MEDIUM = "MEDIUM", "Medium"
        HARD = "HARD", "Hard"

    class Status(models.TextChoices):
        ACTIVE = "ACTIVE", "Active"
        ARCHIVED = "ARCHIVED", "Archived"

    training_program = models.ForeignKey(TrainingProgram, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=200)
    description = models.TextField()
    difficulty = models.CharField(max_length=10, choices=Difficulty.choices, default=Difficulty.MEDIUM)
    week_number = models.PositiveIntegerField()
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="created_tasks")
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.ACTIVE)
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:  # pragma: no cover
        return self.title


class TaskSubmission(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="submissions")
    intern = models.ForeignKey(User, on_delete=models.CASCADE, related_name="submissions")
    code = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)


class ReviewFeedback(models.Model):
    submission = models.OneToOneField(TaskSubmission, on_delete=models.CASCADE, related_name="review")
    mentor_comment = models.TextField(blank=True)
    ai_suggested_feedback = models.TextField(blank=True)
    final_score = models.PositiveIntegerField(null=True, blank=True)
    ai_confidence = models.FloatField(null=True, blank=True)
    ai_escalated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class KnowledgeEntry(models.Model):
    class SourceType(models.TextChoices):
        MENTOR_FEEDBACK = "MENTOR_FEEDBACK", "Mentor Feedback"
        MENTOR_EXPLANATION = "MENTOR_EXPLANATION", "Mentor Explanation"
        CODE_REVIEW = "CODE_REVIEW", "Code Review"
        QA = "QA", "Q&A"

    class Scope(models.TextChoices):
        COMPANY = "COMPANY", "Company"
        GENERAL = "GENERAL", "General"

    source_type = models.CharField(max_length=30, choices=SourceType.choices)
    question = models.TextField()
    answer = models.TextField()
    code_snippet = models.TextField(blank=True)
    context_task = models.ForeignKey(Task, on_delete=models.SET_NULL, null=True, blank=True, related_name="knowledge_entries")
    embedding = models.JSONField(null=True, blank=True)
    approved = models.BooleanField(default=False)
    scope = models.CharField(max_length=10, choices=Scope.choices, default=Scope.COMPANY)
    tags = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["scope", "approved"])]


class InternQuestion(models.Model):
    intern = models.ForeignKey(User, on_delete=models.CASCADE, related_name="questions")
    question = models.TextField()
    related_task = models.ForeignKey(Task, on_delete=models.SET_NULL, null=True, blank=True, related_name="questions")
    ai_draft_answer = models.TextField(blank=True)
    mentor_approved_answer = models.TextField(blank=True)
    confidence_score = models.FloatField(null=True, blank=True)
    ai_escalated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
