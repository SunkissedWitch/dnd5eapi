async function makeGetRequest() {

  let res = await axios.get('https://www.dnd5eapi.co/api/classes/');
  let data = res.data;
  
  if(!data.count) {
    console.error('no classes')
    return;
  }

  const { results: classes } = data;
  const classesContainer = document.querySelector('.classes-list');

  classes.forEach(currentClass => {
    const classRow = document.createElement("tr");
    const btn = document.createElement("button")
    const classItem = document.createElement("td");
    const btnCell = document.createElement("td");

    classItem.innerText = currentClass.name;
    // classItem.setAttribute('class', "cell-class");

    btn.innerText = "Show class";
    btn.onclick = getUrl;
    btn.setAttribute('url', currentClass.url);

    classesContainer.append(classRow);
    classRow.append(classItem);
    classRow.append(btnCell);
    btnCell.append(btn);
  });
}

makeGetRequest();

async function getUrl() {
  
  const url = this.getAttribute('url')
  let res = await axios.get('https://www.dnd5eapi.co' + url);
  let classData = res.data;
  let proficiencies = classData.proficiencies;
  // console.log(res.data)
  // console.log(proficiencies);

  document.getElementById('class-information').innerHTML='';

  const proficienciesInfo = document.querySelector('#class-information');
  const header3 = document.createElement("h3");
  header3.innerText = "Proficiencies";
  proficienciesInfo.append(header3);

  proficiencies.forEach (currentProficience => {
    const paragraf = document.createElement("p");
    paragraf.innerText = `${currentProficience.name}`;
    proficienciesInfo.append(paragraf);
  })
}
