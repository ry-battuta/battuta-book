import uuid, hashlib
from rest_framework.authtoken.models import Token

from django.db import models
from django.db.models.signals import post_save, pre_save


class Tag(models.Model):

    class Meta:
        db_table = 'tag'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, blank=True)
    group = models.CharField(max_length=100, blank=True)


class Question(models.Model):

    class Meta:
        db_table = 'question'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, blank=True)


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

    first_name = models.CharField(max_length=60, blank=True)
    last_name = models.CharField(max_length=60, blank=True)

    homebase = models.CharField(max_length=100, blank=True)
    profession = models.CharField(max_length=100, blank=True)
    current_location = models.CharField(max_length=100, blank=True)
    blurb = models.TextField(max_length=200, blank=True)

    ry_gen_name = models.CharField(max_length=40, blank=True)
    ry_gen_date = models.DateField(null=True, blank=True)

    social_website = models.CharField(max_length=255, blank=True)
    social_facebook = models.CharField(max_length=255, blank=True)
    social_instagram = models.CharField(max_length=255, blank=True)
    social_twitter = models.CharField(max_length=255, blank=True)
    social_linkedin = models.CharField(max_length=255, blank=True)
    social_medium = models.CharField(max_length=255, blank=True)
    social_podcast = models.CharField(max_length=255, blank=True)
    social_other = models.CharField(max_length=255, blank=True)

    # relationships
    tags = models.ManyToManyField(Tag)
    questions = models.ManyToManyField(Question)

    def get_full_name(self):
        # The user is identified by their email address
        return self.first_name + " " + self.last_name


    def get_avatar(self):
        email = self.email
        size = 400
        gravatar_url = "http://www.gravatar.com/avatar/" + hashlib.md5(email.lower()).hexdigest() + "?s=" + str(size)
        return  gravatar_url

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


def ensure_lower_case_name(instance, sender, **kwargs):
    instance.name = instance.name.lower()
# SIGNALS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

# Attach signals to User model
pre_save.connect(ensure_lower_case_email, sender=Person)
pre_save.connect(ensure_lower_case_name, sender=Tag)
pre_save.connect(ensure_lower_case_name, sender=Question)
#post_save.connect(generate_token_on_creation, sender=Person)