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