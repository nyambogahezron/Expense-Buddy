# Generated by Django 5.2 on 2025-04-14 11:46

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_transaction_category_reportpreference_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('log_retention_days', models.IntegerField(default=30, help_text='Number of days to retain request logs')),
                ('slow_request_threshold', models.FloatField(default=1.0, help_text='Threshold in seconds to mark a request as slow')),
                ('analytics_enabled', models.BooleanField(default=True)),
                ('email_footer', models.TextField(blank=True, help_text='Footer text to include in all admin emails')),
            ],
            options={
                'verbose_name': 'Admin Settings',
                'verbose_name_plural': 'Admin Settings',
            },
        ),
        migrations.CreateModel(
            name='AdminBulkEmail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=255)),
                ('message', models.TextField()),
                ('recipient_count', models.IntegerField()),
                ('sent_at', models.DateTimeField(auto_now_add=True)),
                ('user_filter', models.JSONField(blank=True, help_text='Filters used to select recipients', null=True)),
                ('sent_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Admin Bulk Email',
                'verbose_name_plural': 'Admin Bulk Emails',
                'ordering': ['-sent_at'],
            },
        ),
        migrations.CreateModel(
            name='RequestLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.CharField(max_length=255)),
                ('method', models.CharField(max_length=10)),
                ('status_code', models.IntegerField()),
                ('user_id', models.IntegerField(blank=True, null=True)),
                ('ip_address', models.GenericIPAddressField(blank=True, null=True)),
                ('duration', models.FloatField(help_text='Request duration in seconds')),
                ('query_count', models.IntegerField(default=0)),
                ('query_time', models.FloatField(default=0)),
                ('date', models.DateTimeField()),
            ],
            options={
                'verbose_name': 'Request Log',
                'verbose_name_plural': 'Request Logs',
                'ordering': ['-date'],
                'indexes': [models.Index(fields=['path'], name='api_request_path_d413ac_idx'), models.Index(fields=['date'], name='api_request_date_ed39d3_idx'), models.Index(fields=['user_id'], name='api_request_user_id_079cf3_idx')],
            },
        ),
    ]
