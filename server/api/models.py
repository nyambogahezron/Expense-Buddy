from django.db import models


class Transaction(models.Model):
    user = models.ForeignKey("apiAuth.User", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    transaction_fee = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)
    type = models.CharField(
        max_length=50, choices=[("income", "Income"), ("expense", "Expense")]
    )
    color = models.CharField(max_length=7, default="#FFFFFF")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    receipt = models.FileField(upload_to="receipts/", blank=True, null=True)

    def __str__(self):
        return f"Transaction {self.id} - Amount: {self.amount}"

    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"
        ordering = ["-date"]


class Category(models.Model):
    user = models.ForeignKey("apiAuth.User", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    color = models.CharField(max_length=7, default="#FFFFFF")
    icon = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ["name"]
