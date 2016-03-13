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
                         (None, {'fields': ('twitter_handle', 'homebase', 'profession', 'current_location')}),
                         ('Blurb', {'fields': ('blurb',)}), ]
            return fieldsets
        else:
            # create
            fieldsets = [(None, {'fields': ('first_name', 'last_name')}),
                         (None, {'fields': ('twitter_handle', 'homebase', 'profession', 'current_location')}),
                         ('Blurb', {'fields': ('blurb',)}), ]
            return fieldsets


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    ordering = ('name',)
    search_fields = ('name',)

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

    def get_fieldsets(self, request, obj=None):
        if obj:
            # update
            fieldsets = [(None, {'fields': ('id', 'name')}),]
            return fieldsets
        else:
            # create
            fieldsets = [(None, {'fields': ('id', 'name')}),]
            return fieldsets
