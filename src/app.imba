import wc from './wordcount'

tag App
  def setup
    @fontSize = 256
    @title = "{@fontSize}"
    # TODO: Check if user has already an open file
    console.log "setup"

  def textchange e
    console.log e
    const length = wc(e.target.dom:value)
    const fontSize = 256 - length

    # TODO: sanitize the min / max
    if fontSize <= 24 
      const emoji = '👏'
      @title = "{emoji} you have written {length} words"
      @fontSize = "24"
    else
      @fontSize = fontSize
      @title = fontSize


  def render
    <self>
      <header css:font-size="{@fontSize}px"> @title
      <textarea#editor placeholder="Start typing..."  :keydown.textchange :onpaste.paste>

Imba.mount <App>
