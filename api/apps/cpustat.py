import os
from azure.storage.blob import BlobServiceClient

def success() -> str:

    account_name: str = os.environ["StorageAccountName"]
    account_key: str = os.environ["StorageAccountKey"]
    container_name: str = os.environ["ComsContainerName"]

    #create a client to interact with blob storage
    connect_str = 'DefaultEndpointsProtocol=https;AccountName=' + account_name + ';AccountKey=' + account_key + ';EndpointSuffix=core.windows.net'
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)

    #use the client to connect to the container
    container_client = blob_service_client.get_container_client(container_name)

    #get a list of all blob files in the container
    blob_list = []
    for blob_i in container_client.list_blobs():
        blob_list.append(blob_i.name)
        

    #generate a shared access signiture for files and load them into Python
    for blob_i in blob_list:
        #generate a shared access signature for each blob file
        print(blob_i)

    multiline_string = f"""Welcome to the terminal interface!

    Use commands to navigate and interact with the website.
    To get started, try entering the command <span class='hst-command'>help</span> and hitting enter.
    """
    single_line_string = multiline_string.replace('\n', '<br>')
    return single_line_string