
def help() -> str:
    multiline_string = """Welcome to my website! 
    I have implemented the site in a terminal where the user enter commands to return information. The commands and flags are avaialbe below but for example if you wanted to see the about page then you would submit command <span style='background-color: rgba(255, 255, 255, 0.5); border-radius: 2px;padding-left: 3px; padding-right: 3px; '>page --about</span>.
    
    Commands:
    <span style='text-indent: 20px;'>page - view site contnet. this command does not implement any flags</span>
    <span style='text-indent: 20px;'>help - view this help output. this command does not implement any flags</span>"""
    single_line_string = multiline_string.replace('\n', '<br>')
    return single_line_string