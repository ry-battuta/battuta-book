# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-03-13 15:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('person', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='first_name',
            field=models.CharField(blank=True, max_length=40),
        ),
        migrations.AddField(
            model_name='person',
            name='last_name',
            field=models.CharField(blank=True, max_length=40),
        ),
    ]
