import os
from azure.storage.blob import BlobServiceClient, generate_blob_sas, BlobSasPermissions
from datetime import datetime, timedelta, timezone
import urllib.request
import json
from apps.models.cpustat import cpustatLatestType


def success() -> str:

    account_name: str = os.environ["StorageAccountName"]
    account_key: str = os.environ["StorageAccountKey"]
    container_name: str = os.environ["CPUStatContainerName"]
    blob_name: str = "cpustat-latest.json"

    # generate a shared access signature for each blob file
    sas_i = generate_blob_sas(account_name=account_name,
                              container_name=container_name,
                              blob_name=blob_name,
                              account_key=account_key,
                              permission=BlobSasPermissions(read=True),
                              expiry=datetime.now(timezone.utc) + timedelta(hours=1))

    sas_url = 'https://' + account_name+'.blob.core.windows.net/' + \
        container_name + '/' + blob_name + '?' + sas_i

    with urllib.request.urlopen(sas_url) as resp:

        # data = cpustatLatestType(**json.loads(resp.read().decode('utf-8')))
        data = cpustatLatestType(json.loads(
            resp.read().decode('utf-8')))

    multiline_string = f"""<b>CPU Server Monitoring - Latest</b>
    <p>Serving the latest details for CPU servers.
    Details last updated: -datetime-</p>"""

    for server in data.servers:
        s: str = "<p>"

        # is server up?
        if server.ping:
            s = f"{s}{server.name}:<br>"
            s = f"{s}<span class='hst-indent'>Load:&nbsp;&nbsp;&nbsp;{server.load_average}</span><br>"
            s = f"{s}<span class='hst-indent'>Procs:&nbsp;&nbsp;{server.running_procs}</span><br>"
            s = f"{s}<span class='hst-indent'>Uptime:&nbsp;{server.uptime}</span>"
        else:
            s = f"{s}<span class='hst-error'><i>{server.name} (down)</i>:</span><br>"

        s = f"{s}</p>"

        multiline_string = multiline_string + s

    single_line_string = multiline_string.replace('\n', '<br>')
    return single_line_string
