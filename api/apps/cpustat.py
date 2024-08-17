import os
from azure.storage.blob import BlobServiceClient, generate_blob_sas, BlobSasPermissions
from datetime import datetime, timedelta, timezone
import urllib.request
import json
from apps.models.cpustat import cpustatLatestType


def success() -> str:

    account_name: str = os.environ["StorageAccountName"]
    account_key: str = os.environ["StorageAccountKey"]
    container_name: str = os.environ["ComsContainerName"]
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

    print(data.servers[0].name)

    multiline_string = f"""cputstat!

    """

    for server in data.servers:
        if server.ping:
            s: str = server.name
        else:
            s: str = "<span class='hst-error'>" + server.name + "</span>"

        multiline_string = multiline_string + "<br>" + s

    single_line_string = multiline_string.replace('\n', '<br>')
    return single_line_string
