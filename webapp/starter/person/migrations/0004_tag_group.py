# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-03-13 18:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('person', '0003_auto_20160313_1802'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='group',
            field=models.CharField(blank=True, max_length=40),
        ),
    ]
