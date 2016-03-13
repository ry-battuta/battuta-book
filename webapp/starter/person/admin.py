from django.contrib import admin

# Register your models here.
from .models import Person

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name',)
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