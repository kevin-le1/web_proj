from django.http import JsonResponse

# hard setting all of the json data, waits for url requests to send data
def candlestick_data(request):
    data = {
        "candlestick": [
            {"x": "2024-09-10", "o": 100, "h": 120, "l": 90, "c": 110},
            {"x": "2024-09-11", "o": 110, "h": 130, "l": 105, "c": 125},
        ]
    }
    return JsonResponse(data)

def line_chart_data(request):
    data = {
        "labels": ["January", "February", "March", "April", "May"],
        "data": [65, 59, 80, 81, 56]
    }
    return JsonResponse(data)

def bar_chart_data(request):
    data = {
        "labels": ["January", "February", "March", "April", "May"],
        "data": [12, 19, 3, 5, 2]
    }
    return JsonResponse(data)

def pie_chart_data(request):
    data = {
        "labels": ["Red", "Blue", "Yellow", "Green"],
        "data": [12, 19, 3, 5]
    }
    return JsonResponse(data)
