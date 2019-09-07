tag App
  def setup
    @fontSize = 256
    # TODO: Check if user has already an open file
    console.log "setup"

  def textchange e
    # TODO: use better word count
    const value = e.target.dom:value.split(' ')
    const text = value:length
    const fontSize = 256 - text
    # TODO: sanitize the min / max
    @fontSize = fontSize


  def render
    <self>
      <header css:font-size="{@fontSize}px"> @fontSize
      <main> "coming soon"
      <textarea placeholder="Start typing..."  :keydown.textchange>

Imba.mount <App>
