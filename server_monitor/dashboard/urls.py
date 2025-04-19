from django.urls import path
from .views import alerts_data, resource_usage, network_traffic, servers_list

urlpatterns = [
    path('alerts/', alerts_data, name='alerts'),
    path('resources/', resource_usage, name='resources'),
    path('network/', network_traffic, name='network'),
    path('servers/', servers_list, name='servers'),
]
