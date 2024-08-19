
def success() -> str:
    multiline_string = """<b>Welcome to the terminal interface!</b>

    This terminal interface allows you to navigate and interact with my website using simple text commands. Below, you'll find a list of available commands and how to use them. For example, to view the About page, you would enter the command <span class='hst-command'>page --about</span>.

    <b>Commands:</b>

    - <span class='hst-command'>page</span>: Displays content from the website. 
    <span class='hst-indent'>- Usage: Type <span class='hst-command'>page</span> followed by the flag corresponding to the page you wish to view.</span>
    <span class='hst-indent'>- Flags:</span>
    <span class='hst-indent'><span class='hst-indent'><span class='hst-command'>--about</span>: Shows the About page content. (under development)</span></span>

    - <span class='hst-command'>help</span>: Displays this help output, providing guidance on how to use the terminal interface.
    <span class='hst-indent'>- Usage: Type <span class='hst-command'>help</span> to view this information anytime you need assistance.</span>
    
    - <span class='hst-command'>clear</span>: Removes previous commands.
    <span class='hst-indent'>- Usage: Type <span class='hst-command'>clear</span> to cleanup the terminal window.</span>
    
    - <span class='hst-command'>home</span>: Shows you where I call home.
    <span class='hst-indent'>- Usage: Type <span class='hst-command'>home</span> to display a hit to where home is for me.</span>

    <b>Actions:</b>

    - <span class='hst-command'>Ctrl+c</span>: Cancels current command.
    <span class='hst-indent'>- Usage: Hold keys <span class='hst-command'>Ctrl+c</span> to cancel current command. (windows only)</span>
    
    - <span class='hst-command'>right mouse click</span>: Copies and pastes text in terminal.
    <span class='hst-indent'>- Usage: Select text from the terminal you want to copy <span class='hst-command'>right click</span> on the selected text to copy. Right click again to paste text into the terminal, or use paste command in any other application.</span>

    
    Remember, commands are case-sensitive. If you encounter any issues or have questions about a command, typing <span class='hst-command'>help</span> will bring you back here.

    Enjoy exploring my website through the terminal!"""
    single_line_string = multiline_string.replace('\n', '<br>')
    return single_line_string


def fail() -> str:
    multiline_string = """<span class='hst-error'>Error:</span> the <span class='hst-command'>help</span> command does not implement any flags."""
    single_line_string = multiline_string.replace('\n', '<br>')
    return single_line_string
