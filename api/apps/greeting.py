from datetime import datetime
import time

def greeting() -> str:
    
    now = datetime.now()
    formatted_date_time = now.strftime("%A %d %B %Y at %I.%M%p")

    multiline_string = f"""<b>Welcome to the terminal interface!</b>

    Use commands to navigate and interact with the website.
    To get started, try entering the command <span class='hst-command'>help</span> and hitting enter.

    Session start time: {formatted_date_time}
    """
    single_line_string = multiline_string.replace('\n', '<br>')
    return single_line_string