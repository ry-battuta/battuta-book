import uuid
from rest_framework.authtoken.models import Token

from django.db import models
from django.db.models.signals import post_save, pre_save

class Person(models.Model):

    class Meta:
        db_table = 'person'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    token = models.CharField(max_length=40, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    twitter_handle = models.CharField(max_length=40, blank=True)
    homebase = models.CharField(max_length=40, blank=True)
    profession = models.CharField(max_length=40, blank=True)
    current_location = models.CharField(max_length=40, blank=True)
    blurb = models.TextField(max_length=200, blank=True)

    #avatar = models.CharField(max_length=40, blank=True)
    #passions = LIST
    #skills = LIST

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

# SIGNALS METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
#
# def generate_token_on_creation(instance, **kwargs):
#     """ Creates an api token for a user/Account if one doesn't already exit """
#     instance = instance
#     if instance and not instance.token:
#         if type(instance) is Person:
#             token = Token.objects.create(user=instance)
#             instance.token = token.key
#             instance.save()


def ensure_lower_case_email(instance, sender, **kwargs):
    instance.email = instance.email.lower()

# SIGNALS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

# Attach signals to User model
#pre_save.connect(ensure_lower_case_email, sender=Person)
#post_save.connect(generate_token_on_creation, sender=Person)