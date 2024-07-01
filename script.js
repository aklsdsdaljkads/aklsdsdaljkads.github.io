const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', async () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (!searchTerm) {
    return; 
  }

  try {
    const response = await fetch('companies.txt');
    const companiesText = await response.text();
    const companies = companiesText.split('\n'); 

    const foundCompany = companies.find(company => company.toLowerCase() === searchTerm); 

    let resultText;
    if (foundCompany) {
      resultText = `The company/product ${foundCompany} is boycotted. | 
 تمت مقاطعة هذه الشركة/المنتج ${foundCompany}`;
    } else {
      resultText = `The company/product named ${searchTerm} is not found in the boycott list. | لا تتم مقاطعة هذه الشركة/المنتج ${searchTerm} `;
    }

    resultDiv.textContent = resultText;

    resultDiv.classList.remove('boycotted', 'not-boycotted');

    resultDiv.classList.add(foundCompany ? 'boycotted' : 'not-boycotted'); 
  } catch (error) {
    console.error('Error searching companies:', error);
    resultDiv.textContent = 'An error occurred. Please try again later.';
  } finally {
    searchInput.value = ''; 
  }
});
