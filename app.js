        AOS.init({
            duration: 800,
            easing: 'ease-in-out-sine',
            once: true,
            offset: 100
        });

        let typedInstance = null;
        const typedStrings = {
            en: [
                'Dedicated and accomplished legal practitioner.',
                'Client-focused and result-oriented approach.',
                'Expertise in Criminal, Family, and Property Law.'
            ],
            bn: [
                'নিবেদিত এবং দক্ষ আইনী অনুশীলনকারী।',
                'ক্লায়েন্ট-কেন্দ্রিক এবং ফলাফল-ভিত্তিক পদ্ধতি।',
                'ফৌজদারি, পারিবারিক এবং সম্পত্তি আইনে দক্ষতা।'
            ],
            hi: [
                'समर्पित और निपुण कानूनी व्यवसायी।',
                'ग्राहक-केंद्रित और परिणाम-उन्मुख दृष्टिकोण।',
                'आपराधिक, परिवार और संपत्ति कानून में विशेषज्ञता।'
            ]
        };

        function initTyped(lang) {
            if (!document.getElementById('typed-output')) return;
            if (typedInstance) typedInstance.destroy();
            
            typedInstance = new Typed('#typed-output', {
                strings: typedStrings[lang] || typedStrings['en'],
                typeSpeed: 40,
                backSpeed: 20,
                backDelay: 3000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }

        function executeNavSearch(event, value) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const mainSearch = document.getElementById('qna-search');
                if (mainSearch) {
                    mainSearch.value = value;
                    filterQnA();
                    
                    const blogSection = document.getElementById('blog');
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const topPos = blogSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: topPos,
                        behavior: 'smooth'
                    });

                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        mobileMenu.classList.remove('flex');
                    }
                }
            }
        }

        function filterQnA() {
            const input = document.getElementById('qna-search').value.toLowerCase();
            const items = document.querySelectorAll('.searchable-item');
            let visibleCount = 0;
            
            items.forEach(item => {
                const text = item.innerText.toLowerCase();
                if (text.includes(input)) {
                    item.style.display = '';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            const noResultsMsg = document.getElementById('no-search-results');
            if (visibleCount === 0 && input !== '') {
                noResultsMsg.classList.remove('hidden');
            } else {
                noResultsMsg.classList.add('hidden');
            }
        }

        function submitForm(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> <span>Redirecting...</span>';
            btn.disabled = true;
            
            const name = document.getElementById('contact-name').value;
            const phone = document.getElementById('contact-phone').value;
            const caseType = document.getElementById('contact-case').value || "Not Specified";
            const desc = document.getElementById('contact-desc').value || "No description provided.";
            
            const targetPhone = "917439315183"; 
            const message = `*New Consultation Request*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Case Type:* ${caseType}\n*Description:* ${desc}`;
            
            window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`, '_blank');
            
            setTimeout(() => {
                document.getElementById('form-success').classList.remove('hidden');
                e.target.reset();
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                setTimeout(() => { document.getElementById('form-success').classList.add('hidden'); }, 5000);
            }, 1000);
        }

        function toggleChatPopup() {
            const popup = document.getElementById('chat-popup');
            const icon = document.getElementById('chat-icon');
            
            if (popup.classList.contains('chat-widget-closed')) {
                popup.classList.remove('chat-widget-closed');
                popup.classList.add('chat-widget-open');
                icon.classList.remove('fa-comment-dots');
                icon.classList.add('fa-chevron-down');
            } else {
                popup.classList.remove('chat-widget-open');
                popup.classList.add('chat-widget-closed');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-comment-dots');
            }
        }

        function showTypingIndicator() {
            if (document.getElementById('typing-indicator-bubble')) return;
            const chatContainer = document.getElementById('chat-messages');
            const msgDiv = document.createElement('div');
            msgDiv.id = 'typing-indicator-bubble';
            msgDiv.className = "bg-gray-200 text-gray-800 rounded-lg p-3 w-16 self-start shadow-sm typing-indicator flex justify-center items-center h-10";
            msgDiv.innerHTML = '<span></span><span></span><span></span>';
            chatContainer.appendChild(msgDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        function removeTypingIndicator() {
            const indicator = document.getElementById('typing-indicator-bubble');
            if (indicator) indicator.remove();
        }

        const localKnowledgeBase = [
            {
                category: "greeting",
                keywords: ["hi", "hello", "hey", "namaste", "good morning", "good evening", "help"],
                response: "Hello! Welcome to Advocate A. Rehman Khan's Virtual Assistant. How can I assist you with your legal matters today?"
            },
            {
                category: "contact_phone",
                keywords: ["phone", "call", "number", "contact", "mobile", "whatsapp", "reach"],
                response: "You can reach Advocate Rehman Khan directly at 074393 15183. Our email is contact@advocaterehmankhan.com."
            },
            {
                category: "location_address",
                keywords: ["where", "location", "address", "office", "visit", "ghusuri", "howrah", "chamber"],
                response: "Our office is located at 4Th floor, 37, Landmark, Jaya Bibi Rd, beside Shree Khushwaha high school, Ghusuri, Howrah, West Bengal 711107."
            },
            {
                category: "hours_timing",
                keywords: ["time", "hours", "open", "close", "when", "timing", "days"],
                response: "We are open Monday to Sunday from 10:00 AM to 10:00 PM."
            },
            {
                category: "criminal_law",
                keywords: ["criminal", "bail", "anticipatory", "fraud", "police", "fir", "arrest", "jail", "defense"],
                response: "Advocate Rehman Khan has extensive experience in Criminal Defense, including Anticipatory Bail, Regular Bail, Fraud Cases, and Police matters. Please call 074393 15183 for immediate assistance."
            },
            {
                category: "family_law",
                keywords: ["family", "divorce", "marriage", "wife", "husband", "dowry", "domestic violence", "maintenance", "child", "matrimonial"],
                response: "We specialize in Family Law, resolving complex disputes through dialogue and litigation. This includes Mutual/Contested Divorce, Domestic Violence, and Dowry Cases."
            },
            {
                category: "property_law",
                keywords: ["property", "land", "real estate", "tenant", "landlord", "registration", "mutation", "dispute", "deed", "signature"],
                response: "We offer comprehensive guidance on Property Law, including Land Registration, Landlord/Tenant Disputes, Real Estate transfers, and handling fraudulent deeds."
            },
            {
                category: "corporate_law",
                keywords: ["corporate", "startup", "business", "company", "contract", "liability"],
                response: "For corporate matters, we provide expert legal consultancy for Startups, corporate disputes, business structuring, and contract law."
            },
            {
                category: "courts",
                keywords: ["court", "high court", "supreme court", "practice", "jurisdiction", "bankshall", "alipore", "patna"],
                response: "Advocate Khan practices at the Calcutta High Court, Bankshall Court Kolkata, District Court Alipore, District Court Howrah, and the Supreme Court of India."
            },
            {
                category: "experience_profile",
                keywords: ["experience", "profile", "who", "degree", "qualification", "reviews", "rating", "lawrato", "years"],
                response: "Advocate A. Rehman Khan holds B.Com (Hons), LL.B, and LL.M degrees. He has 25 years of intense litigation experience and is a LawRato Top Contributor 2023 with a 4.9/5 rating."
            },
            {
                category: "youtube",
                keywords: ["youtube", "video", "channel", "learn", "watch", "subscribe"],
                response: "You can explore Indian law on our YouTube channel (@AdvocateRehmankhan) which has over 3.24K subscribers and 380+ informative videos."
            },
            {
                category: "fees",
                keywords: ["fee", "cost", "price", "charge", "money", "rupee", "how much"],
                response: "The cost varies depending on the complexity of the matter. We offer transparent fee structures. Kindly contact us directly at 074393 15183 to discuss your specific requirements."
            },
            {
                category: "consultation",
                keywords: ["consultation", "meet", "appointment", "book", "bring", "meeting"],
                response: "To book a consultation, call 074393 15183. Please bring relevant documents (contracts, notices, property deeds) and a list of questions to your meeting."
            },
            {
                category: "qna_fraud",
                keywords: ["corporate fraud", "company fraud", "1968540", "breach of trust"],
                response: "Under the BNS, company fraud amounts to Criminal Breach of Trust (Sec 316) and Cheating (Sec 318). The company can file an FIR. It's best to try settling the matter before a criminal case is filed."
            },
            {
                category: "qna_divorce_summons",
                keywords: ["summons", "siliguri", "kathmandu", "not received", "ex-parte"],
                response: "If you haven't received official summons, appearance isn't strictly mandatory yet, but it's wise to track it to avoid ex-parte proceedings. Check with a local lawyer or police station regarding FIRs."
            }
        ];

        let isWaitingForResponse = false;
        let awaitingWhatsAppPermission = false;
        let lastUserQuery = "";

        function getLocalResponse(userText) {
            const lowerInput = userText.toLowerCase();

            if (awaitingWhatsAppPermission) {
                if (lowerInput.match(/\b(yes|yep|sure|ok|yeah|y|ha|haan|yes please)\b/)) {
                    awaitingWhatsAppPermission = false;
                    setTimeout(() => {
                        const waMessage = `Hi, I need assistance regarding: "${lastUserQuery}"`;
                        window.open(`https://wa.me/917439315183?text=${encodeURIComponent(waMessage)}`, '_blank');
                        toggleChatPopup(); 
                    }, 1500);
                    return "Redirecting you to our WhatsApp support team. Please wait...";
                } else if (lowerInput.match(/\b(no|nope|nah|n|nahi)\b/)) {
                    awaitingWhatsAppPermission = false;
                    return "Okay, no problem! Feel free to ask another question.";
                } else {
                    return "Please answer Yes or No. Connect with us on WhatsApp?";
                }
            }

            let bestMatch = null;
            let maxMatchCount = 0;

            for (const item of localKnowledgeBase) {
                let matchCount = 0;
                for (const keyword of item.keywords) {
                    if (lowerInput.includes(keyword.toLowerCase())) {
                        matchCount++;
                    }
                }
                if (matchCount > maxMatchCount) {
                    maxMatchCount = matchCount;
                    bestMatch = item;
                }
            }

            if (bestMatch && maxMatchCount > 0) {
                return bestMatch.response;
            }

            awaitingWhatsAppPermission = true;
            lastUserQuery = userText; 
            return "I am a local virtual assistant and may not understand complex queries. Would you like me to redirect you to our human legal team on WhatsApp? (Reply Yes or No)";
        }

        function handleUserMessage() {
            const inputField = document.getElementById('chat-bot-input');
            const submitBtn = inputField.nextElementSibling;
            const userText = inputField.value.trim();
            
            if (!userText || isWaitingForResponse) return;

            isWaitingForResponse = true;
            inputField.disabled = true;
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';

            appendMessage('user', userText);
            inputField.value = '';
            
            showTypingIndicator();

            setTimeout(() => {
                try {
                    const botResponseText = getLocalResponse(userText);
                    
                    removeTypingIndicator();
                    appendMessage('bot', botResponseText);

                } catch (err) {
                    removeTypingIndicator();
                    appendMessage('bot', "I am experiencing technical difficulties. Please contact our office directly at 074393 15183 or click the WhatsApp button to connect with our team.");
                } finally {
                    isWaitingForResponse = false;
                    inputField.disabled = false;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    setTimeout(() => inputField.focus(), 10);
                }
            }, 800);
        }

        function handleEnterKeyPress(event) {
            if (event.key === 'Enter') handleUserMessage();
        }

        function appendMessage(sender, text) {
            const chatContainer = document.getElementById('chat-messages');
            const msgDiv = document.createElement('div');
            msgDiv.className = sender === 'user' 
                ? "bg-[#25D366] text-white rounded-lg p-3 max-w-[85%] self-end text-sm shadow-sm"
                : "bg-gray-200 text-gray-800 rounded-lg p-3 max-w-[85%] self-start text-sm shadow-sm";
            msgDiv.textContent = text;
            chatContainer.appendChild(msgDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        const langs = ['en', 'bn', 'hi'];
        const cookieMatch = document.cookie.match(/googtrans=\/en\/(en|bn|hi)/);
        let currentLang = cookieMatch ? cookieMatch[1] : 'en';
        let langIndex = langs.indexOf(currentLang) !== -1 ? langs.indexOf(currentLang) : 0;

        function updateLangButton(lang) {
            let text = 'বাংলা / हिन्दी';
            if (lang === 'bn') text = 'हिन्दी / English';
            if (lang === 'hi') text = 'English / বাংলা';
            document.querySelectorAll('.lang-text-span').forEach(el => el.innerText = text);
        }

        function toggleLanguage() {
            langIndex = (langIndex + 1) % langs.length;
            const targetLang = langs[langIndex];
            const translateSelect = document.querySelector('.goog-te-combo');

            if (translateSelect) {
                translateSelect.value = targetLang;
                translateSelect.dispatchEvent(new Event('change', { bubbles: true }));
                currentLang = targetLang;
                updateLangButton(currentLang);
                initTyped(currentLang);
            } else {
                document.cookie = `googtrans=/en/${targetLang}; path=/`;
                document.cookie = `googtrans=/en/${targetLang}; domain=.${window.location.hostname}; path=/`;
                window.location.reload();
            }
        }

        function openTeamModal(id) {
            const modal = document.getElementById('team-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            void modal.offsetWidth; 
            modal.classList.remove('opacity-0');
            document.body.style.overflow = 'hidden';
        }

        function closeTeamModal(event) {
            if (event && event.target !== event.currentTarget) return;
            const modal = document.getElementById('team-modal');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.remove('flex');
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }

        function openArticleModal(articleId) {
            const modal = document.getElementById('article-modal');
            const contentDiv = document.getElementById('article-content-' + articleId);
            const clickedCard = document.querySelector(`article[onclick*="${articleId}"]`);
            
            if(contentDiv && clickedCard) {
                document.getElementById('article-modal-title').innerText = clickedCard.querySelector('[itemprop="headline"]').innerText;
                document.getElementById('article-modal-category').innerText = clickedCard.querySelector('[itemprop="articleSection"]').innerText;
                document.getElementById('article-modal-author').innerText = clickedCard.querySelector('meta[itemprop="author"]').content;
                document.getElementById('article-modal-date').innerText = clickedCard.querySelector('[itemprop="datePublished"]').innerText;
                document.getElementById('article-modal-img').src = clickedCard.querySelector('[itemprop="image"]').src;
                
                document.getElementById('article-modal-body').innerHTML = contentDiv.innerHTML;
                
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                void modal.offsetWidth; 
                modal.classList.remove('opacity-0');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeArticleModal(event) {
            if (event && event.target !== event.currentTarget) return;
            const modal = document.getElementById('article-modal');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.remove('flex');
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }

        function openVideoModal(videoId) {
            const modal = document.getElementById('video-modal');
            const iframe = document.getElementById('youtube-iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            void modal.offsetWidth;
            modal.classList.remove('opacity-0');
            document.body.style.overflow = 'hidden';
        }

        function closeVideoModal(event) {
            if (event && event.target !== event.currentTarget) return;
            const modal = document.getElementById('video-modal');
            const iframe = document.getElementById('youtube-iframe');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.remove('flex');
                modal.classList.add('hidden');
                iframe.src = '';
                document.body.style.overflow = '';
            }, 300);
        }

        const testimonialTrack = document.getElementById('testimonials-track');
        let isAutoScrolling = true;
        let isDragging = false;
        let startX, scrollLeftPos;

        if (testimonialTrack) {
            function autoScrollTestimonials() {
                if (isAutoScrolling && !isDragging) {
                    testimonialTrack.scrollLeft += 1;
                    if (testimonialTrack.scrollLeft >= testimonialTrack.scrollWidth / 2) {
                        testimonialTrack.scrollLeft = 0;
                    }
                }
                requestAnimationFrame(autoScrollTestimonials);
            }
            requestAnimationFrame(autoScrollTestimonials);

            testimonialTrack.addEventListener('touchstart', () => { isAutoScrolling = false; });
            testimonialTrack.addEventListener('touchend', () => { isAutoScrolling = true; });

            testimonialTrack.addEventListener('mouseenter', () => { isAutoScrolling = false; });
            testimonialTrack.addEventListener('mouseleave', () => { isAutoScrolling = true; isDragging = false; });
            
            testimonialTrack.addEventListener('mousedown', (e) => {
                isDragging = true;
                isAutoScrolling = false;
                startX = e.pageX - testimonialTrack.offsetLeft;
                scrollLeftPos = testimonialTrack.scrollLeft;
            });
            
            testimonialTrack.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX - testimonialTrack.offsetLeft;
                const walk = (x - startX) * 2;
                testimonialTrack.scrollLeft = scrollLeftPos - walk;
            });
            
            testimonialTrack.addEventListener('mouseup', () => {
                isDragging = false;
                isAutoScrolling = true;
            });
        }

        let currentSlide = 0;
        const totalSlides = 4;
        let slideInterval;

        window.prevSlide = function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
            resetSlideInterval();
        };

        window.nextSlide = function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
            resetSlideInterval();
        };

        window.goToSlide = function(index) {
            currentSlide = index;
            updateSlider();
            resetSlideInterval();
        };

        function updateSlider() {
            const slider = document.getElementById('hero-slider');
            if(slider) slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            document.querySelectorAll('.indicator-dot').forEach((dot, idx) => {
                if (idx === currentSlide) {
                    dot.classList.remove('bg-white/50');
                    dot.classList.add('bg-gold');
                } else {
                    dot.classList.remove('bg-gold');
                    dot.classList.add('bg-white/50');
                }
            });
        }

        function resetSlideInterval() {
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(window.nextSlide, 5000);
        }

        const heroSlider = document.getElementById('home');
        if(heroSlider) {
            let heroStartX = 0;
            let heroEndX = 0;
            
            heroSlider.addEventListener('touchstart', e => {
                heroStartX = e.changedTouches[0].screenX;
            }, {passive: true});

            heroSlider.addEventListener('touchend', e => {
                heroEndX = e.changedTouches[0].screenX;
                handleHeroSwipe();
            }, {passive: true});

            function handleHeroSwipe() {
                const threshold = 50;
                if (heroEndX < heroStartX - threshold) {
                    window.nextSlide();
                }
                if (heroEndX > heroStartX + threshold) {
                    window.prevSlide();
                }
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            updateLangButton(currentLang);
            initTyped(currentLang);
            resetSlideInterval();

            const menuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            menuBtn.addEventListener('click', () => {
                if (mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenu.classList.add('flex');
                } else {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                }
            });

            document.querySelectorAll('.mobile-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                });
            });

            document.querySelectorAll('.faq-toggle').forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const content = toggle.nextElementSibling;
                    const icon = toggle.querySelector('.faq-icon');

                    document.querySelectorAll('.faq-content').forEach(c => {
                        if (c !== content) {
                            c.classList.remove('open');
                            c.style.paddingBottom = '0';
                            c.previousElementSibling.querySelector('.faq-icon').classList.remove('open');
                        }
                    });

                    content.classList.toggle('open');
                    icon.classList.toggle('open');
                    content.style.paddingBottom = content.classList.contains('open') ? '1.5rem' : '0';
                });
            });
        });
