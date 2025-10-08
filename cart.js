// cart.js

const movies = [
    { id: 'star-wars', title: 'Star Wars', image: '...', price: 19.99 },
    { id: 'pirates-of-caribbean', title: 'Pirates of the Caribbean', image: '...', price: 15.50 },
    { id: 'elemental', title: 'Elemental', image: '...', price: 22.00 },
    { id: 'avengers-end-game', title: 'Avengers End Game', image: '...', price: 25.00 },
    { id: 'soul', title: 'Soul', image: '...', price: 18.75 },
    { id: 'fast-and-furious', title: 'Fast and Furious', image: '...', price: 12.99 }
];

// Gerekli HTML elemanını seçelim
const cartItemsContainer = document.getElementById('cart-items-container');

/**
 * Sepeti silme işlemini gerçekleştiren fonksiyon
 * @param {string} productId - Sepetten silinecek ürünün ID'si
 */
function removeFromCart(productId) {
    // 1. Mevcut sepeti hafızadan al
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    // 2. Silinecek ürün HARİÇ diğer tüm ürünleri içeren yeni bir dizi oluştur
    // .filter() metodu, kendisine verilen koşulu sağlayan elemanlarla yeni bir dizi oluşturur.
    const newCart = cart.filter(id => id !== productId);

    // 3. Yeni (filtrelenmiş) sepeti hafızaya kaydet
    sessionStorage.setItem('cart', JSON.stringify(newCart));

    // 4. EKRANI GÜNCELLE! Değişikliği anında görmek için listeyi yeniden çizdiriyoruz.
    renderCart();
}

/**
 * Sepeti hafızadaki güncel verilere göre ekrana çizen ana fonksiyon
 */
function renderCart() {
    // Sepeti hafızadan oku
    const cartProductIDs = JSON.parse(sessionStorage.getItem('cart')) || [];

    // Sepet boşsa mesaj göster
    if (cartProductIDs.length === 0) {
        cartItemsContainer.innerHTML = '<p>Sepetinizde hiç ürün bulunmuyor.</p>';
        return;
    }

    // Sepetteki ürünlerin tam bilgilerini 'movies' dizisinden bul
    const productsInCart = movies.filter(movie => cartProductIDs.includes(movie.id));
    
    // Her ürün için bir liste elemanı (li) ve "Sil" butonu oluştur
    const listItemsHTML = productsInCart.map(product => `
        <li class="cart-list-item">
            <span>${product.title}</span>
            <button class="delete-btn" onclick="removeFromCart('${product.id}')">Sil</button>
        </li>
    `).join('');
    
    // Oluşturulan listeyi bir <ul> etiketi içinde ekrana yazdır
    cartItemsContainer.innerHTML = `<ul class="cart-list">${listItemsHTML}</ul>`;
}


// Sayfa ilk yüklendiğinde sepeti ekrana çizmek için ana fonksiyonu çağır
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});