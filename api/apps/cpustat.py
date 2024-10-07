import os
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobSasPermissions, generate_blob_sas
from datetime import datetime, timedelta, timezone
import urllib.request
import json
from apps.models.cpustat import cpustatLatestType


def success() -> str:

    account_name: str = os.environ["StorageAccountName"]
    account_key: str = os.environ["StorageAccountKey"]
    container_name: str = os.environ["ComsContainerName"]
    blob_name: str = "cpustat-latest.json"

    # TODO: Replace <storage-account-name> with your actual storage account name
    account_url = f"https://{account_name}.blob.core.windows.net"
    credential = DefaultAzureCredential()

    # Create the BlobServiceClient object
    blob_service_client = BlobServiceClient(account_url, credential=credential)
    data = list_blobs(blob_service_client, account_name,
                      account_key, container_name)
    print(data)
    return ""


def list_blobs(blob_service_client: BlobServiceClient, account_name, account_key, container_name) -> dict:
    resp = dict()
    resp['servers'] = list()

    container_client = blob_service_client.get_container_client(
        container=container_name)

    blob_list = container_client.list_blobs()

    for blob in blob_list:
        print(f"Name: {blob.name}")
        if "-latest.json" in blob.name:
            # generate a shared access signature for each blob file
            sas_i = generate_blob_sas(account_name=account_name,
                                      container_name=container_name,
                                      blob_name=blob.name,
                                      account_key=account_key,
                                      permission=BlobSasPermissions(read=True),
                                      expiry=datetime.now(timezone.utc) + timedelta(hours=1))

            sas_url = 'https://' + account_name+'.blob.core.windows.net/' + \
                container_name + '/' + blob.name + '?' + sas_i

            with urllib.request.urlopen(sas_url) as resp:

                # data = cpustatLatestType(**json.loads(resp.read().decode('utf-8')))
                data = cpustatLatestType(json.loads(
                    resp.read().decode('utf-8')))
                resp['servers'].append(data)
    return resp
