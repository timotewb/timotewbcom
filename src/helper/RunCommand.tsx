interface ApiResponse {
  data?: string;
  responseCode: number;
}

const RunCommand = (command: string): Promise<ApiResponse> => {
  const cmd = parseCommand(command);
  const url = `/api/${cmd.endpoint}`;
  return callApi(url, cmd.flags);
};

const parseCommand = (command: string): { endpoint: string; flags: string } => {
  // no space found
  if (command.indexOf(" ") === -1 && command === "") {
    return { endpoint: "", flags: "" };
  } else if (command.indexOf(" ") === -1 && command.length > 1) {
    return { endpoint: command, flags: "" };
  } else {
    const parts = command.split(" ", 1);
    const flagStr = command.substring(parts[0].length);
    if (flagStr.trim() === "") {
      return { endpoint: parts[0], flags: "" };
    } else {
      return { endpoint: parts[0], flags: flagStr };
    }
  }
};

const callApi = async (url: string, flagStr: string): Promise<ApiResponse> => {
  let status: number = 0;
  try {
    let queryParams = "";
    if (flagStr) {
      queryParams = `?flags=${encodeURIComponent(flagStr)}`;
    }
    const fullUrl = `${url}${queryParams}`;
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: headers,
    });

    status = response.status;

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${status}`);
    }
    const responseData: ApiResponse = await response.json();
    return { data: responseData.data || "", responseCode: status };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to fetch data:", error.message);
      return { data: error.message, responseCode: status };
    } else {
      console.error("Failed to fetch data:", String(error));
      return { data: String(error), responseCode: status };
    }
  }
};

export default RunCommand;
