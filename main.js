// main.js

// === 1. VERİ KAYNAĞI (STATE'İMİZİN TEMELİ) ===
// Filmlerin tüm bilgilerini bir dizi içinde tutuyoruz.
// Her filme, onu diğerlerinden ayırmak için benzersiz bir 'id' verdik.
// Bu yapı sayesinde HTML'i elle yazmak yerine bu veriden otomatik üreteceğiz.
const movies = [
    {
        id: 'star-wars',
        title: 'Star Wars',
        description: 'Young hero rises to fight the dark forces threatening the galaxy.',
        image: 'https://m.media-amazon.com/images/I/81WMUxNTRYL._UF894,1000_QL80_.jpg',
        link: 'https://www.imdb.com/title/tt0076759/?ref_=nv_sr_srsg_1_tt_7_nm_0_in_0_q_star%2520wars%2520'
    },
    {
        id: 'pirates-of-caribbean',
        title: 'Pirates of the Caribbean',
        description: 'A witty pirate and a brave blacksmith team up to rescue the governor’s daughter from cursed sailors.',
        image: 'https://upload.wikimedia.org/wikipedia/tr/0/0e/Pirates_of_the_Caribbean_movie.jpg',
        link: 'https://www.imdb.com/title/tt0325980/?ref_=fn_all_ttl_3'
    },
    {
        id: 'elemental',
        title: 'Elemental',
        description: 'In a city where fire, water, air, and earth residents live together, two elements discover how much they have in common.',
        image: 'https://lumiere-a.akamaihd.net/v1/images/image_b8fae824.jpeg?region=0%2C0%2C540%2C810',
        link:'https://www.imdb.com/title/tt15789038/?ref_=nv_sr_srsg_3_tt_7_nm_1_in_0_q_elemen'
    
    },
    {
        id: 'avengers-end-game',
        title: 'Avengers End Game',
        description: 'Earth’s mightiest heroes unite one last time to undo the devastating effects of Thanos’s snap.',
        image: 'https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810',
        link:'https://www.imdb.com/title/tt4154796/?ref_=fn_all_ttl_1'
    },
    {
        id: 'soul',
        title: 'Soul',
        description: 'A jazz musician gets a second chance at life after an unexpected journey to the afterlife.',
        image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSu5QPgNuQCyV7oSlambfGZYO48gYIsbCVboZ62Wpa4-Pfst2Nc',
        link:'https://www.imdb.com/title/tt2948372/?ref_=fn_all_ttl_1'
    },
    {
        id: 'fast-and-furious',
        title: 'Fast and Furious',
        description: 'A group of skilled street racers face danger, loyalty, and high-speed action around the world.',
        image: 'https://tr.web.img2.acsta.net/pictures/bzp/01/29173.jpg',
        link:'https://www.imdb.com/title/tt0232500/?ref_=nv_sr_srsg_0_tt_8_nm_0_in_0_q_h%25C4%25B1zl%25C4%25B1%2520ve%2520%25C3%25B6fkeli'
    }
];

// === 2. GEREKLİ HTML ELEMANLARINI SEÇME ===
// Kartların içine yerleştirileceği ana konteyneri seçiyoruz.
const container = document.querySelector('.container');

// DİKKAT: HTML'de id="cart-badge" yerine class="shopping-notification" kullandığın için
// elemanı getElementById ile değil, querySelector ile class adını kullanarak seçiyoruz.
// Önceki hatanın sebebi buydu!
const cartBadge = document.querySelector('.shopping-notification');

// === 3. FONKSİYONLAR ===

/**
 * Sepet sayacını (badge) güncelleyen fonksiyon.
 * Tarayıcının hafızasındaki (sessionStorage) sepet verisini okur ve sayıyı ekrana yazar.
 */
function updateCartBadge() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cartBadge.textContent = cart.length; // Sayacın metnini sepetteki ürün sayısıyla güncelle.
    // Eğer sepette ürün varsa sayacı göster, yoksa gizle (isteğe bağlı, daha şık durur)
    if (cart.length > 0) {
        cartBadge.style.display = 'block';
    } else {
        cartBadge.style.display = 'none';
    }
}

/**
 * Sepete ürün ekleyen fonksiyon. HTML içindeki onclick'ten çağrılacak.
 * @param {string} productId - Eklenecek ürünün 'movies' dizisindeki benzersiz ID'si.
 */
function addToCart(productId) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    
    // Ürünün sepette olup olmadığını kontrol et
    if (!cart.includes(productId)) {
        cart.push(productId);
        sessionStorage.setItem('cart', JSON.stringify(cart));
        // Sayaç anında güncellensin diye fonksiyonu burada çağırıyoruz.
        updateCartBadge();
       
    } 
}

/**
 * Film kartlarını `movies` dizisindeki veriye göre oluşturup ekrana çizen ana fonksiyon.
 * Bu fonksiyon çalıştığında, HTML'deki mevcut statik kartların hepsi silinir ve yerine bunlar gelir.
 */
function renderProducts() {
    const productsHTML = movies.map(movie => `
        <div class="card-body">
            <img class="card-img" src="${movie.image}" alt="${movie.title}">
            <h5 class="card-tittle">${movie.title}</h5>
            <p class="card-description">${movie.description}</p>
            <div class="card-btn-container">
                <button type="button" class="card-btn-left" onclick="addToCart('${movie.id}')">Added to Card</button>
                <a href="${movie.link}" class="card-btn-right">Detail</a>
            </div>
        </div>
    `).join('');
    
    // Oluşturulan HTML'i `.container` elemanının içine tamamen yerleştir.
    container.innerHTML = productsHTML;
}

// === 4. SAYFA YÜKLENDİĞİNDE KODU BAŞLATMA ===
// Tarayıcının tüm HTML'i okuyup bitirdiğinden emin olduktan sonra kodlarımızı çalıştırıyoruz.
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();   // Film kartlarını ekrana çiz.
    updateCartBadge();  // Sayfa yenilendiğinde sepette ürün varsa sayacı güncelle.
});
