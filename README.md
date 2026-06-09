# GitHub Pages ve HTTPS (Let’s Encrypt) Kurulumu — avmuraterdal.pro

Kısa: proje kökünde `CNAME` dosyası eklendi. Aşağıdaki adımları takip ederek sitenizi `avmuraterdal.pro` altında GitHub Pages ile yayınlayıp GitHub/Let’s Encrypt üzerinden HTTPS alabilirsiniz.

- **DNS ayarları (önemli)**:
  - Apex (naked) domain için dört adet A kaydı ekleyin:
    - `185.199.108.153`
    - `185.199.109.153`
    - `185.199.110.153`
    - `185.199.111.153`
  - `www` için (isteğe bağlı) bir CNAME ekleyin: hedef olarak `username.github.io.` (veya GitHub Pages için kullandığınız repo adresi)
  - Not: `CNAME` dosyası projede olduğu için GitHub repo ayarlarına custom domain otomatik gelecektir; DNS kayıtlarınızın doğru olduğundan emin olun.

- **Yerel repo ve GitHub'a push (örnek)**:

  ```bash
  cd /path/to/avukat-project
  git init
  git add .
  git commit -m "Initial site for avmuraterdal.pro"
  # GitHub'da yeni bir repo oluşturun (ör. avmuraterdal.github.io veya istediğiniz isim)
  git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
  git branch -M main
  git push -u origin main
  ```

- **GitHub Pages ayarları**:
  - Repository > Settings > Pages kısmına gidin.
  - Source: `main` branch, folder `/(root)` seçin (veya sizin tercih ettiğiniz kaynak).
  - `Custom domain` alanında `avmuraterdal.pro` görünmelidir (CNAME dosyası eklendiğinden otomatik gelebilir).
  - `Enforce HTTPS` seçeneğini işaretleyin; sertifika GitHub tarafından Let’s Encrypt ile otomatik verilir.

- **Bekleme ve doğrulama**:
  - DNS değişiklikleri yayılana kadar (TTL) birkaç dakika–48 saat arası bekleyebilirsiniz.
  - GitHub Pages, DNS doğrulandıktan sonra TLS sertifikası (Let’s Encrypt) otomatik oluşturur. Eğer sertifika alınmazsa repo Settings > Pages altında hata mesajını kontrol edin.

- **Yardımcı notlar / sorun giderme**:
  - Apex domain için CNAME kaydı kullanmayın; sadece A kayıtlarını kullanın.
  - Eğer başka bir hizmette (Cloudflare vb.) proxy kullanıyorsanız önce proxy kapatıp doğrudan DNS kayıtlarıyla deneyin; aksi halde Let’s Encrypt doğrulaması başarısız olabilir.

Eğer isterseniz ben repo oluşturma, commit/push veya GitHub Pages ayarlarında adım adım yardımcı olabilirim.
