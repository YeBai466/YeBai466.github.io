document.addEventListener('DOMContentLoaded', () => {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 滚动时显示元素动画
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 观察所有特性卡片
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // 添加visible类的CSS
    const style = document.createElement('style');
    style.textContent = `
        .feature-card.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 导航栏滚动效果
    let lastScroll = 0;
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            return;
        }

        if (currentScroll > lastScroll) {
            // 向下滚动
            nav.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // 打字机效果
    const typewriter = document.querySelector('.typewriter');
    const text = "Zone NELauncher";
    function typewriterEffect() {
        let content = '';
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            if(!isDeleting && charIndex < text.length) {
                content += text.charAt(charIndex);
                typewriter.textContent = content;
                charIndex++;
                setTimeout(type, 150);
            } else if(isDeleting && charIndex > 1) {
                charIndex--;
                content = text.substring(0, charIndex);
                typewriter.textContent = content;
                setTimeout(type, 30);
            } else {
                if(isDeleting) {
                    isDeleting = false;
                    charIndex = 1;
                    content = 'Z';
                    setTimeout(type, 100);
                } else {
                    isDeleting = true;
                    setTimeout(type, 2000);
                }
            }
        }
        type();
    }
    
    // 开始循环打字效果
    typewriterEffect();

    // 鼠标跟随效果
    const hero = document.getElementById('home');
    const titleBg = document.querySelector('.hero-content');
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        titleBg.style.setProperty('--x', `${x}%`);
        titleBg.style.setProperty('--y', `${y}%`);
    });

    // 添加鼠标悬停效果
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // 添加konami code彩蛋
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                console.log('1');
                activatePartyMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // 彩蛋效果
    function activatePartyMode() {
        const hero = document.querySelector('.hero');
        hero.style.animation = 'partyGradient 5s linear infinite';
        
        // 创建彩带效果
        for (let i = 0; i < 50; i++) {
            createConfetti();
        }
        
        // 10秒后恢复正常
        setTimeout(() => {
            hero.style.animation = 'gradientBG 15s ease infinite';
            document.querySelectorAll('.confetti').forEach(c => c.remove());
        }, 10000);
    }

    // 创建彩带
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);
        
        // 动画结束后移除
        setTimeout(() => confetti.remove(), 5000);
    }

    // 梅花效果
    function createSakura(x, y) {
        const sakura = document.createElement('div');
        sakura.className = 'sakura';
        sakura.style.left = `${x}px`;
        sakura.style.top = `${y}px`;
        sakura.style.width = `${Math.random() * 10 + 5}px`;
        sakura.style.height = sakura.style.width;
        sakura.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
        document.body.appendChild(sakura);

        // 动画结束后移除
        sakura.addEventListener('animationend', () => {
            sakura.remove();
        });
    }

    // 为按钮添加梅花效果
    document.querySelectorAll('[data-sakura="true"]').forEach(button => {
        button.addEventListener('mouseover', function(e) {
            const rect = this.getBoundingClientRect();
            const createFlowers = setInterval(() => {
                const x = rect.left + Math.random() * rect.width;
                const y = rect.top - 10;
                createSakura(x, y);
            }, 100);

            this.addEventListener('mouseout', () => {
                clearInterval(createFlowers);
            }, { once: true });
        });
    });

    const hitokotoBox = document.querySelector('.hitokoto-box');
    const hitokoto = document.querySelector('#hitokoto_text');
    async function updateHitokoto() {
        hitokotoBox.classList.add('updating');
        hitokoto.innerText = `「${await getHitokoto()}」`;
        hitokotoBox.classList.remove('updating');
    }
    async function getHitokoto() {
        await sleep(100);
        var text = [
            "恭喜你方块人，你被欣欣哥恭喜到了。俗话说的好，这个俗话说的好。作为一个过来人来说，欣欣哥是已经过来了。",
            "欣欣哥想奉劝某些方块人，你记住。别管记住什么，你记住就完了，能力越大。你这个能力就会越大。",
            "你最近是不是不知道怎么滴，老是觉得自己最近不知道怎么滴了。有时候觉得自己很胖，还有时候觉得自己不瘦。",
            "有时候觉得自己很穷，但有时候却觉得自己不富。你如果愿意多花点时间去了解。你就会发现你多花了点时间。所以一定要坚信。你一定行，除非不行。",
            "我说实话，这个客户端其实挺好的。就是同装备打不过欣欣公益而已。买不起JNIC的Roxy团队，也是笑了",
            "7D9W",
            "内部是六十元哦亲，您支付了欣欣40元呢，有20元是给欣欣的呢，欣欣是来售后的呢",
            "信不信我给整个圈子都掀翻了"
        ]
        return text[randomNumber(0,text.length-1)];
    }
    setInterval(updateHitokoto, 5000);
    updateHitokoto();
    hitokoto.addEventListener('click', function(e) {
        e.preventDefault();
        updateHitokoto();
    });
});
function randomNumber(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}