from datetime import datetime


class ServerType:
    def __init__(self, name, platform, last_updated, load_average, running_procs, uptime, mem_used_pct, cpu_core_count, cpu_model):
        self.name: str = name
        self.platform: str = platform
        self.last_updated: datetime = last_updated
        self.load_average: str = load_average
        self.running_procs: int = running_procs
        self.uptime: str = uptime
        self.mem_used_pct: float = mem_used_pct
        self.cpu_core_count: int = cpu_core_count
        self.cpu_model: str = cpu_model


class cpustatLatestType:
    def __init__(self, servers):
        self.servers: list[ServerType] = [ServerType(
            server['name'], server['platform'], server['last_updated'], server['load_average'], server['running_procs'], server['uptime'], server['mem_used_pct'], server['cpu_core_count'], server['cpu_model']) for server in servers]
