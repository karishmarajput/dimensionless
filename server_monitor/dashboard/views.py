from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Count
from .models import Server, Alert, ResourceUsage, NetworkTraffic

@api_view(['GET'])
def alerts_data(request):
    """
    Returns the count of alerts grouped by alert_type (critical, medium, low)
    from the database.
    """
    # Group alerts by alert_type and count them
    alert_counts = Alert.objects.values('alert_type').annotate(count=Count('id'))
    
    # Initialize dictionary with default counts
    data = {"critical": 0, "medium": 0, "low": 0}
    
    # Update the counts based on the query result
    for alert in alert_counts:
        alert_type = alert['alert_type']
        data[alert_type] = alert['count']
    
    return Response(data)

@api_view(['GET'])
def resource_usage(request):
    """
    Returns the most recent 6 resource usage records from the database,
    and extracts CPU, RAM, disk, and app usage into separate arrays.
    """
    # Get the latest 6 resource usage records (most recent first)
    usages_qs = ResourceUsage.objects.order_by('-timestamp')[:6]
    # Reverse them so that they are in chronological order (oldest first)
    usages = list(usages_qs)[::-1]
    
    data = {
        "cpu": [usage.cpu_usage for usage in usages],
        "ram": [usage.ram_usage for usage in usages],
        "disk": [usage.disk_usage for usage in usages],
        "app_usage": [usage.app_usage for usage in usages]
    }
    return Response(data)

@api_view(['GET'])
def network_traffic(request):
    network_qs = NetworkTraffic.objects.order_by("timestamp")[:6]
    timestamps = [nt.timestamp.strftime("%H:%M") for nt in network_qs]
    traffic = [nt.incoming_traffic for nt in network_qs]
    data = {
        "timestamps": timestamps,
        "traffic": traffic
    }
    return Response(data)

@api_view(['GET'])
def servers_list(request):
    """
    Returns a list of servers and their information from the database.
    """
    servers_qs = Server.objects.all().values('id', 'name', 'ip', 'status')
    servers = list(servers_qs)
    return Response(servers)
