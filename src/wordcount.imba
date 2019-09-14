export def wc input
  # TODO: use better word count
  console.log "input",input:length
  return input.split('\n').join(' ').trim().split(' '):length
