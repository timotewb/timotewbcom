import azure.functions as func
import logging

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="page")
def page(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

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