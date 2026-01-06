from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import TrainingProgram, Task, TaskSubmission, ReviewFeedback, KnowledgeEntry, InternQuestion


class TrainingProgramSerializer(serializers.ModelSerializer):
    mentor = UserSerializer(read_only=True)
    mentor_id = serializers.PrimaryKeyRelatedField(write_only=True, source="mentor", queryset=TrainingProgram._meta.get_field("mentor").remote_field.model.objects.all())

    class Meta:
        model = TrainingProgram
        fields = ["id", "title", "start_date", "end_date", "mentor", "mentor_id", "created_at"]
        read_only_fields = ["id", "created_at", "mentor"]


class TaskSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    created_by_id = serializers.PrimaryKeyRelatedField(write_only=True, source="created_by", queryset=Task._meta.get_field("created_by").remote_field.model.objects.all())

    class Meta:
        model = Task
        fields = [
            "id",
            "training_program",
            "title",
            "description",
            "difficulty",
            "week_number",
            "created_by",
            "created_by_id",
            "status",
            "due_date",
            "created_at",
        ]
        read_only_fields = ["id", "created_by", "created_at"]


class TaskSubmissionSerializer(serializers.ModelSerializer):
    intern = UserSerializer(read_only=True)
    intern_id = serializers.PrimaryKeyRelatedField(write_only=True, source="intern", queryset=TaskSubmission._meta.get_field("intern").remote_field.model.objects.all())

    class Meta:
        model = TaskSubmission
        fields = ["id", "task", "intern", "intern_id", "code", "submitted_at"]
        read_only_fields = ["id", "submitted_at", "intern"]


class ReviewFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewFeedback
        fields = [
            "id",
            "submission",
            "mentor_comment",
            "ai_suggested_feedback",
            "final_score",
            "ai_confidence",
            "ai_escalated",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class KnowledgeEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeEntry
        fields = [
            "id",
            "source_type",
            "question",
            "answer",
            "code_snippet",
            "context_task",
            "embedding",
            "approved",
            "scope",
            "tags",
            "created_at",
        ]
        read_only_fields = ["id", "created_at", "embedding"]


class InternQuestionSerializer(serializers.ModelSerializer):
    intern = UserSerializer(read_only=True)
    intern_id = serializers.PrimaryKeyRelatedField(write_only=True, source="intern", queryset=InternQuestion._meta.get_field("intern").remote_field.model.objects.all())

    class Meta:
        model = InternQuestion
        fields = [
            "id",
            "intern",
            "intern_id",
            "question",
            "related_task",
            "ai_draft_answer",
            "mentor_approved_answer",
            "confidence_score",
            "ai_escalated",
            "created_at",
        ]
        read_only_fields = ["id", "intern", "created_at", "ai_draft_answer", "mentor_approved_answer", "confidence_score", "ai_escalated"]
