import azure.functions as func
import logging
from datetime import datetime
import time
import apps.help as helpApp
import apps.greeting as greetingApp
import apps.home as homeApp

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="page")
def page(req: func.HttpRequest) -> func.HttpResponse:
    flags = req.params.get('flags')
    if not flags:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            flags = req_body.get('flags')
    logging.info(flags)

    if flags:
        return func.HttpResponse('{"data":"<div>Hello from <b>API</b> </div>"}')
    else:
        return func.HttpResponse(
             '{"data":"<div>Hello from <b>API</b> </div>"}',
             status_code=200
        )
    
@app.route(route="ping")
def ping(req: func.HttpRequest) -> func.HttpResponse:
    now = datetime.now()
    formatted_date_time = now.strftime("%A %d %B %Y at %I.%M%p")
    time.sleep(2)
    return func.HttpResponse('{"data":"Response from api at '+formatted_date_time+'"}')

@app.route(route="help")
def help(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse('{"data":"'+helpApp.help()+'"}')

@app.route(route="greeting")
def greeting(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse('{"data":"'+greetingApp.greeting()+'"}')

@app.route(route="home")
def home(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse('{"data":"'+homeApp.home()+'"}')