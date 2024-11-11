
const submitButton = document.querySelector('#submit-button')
const textArea = document.querySelector('#text')

const preFilterElement = document.querySelector('#pre-filter')
const postFilterElement = document.querySelector('#post-filter')

const filterElements = {
  codeBlocks: document.querySelector('#filter-code-blocks'),
  images: document.querySelector('#filter-images'),
  headings: document.querySelector('#filter-headings'),
  tables: document.querySelector('#filter-tables'),
  specialCharacters: document.querySelector('#filter-special-characters'),
}



submitButton.addEventListener('click', () => {
    const text = textArea.value

    const words = text.trim().split(/\s+/)

    const preFilter = words.filter(word => word.length > 0).length

    const postFilter = countWordsFromMarkdown(text).wordCount
    
    preFilterElement.textContent = preFilter
    postFilterElement.textContent = postFilter
    
})

const clearButton = document.querySelector('#clear-button')

clearButton.addEventListener('click', () => {
    textArea.value = ''
    preFilterElement.textContent = '0'
    postFilterElement.textContent = '0'
})

function countWordsFromMarkdown(text) {
  let cleanedText = text

  if (filterElements.codeBlocks.checked) {
      cleanedText = cleanedText.replace(/```[\s\S]*?```/g, '')
      cleanedText = cleanedText.replace(/`([^`]*)`/g, '')

  }

  if (filterElements.images.checked) {
    cleanedText = cleanedText.replace(/!\[.*?\]\(.*?\)/g, '')
    cleanedText = cleanedText.replace(/!\[\[.*?\]\]/g, '')
  }

  if (filterElements.headings.checked) {
      cleanedText = cleanedText.replace(/^\s*#+\s.*$/gm, '')
  }

  if (filterElements.tables.checked) {
      cleanedText = cleanedText.replace(/^\|.*\|$/gm, '')
  }

  if (filterElements.specialCharacters.checked) {
      cleanedText = cleanedText.replace(/[^\w\s]/g, '')
      cleanedText = cleanedText.replace(/^\s*$/gm, '')
      cleanedText = cleanedText.replace(/\s+/g, ' ').trim()
      cleanedText = cleanedText.replace(/^(\s*[-*_]){3,}\s*$/gm, '')

  }

  const words = filterElements.specialCharacters.checked
      ? cleanedText.match(/\b\w+\b/g) || []
      : cleanedText.match(/\S+/g) || []

  return {
      wordCount: words.length,
      words
  }
}
  
  