//sidebar
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    // Open sidebar
    mobileMenuToggle.addEventListener('click', function () {
        mobileSidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close sidebar when clicking the close button
    sidebarClose.addEventListener('click', function () {
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close sidebar when clicking the overlay
    sidebarOverlay.addEventListener('click', function () {
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});


// Product Gallery functionality
initProductGallery();
function initProductGallery() {
    const mainImg = document.querySelector(".product-main-img img")
    const thumbnails = document.querySelectorAll(".thumbnail")
    const thumbnailItems = document.querySelectorAll(".thumbnail-item")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")

    if (!mainImg || !thumbnails.length) return

    let currentIndex = 0
    const maxIndex = thumbnailItems.length - 1

    // Store all thumbnail image sources for easy access
    const thumbnailSources = []
    thumbnailItems.forEach((item) => {
        const img = item.querySelector("img")
        if (img && img.src) {
            thumbnailSources.push(img.src)
        } else {
            thumbnailSources.push("placeholder.jpg") // Fallback
        }
    })

    // Set initial image and thumbnail
    if (thumbnailSources.length > 0) {
        mainImg.src = thumbnailSources[0]
    }
    setActiveThumbnail(currentIndex)

    // Event listeners for thumbnails (dots)
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            // Direct one-to-one mapping - each dot corresponds to one image
            currentIndex = index
            updateGallery()
        })
    })

    // Event listeners for thumbnail items (actual thumbnail images)
    if (thumbnailItems.length) {
        thumbnailItems.forEach((item, index) => {
            item.addEventListener("click", () => {
                currentIndex = index
                updateGallery()
            })
        })
    }

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex
            updateGallery()
        })
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0
            updateGallery()
        })
    }

    // Update gallery based on current index
    function updateGallery() {
        // Always set the main image from our stored sources
        if (thumbnailSources[currentIndex]) {
            mainImg.src = thumbnailSources[currentIndex]
        }

        setActiveThumbnail(currentIndex)
    }

    // Set active thumbnail
    function setActiveThumbnail(index) {
        // Update the dots (thumbnails)
        thumbnails.forEach((thumb, i) => {
            // Direct one-to-one mapping between thumbnails and dots
            if (i === index) {
                thumb.classList.add("active")
            } else {
                thumb.classList.remove("active")
            }
        })

        // Update the thumbnail images
        if (thumbnailItems.length) {
            thumbnailItems.forEach((item, i) => {
                if (i === index) {
                    item.classList.add("active")
                } else {
                    item.classList.remove("active")
                }
            })
        }
    }
}


// cart functionality
document.addEventListener('DOMContentLoaded', function () {
    const cartUrls = {
        'original': {
            'single': 'https://example.com/cart?product=original-alcami-single',
            'double': 'https://example.com/cart?product=original-alcami-double',
            'once': 'https://example.com/cart?product=original-alcami-once'
        },
        'matcha': {
            'single': 'https://example.com/cart?product=matcha-alcami-single',
            'double': 'https://example.com/cart?product=matcha-alcami-double',
            'once': 'https://example.com/cart?product=matcha-alcami-once'
        },
        'cocoa': {
            'single': 'https://example.com/cart?product=cocoa-alcami-single',
            'double': 'https://example.com/cart?product=cocoa-alcami-double',
            'once': 'https://example.com/cart?product=cocoa-alcami-once'
        }
    };

    const subscriptionOptions = document.querySelectorAll('.subscription-option');

    function updateCartButton() {
        const selectedFlavor = document.querySelector('input[name="flavor"]:checked').value;
        const selectedPurchase = document.querySelector('input[name="purchase"]:checked').value;

        const cartButton = document.getElementById('add-to-cart-button');
        //   cartButton.href = cartUrls[selectedFlavor][selectedPurchase];
        cartButton.addEventListener('click', function () {
            // Navigate to a new URL
            window.location.href = cartUrls[selectedFlavor][selectedPurchase];
        });
    }

    subscriptionOptions.forEach(option => {
        option.addEventListener('click', function () {
            const radioInput = this.querySelector('input[type="radio"]');
            radioInput.checked = true;

            subscriptionOptions.forEach(opt => {
                opt.classList.remove('selected');
                const details = opt.querySelector('.subscription-details');
                details.classList.remove('visible');
            });

            this.classList.add('selected');

            const details = this.querySelector('.subscription-details');
            details.classList.add('visible');

            updateCartButton();
        });
    });

    const flavorRadios = document.querySelectorAll('input[name="flavor"]');
    flavorRadios.forEach(radio => {
        radio.addEventListener('change', updateCartButton);
    });

    const purchaseRadios = document.querySelectorAll('input[name="purchase"]');
    purchaseRadios.forEach(radio => {
        radio.addEventListener('change', updateCartButton);
    });

    document.getElementById('option-single').classList.add('selected');
    document.getElementById('single-details').classList.add('visible');
    updateCartButton();
});


//stats counter
// Basic intersection observer setup to trigger count-up
const statsSection = document.querySelector(".stats")
const countElements = document.querySelectorAll(".count-up")
let hasAnimated = false

function animateValue(el, start, end, duration) {
    let startTimestamp = null
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        el.textContent = Math.floor(progress * (end - start) + start) + "%"
        if (progress < 1) {
            window.requestAnimationFrame(step)
        }
    }
    window.requestAnimationFrame(step)
}

// Intersection Observer to trigger once
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true
                countElements.forEach((el) => {
                    const target = parseInt(el.getAttribute("data-target"))
                    animateValue(el, 0, target, 1500)
                })
            }
        })
    },
    { threshold: 0.1 }
)

observer.observe(statsSection)

//testimonial
document.addEventListener('DOMContentLoaded', function() {
  
    const testimonials = [
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.",
            author: "John Doe",
            profession: "Marketing Director"
        },
        {
            text: "Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum.",
            author: "Jane Smith",
            profession: "CEO"
        },
        {
            text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
            author: "Robert Johnson",
            profession: "Product Manager"
        },
        {
            text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
            author: "Sarah Williams",
            profession: "Designer"
        },
        {
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
            author: "Michael Brown",
            profession: "Developer"
        },
        {
            text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.",
            author: "Emily Davis",
            profession: "Marketing Specialist"
        },
        {
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.",
            author: "Alex Miller",
            profession: "CTO"
        }
    ];
    
    const cardsContainer = document.querySelector('.testimonial-cards');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicatorsContainer = document.querySelector('.indicatorsT');
    
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    
    function getCardsPerView() {
        if (window.innerWidth < 768) {
            return 1;
        } else if (window.innerWidth < 992) {
            return 2;
        } else {
            return 3;
        }
    }
    
    function createCards() {
        cardsContainer.innerHTML = '';
        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            const starsImg = document.createElement('img');
            starsImg.classList.add('stars-img');
            starsImg.src = "./assets/Stars.svg";
            starsImg.alt = "Five stars";
            
            const testimonialText = document.createElement('p');
            testimonialText.classList.add('testimonial-text');
            testimonialText.textContent = testimonial.text;
            
            const authorInfo = document.createElement('div');
            authorInfo.classList.add('author-info');
            
            const authorImg = document.createElement('img');
            authorImg.classList.add('author-img');
            authorImg.src = "./assets/th1.png";
            authorImg.alt = "Author";
            
            const authorDetails = document.createElement('div');
            authorDetails.classList.add('author-details');
            
            const authorName = document.createElement('span');
            authorName.classList.add('author-name');
            authorName.textContent = testimonial.author;
            
            const authorProfession = document.createElement('span');
            authorProfession.classList.add('author-profession');
            authorProfession.textContent = testimonial.profession;
            
            authorDetails.appendChild(authorName);
            authorDetails.appendChild(authorProfession);
            
            authorInfo.appendChild(authorImg);
            authorInfo.appendChild(authorDetails);
            
            card.appendChild(starsImg);
            card.appendChild(testimonialText);
            card.appendChild(authorInfo);
            
            cardsContainer.appendChild(card);
        });
    }
    
    function initCarousel() {
        createCards();
        updateLayout();
        
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        let interval = setInterval(nextSlide, 5000);
        
        cardsContainer.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        cardsContainer.addEventListener('mouseleave', () => {
            interval = setInterval(nextSlide, 5000);
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
        
        window.addEventListener('resize', function() {
            const newCardsPerView = getCardsPerView();
            
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                updateLayout();
                
                const maxIndex = getMaxSlideIndex();
                if (currentIndex > maxIndex) {
                    currentIndex = maxIndex;
                }
                
                goToSlide(currentIndex);
            }
        });
    }
    
    function updateLayout() {
        const cardMargin = 30;
        const containerWidth = cardsContainer.parentElement.clientWidth;
        const totalMarginSpace = cardMargin * cardsPerView;
        const availableWidth = containerWidth - totalMarginSpace;
        const cardWidth = (availableWidth / cardsPerView);
        
        const cardWidthPercent = (cardWidth / containerWidth) * 100;
        const cardMarginPercent = (cardMargin / 2 / containerWidth) * 100;
        
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.style.flexBasis = `calc(${cardWidthPercent}% - ${cardMargin}px)`;
            card.style.minWidth = `calc(${cardWidthPercent}% - ${cardMargin}px)`;
            card.style.marginLeft = `${cardMarginPercent}%`;
            card.style.marginRight = `${cardMarginPercent}%`;
        });
      
        createIndicators();
    }
    
    function getMaxSlideIndex() {
        return Math.max(0, testimonials.length - cardsPerView);
    }
    
    function goToSlide(index) {
        const maxIndex = getMaxSlideIndex();
        
        if (index < 0) {
            index = 0;
        } else if (index > maxIndex) {
            index = maxIndex;
        }
        
        currentIndex = index;
        
        const cards = document.querySelectorAll('.card');
        const cardTotalWidth = cards[0].getBoundingClientRect().width + 
                              parseFloat(getComputedStyle(cards[0]).marginLeft) + 
                              parseFloat(getComputedStyle(cards[0]).marginRight);
        
        const translatePixels = cardTotalWidth * currentIndex;
        
        const containerWidth = cardsContainer.parentElement.clientWidth;
        const translatePercent = (translatePixels / containerWidth) * 100;
        
        cardsContainer.style.transform = `translateX(-${translatePercent}%)`;
        
        updateIndicators();
    }
    
    function nextSlide() {
        const maxIndex = getMaxSlideIndex();
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0); 
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(getMaxSlideIndex());
        }
    }
    
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        const totalSlides = getMaxSlideIndex() + 1;
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicatorT');
            if (i === 0) {
                indicator.classList.add('active');
            }
            indicator.dataset.index = i;
            indicatorsContainer.appendChild(indicator);
            
            indicator.addEventListener('click', function() {
                goToSlide(parseInt(this.dataset.index));
            });
        }
    }
    
    function updateIndicators() {
        const indicators = document.querySelectorAll('.indicatorT');
        indicators.forEach((ind, i) => {
            if (i === currentIndex) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
    }
    
    initCarousel();
  });