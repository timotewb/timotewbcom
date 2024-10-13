import os
# from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobSasPermissions, generate_blob_sas
from datetime import datetime, timedelta, timezone
import urllib.request
import json
from apps.models.cpustat import cpustatLatestType


def success() -> str:

    account_name: str = os.environ["StorageAccountName"]
    account_key: str = os.environ["StorageAccountKey"]
    container_name: str = os.environ["ContainerName"]

    # TODO: Replace <storage-account-name> with your actual storage account name
    account_url = f"https://{account_name}.blob.core.windows.net"
    credential = DefaultAzureCredential()

    # Create the BlobServiceClient object
    # blob_service_client = BlobServiceClient(account_url, credential=credential)
    # data = list_blobs(blob_service_client, account_name,
    #                   account_key, container_name)

    multiline_string = f"""<b>CPU Server Monitoring - Latest</b>
    <p>Serving the latest details for CPU servers.</p>"""

    # for s in data.servers:
    #     multiline_string = multiline_string + "<p>" + s.name

    #     if check_last_updated:
    #         multiline_string += """ <span class='online'>●</span><br>"""
    #     else:
    #         multiline_string += """ <span class='offline'>●</span><br>"""

    #     multiline_string += "<span class='hst-indent'>- Load: " + \
    #         s.load_average+"</span><br>"
    #     multiline_string += "<span class='hst-indent'>- Mem: " + \
    #         str(int(s.mem_used_pct))+"%</span><br>"
    #     multiline_string += "<span class='hst-indent'>- Uptime: " + \
    #         s.uptime+"</span><br>"
    #     multiline_string += "<span class='hst-indent'>- Procs: " + \
    #         str(int(s.running_procs))+"</span><br>"
    #     multiline_string += "<span class='hst-indent'>- Platform: " + \
    #         s.platform+"</span><br>"
    #     multiline_string += "<span class='hst-indent'>- Cores: " + \
    #         str(int(s.cpu_core_count))+"</span><br>"
    #     if s.cpu_model != "":
    #         multiline_string += "<span class='hst-indent'>- " + \
    #             s.cpu_model+"</span><br>"

    #     multiline_string += "</p>"

    single_line_string = multiline_string.replace('\n', '<br>')
    return single_line_string


# def list_blobs(blob_service_client: BlobServiceClient, account_name, account_key, container_name) -> cpustatLatestType:
#     resp = dict()
#     resp['servers'] = list()
#     servers = list()

#     container_client = blob_service_client.get_container_client(
#         container=container_name)

#     blob_list = container_client.list_blobs()

#     for blob in blob_list:
#         print(f"Name: {blob.name}, Container: {blob.container}")
#         if "-latest.json" in blob.name:
#             # generate a shared access signature for each blob file
#             sas_i = generate_blob_sas(account_name=account_name,
#                                       container_name=container_name,
#                                       blob_name=blob.name,
#                                       account_key=account_key,
#                                       permission=BlobSasPermissions(read=True),
#                                       expiry=datetime.now(timezone.utc) + timedelta(hours=1))

#             sas_url = 'https://' + account_name+'.blob.core.windows.net/' + \
#                 container_name + '/' + blob.name + '?' + sas_i

#             with urllib.request.urlopen(sas_url) as resp:
#                 servers.append(json.loads(resp.read().decode('utf-8')))

#     return cpustatLatestType(servers)


# def check_last_updated(date_string: str) -> bool:
#     """
#     Checks if the given date string is older than 10 minutes from now.

#     Args:
#     date_string (str): A string representing a date and time in the format "YYYY-MM-DD HH:MM:SS".

#     Returns:
#     bool: True if the date is older than 10 minutes, False otherwise.
#     """
#     try:
#         # Convert the string to a datetime object
#         dt = datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S")

#         # Get the current time
#         now = datetime.now()

#         # Calculate the difference between now and the given date
#         time_difference = now - dt

#         # Return True if the difference is less than 10 minutes, False otherwise
#         return time_difference < timedelta(minutes=10)
#     except ValueError:
#         # Handle invalid input
#         raise ValueError(
#             "Invalid date string format. Please use YYYY-MM-DD HH:MM:SS.")
