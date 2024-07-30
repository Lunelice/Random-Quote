// Add some interactivity to the website
console.log("Hello, world!");

let btnLink = document.querySelector('.link');
let btnRandom = document.querySelector(".random");
let author = document.querySelector(".author");
let tags = document.querySelector(".tags");
let citation = document.querySelector(".citation");
let tooltip = document.querySelector('.tooltip');



//call API
async function fetchData() {
    let apiUrl = 'https://api.quotable.io/random'; 
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('La requête a échoué avec le statut ' + response.status);
      }
  
      data = await response.json();
      console.log(data);
      displayQuote(data);
    } catch (error) {
      console.error('Une erreur est survenue :', error);
    }
  }
  



// afficher la citation

function displayQuote(quoteData) {
    citation.textContent = quoteData.content;
    author.textContent = `— ${quoteData.author}`;
    tags.innerHTML = quoteData.tags.map(tag => `<p>${tag}</p>`).join('');
  }


//random button function
function randomQuote() {
    fetchData(); 
  }

//link button function
function linkQuote() {
    navigator.clipboard.writeText(citation.textContent)
      .then(() => {
        console.log('Citation copiée dans le presse-papiers');
      })
      .catch(err => {
        console.error('Erreur lors de la copie :', err);
      });
  }

//copy to clipboard message
  function showTooltip() {
    tooltip.classList.add('visible'); // Affiche le tooltip
    setTimeout(() => {
        tooltip.classList.remove('visible'); // Cache le tooltip après 2 secondes
    }, 1500);
}


//event listeners
btnRandom.addEventListener('click', randomQuote);
btnLink.addEventListener('click', linkQuote);
btnLink.addEventListener('mouseover', showTooltip);

document.addEventListener("DOMContentLoaded", () => {
    randomQuote()
  })