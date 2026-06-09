/* ==========================================================================
   Avukat Murat Erdal - Premium JS Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header & Scroll Action
    const header = document.querySelector('.site-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load

    // 2. Mobile Responsive Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Transform hamburger to X
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // 3. Scroll Spy (Active link indicator on scroll)
    const sections = document.querySelectorAll('section[id]');
    
    const scrollSpy = () => {
        const currentScroll = window.scrollY + 120; // Offset for sticky header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    };
    
    window.addEventListener('scroll', scrollSpy);

    // 4. Accordion Toggle Action
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            
            // Toggle active state
            const isActive = item.classList.contains('active');
            
            // Close all open items first for single accordion behavior
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            });
            
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    // Open the first accordion item by default
    const firstAccordion = document.querySelector('.accordion-item');
    if (firstAccordion) {
        firstAccordion.classList.add('active');
        const content = firstAccordion.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
    }

    // 5. Contact Form Submission & Email Integration
    const contactForm = document.getElementById('contactForm');
    const formSubmitBtn = document.getElementById('formSubmitBtn');
    const formFeedback = document.getElementById('formFeedback');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Disable button during preparation
            formSubmitBtn.disabled = true;
            const btnText = formSubmitBtn.querySelector('span');
            const originalText = btnText.textContent;
            btnText.textContent = 'E-Posta Hazırlanıyor...';
            
            // Collect Form Data
            const formData = new FormData(contactForm);
            const fullName = formData.get('fullName');
            const phone = formData.get('phone');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Map service codes to readable Turkish names
            const subjectMap = {
                'ceza': 'Ceza Hukuku',
                'aile': 'Aile ve Boşanma Hukuku',
                'gayrimenkul': 'Gayrimenkul Hukuku',
                'icra': 'İcra ve İflas Hukuku',
                'is': 'İş Hukuku',
                'diger': 'Diğer Hukuki Konular'
            };
            const subjectName = subjectMap[subject] || 'Genel Hukuki Danışmanlık';
            
            // Construct Email Subject & Body
            const emailSubject = `Hukuki Danışmanlık Talebi - ${fullName}`;
            const emailBody = `Sayın Av. Murat Erdal,\n\n` +
                              `Web siteniz üzerinden yeni bir hukuki danışmanlık randevu talebi oluşturuldu:\n\n` +
                              `--------------------------------------------------\n` +
                              `👤 MÜVEKKİL ADI SOYADI: ${fullName}\n` +
                              `📞 İLETİŞİM TELEFONU: ${phone}\n` +
                              `✉️ E-POSTA ADRESİ: ${email || 'Belirtilmedi'}\n` +
                              `⚖️ HİZMET ALANI: ${subjectName}\n` +
                              `--------------------------------------------------\n\n` +
                              `📝 HUKUKİ DETAY VE MESAJ:\n` +
                              `${message}\n\n` +
                              `--------------------------------------------------\n` +
                              `Bu e-posta Av. Murat Erdal web sitesindeki iletişim formu aracılığıyla hazırlanmıştır.`;
            
            // Open user's email client
            const mailtoUrl = `mailto:avmuraterdal@hotmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            setTimeout(() => {
                // Trigger mail client launch
                window.location.href = mailtoUrl;

                // Show Success Message in browser UI
                formFeedback.classList.remove('hidden', 'error');
                formFeedback.classList.add('success');
                formFeedback.innerHTML = `Sayın <strong>${fullName}</strong>, e-posta istemciniz başlatıldı. Lütfen açılan pencerede e-postayı onaylayıp gönderiniz.`;
                
                // Reset Form
                contactForm.reset();
                
                // Restore Button
                formSubmitBtn.disabled = false;
                btnText.textContent = originalText;
                
                // Scroll feedback into view
                formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide feedback after 12 seconds
                setTimeout(() => {
                    formFeedback.classList.add('hidden');
                }, 12000);
                
            }, 1000);
        });
    }
});
