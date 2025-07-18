# Gerçek Zamanlı Mesajlaşma Uygulaması

Node.js, Express, Socket.IO ve MongoDB ile oluşturulmuş, RabbitMQ ile mesaj kuyruklama ve Redis ile önbellekleme özelliklerine sahip güçlü bir gerçek zamanlı mesajlaşma platformu.

## Özellikler

- Socket.IO ile gerçek zamanlı mesajlaşma
- JWT ile kullanıcı kimlik doğrulama ve yetkilendirme
- Mesaj geçmişi ve sohbet yönetimi
- Otomatik mesaj planlama sistemi (cron + queue)
- API endpoint'leri için istek sınırlama
- RabbitMQ ile mesaj kuyruklama
- Redis ile önbellekleme ve online kullanıcı takibi
- Elasticsearch ile mesaj arama
- Swagger ile API dokümantasyonu
- Helmet ve Rate Limit ile güvenlik
- Winston ile loglama
- Sentry ile merkezi hata izleme

## Teknoloji Altyapısı

- **Backend:** Node.js, Express.js
- **Gerçek Zamanlı İletişim:** Socket.IO
- **Veritabanı:** MongoDB (Mongoose ODM)
- **Önbellekleme:** Redis
- **Mesaj Kuyruğu:** RabbitMQ
- **Arama Motoru:** Elasticsearch
- **API Dokümantasyonu:** Swagger UI
- **Güvenlik:** 
  - JWT Kimlik Doğrulama
  - Helmet
  - Express Rate Limit
  - Validation
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
```

## Gereksinimler

- Node.js (v14 veya üzeri)
- MongoDB
- Redis
- RabbitMQ
- Elasticsearch (v8.x önerilir)

## Kurulum

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/enespaladev/nodelabs.git
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
   SENTRY_DSN=https://<your_sentry_key>@oXXXXX.ingest.sentry.io/XXXXX
   ```

4. Sunucuyu başlatın:
   ```bash
   npm run dev
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

## Arama Özelliği

Elasticsearch ile mesaj içeriğinde tam metin arama:

```http
GET /api/search/messages?q=selam
```

> Not: Mesaj gönderimi sırasında otomatik olarak `messages` index'ine kaydedilir.

---

## Sentry ile Hata Takibi

Sentry ile tüm runtime hataları izlenebilir ve dashboard üzerinden takip edilir.

- `GET /api/crash-test` endpoint’i test içindir.

---

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
