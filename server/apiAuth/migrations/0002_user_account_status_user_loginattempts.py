# Generated by Django 5.2 on 2025-04-08 04:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiAuth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='account_status',
            field=models.CharField(choices=[('active', 'Active'), ('inactive', 'Inactive'), ('inactive', 'Suspended')], default='active', max_length=20),
        ),
        migrations.AddField(
            model_name='user',
            name='loginAttempts',
            field=models.IntegerField(default=0),
        ),
    ]
