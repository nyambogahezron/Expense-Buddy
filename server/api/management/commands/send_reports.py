from django.core.management.base import BaseCommand
from django.utils import timezone
from api.reports import schedule_and_send_reports
import logging

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Checks for scheduled reports that need to be sent today and sends them"

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting report scheduler check...")

        try:
            # Call the function to check and send reports
            schedule_and_send_reports()
            self.stdout.write(
                self.style.SUCCESS("Successfully processed scheduled reports")
            )
        except Exception as e:
            logger.error(f"Error processing scheduled reports: {str(e)}")
            self.stdout.write(
                self.style.ERROR(f"Error processing scheduled reports: {str(e)}")
            )
