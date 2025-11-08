// Artwork Data
const artworks = [
    {
        id: 1,
        title: "Breaking Free",
        medium: "Mixed Media on Canvas with Resin",
        dimensions: "120 × 90 cm",
        description: "An exploration of liberation from societal constraints, where the hand emerges from the canvas reaching towards infinite possibility.",
        img: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=1000&fit=crop"
    },
    {
        id: 2,
        title: "Metamorphosis",
        medium: "Bronze and Oil Paint",
        dimensions: "150 × 100 × 60 cm",
        description: "The transformation of form and consciousness, captured in the moment between states of being.",
        img: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=1000&fit=crop"
    },
    {
        id: 3,
        title: "Echoes of Silence",
        medium: "Wood, Metal, Acrylic",
        dimensions: "180 × 120 cm",
        description: "A meditation on the spaces between words, where meaning resides in absence.",
        img: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=1000&fit=crop"
    },
    {
        id: 4,
        title: "Urban Dreams",
        medium: "Steel and Mixed Media",
        dimensions: "200 × 150 × 80 cm",
        description: "The collision of industrial reality and human aspiration, captured in layered textures.",
        img: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=1000&fit=crop"
    },
    {
        id: 5,
        title: "Fragmented Memory",
        medium: "Canvas, Plaster, Found Objects",
        dimensions: "110 × 110 cm",
        description: "How we reconstruct our past through fragments, each piece holding its own truth.",
        img: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=1000&fit=crop"
    },
    {
        id: 6,
        title: "Threshold",
        medium: "Copper and Oil on Linen",
        dimensions: "140 × 100 cm",
        description: "The liminal space between what was and what will be, frozen in copper and paint.",
        img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1000&fit=crop"
    }
];

// Exhibition Data
const exhibitions = [
    { year: "2024", title: "Breaking the Frame", location: "Modern Art Gallery, New York" },
    { year: "2023", title: "Convergence", location: "International Sculpture Biennale, Venice" },
    { year: "2023", title: "Solo Exhibition", location: "Contemporary Space, London" },
    { year: "2022", title: "Emerging Voices", location: "Art Basel, Miami" }
];

// State
let currentPage = 'home';
let scrollY = 0;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initParallax();
    renderFeaturedWorks();
    renderGallery();
    renderExhibitions();
    initLightbox();
    initContactForm();
});

// Navigation
function initNavigation() {
    const logoBtn = document.getElementById('logo-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.nav-link-mobile');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Logo click
    logoBtn.addEventListener('click', () => navigateToPage('home'));

    // Desktop navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });

    // Mobile navigation
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navigateToPage(page);
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Button navigation
    document.addEventListener('click', function(e) {
        if (e.target.hasAttribute('data-page')) {
            const page = e.target.getAttribute('data-page');
            navigateToPage(page);
        }
    });
}

function navigateToPage(page) {
    currentPage = page;
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation active state
    document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Parallax Effect
function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    
    window.addEventListener('scroll', function() {
        scrollY = window.scrollY;
        if (heroBg && currentPage === 'home') {
            heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    });
}

// Render Featured Works
function renderFeaturedWorks() {
    const featuredGrid = document.getElementById('featured-grid');
    const featured = artworks.slice(0, 3);
    
    featuredGrid.innerHTML = featured.map(art => `
        <div class="featured-item" data-artwork-id="${art.id}">
            <img src="${art.img}" alt="${art.title}">
            <div class="featured-overlay">
                <div>
                    <h3>${art.title}</h3>
                    <p>${art.medium}</p>
                </div>
            </div>
            <div class="featured-glow"></div>
        </div>
    `).join('');
    
    // Add click handlers
    featuredGrid.querySelectorAll('.featured-item').forEach(item => {
        item.addEventListener('click', function() {
            const artworkId = parseInt(this.getAttribute('data-artwork-id'));
            navigateToPage('gallery');
            setTimeout(() => openLightbox(artworkId), 300);
        });
    });
}

// Render Gallery
function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    galleryGrid.innerHTML = artworks.map(art => `
        <div class="gallery-item" data-artwork-id="${art.id}">
            <img src="${art.img}" alt="${art.title}">
            <div class="gallery-overlay">
                <div class="gallery-info">
                    <h3>${art.title}</h3>
                    <p>${art.medium}</p>
                    <p>${art.dimensions}</p>
                </div>
            </div>
            <div class="gallery-glow"></div>
        </div>
    `).join('');
    
    // Add click handlers
    galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const artworkId = parseInt(this.getAttribute('data-artwork-id'));
            openLightbox(artworkId);
        });
    });
}

// Render Exhibitions
function renderExhibitions() {
    const exhibitionsList = document.getElementById('exhibitions-list');
    
    exhibitionsList.innerHTML = exhibitions.map(ex => `
        <div class="exhibition-item">
            <div class="exhibition-header">
                <span class="exhibition-year">${ex.year}</span>
                <h3 class="exhibition-title">${ex.title}</h3>
            </div>
            <p class="exhibition-location">${ex.location}</p>
        </div>
    `).join('');
}

// Lightbox
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('close-lightbox');
    
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

function openLightbox(artworkId) {
    const artwork = artworks.find(art => art.id === artworkId);
    if (!artwork) return;
    
    const lightbox = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = artwork.img;
    document.getElementById('lightbox-title').textContent = artwork.title;
    document.getElementById('lightbox-medium').textContent = artwork.medium;
    document.getElementById('lightbox-dimensions').textContent = artwork.dimensions;
    document.getElementById('lightbox-description').textContent = artwork.description;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Contact Form
function initContactForm() {
    const submitBtn = document.getElementById('submit-btn');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    
    submitBtn.addEventListener('click', function() {
        // Simple validation
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show success message
        this.textContent = 'Message Sent!';
        this.classList.add('submitted');
        
        // Clear form
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            this.textContent = 'Send Message';
            this.classList.remove('submitted');
        }, 3000);
    });
}