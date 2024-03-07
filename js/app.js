const showNewsSection = document.getElementById("news");
const sideSection = document.getElementById("side");
const showSelected = document.getElementById("showSelection");
const countSelection = document.getElementById("countSelection");
const latestPosts = document.getElementById("latest-posts");

//search by category
const loadData = async (searchText) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
    );
    const data = await res.json();
    const posts = data.posts;

    // validate if search category available or not
    const alertElement = document.getElementById("alert");
    alertElement.textContent = "";
    if (posts.length === 0) {
      spinnerHandler(false);
      alertElement.innerHTML = `<h2 class="font-black text-red-500 text-[24px] lg:text-4xl">No Post Category found! Please Search Valid Category</h2>`;
    }

    displayData(posts);
  } catch (err) {
    console.log("something happened", err);
  }
};
// display data
const displayData = (posts) => {
  // spinnerHandler2(true)
  showNewsSection.textContent = "";
  let count = 0;
  posts.forEach((post) => {
    const newDiv = document.createElement("div");
    newDiv.classList = `
    col-span-2 space-y-6
    `;
    newDiv.innerHTML = `
    <div class="rounded-lg bg-[#F3F3F5] p-6 shadow">
    <div class="flex gap-5">
      <div class="w-[60px] relative h-[60px] rounded-full">
        <div class="absolute -top-2 right-0"><img src="${
          post.isActive ? "./images/Status (1).png" : "./images/Status.png"
        }" alt=""></div>
        <img class="rounded-full" src="${post.image}" alt="">
      </div>
      <div>
        <div class="flex items-center space-x-2">
          <div
            class="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-secondary-foreground"
          >
            # <span id="tag"> ${post.category}</span>
          </div>
          <span class="text-sm text-gray-500"
            >Author: <span class="font-bold">${post.author.name}</span> </span
          >
        </div>
        <h3 class="mt-4 text-xl font-semibold">
          ${post.title}
        </h3>
        <p class="mt-2 text-gray-500">
        ${post.description}
        </p>
        <div
          class="border border-dashed my-4 border-[#12132D40]"
        ></div>
        <div class="flex gap-2 flex-col lg:flex-row justify-between">
          <div class="flex items-center mt-4 space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5 text-gray-400"
            >
              <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
            </svg>
            <span class="text-sm text-gray-500">${post.comment_count}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5 text-gray-400"
            >
              <path
                d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
              ></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span class="text-sm text-gray-500">${post.view_count}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5 text-gray-400"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span class="text-sm text-gray-500">${post.posted_time} min</span>
          </div>
          <div class="flex justify-start items-center mt-1">
            <img class="cursor-pointer mark" src="./images/email 1.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    showNewsSection.appendChild(newDiv);

    // Attaching event listener to the newly created mark button
    newDiv.querySelector(".mark").addEventListener("click", () => {
      const newDiv2 = document.createElement("div");
      newDiv2.classList = `flex justify-between items-center`;
      newDiv2.innerHTML = `
      <h4 class="text-sm font-medium w-[70%]">${post.title}</h4>
       <span class="text-sm text-gray-500"><i class="fa-regular fa-eye"></i> ${post.view_count}</span>
      `;
      showSelected.appendChild(newDiv2);

      //count ++
      count = parseInt(countSelection.textContent.match(/\d+/)[0]);
      count++;

      // Update the text content of the element with the new count value
      countSelection.textContent = `Mark as read (${count})`;
    });
  });
  //stop loading
  spinnerHandler(false);
};

//calling load data
// getting search field value
function handleSearch() {
  spinnerHandler(true);
  const searchField = document.getElementById("searchField");
  const searchText = searchField.value;

  setTimeout(() => {
    loadData(searchText);
  }, 3000);
  searchField.value = "";
}

// by default posts
const defaultData = async () => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts`
    );
    const data = await res.json();
    const posts = data.posts;
    displayData(posts);
  } catch (err) {
    console.log("something happened", err);
  }
};

//calling default data
defaultData();

// latest post section
const loadLatest = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    );
    const data = await res.json();
    displayLatest(data);
  } catch (err) {
    console.log("something happened", err);
  }
};

// display latest post
const displayLatest = (posts) => {
  posts.forEach((post) => {
    const newDiv3 = document.createElement("div");
    newDiv3.classList = `border bg-card text-card-foreground max-w-sm rounded-lg shadow-lg`;
    newDiv3.innerHTML = `
    <div class="flex flex-col-6 p-6 cursor-pointer">
              <div class="flex items-center space-x-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-5 w-5"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                <span class="text-sm">${
                  post.author.posted_date
                    ? post.author.posted_date
                    : "No Publish Date"
                }</span>
              </div>
            </div>
            <div class="px-6">
              <img class="rounded-xl" src="${post.cover_image}" alt="">
            </div>
            <div class="p-6">
              <h3 class="text-lg font-[800] leading-tight text-gray-900">
                ${post.title}
              </h3>
              <p class="mt-2 text-sm text-gray-700">
              ${post.description}
              </p>
            </div>
            <div class="p-6 flex items-center space-x-2">
              <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img class="rounded-full" src="${post.profile_image}" alt="">
              </span>
              <div>
                <div class="text-sm font-medium text-gray-900">${
                  post.author.name
                }</div>
                <div class="text-xs text-gray-500">${
                  post.author.designation ? post.author.designation : "Unknown"
                }</div>
              </div>
            </div>
    `;
    latestPosts.appendChild(newDiv3);
  });
};
// calling latest posts
loadLatest();

//spinner handling
const spinnerHandler = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    setTimeout(() => {
      spinner.classList.add("hidden");
    });
  }
};
