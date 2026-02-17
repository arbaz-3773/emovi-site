// Firebase config (same as admin)
const firebaseConfig = {
  apiKey: "AIzaSyAOWKd5co4oibEcv7rS0kopwEFzGlwkBkk",
  authDomain: "emovi-ddb98.firebaseapp.com",
  projectId: "emovi-ddb98",
  storageBucket: "emovi-ddb98.appspot.com",
  messagingSenderId: "542494022447",
  appId: "1:542494022447:web:c639a1a15a4cc222ed1fda"
};
const slide_bar_hide = document.querySelector("#slide-bar-hide")
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// DOM container for posts
const postsContainer = document.getElementById("posts-container");


window.toggleDrawer = function () {
  const drawer = document.getElementById("drawer");
  if (drawer) drawer.classList.toggle("active");
};


document.querySelectorAll(".info-about").forEach(function (el){
el.addEventListener("click", function() {
  const h_about = document.getElementById("who-about")
  const h_message = document.getElementById("who-message")
  if(this.id == "about"){
    h_message.innerText = `Emovi provides a safe space to explore movies, watch trailers, and get legal offline download guides.
Our mission: let users enjoy cinema while respecting copyright and supporting creators.`
    h_about.innerText = "About"
  }
  if(this.id == "contact"){
    h_message.innerText = `If you have any questions, issues, or suggestions, feel free to reach out to us:
Email: lunahart55insta@gmail.com
We strive to respond as quickly as possible.`
    h_about.innerText = `Contact Us`
  }
  if(this.id == "feedback"){
    h_message.innerText = `Your feedback helps us improve the website.
Please send your suggestions or issues via email:
Email: lunahart55insta@gmail.com
We value your input and will review it promptly.`
    h_about.innerText = "Feedback"
  }
  if(this.id == "Privacy_Policy"){
    h_message.innerText = `We respect your privacy. Since our website does not require login or registration, we do not collect personal information.
No personal data collection: We don’t store your name, email, or download history.
Cookies: Only used for website functionality and analytics.
Safety: Your IP address is not shared with any third party.
Note: Please ensure you comply with local laws while downloading content.`
    h_about.innerText = "Privacy Policy"
  }
  history.pushState({ page: "popup" }, "", "#popup");
showDiv()
  
});
});

window.showDiv = function (){
  document.getElementById("overlay").style.display = "block"
  document.getElementById("myPopup").style.display = "block"
  
}
window.hideDiv = function (){
  document.getElementById("overlay").style.display = "none"
  history.back();

  document.getElementById("myPopup").style.display = "none"
}




// Carousel setup
const card = document.querySelector(".card");
const track = document.createElement("div");
track.className = "track";
track.style.display = "flex";
track.style.width = "100%";
track.style.height = "100%";
track.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
card.append(track);

let indexCur = 0;
let all_sl = [];

// Helper: time ago
window.timeAgo = function (date){
  const diff = Math.floor((new Date() - date) / 1000);
  if(diff < 60) return `${diff}s ago`;
  else if(diff < 3600) return `${Math.floor(diff/60)}m ago`;
  else if(diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  else return `${Math.floor(diff/86400)}d ago`;
}


window.nex = function () {
  indexCur++;
  if(indexCur >= all_sl.length) indexCur = 0;
  updateSlide();
}
window.prev = function () {
  indexCur--;
  if(indexCur < 0) indexCur = all_sl.length - 1;
  updateSlide();
}
window.updateSlide = function () {
  track.style.transform = `translateX(-${indexCur*100}%)`;
}

// Touch support
let startX=0, endX=0;
const threshold=50;
track.addEventListener("touchstart", e=> startX = e.touches[0].clientX );
track.addEventListener("touchmove", e=> endX = e.touches[0].clientX );
track.addEventListener("touchend", ()=>{
  const diff = startX-endX;
  if(Math.abs(diff) > threshold){
    if(diff>0) nex(); else prev();
  }
});

// Auto-slide


// Load posts






















// Function: Show detailed post (Re-usable for both slider and cards)
// Function: Show detailed post
// Function: Show detailed post (Re-usable for both slider and cards)
let load_limit = 10;
let already_loaded = 0;
const more_load = document.querySelector("#more-load");
more_load.addEventListener("click", () => {
load_limit+=10;
});

async function showPostDetails(postTitle) {
  try {
    const snapshot = await db.collection("posts")
                             .where("post-title", "==", postTitle)
                             .get();
    if (snapshot.empty) return;

    const data = snapshot.docs[0].data();
    const viewPosts = document.getElementById("view-posts");
slide_bar_hide.style.display = "none"
type_posts.style.display = "none"
  history.pushState({ page: "post", title: postTitle }, "", "#post");
    // Build detailed view HTML
    viewPosts.innerHTML = `
    <div class="view-movie" style="padding:20px;text-align: left; background:#fff; border-radius:10px;">
  <h2>${data["post-title"]}</h2>
  <p>Get the latest Movies and Web Series in super quality.
Enjoy fast and <strong>secure downloads with Google Drive direct links.</strong></p>
  <img src="${data.thumbnail}" alt="Thumbnail" style="display:block; margin:10px 0; max-width:100%; border-radius:8px;">
  <h3 class="type-movie">${data["movie-type"]}</h3>
  <div><strong>Movie Title:</strong> ${data["movie-title"]}</div>
  <div><strong>Full Name:</strong> ${data["full-name"]}</div>
  <div><strong>Language:</strong> ${data.language}</div>
  <div><strong>Year:</strong> ${data["released-year"]}</div>
  <div><strong>Genres:</strong> ${data.genres}</div>
  <div><strong>Cast:</strong> ${data.cast}</div>
  <div><strong>Quality:</strong> ${data.quality}</div>
  <div><strong>Size:</strong> ${data.size}</div>
  <div><strong>Format:</strong> ${data.format}</div>
  <div><strong>Subtitle:</strong> ${data.subtitle}</div>
  <div><strong>Source:</strong> ${data.source}</div>
        <h4>Storyline:</h4>
        <p>${data.storyline}</p>
        <h3>${data["movie-type"]} Screenshots:</h3>
        <div style="text-align: center; overflow-x:auto;">
          ${data.images.map(img => `<img src="${img}" style="margin:5px;
        width: 100%; border-radius:4px;">`).join("")}
        </div>
        
        <h4>Download Links:</h4>
        ${data.downloads.map(d => `<button class="download-button" style="margin:5px; padding:10px; background:#007bff; color:#fff; border:none; border-radius:5px; cursor:pointer;" onclick="window.open('${d.url}','_blank')">${d.title}</button>`).join("")}
        <br><br>
        <button onclick="closeView()" style="padding:10px 20px; cursor:pointer;">Back to Home</button>
      </div>
    `;


    viewPosts.style.display = "block";
    
    window.scrollTo(0, 0); // Scroll to top to see details
  } catch (err) {
    console.error("Error showing details:", err);
  }
}

// Updated Carousel/Slider Fetch
async function loadLatestPosts() {
  const snapshot = await db.collection("posts")
                           .orderBy("createdAt", "desc")
                           .limit(10)
                           .get();
  
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const new_add = document.createElement("div");
    new_add.className = "new_add";
    new_add.style.backgroundImage = `url('${data.thumbnail}')`;
    new_add.style.cursor = "pointer"; // Cursor pointer for clickability

    // --- CLICK EVENT FOR SLIDER ---
    new_add.addEventListener("click", () => {
      showPostDetails(data["post-title"]);
    });

    // Title blur overlay
    const titleDiv = document.createElement("div");
    titleDiv.className = "title-blur";
    titleDiv.textContent = data["post-title"];
    new_add.append(titleDiv);

    // Language badge
    const langDiv = document.createElement("div");
    langDiv.className = "language-badge";
    langDiv.textContent = data.language;
    new_add.append(langDiv);

    track.append(new_add);
    all_sl.push(new_add);
  });
}

// Fix: Update main posts list to use the same function
async function getUserPosts() {
  postsContainer.innerHTML = "<p>Loading posts...</p>";
  try {
    const snapshot = await db.collection("posts").orderBy("createdAt", "desc").get();
    if (snapshot.empty) {
      postsContainer.innerHTML = "<p>No posts yet!</p>";
      return;
    }
    postsContainer.innerHTML = ""; 

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const card = document.createElement("div");
      card.className = "post-card";
      card.innerHTML = `
        <div style="position:relative;">
          <img src="${data.thumbnail}" alt="Thumbnail">
          <div class="language-badge">${data.language}</div>
        </div>
        <div class="post-info">
          <strong>${data["post-title"]}</strong><br>
          <small>${data["released-year"]}</small>
        </div>
      `;
      
      // Click event for regular cards
      card.addEventListener("click", () => showPostDetails(data["post-title"]));
      postsContainer.appendChild(card);
    });
  } catch (e) {
    postsContainer.innerHTML = "Error: " + e.message;
  }
}

// Auto-slide 5 seconds
setInterval(() => { 
  if (all_sl.length > 0) nex(); 
}, 5000); 

// Initial calls
loadLatestPosts();
getUserPosts();

// Function to close the detailed post view and return to main posts
window.closeView = function () {
  const viewPosts = document.getElementById("view-posts");
  history.back();
  viewPosts.style.display = "none"; 
  slide_bar_hide.style.display = "block"
  type_posts.style.display = "none"
   // Hide the detailed view
  window.scrollTo(0, 0);             // Scroll to top (optional)
}

const body = document.body;
const toggleBtn = document.getElementById('toggleBtn');
const drawer = document.getElementById("drawer");
window.updateIcons = function () {
    if (body.classList.contains('dark-mode')) {
      toggleBtn.textContent = "Light Mode"
      drawer.style.background = "#4f4f4f"
        body.classList.remove('dark-mode'); 
    } else {
      drawer.style.background = "#2f2f2f"
        body.classList.add('dark-mode');
        toggleBtn.textContent = "Dark Mode"
    }
}


const searching = document.querySelector("#searchi")
const search_bar = document.querySelector("#search-bar")
const Emovi = document.querySelector("#Emovi")
const menu_btn_1 = document.querySelectorAll(".menu-btn")
const header = document.querySelectorAll(".header")
const back_icon = document.querySelector("#back-icon")
const search_layer = document.querySelector("#search-layer")
const view_one_posts = document.querySelector("#view-one-posts")
const showall_posts_list = document.querySelector("#show-all-posts-list")

const footer_hide = document.querySelector("#footer-hide")
const more_loadBtn = document.querySelector("#more-loadBtn")
const type_posts = document.querySelector("#type-posts")
searching.addEventListener("click", () => {
  search_bar.style.display = "block"
  Emovi.style.display = "none"
  toggleBtn.style.display = "none"
  menu_btn_1[0].style.display = "none"
  back_icon.style.display = "block"
  back_icon.style.flex = "none"
  header[0].style.justifyContent = "normal"
  search_layer.style.display = "block"
  showall_posts_list.style.display ="none"
  view_one_posts.style.display = "none"
  slide_bar_hide.style.display = "none"
  footer_hide.style.display = "none"
  more_loadBtn.style.display = "none"
  type_posts.style.display = "none"
});


back_icon.addEventListener("click", () => {
  search_bar.style.display = "none"
  Emovi.style.display = "block"
  toggleBtn.style.display = "block"
  menu_btn_1[0].style.display = "block"
  back_icon.style.display = "none"
  header[0].style.justifyContent = "space-between"
search_layer.style.display = "none"
showall_posts_list.style.display ="block"
  view_one_posts.style.search_bar.addEventListener("keypress", async function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    
    const keyword = search_bar.value.trim();
    
    if (keyword !== "") {
      try {
        await db.collection("searchHistory").add({
          keyword: keyword,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        console.log("Search uploaded:", keyword);
      } catch (error) {
        console.error("Error uploading search:", error);
      }
    }
    
    search_bar.blur(); // hide mobile keyboard
    search_bar.value = "";
  }
});display = "block"
  slide_bar_hide.style.display = "block"
  footer_hide.style.display = "block"
  more_loadBtn.style.display = "block"
  type_posts.style.display = "block"
});


search_bar.addEventListener("keypress", async function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    const keyword = search_bar.value.trim();

    if (keyword !== "") {
      try {
        await db.collection("searchHistory").add({
          keyword: keyword,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log("Search uploaded:", keyword);
      } catch (error) {
        console.error("Error uploading search:", error);
      }
    }

    search_bar.blur();  // hide mobile keyboard
  //  search_bar.value = "";
  }
});







search_bar.addEventListener("input", async function () {

  const keyword = search_bar.value.trim().toLowerCase();

  if (!keyword) {
    search_layer.innerHTML = "";
    return;
  }

  try {
    // 🔥 Fetch limited posts (for performance)
    const snapshot = await db.collection("posts")
      .limit(50)  // adjust as needed
      .get();

    search_layer.innerHTML = "";

    snapshot.forEach(doc => {
      const data = doc.data();
      const title = data["movie-title"].toLowerCase();

      // Split title into words
      const words = title.split(/\s+/);
      
      

      // Check if any word starts with keyword 
 //Movie
// Both
let match = false;

const keywordMatch = words.some(word => word.startsWith(keyword));

const typeMatch =
  search_filter_ === "All" ||
  data["movie-type"] === search_filter_;

const genreMatch =
  search_filter_on === "All-Genres" ||
  data["full-name"] === search_filter_on;

match = keywordMatch && typeMatch && genreMatch;
      

      if (match) {
        const card = document.createElement("div");
        card.className = "post-card";
        card.innerHTML = `
          <div style="position:relative;">
            <img src="${data.thumbnail}" alt="Thumbnail">
            <div class="language-badge">${data.language}</div>
          </div>
          <div class="post-info">
            <strong>${data["movie-title"]}</strong><br>
            <small>${data["released-year"]}</small>
          </div>
        `;

        card.addEventListener("click", () =>
          showPostDetails(data["post-title"])
        );

        search_layer.appendChild(card);
      }

    });

  } catch (error) {
    console.error("Search error:", error);
  }

});


//const search_filter = document.querySelector("#search-filter")
let search_filter_on = ""
let search_filter_ = ""
// For first group
document.querySelectorAll('input[name="genre"]').forEach(cb => {
  cb.addEventListener('change', function() {
    if(this.checked) {
      document.querySelectorAll('input[name="genre"]').forEach(c => {
        if(c == this) {
          search_filter_on  = c.value
          
        }
      });
    }
  });
});

// For second group
document.querySelectorAll('input[name="type"]').forEach(cb => {
  cb.addEventListener('change', function() {
    if(this.checked) {
      document.querySelectorAll('input[name="type"]').forEach(c => {
        if(c == this){
          search_filter_ = c.value
        }
      });
    }
  });
});



window.onpopstate = function(event) {
  const viewPosts = document.getElementById("view-posts");
  
  if (!event.state || event.state.page === "home") {
    hideDiv();
    viewPosts.style.display = "none";
    slide_bar_hide.style.display = "block";
    type_posts.style.display = "block";
    return;
  }
  
  if (event.state.page === "popup") {
    showDiv();
  }
  
  if (event.state.page === "post") {
    showPostDetails(event.state.title);
  }
};