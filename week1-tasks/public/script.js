document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteButton = document.getElementById('new-quote');
    const searchAuthorButton = document.getElementById('search-author');
    const authorSearch = document.getElementById('author-search');

    const fetchQuote = async () => {
        const response = await fetch('/api/random-quote');
        const data = await response.json();
        quoteText.textContent = `"${data.quote}"`;
        quoteAuthor.textContent = `- ${data.author}`;
    };

    const searchQuoteByAuthor = async () => {
        const author = authorSearch.value;
        const response = await fetch(`/api/search-quote?author=${author}`);
        const data = await response.json();
        if (data.quote) {
            quoteText.textContent = `"${data.quote}"`;
            quoteAuthor.textContent = `- ${data.author}`;
        } else {
            quoteText.textContent = 'No quotes found';
            quoteAuthor.textContent = '';
        }
    };

    newQuoteButton.addEventListener('click', fetchQuote);
    searchAuthorButton.addEventListener('click', searchQuoteByAuthor);

    // Fetch initial quote
    fetchQuote();
});
