from rest_framework import serializers
from .models import Person

class PersonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'token', 'first_name', 'last_name', 'homebase', 'profession', 'current_location', 'blurb',
                  'ry_gen_name', 'ry_gen_date',
                  'social_website', 'social_facebook', 'social_instagram', 'social_twitter', 'social_linkedin', 'social_medium', 'social_podcast', 'social_other')

class PersonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Person
        fields = ('id', 'token', 'first_name', 'last_name', 'homebase', 'profession', 'current_location', 'blurb',
                  'ry_gen_name', 'ry_gen_date',
                  'social_website', 'social_facebook', 'social_instagram', 'social_twitter', 'social_linkedin', 'social_medium', 'social_podcast', 'social_other')
