class Server:
    def __init__(self, name, ping, load_average, running_procs, uptime):
        self.name: str = name
        self.ping: bool = ping
        self.load_average: str = load_average
        self.running_procs: str = running_procs
        self.uptime: str = uptime


class cpustatLatestType:
    def __init__(self, servers):
        self.servers: list[Server] = [Server(
            server['name'], server['ping'], server['load_average'], server['running_procs'], server['uptime']) for server in servers["servers"]]
