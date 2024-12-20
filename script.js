// Function to toggle the menu
function toggleMenu(event) {
  event.stopPropagation(); // Prevent the click from closing the menu immediately
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

// Function to close the menu
function closeMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.remove('active');
}

// Function to toggle the search container
function toggleSearch() {
  const searchContainer = document.querySelector('.search-container');
  searchContainer.classList.toggle('active');
}

// Function to close the search container
function closeSearch() {
  const searchContainer = document.querySelector('.search-container');
  searchContainer.classList.remove('active');
}

// Prevent clicks inside the menu from closing it
const menu = document.querySelector('.menu');
menu.addEventListener('click', function(event) {
  event.stopPropagation();
});

// Close the menu when clicking outside of it
document.addEventListener('click', function(event) {
  if (!menu.contains(event.target)) {
    closeMenu();
  }
});

// Search functionality
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
  const searchText = document.getElementById('search-input').value.toLowerCase();
  const pageContent = document.body.textContent.toLowerCase();
  const searchResults = [];

  // Split the pageContent into words
  const words = pageContent.split(/\s+/);

  // Iterate over the words and check if they include the searchText
  for (const word of words) {
    if (word.includes(searchText)) {
      searchResults.push(word);
    }
  }

  // Display the search results
  displayResults(searchResults);
});

function displayResults(results) {
  // Remove previous search results if any
  const existingResults = document.getElementById('search-results');
  if (existingResults) {
    existingResults.remove();
  }

  const resultsContainer = document.createElement('div');
  resultsContainer.id = 'search-results';

  if (results.length > 0) {
    const resultsList = document.createElement('ul');
    results.forEach(result => {
      const listItem = document.createElement('li');

      // Create a link for each result
      const resultLink = document.createElement('a');
      resultLink.href = '#'; // Set the href to "#" for now
      resultLink.textContent = result;

      // Add click event listener to the link
      resultLink.addEventListener('click', () => {
        // Find the page containing the result and open it
        findAndOpenPage(result);
      });

      listItem.appendChild(resultLink);
      resultsList.appendChild(listItem);
    });
    resultsContainer.appendChild(resultsList);
  } else {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No results found.';
    resultsContainer.appendChild(noResultsMessage);
  }

  // Add the resultsContainer to the page
  const searchContainer = document.querySelector('.search-container');
  searchContainer.appendChild(resultsContainer);
}

function findAndOpenPage(result) {
  // Implement logic to find the page containing the result
  // For simplicity, let's assume all your pages are in an array
  const pages = ['index.html', 'projects.html', 'admissions.html', 'donate.html', 'contactus.html', 'apply.html'];

  for (const page of pages) {
    // Fetch the page content
    fetch(page)
      .then(response => response.text())
      .then(pageContent => {
        if (pageContent.toLowerCase().includes(result)) {
          // Open the page in a new tab/window
          window.open(page, '_blank');
          return; // Exit the loop after finding the page
        }
      });
  }
}