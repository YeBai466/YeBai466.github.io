document.addEventListener('DOMContentLoaded', () => {
    const contents = document.querySelectorAll('.ant-tabs-container');
    contents.forEach(content => {
        const tabsHeader = content.querySelector('.ant-tabs-header');
        const tabs = tabsHeader.querySelectorAll('.ant-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-target');
                const disableMessage = tab.getAttribute('disable-message');
                if(disableMessage){
                    showNotification('选择此选项失败',disableMessage);
                    return;
                }
                const tabsContentChildren = content.querySelector('.ant-tabs-content').children;
                for (let i = 0; i < tabsContentChildren.length; i++) {
                    if (tabsContentChildren[i].classList.contains('ant-tab-content')) {
                        tabsContentChildren[i].classList.remove('active');
                    }
                }
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                content.querySelector(`#${targetId}`).classList.add('active');
            });
        });
    });
    const inputAccount = document.getElementById('inputAccount');
    const buttonLogin = document.getElementById('buttonLogin');
    
    
    inputAccount.addEventListener('input',() => {
        if(inputAccount.value == ""){
            buttonLogin.innerText = "随机登录";
        }else{
            buttonLogin.innerText = "登录";
        }
    });

    const inputList = document.querySelectorAll('input');
    inputList.forEach(i => {
        i.addEventListener('keydown',e => {
            if(e.key == 'a' && (e.ctrlKey || e.metaKey)){
                e.preventDefault();
                i.select();
            }
        });
    });
    buttonLogin.addEventListener('click',() =>{
        showNotification('登录成功','UserId: xxxxxx','✅')
    });
    const formMain = document.getElementById('formMain');
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    formMain.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - formMain.offsetLeft;
      offsetY = e.clientY - formMain.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        formMain.style.left = e.clientX - offsetX + 'px';
        formMain.style.top = e.clientY - offsetY + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
});