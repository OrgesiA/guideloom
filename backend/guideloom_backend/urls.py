from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from training import views as training_views
from accounts.views import AuthView, RegisterView

router = routers.DefaultRouter()
router.register(r"programs", training_views.TrainingProgramViewSet, basename="program")
router.register(r"tasks", training_views.TaskViewSet, basename="task")
router.register(r"submissions", training_views.TaskSubmissionViewSet, basename="submission")
router.register(r"reviews", training_views.ReviewFeedbackViewSet, basename="review")
router.register(r"knowledge", training_views.KnowledgeEntryViewSet, basename="knowledge")
router.register(r"questions", training_views.InternQuestionViewSet, basename="question")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/token/", AuthView.as_view(), name="token_obtain_pair"),
    path("api/auth/signup/", RegisterView.as_view(), name="signup"),
    path("api/", include(router.urls)),
]
