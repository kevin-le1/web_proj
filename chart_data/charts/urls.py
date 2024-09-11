from django.urls import path
from . import views

# creating urls for our charts views based on data name 

# With these urls you should be able to open localhost:8000/x all data is in port 8000 indicated in settings.py
urlpatterns = [
    path('candlestick-data/', views.candlestick_data, name='candlestick_data'),
    path('line-chart-data/', views.line_chart_data, name='line_chart_data'),
    path('bar-chart-data/', views.bar_chart_data, name='bar_chart_data'),
    path('pie-chart-data/', views.pie_chart_data, name='pie_chart_data'),
]