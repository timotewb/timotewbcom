interface ApiResponse {
  data?: string;
}

const RunCommand = (command: string): Promise<string> => {
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

const callApi = async (url: string, flagStr: string): Promise<string> => {
  try {
    // Create a JSON object with the flags
    let queryParams = "";
    if (flagStr) {
      queryParams = `?flags=${encodeURIComponent(flagStr)}`;
    }
    const fullUrl = `${url}${queryParams}`;

    // Set the headers to indicate we're sending JSON
    const headers = {
      "Content-Type": "application/json",
    };

    // Use fetch with method 'POST' to send the body
    const response = await fetch(fullUrl, {
      method: "GET", // Specify the method
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData: ApiResponse = await response.json();
    return responseData.data || "";
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return "";
  }
};

export default RunCommand;
