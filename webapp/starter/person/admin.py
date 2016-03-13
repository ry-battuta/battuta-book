from django.contrib import admin

# Register your models here.
from .models import Person, Tag, Question


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name',)
    ordering = ('id',)
    search_fields = ('name', 'id')
    readonly_fields = ('id',)

    def get_fieldsets(self, request, obj=None):
        if obj:
            # update
            fieldsets = [(None, {'fields': ('id', 'first_name', 'last_name')}),
                         ('basics', {'fields': ('homebase', 'current_location', 'profession')}),
                         ('remote_year', {'fields': ('ry_gen_name', 'ry_gen_date')}),
                         ('admin', {'fields': ('is_active', 'is_admin')}),
                         ('social', {'fields': ('social_website', 'social_facebook', 'social_instagram', 'social_twitter', 'social_linkedin', 'social_medium', 'social_podcast', 'social_other')}),
                         ('Blurb', {'fields': ('blurb',)}), ]
            return fieldsets
        else:
            # create
            fieldsets = [(None, {'fields': ('id', 'first_name', 'last_name')}),
                         ('basics', {'fields': ('homebase', 'current_location', 'profession')}),
                         ('remote_year', {'fields': ('ry_gen_name', 'ry_gen_date')}),
                         ('admin', {'fields': ('is_active', 'is_admin')}),
                         ('social', {'fields': ('social_website', 'social_facebook', 'social_instagram', 'social_twitter', 'social_linkedin', 'social_medium', 'social_podcast', 'social_other')}),
                         ('Blurb', {'fields': ('blurb',)}), ]
            return fieldsets


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    ordering = ('name',)
    search_fields = ('name',)
    readonly_fields = ('id',)

    def get_fieldsets(self, request, obj=None):
        if obj:
            # update
            fieldsets = [(None, {'fields': ('id', 'name')}),]
            return fieldsets
        else:
            # create
            fieldsets = [(None, {'fields': ('id', 'name')}),]
            return fieldsets


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('name',)
    ordering = ('name',)
    search_fields = ('name',)
    readonly_fields = ('id',)

    def get_fieldsets(self, request, obj=None):
        if obj:
            # update
            fieldsets = [(None, {'fields': ('id', 'name')}),]
            return fieldsets
        else:
            # create
            fieldsets = [(None, {'fields': ('id', 'name')}),]
            return fieldsets
