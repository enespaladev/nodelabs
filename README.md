# Gerçek Zamanlı Mesajlaşma Uygulaması

Node.js, Express, Socket.IO ve MongoDB ile oluşturulmuş, RabbitMQ ile mesaj kuyruklama ve Redis ile önbellekleme özelliklerine sahip güçlü bir gerçek zamanlı mesajlaşma platformu.

## Özellikler

- Socket.IO ile gerçek zamanlı mesajlaşma
- JWT ile kullanıcı kimlik doğrulama ve yetkilendirme
- Mesaj geçmişi ve sohbet yönetimi
- Otomatik mesaj planlama sistemi
- API endpoint'leri için hız sınırlama
- RabbitMQ ile mesaj kuyruklama
- Redis ile önbellekleme
- Elasticsearch ile mesaj arama
- Swagger ile API dokümantasyonu
- Kapsamlı hata yönetimi ve loglama
- Çevrimiçi kullanıcı takibi

## Teknoloji Altyapısı

- **Backend:** Node.js, Express.js
- **Gerçek Zamanlı İletişim:** Socket.IO
- **Veritabanı:** MongoDB ve Mongoose ODM
- **Önbellekleme:** Redis
- **Mesaj Kuyruğu:** RabbitMQ
- **Arama Motoru:** Elasticsearch
- **API Dokümantasyonu:** Swagger UI
- **Güvenlik:** 
  - JWT Kimlik Doğrulama
  - Helmet ile güvenlik başlıkları
  - Express Rate Limit
  - CORS etkin

## Proje Yapısı

```
├── config/                  # Yapılandırma dosyaları
│   ├── db.js               # MongoDB yapılandırması
│   ├── elastic.js          # Elasticsearch yapılandırması
│   ├── logger.js           # Loglama yapılandırması
│   ├── rabbitmq.js         # RabbitMQ yapılandırması
│   ├── redis.js            # Redis yapılandırması
│   └── swagger.js          # Swagger dokümantasyon yapılandırması
├── controllers/            # İstek işleyicileri
├── crons/                 # Zamanlanmış görevler
├── middlewares/           # Express ara yazılımları
├── models/                # MongoDB modelleri
├── routes/                # API rotaları
├── services/              # İş mantığı
├── sockets/               # Socket.IO işleyicileri
└── utils/                 # Yardımcı fonksiyonlar
```

## Gereksinimler

- Node.js (v14 veya üzeri)
- MongoDB
- Redis
- RabbitMQ
- Elasticsearch

## Kurulum

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/yourusername/nodelabs.git
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   cd nodelabs
   npm install
   ```

3. Ortam değişkenlerini ayarlayın:
   Kök dizinde bir `.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
   ```
   PORT=3000
   MONGODB_URI=mongodb_baglanti_adresiniz
   REDIS_URL=redis_baglanti_adresiniz
   RABBITMQ_URL=rabbitmq_baglanti_adresiniz
   JWT_SECRET=jwt_gizli_anahtariniz
   ELASTICSEARCH_NODE=elasticsearch_baglanti_adresiniz
   ```

4. Sunucuyu başlatın:
   ```bash
   npm start
   ```

## API Dokümantasyonu

API dokümantasyonuna sunucu çalışırken `/api-docs` endpoint'inden erişilebilir.

## Ana Bileşenler

1. **Kimlik Doğrulama Sistemi**
   - Kullanıcı kaydı ve girişi
   - JWT tabanlı kimlik doğrulama
   - Token doğrulama ara yazılımı

2. **Mesajlaşma Sistemi**
   - Gerçek zamanlı mesaj iletimi
   - Mesaj geçmişi
   - Sohbet yönetimi
   - Otomatik mesaj planlama

3. **Arama Fonksiyonalitesi**
   - Elasticsearch entegrasyonu
   - Mesaj içeriği arama
   - Kullanıcı arama

4. **Socket Yönetimi**
   - Gerçek zamanlı kullanıcı durumu
   - Mesaj iletim onayı
   - Çevrimiçi kullanıcı takibi

5. **Mesaj Kuyruğu Sistemi**
   - RabbitMQ entegrasyonu
   - Mesaj kuyruklama ve işleme
   - Asenkron görev yönetimi

## Güvenlik Özellikleri

- JWT kimlik doğrulama
- İstek hız sınırlama
- Helmet ile güvenlik başlıkları
- Girdi doğrulama
- Hata yönetimi ara yazılımı
- CORS koruması

## Test

Proje, Socket.IO işlevselliği için test istemcileri içerir:
- `socketClient1Test.js`
- `socketClient2Test.js`
- `socketClientTest.js`

## Hata Yönetimi

Uygulama, Winston logger kullanarak detaylı loglama ile birlikte merkezi hata yönetimi ara yazılımı üzerinden hata yönetimini gerçekleştirir.

## Lisans

[MIT Lisansı](LICENSE)

---

Daha fazla bilgi veya destek için lütfen repository'de bir issue açın.
