// Get the container where the job list will be pasted
const listContainer = document.querySelector("ul");

// Get the HTML data from the JSON file and append it to the webpage
async function getData() {
  let response = await fetch("./data.json");
  let data = await response.json();

  // Loop through each job element in the data
  data.forEach((element) => {
    
    if (element.new && element.featured) {
      // Append the HTML code for new and featured jobs to the listContainer
      listContainer.innerHTML += `<li id="one${element.id}" class="job"><div class="developer-details">
        <img src="${element.logo}" alt="company's avatar" class="avatar"/>
        <div class="details">
          <div class="company-wrap">
            <h1 class="company">${element.company}</h1>
            <div class="new-wrap">
              <p class="new">new!</p>
              <p class="featured">featured</p>
            </div>
          </div>
          <div class="position-wrap">
            <p class="position">${element.position}</p>
          </div>
          <div class="contract-wrap">
            <p class="posted-at">${element.postedAt}</p>
            <p class="contract">${element.contract}</p>
            <p class="location">${element.location}</p>
          </div>
        </div>
      </div>
      <div class="developer-skills">
        <button class="role">${element.role}</button>
        <button class="level">${element.level}</button>
      </div>
      </li>`;
      listSkills(element);
    }
    // Check if the job is new but not featured
    else if (element.new && !element.featured) {
      // Append the HTML code for new jobs to the listContainer
      listContainer.innerHTML += `<li id="${element.id}" class="job"><div class="developer-details">
        <img src="${element.logo}" alt="company's avatar" class="avatar"/>
        <div class="details">
          <div class="company-wrap">
            <h1 class="company">${element.company}</h1>
            <div class="new-wrap">
              <p class="new">new!</p>
            </div>
          </div>
          <div class="position-wrap">
            <p class="position">${element.position}</p>
          </div>
          <div class="contract-wrap">
            <p class="posted-at">${element.postedAt}</p>
            <p class="contract">${element.contract}</p>
            <p class="location">${element.location}</p>
          </div>
        </div>
      </div>
      <div class="developer-skills">
        <button class="role">${element.role}</button>
        <button class="level">${element.level}</button>
      </div>
      </li>`;
      listSkills(element);
    }
    // Job is neither new nor featured
    else {
      // Append the HTML code for regular jobs to the listContainer
      listContainer.innerHTML += `<li id="${element.id}" class="job"><div class="developer-details">
        <img src="${element.logo}" alt="company's avatar" class="avatar"/>
        <div class="details">
          <div class="company-wrap">
            <h1 class="company">${element.company}</h1>
          </div>
          <div class="position-wrap">
            <p class="position">${element.position}</p>
          </div>
          <div class="contract-wrap">
            <p class="posted-at">${element.postedAt}</p>
            <p class="contract">${element.contract}</p>
            <p class="location">${element.location}</p>
          </div>
        </div>
      </div>
      <div class="developer-skills">
        <button class="role">${element.role}</button>
        <button class="level">${element.level}</button>
      </div>
      </li>`;
      listSkills(element);
    }
  });
}

// Deconstruct the skills and tools array and append them to the webpage
function listSkills(element) {
  const lis = document.querySelectorAll(".developer-skills");
  let skill, tool;

  // Loop through the languages array and create buttons for each language
  for (let i = 0; i < element.languages.length; i++) {
    skill = document.createElement("button");
    skill.className = "skills";
    skill.textContent = element.languages[i];

    lis.forEach((element) => {
      element.appendChild(skill);
    });
  }

  // Loop through the tools array and create buttons for each tool
  for (let i = 0; i < element.tools.length; i++) {
    tool = document.createElement("button");
    tool.className = "tools";
    tool.textContent = element.tools[i];

    lis.forEach((element) => {
      element.appendChild(tool);
    });
  }
}

// Call the function to get the webpage running
getData();


// Add event listeners for filtering the job list

const filterBoxWrapper = document.querySelector(".filter");
const filterBox = document.querySelector(".filter-value");
let list;

// Function to handle the click event on skills, tools, level, and position
function pasteClickedSkill(e) {
  list = document.createElement("li");
  let closeSearchSkill = document.createElement("img");
  let searchSkill = document.createElement("p");

  let skill = e.target;
  let skillValue = e.target.textContent;

  if (skill.matches("button")) {
    searchSkill.textContent = skillValue;
    searchSkill.setAttribute("class", "search");
    closeSearchSkill.src = "./images/icon-remove.svg";
    list.appendChild(searchSkill);
    list.appendChild(closeSearchSkill);

    filterBox.appendChild(list);
    filterBoxWrapper.style.display = "flex";
  }

  filterJobList();
}

// Add event listener to the listContainer for clicking on skills, tools, level, and position
listContainer.addEventListener("click", pasteClickedSkill);

// Function to filter the job list based on the selected skills, tools, level, and position
const filterJobList = () => {
  let search = document.querySelectorAll(".search");

  search.forEach((element) => {
    Array.from(listContainer.children)
      .filter((joblist) => !joblist.textContent.includes(element.textContent))
      .forEach((joblist) => joblist.classList.add("filtered"));
  });
};

// Function to remove searched skills from the filter box
function removeSearchedSkill(e) {
  try {
    let searchSkill = e.target.parentElement;

    if (e.target.matches("img")) {
      searchSkill.remove();

      let search = document.querySelectorAll(".search");

      search.forEach((element) => {
        Array.from(listContainer.children)
          .filter((joblist) => joblist.textContent.includes(element.textContent))
          .forEach((joblist) => joblist.classList.remove("filtered"));
      });
    } else if (e.target.matches("p")) {
      list.remove();
    }

    if (!filterBox.hasChildNodes()) {
      filterBoxWrapper.style.display = "none";
      Array.from(listContainer.children).forEach((joblist) =>
        joblist.classList.remove("filtered")
      );
    }
  } catch (error) {
    console.log("error");
  }
}

// Add event listener to the filterBoxWrapper for removing searched skills
filterBoxWrapper.addEventListener("click", removeSearchedSkill);
