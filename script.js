const properties = [
  {id:1,type:"Apartment",location:"Dubai Marina",title:"Marina View Residence",price:1850000,area:1450,beds:2,baths:2,image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",desc:"A bright modern apartment with panoramic marina views, premium finishes and easy access to restaurants and the waterfront."},
  {id:2,type:"Villa",location:"Palm Jumeirah",title:"Palm Garden Villa",price:7200000,area:4200,beds:5,baths:6,image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",desc:"Spacious family villa featuring a private garden, pool and elegant interiors in a prestigious Palm location."},
  {id:3,type:"Penthouse",location:"Downtown Dubai",title:"Skyline Penthouse",price:5500000,area:3100,beds:4,baths:5,image:"https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",desc:"A sophisticated penthouse close to Burj Khalifa with floor-to-ceiling windows and exceptional city views."},
  {id:4,type:"Apartment",location:"Jumeirah",title:"Jumeirah Garden Apartment",price:1450000,area:1250,beds:2,baths:2,image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",desc:"A calm and stylish apartment in a family-friendly neighborhood, close to beaches and local amenities."},
  {id:5,type:"Villa",location:"Downtown Dubai",title:"Contemporary Courtyard Villa",price:3900000,area:3500,beds:4,baths:4,image:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80",desc:"Contemporary architecture, generous living spaces and a private courtyard designed for modern family living."},
  {id:6,type:"Apartment",location:"Dubai Marina",title:"Marina Sunset Suite",price:2450000,area:1750,beds:3,baths:3,image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",desc:"A spacious three-bedroom residence with sunset views and access to premium building facilities."}
];

const grid = document.getElementById("propertyGrid");
const count = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

function money(n){ return "AED " + n.toLocaleString("en-US"); }

function render(list){
  grid.innerHTML = "";
  count.textContent = `${list.length} propert${list.length === 1 ? "y" : "ies"}`;
  noResults.classList.toggle("hidden", list.length !== 0);
  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "property-card";
    card.innerHTML = `
      <div class="property-image" style="background-image:url('${p.image}')">
        <span class="badge">${p.type}</span>
        <button class="favorite" data-id="${p.id}" aria-label="Save property">♡</button>
      </div>
      <div class="property-body">
        <h3>${p.title}</h3>
        <p class="location">⌖ ${p.location}, UAE</p>
        <div class="details"><span>⌂ ${p.beds} Beds</span><span>▣ ${p.baths} Baths</span><span>▱ ${p.area} sqft</span></div>
        <div class="price-row"><span class="price">${money(p.price)}</span><button class="view-btn" data-view="${p.id}">View</button></div>
      </div>`;
    grid.appendChild(card);
  });
  document.querySelectorAll(".favorite").forEach(btn => {
    const id = Number(btn.dataset.id);
    btn.classList.toggle("saved", localStorage.getItem("saved-"+id) === "true");
    btn.addEventListener("click", () => {
      const saved = localStorage.getItem("saved-"+id) === "true";
      localStorage.setItem("saved-"+id, String(!saved));
      btn.classList.toggle("saved", !saved);
      btn.textContent = saved ? "♡" : "♥";
    });
  });
  document.querySelectorAll(".view-btn").forEach(btn => btn.addEventListener("click", () => showProperty(Number(btn.dataset.view))));
}

function filterProperties(){
  const location = document.getElementById("locationFilter").value;
  const type = document.getElementById("typeFilter").value;
  const price = document.getElementById("priceFilter").value;
  const result = properties.filter(p =>
    (location === "all" || p.location === location) &&
    (type === "all" || p.type === type) &&
    (price === "all" || (price === "1" && p.price < 2000000) || (price === "2" && p.price >= 2000000 && p.price <= 5000000) || (price === "3" && p.price > 5000000))
  );
  render(result);
}

function showProperty(id){
  const p = properties.find(x => x.id === id);
  document.getElementById("modalContent").innerHTML = `
    <img src="${p.image}" alt="${p.title}" style="width:100%;height:220px;object-fit:cover;border-radius:8px;margin-bottom:20px">
    <p class="eyebrow">${p.type} • ${p.location}</p>
    <h2>${p.title}</h2>
    <p>${p.desc}</p>
    <p><strong>${money(p.price)}</strong> · ${p.beds} beds · ${p.baths} baths · ${p.area} sqft</p>
    <a class="btn primary" href="#contact" id="modalContact">Enquire About This Property</a>`;
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("modalContact").addEventListener("click", () => document.getElementById("modal").classList.add("hidden"));
}

document.getElementById("searchBtn").addEventListener("click", filterProperties);
["locationFilter","typeFilter","priceFilter"].forEach(id => document.getElementById(id).addEventListener("change", filterProperties));

document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
  tab.classList.add("active");
}));

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formMessage").textContent = "Thank you! Your enquiry has been submitted successfully. (Demo only)";
  e.target.reset();
});

document.getElementById("closeModal").addEventListener("click", () => document.getElementById("modal").classList.add("hidden"));
document.getElementById("modal").addEventListener("click", e => { if(e.target.id === "modal") e.target.classList.add("hidden"); });

document.getElementById("menuBtn").addEventListener("click", () => document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => document.getElementById("nav").classList.remove("open")));

render(properties);
