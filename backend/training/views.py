from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import TrainingProgram, Task, TaskSubmission, ReviewFeedback, KnowledgeEntry, InternQuestion
from .serializers import (
    TrainingProgramSerializer,
    TaskSerializer,
    TaskSubmissionSerializer,
    ReviewFeedbackSerializer,
    KnowledgeEntrySerializer,
    InternQuestionSerializer,
)


class IsMentor(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == "MENTOR")


class TrainingProgramViewSet(viewsets.ModelViewSet):
    queryset = TrainingProgram.objects.all().select_related("mentor")
    serializer_class = TrainingProgramSerializer

    def perform_create(self, serializer):
        mentor = self.request.user
        serializer.save(mentor=mentor)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().select_related("training_program", "created_by")
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TaskSubmissionViewSet(viewsets.ModelViewSet):
    queryset = TaskSubmission.objects.all().select_related("task", "intern")
    serializer_class = TaskSubmissionSerializer

    def perform_create(self, serializer):
        serializer.save(intern=self.request.user)


class ReviewFeedbackViewSet(viewsets.ModelViewSet):
    queryset = ReviewFeedback.objects.all().select_related("submission")
    serializer_class = ReviewFeedbackSerializer


class KnowledgeEntryViewSet(viewsets.ModelViewSet):
    queryset = KnowledgeEntry.objects.all().select_related("context_task")
    serializer_class = KnowledgeEntrySerializer

    @action(detail=False, methods=["get"], url_path="search")
    def search(self, request):
        q = request.query_params.get("q", "")
        scope = request.query_params.get("scope")
        entries = self.queryset
        if scope:
            entries = entries.filter(scope=scope)
        if q:
            entries = entries.filter(question__icontains=q)
        serializer = self.get_serializer(entries[:50], many=True)
        return Response(serializer.data)


class InternQuestionViewSet(viewsets.ModelViewSet):
    queryset = InternQuestion.objects.all().select_related("intern", "related_task")
    serializer_class = InternQuestionSerializer

    def perform_create(self, serializer):
        serializer.save(intern=self.request.user)
