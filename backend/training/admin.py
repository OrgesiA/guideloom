from django.contrib import admin
from .models import TrainingProgram, Task, TaskSubmission, ReviewFeedback, KnowledgeEntry, InternQuestion

admin.site.register(TrainingProgram)
admin.site.register(Task)
admin.site.register(TaskSubmission)
admin.site.register(ReviewFeedback)
admin.site.register(KnowledgeEntry)
admin.site.register(InternQuestion)
