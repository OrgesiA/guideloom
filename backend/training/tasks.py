from celery import shared_task


@shared_task
def generate_embedding(entry_id: int):
    # TODO: implement embedding generation and persistence
    return entry_id


@shared_task
def qa_draft(question_id: int):
    # TODO: draft answer with confidence and sources
    return question_id


@shared_task
def review_draft(submission_id: int):
    # TODO: draft code review suggestions
    return submission_id


@shared_task
def weekly_weak_concept_scan(program_id: int):
    # TODO: compute weak concepts using embeddings and scores
    return program_id
