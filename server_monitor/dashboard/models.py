from django.db import models

# Server info model
class Server(models.Model):
    name = models.CharField(max_length=100)
    ip = models.GenericIPAddressField()
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.name

# Alert model with choices (critical, medium, low)
class Alert(models.Model):
    ALERT_CHOICES = (
        ('critical', 'Critical'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    )
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='alerts')
    alert_type = models.CharField(max_length=20, choices=ALERT_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.server.name} - {self.alert_type}"

# Model for resource usage data
class ResourceUsage(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='resource_usages')
    timestamp = models.DateTimeField(auto_now_add=True)
    cpu_usage = models.FloatField()  # as percentage
    ram_usage = models.FloatField()  # as percentage
    disk_usage = models.FloatField() # as percentage
    app_usage = models.FloatField()  # as percentage

    def __str__(self):
        return f"{self.server.name} @ {self.timestamp}"

# Model for network traffic data
class NetworkTraffic(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='network_traffics')
    timestamp = models.DateTimeField(auto_now_add=True)
    incoming_traffic = models.FloatField()  # e.g., bytes or MB

    def __str__(self):
        return f"{self.server.name} - {self.timestamp}"
