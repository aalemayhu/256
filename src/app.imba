tag App
  def setup
    @fontSize = 256
    @title = "{@fontSize}"
    # TODO: Check if user has already an open file
    console.log "setup"

  def textchange e
    # TODO: use better word count
    const value = e.target.dom:value.split('\n').join(' ').trim().split(' ')
    const text = value:length
    const fontSize = 256 - text

    # TODO: sanitize the min / max
    if fontSize <= 24 
      const emoji = '👏'
      @title = "{emoji} you have written {text} words"
      @fontSize = "24"
    else
      @fontSize = fontSize
      @title = fontSize


  def render
    <self>
      <header css:font-size="{@fontSize}px"> @title
      <textarea placeholder="Start typing..."  :keydown.textchange>

Imba.mount <App>
