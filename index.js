
const submitButton = document.querySelector('#submit-button')
const textArea = document.querySelector('#text')

const preFilterElement = document.querySelector('#pre-filter')
const postFilterElement = document.querySelector('#post-filter')



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
    wordCountElement.textContent = ''
})

function countWordsFromMarkdown(text) {
    // Remove Markdown code blocks (``` content ```)
    let cleanedText = text.replace(/```[\s\S]*?```/g, '')
  
    // Remove Markdown inline code (`content`)
    cleanedText = cleanedText.replace(/`([^`]*)`/g, '')
  
    // Remove Markdown headings
    cleanedText = cleanedText.replace(/^\s*#+\s.*$/gm, '')
  
    // Remove Markdown tables
    cleanedText = cleanedText.replace(/^\|.*\|$/gm, '')
  
    // Remove extra spaces and empty lines
    cleanedText = cleanedText.replace(/^\s*$/gm, '')
  
    // Normalize spaces
    cleanedText = cleanedText.replace(/\s+/g, ' ').trim()
  
    // Remove non-alphanumeric characters (except spaces) like punctuation marks
    cleanedText = cleanedText.replace(/[^\w\s]/g, '')
  
    // Count words
    const words = cleanedText.match(/\b\w+\b/g) || []
  
    return {
      wordCount: words.length,
      words
    }
  }
  
  