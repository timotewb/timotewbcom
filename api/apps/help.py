
def help() -> str:
    multiline_string = """Welcome to my website! 
    I have implemented the site in a terminal where the user enter commands to return information. The commands and flags are avaialbe below but for example if you wanted to see the about page then you would submit command <span class='hst-command'>page --about</span>.
    
    Commands:
    <span class='hst-indent'><span class='hst-command'>page</span> - view site contnet. this command does not implement any flags</span>

    <span class='hst-indent'><span class='hst-command'>help</span> - view this help output. this command does not implement any flags</span>
    """
    single_line_string = multiline_string.replace('\n', '<br>')
    return single_line_string